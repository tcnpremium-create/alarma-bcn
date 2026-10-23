import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const links = readFileSync(new URL("../src/components/blog/articleServiceLinks.jsx", import.meta.url), "utf8");
const article = readFileSync(new URL("../src/pages/BlogArticle.jsx", import.meta.url), "utf8");

test("a visitor reading about CCTV receives the CCTV landing and camera quote, not only an Ajax alarm", () => {
  assert.match(links, /getArticlePrimaryService/);
  assert.match(links, /camaras: \{ name: "cámaras de seguridad", href: "\/camaras-barcelona", drawer: "Cámaras de seguridad"/);
  assert.match(article, /getArticlePrimaryService\(slug\)/);
  assert.match(article, /openDrawer\(primaryService\.drawer\)/);
  assert.match(article, /to=\{primaryService\.href\}/);
});
test("commercial blog CTAs keep telephone, existing lead drawer, and related article links", () => {
  assert.match(article, /tel:\+34638109947/);
  assert.match(article, /<ArticleServiceLinks slug=\{slug\}/);
  assert.match(article, /Artículos relacionados/);
});
