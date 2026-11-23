import test from 'node:test';
import assert from 'node:assert/strict';
import { createBlackFridayService, drawSector, CAMPAIGN_START, CAMPAIGN_END } from '../api/black-friday.js';

const now = () => Date.parse('2026-11-25T12:00:00+01:00');
function setup(randomNumber = 250) {
  const rows = new Map();
  let submissions = 0;
  const db = {
    async getByKey(key) { return { data: rows.get(key) || null, error: null }; },
  };
  const leadService = {
    async submit(data) {
      submissions += 1;
      if (rows.has(data.idempotency_key)) return { body: { success: true, saved: true, duplicate: true } };
      const row = { ...data, id: 'f478a91e-aaaa-bbbb-cccc-123456789012' };
      rows.set(data.idempotency_key, row);
      return { body: { success: true, saved: true, duplicate: false } };
    },
  };
  const participate = createBlackFridayService({ db, leadService, now, random: () => randomNumber });
  return { participate, get submissions() { return submissions; }, rows };
}
const person = { nombre: 'Prueba de cliente', telefono: '638 123 456', email: 'cliente@example.com', privacyAccepted: true, marketingOptIn: false };

test('Los cuatro sectores siguen una probabilidad real del 5% de premio', () => {
  assert.equal(drawSector(() => 0), 0);
  assert.equal(drawSector(() => 24), 0);
  assert.equal(drawSector(() => 25), 1);
  assert.equal(drawSector(() => 499), 1);
  assert.equal(drawSector(() => 500), 2);
  assert.equal(drawSector(() => 524), 2);
  assert.equal(drawSector(() => 525), 3);
  assert.equal(drawSector(() => 999), 3);
});

test('El registro se guarda con el resultado, antes de anunciarlo al cliente', async () => {
  const fixture = setup(250);
  const first = await fixture.participate(person);
  assert.equal(first.status, 200);
  assert.equal(first.body.won, false);
  assert.equal(first.body.sector, 1);
  assert.equal(first.body.registered, true);
  assert.equal(first.body.code, null);
  assert.equal(fixture.submissions, 1);
  const onlyRow = [...fixture.rows.values()][0];
  assert.match(onlyRow.mensaje, /^\[BF2026:1:no\]/);
  assert.equal(onlyRow.source_page, '/Promociones#black-friday');
});

test('El ganador recibe un codigo de un solo registro, no generado en el navegador', async () => {
  const fixture = setup(500);
  const result = await fixture.participate({ ...person, marketingOptIn: true });
  assert.equal(result.status, 200);
  assert.equal(result.body.won, true);
  assert.equal(result.body.sector, 2);
  assert.equal(result.body.code, 'BF26-F478A91E');
  assert.match([...fixture.rows.values()][0].mensaje, /^\[BF2026:2:si\]/);
});

test('No permite una segunda tirada para el mismo teléfono, incluso con otro formato', async () => {
  const fixture = setup(10);
  const first = await fixture.participate(person);
  const second = await fixture.participate({ ...person, telefono: '+34 638 123 456' });
  assert.equal(first.body.won, true);
  assert.equal(second.body.alreadyPlayed, true);
  assert.equal(second.body.code, first.body.code);
  assert.equal(fixture.submissions, 1);
});

test('No revela un premio si el telefono se usa con otro correo', async () => {
  const fixture = setup(10);
  await fixture.participate(person);
  const second = await fixture.participate({ ...person, email: 'otro@example.com' });
  assert.equal(second.status, 409);
  assert.equal(second.body.code, undefined);
  assert.equal(fixture.submissions, 1);
});

test('Consentimiento de marketing opcional pero información de privacidad obligatoria', async () => {
  const fixture = setup();
  const refusal = await fixture.participate({ ...person, privacyAccepted: false });
  assert.equal(refusal.status, 400);
  assert.equal(fixture.submissions, 0);
  const voluntary = await fixture.participate(person);
  assert.equal(voluntary.body.registered, true);
});

test('No concede tiradas fuera de la campaña', async () => {
  const fixture = setup();
  const before = createBlackFridayService({ db: { getByKey: async () => ({ data: null, error: null }) }, leadService: {}, now: () => CAMPAIGN_START - 1 });
  const after = createBlackFridayService({ db: { getByKey: async () => ({ data: null, error: null }) }, leadService: {}, now: () => CAMPAIGN_END });
  assert.equal((await before(person)).status, 410);
  assert.equal((await after(person)).status, 410);
  assert.equal(fixture.submissions, 0);
});

test('Si la base de datos falla, no hay premio sin registro', async () => {
  const db = { getByKey: async () => ({ data: null, error: { message: 'sin conexion' } }) };
  const participate = createBlackFridayService({ db, leadService: {}, now });
  const response = await participate(person);
  assert.equal(response.status, 503);
  assert.equal(response.body.registered, undefined);
});
