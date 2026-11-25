import test from 'node:test';
import assert from 'node:assert/strict';
import { captureMarketingAttribution, leadSourcePage, parseMarketingAttribution } from '../src/lib/leadSource.js';

const makeStore = () => {
  const values = new Map();
  return {
    getItem: key => values.get(key) || null,
    setItem: (key, value) => values.set(key, value),
  };
};

test('sin campaña: mantiene la ruta, nunca modifica la API ni almacena datos', () => {
  const store = makeStore();
  assert.equal(captureMarketingAttribution('https://alarmasenbarcelona.com/Contact', store), null);
  assert.equal(leadSourcePage('/Contact', store), '/Contact');
});

test('guarda UTM de la primera visita y lo adjunta a la ruta desde la que llega el lead', () => {
  const store = makeStore();
  assert.deepEqual(
    captureMarketingAttribution('https://alarmasenbarcelona.com/?utm_source=google&utm_medium=cpc&utm_campaign=navidad2026', store),
    { utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'navidad2026' },
  );
  assert.deepEqual(
    captureMarketingAttribution('https://alarmasenbarcelona.com/Contact?utm_source=facebook&utm_campaign=otra', store),
    { utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'navidad2026' },
  );
  assert.equal(leadSourcePage('/alarmas-barcelona', store), '/alarmas-barcelona?utm_source=google&utm_medium=cpc&utm_campaign=navidad2026');
});

test('rechaza parámetros sensibles y jamás guarda URL completa ni identificadores gclid', () => {
  const store = makeStore();
  captureMarketingAttribution('https://alarmasenbarcelona.com/Contact?utm_source=meta&utm_campaign=persona%40example.com&gclid=private-123&email=nadie%40example.com', store);
  const source = leadSourcePage('/Contact', store);
  assert.equal(source, '/Contact?utm_source=meta');
  assert.ok(!source.includes('gclid'));
  assert.ok(!source.includes('example.com'));
  assert.deepEqual(parseMarketingAttribution('https://alarmasenbarcelona.com/?utm_source=google%20ads&utm_medium=cpc'), { utm_medium: 'cpc' });
});

test('sin sessionStorage disponible la captura nunca bloquea el envío de formularios', () => {
  const blocked = { getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('blocked'); } };
  assert.deepEqual(captureMarketingAttribution('https://alarmasenbarcelona.com/?utm_source=google', blocked), { utm_source: 'google' });
  assert.equal(leadSourcePage('/Contact', blocked), '/Contact');
});

test('ruta segura y límite de campo source_page de 200 caracteres', () => {
  const store = makeStore();
  captureMarketingAttribution('https://alarmasenbarcelona.com/?utm_source=abcdefghijklmnopqrstuvwx01234567&utm_medium=abcdefghijklmnopqrstuvwx01234567&utm_campaign=abcdefghijklmnopqrstuvwx01234567', store);
  assert.ok(leadSourcePage('/alarmas-barcelona', store).length <= 200);
  assert.equal(leadSourcePage('https://evil.example/path', store).startsWith('/'), true);
  assert.equal(leadSourcePage('/Contact?token=sensible', store).includes('sensible'), false);
});
