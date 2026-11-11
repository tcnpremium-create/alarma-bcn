import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const stripComments = (html) => html.replace(/<!--[\s\S]*?-->/g, '');

const routes = [
  'camaras-barcelona',
  'alarmas-barcelona',
  'videoporteros',
  'control-accesos',
  'cerraduras',
  'redes-informaticas',
  'sonorizacion',
];

test('las siete landings tienen HTML prerenderizado indexable y canonical único', () => {
  const sitemap = read('public/sitemap.xml');
  const vercel = JSON.parse(read('vercel.json'));

  for (const slug of routes) {
    const url = `https://alarmasenbarcelona.com/${slug}`;
    const html = stripComments(read(`public/__prerendered__/${slug}.html`));
    const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    const canonicals = [...html.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)];
    const descriptions = [...html.matchAll(/<meta\b[^>]*\bname=["']description["'][^>]*>/gi)];

    assert.equal(titles.length, 1, `${slug}: solo un title`);
    assert.ok(titles[0][1].includes('Barcelona'), `${slug}: title local`);
    assert.equal(headings.length, 1, `${slug}: solo un H1`);
    assert.ok(headings[0][1].replace(/<[^>]+>/g, '').trim().length > 20, `${slug}: H1 legible`);
    assert.equal(canonicals.length, 1, `${slug}: solo un canonical`);
    assert.ok(canonicals[0][0].includes(`href="${url}"`), `${slug}: canonical propio`);
    assert.equal(descriptions.length, 1, `${slug}: una description`);
    assert.ok(/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["']index, follow/i.test(html), `${slug}: debe permitir indexar`);
    assert.ok(sitemap.includes(`<loc>${url}</loc>`), `${slug}: incluida en sitemap`);
    assert.ok(vercel.rewrites.some((r) => r.source === `/${slug}` && r.destination === `/__prerendered__/${slug}.html`), `${slug}: rewrite estático`);
  }
});

test('Servicios enlaza visiblemente a las siete landings sin depender de JS', () => {
  const html = stripComments(read('public/__prerendered__/Servicios.html'));
  const source = read('src/pages/Servicios.jsx');
  assert.ok(html.includes('aria-label="Ver servicios especializados"'), 'navegación del catálogo');
  for (const slug of routes) {
    assert.ok(html.includes(`href="/${slug}"`), `falta enlace HTML a ${slug}`);
    assert.ok(source.includes(`href: "/${slug}"`), `falta enlace React a ${slug}`);
  }
});

test('el build de producción detiene snapshots obsoletos antes de Vite', () => {
  const script = JSON.parse(read('package.json')).scripts.build;
  assert.ok(script.startsWith('node scripts/prerender-fingerprint.mjs --check && '),
    'debe comprobar huella al inicio de npm run build');
});
