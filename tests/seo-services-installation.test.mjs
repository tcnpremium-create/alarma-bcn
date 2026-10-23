import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const base = new URL("../src/pages/", import.meta.url);
const son = readFileSync(new URL("Sonorizacion.jsx", base), "utf8");
const vid = readFileSync(new URL("Videoporteros.jsx", base), "utf8");
const cer = readFileSync(new URL("Cerraduras.jsx", base), "utf8");

test("servicios locales mantienen URL canónica, H1 y CTA", () => {
  assert.match(son, /canonicalUrl="https:\/\/alarmasenbarcelona.com\/sonorizacion"/);
  assert.match(vid, /canonicalUrl="https:\/\/alarmasenbarcelona.com\/videoporteros"/);
  assert.match(cer, /canonicalUrl="https:\/\/alarmasenbarcelona.com\/cerraduras"/);
  assert.match(son, /Instalación de Sonorización en Barcelona/);
  assert.match(vid, /Instalación de Videoporteros en Barcelona/);
  assert.match(cer, /Instalación de Cerraduras Electrónicas en Barcelona/);
  assert.match(son, /LeadCaptureForm service="Sonorización"/);
  assert.match(cer, /LeadCaptureForm service="Cerradura inteligente"/);
  assert.match(vid, /openDrawer\("Videoportero"\)/);
});

test("videoporteros muestran apps reales y no promesas de biometría", () => {
  assert.match(vid, /DuoxMe/);
  assert.match(vid, /Door Entry/);
  assert.match(vid, /Home \+ Security/);
  assert.doesNotMatch(vid, /App MEET|Home\+ Door|0% riesgo de copia|es completamente legal si se implementa/);
  assert.match(vid, /criterios de la AEPD/);
});

test("sonorización y cerraduras responden preguntas comerciales concretas", () => {
  assert.match(son, /Preguntas frecuentes: instalación de sonido en Barcelona/);
  assert.match(son, /¿Los altavoces empotrados Bluetooth funcionan sin cables\?/);
  assert.match(cer, /¿Se puede poner una cerradura electrónica en mi puerta actual\?/);
  assert.match(cer, /¿Qué ocurre si se agota la batería\?/);
  assert.match(cer, /to="\/videoporteros"/);
});
