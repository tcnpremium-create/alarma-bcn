import test from 'node:test';
import assert from 'node:assert/strict';
import { createLeadService, parseLead, NOTIF_MAX_ATTEMPTS } from '../api/_lib/leads-core.js';
import { buildNotifEmail, notifSubject, esc } from '../api/_lib/emails.js';
import { isAdmin, isCronOrAdmin } from '../api/_lib/auth.js';
import { createHandler } from '../api/lead.js';

// ---------- dobles de prueba ----------
function fakeDb({ failInsert = false, now = () => new Date() } = {}) {
  const rows = [];
  let seq = 0;
  const db = {
    rows,
    insert: async (row) => {
      if (failInsert) return { data: null, error: { message: 'connection refused' } };
      if (row.idempotency_key && rows.some((r) => r.idempotency_key === row.idempotency_key)) {
        return { data: null, error: { code: '23505', message: 'duplicate key' } };
      }
      const saved = { id: 'id-' + ++seq, created_at: now().toISOString(), notif_attempts: 0, ...row };
      rows.push(saved);
      return { data: { ...saved }, error: null };
    },
    getByKey: async (key) => ({ data: rows.find((r) => r.idempotency_key === key) || null, error: null }),
    findRecentDuplicate: async ({ telefono, nombre, servicio_interes, sinceISO }) => ({
      data: rows.find((r) => r.telefono === telefono && r.nombre === nombre
        && r.servicio_interes === servicio_interes && r.created_at >= sinceISO) || null,
      error: null,
    }),
    update: async (id, patch) => { Object.assign(rows.find((r) => r.id === id), patch); return { data: rows.find((r) => r.id === id), error: null }; },
    listRetryable: async ({ maxAttempts }) => ({
      data: rows.filter((r) => ['pending', 'failed'].includes(r.notif_status) && r.notif_attempts < maxAttempts).map((r) => ({ ...r })),
      error: null,
    }),
    listForDelivery: async () => ({
      data: rows.filter((r) => r.notif_status === 'sent' && r.notif_via === 'resend' && ['sent', null, undefined].includes(r.delivery_status)),
      error: null,
    }),
    countConfirmationsSince: async (sinceISO) => ({ count: rows.filter((r) => r.confirm_status === 'sent' && r.created_at >= sinceISO).length, error: null }),
    ping: async () => ({ data: [], error: null }),
  };
  return db;
}

function fakeMailer({ failAll = false, deliveryStatus = 'delivered' } = {}) {
  const sent = [];
  const m = {
    sent,
    failAll,
    send: async (msg, opts = {}) => {
      sent.push({ ...msg, opts });
      if (m.failAll) return { ok: false, error: 'resend: suspended | gmail: auth' };
      return { ok: true, via: opts.preferGmail ? 'gmail' : 'resend', id: 'prov-' + sent.length };
    },
    getDeliveryStatus: async () => ({ ok: true, status: deliveryStatus }),
    channels: () => ({ resend: true, gmail: true }),
  };
  return m;
}

const validBody = (over = {}) => ({
  nombre: 'María López', telefono: '600 123 456', email: 'maria@example.com',
  tipo_cliente: 'hogar', zona: 'Barcelona', servicio_interes: 'Alarma', mensaje: 'Quiero presupuesto',
  idempotency_key: 'key-0001-abcdef', ...over,
});

function setup(opts = {}) {
  let clock = new Date('2026-10-11T10:00:00Z');
  const db = fakeDb({ ...opts, now: () => clock });
  const mailer = fakeMailer();
  const service = createLeadService({ db, mailer, now: () => clock, log: { error() {}, log() {} } });
  return { db, mailer, service, advance: (min) => { clock = new Date(clock.getTime() + min * 60000); } };
}

