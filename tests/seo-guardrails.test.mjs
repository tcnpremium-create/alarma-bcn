import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('la portada distingue alarmas y camaras de la landing especifica', () => {
  const hero = read('src/components/landing/HeroProf.jsx');
  const home = read('src/pages/Home.jsx');
  const camera = read('src/pages/CamarasBarcelona.jsx');
  assert.match(hero, /h1a: "Instalación de Alarmas y Cámaras"/);
  assert.match(home, /title="Instaladores de Alarmas y Cámaras en Barcelona \| Premium Tech"/);
  assert.match(camera, /seoPath="\/camaras-barcelona"/);
  assert.match(camera, /seoTitle="Instalación de Cámaras de Seguridad en Barcelona/);
});

test('las principales URLs comerciales del sitemap son unicas', () => {
  const xml = read('public/sitemap.xml');
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(new Set(locations).size, locations.length);
  for (const path of ['/','/camaras-barcelona','/camaras-sabadell','/alarmas-barcelona','/alarmas-sabadell','/Contact']) {
    assert.ok(locations.includes(`https://alarmasenbarcelona.com${path}`), `falta ${path}`);
  }
});

test('las migas JSON-LD usan la URL canonica de las fichas y no solo Inicio', () => {
  const seo = read('src/components/seo/AdvancedSEO.jsx');
  assert.match(seo, /new URL\(canonical\)\.pathname === "\/"/);
  assert.match(seo, /if \(!isHomepage\)/);
  assert.match(seo, /"position": 2/);
  assert.match(seo, /"item": canonical/);
});

test('robots conserva acceso a paginas comerciales y sitemap canonico', () => {
  const robots = read('public/robots.txt');
  assert.match(robots, /Allow: \/\n/);
  assert.match(robots, /Sitemap: https:\/\/alarmasenbarcelona\.com\/sitemap\.xml/);
  assert.doesNotMatch(robots, /Disallow: \/\s*$/m);
});
