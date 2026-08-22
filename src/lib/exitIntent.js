/**
 * exitIntent.js — estado de la ventana de recuperación de abandono
 * ("antes de irte…") que se muestra como máximo una vez por sesión.
 *
 * Usa sessionStorage a propósito, no localStorage: la limitación pedida
 * es "máximo 1 aparición por sesión", así que el estado debe borrarse
 * solo al cerrar la pestaña, no persistir entre visitas futuras. Al ser
 * almacenamiento técnico puramente funcional (controla si se muestra un
 * elemento de la propia interfaz, sin identificar a la persona ni
 * compartirse con terceros, y sin sobrevivir a la sesión), no requiere
 * consentimiento de cookies — no es analítica ni publicidad.
 *
 * No se guarda ningún dato personal: solo 3 booleanos.
 */
const KEY = "ptsec_exit_intent_v1";

function read() {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return { shown: false, dismissed: false, converted: false };
    const parsed = JSON.parse(raw);
    return {
      shown: !!parsed.shown,
      dismissed: !!parsed.dismissed,
      converted: !!parsed.converted,
    };
  } catch {
    // Almacenamiento no disponible (modo privado estricto, etc.) — se
    // trata como si nunca se hubiera mostrado; en el peor caso el modal
    // podría reaparecer en una recarga, nunca deja de funcionar el sitio.
    return { shown: false, dismissed: false, converted: false };
  }
}

function write(next) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Fallo silencioso — ver comentario de read().
  }
}

export function canShowExitIntent() {
  const s = read();
  return !s.shown && !s.dismissed && !s.converted;
}

export function markShown() {
  write({ ...read(), shown: true });
}

export function markDismissed() {
  write({ ...read(), shown: true, dismissed: true });
}

/**
 * Marca que el usuario ya avanzó hacia una conversión real: envió el
 * formulario, hizo clic en WhatsApp, o simplemente abrió el drawer de
 * presupuesto (ya está en el flujo, no tiene sentido competir con un
 * segundo mensaje de recuperación).
 */
export function markConverted() {
  write({ ...read(), converted: true });
}
