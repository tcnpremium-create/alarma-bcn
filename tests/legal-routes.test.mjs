import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const vercel = JSON.parse(readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const legalRoutes = ['AvisoLegal', 'Cookies', 'Privacidad'];

test('las páginas legales enlazadas desde el pie no devuelven 404 por falta de rewrite', () => {
  for (const name of legalRoutes) {
    const url = `/${name}`;
    const destination = `/__prerendered__/${name}.html`;
    const route = vercel.rewrites.filter((entry) => entry.source === url);

    assert.equal(route.length, 1, `${url}: debe existir un único rewrite`);
    assert.equal(route[0].destination, destination);
    const snapshot = path.join(root, 'public', '__prerendered__', `${name}.html`);
    assert.ok(existsSync(snapshot), `${url}: falta snapshot estático`);
    assert.match(readFileSync(snapshot, 'utf8'), /<h1(?:\\s|>)/i, `${url}: HTML sin H1`);
  }
});

test('el generador conservará las rutas legales tras regenerar el prerender', () => {
  const generator = readFileSync(path.join(root, 'scripts/update-vercel-rewrites.mjs'), 'utf8');
  for (const name of legalRoutes) {
    assert.match(generator, new RegExp(`['"]/${name}['"]`));
  }
  assert.match(generator, /\.\.\.legalRewrites/);
});

test('las rutas internas y API mantienen sus reglas originales', () => {
  assert.deepEqual(vercel.rewrites.slice(-3), [
    { source: '/AdminLeads', destination: '/index.html' },
    { source: '/AreaClientes', destination: '/index.html' },
    { source: '/api/(.*)', destination: '/api/$1' },
  ]);
});
