import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("CCTV Barcelona points title, canonical path and description at installation", () => {
  const source = readFileSync(new URL("../src/pages/CamarasBarcelona.jsx", import.meta.url), "utf8");
  assert.match(source, /seoTitle="Instalación de Cámaras de Seguridad en Barcelona/);
  assert.match(source, /seoPath="\/camaras-barcelona"/);
});
test("Ajax Barcelona has unique actionable content, not an extra duplicate city page", () => {
  const source = readFileSync(new URL("../src/components/landing/CityLandingTemplate.jsx", import.meta.url), "utf8");
  assert.match(source, /seoPath === "\/alarmas-barcelona"/);
  assert.match(source, /Alarmas Ajax para viviendas, negocios y comunidades en Barcelona/);
  assert.match(source, /<Link to="\/camaras-barcelona"/);
  assert.match(source, /onClick=\{scrollToContact\}/);
  assert.match(source, /<LeadCaptureForm service="Alarma"/);
});
