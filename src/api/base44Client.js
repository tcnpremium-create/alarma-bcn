// Compatibilidad: reexporta leadsAPI como base44.entities.Lead
// para no tener que cambiar todos los componentes
import { leadsAPI } from './supabaseClient';

export const base44 = {
  entities: {
    Lead: {
      create: leadsAPI.create,
      filter: leadsAPI.getAll,
      update: leadsAPI.update,
    },
    LeadChat: {
      create: leadsAPI.create,
    }
  }
};
