import { createSupabaseDb } from '../../../api/_lib/db.js';
import { json, options, readJson, admin } from '../../../cloudflare/http.js';

const EDITABLE = new Set(['estado', 'notas', 'notas_internas', 'prioridad', 'fecha_contacto', 'resultado']);
export async function onRequest({ request, env, params }) {
  if (request.method === 'OPTIONS') return options();
  if (request.method !== 'PATCH') return json({ error: 'Método no permitido' }, 405);
  const auth = admin(request, env);
  if (!auth.ok) return json({ error: auth.error }, auth.status);
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  const patch = Object.fromEntries(Object.entries(parsed.value).filter(([name]) => EDITABLE.has(name)));
  if (!Object.keys(patch).length) return json({ error: 'Ningún campo editable' }, 400);
  const { data, error } = await createSupabaseDb(env).update(params.id, patch);
  return error ? json({ error: 'No se ha podido actualizar la solicitud' }, 500) : json(data);
}
