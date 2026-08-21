// API helper — reemplaza base44.entities completamente

export const LeadAPI = {
  async create(data) {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error creando lead');
    return res.json();
  },

  async list() {
    const res = await fetch('/api/leads');
    if (!res.ok) throw new Error('Error obteniendo leads');
    return res.json();
  },

  async update(id, updates) {
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
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
      create: LeadAPI.create,
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
    invoke: async () => null,
  },
  analytics: {
    track: () => {},
  },
};
