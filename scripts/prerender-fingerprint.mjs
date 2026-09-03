#!/usr/bin/env node
/**
 * Detecta snapshots de prerender obsoletos.
 *
 * Los 71 snapshots de public/__prerendered__ se generan a mano con
 * scripts/prerender.mjs (necesita Chromium, que no queremos en el build de
 * Vercel). El riesgo: alguien cambia contenido, despliega, y Google sigue
 * viendo el HTML viejo — con precios viejos — sin que nada avise.
 *
 * QUÉ SE HASHEA Y POR QUÉ
 * ───────────────────────
 * No basta con "todo lo que hay en src/**": eso obligaba a regenerar los 71
 * snapshots por un retoque de CSS. Tampoco vale filtrar por extensión sin
 * más. Lo que se hace es partir de qué ficheros participan REALMENTE en la
 * generación de cada página:
 *
 *   1. Se localiza el módulo de página de cada ruta prerenderizada. La
 *      asociación ruta -> módulo está explícita en el código: los <Route> de
 *      App.jsx y las claves de PAGES en pages.config.js, cuyos componentes se
 *      declaran con lazy(() => import('./pages/X')) — salvo la home, que es un
 *      import estático.
 *   2. Desde cada módulo de página se recorre el grafo de imports (estáticos
 *      y dinámicos, incluidos los alias '@/'), más el "shell" común que
 *      envuelve a todas las páginas (main.jsx -> App.jsx -> Layout.jsx…). El
 *      recorrido del shell NO entra en los módulos de página: pages.config.js
 *      las importa todas dinámicamente, y seguir esos imports acabaría
 *      metiendo cualquier página en el grafo de las 71 rutas.
 *   3. Se hashea el contenido de esos ficheros, más index.html y sitemap.xml.
 *
 * Consecuencias:
 *   - Un cambio en src/pages/AdminLeads.jsx (ruta NO prerenderizada, solo
 *     SPA) no invalida nada, porque no participa en ninguno de los 71 HTML.
 *   - Un cambio en un componente compartido invalida solo las rutas cuyo
 *     grafo lo incluye, y el aviso las lista: BlogArticle.jsx -> los 30
 *     artículos, Home.jsx -> solo '/', Layout.jsx -> las 71.
 *   - Un cambio en index.html o en el sitemap no se puede acotar a rutas
 *     concretas: el aviso pide regenerarlas todas.
 *
 * LOS .CSS SE EXCLUYEN, y esto es seguro solo desde que existe
 * scripts/sync-prerendered-assets.mjs. Antes no lo era: los snapshots
 * incrustan <link rel="stylesheet" href="/assets/index-HASH.css">, y al
 * cambiar el CSS ese hash cambiaba, dejando la página prerenderizada
 * apuntando a un fichero inexistente (servida sin estilos). Ahora el build
 * reescribe esas referencias al build actual, así que un .css ya no puede
 * romper ni alterar el HTML prerenderizado: no aporta DOM (el marcado sale
 * de JSX) ni URLs de assets.
 *
 * El hash es del CONTENIDO de las fuentes, nunca de dist/ ni de timestamps:
 * los nombres con hash de Vite dependen de la versión de las herramientas y
 * podrían diferir entre local y Vercel, rompiendo todos los despliegues. El
 * contenido de los ficheros es idéntico en cualquier máquina, así que es
 * reproducible en CI.
 *
 * A PRUEBA DE FALLOS: si algún import no se puede resolver, el grafo se
 * descarta y se hashea todo src/** (menos .css), avisando por consola. Es
 * preferible pedir una regeneración de más que dejar pasar un snapshot viejo.
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
const SRC = path.join(ROOT, 'src');
const FINGERPRINT_FILE = path.join(ROOT, 'scripts/prerender-fingerprint.json');
const MANIFEST_FILE = path.join(ROOT, 'scripts/prerender-manifest.json');

/** Ficheros del proyecto (fuera de src/) que también afectan al HTML final. */
const EXTRA_FILES = ['index.html', 'public/sitemap.xml'];

/** Módulos por los que empieza el shell común a todas las páginas. */
const SHELL_ENTRIES = ['src/main.jsx'];

const sha = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 16);
const rel = (f) => path.relative(ROOT, f);

/** Resuelve un especificador de import a un fichero real, o null. */
function resolveImport(spec, fromFile) {
  if (!spec.startsWith('.') && !spec.startsWith('@/')) return null; // paquete externo
  const base = spec.startsWith('@/')
    ? path.join(SRC, spec.slice(2))
    : path.resolve(path.dirname(fromFile), spec);

  const candidates = [
    base,
    `${base}.jsx`, `${base}.js`, `${base}.ts`, `${base}.tsx`,
    path.join(base, 'index.jsx'), path.join(base, 'index.js'),
    path.join(base, 'index.ts'), path.join(base, 'index.tsx'),
  ];
  for (const c of candidates) {
    if (existsSync(c) && statSync(c).isFile()) return c;
  }
  return undefined; // no resuelto: lo distinguimos de "externo" (null)
}

