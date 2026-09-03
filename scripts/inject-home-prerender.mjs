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
 * dist/index.html recién generado y le inyecta el <head> extra
 * (title/meta/canonical/OG/JSON-LD) + el <body> completo del snapshot de la
 * home.
 *
 * EL SNAPSHOT SE LEE DE dist/, NO DE public/. En este proyecto Vite emite el
 * <script type="module"> y el <link rel="stylesheet"> de entrada AL FINAL DEL
 * BODY, no en el <head>. Como aquí se sustituye el body entero por el del
 * snapshot, esas dos etiquetas venían del snapshot versionado: bastaba con
 * cambiar el CSS o el bundle de entrada para que la home (la página más
 * importante del sitio) quedara apuntando a un /assets/index-HASH.css y un
 * .js inexistentes — sin estilos y sin que React llegara a montar.
 * scripts/sync-prerendered-assets.mjs, que corre justo antes en la cadena de
 * build, ya deja dist/__prerendered__/home.html con las etiquetas del build
 * actual; leyendo de ahí, la home hereda siempre los assets correctos.
 *
 * Uso: node scripts/inject-home-prerender.mjs
 *      (después de `vite build` y de sync-prerendered-assets.mjs)
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST_INDEX = path.join(ROOT, 'dist/index.html');
const SNAPSHOT = path.join(ROOT, 'dist/__prerendered__/home.html');

if (!existsSync(DIST_INDEX) || !existsSync(SNAPSHOT)) {
  console.error('Falta dist/index.html o dist/__prerendered__/home.html — ¿corriste `vite build` (y antes `npm run prerender`) ?');
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

const snapshotBody = snapshotHtml.match(/<body>([\s\S]*)<\/body>/)[1];

let out = baseHtml.replace('</head>', helmetTags.join('\n    ') + '\n  </head>');
out = out.replace(/<body>[\s\S]*<\/body>/, `<body>${snapshotBody}</body>`);

// Última red: ningún /assets/… referenciado por la home puede faltar del
// build. Si falta, la home se serviría sin estilos y sin React, así que es
// preferible romper el build aquí que desplegarlo.
const missing = [...out.matchAll(/(?:href|src)="(\/assets\/[^"]+)"/g)]
  .map((m) => m[1])
  .filter((href) => !existsSync(path.join(ROOT, 'dist', href.replace(/^\//, ''))));
if (missing.length) {
  console.error('La home quedaría referenciando assets inexistentes:', missing.join(', '));
  console.error('Abortando el build.');
  process.exit(1);
}

writeFileSync(DIST_INDEX, out);
console.log(`dist/index.html actualizado con ${helmetTags.length} tags SEO + body prerenderizado de la home (assets verificados).`);
