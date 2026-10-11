/**
 * analytics.js — eventos de conversión para GA4.
 *
 * Reglas:
 *  - Solo se envía si el usuario aceptó cookies de analítica (getConsent) y gtag está cargado.
 *  - Lista cerrada de eventos y de parámetros: nunca viaja nombre, teléfono, email ni texto libre.
 *  - Cualquier valor con pinta de email o teléfono se descarta por si se colara.
 */
import { getConsent } from "./consent";

export const EVENTS = Object.freeze([
  "form_open",
  "form_start",
  "form_submit",
  "form_success",
  "form_error",
  "click_phone",
  "click_whatsapp",
]);

// Parámetros permitidos (todos categóricos, ninguno con datos personales).
const ALLOWED_PARAMS = new Set([
  "form_name", "service", "tipo_cliente", "step", "placement", "error_kind", "notification", "duplicate",
]);

const looksPersonal = (v) => /@/.test(v) || /(?:\+?\d[\s.-]?){9,}/.test(v);

/** Limpia los parámetros: solo claves permitidas, valores cortos y sin datos personales. */
export function sanitizeParams(params = {}) {
  const out = {};
  for (const [key, raw] of Object.entries(params)) {
    if (!ALLOWED_PARAMS.has(key) || raw == null) continue;
    if (typeof raw === "boolean" || typeof raw === "number") { out[key] = raw; continue; }
    const value = String(raw).trim().slice(0, 60);
    if (value && !looksPersonal(value)) out[key] = value;
  }
  return out;
}

export function trackEvent(name, params = {}) {
  try {
    if (!EVENTS.includes(name)) return false;
    if (typeof window === "undefined" || typeof window.gtag !== "function") return false;
    if (!getConsent()?.analytics) return false;
    window.gtag("event", name, {
      ...sanitizeParams(params),
      page_path: window.location.pathname,
      transport_type: "beacon",
    });
    return true;
  } catch {
    return false; // la analítica nunca debe romper la web
  }
}

function placementOf(el) {
  if (el.closest("header, nav")) return "header";
  if (el.closest("footer")) return "footer";
  const fixed = el.closest("[class*='fixed'], [style*='fixed']");
  return fixed ? "sticky" : "content";
}

let installed = false;
/** Un único listener delegado: cubre todos los enlaces tel: y de WhatsApp de la web. */
export function installClickTracking() {
  if (installed || typeof document === "undefined") return;
  installed = true;
  document.addEventListener("click", (event) => {
    const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (/^tel:/i.test(href)) trackEvent("click_phone", { placement: placementOf(link) });
    else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href)) trackEvent("click_whatsapp", { placement: placementOf(link) });
  }, { capture: true });
}
