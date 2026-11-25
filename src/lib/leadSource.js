/**
 * Atribución de campañas de presupuesto (solo parámetros UTM permitidos).
 *
 * Se guarda durante esta pestaña/sesión la primera campaña identificable.
 * NO se guardan URLs completas, gclid, emails, teléfonos ni referers.
 * La información va dentro del source_page existente en Supabase:
 * ninguna migración, variable de entorno o conexión adicional.
 */
const KEY = "ptsec_first_utm_v1";
const FIELDS = ["utm_source", "utm_medium", "utm_campaign"];

const clean = (raw) => {
  if (typeof raw !== "string") return "";
  const value = raw.trim();
  if (!/^[a-zA-Z0-9_-]{1,32}$/.test(value)) return "";
  if (/^(?:\d[\s.-]?){9,}$/.test(value)) return "";
  return value;
};

function cleanFields(values) {
  if (!values || typeof values !== "object" || Array.isArray(values)) return null;
  const out = {};
  for (const field of FIELDS) {
    const value = clean(values[field]);
    if (value) out[field] = value;
  }
  return Object.keys(out).length ? out : null;
}

export function parseMarketingAttribution(href) {
  try {
    const url = new URL(href);
    return cleanFields(Object.fromEntries(FIELDS.map(field => [field, url.searchParams.get(field)])));
  } catch {
    return null;
  }
}

export function captureMarketingAttribution(href, storage) {
  const current = parseMarketingAttribution(href);
  if (!current) return null;
  try {
    const saved = storage?.getItem(KEY);
    const prior = saved ? cleanFields(JSON.parse(saved)) : null;
    if (prior) return prior;
    storage?.setItem(KEY, JSON.stringify(current));
  } catch {
    // Private browsing / blocked storage: never interfere with form submission.
  }
  return current;
}

export function leadSourcePage(path, storage) {
  // Conservar la ruta desde la que se envía, independientemente del primer clic.
  const safePath = typeof path === "string" && path.startsWith("/")
    ? path.split("?")[0].split("#")[0].slice(0, 80)
    : "/";
  try {
    const saved = storage?.getItem(KEY);
    const utm = saved ? cleanFields(JSON.parse(saved)) : null;
    if (!utm) return safePath || "/";
    const params = new URLSearchParams(utm);
    return ((safePath || "/") + "?" + params.toString()).slice(0, 200);
  } catch {
    return safePath || "/";
  }
}
