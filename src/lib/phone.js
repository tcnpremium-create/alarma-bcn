/** Normaliza un número nacional español sin cortar lo que escribe el usuario.
 * Se aplica al validar/enviar, nunca durante la edición del campo:
 * truncar en onChange hacía imposible teclear +34 seguido de 9 dígitos.
 */
export function normalizeSpanishPhone(value) {
  let digits = String(value ?? "").replace(/\D/g, "");
  if (digits.startsWith("0034") && digits.length === 13) digits = digits.slice(4);
  else if (digits.startsWith("34") && digits.length === 11) digits = digits.slice(2);
  return digits;
}

export function isValidSpanishPhone(value) {
  return /^[6789]\d{8}$/.test(normalizeSpanishPhone(value));
}
