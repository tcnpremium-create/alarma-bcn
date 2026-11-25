import { createSupabaseDb } from '../../../api/_lib/db.js';
import { createLeadService } from '../../../api/_lib/leads-core.js';
import { createCloudflareMailer } from '../../../cloudflare/mailer.js';
import { json, cronOrAdmin, admin } from '../../../cloudflare/http.js';

export async function onRequest({ request, env }) {
  if (request.method !== 'GET') return json({ error: 'Método no permitido' }, 405);
  const auth = cronOrAdmin(request, env);
  if (!auth.ok) return json({ error: auth.error }, auth.status);
  const db = createSupabaseDb(env);
  const mailer = createCloudflareMailer(env);
  const service = createLeadService({ db, mailer });
  try {
    const retried = await service.retryPending({ limit: 10 });
    const delivery = await service.verifyDelivery({ limit: 10 });
    const { data: stuck, error } = await db.stuckSummary();
    if (error) throw error;
    const rows = stuck || [];
    const failedFinal = rows.filter(r => r.notif_status === 'failed_final').length;
    const body = {
      ok: failedFinal === 0,
      retried: retried.checked,
      deliveryChecked: delivery.checked,
      pending: rows.filter(r => r.notif_status === 'pending').length,
      failed: rows.filter(r => r.notif_status === 'failed').length,
      failedFinal,
      ts: new Date().toISOString(),
    };
    if (new URL(request.url).searchParams.get('detail') === '1' && admin(request, env).ok) {
      body.email = mailer.channels();
      body.resendDomains = await mailer.getDomains();
    }
    return json(body, failedFinal ? 500 : 200);
  } catch (error) {
    console.error('Cloudflare cron retry failed:', error);
    return json({ ok: false, error: 'Error al revisar los avisos' }, 500);
  }
}
