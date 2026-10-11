import { createSupabaseDb } from '../_lib/db.js';
import { createMailer } from '../_lib/mailer.js';
import { createLeadService } from '../_lib/leads-core.js';
import { isCronOrAdmin, isAdmin } from '../_lib/auth.js';

// Reintenta los avisos por correo pendientes/fallidos, comprueba en Resend si los
// enviados llegaron y también sirve de panel de salud (con ADMIN_TOKEN: ?detail=1).
// Además mantiene viva la base de datos (hace lecturas), como keepalive.js.
const db = createSupabaseDb();
const mailer = createMailer();
const service = createLeadService({ db, mailer });

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const auth = isCronOrAdmin(req);
  if (!auth.ok) return res.status(auth.status).json({ error: auth.error });
  try {
    const retried = await service.retryPending({ limit: 10 });
    const delivery = await service.verifyDelivery({ limit: 10 });
    const stuck = (await db.stuckSummary()).data || [];
    const failedFinal = stuck.filter((r) => r.notif_status === 'failed_final').length;
    const body = {
      ok: failedFinal === 0,
      retried: retried.checked,
      deliveryChecked: delivery.checked,
      pending: stuck.filter((r) => r.notif_status === 'pending').length,
      failed: stuck.filter((r) => r.notif_status === 'failed').length,
      failedFinal,
      ts: new Date().toISOString(),
    };
    if (req.query?.detail === '1' && isAdmin(req).ok) {
      body.email = mailer.channels();
      body.resendDomains = await mailer.getDomains();
    }
    // 500 si hay solicitudes sin avisar tras agotar los intentos: el fallo queda visible en Vercel.
    return res.status(failedFinal ? 500 : 200).json(body);
  } catch (e) {
    console.error('retry-notifs falló:', e.message);
    return res.status(500).json({ ok: false, error: e.message });
  }
}
