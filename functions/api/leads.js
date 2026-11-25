import { createSupabaseDb } from '../../api/_lib/db.js';
import { json, options, admin } from '../../cloudflare/http.js';

export async function onRequest({ request, env }) {
  if (request.method === 'OPTIONS') return options();
  if (request.method !== 'GET') return json({ error: 'Método no permitido' }, 405);
  const auth = admin(request, env);
  if (!auth.ok) return json({ error: auth.error }, auth.status);
  const db = createSupabaseDb(env);
  const includeTest = new URL(request.url).searchParams.get('include_test') === '1';
  const { data, error } = await db.list({ includeTest });
  return error ? json({ error: 'No se pueden consultar las solicitudes' }, 500) : json(data);
}
