import { buildNotifEmail, buildConfirmEmail, buildAlertEmail, notifSubject } from './emails.js';
import { BUSINESS_INBOX } from './mailer.js';

/**
 * Lógica de negocio de las solicitudes (leads), sin dependencias de red:
 * la base de datos y el correo se inyectan, así los tests la ejercitan entera.
 *
 * Garantías:
 *  1. Una solicitud válida se guarda ANTES de intentar ningún correo.
 *  2. El estado de cada aviso queda en la fila (notif_status, intentos, canal, error).
 *  3. Si el correo falla, la solicitud sigue guardada y se reintenta sola.
 *  4. El mismo envío repetido (doble clic, reintento del navegador) no duplica ni reenvía.
 *  5. Si ni siquiera se puede guardar, se intenta al menos mandar el correo.
 *  6. La respuesta al cliente dice la verdad: saved / notification.
 */

export const NOTIF_MAX_ATTEMPTS = 5;
const DEDUPE_WINDOW_MS = 10 * 60 * 1000;
// Tope de confirmaciones automáticas al cliente por hora: el formulario no debe poder usarse
// para enviar correo a terceros en masa. Pasado el tope, la solicitud se guarda y se avisa igual.
const CONFIRM_MAX_PER_HOUR = 20;
const ORIGENES = new Set(['formulario_web', 'chatbot', 'whatsapp', 'telefono', 'otro']);
const URGENCIAS = new Set(['baja', 'media', 'alta', 'urgente']);
const TEST_PHONE = '000000000';

const clean = (value, max) =>
  String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);

/** Valida y normaliza el cuerpo. Devuelve { ok:true, value } o { ok:false, error, field }. */
export function parseLead(body) {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Solicitud vacía', field: 'body' };
  const nombre = clean(body.nombre, 120);
  const telefonoRaw = clean(body.telefono, 40);
  const origen = ORIGENES.has(body.origen) ? body.origen : 'formulario_web';

  if (nombre.length < 2) return { ok: false, error: 'Indica tu nombre', field: 'nombre' };
  if (!telefonoRaw) return { ok: false, error: 'Indica un teléfono', field: 'telefono' };

  const telefono = telefonoRaw.replace(/[\s.-]/g, '');
  const digits = telefono.replace(/\D/g, '');
  // El chatbot de texto libre y los mensajes del área de clientes pueden traer un teléfono incompleto: se guarda igualmente
  // (mejor un dato imperfecto que perder la solicitud). El resto de formularios ya lo validan.
  if (!['chatbot', 'otro'].includes(origen) && (digits.length < 9 || digits.length > 15)) {
    return { ok: false, error: 'Indica un teléfono válido (9 dígitos)', field: 'telefono' };
  }
  const email = clean(body.email, 200);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'El email no parece válido', field: 'email' };
  }

  const isTest = /^prueba t[eé]cnica/i.test(nombre) && telefono === TEST_PHONE;
  const key = typeof body.idempotency_key === 'string' && /^[\w-]{8,100}$/.test(body.idempotency_key)
    ? body.idempotency_key
    : null;

  return {
    ok: true,
    value: {
      nombre,
      email,
      telefono,
      tipo_cliente: clean(body.tipo_cliente, 40) || 'hogar',
      zona: clean(body.zona, 120),
      servicio_interes: clean(body.servicio_interes, 200),
      mensaje: clean(body.mensaje, 4000),
      urgencia: URGENCIAS.has(body.urgencia) ? body.urgencia : 'media',
      origen,
      estado: isTest ? 'prueba' : 'nuevo',
      source_page: clean(body.source_page, 200),
      idempotency_key: key,
      is_test: isTest,
    },
  };
}

const publicResult = (row, extra = {}) => ({
  success: true,
  saved: true,
  id: row.id,
  duplicate: false,
  notification: row.notif_status === 'failed_final' ? 'failed' : row.notif_status,
  ...extra,
});

