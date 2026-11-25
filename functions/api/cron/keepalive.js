import { createSupabaseDb } from '../../../api/_lib/db.js';
import { json, cronOrAdmin } from '../../../cloudflare/http.js';

// Cloudflare Pages no ejecuta automáticamente los crons de vercel.json.
// La invocación debe configurarse por separado y usar CRON_SECRET.
export async function onRequest({ request, env }) {
  if (request.method !== 'GET') return json({ error: 'Método no permitido' }, 405);
  const auth = cronOrAdmin(request, env);
  if (!auth.ok) return json({ error: auth.error }, auth.status);
  const db = createSupabaseDb(env);
  const { error } = await db.ping();
  return error
    ? json({ ok: false }, 503)
    : json({ ok: true, ts: new Date().toISOString() });
}
