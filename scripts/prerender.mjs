#!/usr/bin/env node
/**
 * Prerender crítico para SEO.
 *
 * Esta SPA (Vite + React Router, sin SSR) sirve el mismo index.html vacío
 * (<div id="root"></div>, sin <title>/<meta description>/<h1>) a CUALQUIER
 * request hasta que el JS se ejecuta en el navegador. Un crawler que no
 * ejecute JS (o que tenga presupuesto/timeout limitado de renderizado) no
 * ve título, descripción, H1 ni contenido — solo el shell vacío.
 *
 * Este script arranca el build de producción localmente, visita cada ruta
 * pública real con un navegador headless, espera a que React + Helmet
 * terminen de montar (title/H1 con contenido), y guarda el HTML final
 * resultante como archivo estático en public/__prerendered__/<slug>.html
 * (VERSIONADO EN GIT — no en dist/, que Vercel regenera en cada deploy sin
 * Playwright disponible). Vite copia public/ a dist/ tal cual en cada
 * `vite build`, así que estos snapshots quedan disponibles automáticamente
 * en cualquier build futuro sin instalar nada adicional en Vercel.
 *
 * update-vercel-rewrites.mjs añade después una regla de rewrite por ruta
 * en vercel.json para que Vercel sirva ese HTML estático en la primera
 * respuesta, en vez del shell vacío — sin tocar el comportamiento normal
 * de la SPA una vez el JS toma el control (createRoot, no hydrateRoot:
 * el snapshot se reemplaza limpiamente en cuanto carga React).
 *
 * Los snapshots quedan estáticos hasta que se regeneren a mano — no se
 * auto-actualizan en cada deploy. Cuando cambie contenido de forma
 * relevante, volver a correr:
 *   npm run build && node scripts/prerender.mjs && npm run build
 * (el primer build sirve las rutas para prerenderizar; el segundo empaqueta
 * los nuevos snapshots de public/__prerendered__ en dist/).
 *
 * Uso: node scripts/prerender.mjs   (requiere haber corrido `vite build` antes)
 */
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const OUT_DIR = path.join(ROOT, 'public/__prerendered__');
const PORT = 4173;
const BASE = `http://localhost:${PORT}`;
const CHROMIUM_PATH = process.env.PW_CHROMIUM_PATH || '/opt/pw-browsers/chromium';

function routeToFilename(route) {
  if (route === '/') return 'home.html';
  return route.replace(/^\//, '').replace(/\//g, '__') + '.html';
}

function loadRoutes() {
  const sitemap = readFileSync(path.join(ROOT, 'public/sitemap.xml'), 'utf8');
  const matches = [...sitemap.matchAll(/<loc>https:\/\/alarmasenbarcelona\.com([^<]*)<\/loc>/g)];
  const routes = matches.map((m) => (m[1] === '' ? '/' : m[1]));
  return [...new Set(routes)].sort();
}

function waitForServer(url, tries = 60) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      fetch(url).then(() => resolve()).catch(() => {
        if (n <= 0) return reject(new Error('preview server did not start'));
        setTimeout(() => attempt(n - 1), 500);
      });
    };
    attempt(tries);
  });
}

async function main() {
  const pwModule = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
  const chromium = pwModule.chromium || pwModule.default.chromium;

  if (!existsSync(DIST)) {
    console.error('dist/ no existe. Ejecuta `npm run build` antes de prerenderizar.');
    process.exit(1);
  }
  mkdirSync(OUT_DIR, { recursive: true });

  const routes = loadRoutes();
  console.log(`Rutas a prerenderizar: ${routes.length}`);

  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let previewLog = '';
  preview.stdout.on('data', (d) => (previewLog += d));
  preview.stderr.on('data', (d) => (previewLog += d));

  try {
    await waitForServer(BASE);
  } catch (e) {
    console.error('No se pudo levantar vite preview:', e.message);
    console.error(previewLog);
    preview.kill();
    process.exit(1);
  }

  const browser = await chromium.launch({ executablePath: CHROMIUM_PATH });
  const results = [];

  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const url = BASE + route;
    let status = 'ok';
    let title = '';
    let h1 = '';
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 20000 });
      // Espera a que Helmet + React hayan montado contenido real.
      await page.waitForFunction(
        () => {
          const h1el = document.querySelector('h1');
          return document.title && document.title.length > 5 && h1el && h1el.textContent.trim().length > 0;
        },
        { timeout: 8000 }
      ).catch(() => { status = 'sin-h1-o-title-a-tiempo'; });

      // Pequeño margen para que terminen de montar secciones cercanas al fold.
      await page.waitForTimeout(300);

      title = await page.title();
      h1 = await page.evaluate(() => document.querySelector('h1')?.textContent?.trim() || '');

      const html = await page.content();
      const filename = routeToFilename(route);
      writeFileSync(path.join(OUT_DIR, filename), html);
    } catch (e) {
      status = 'error: ' + e.message.split('\n')[0];
    }
    results.push({ route, status, title, h1 });
    await page.close();
  }

  await browser.close();
  preview.kill();

  const ok = results.filter((r) => r.status === 'ok' && r.title && r.h1);
  const bad = results.filter((r) => !(r.status === 'ok' && r.title && r.h1));

  console.log(`\nOK: ${ok.length}/${results.length}`);
  if (bad.length) {
    console.log('\nCon problemas:');
    for (const r of bad) console.log(`  ${r.route} — ${r.status} — title="${r.title}" h1="${r.h1}"`);
  }

  writeFileSync(
    path.join(ROOT, 'scripts/prerender-manifest.json'),
    JSON.stringify(
      results.map((r) => ({ route: r.route, file: routeToFilename(r.route), ok: r.status === 'ok' && !!r.title && !!r.h1 })),
      null,
      2
    )
  );

  if (bad.length > 0) process.exitCode = 1;

  // Guarda la huella de las fuentes con las que se generaron estos
  // snapshots, para que el build pueda detectar después si han quedado
  // obsoletos (ver scripts/prerender-fingerprint.mjs).
  if (bad.length === 0) {
    const { execFileSync } = await import('node:child_process');
    execFileSync(process.execPath, [path.join(ROOT, 'scripts/prerender-fingerprint.mjs'), '--write'], { stdio: 'inherit' });
  }
}

main();
