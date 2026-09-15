/**
 * Normalización de teléfonos españoles.
 *
 * POR QUÉ EXISTE ESTE FICHERO
 * ───────────────────────────
 * Los formularios limpiaban el teléfono así:
 *
 *     e.target.value.replace(/\D/g, '').slice(0, 9)
 *
 * Con alguien tecleando "638 109 947" funciona. Pero cuando el navegador
 * autorrellena el campo mete el número en formato internacional, y entonces:
 *
 *     "+34 638 109 947"  ->  "34638109947"  ->  slice(0,9)  ->  "346381099"
 *
 * El prefijo se queda y se pierden los dos últimos dígitos. El lead llega
 * con un número al que no se puede llamar. Pasó de verdad: un aviso de
 * presupuesto con el teléfono "346381099".
 *
 * La otra variante del mismo problema estaba en el cuestionario, que sí
 * aceptaba "+34..." y lo enviaba tal cual; el email de aviso construye el
 * enlace como `tel:+34${telefono}`, así que salía "tel:+34+34638109947".
 *
 * La solución es quitar el prefijo ANTES de recortar, no después.
 *
 * Un número nacional español tiene 9 dígitos y empieza por 6 o 7 (móvil) u
 * 8 o 9 (fijo). Nunca empieza por 3, así que un "34" al principio de algo
 * más largo de 9 dígitos solo puede ser el prefijo de país.
 */

/** Devuelve los 9 dígitos nacionales, o lo que haya si es más corto. */
export function normalizarTelefonoES(valor) {
  let digitos = String(valor ?? '').replace(/\D/g, '');

  if (digitos.startsWith('0034')) {
    digitos = digitos.slice(4);
  } else if (digitos.startsWith('34') && digitos.length > 9) {
    digitos = digitos.slice(2);
  }

  return digitos.slice(0, 9);
}

/** ¿Es un teléfono español completo y con prefijo nacional válido? */
export function esTelefonoES(valor) {
  return /^[6789]\d{8}$/.test(normalizarTelefonoES(valor));
}
