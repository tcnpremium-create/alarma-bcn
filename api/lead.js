import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// alarmasenbarcelona.com - notificaciones van a tcnpremium@gmail.com
// NO usar notificaciones@tsoapp.es (eso es del proyecto TSO Software, diferente)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY || 're_YtBbkkFs_8kgEEDjHQfGPGxuVxF8RdFGD');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const formData = req.body;
    if (!formData?.nombre?.trim() || !formData?.telefono?.trim()) {
      return res.status(400).json({ error: 'Nombre y telefono son obligatorios' });
    }

    const phoneClean = formData.telefono.replace(/\s/g, '');

    // 1. Guardar lead en Supabase
    const { data: lead, error: dbError } = await supabase
      .from('leads')
      .insert([{
        nombre: formData.nombre.trim(),
        email: formData.email?.trim() || '',
        telefono: phoneClean,
        tipo_cliente: formData.tipo_cliente || 'hogar',
        zona: formData.zona?.trim() || '',
        servicio_interes: formData.servicio_interes?.trim() || '',
        mensaje: formData.mensaje?.trim() || '',
        origen: 'formulario_web',
        urgencia: formData.urgencia || 'media',
        estado: 'nuevo',
      }])
      .select().single();

    if (dbError) throw dbError;

    let notifStatus = 'not_sent';
    let notifError = null;

    // 2. Email de notificacion a tcnpremium@gmail.com
    try {
      const notifResult = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'tcnpremium@gmail.com',
        reply_to: 'tcnpremium@gmail.com',
        subject: 'NUEVO PRESUPUESTO - ' + formData.nombre.trim(),
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
          <div style="background:#E53E3E;padding:24px">
            <h2 style="color:white;margin:0;font-size:20px">NUEVA SOLICITUD - alarmasenbarcelona.com</h2>
          </div>
          <div style="padding:24px;background:#fff">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#666;width:140px">Nombre</td><td style="padding:8px 0;font-weight:bold">${formData.nombre.trim()}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Telefono</td><td style="padding:8px 0;font-weight:bold">${phoneClean}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0">${formData.email?.trim() || '-'}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Tipo cliente</td><td style="padding:8px 0">${formData.tipo_cliente || '-'}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Zona</td><td style="padding:8px 0">${formData.zona?.trim() || '-'}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Servicio</td><td style="padding:8px 0">${formData.servicio_interes?.trim() || '-'}</td></tr>
            </table>
            <a href="tel:+34${phoneClean}" style="display:inline-block;margin-top:20px;background:#E53E3E;color:white;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:16px">Llamar ${phoneClean}</a>
          </div>
        </div>`
      });
      notifStatus = 'sent';
      console.log('Notif email sent id:', notifResult?.id);
    } catch (emailErr) {
      notifStatus = 'failed';
      notifError = emailErr.message;
      console.error('Notif email FAILED:', emailErr.message);
    }

    // 3. Email de confirmacion al cliente (si dio su email)
    if (formData.email?.trim()) {
      try {
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: formData.email.trim(),
          subject: 'Hemos recibido tu solicitud - Premium Tech Security',
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
            <div style="background:#E53E3E;padding:24px">
              <h2 style="color:white;margin:0">Gracias, ${formData.nombre.trim()}!</h2>
            </div>
            <div style="padding:24px;background:#fff">
              <p style="color:#333">Hemos recibido tu solicitud de presupuesto para <strong>${formData.servicio_interes || 'sistema de seguridad'}</strong>.</p>
              <p style="color:#333">Nuestro equipo te contactara antes de <strong>24 horas</strong>.</p>
              <a href="tel:+34638109947" style="display:inline-block;margin-top:16px;background:#E53E3E;color:white;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:bold">638 10 99 47</a>
            </div>
          </div>`
        });
        console.log('Confirm email sent to:', formData.email.trim());
      } catch (emailErr) {
        console.error('Confirm email failed:', emailErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      id: lead.id,
      emailNotif: notifStatus,
      emailError: notifError
    });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Error interno', detail: error.message });
  }
}