import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Comprobar lo que Google recibe en los HTML prerenderizados, no solo el JSX.
test("promociones: precios verificables sin inventar stock de productos", () => {
  const html = readFileSync(new URL("../public/__prerendered__/Promociones.html", import.meta.url), "utf8");
  const tags = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const schemas = tags.map((tag) => JSON.parse(tag[1]));
  const itemList = schemas.find((entry) => entry["@type"] === "ItemList");
  assert.ok(itemList, "Falta ItemList de kits en el HTML indexable");
  assert.ok(itemList.itemListElement.length >= 2, "No se encontraron kits");
  for (const entry of itemList.itemListElement) {
    const offer = entry.item.offers;
    assert.equal(entry.item["@type"], "Product");
    assert.equal(offer["@type"], "Offer");
    assert.equal(offer.availability, undefined, "No hay inventario que justifique InStock");
    assert.equal(offer.priceCurrency, "EUR");
    assert.ok(Number(offer.price) > 0, "Los precios deben conservarse");
    assert.equal(offer.priceSpecification.price, offer.price);
  }
});

test("sitemap: actualizar solo las páginas con cambios significativos de contenido o datos", () => {
  const xml = readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  const recent = {
    "/Castelldefels": "2026-11-08",
    "/ElPrat": "2026-11-08",
    "/Viladecans": "2026-11-08",
    "/camaras-sabadell": "2026-11-08",
    "/camaras-girona": "2026-11-08",
    "/camaras-tarragona": "2026-11-08",
    "/camaras-lleida": "2026-11-08",
    "/Promociones": "2026-11-09",
  };
  for (const [route, date] of Object.entries(recent)) {
    const loc = "<loc>https://alarmasenbarcelona.com" + route + "</loc><lastmod>" + date + "</lastmod>";
    assert.ok(xml.includes(loc), "Fecha incorrecta en " + route);
  }
  const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((entry) => entry[1]);
  assert.equal(new Set(routes).size, routes.length, "Sitemap con URL duplicadas");
});
