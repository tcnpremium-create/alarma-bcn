import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { businessStats } from '../src/lib/businessStats.js';

// La dirección oficial es Carrer de Coll i Vehí, 141, 08026 Barcelona.
// La antigua (Balmes, 150, 08008) no debe aparecer en ninguna página ni en el HTML prerenderizado.

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(jsx?|html|xml|json)$/.test(name)) out.push(p);
  }
  return out;
}

const files = [...walk('src'), ...walk('public')].filter((f) => !f.endsWith(path.join('lib', 'businessStats.js')));

test('la dirección antigua no aparece en código ni en páginas prerenderizadas', () => {
  const hits = files.filter((f) => /Balmes,?\s*150|08008\s+Barcelona/i.test(readFileSync(f, 'utf8')));
  assert.deepEqual(hits, []);
});

test('todo el JSON-LD usa la dirección oficial', () => {
  assert.equal(businessStats.addressText, 'Carrer de Coll i Vehí, 141, 08026 Barcelona');
  const streets = new Set();
  const postal = new Set();
  for (const f of files.filter((f) => f.startsWith('src'))) {
    const s = readFileSync(f, 'utf8');
    for (const m of s.matchAll(/"streetAddress":\s*"([^"]+)"/g)) streets.add(m[1]);
    for (const m of s.matchAll(/"postalCode":\s*"([^"]+)"/g)) postal.add(m[1]);
  }
  assert.deepEqual([...streets], [businessStats.address.street]);
  assert.deepEqual([...postal], [businessStats.address.postalCode]);
});
