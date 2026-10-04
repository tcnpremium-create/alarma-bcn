#!/usr/bin/env node
/**
 * Vercel resuelve "/" directamente al archivo estático dist/index.html
 * como índice de directorio, ANTES de evaluar vercel.json > rewrites
 * (confirmado en producción: /camaras-barcelona sirve correctamente su
 * snapshot vía rewrite, pero / seguía sirviendo el shell vacío pese a
 * tener una regla de rewrite idéntica). Por eso la home necesita un
 * tratamiento distinto al resto de rutas prerenderizadas: en vez de un
 * rewrite, el propio dist/index.html tiene que contener ya el contenido
 * prerenderizado.
 *
 * Este script corre DESPUÉS de `vite build` y ANTES de deploy: toma el
 * dist/index.html recién generado (con los hashes de assets correctos
 * de ESTE build) y le inyecta el <head> extra (title/meta/canonical/OG/
 * JSON-LD) + el <body> completo capturados en
 * public/__prerendered__/home.html — sin tocar los <script>/<link> de
 * assets, que siempre vienen del build actual, nunca del snapshot
 * versionado (así nunca hay riesgo de referenciar un JS/CSS con un hash
 * que ya no existe).
 *
 * Uso: node scripts/inject-home-prerender.mjs   (después de `vite build`)
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST_INDEX = path.join(ROOT, 'dist/index.html');
const SNAPSHOT = path.join(ROOT, 'public/__prerendered__/home.html');

if (!existsSync(DIST_INDEX) || !existsSync(SNAPSHOT)) {
  console.error('Falta dist/index.html o public/__prerendered__/home.html — ¿corriste `vite build` y `prerender.mjs` antes?');
  process.exit(1);
}

const baseHtml = readFileSync(DIST_INDEX, 'utf8');
const snapshotHtml = readFileSync(SNAPSHOT, 'utf8');

// Tags que Helmet inyectó en el <head> del snapshot y NO existen ya en el
// index.html base (title, meta description, canonical, OG, twitter, JSON-LD).
// Se quitan los comentarios HTML antes de buscar: index.html tiene un
// comentario explicativo que MENCIONA "<title>", "<meta name=\"description\">"
// etc. como texto plano — sin esto, el regex de <title> confunde ese texto
// con una apertura real y se extiende (no-greedy pero sin match temprano)
// hasta el próximo "</title>" real, engullendo todo lo que hay en medio
// (incluido el <script type="module"> real) en una sola captura corrupta.
const snapshotHead = snapshotHtml.match(/<head>([\s\S]*?)<\/head>/)[1].replace(/<!--[\s\S]*?-->/g, '');
const helmetTags = [...snapshotHead.matchAll(
  /<title[^>]*>[\s\S]*?<\/title>|<meta[^>]+name="(?:description|twitter:[^"]+)"[^>]*\/?>|<meta[^>]+property="og:[^"]+"[^>]*\/?>|<link[^>]+rel="canonical"[^>]*\/?>|<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g
)].map((m) => m[0]);

if (helmetTags.length === 0) {
  console.error('No se encontraron tags de Helmet en el snapshot — abortando para no dejar la home sin SEO.');
  process.exit(1);
}

// Salvaguarda: ninguno de los tags extraídos debería contener un
// <script type="module"> real (eso significaría que el regex se comió
// contenido que no debía — como pasó con el bug del comentario de arriba).
const corrupted = helmetTags.some((t) => t.includes('<script type="module"'));
if (corrupted) {
  console.error('Un tag extraído contiene <script type="module"> — probable captura corrupta. Abortando.');
  process.exit(1);
}

// OJO: index.html lleva un comentario en el <head> que contiene el texto
// literal "<body>" — un regex /<body>.../ casa ahí y se come todo el head
// (hojas de estilo incluidas → web sin CSS: menú, cabecera fija y todo lo
// demás se descolocan). Se usa el ÚLTIMO <body> real por índice.
function bodyRange(html) {
  const start = html.lastIndexOf('<body>');
  const end = html.lastIndexOf('</body>');
  if (start === -1 || end === -1 || end < start) {
    console.error('No se pudo localizar <body>...</body> — abortando.');
    process.exit(1);
  }
  return [start + '<body>'.length, end];
}
const [snapStart, snapEnd] = bodyRange(snapshotHtml);
const snapshotBody = snapshotHtml.slice(snapStart, snapEnd);

// BUG REAL (producción, oct-2026): el comentario de arriba decía "sin
// tocar los <script> de assets... nunca hay riesgo de referenciar un
// hash que ya no existe", pero el replace de más abajo sustituye TODO
// el <body>, y el entrypoint de Vite (<script type="module"
// src="/assets/index-HASH.js">) vive DENTRO del body, no del head. El
// snapshot de home.html tiene su propio <script> con el hash de la
// build en que se capturó — al reemplazar el body entero, ese script
// viejo se colaba en el dist/index.html de la build actual, con un
// hash que ya no existe en dist/assets/. Resultado real en producción:
// index.html pedía un .js que daba 404 → la home nunca arrancaba React
// (sin interactividad: menús, cookies, botones, nada funcionaba).
//
// Fix: el script real (el de ESTA build, recién generado por `vite
// build`) se extrae de baseHtml antes de tocar nada, se quita cualquier
// <script type="module"> que venga del snapshot, y se reinserta el
// real al final del body ya sustituido.
const realEntryScripts = [...baseHtml.matchAll(/<script[^>]*type="module"[^>]*>[\s\S]*?<\/script>/g)].map((m) => m[0]);
if (realEntryScripts.length === 0) {
  console.error('No se encontró el <script type="module"> real de esta build en dist/index.html — abortando para no dejar la home sin JS.');
  process.exit(1);
}
const snapshotBodyNoScripts = snapshotBody
  // El <script type="module"> del entrypoint (tratado arriba).
  .replace(/<script[^>]*type="module"[^>]*>[\s\S]*?<\/script>/g, '')
  // El snapshot puede llevar colado dentro del <body> un <link> de CSS o
  // de modulepreload con el hash de la build en que se capturó — visto
  // en producción en home.html (<link rel="stylesheet" ... index-HASH.css>
  // duplicado dentro del body, no solo en el head). Cualquier <link> de
  // asset dentro del body es sospechoso por definición: el real ya está
  // en el <head> de baseHtml, sin tocar.
  .replace(/<link[^>]*rel="(?:stylesheet|modulepreload)"[^>]*>/g, '');

const headEnd = baseHtml.lastIndexOf('</head>');
let out = baseHtml.slice(0, headEnd) + helmetTags.join('\n    ') + '\n  ' + baseHtml.slice(headEnd);
const [outStart, outEnd] = bodyRange(out);
out = out.slice(0, outStart) + snapshotBodyNoScripts + realEntryScripts.join('') + out.slice(outEnd);

// Salvaguarda final: el index.html que se va a escribir debe referenciar
// un asset que de verdad existe en ESTE dist/, nunca el de un snapshot
// viejo (es exactamente el bug que se acaba de corregir arriba).
if (!/<link rel="stylesheet"[^>]*href="\/assets\/[^"]+\.css"/.test(out)) {
  console.error('dist/index.html perdió la hoja de estilos de la build — abortando para no desplegar una web sin CSS.');
  process.exit(1);
}
const assetsDir = path.join(ROOT, 'dist/assets');
const referencedAssets = [...out.matchAll(/\/assets\/([^"']+)/g)].map((m) => m[1]);
const missing = referencedAssets.filter((f) => !existsSync(path.join(assetsDir, f)));
if (missing.length > 0) {
  console.error('dist/index.html referenciaría assets que no existen en dist/assets/:', missing);
  process.exit(1);
}

writeFileSync(DIST_INDEX, out);
console.log(`dist/index.html actualizado con ${helmetTags.length} tags SEO + body prerenderizado de la home (assets verificados).`);
