#!/usr/bin/env node
// Auditoria estatica de indexabilidad: no cambia la web ni contacta Google.
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(path.join(root, p), 'utf8');
const sitemap = read('public/sitemap.xml');
const routes = [...sitemap.matchAll(/<loc>https:\/\/alarmasenbarcelona\.com([^<]*)<\/loc>/g)]
 .map(m => m[1] || '/');
const manifest = JSON.parse(read('scripts/prerender-manifest.json'));
const rewrites = JSON.parse(read('vercel.json')).rewrites || [];
const problems = [];
const warnings = [];
for (const route of routes) {
 const name = route === '/' ? 'home.html' : route.slice(1).replaceAll('/', '__') + '.html';
 const filename = path.join('public', '__prerendered__', name);
 const expectedCanonical = 'https://alarmasenbarcelona.com' + (route === '/' ? '/' : route);
 if (!existsSync(path.join(root, filename))) { problems.push(route + ': falta snapshot ' + filename); continue; }
 const html = read(filename);
 if (!/<title\b[^>]*>[^<]{6,}<\/title>/i.test(html)) problems.push(route + ': falta title HTML');
 if (!/<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html)) problems.push(route + ': falta H1 HTML');
 const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1];
 if (canonical !== expectedCanonical) problems.push(route + ': canonical ' + (canonical || 'ausente') + ' != ' + expectedCanonical);
 if (/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) problems.push(route + ': NOINDEX en snapshot');
 if (!manifest.some(m => m.route === route && m.file === name && m.ok)) problems.push(route + ': no figura como OK en el manifest');
 if (route !== '/' && !rewrites.some(w => w.source === route && w.destination === '/__prerendered__/' + name)) problems.push(route + ': falta rewrite al snapshot');
}
const robots = read('public/robots.txt');
if (!robots.includes('Sitemap: https://alarmasenbarcelona.com/sitemap.xml')) problems.push('robots.txt sin sitemap oficial');
if (new Set(routes).size !== routes.length) problems.push('sitemap con URLs duplicadas');
console.log('URLs en sitemap:', routes.length, '| avisos:', warnings.length, '| problemas:', problems.length);
for (const warning of warnings) console.warn('AVISO', warning);
for (const problem of problems) console.error('ERROR', problem);
if (problems.length) process.exitCode = 1;
