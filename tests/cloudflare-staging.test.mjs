import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildCloudflareRedirects } from '../scripts/generate-cloudflare-redirects.mjs';
import { createCloudflareMailer } from '../cloudflare/mailer.js';
import { onRequest as lead } from '../functions/api/lead.js';
import { onRequest as list } from '../functions/api/leads.js';
import { onRequest as retry } from '../functions/api/cron/retry-notifs.js';

const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
const redirects = readFileSync('public/_redirects', 'utf8');

test('Cloudflare replica los HTML SEO y las redirecciones sin perder 404 ni interceptar la API', () => {
  assert.equal(buildCloudflareRedirects(config), redirects, '_redirects debe seguir la fuente de verdad');
  assert.match(redirects, /^\/Contact \/__prerendered__\/Contact\.html 200$/m);
  assert.match(redirects, /^\/contacto \/Contact 301$/m);
  assert.match(redirects, /^\/AreaClientes \/index\.html 200$/m);
  assert.match(redirects, /^\/BlogArticle\/alarma-local-comercial \/__prerendered__\/BlogArticle__alarma-local-comercial\.html 200$/m);
  assert.doesNotMatch(redirects, /^\/api\//m);
  assert.doesNotMatch(redirects, /^\/\(\.\*\)/m);
  assert.doesNotMatch(redirects, /^\/\* /m, 'No añadir un catch-all que convierta 404 en páginas duplicadas');
  for (const route of config.rewrites.filter(x => x.source.startsWith('/') && !x.source.startsWith('/api/'))) {
    assert.ok(redirects.includes(route.source + ' ' + route.destination + ' 200'), route.source);
  }
});

test('Cloudflare no interpreta condiciones por host de Vercel como redirecciones generales', () => {
  assert.ok(config.redirects.some(x => x.has?.length));
  assert.doesNotMatch(redirects, /https:\/\/alarmasenbarcelona\.com\/\$1/);
});

test('el envío HTTPS usa Resend sin transportar secretos al cliente', async () => {
  const requests = [];
  const mock = async (url, options) => {
    requests.push({ url, options });
    return { ok: true, json: async () => ({ id: 'email-1', last_event: 'delivered', data: [] }) };
  };
  const mailer = createCloudflareMailer({ RESEND_API_KEY: 'solo-test', RESEND_FROM: 'info@alarmasenbarcelona.com' }, { fetchImpl: mock });
  assert.deepEqual(mailer.channels(), { resend: true, gmail: false });
  const sent = await mailer.send({ to: 'destino@example.com', subject: 'Prueba sin envío', html: '<p>Prueba</p>' });
  assert.deepEqual({ ok: sent.ok, via: sent.via }, { ok: true, via: 'resend' });
  assert.equal(requests[0].url, 'https://api.resend.com/emails');
  assert.equal(requests[0].options.headers.Authorization, 'Bearer solo-test');
  assert.equal(JSON.parse(requests[0].options.body).reply_to, 'tcnpremium@gmail.com');
  assert.deepEqual(await mailer.getDeliveryStatus('email-1'), { ok: true, status: 'delivered' });
  assert.equal((await mailer.getDomains()).ok, true);
});

test('sin un proveedor configurado, el mailer NO simula entrega', async () => {
  const mailer = createCloudflareMailer({});
  assert.deepEqual(mailer.channels(), { resend: false, gmail: false });
  const result = await mailer.send({ to: 'destino@example.com', subject: 'Prueba', html: 'Prueba' });
  assert.equal(result.ok, false);
});

test('la API Cloudflare permanece cerrada y legible sin credenciales de staging', async () => {
  const result = await lead({ request: new Request('https://staging.pages.dev/api/lead'), env: {} });
  assert.equal(result.status, 503);
  const json = await result.json();
  assert.equal(json.database, false);
  assert.equal(json.ok, false);
  assert.equal((await lead({ request: new Request('https://staging.pages.dev/api/lead', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' }), env: {} })).status, 400);
  assert.equal((await list({ request: new Request('https://staging.pages.dev/api/leads'), env: {} })).status, 503);
  assert.equal((await retry({ request: new Request('https://staging.pages.dev/api/cron/retry-notifs'), env: {} })).status, 503);
});
