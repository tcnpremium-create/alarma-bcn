#!/usr/bin/env node
/**
 * Desacopla los snapshots de prerender de los hashes de build.
 *
 * Los snapshots de public/__prerendered__ se capturan con un navegador, así
 * que se llevan el documento entero — incluidas las referencias a assets con
 * hash de contenido del build en el que se generaron:
 *
 *   <script type="module" src="/assets/index-Dxy4PwHG.js">
 *   <link rel="stylesheet" href="/assets/index-BhcVclsW.css">
 *   <link rel="modulepreload" href="/assets/CameraCityTemplate-voq92lNy.js">  (x13)
 *
 * Como Vite renombra esos ficheros en cuanto cambia su contenido, un simple
 * retoque de CSS dejaba a los 70 snapshots apuntando a un CSS inexistente:
 * Vercel servía la página prerenderizada, el <link> daba 404 y la página se
 * veía SIN ESTILOS hasta que React arrancaba. Con el JS pasaba lo mismo: si
 * el bundle de entrada cambiaba de hash, la SPA no llegaba a montar.
 *
 * Por eso el guardián de frescura invalidaba ante cualquier cambio en src/**:
 * no era exceso de celo, era necesario.
 *
 * Este script rompe esa dependencia. Tras `vite build`, reescribe en cada
 * dist/__prerendered__/*.html las referencias a assets para que apunten a las
 * del build ACTUAL:
 *   - el <script> de entrada y el <link rel="stylesheet"> se sustituyen por
 *     los que acaba de emitir dist/index.html;
 *   - los <link rel="modulepreload"> que apunten a ficheros que ya no existen
 *     se eliminan (son solo una optimización de carga: el bundle importa sus
 *     propios chunks igualmente, así que quitarlos no cambia el resultado,
 *     solo evita peticiones 404).
 *
 * Con esto los snapshots dejan de caducar por motivos de build y el guardián
 * puede limitarse a lo que de verdad cambia el HTML (ver prerender-fingerprint.mjs).
 *
 * Se ejecuta dentro de `npm run build`, después de vite build. Solo toca
 * dist/, nunca los snapshots versionados de public/.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PRERENDERED = path.join(DIST, '__prerendered__');

if (!existsSync(PRERENDERED)) {
  console.log('[assets] No hay dist/__prerendered__; nada que sincronizar.');
  process.exit(0);
}

const indexHtml = readFileSync(path.join(DIST, 'index.html'), 'utf8');

const entryScript = indexHtml.match(/<script[^>]+type="module"[^>]+src="\/assets\/[^"]+"[^>]*><\/script>/);
const entryStyle = indexHtml.match(/<link[^>]+rel="stylesheet"[^>]+href="\/assets\/[^"]+"[^>]*>/);

if (!entryScript || !entryStyle) {
  console.error('[assets] No se encontraron las etiquetas de entrada en dist/index.html. Abortando para no dejar snapshots rotos.');
  process.exit(1);
}

let touched = 0;
let preloadsRemoved = 0;
let refsRewritten = 0;

for (const file of readdirSync(PRERENDERED).filter((f) => f.endsWith('.html'))) {
  const full = path.join(PRERENDERED, file);
  const before = readFileSync(full, 'utf8');
  let html = before;

  // Entrada JS y CSS -> las del build actual.
  html = html.replace(/<script[^>]+type="module"[^>]+src="\/assets\/[^"]+"[^>]*><\/script>/g, () => {
    refsRewritten++;
    return entryScript[0];
  });
  html = html.replace(/<link[^>]+rel="stylesheet"[^>]+href="\/assets\/[^"]+"[^>]*>/g, () => {
    refsRewritten++;
    return entryStyle[0];
  });

  // modulepreload: fuera los que ya no existen en este build.
  html = html.replace(/<link[^>]+rel="modulepreload"[^>]*href="(\/assets\/[^"]+)"[^>]*>/g, (tag, href) => {
    if (existsSync(path.join(DIST, href.replace(/^\//, '')))) return tag;
    preloadsRemoved++;
    return '';
  });

  if (html !== before) {
    writeFileSync(full, html);
    touched++;
  }
}

console.log(
  `[assets] ${touched} snapshot(s) sincronizados con el build actual ` +
  `(${refsRewritten} referencias de entrada reescritas, ${preloadsRemoved} modulepreload obsoletos eliminados).`
);
