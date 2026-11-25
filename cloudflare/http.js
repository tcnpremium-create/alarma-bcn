// Adaptador HTTP común de Cloudflare Pages Functions. Sin secretos en clientes.
import { isAdmin } from '../api/_lib/auth.js';

export function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra },
  });
}

export function options() {
  return new Response(null, { status: 204, headers: { 'Allow': 'GET, POST, PATCH, OPTIONS', 'Cache-Control': 'no-store' } });
}

export async function readJson(request) {
  try {
    const size = Number(request.headers.get('content-length') || 0);
    if (size > 16_384) return { ok: false, response: json({ success: false, error: 'Solicitud demasiado grande' }, 413) };
    const raw = await request.text();
    if (raw.length > 16_384) return { ok: false, response: json({ success: false, error: 'Solicitud demasiado grande' }, 413) };
    const value = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('JSON no válido');
    return { ok: true, value };
  } catch {
    return { ok: false, response: json({ success: false, error: 'Se esperaba un objeto JSON válido' }, 400) };
  }
}

// Reutilizamos la verificación constante en tiempo ya usada en Vercel.
export function admin(request, env) {
  return isAdmin({ headers: { authorization: request.headers.get('authorization') || '' } }, env);
}

export function cronOrAdmin(request, env) {
  const normal = admin(request, env);
  if (normal.ok) return normal;
  const secret = env.CRON_SECRET;
  if (!secret) return normal;
  return isAdmin({ headers: { authorization: request.headers.get('authorization') || '' } }, { ADMIN_TOKEN: secret });
}
