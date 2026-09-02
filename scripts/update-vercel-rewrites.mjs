#!/usr/bin/env node
/**
 * Genera el bloque `rewrites` de vercel.json. Es la fuente de verdad del
 * enrutado en Vercel; ejecutar tras regenerar los snapshots.
 *
 * El array resultante tiene exactamente tres tramos, en este orden:
 *
 *   1. Una regla por ruta prerenderizada -> /__prerendered__/<archivo>.html
 *      (sirve el HTML con title/H1/canonical/JSON-LD ya resueltos, sin JS).
 *   2. Las rutas legítimas del router que NO están prerenderizadas
 *      (panel interno, área de clientes, /Servicios) -> /index.html,
 *      donde React Router las resuelve en cliente.
 *   3. El passthrough de /api/*.
 *
 * NO hay catch-all "/(.*)  -> /index.html". Ese catch-all era la causa del
 * soft 404 global: como dist/index.html contiene desde la Fase 1 el
 * prerender de la home, CUALQUIER URL inexistente devolvía 200 con una
 * copia completa de la home. Sin catch-all, una ruta que no casa con
 * ninguna regla llega al sistema de archivos, no existe, y Vercel responde
 * 404 sirviendo dist/404.html (public/404.html en el repo).
 *
 * Consecuencia importante: si se añade una ruta pública nueva al router hay
 * que prerenderizarla (entra en el sitemap -> prerender.mjs -> este script)
 * o añadirla a SPA_ONLY_ROUTES. Si no, devolverá 404. Es deliberado: es
 * preferible un 404 explícito a servir la home en su lugar.
 *
 * "/" no lleva regla: Vercel resuelve la raíz al archivo estático
 * dist/index.html antes de evaluar rewrites, así que un rewrite para "/"
 * nunca se aplicaría. La home se resuelve inyectando el prerender dentro
 * de dist/index.html en cada build (scripts/inject-home-prerender.mjs).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

/**
 * Rutas que existen en el router pero no se prerenderizan ni se indexan:
 * se sirven con el shell de la SPA y React Router las resuelve en cliente.
 * /AdminLeads y /AreaClientes ya están bloqueadas en robots.txt.
 */
const SPA_ONLY_ROUTES = ['/AdminLeads', '/AreaClientes', '/Servicios'];

const manifest = JSON.parse(readFileSync(path.join(ROOT, 'scripts/prerender-manifest.json'), 'utf8'));
const vercelConfigPath = path.join(ROOT, 'vercel.json');
const config = JSON.parse(readFileSync(vercelConfigPath, 'utf8'));

const prerenderedRewrites = manifest
  .filter((r) => r.ok && r.route !== '/')
  .map((r) => ({ source: r.route, destination: `/__prerendered__/${r.file}` }));

const spaRewrites = SPA_ONLY_ROUTES.map((r) => ({ source: r, destination: '/index.html' }));

config.rewrites = [
  ...prerenderedRewrites,
  ...spaRewrites,
  { source: '/api/(.*)', destination: '/api/$1' },
];

// Una sola versión canónica por URL: sin barra final. Vercel emite un 308
// de /ruta/ a /ruta, que es la forma que declaran el sitemap, los canonical
// y los enlaces internos. Sin esto, /ruta/ no casaba con ninguna regla de
// rewrite y caía al catch-all, sirviendo la home.
config.trailingSlash = false;

writeFileSync(vercelConfigPath, JSON.stringify(config, null, 2) + '\n');
console.log(
  `vercel.json: ${prerenderedRewrites.length} rewrites de prerender + ${spaRewrites.length} rutas SPA + api. ` +
  `Sin catch-all. trailingSlash=false.`
);