/**
 * Lee un fichero quitando los comentarios.
 *
 * pages.config.js empieza con un bloque de documentación que contiene un
 * ejemplo completo de configuración: imports que no existen
 * ('./pages/HomePage', './pages/Dashboard') y un `mainPage: "HomePage"`. Si se
 * leen como código real, el grafo no resuelve esos imports y la home se queda
 * sin módulo asociado — que es justo lo que activaba el modo a prueba de
 * fallos. Solo se quitan bloques y líneas enteras de comentario, nunca "//"
 * a mitad de línea, para no destrozar URLs dentro de cadenas.
 */
function readCode(file) {
  return readFileSync(file, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/^\s*\/\/.*$/gm, ' ');
}

/**
 * Recorre el grafo de imports desde unos ficheros semilla.
 *
 * `skip` corta la travesía en ciertos ficheros (ni se incluyen ni se siguen).
 * Se usa al recorrer el shell: pages.config.js declara TODAS las páginas con
 * import() dinámico, así que seguir esos imports metería en el shell —y por
 * tanto en las 71 rutas— páginas que no se prerenderizan, como AdminLeads o
 * AreaClientes. Cada página entra por su propia ruta, no por el shell.
 */
function walkGraph(entries, unresolved, skip = new Set()) {
  const seen = new Set();
  const queue = [...entries];

  while (queue.length) {
    const file = queue.pop();
    if (!file || seen.has(file) || skip.has(file)) continue;
    seen.add(file);
    if (!/\.(jsx?|tsx?)$/.test(file)) continue;

    const code = readCode(file);
    const specs = [
      ...[...code.matchAll(/\bfrom\s+['"]([^'"]+)['"]/g)].map((m) => m[1]),
      ...[...code.matchAll(/\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g)].map((m) => m[1]),
    ];
    for (const spec of specs) {
      const resolved = resolveImport(spec, file);
      if (resolved === undefined) unresolved.push(`${rel(file)} -> ${spec}`);
      else if (resolved) queue.push(resolved);
    }
  }
  return seen;
}

/**
 * Mapea nombre de componente -> fichero en App.jsx y pages.config.js.
 *
 * Casi todas las páginas se declaran con lazy(() => import('./pages/X')), pero
 * no todas: la home es un import estático (`import Home from './pages/Home'`)
 * porque es la primera pantalla y no interesa diferirla. Hay que reconocer las
 * dos formas; si no, la ruta '/' se queda sin módulo.
 */
function componentMap() {
  const map = {};
  for (const f of ['src/App.jsx', 'src/pages.config.js']) {
    const full = path.join(ROOT, f);
    if (!existsSync(full)) continue;
    const code = readCode(full);
    const decls = [
      ...code.matchAll(/const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(\s*['"]([^'"]+)['"]\s*\)/g),
      ...code.matchAll(/^\s*import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/gm),
    ];
    for (const m of decls) {
      const resolved = resolveImport(m[2], full);
      if (resolved) map[m[1]] = resolved;
    }
  }
  return map;
}

/** Mapea ruta pública -> fichero de página. */
function routeToPageFile() {
  const comps = componentMap();
  const routes = {};

  // Rutas explícitas de App.jsx: <Route path="/x" element={...<Comp />...} />
  const app = readCode(path.join(ROOT, 'src/App.jsx'));
  for (const m of app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{([\s\S]*?)\}\s*\/>/g)) {
    const [, route, element] = m;
    const comp = [...element.matchAll(/<(\w+)\s*\/>/g)].map((x) => x[1]).find((c) => comps[c]);
    if (comp) routes[route] = comps[comp];
  }

  // Rutas dinámicas de pages.config.js: cada clave de PAGES es "/Clave"
  const cfg = readCode(path.join(ROOT, 'src/pages.config.js'));
  const pagesBlock = cfg.match(/export const PAGES\s*=\s*\{([\s\S]*?)\n\}/);
  if (pagesBlock) {
    for (const m of pagesBlock[1].matchAll(/"(\w+)"\s*:\s*(\w+)/g)) {
      if (comps[m[2]]) routes['/' + m[1]] = comps[m[2]];
    }
  }
  const mainPage = cfg.match(/mainPage:\s*"(\w+)"/);
  if (mainPage && comps[mainPage[1]]) routes['/'] = comps[mainPage[1]];

  return routes;
}

/** Todos los .js/.jsx bajo src/ (modo a prueba de fallos). */
function allSourceFiles() {
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.(jsx?|tsx?)$/.test(entry)) out.push(full);
    }
  };
  walk(SRC);
  return out;
}

/**
 * Calcula la huella y, de paso, qué ficheros afectan a qué rutas.
 * Devuelve { combined, files, routesByFile, mode }.
 */
