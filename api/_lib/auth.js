import { timingSafeEqual } from 'node:crypto';

/** Compara el token de administración (cabecera Authorization: Bearer ...) en tiempo constante. */
export function isAdmin(req, env = process.env) {
  const expected = env.ADMIN_TOKEN;
  if (!expected) return { ok: false, status: 503, error: 'ADMIN_TOKEN no está configurada en el servidor' };
  const header = String(req.headers?.authorization || '');
  const given = header.startsWith('Bearer ') ? header.slice(7) : '';
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { ok: false, status: 401, error: 'No autorizado' };
  return { ok: true };
}

/** Los cron de Vercel envían Authorization: Bearer $CRON_SECRET si esa variable existe. */
export function isCronOrAdmin(req, env = process.env) {
  const header = String(req.headers?.authorization || '');
  if (env.CRON_SECRET && header === `Bearer ${env.CRON_SECRET}`) return { ok: true };
  // Sin CRON_SECRET, Vercel identifica sus cron con este user-agent. Es falsificable, pero el
  // endpoint solo reintenta avisos pendientes (acotados por intentos), no expone datos.
  if (!env.CRON_SECRET && /^vercel-cron\//.test(String(req.headers?.['user-agent'] || ''))) return { ok: true };
  return isAdmin(req, env);
}
