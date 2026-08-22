/**
 * consent.js — gestión de consentimiento de cookies no esenciales
 * (analítica + publicidad) y carga condicionada de los scripts de
 * terceros correspondientes.
 *
 * Antes gtag.js, AdSense y el loader de HubSpot se cargaban de forma
 * incondicional en index.html, se ejecutaban en cuanto cargaba la
 * página, sin esperar ninguna decisión del usuario. El CookieBanner
 * solo ocultaba el aviso y guardaba una marca en localStorage — no
 * bloqueaba nada realmente. Esto es un incumplimiento real de
 * RGPD/LOPD-GDD (la AEPD española ha sancionado explícitamente este
 * patrón). Ver informe de auditoría de producción.
 *
 * Diseño:
 * - "necessary" siempre está activo, no es configurable (cookies
 *   estrictamente necesarias para el funcionamiento del sitio — no se
 *   usa ninguna de este tipo hoy más allá de la propia marca de
 *   consentimiento, pero se deja el hueco por si en el futuro hace
 *   falta, p.ej. para recordar el estado de un formulario).
 * - "analytics" controla Google Analytics (gtag) y el tracking de
 *   HubSpot.
 * - "advertising" controla Google AdSense.
 * - Ninguno de los scripts de analítica/publicidad se inserta en el
 *   DOM hasta que el usuario concede el consentimiento correspondiente
 *   — no se cargan y luego se intentan desactivar.
 */

const STORAGE_KEY = "ptsec_cookie_consent_v1";
const GA_MEASUREMENT_ID = "G-TKZQJRGRFR";
const HUBSPOT_SCRIPT_SRC = "//js.hs-scripts.com/147919189.js";
const ADSENSE_CLIENT = "ca-pub-9051549124466549";

/** Lee el consentimiento guardado. null si el usuario aún no ha decidido. */
export function getConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { necessary: true, analytics: !!parsed.analytics, advertising: !!parsed.advertising };
  } catch {
    return null;
  }
}

function persistConsent(consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      necessary: true,
      analytics: !!consent.analytics,
      advertising: !!consent.advertising,
      updatedAt: new Date().toISOString(),
    }));
  } catch {
    // Si localStorage no está disponible (modo privado estricto, etc.)
    // simplemente no persiste — el usuario verá el banner de nuevo en
    // su próxima visita, lo cual es el comportamiento seguro por
    // defecto (no cargar trackers).
  }
}

function loadScriptOnce(src, attrs = {}) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
}

function enableAnalytics() {
  // Google Analytics
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
  loadScriptOnce(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);
  // HubSpot
  loadScriptOnce(HUBSPOT_SCRIPT_SRC, { id: "hs-script-loader", defer: "" });
}

function disableAnalytics() {
  // Bandera oficial de Google para desactivar el envío de datos de esta
  // propiedad aunque el script ya esté cargado (p.ej. si el usuario
  // acepta y luego cambia de opinión en "Configurar").
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
}

function enableAdvertising() {
  loadScriptOnce(
    `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`,
    { crossorigin: "anonymous" }
  );
}

/** Aplica un consentimiento: carga (o mantiene desactivados) los scripts correspondientes. */
export function applyConsent(consent) {
  if (consent.analytics) enableAnalytics();
  else disableAnalytics();

  if (consent.advertising) enableAdvertising();
  // No hay una forma fiable de "descargar" AdSense una vez insertado;
  // por eso nunca se inserta hasta tener consentimiento explícito.
}

/** Guarda y aplica un consentimiento (usado por Aceptar/Rechazar/Configurar). */
export function setConsent(consent) {
  persistConsent(consent);
  applyConsent(consent);
}

/** Arranque de la app: si ya hay una decisión guardada, aplícala. Si no, no carga nada. */
export function initConsentOnLoad() {
  const stored = getConsent();
  if (stored) applyConsent(stored);
  else disableAnalytics(); // por defecto, desactivado hasta que el usuario decida
}
