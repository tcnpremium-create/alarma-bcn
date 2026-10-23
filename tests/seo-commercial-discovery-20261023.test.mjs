import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const promotions = readFileSync(new URL("../src/pages/Promociones.jsx", import.meta.url), "utf8");
const risk = readFileSync(new URL("../src/pages/MapaRiesgo.jsx", import.meta.url), "utf8");

test("Promociones directs locally relevant users to Barcelona service landings", () => {
  assert.match(promotions, /Kits de Alarmas y Cámaras de Seguridad en Barcelona/);
  assert.match(promotions, /to="\/camaras-barcelona"/);
  assert.match(promotions, /to="\/alarmas-barcelona"/);
  assert.match(promotions, /canonical.*Promociones/);
});

test("informational map does not masquerade as official unpublished crime statistics", () => {
  assert.match(risk, /guía comercial ilustrativa/);
  assert.match(risk, /visor oficial de Mossos/);
  assert.doesNotMatch(risk, /Estadísticas reales de robos|Datos Mossos d'Esquadra — Actualizado 2026|Reducción con alarma visible/);
  assert.doesNotMatch(risk, /\{barrio\.robosVivienda\.toLocaleString\(\)\}|\{barrio\.riskScore\}\/100/);
  assert.match(risk, /to="\/camaras-barcelona"/);
  assert.match(risk, /to="\/alarmas-barcelona"/);
});
