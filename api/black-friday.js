import { createHash, randomInt } from 'node:crypto';
import { createSupabaseDb } from './_lib/db.js';
import { createMailer } from './_lib/mailer.js';
import { createLeadService } from './_lib/leads-core.js';

// Black Friday 2026 — hora peninsular española (CET, UTC+1).
export const CAMPAIGN_START = Date.parse('2026-11-23T00:00:00+01:00');
export const CAMPAIGN_END = Date.parse('2026-11-30T00:00:00+01:00');
const CAMPAIGN_LABEL = 'Tablón de anuncios · Black Friday 2026';
const MARKER = /^\[BF2026:(0|1|2|3):(si|no)\]/;

/** Cuatro sectores visibles: 2,5 % premio, 47,5 % sin premio, 2,5 % premio, 47,5 % sin premio. */
export function drawSector(random = randomInt) {
  const n = random(1000); // API criptográfica de Node.js. El cliente NO decide el resultado.
  if (n < 25) return 0;
  if (n < 500) return 1;
  if (n < 525) return 2;
  return 3;
}

const clean = (value, limit) => String(value ?? '').trim().slice(0, limit);
const isWin = (sector) => sector === 0 || sector === 2;
function uniqueKey(phone) {
  return 'bf2026-' + createHash('sha256').update(phone).digest('hex');
}
function parseRecorded(row) {
  const match = MARKER.exec(row?.mensaje || '');
  return match ? Number(match[1]) : null;
}
function publicResult(row, existing = false) {
  const sector = parseRecorded(row);
  if (sector === null) return null;
  return {
    success: true, registered: true, alreadyPlayed: existing,
    sector, won: isWin(sector),
    code: isWin(sector) ? 'BF26-' + String(row.id).split('-')[0].toUpperCase() : null,
    expiresOn: '2026-11-29',
  };
}

/** La identidad del participante se registra en la BD antes de entregar el resultado. */
export function createBlackFridayService({ db, leadService, now = () => Date.now(), random = randomInt }) {
  return async function participate(body) {
    const instant = now();
    if (instant < CAMPAIGN_START || instant >= CAMPAIGN_END) {
      return { status: 410, body: { success: false, error: 'La promoción solo está disponible del 23 al 29 de noviembre de 2026.' } };
    }
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return { status: 400, body: { success: false, error: 'Datos no válidos.' } };
    }
    // Honeypot: un usuario no ve ni rellena este campo.
    if (body.website) return { status: 400, body: { success: false, error: 'No se pudo registrar la participación.' } };
    const nombre = clean(body.nombre, 120);
    const telefono = clean(body.telefono, 40).replace(/[^\d]/g, '').replace(/^34(?=\d{9}$)/, '');
    const email = clean(body.email, 200).toLowerCase();
    if (nombre.length < 2) return { status: 400, body: { success: false, error: 'Indica tu nombre.' } };
    if (!/^[6789]\d{8}$/.test(telefono)) return { status: 400, body: { success: false, error: 'Indica un teléfono español válido de 9 cifras.' } };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: 400, body: { success: false, error: 'Introduce un correo electrónico válido.' } };
    if (body.privacyAccepted !== true) return { status: 400, body: { success: false, error: 'Debes leer y aceptar las condiciones de participación y privacidad.' } };

    const key = uniqueKey(telefono); // Un intento por teléfono y campaña, incluso si se borran cookies.
    const { data: previous, error: lookupError } = await db.getByKey(key);
    if (lookupError) return { status: 503, body: { success: false, error: 'El registro no está disponible ahora mismo. No se ha consumido ninguna tirada.' } };
    if (previous) {
      if (String(previous.email || '').toLowerCase() !== email) {
        return { status: 409, body: { success: false, error: 'Este teléfono ya ha participado. Usa el mismo correo electrónico del registro original.' } };
      }
      const publicPrevious = publicResult(previous, true);
      return publicPrevious
        ? { status: 200, body: publicPrevious }
        : { status: 409, body: { success: false, error: 'Este teléfono ya tiene un registro. Contacta con nosotros para revisarlo.' } };
    }

    const sector = drawSector(random);
    const optedIn = body.marketingOptIn === true;
    const signup = {
      nombre, telefono, email,
      tipo_cliente: 'hogar',
      servicio_interes: CAMPAIGN_LABEL,
      origen: 'formulario_web',
      source_page: '/Promociones#black-friday',
      idempotency_key: key,
      mensaje: `[BF2026:${sector}:${optedIn ? 'si' : 'no'}] Registro para el tablón de promociones. ${isWin(sector) ? 'Ganador del 10% (sujeto a condiciones de campaña).' : 'Sin premio.'} Consentimiento para recibir comunicaciones comerciales: ${optedIn ? 'SÍ' : 'NO'}.`,
    };
    const submitted = await leadService.submit(signup);
    if (!submitted?.body?.success || !submitted.body.saved) {
      return { status: 503, body: { success: false, error: 'No se pudo completar el registro. No se ha consumido ninguna tirada.' } };
    }
    // Volver a leer evita inconsistencias bajo dos peticiones simultáneas.
    const { data: saved, error: readError } = await db.getByKey(key);
    if (readError || !saved) return { status: 503, body: { success: false, error: 'Participación registrada. Contacta con nosotros para recuperar el resultado.' } };
    if (String(saved.email || '').toLowerCase() !== email) {
      return { status: 409, body: { success: false, error: 'Este teléfono ya está registrado con otro correo electrónico.' } };
    }
    const response = publicResult(saved, submitted.body.duplicate === true);
    return response
      ? { status: 200, body: response }
      : { status: 503, body: { success: false, error: 'Participación registrada. Contacta con nosotros para recuperar el resultado.' } };
  };
}

export function createHandler({ participate, db, leadService, env = process.env } = {}) {
  const database = db || createSupabaseDb(env);
  const service = leadService || createLeadService({ db: database, mailer: createMailer(env) });
  const run = participate || createBlackFridayService({ db: database, leadService: service });
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Allow', 'POST, OPTIONS');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Método no permitido.' });
    try {
      const { status, body } = await run(req.body);
      return res.status(status).json(body);
    } catch (error) {
      console.error('Error en participación Black Friday:', error);
      return res.status(500).json({ success: false, error: 'No se pudo registrar la participación. Prueba más tarde.' });
    }
  };
}

export default createHandler();
