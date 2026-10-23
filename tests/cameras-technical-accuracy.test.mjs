import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const camera = readFileSync(new URL("../src/components/landing/CameraCityTemplate.jsx", import.meta.url), "utf8");
const guide = readFileSync(new URL("../src/components/landing/CamerasBarcelonaGuide.jsx", import.meta.url), "utf8");
const city = readFileSync(new URL("../src/pages/CamarasBarcelona.jsx", import.meta.url), "utf8");

test("las páginas de cámaras no recomiendan aplicaciones descontinuadas", () => {
  assert.doesNotMatch(camera, /iVMS-4500/);
  assert.doesNotMatch(guide, /iVMS-4500|Hik-Connect o iVMS/);
  assert.match(camera, /Hik-Connect para Hikvision/);
  assert.match(camera, /DMSS para Dahua/);
});

test("características y almacenamiento se especifican según los equipos", () => {
  assert.doesNotMatch(camera, /Todas nuestras cámaras son de resolución mínima 4MPx/);
  assert.doesNotMatch(camera, /15-20 días continuos|7 y 10 días/);
  assert.match(camera, /color nocturno depende de un modelo compatible/);
  assert.match(camera, /Calculamos el almacenamiento/);
});

test("la oferta local respeta precios y metas existentes", () => {
  assert.match(city, /689 € \+ IVA según condiciones/);
  assert.match(city, /seoPath="\/camaras-barcelona"/);
  assert.match(city, /seoTitle="Instaladores de Cámaras en Barcelona/);
});
