import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const stripComments = (html) => html.replace(/<!--[\s\S]*?-->/g, '');

const criticalRoutes = [
  ['camaras-barcelona', 'Instalación de Cámaras de Seguridad en Barcelona'],
  ['camaras-sabadell', 'Cámaras'],
  ['alarmas-barcelona', 'Alarmas'],
  ['alarmas-sabadell', 'Alarmas'],
];

test('las landings comerciales críticas tienen HTML inicial indexable y canonical único', () => {
  const sitemap = read('public/sitemap.xml');
  const robots = read('public/robots.txt');
  const vercel = JSON.parse(read('vercel.json'));

  for (const [slug, expectedText] of criticalRoutes) {
    const url = `https://alarmasenbarcelona.com/${slug}`;
    const html = stripComments(read(`public/__prerendered__/${slug}.html`));
    const titles = [...html.matchAll(/<title(?:\s[^>]*)?>([^<]+)<\/title>/gi)];
    const canonicals = [...html.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)];
    const descriptions = [...html.matchAll(/<meta\b[^>]*\bname=["']description["'][^>]*>/gi)];
    const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];

    assert.equal(titles.length, 1, `${slug}: un solo title`);
    assert.ok(titles[0][1].includes(expectedText), `${slug}: título pertinente`);
    assert.equal(canonicals.length, 1, `${slug}: un solo canonical`);
    assert.ok(canonicals[0][0].includes(`href="${url}"`), `${slug}: canonical correcto`);
    assert.equal(descriptions.length, 1, `${slug}: una sola description`);
    assert.equal(h1s.length, 1, `${slug}: un solo H1`);
    assert.ok(h1s[0][1].replace(/<[^>]+>/g, '').trim().length > 15, `${slug}: H1 con texto`);
    assert.ok(sitemap.includes(`<loc>${url}</loc>`), `${slug}: presente en sitemap`);
    assert.ok(vercel.rewrites.some((rule) => rule.source === `/${slug}` && rule.destination === `/__prerendered__/${slug}.html`), `${slug}: rewrite prerender`);
    assert.ok(!robots.includes(`Disallow: /${slug}`), `${slug}: no bloqueada por robots`);
  }
});

test('www se consolida en dominio principal con redirección permanente', () => {
  const redirects = JSON.parse(read('vercel.json')).redirects;
  assert.ok(redirects.some((r) =>
    r.source === '/(.*)' &&
    r.permanent === true &&
    r.destination === 'https://alarmasenbarcelona.com/$1' &&
    r.has?.some((h) => h.type === 'host' && h.value === 'www.alarmasenbarcelona.com')
  ));
});
