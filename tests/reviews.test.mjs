import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { GOOGLE_REVIEWS } from '../src/data/googleReviews.js';
import { businessStats } from '../src/lib/businessStats.js';

// Solo se muestran reseñas reales de Google (src/data/googleReviews.js).
// La web tuvo testimonios inventados con firma ("— Laura S., Montigalà",
// "Opinión verificada"...) que no existían en la ficha.

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.jsx?$/.test(name)) out.push(p);
  }
  return out;
}
const src = walk('src').filter((f) => !f.endsWith(path.join('data', 'googleReviews.js')));

test('no hay testimonios firmados fuera de googleReviews.js', () => {
  const signed = /— [A-ZÁÉÍÓÚ][a-záéíóúñ]+ [A-Z]\.|(name|author|nombre): ["'][A-ZÁÉÍÓÚ][a-záéíóúñ]+ [A-Z]\.["']|Opinión verificada|Testimonio verificado/;
  assert.deepEqual(src.filter((f) => signed.test(readFileSync(f, 'utf8'))), []);
});

test('las reseñas tienen nombre, fecha y texto', () => {
  assert.ok(GOOGLE_REVIEWS.length >= 3);
  for (const r of GOOGLE_REVIEWS) assert.ok(r.name && r.date && r.text && r.stars >= 1 && r.stars <= 5);
});

test('los enlaces de mapa apuntan a la ficha de Barcelona, no a la de Polinyà', () => {
  assert.match(businessStats.mapsUrl, /cid=4037912173356516535/);
  assert.deepEqual(src.filter((f) => readFileSync(f, 'utf8').includes('5715602764533889179')), []);
});
