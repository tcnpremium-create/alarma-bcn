// Cloudflare Workers: correo mediante HTTPS. No intentamos abrir sockets SMTP
// de Gmail ni importamos Nodemailer; no migrar tráfico hasta verificar Resend.
import { BUSINESS_INBOX } from '../api/_lib/constants.js';

export function createCloudflareMailer(env, { timeoutMs = 6000, fetchImpl = fetch } = {}) {
  const channels = () => ({
    resend: Boolean(env.RESEND_API_KEY),
    gmail: false, // Gmail SMTP sigue disponible exclusivamente en Vercel.
  });

  async function call(path, { method = 'GET', body } = {}) {
    if (!env.RESEND_API_KEY) return { ok: false, error: 'RESEND_API_KEY no configurada' };
    try {
      const response = await fetchImpl('https://api.resend.com' + path, {
        method,
        headers: {
          'Authorization': 'Bearer ' + env.RESEND_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(timeoutMs),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        return { ok: false, error: 'Resend HTTP ' + response.status + ': ' + String(data.message || 'error').slice(0, 160) };
      }
      return { ok: true, data };
    } catch (error) {
      return { ok: false, error: 'Resend: ' + (error?.message || 'sin conexión') };
    }
  }

  async function send({ to, subject, html }) {
    const result = await call('/emails', {
      method: 'POST',
      body: {
        from: env.RESEND_FROM || 'info@alarmasenbarcelona.com',
        to,
        subject,
        html,
        reply_to: BUSINESS_INBOX,
      },
    });
    return result.ok
      ? { ok: true, via: 'resend', id: result.data.id }
      : { ok: false, error: result.error };
  }

  async function getDeliveryStatus(id) {
    if (!id) return { ok: false, error: 'sin identificador de Resend' };
    const result = await call('/emails/' + encodeURIComponent(id));
    return result.ok
      ? { ok: true, status: result.data.last_event || 'unknown' }
      : result;
  }

  async function getDomains() {
    const result = await call('/domains');
    return result.ok
      ? { ok: true, domains: (result.data.data || []).map(d => ({ name: d.name, status: d.status })) }
      : result;
  }

  return { channels, send, getDeliveryStatus, getDomains };
}
