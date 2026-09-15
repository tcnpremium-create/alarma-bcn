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

/**
 * Devuelve el número completo en formato internacional sin espacios
 * ("+34638109947"), el que debe usarse para construir enlaces tel:/wa.me y
 * para mostrar el número "completo" en informes. Vacío si no es válido.
 */
export function telefonoE164(valor) {
  const digitos = normalizarTelefonoES(valor);
  return esTelefonoES(digitos) ? `+34${digitos}` : '';
}

/**
 * Filtro de escritura para el campo de teléfono: deja pasar dígitos, "+" y
 * espacios tal cual el usuario los teclea (nunca recorta ni quita el "+34"
 * mientras escribe), y descarta cualquier otro carácter.
 *
 * Antes los formularios normalizaban en cada pulsación
 * (`normalizarTelefonoES(e.target.value)`), lo que era correcto para el
 * valor final pero tenía un efecto secundario molesto: en cuanto el usuario
 * tecleaba "+", el campo lo hacía desaparecer al instante (un solo "+" no es
 * un teléfono válido, así que normalizarTelefonoES lo reducía a ""), dando
 * la sensación de que el campo "no dejaba poner el +34". La normalización
 * de verdad —a 9 dígitos nacionales— se sigue aplicando al validar y al
 * construir lo que se envía, no al mostrar lo que se está escribiendo.
 */
export function filtrarEntradaTelefono(valor) {
  return String(valor ?? '').replace(/[^\d+\s]/g, '');
}
