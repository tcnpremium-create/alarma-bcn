#!/usr/bin/env node
/**
 * Inserta una regla de rewrite por cada ruta prerenderizada (ver
 * scripts/prerender.mjs) en vercel.json, ANTES del catch-all
 * "/(.*) -> /index.html", para que Vercel sirva el HTML estático con
 * title/meta/H1/contenido/JSON-LD ya renderizados en la primera
 * respuesta — el catch-all sigue cubriendo cualquier ruta nueva que
 * todavía no se haya prerenderizado.
 *
 * Idempotente: si se vuelve a correr, reemplaza el bloque generado
 * anteriormente en vez de duplicarlo.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const manifest = JSON.parse(readFileSync(path.join(ROOT, 'scripts/prerender-manifest.json'), 'utf8'));
const vercelConfigPath = path.join(ROOT, 'vercel.json');
const config = JSON.parse(readFileSync(vercelConfigPath, 'utf8'));

// "/" queda fuera a propósito: Vercel resuelve la raíz directamente al
// archivo estático dist/index.html como índice de directorio, ANTES de
// evaluar rewrites (confirmado en producción) — un rewrite para "/" nunca
// se llega a aplicar. La home se resuelve en su lugar inyectando el
// contenido prerenderizado directamente en dist/index.html en cada build
// (ver scripts/inject-home-prerender.mjs, enganchado en `npm run build`).
const prerenderedRewrites = manifest
  .filter((r) => r.ok && r.route !== '/')
  .map((r) => ({
    source: r.route,
    destination: `/__prerendered__/${r.file}`,
  }));

const existingRewrites = (config.rewrites || []).filter(
  (r) => !r.destination?.startsWith('/__prerendered__/')
);

// Las reglas de prerender van primero (más específicas), después el resto
// (api passthrough, catch-all a index.html).
config.rewrites = [...prerenderedRewrites, ...existingRewrites];

writeFileSync(vercelConfigPath, JSON.stringify(config, null, 2) + '\n');
console.log(`vercel.json actualizado con ${prerenderedRewrites.length} rewrites de prerender.`);
