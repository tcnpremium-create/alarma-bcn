// Prevent commercial SEO tags and the HTML sent to Google from drifting apart.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const PAGES = [
  {
    "source": "src/pages/Home.jsx",
    "snapshot": "home.html",
    "route": "/",
    "title": "Instaladores de Alarmas y Cámaras en Barcelona | Premium Tech",
    "description": "Empresa instaladora de alarmas Ajax y cámaras de seguridad en Barcelona. Protegemos viviendas, negocios y comunidades. Presupuesto gratis: 638 10 99 47."
  },
  {
    "source": "src/components/seo/CityLandingSEO.jsx",
    "snapshot": "alarmas-barcelona.html",
    "route": "/alarmas-barcelona",
    "title": "Empresa de Alarmas en Barcelona | Instalación Ajax sin Cuotas",
    "description": "Instaladores de alarmas Ajax en Barcelona para hogares, negocios y comunidades. Kits desde 399 € + IVA con instalación. CRA opcional. Presupuesto gratis."
  },
  {
    "source": "src/pages/CamarasBarcelona.jsx",
    "snapshot": "camaras-barcelona.html",
    "route": "/camaras-barcelona",
    "title": "Instalación de Cámaras de Seguridad en Barcelona | Premium Tech",
    "description": "Instalamos cámaras de seguridad en Barcelona para viviendas, negocios y comunidades. Videovigilancia IP, grabación NVR y presupuesto personalizado."
  },
{
  "source": "src/components/seo/CityLandingSEO.jsx",
  "snapshot": "alarmas-sabadell.html",
  "route": "/alarmas-sabadell",
  "title": "Instaladores de Alarmas en Sabadell | Ajax sin Cuotas",
  "description": "Instalación de alarmas Ajax en Sabadell y Vallès Occidental para viviendas, negocios y comunidades. Sin cuotas obligatorias; CRA opcional. Presupuesto gratis."
},
{
  "source": "src/pages/CamarasSabadell.jsx",
  "snapshot": "camaras-sabadell.html",
  "route": "/camaras-sabadell",
  "title": "Instaladores de Cámaras de Seguridad en Sabadell | CCTV",
  "description": "Instaladores de cámaras de seguridad, videovigilancia IP y CCTV en Sabadell. Sistemas para hogares, empresas y comunidades con acceso móvil. Presupuesto gratis."
}
];
const sitemap = readFileSync('public/sitemap.xml', 'utf8');

for (const page of PAGES) {
  test(`SEO comercial sincronizado: ${page.route}`, () => {
    const source = readFileSync(page.source, 'utf8');
    const html = readFileSync(`public/__prerendered__/${page.snapshot}`, 'utf8');
    assert.ok(source.includes(page.title), 'El title fuente no coincide');
    assert.ok(source.includes(page.description), 'La descripción fuente no coincide');
    assert.ok(html.includes(`<title>${page.title}</title>`), 'El title servido a Google está obsoleto');
    assert.ok(html.includes(`name="description" content="${page.description}"`), 'Falta meta description actualizada');
    assert.ok(html.includes(`property="og:title" content="${page.title}"`), 'El Open Graph no coincide');
    assert.ok(html.includes(`name="twitter:description" content="${page.description}"`), 'La descripción de Twitter no coincide');
    assert.ok(html.includes(`rel="canonical" href="https://alarmasenbarcelona.com${page.route === '/' ? '' : page.route}"`), 'Canonical inesperada');
    assert.ok(sitemap.includes(`<loc>https://alarmasenbarcelona.com${page.route}</loc><lastmod>2026-10-14</lastmod>`), 'Fecha de sitemap incorrecta');
  });
}
