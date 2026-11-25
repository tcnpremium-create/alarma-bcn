import { createSupabaseDb } from './_lib/db.js';
import { createMailer } from './_lib/mailer.js';
import { createLeadService } from './_lib/leads-core.js';
import { createBlackFridayService } from './_lib/black-friday-core.js';
export { createBlackFridayService, drawSector, CAMPAIGN_START, CAMPAIGN_END } from './_lib/black-friday-core.js';

export function createHandler({ participate, db, leadService, env = process.env } = {}) {
  const database = db || createSupabaseDb(env);
  const service = leadService || createLeadService({ db: database, mailer: createMailer(env) });
  const run = participate || createBlackFridayService({ db: database, leadService: service });
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Allow', 'POST, OPTIONS');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Método no permitido.' });
    try {
      const { status, body } = await run(req.body);
      return res.status(status).json(body);
    } catch (error) {
      console.error('Error en participación Black Friday:', error);
      return res.status(500).json({ success: false, error: 'No se pudo registrar la participación. Prueba más tarde.' });
    }
  };
}

export default createHandler();
