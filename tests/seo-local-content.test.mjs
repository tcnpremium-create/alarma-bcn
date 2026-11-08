import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

for (const city of ["Castelldefels", "ElPrat", "Viladecans"]) {
  test(`página ${city}: enlaces a instalaciones y contenido local verificable`, () => {
    const source = readFileSync(new URL(`../src/pages/${city}.jsx`, import.meta.url), "utf8");
    assert.match(source, /canonicalUrl="https:\/\/alarmasenbarcelona\.com\//);
    assert.match(source, /<Link to="\/alarmas-barcelona"/);
    assert.match(source, /<Link to="\/camaras-barcelona"/);
    assert.doesNotMatch(source, /Instalación Profesional 24\/7/);
    assert.match(source, /<ContactForm \/>/);
  });
}