// ---------- validación ----------
test('rechaza solicitud sin nombre o sin teléfono y NO guarda nada', async () => {
  const { service, db, mailer } = setup();
  for (const body of [{}, { nombre: 'Ana' }, { telefono: '600123456' }, { nombre: ' ', telefono: '600123456' }]) {
    const r = await service.submit(body);
    assert.equal(r.status, 400);
    assert.equal(r.body.saved, false);
  }
  assert.equal(db.rows.length, 0);
  assert.equal(mailer.sent.length, 0);
});

test('rechaza teléfono inválido en formularios web, pero el chatbot puede traer uno incompleto', () => {
  assert.equal(parseLead(validBody({ telefono: '12345' })).ok, false);
  assert.equal(parseLead(validBody({ telefono: '12345', origen: 'chatbot' })).ok, true);
  assert.equal(parseLead(validBody({ email: 'no-es-email' })).ok, false);
});

// ---------- camino feliz ----------
test('guarda el lead, avisa a tcnpremium@gmail.com y anota el estado del aviso', async () => {
  const { service, db, mailer } = setup();
  const r = await service.submit(validBody());
  assert.equal(r.status, 200);
  assert.deepEqual([r.body.success, r.body.saved, r.body.notification, r.body.duplicate], [true, true, 'sent', false]);
  assert.equal(db.rows.length, 1);
  const row = db.rows[0];
  assert.equal(row.notif_status, 'sent');
  assert.equal(row.notif_attempts, 1);
  assert.equal(row.notif_via, 'resend');
  assert.equal(row.delivery_status, 'sent');
  assert.equal(mailer.sent[0].to, 'tcnpremium@gmail.com');
  assert.match(mailer.sent[0].subject, /NUEVO PRESUPUESTO/);
  assert.equal(mailer.sent[1].to, 'maria@example.com'); // confirmación al cliente
});

// ---------- el correo falla: no se pierde la solicitud ----------
test('si el correo falla, la solicitud queda guardada, marcada como failed y se informa con verdad', async () => {
  const { service, db, mailer } = setup();
  mailer.failAll = true; mailer.send = async (m) => { mailer.sent.push(m); return { ok: false, error: 'resend: suspended | gmail: auth' }; };
  const r = await service.submit(validBody());
  assert.equal(r.status, 200);
  assert.equal(r.body.saved, true);
  assert.equal(r.body.notification, 'failed');
  assert.equal(db.rows[0].notif_status, 'failed');
  assert.match(db.rows[0].notif_error, /suspended/);
  assert.ok(!('emailError' in r.body), 'no debe filtrar detalles internos al cliente');
});

test('el reintento envía el aviso pendiente respetando la espera creciente', async () => {
  const { service, db, mailer, advance } = setup();
  let healthy = false;
  mailer.send = async (m, o = {}) => { mailer.sent.push(m); return healthy ? { ok: true, via: 'gmail', id: 'g1' } : { ok: false, error: 'down' }; };
  await service.submit(validBody({ email: '' }));
  assert.equal(db.rows[0].notif_status, 'failed');

  advance(1); // demasiado pronto: espera 2 min tras el primer intento
  assert.equal((await service.retryPending()).checked, 0);

  healthy = true; advance(5);
  const out = await service.retryPending();
  assert.equal(out.checked, 1);
  assert.equal(db.rows[0].notif_status, 'sent');
  assert.equal(db.rows[0].notif_attempts, 2);
  assert.equal(db.rows[0].notif_via, 'gmail');
});

test('al agotar los intentos pasa a failed_final y manda una alerta aparte', async () => {
  const { service, db, mailer, advance } = setup();
  mailer.send = async (m) => { mailer.sent.push(m); return { ok: false, error: 'down' }; };
  await service.submit(validBody({ email: '' }));
  for (let i = 0; i < NOTIF_MAX_ATTEMPTS + 1; i++) { advance(120); await service.retryPending(); }
  assert.equal(db.rows[0].notif_status, 'failed_final');
  assert.equal(db.rows[0].notif_attempts, NOTIF_MAX_ATTEMPTS);
  assert.ok(mailer.sent.some((m) => /ALERTA/.test(m.subject)));
});

