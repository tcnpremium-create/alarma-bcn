import { createSupabaseDb } from './_lib/db.js';
import { createMailer } from './_lib/mailer.js';
import { createLeadService } from './_lib/leads-core.js';

// alarmasenbarcelona.com — las notificaciones van a tcnpremium@gmail.com.
// NO usar notificaciones@tsoapp.es (es de otro proyecto, TSO Software).
// Toda la lógica vive en _lib/leads-core.js (testeable sin red).

export function createHandler({ db, mailer, service, env = process.env }) {
  const svc = service || createLeadService({ db, mailer });
  return async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-store');
    if (req.method === 'OPTIONS') return res.status(200).end();

    // Diagnóstico sin secretos: solo dice qué canales están configurados.
    if (req.method === 'GET') {
      const channels = mailer.channels();
      const dbOk = !(await db.ping()).error;
      const ok = dbOk && (channels.resend || channels.gmail);
      return res.status(ok ? 200 : 503).json({ ok, database: dbOk, email: channels });
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
      const { status, body } = await svc.submit(req.body, { retryBudgetMs: 3000 });
      return res.status(status).json(body);
    } catch (error) {
      console.error('Handler error:', error);
      return res.status(500).json({ success: false, saved: false, error: 'Error interno. Inténtalo de nuevo o llámanos al 638 10 99 47.' });
    }
  };
}

const db = createSupabaseDb();
const mailer = createMailer();
export default createHandler({ db, mailer });
