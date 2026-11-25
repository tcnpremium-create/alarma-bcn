import test from "node:test";
import assert from "node:assert/strict";
import { normalizeSpanishPhone, isValidSpanishPhone } from "../src/lib/phone.js";

test("acepta teléfono nacional, +34, 0034 y números con espacios", () => {
  for (const raw of ["638109947", "638 10 99 47", "+34 638 10 99 47", "0034 638109947", "34-638-109-947", "931234567"]) {
    assert.equal(isValidSpanishPhone(raw), true, raw);
  }
});
test("prefijos escritos parcialmente no se consideran un teléfono completo", () => {
  for (const raw of ["+34", "+34 638", "3463810994", "003463810994", "123", "abc", ""]) {
    assert.equal(isValidSpanishPhone(raw), false, raw);
  }
});
test("conserva los 9 dígitos completos al enviar con +34", () => {
  assert.equal(normalizeSpanishPhone("+34 638 10 99 47"), "638109947");
  assert.equal(normalizeSpanishPhone("0034 638109947"), "638109947");
});
