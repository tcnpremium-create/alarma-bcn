import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

test('la página indexada de control de accesos enlaza a videoporteros con texto contextual', () => {
  const source = read('src/pages/ControlAccesos.jsx');
  const html = read('public/__prerendered__/control-accesos.html');

  assert.ok(source.includes('to="/videoporteros"'), 'enlace de React');
  assert.ok(html.includes('href="/videoporteros"'), 'enlace visible al rastreador');
  assert.ok(html.includes('instalación de videoporteros en Barcelona'), 'anchor descriptivo');
  assert.ok(html.includes('href="/cerraduras"'), 'preservar el enlace anterior de cerraduras');
});
