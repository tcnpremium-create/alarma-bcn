import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const site = "https://alarmasenbarcelona.com";
const cameraRoutes = [
  "/camaras-barcelona",
  "/camaras-sabadell",
  "/camaras-girona",
  "/camaras-tarragona",
  "/camaras-lleida",
];

function structuredData(route) {
  const filename = route.slice(1) + ".html";
  const html = readFileSync(new URL(`../public/__prerendered__/${filename}`, import.meta.url), "utf8");
  const tags = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  assert.ok(tags.length > 0, `Sin datos estructurados: ${route}`);
  return tags.map((match) => JSON.parse(match[1]));
}

function topLevelServices(data) {
  return data.flatMap((item) => item["@graph"] || [item]).filter((item) => {
    const types = Array.isArray(item["@type"]) ? item["@type"] : [item["@type"]];
    return types.includes("Service");
  });
}

for (const route of cameraRoutes) {
  test(`no duplicar Service comercial: ${route}`, () => {
    const services = topLevelServices(structuredData(route));
    assert.equal(services.length, 1, `Deben existir exactamente un Service específico para ${route}`);
    assert.equal(services[0]["@id"], `${site}${route}#service`);
    assert.match(services[0].name, /cámaras de seguridad/i);
  });
}

for (const route of ["/cerraduras", "/control-accesos", "/redes-informaticas", "/sonorizacion", "/videoporteros"]) {
  test(`Service específico no duplicado: ${route}`, () => {
    const services = topLevelServices(structuredData(route));
    assert.equal(services.length, 1, `Servicio propio + genérico duplicados en ${route}`);
  });
}
