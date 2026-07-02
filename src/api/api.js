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

export const NewsletterAPI = {
  async subscribe({ nombre, email, aceptaPrivacidad }) {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, aceptaPrivacidad })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || 'Error al suscribirse');
    return data;
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
  }
};
