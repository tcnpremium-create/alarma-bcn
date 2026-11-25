import { createSupabaseDb } from '../../api/_lib/db.js';
import { createLeadService } from '../../api/_lib/leads-core.js';
import { createBlackFridayService } from '../../api/_lib/black-friday-core.js';
import { createCloudflareMailer } from '../../cloudflare/mailer.js';
import { json, options, readJson } from '../../cloudflare/http.js';

export async function onRequest({ request, env }) {
  if (request.method === 'OPTIONS') return options();
  if (request.method !== 'POST') return json({ success: false, error: 'Método no permitido' }, 405);
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  try {
    const db = createSupabaseDb(env);
    const leadService = createLeadService({ db, mailer: createCloudflareMailer(env) });
    const result = await createBlackFridayService({ db, leadService })(parsed.value);
    return json(result.body, result.status);
  } catch (error) {
    console.error('Cloudflare Black Friday error:', error);
    return json({ success: false, error: 'No se pudo registrar la participación' }, 500);
  }
}
