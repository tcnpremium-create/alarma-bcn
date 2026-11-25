#!/usr/bin/env node
/**
 * Traduce redirecciones y HTML prerenderizado de Vercel a Cloudflare Pages.
 * Fuente de verdad: vercel.json + snapshots existentes.
 *
 * NO transferir las reglas condicionales por host (www): deberán configurarse
 * como Redirect Rules en Cloudflare al hacer el corte, con verificación previa.
 * NO instalar un catch-all 200: ocultaría 404 y rompería el SEO.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname), '..');
const CONFIG = path.join(ROOT, 'vercel.json');
const OUTPUT = path.join(ROOT, 'public', '_redirects');

export function buildCloudflareRedirects(config) {
  const out = [
    '# Auto-generado a partir de vercel.json. No editar: npm run cf:redirects',
    '# Reglas con host=www deben migrarse a Cloudflare Redirect Rules al cambiar DNS.',
  ];
  const seen = new Set();
  const add = (source, destination, code) => {
    if (seen.has(source)) throw new Error('Ruta duplicada en Cloudflare: ' + source);
    if (source.startsWith('/api/')) throw new Error('Una API no debe ser reescrita como HTML: ' + source);
    seen.add(source);
    out.push(source + ' ' + destination + ' ' + code);
  };
  for (const rule of config.redirects || []) {
    if (rule.has || rule.missing) continue; // Pages _redirects no implementa condiciones de host.
    if (!rule.source?.startsWith('/') || !rule.destination) throw new Error('Redirección incompleta');
    if (rule.source.includes('(.*)')) throw new Error('Regex Vercel no representable: ' + rule.source);
    add(rule.source, rule.destination, rule.permanent ? 301 : 302);
  }
  for (const rule of config.rewrites || []) {
    if (rule.source.startsWith('/api/')) continue; // Resuelto por /functions/api/*
    if (!rule.source?.startsWith('/') || !rule.destination?.startsWith('/')) throw new Error('Rewrite no compatible');
    if (rule.source.includes('(.*)')) throw new Error('Regex Vercel no representable: ' + rule.source);
    add(rule.source, rule.destination, 200);
  }
  const dynamic = out.filter(line => /^\/[^ ]*:[^ ]+ /.test(line)).length;
  const total = out.length - 2;
  if (dynamic > 100 || total > 2100) throw new Error('Supera límite de Cloudflare Pages _redirects');
  return out.join('\n') + '\n';
}

const generated = buildCloudflareRedirects(JSON.parse(readFileSync(CONFIG, 'utf8')));
if (process.argv.includes('--check')) {
  const actual = readFileSync(OUTPUT, 'utf8');
  if (actual !== generated) {
    console.error('public/_redirects está desactualizado: ejecuta npm run cf:redirects');
    process.exitCode = 1;
  } else console.log('Cloudflare _redirects actualizado.');
} else {
  writeFileSync(OUTPUT, generated);
  console.log('Cloudflare Pages: ' + generated.split('\n').filter(x => x.startsWith('/')).length + ' reglas generadas.');
}
