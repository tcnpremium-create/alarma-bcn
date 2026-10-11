import { Resend } from 'resend';
import nodemailer from 'nodemailer';

/**
 * Envío de correo con dos canales: Resend primero y Gmail SMTP de respaldo.
 * Nunca lanza: devuelve { ok, via, id, error }.
 *
 * "ok" significa que el proveedor ACEPTÓ el correo, no que llegó al buzón.
 * La entrega real se comprueba aparte (getDeliveryStatus, solo Resend).
 */

const BUSINESS_INBOX = 'tcnpremium@gmail.com';

export function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label}: sin respuesta en ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export function createMailer(env = process.env, { timeoutMs = 6000 } = {}) {
  let resend; // undefined = sin construir, null = no configurado
  let gmail;

  const getResend = () => {
    if (resend !== undefined) return resend;
    resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;
    return resend;
  };
  const getGmail = () => {
    if (gmail !== undefined) return gmail;
    gmail = env.GMAIL_USER && env.GMAIL_APP_PASSWORD
      ? nodemailer.createTransport({ service: 'gmail', auth: { user: env.GMAIL_USER, pass: env.GMAIL_APP_PASSWORD } })
      : null;
    return gmail;
  };

  async function viaResend({ to, subject, html }) {
    const client = getResend();
    if (!client) return { ok: false, error: 'resend: RESEND_API_KEY no configurada' };
    try {
      const { data, error } = await withTimeout(client.emails.send({
        from: env.RESEND_FROM || 'info@alarmasenbarcelona.com',
        to,
        reply_to: BUSINESS_INBOX,
        subject,
        html,
      }), timeoutMs, 'resend');
      if (error) return { ok: false, error: 'resend: ' + (error.message || JSON.stringify(error)) };
      return { ok: true, via: 'resend', id: data?.id };
    } catch (e) {
      return { ok: false, error: 'resend: ' + e.message };
    }
  }

  async function viaGmail({ to, subject, html }) {
    const transport = getGmail();
    if (!transport) return { ok: false, error: 'gmail: GMAIL_USER/GMAIL_APP_PASSWORD no configuradas' };
    try {
      const info = await withTimeout(transport.sendMail({
        from: `"Premium Tech Security" <${env.GMAIL_USER}>`,
        to,
        replyTo: BUSINESS_INBOX,
        subject,
        html,
      }), timeoutMs, 'gmail');
      return { ok: true, via: 'gmail', id: info.messageId };
    } catch (e) {
      return { ok: false, error: 'gmail: ' + e.message };
    }
  }

  async function send(message, { preferGmail = false } = {}) {
    const order = preferGmail ? [viaGmail, viaResend] : [viaResend, viaGmail];
    const errors = [];
    for (const channel of order) {
      const result = await channel(message);
      if (result.ok) return { ...result, error: undefined, fallbackErrors: errors };
      errors.push(result.error);
    }
    return { ok: false, error: errors.join(' | ') };
  }

  /** Último evento de entrega que Resend registró para un correo (delivered, bounced...). */
  async function getDeliveryStatus(id) {
    const client = getResend();
    if (!client || !id) return { ok: false, error: 'resend no disponible' };
    try {
      const { data, error } = await withTimeout(client.emails.get(id), timeoutMs, 'resend.get');
      if (error) return { ok: false, error: error.message || JSON.stringify(error) };
      return { ok: true, status: data?.last_event || 'unknown' };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }

  /** Estado del dominio remitente en Resend (sin exponer la clave). */
  async function getDomains() {
    const client = getResend();
    if (!client) return { ok: false, error: 'RESEND_API_KEY no configurada' };
    try {
      const { data, error } = await withTimeout(client.domains.list(), timeoutMs, 'resend.domains');
      if (error) return { ok: false, error: error.message || JSON.stringify(error) };
      const list = data?.data || data || [];
      return { ok: true, domains: list.map((d) => ({ name: d.name, status: d.status })) };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }

  const channels = () => ({
    resend: Boolean(env.RESEND_API_KEY),
    gmail: Boolean(env.GMAIL_USER && env.GMAIL_APP_PASSWORD),
  });

  return { send, getDeliveryStatus, getDomains, channels };
}

export { BUSINESS_INBOX };
