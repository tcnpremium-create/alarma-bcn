import { createClient } from '@supabase/supabase-js';

/** Acceso a la tabla leads. El cliente se crea al usarlo, no al importar (así falta de env no tumba el módulo). */
export function createSupabaseDb(env = process.env) {
  let client;
  const sb = () => {
    if (!client) {
      if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_KEY) throw new Error('SUPABASE_URL / SUPABASE_SERVICE_KEY no configuradas');
      client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, { auth: { persistSession: false } });
    }
    return client;
  };
  const wrap = async (fn) => {
    try { return await fn(sb()); } catch (e) { return { data: null, error: { message: e.message, code: e.code } }; }
  };
  return {
    insert: (row) => wrap((s) => s.from('leads').insert([row]).select().single()),
    getByKey: (key) => wrap((s) => s.from('leads').select('*').eq('idempotency_key', key).maybeSingle()),
    findRecentDuplicate: ({ telefono, nombre, servicio_interes, sinceISO }) => wrap((s) =>
      s.from('leads').select('*').eq('telefono', telefono).eq('nombre', nombre)
        .eq('servicio_interes', servicio_interes).gte('created_at', sinceISO)
        .order('created_at', { ascending: false }).limit(1).maybeSingle()),
    update: (id, patch) => wrap((s) => s.from('leads').update(patch).eq('id', id).select().single()),
    listRetryable: ({ maxAttempts, limit }) => wrap((s) =>
      s.from('leads').select('*').in('notif_status', ['pending', 'failed']).lt('notif_attempts', maxAttempts)
        .order('created_at', { ascending: true }).limit(limit)),
    listForDelivery: ({ limit }) => wrap((s) =>
      s.from('leads').select('*').eq('notif_status', 'sent').eq('notif_via', 'resend')
        .or('delivery_status.is.null,delivery_status.in.(sent,delivery_delayed)')
        .gte('created_at', new Date(Date.now() - 3 * 864e5).toISOString())
        .order('created_at', { ascending: true }).limit(limit)),
    stuckSummary: () => wrap(async (s) => {
      const { data, error } = await s.from('leads').select('id,notif_status,created_at')
        .in('notif_status', ['pending', 'failed', 'failed_final']).eq('is_test', false);
      return { data, error };
    }),
    countConfirmationsSince: (sinceISO) => wrap((s) =>
      s.from('leads').select('id', { count: 'exact', head: true }).eq('confirm_status', 'sent').gte('created_at', sinceISO)),
    ping: () => wrap((s) => s.from('leads').select('id').limit(1)),
    list: ({ includeTest }) => wrap((s) => {
      let q = s.from('leads').select('*').order('created_at', { ascending: false });
      if (!includeTest) q = q.eq('is_test', false);
      return q;
    }),
  };
}
