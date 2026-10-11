// API helper — reemplaza base44.entities completamente

// Mensaje que se muestra cuando la solicitud está guardada pero el aviso al equipo
// por correo no ha salido todavía (se reintenta solo). Solo se usa si notification !== 'sent'.
export const NOTIFICATION_DELAYED_NOTICE =
  "Tu solicitud está guardada. Hemos tenido una incidencia al avisar a nuestro equipo y se reintentará automáticamente. Si es urgente, llámanos al 638 10 99 47.";

/** true si hay que enseñar el aviso de incidencia (guardada, pero sin aviso confirmado). */
export const needsDelayedNotice = (result) => !!result && result.notification !== "sent";

/**
 * Error al enviar una solicitud. `kind`:
 *  - "validation": el servidor rechazó los datos (message es seguro de mostrar).
 *  - "server": el servidor respondió con error: la solicitud NO se ha guardado.
 *  - "network": no hubo respuesta (sin conexión, corte): puede que NO se haya guardado.
 */
export class LeadError extends Error {
  constructor(kind, message, extra = {}) {
    super(message);
    this.name = "LeadError";
    this.kind = kind;
    Object.assign(this, extra);
  }
}

// Una clave por contenido: reintentar o pulsar dos veces el mismo envío reutiliza la clave
// y el servidor devuelve la solicitud ya guardada en vez de crear otra.
const submissionKeys = new Map();
function keyFor(data) {
  const fingerprint = [data.nombre, data.telefono, data.servicio_interes, data.mensaje].map((v) => String(v ?? "").trim()).join("|");
  if (!submissionKeys.has(fingerprint)) {
    const random = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `k-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    submissionKeys.set(fingerprint, random);
  }
  return submissionKeys.get(fingerprint);
}

const adminHeaders = () => {
  let token = "";
  try { token = sessionStorage.getItem("ptsec_admin_token") || ""; } catch { /* sin storage */ }
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const LeadAPI = {
  async create(data, { origen } = {}) {
    let res;
    try {
      res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          origen: origen || data.origen,
          idempotency_key: keyFor(data),
          source_page: typeof location !== "undefined" ? location.pathname : "",
        }),
      });
    } catch (err) {
      throw new LeadError("network", "No hemos recibido respuesta del servidor", { cause: err });
    }
    let body = null;
    try { body = await res.json(); } catch { /* cuerpo no JSON */ }
    if (res.status === 400) throw new LeadError("validation", body?.error || "Revisa los datos del formulario", { field: body?.field });
    if (!res.ok || !body?.success) throw new LeadError("server", body?.error || "Error del servidor", { status: res.status });
    return body; // { success, saved, id, duplicate, notification: 'sent'|'pending'|'failed', ... }
  },

  async list() {
    const res = await fetch('/api/leads', { headers: adminHeaders() });
    if (res.status === 401 || res.status === 503) throw new LeadError("auth", res.status === 503 ? "El servidor no tiene ADMIN_TOKEN configurada" : "Token de administración incorrecto");
    if (!res.ok) throw new Error('Error obteniendo leads');
    return res.json();
  },

  async update(id, updates) {
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...adminHeaders() },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Error actualizando lead');
    return res.json();
  }
};

// Compatibilidad con base44.entities.Lead
export const base44 = {
  entities: {
    Lead: {
      create: LeadAPI.create,
      filter: LeadAPI.list,
      list: LeadAPI.list,
      update: LeadAPI.update,
    },
    LeadChat: {
      // Los leads del chatbot se registran con origen "chatbot" (antes quedaban como formulario web).
      create: (data) => LeadAPI.create(data, { origen: "chatbot" }),
    },
    SecurityTip: {
      list: async () => []
    }
  },
  // No-ops: integraciones (HubSpot, analítica, Google Calendar) del backend
  // base44.io original, que este proyecto ya no usa. Varios componentes
  // (ContactForm, ChatWidget, tracking de HubSpot...) todavía llaman a
  // base44.functions.invoke(...) / base44.analytics.track(...) esperando
  // un fallo silencioso (así lo indican sus propios .catch(() => {})), pero
  // como esas propiedades no existían, el error saltaba antes de llegar al
  // .catch y rompía el envío del formulario. Con estos no-ops, esas llamadas
  // vuelven a fallar en silencio tal y como estaba previsto, sin bloquear
  // el flujo real (creación del lead vía LeadAPI, que sí funciona).
  functions: {
    // Parámetros declarados aunque no se usen: los llamadores pasan
    // (nombre, payload) y sin ellos TypeScript marca 'Expected 0 arguments'.
    invoke: async (_functionName, _payload) => null,
  },
  analytics: {
    track: (_event) => {},
  },
};
