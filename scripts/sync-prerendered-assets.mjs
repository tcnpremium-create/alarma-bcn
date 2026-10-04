#!/usr/bin/env node
/**
 * Reescribe las referencias a /assets/<nombre>-<hash>.<ext> dentro de los
 * snapshots prerenderizados (dist/__prerendered__/*.html, copiados tal
 * cual desde public/__prerendered__/ por `vite build`) para que apunten
 * a los ficheros reales de ESTA build, no al hash con el que se generó
 * el snapshot la última vez que se corrió `npm run prerender`.
 *
 * POR QUÉ EXISTE (incidente de producción, oct-2026)
 * ───────────────────────────────────────────────────
 * Los 70 snapshots en public/__prerendered__/ están versionados en git con
 * los hashes de la build en que se generaron. Cada `vite build` nuevo
 * genera hashes DISTINTOS aunque el código no cambie (dependen del propio
 * proceso de bundling). Sin este script, dist/__prerendered__/*.html sigue
 * señalando a un dist/assets/archivo-VIEJO.js que ya no existe en la build
 * actual → 404 en el navegador → React nunca arranca → nada funciona
 * (menús, cookies, botones). Exactamente lo que le pasó a la web en
 * producción cuando se quitó este paso del pipeline de build.
 *
 * No toca public/__prerendered__/ (eso es contenido versionado, no un
 * artefacto de build) — solo dist/__prerendered__/, que ya es la copia
 * que hace `vite build` y que nadie debería editar a mano.
 *
 * Uso: node scripts/sync-prerendered-assets.mjs   (después de `vite build`)
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST_ASSETS = path.join(ROOT, 'dist/assets');
const DIST_PRERENDERED = path.join(ROOT, 'dist/__prerendered__');

if (!existsSync(DIST_ASSETS) || !existsSync(DIST_PRERENDERED)) {
  console.error('Falta dist/assets o dist/__prerendered__ — ¿corriste `vite build` antes?');
  process.exit(1);
}

// nombre-base (sin el hash final de 8 caracteres) -> nombre de fichero real de esta build.
const HASH_RE = /-[A-Za-z0-9_-]{8}(\.[a-z]+)$/;
const currentByBaseName = new Map();
for (const file of readdirSync(DIST_ASSETS)) {
  const m = file.match(HASH_RE);
  if (!m) continue;
  const base = file.slice(0, file.length - m[0].length) + m[1]; // "<base>.<ext>"
  currentByBaseName.set(base, file);
}

const htmlFiles = readdirSync(DIST_PRERENDERED).filter((f) => f.endsWith('.html'));
let rewritten = 0;
let filesTouched = 0;
let missingAfterSync = [];

for (const file of htmlFiles) {
  const filePath = path.join(DIST_PRERENDERED, file);
  const html = readFileSync(filePath, 'utf8');

  let updated = html.replace(/\/assets\/([^"'\s>]+)/g, (full, filename) => {
    const m = filename.match(HASH_RE);
    if (!m) return full; // no tiene pinta de asset con hash (no debería pasar)
    const base = filename.slice(0, filename.length - m[0].length) + m[1];
    const current = currentByBaseName.get(base);
    if (!current || current === filename) return full;
    rewritten++;
    return `/assets/${current}`;
  });

  // Un <link rel="modulepreload"> es solo una pista de rendimiento: si el
  // chunk al que apuntaba ya no existe como fichero propio (Rollup lo
  // fusionó en otro chunk al recompilar), el navegador lo ignora sin más
  // — no rompe nada. Pero dejarlo apuntando a un 404 sí es ruido/una
  // petición perdida, así que se quita entero en vez de dejarlo roto.
  updated = updated.replace(/<link rel="modulepreload"[^>]*href="\/assets\/([^"]+)"[^>]*>\s*/g, (full, filename) => {
    if (existsSync(path.join(DIST_ASSETS, filename))) return full;
    rewritten++;
    return '';
  });

  if (updated !== html) {
    writeFileSync(filePath, updated);
    filesTouched++;
  }

  // Verificación: tras reescribir y limpiar los modulepreload huérfanos,
  // ¿queda alguna referencia a un asset que no existe? Si la hay a estas
  // alturas es un <script>/<link rel="stylesheet"> real — eso sí es
  // crítico (es el bug que causó la caída de producción), así que el
  // build debe fallar en vez de desplegar algo roto.
  for (const m of updated.matchAll(/\/assets\/([^"'\s>]+)/g)) {
    if (!existsSync(path.join(DIST_ASSETS, m[1]))) missingAfterSync.push(`${file}: ${m[1]}`);
  }
}

if (missingAfterSync.length > 0) {
  console.error('Quedan referencias a assets que no existen tras sincronizar:');
  missingAfterSync.forEach((m) => console.error('  ' + m));
  process.exit(1);
}

console.log(`[sync-prerendered-assets] ${filesTouched}/${htmlFiles.length} snapshot(s) actualizados, ${rewritten} referencias reescritas, 0 assets rotos.`);