// ---------- duplicados ----------
test('el mismo envío repetido (misma clave) no duplica ni reenvía el aviso', async () => {
  const { service, db, mailer } = setup();
  const a = await service.submit(validBody());
  const sentAfterFirst = mailer.sent.length;
  const b = await service.submit(validBody());
  assert.equal(db.rows.length, 1);
  assert.equal(b.body.duplicate, true);
  assert.equal(b.body.id, a.body.id);
  assert.equal(mailer.sent.length, sentAfterFirst);
});

test('doble clic sin clave: mismos datos en pocos minutos cuentan como duplicado, pasado el plazo no', async () => {
  const { service, db, advance } = setup();
  const body = validBody({ idempotency_key: undefined });
  await service.submit(body);
  assert.equal((await service.submit(body)).body.duplicate, true);
  assert.equal(db.rows.length, 1);
  advance(30);
  const later = await service.submit(body);
  assert.equal(later.body.duplicate, false);
  assert.equal(db.rows.length, 2);
});

// ---------- la base de datos falla ----------
test('si no se puede guardar pero el correo sale, se avisa con los datos y se dice la verdad (saved:false)', async () => {
  const { service, mailer } = setup({ failInsert: true });
  const r = await service.submit(validBody());
  assert.equal(r.status, 200);
  assert.deepEqual([r.body.saved, r.body.notification, r.body.degraded], [false, 'sent', true]);
  assert.match(mailer.sent[0].html, /NO se pudo guardar/);
  assert.match(mailer.sent[0].html, /María López/);
});

test('si no se puede guardar NI avisar, devuelve error real 500 (no un falso éxito)', async () => {
  const { service, mailer } = setup({ failInsert: true });
  mailer.send = async () => ({ ok: false, error: 'down' });
  const r = await service.submit(validBody());
  assert.equal(r.status, 500);
  assert.deepEqual([r.body.success, r.body.saved], [false, false]);
});

// ---------- entrega ----------
test('verifyDelivery anota "delivered" y, si Resend informa rebote, marca failed para reintentar por Gmail', async () => {
  const ok = setup();
  await ok.service.submit(validBody({ email: '' }));
  await ok.service.verifyDelivery();
  assert.equal(ok.db.rows[0].delivery_status, 'delivered');

  const bad = setup();
  bad.mailer.getDeliveryStatus = async () => ({ ok: true, status: 'bounced' });
  await bad.service.submit(validBody({ email: '' }));
  await bad.service.verifyDelivery();
  assert.equal(bad.db.rows[0].notif_status, 'failed');
  bad.advance(10);
  await bad.service.retryPending();
  assert.equal(bad.db.rows[0].notif_status, 'sent');
  assert.equal(bad.db.rows[0].notif_via, 'gmail');
});

// ---------- prueba técnica ----------
test('una PRUEBA TÉCNICA se marca, no escribe al cliente y no cuenta como contacto real', async () => {
  const { service, db, mailer } = setup();
  const r = await service.submit(validBody({ nombre: 'PRUEBA TÉCNICA — NO CLIENTE REAL', telefono: '000000000', email: 'x@example.com' }));
  assert.equal(r.body.notification, 'sent');
  assert.equal(db.rows[0].is_test, true);
  assert.equal(db.rows[0].estado, 'prueba');
  assert.equal(mailer.sent.length, 1); // sin confirmación al "cliente"
  assert.match(mailer.sent[0].subject, /^\[PRUEBA TÉCNICA — NO CLIENTE REAL\]/);
  // un cliente real con ese nombre pero teléfono real NO se considera prueba
  assert.equal(parseLead(validBody({ nombre: 'PRUEBA TÉCNICA', telefono: '600123456' })).value.is_test, false);
});

