import test from 'node:test';
import assert from 'node:assert/strict';
import { createLeadService, NOTIF_MAX_ATTEMPTS } from '../api/_lib/leads-core.js';

function harness(status, attempts = 1) {
  const patches = [];
  const row = {
    id: 'test-notification',
    notif_status: 'sent',
    notif_via: 'resend',
    notif_provider_id: 'resend-id',
    notif_attempts: attempts,
  };
  const db = {
    listForDelivery: async () => ({ data: [row], error: null }),
    update: async (id, patch) => { patches.push({ id, patch }); return { data: { ...row, ...patch }, error: null }; },
  };
  const mailer = { getDeliveryStatus: async () => ({ ok: true, status }) };
  const log = { error: () => {} };
  const svc = createLeadService({ db, mailer, now: () => new Date('2026-11-10T14:00:00Z'), log });
  return { svc, patches };
}

test('Resend failed delivery is not counted as an emailed lead', async () => {
  const h = harness('failed');
  const result = await h.svc.verifyDelivery();
  assert.equal(result.checked, 1);
  assert.equal(h.patches[0].patch.notif_status, 'failed');
  assert.equal(h.patches[0].patch.delivery_status, 'failed');
  assert.match(h.patches[0].patch.notif_error, /Resend informó: failed/);
});

test('After max retries, failed delivery remains visible as failed_final', async () => {
  const h = harness('failed', NOTIF_MAX_ATTEMPTS);
  await h.svc.verifyDelivery();
  assert.equal(h.patches[0].patch.notif_status, 'failed_final');
});

test('A genuine Resend delivery is not mislabeled as failed', async () => {
  const h = harness('delivered');
  await h.svc.verifyDelivery();
  assert.equal(h.patches[0].patch.delivery_status, 'delivered');
  assert.equal(h.patches[0].patch.notif_status, undefined);
});

test('Resend bounce remains a failed notification', async () => {
  const h = harness('bounced');
  await h.svc.verifyDelivery();
  assert.equal(h.patches[0].patch.notif_status, 'failed');
});
