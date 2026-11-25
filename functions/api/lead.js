import { createSupabaseDb } from '../../api/_lib/db.js';
import { createLeadService } from '../../api/_lib/leads-core.js';
import { createCloudflareMailer } from '../../cloudflare/mailer.js';
import { json, options, readJson } from '../../cloudflare/http.js';

// Ruta preparada para pruebas: /api/lead en Cloudflare Pages.
// Comparte con Vercel validación, guardado previo, deduplicación y reintentos.
export async function onRequest({ request, env }) {
  if (request.method === 'OPTIONS') return options();
  if (!['GET', 'POST'].includes(request.method)) return json({ error: 'Método no permitido' }, 405);

  const db = createSupabaseDb(env);
  const mailer = createCloudflareMailer(env);
  if (request.method === 'GET') {
    const channels = mailer.channels();
    const dbOk = !(await db.ping()).error;
    const ok = dbOk && (channels.resend || channels.gmail);
    return json({ ok, database: dbOk, email: channels }, ok ? 200 : 503);
  }

  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  try {
    const result = await createLeadService({ db, mailer }).submit(parsed.value, { retryBudgetMs: 3000 });
    return json(result.body, result.status);
  } catch (error) {
    console.error('Cloudflare lead error:', error);
    return json({ success: false, saved: false, error: 'No hemos podido registrar tu solicitud. Llámanos al 638 10 99 47.' }, 500);
  }
}
