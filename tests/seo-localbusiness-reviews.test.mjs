import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("LocalBusiness de localidades no declara estrellas de reseñas autocontroladas", () => {
  const source = readFileSync(new URL("../src/components/seo/LocalitySEO.jsx", import.meta.url), "utf8");
  assert.match(source, /"@type": "LocalBusiness"/);
  assert.doesNotMatch(source, /"aggregateRating"\s*:/);
  assert.match(source, /businessStats\.gbpPhone/);
});