export function createLeadService({ db, mailer, now = () => new Date(), log = console }) {
  /** Intenta avisar a tcnpremium@gmail.com y anota el resultado en la fila. */
  async function notify(row, { sinGuardar = false } = {}) {
    const attempts = (row.notif_attempts || 0) + 1;
    const preferGmail = ['bounced', 'complained', 'suppressed'].includes(row.delivery_status);
    const result = await mailer.send(
      { to: BUSINESS_INBOX, subject: notifSubject(row), html: buildNotifEmail(row, { sinGuardar }) },
      { preferGmail },
    );
    if (sinGuardar) return result; // no hay fila que actualizar

    const patch = {
      notif_attempts: attempts,
      notif_last_attempt_at: now().toISOString(),
    };
    if (result.ok) {
      Object.assign(patch, {
        notif_status: 'sent',
        notif_sent_at: now().toISOString(),
        notif_via: result.via,
        notif_provider_id: result.id || null,
        // Si el canal principal falló y salvó el de respaldo, se deja anotado el motivo.
        notif_error: result.fallbackErrors?.length ? ('respaldo usado: ' + result.fallbackErrors.join(' | ')).slice(0, 500) : null,
        // Resend permite comprobar la entrega después; SMTP solo confirma aceptación.
        delivery_status: result.via === 'resend' ? 'sent' : 'accepted_smtp',
        delivery_checked_at: null,
      });
    } else {
      patch.notif_status = attempts >= NOTIF_MAX_ATTEMPTS ? 'failed_final' : 'failed';
      patch.notif_error = String(result.error || 'error desconocido').slice(0, 500);
      log.error('AVISO FALLIDO lead', row.id, 'intento', attempts, patch.notif_error);
    }
    const { error } = await db.update(row.id, patch);
    if (error) log.error('No se pudo anotar el estado del aviso', row.id, error.message);
    return { ...result, row: { ...row, ...patch } };
  }

  async function sendConfirmation(row) {
    if (row.is_test || !row.email) return 'skipped';
    const since = new Date(now().getTime() - 60 * 60 * 1000).toISOString();
    const { count } = await db.countConfirmationsSince(since);
    if ((count || 0) >= CONFIRM_MAX_PER_HOUR) {
      await db.update(row.id, { confirm_status: 'skipped' });
      return 'skipped';
    }
    const result = await mailer.send({
      to: row.email,
      subject: 'Solicitud recibida — Premium Tech Security',
      html: buildConfirmEmail(row),
    });
    const status = result.ok ? 'sent' : 'failed';
    await db.update(row.id, { confirm_status: status });
    return status;
  }

  async function submit(body, { retryBudgetMs = 0 } = {}) {
    const parsed = parseLead(body);
    if (!parsed.ok) return { status: 400, body: { success: false, saved: false, error: parsed.error, field: parsed.field } };
    const lead = parsed.value;

    // 4. Duplicados: misma clave de envío, o mismos datos en los últimos minutos.
    try {
      let existing = null;
      if (lead.idempotency_key) existing = (await db.getByKey(lead.idempotency_key)).data;
      if (!existing) {
        existing = (await db.findRecentDuplicate({
          telefono: lead.telefono,
          nombre: lead.nombre,
          servicio_interes: lead.servicio_interes,
          sinceISO: new Date(now().getTime() - DEDUPE_WINDOW_MS).toISOString(),
        })).data;
      }
      if (existing) return { status: 200, body: publicResult(existing, { duplicate: true }) };
    } catch (e) {
      log.error('Comprobación de duplicados falló (se continúa):', e.message);
    }

    // 1. Guardar antes que nada.
    const { data: row, error: dbError } = await db.insert({ ...lead, notif_status: 'pending' });
    if (dbError) {
      if (dbError.code === '23505' && lead.idempotency_key) {
        const { data: existing } = await db.getByKey(lead.idempotency_key);
        if (existing) return { status: 200, body: publicResult(existing, { duplicate: true }) };
      }
      log.error('NO SE PUDO GUARDAR el lead:', dbError.message);
      // 5. Último recurso: que al menos llegue el correo con todos los datos.
      const fallback = await notify({ ...lead, created_at: now().toISOString() }, { sinGuardar: true });
      if (fallback.ok) {
        return { status: 200, body: { success: true, saved: false, notification: 'sent', degraded: true } };
      }
      return { status: 500, body: { success: false, saved: false, error: 'No hemos podido registrar tu solicitud.' } };
    }

    // 2-3. Aviso al negocio y anotación del resultado.
    const notified = await notify(row);
    const current = notified.row || row;
    const confirmation = await sendConfirmation(current).catch(() => 'failed');

    // Si queda tiempo, aprovechar la petición para reintentar avisos atrasados.
    if (retryBudgetMs > 0) await retryPending({ limit: 2 }).catch((e) => log.error('retry oportunista:', e.message));

    return { status: 200, body: publicResult(current, { confirmation }) };
  }

  /** Reintenta avisos pendientes/fallidos con espera creciente (2, 4, 8... min, máx. 60). */
  async function retryPending({ limit = 5 } = {}) {
    const { data: rows, error } = await db.listRetryable({ maxAttempts: NOTIF_MAX_ATTEMPTS, limit: 50 });
    if (error) throw new Error(error.message);
    const t = now().getTime();
    const due = (rows || []).filter((r) => {
      const last = new Date(r.notif_last_attempt_at || r.created_at).getTime();
      const waitMin = Math.min(60, 2 ** (r.notif_attempts || 0));
      return t - last >= waitMin * 60 * 1000;
    }).slice(0, limit);

    const outcomes = [];
    for (const row of due) {
      const res = await notify(row);
      outcomes.push({ id: row.id, ok: !!res.ok, final: res.row?.notif_status === 'failed_final' });
    }
    const finals = outcomes.filter((o) => o.final).map((o) => due.find((r) => r.id === o.id));
    if (finals.length) {
      // Alerta: tras agotar los intentos, aviso con asunto distinto por ambos canales.
      await mailer.send({
        to: BUSINESS_INBOX,
        subject: `ALERTA: ${finals.length} solicitud(es) guardadas SIN aviso por correo`,
        html: buildAlertEmail(finals.map((r) => ({ ...r, notif_attempts: NOTIF_MAX_ATTEMPTS }))),
      });
    }
    return { checked: due.length, outcomes };
  }

  /** Consulta a Resend si los correos aceptados llegaron (delivered/bounced...). */
  async function verifyDelivery({ limit = 10 } = {}) {
    const { data: rows, error } = await db.listForDelivery({ limit });
    if (error) throw new Error(error.message);
    const outcomes = [];
    for (const row of rows || []) {
      const res = await mailer.getDeliveryStatus(row.notif_provider_id);
      if (!res.ok) { outcomes.push({ id: row.id, error: res.error }); continue; }
      const patch = { delivery_status: res.status, delivery_checked_at: now().toISOString() };
      if (['bounced', 'complained', 'suppressed'].includes(res.status)) {
        patch.notif_status = 'failed';
        patch.notif_error = `Resend informó: ${res.status}`;
      }
      await db.update(row.id, patch);
      outcomes.push({ id: row.id, status: res.status });
    }
    return { checked: outcomes.length, outcomes };
  }

  return { submit, retryPending, verifyDelivery, notify };
}