function compute() {
  const unresolved = [];
  const routes = routeToPageFile();

  const prerendered = existsSync(MANIFEST_FILE)
    ? JSON.parse(readFileSync(MANIFEST_FILE, 'utf8')).filter((r) => r.ok).map((r) => r.route)
    : [];

  // Solo se cortan los módulos que son destino de una ruta. Layout.jsx también
  // se importa de forma estática en pages.config.js, pero NO es una página:
  // envuelve a las 71 y tiene que seguir formando parte del shell.
  const pageModules = new Set(Object.values(routes));
  const shell = walkGraph(SHELL_ENTRIES.map((f) => path.join(ROOT, f)), unresolved, pageModules);

  const routesByFile = {};
  const relevant = new Set(shell);
  let missingRoute = false;

  for (const route of prerendered) {
    // /BlogArticle/<slug> comparte el módulo de la ruta dinámica /BlogArticle/:slug
    const pageFile = routes[route] || routes[route.replace(/^(\/BlogArticle)\/.+$/, '$1/:slug')];
    if (!pageFile) { missingRoute = true; continue; }
    for (const f of walkGraph([pageFile], unresolved)) {
      relevant.add(f);
      (routesByFile[rel(f)] ||= []).push(route);
    }
  }
  for (const f of shell) (routesByFile[rel(f)] = prerendered.slice());

  // A prueba de fallos: si algo no encaja, se hashea todo src/**.
  const failClosed = unresolved.length > 0 || missingRoute || prerendered.length === 0;
  const sourceFiles = failClosed ? allSourceFiles() : [...relevant];

  const files = {};
  for (const f of sourceFiles.sort()) files[rel(f)] = sha(readFileSync(f));
  for (const f of EXTRA_FILES) {
    const full = path.join(ROOT, f);
    if (existsSync(full)) files[f] = sha(readFileSync(full));
  }

  const combined = sha(Object.entries(files).sort().map(([k, v]) => `${k}:${v}`).join('\n'));
  return {
    combined,
    files,
    routesByFile: failClosed ? {} : routesByFile,
    mode: failClosed ? 'todo-src (a prueba de fallos)' : 'grafo-de-imports',
    unresolved: unresolved.slice(0, 5),
  };
}

const mode = process.argv[2];

if (mode === '--write') {
  const fp = compute();
  writeFileSync(FINGERPRINT_FILE, JSON.stringify(
    { combined: fp.combined, mode: fp.mode, files: fp.files, routesByFile: fp.routesByFile }, null, 1
  ) + '\n');
  console.log(`Huella de prerender guardada (${Object.keys(fp.files).length} ficheros, modo ${fp.mode}, ${fp.combined}).`);
  if (fp.unresolved.length) console.log('  imports no resueltos:', fp.unresolved.join(', '));
} else if (mode === '--check') {
  if (!existsSync(FINGERPRINT_FILE)) {
    console.error('\n[prerender] No existe scripts/prerender-fingerprint.json.');
    console.error('  Regenera los snapshots:  npm run prerender\n');
    process.exit(1);
  }
  const stored = JSON.parse(readFileSync(FINGERPRINT_FILE, 'utf8'));
  const current = compute();

  if (stored.combined === current.combined) {
    console.log(`[prerender] Snapshots al día (${Object.keys(current.files).length} ficheros vigilados, modo ${current.mode}).`);
    process.exit(0);
  }

  const changed = [];
  for (const [f, h] of Object.entries(current.files)) {
    if (stored.files[f] !== h) changed.push({ f, how: stored.files[f] ? 'modificado' : 'nuevo' });
  }
  for (const f of Object.keys(stored.files)) {
    if (!current.files[f]) changed.push({ f, how: 'eliminado' });
  }

  const map = { ...(stored.routesByFile || {}), ...(current.routesByFile || {}) };
  const affected = new Set();
  let unknown = false;
  for (const { f } of changed) {
    const rs = map[f];
    if (rs && rs.length) rs.forEach((r) => affected.add(r));
    else unknown = true;
  }

  console.error('\n────────────────────────────────────────────────────────');
  console.error(' BUILD DETENIDO: los snapshots de prerender están obsoletos');
  console.error('────────────────────────────────────────────────────────');
  console.error(`\n ${changed.length} fichero(s) han cambiado desde la última generación:\n`);
  for (const c of changed.slice(0, 20)) console.error(`   · ${c.how}: ${c.f}`);
  if (changed.length > 20) console.error(`   · … y ${changed.length - 20} más`);

  if (unknown) {
    console.error('\n Rutas afectadas: no se puede acotar (cambió index.html, el sitemap');
    console.error(' o un fichero fuera del grafo conocido). Hay que regenerar todas.');
  } else {
    const list = [...affected].sort();
    console.error(`\n Rutas afectadas: ${list.length}`);
    for (const r of list.slice(0, 12)) console.error(`   · ${r}`);
    if (list.length > 12) console.error(`   · … y ${list.length - 12} más`);
  }

  console.error('\n Si se despliega así, Google seguiría recibiendo el HTML antiguo.');
  console.error('\n Para regenerarlos:\n');
  console.error('   npm run prerender\n');
  console.error(' (build + navegador headless + build; actualiza los snapshots,');
  console.error('  vercel.json y esta huella. Requiere Playwright en local.)\n');
  process.exit(1);
} else {
  console.error('Uso: node scripts/prerender-fingerprint.mjs --write | --check');
  process.exit(2);
}
