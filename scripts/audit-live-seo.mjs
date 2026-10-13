#!/usr/bin/env node
// Comprobación HTTP de producción: solo lectura, sin modificar Google ni la web.
// Node 22+, sin dependencias; errores de red son independientes del SEO del código.
const site = 'https://alarmasenbarcelona.com';
const paths = ['/', '/robots.txt', '/sitemap.xml', '/camaras-barcelona', '/camaras-sabadell', '/alarmas-barcelona', '/alarmas-sabadell'];
let problems = 0;
for (const path of paths) {
  try {
    const res = await fetch(site + path, { redirect: 'follow', signal: AbortSignal.timeout(16000), headers: { 'User-Agent': 'PremiumTech-SEO-QA/1.0' } });
    const html = await res.text();
    const title = html.match(/<title\b[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || '';
    const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]*>/g, '').trim() || '';
    const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1] || '';
    const issues = [];
    if (res.status !== 200) issues.push('HTTP ' + res.status);
    if (path.endsWith('.xml') && !html.includes('<urlset')) issues.push('XML sin urlset');
    if (path.endsWith('.txt') && !html.includes('Sitemap:')) issues.push('robots.txt sin sitemap');
    if (!path.endsWith('.xml') && !path.endsWith('.txt')) {
      if (!title) issues.push('no title');
      if (!h1) issues.push('no H1 prerenderizado');
      if (!canonical) issues.push('no canonical');
      if (/(?:camaras|alarmas)-/.test(path) && canonical && canonical.replace(/\/$/, '') !== (site + path)) issues.push('canonical incorrecto');
      if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) issues.push('noindex');
    }
    if (issues.length) problems += issues.length;
    console.log(JSON.stringify({path, status:res.status, redirectedTo:res.url, title, h1:h1.slice(0,110), canonical, problems:issues}));
  } catch(e) {
    problems++;
    console.error(JSON.stringify({path,error:String(e)}));
  }
}
console.log('Problemas HTTP/SEO detectados:', problems);
if (problems) process.exitCode = 1;