// ---------- seguridad del correo ----------
test('los datos del cliente se escapan en el HTML del correo', () => {
  const html = buildNotifEmail({ nombre: '<img src=x onerror=alert(1)>', telefono: '600123456', mensaje: 'línea1\n<script>x</script>', created_at: 'hoy' });
  assert.ok(!html.includes('<img src=x'));
  assert.ok(!html.includes('<script>'));
  assert.match(html, /&lt;script&gt;/);
  assert.equal(esc('a&b"c'), 'a&amp;b&quot;c');
  assert.match(notifSubject({ nombre: 'Ana', is_test: false }), /^NUEVO PRESUPUESTO - Ana$/);
});

// ---------- endpoints ----------
test('administración: sin ADMIN_TOKEN → 503, token incorrecto → 401, correcto → ok', () => {
  assert.equal(isAdmin({ headers: {} }, {}).status, 503);
  assert.equal(isAdmin({ headers: { authorization: 'Bearer mal' } }, { ADMIN_TOKEN: 'secreto-largo' }).status, 401);
  assert.equal(isAdmin({ headers: { authorization: 'Bearer secreto-largo' } }, { ADMIN_TOKEN: 'secreto-largo' }).ok, true);
  assert.equal(isCronOrAdmin({ headers: { 'user-agent': 'vercel-cron/1.0' } }, {}).ok, true);
  assert.equal(isCronOrAdmin({ headers: { 'user-agent': 'curl' } }, { ADMIN_TOKEN: 'x' }).ok, false);
});

function fakeRes() {
  return { headers: {}, code: 200, body: undefined, setHeader(k, v) { this.headers[k] = v; }, status(c) { this.code = c; return this; }, json(b) { this.body = b; return this; }, end() { return this; } };
}

test('GET /api/lead informa de canales sin revelar secretos; POST responde con el resultado real', async () => {
  const { db, mailer, service } = setup();
  const handler = createHandler({ db, mailer, service });
  const get = fakeRes(); await handler({ method: 'GET' }, get);
  assert.equal(get.code, 200);
  assert.deepEqual(Object.keys(get.body).sort(), ['database', 'email', 'ok']);

  const post = fakeRes(); await handler({ method: 'POST', body: validBody() }, post);
  assert.equal(post.code, 200);
  assert.equal(post.body.saved, true);

  const bad = fakeRes(); await handler({ method: 'POST', body: { nombre: 'x' } }, bad);
  assert.equal(bad.code, 400);
});

test('si Resend falla y Gmail salva el aviso, queda anotado el motivo', async () => {
  const { service, db, mailer } = setup();
  mailer.send = async (m) => { mailer.sent.push(m); return { ok: true, via: 'gmail', id: 'g1', fallbackErrors: ['resend: account suspended'] }; };
  await service.submit(validBody({ email: '' }));
  assert.equal(db.rows[0].notif_status, 'sent');
  assert.match(db.rows[0].notif_error, /respaldo usado: resend: account suspended/);
});

test('tope de confirmaciones al cliente: pasado el límite se guarda y se avisa, pero no se escribe al cliente', async () => {
  const { service, db, mailer } = setup();
  for (let i = 0; i < 20; i++) {
    await service.submit(validBody({ idempotency_key: undefined, nombre: 'Cliente ' + i, telefono: '6001234' + String(10 + i), email: `c${i}@example.com` }));
  }
  assert.equal(db.rows.filter((r) => r.confirm_status === 'sent').length, 20);
  const before = mailer.sent.length;
  const r = await service.submit(validBody({ idempotency_key: undefined, nombre: 'Cliente 21', telefono: '600999999', email: 'c21@example.com' }));
  assert.equal(r.body.saved, true);
  assert.equal(r.body.notification, 'sent');
  assert.equal(r.body.confirmation, 'skipped');
  assert.equal(mailer.sent.length, before + 1); // solo el aviso al negocio
});
