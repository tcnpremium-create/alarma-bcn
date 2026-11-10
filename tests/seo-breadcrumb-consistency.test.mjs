import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// These are the reviewed crawler HTML snapshots, not client-side React markup.
// The prerender generator must run before this test can pass after JSX changes.
const paths = [
  'camaras-barcelona',
  'camaras-sabadell',
  'sonorizacion',
  'videoporteros',
  'control-accesos',
  'alarmas-barcelona',
  'alarmas-sabadell',
];

function jsonLdNodes(html) {
  const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  return scripts.flatMap(([, raw]) => {
    const value = JSON.parse(raw);
    return Array.isArray(value['@graph']) ? value['@graph'] : [value];
  });
}

for (const slug of paths) {
  test(`${slug}: one BreadcrumbList and correct canonical in prerender HTML`, () => {
    const html = readFileSync(new URL(`../public/__prerendered__/${slug}.html`, import.meta.url), 'utf8');
    const breadcrumbs = jsonLdNodes(html).filter((node) =>
      node['@type'] === 'BreadcrumbList' ||
      (Array.isArray(node['@type']) && node['@type'].includes('BreadcrumbList'))
    );
    assert.equal(breadcrumbs.length, 1, `Expected exactly one BreadcrumbList in ${slug}`);
    assert.ok(
      html.includes(`rel="canonical" href="https://alarmasenbarcelona.com/${slug}"`),
      `Unexpected canonical in ${slug}`,
    );
  });
}
