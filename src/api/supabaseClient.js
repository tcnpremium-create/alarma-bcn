import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// API de leads — reemplaza base44.entities.Lead
export const leadsAPI = {
  async create(data) {
    const { data: lead, error } = await supabase
      .from('leads')
      .insert([{
        nombre: data.nombre,
        email: data.email || '',
        telefono: data.telefono,
        tipo_cliente: data.tipo_cliente || 'hogar',
        zona: data.zona || '',
        mensaje: data.mensaje || '',
        urgencia: data.urgencia || 'media',
        origen: data.origen || 'formulario_web',
        estado: data.estado || 'nuevo',
        servicio_interes: data.servicio_interes || '',
        notas: data.notas || '',
      }])
      .select()
      .single();
    if (error) throw error;
    return lead;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};
