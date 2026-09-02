#!/usr/bin/env node
/**
 * Detecta snapshots de prerender obsoletos.
 *
 * Los 70 snapshots de public/__prerendered__ se generan a mano con
 * scripts/prerender.mjs (necesita Chromium, que no queremos en el build de
 * Vercel). El riesgo es evidente: alguien cambia contenido, despliega, y
 * Google sigue viendo el HTML viejo — con precios viejos — sin que nada
 * avise.
 *
 * Este script calcula una huella determinista de TODO lo que puede cambiar
 * el HTML renderizado (código fuente, index.html y la lista de rutas del
 * sitemap) y la guarda junto a los snapshots. En cada build se recalcula y
 * se compara.
 *
 * Por qué el hash es de las FUENTES y no de dist/: los nombres con hash que
 * genera Vite dependen de la versión exacta de las herramientas, así que
 * podrían no coincidir entre esta máquina y el build de Vercel y romperían
 * todos los despliegues. El contenido de los ficheros sí es idéntico en
 * cualquier máquina, así que es reproducible en CI.
 *
 * Modos:
 *   --write   guarda la huella actual (lo llama prerender.mjs al terminar)
 *   --check   compara y sale con código 1 si hay desfase (lo llama el build)
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const FINGERPRINT_FILE = path.join(ROOT, 'scripts/prerender-fingerprint.json');

/** Ficheros cuyo contenido puede alterar el HTML servido. */
function collectFiles() {
  const out = [];
  const exts = new Set(['.js', '.jsx', '.css', '.html', '.xml']);
  const skip = new Set(['node_modules', 'dist', '__prerendered__', '.git']);

  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      if (skip.has(entry)) continue;
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (exts.has(path.extname(entry))) out.push(full);
    }
  };
  walk(path.join(ROOT, 'src'));
  out.push(path.join(ROOT, 'index.html'));
  out.push(path.join(ROOT, 'public/sitemap.xml'));
  return out.filter(existsSync).sort();
}

function sha(buf) {
  return createHash('sha256').update(buf).digest('hex').slice(0, 16);
}

function compute() {
  const files = {};
  for (const f of collectFiles()) {
    files[path.relative(ROOT, f)] = sha(readFileSync(f));
  }
  const combined = sha(Object.entries(files).map(([k, v]) => `${k}:${v}`).join('\n'));
  return { combined, files };
}

/**
 * Traduce un fichero cambiado a las rutas que afecta. Un componente de
 * src/pages/X.jsx afecta a su(s) ruta(s); cualquier otra cosa (layout,
 * componentes compartidos, index.html) afecta a todas.
 */
function affectedRoutes(changedFiles) {
  const manifestPath = path.join(ROOT, 'scripts/prerender-manifest.json');
  const routes = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, 'utf8')).map((r) => r.route)
    : [];
  const pageOnly = [];
  let global = false;

  for (const f of changedFiles) {
    const m = f.match(/^src\/pages\/([A-Za-z0-9_]+)\.jsx$/);
    if (!m) { global = true; continue; }
    const page = m[1];
    const hits = routes.filter(
      (r) => r.replace(/^\//, '').toLowerCase() === page.toLowerCase() ||
             (page === 'Home' && r === '/') ||
             (page === 'BlogArticle' && r.startsWith('/BlogArticle/'))
    );
    if (hits.length) pageOnly.push(...hits); else global = true;
  }
  return global ? routes : [...new Set(pageOnly)];
}

const mode = process.argv[2];

if (mode === '--write') {
  const fp = compute();
  writeFileSync(FINGERPRINT_FILE, JSON.stringify(fp, null, 1) + '\n');
  console.log(`Huella de prerender guardada (${Object.keys(fp.files).length} ficheros, ${fp.combined}).`);
} else if (mode === '--check') {
  if (!existsSync(FINGERPRINT_FILE)) {
    console.error('\n[prerender] No existe scripts/prerender-fingerprint.json.');
    console.error('  Regenera los snapshots:  npm run prerender\n');
    process.exit(1);
  }
  const stored = JSON.parse(readFileSync(FINGERPRINT_FILE, 'utf8'));
  const current = compute();

  if (stored.combined === current.combined) {
    console.log('[prerender] Snapshots al día.');
    process.exit(0);
  }

  const changed = [];
  for (const [f, h] of Object.entries(current.files)) {
    if (stored.files[f] !== h) changed.push(stored.files[f] ? `modificado: ${f}` : `nuevo: ${f}`);
  }
  for (const f of Object.keys(stored.files)) {
    if (!current.files[f]) changed.push(`eliminado: ${f}`);
  }

  const routes = affectedRoutes(
    changed.map((c) => c.split(': ')[1])
  );

  console.error('\n────────────────────────────────────────────────────────');
  console.error(' BUILD DETENIDO: los snapshots de prerender están obsoletos');
  console.error('────────────────────────────────────────────────────────');
  console.error(`\n ${changed.length} fichero(s) han cambiado desde la última generación:\n`);
  for (const c of changed.slice(0, 20)) console.error(`   · ${c}`);
  if (changed.length > 20) console.error(`   · … y ${changed.length - 20} más`);
  console.error(`\n Rutas afectadas: ${routes.length} de las prerenderizadas.`);
  if (routes.length <= 12) for (const r of routes) console.error(`   · ${r}`);
  console.error('\n Si se despliega así, Google seguiría recibiendo el HTML antiguo.');
  console.error('\n Para regenerarlos:\n');
  console.error('   npm run prerender\n');
  console.error(' (build + navegador headless + build; actualiza los 70 snapshots,');
  console.error('  vercel.json y esta huella. Requiere Playwright en local.)\n');
  process.exit(1);
} else {
  console.error('Uso: node scripts/prerender-fingerprint.mjs --write | --check');
  process.exit(2);
}
