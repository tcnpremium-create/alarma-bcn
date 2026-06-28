import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// alarmasenbarcelona.com - notificaciones van a tcnpremium@gmail.com
// NO usar notificaciones@tsoapp.es (eso es del proyecto TSO Software, diferente)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const resend = new Resend('re_E4tE5cMB_4mpUbRzaSf6xujq15454JsQw');

function buildNotifEmail(formData, phoneClean) {
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
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
        <tr><td style="padding:8px 0;color:#666">Descripcion</td><td style="padding:8px 0">${formData.mensaje?.trim() || '-'}</td></tr>
      </table>
      <a href="tel:+34${phoneClean}" style="display:inline-block;margin-top:20px;background:#E53E3E;color:white;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:16px">Llamar ${phoneClean}</a>
    </div>
  </div>`;
}

function buildConfirmEmail(formData) {
  const nombre = formData.nombre.trim();
  const servicio = formData.servicio_interes?.trim() || 'sistema de seguridad';
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F3F4F6">
  <div style="max-width:600px;margin:0 auto;background:#fff;font-family:Arial,Helvetica,sans-serif">

    <div style="background:#0A0A1A;padding:20px 28px;text-align:center">
      <div style="color:#E53E3E;font-size:20px;font-weight:900;letter-spacing:-0.5px">alarmasenbarcelona.com</div>
      <div style="color:#9CA3AF;font-size:12px;margin-top:4px">Seguridad profesional en Barcelona</div>
    </div>

    <div style="background:linear-gradient(135deg,#E53E3E 0%,#C53030 100%);padding:32px 28px;text-align:center">
      <img
        src="https://alarmasenbarcelona.com/images/logo-premium.jpeg"
        alt="Premium Tech Security"
        width="200"
        style="width:200px;max-width:200px;height:auto;display:block;margin:0 auto 20px;border-radius:16px;box-shadow:0 0 50px 35px #C53030"
      />
      <h1 style="color:white;margin:0 0 8px;font-size:24px;font-weight:900">&#161;Solicitud recibida, ${nombre}!</h1>
      <p style="color:rgba(255,255,255,0.88);margin:0;font-size:15px">Tu seguridad es nuestra prioridad</p>
    </div>

    <div style="padding:32px 28px">
      <p style="color:#374151;font-size:16px;line-height:1.7;margin:0 0 24px">
        Hemos recibido tu solicitud para <strong style="color:#0A0A1A">${servicio}</strong>.
        Nuestro equipo especializado te contactar&aacute; en menos de <strong style="color:#E53E3E">24 horas</strong> con una propuesta personalizada.
      </p>

      <div style="background:#F9FAFB;border-radius:12px;padding:20px 24px;margin-bottom:24px;border-left:4px solid #E53E3E">
        <div style="font-weight:800;font-size:12px;color:#6B7280;letter-spacing:0.08em;margin-bottom:14px;text-transform:uppercase">Por qu&eacute; elegirnos</div>
        <div style="margin-bottom:10px"><span style="color:#E53E3E;font-weight:900">&#10003;</span>&nbsp;&nbsp;<span style="color:#374151;font-size:14px"><strong>Instalaci&oacute;n profesional</strong> incluida sin costes ocultos</span></div>
        <div style="margin-bottom:10px"><span style="color:#E53E3E;font-weight:900">&#10003;</span>&nbsp;&nbsp;<span style="color:#374151;font-size:14px"><strong>Sin permanencias</strong> &mdash; cancela cuando quieras</span></div>
        <div style="margin-bottom:10px"><span style="color:#E53E3E;font-weight:900">&#10003;</span>&nbsp;&nbsp;<span style="color:#374151;font-size:14px"><strong>Soporte 24/7</strong> &mdash; siempre disponibles para ti</span></div>
        <div><span style="color:#E53E3E;font-weight:900">&#10003;</span>&nbsp;&nbsp;<span style="color:#374151;font-size:14px"><strong>M&aacute;s de 5.000 instalaciones</strong> en Barcelona y alrededores</span></div>
      </div>

      <div style="background:#0A0A1A;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px">
        <div style="color:#E53E3E;font-size:11px;font-weight:800;letter-spacing:0.12em;margin-bottom:8px">OFERTA EXCLUSIVA</div>
        <div style="color:white;font-size:20px;font-weight:900;margin-bottom:6px">Descuento especial en tu primera instalaci&oacute;n</div>
        <div style="color:#9CA3AF;font-size:13px;margin-bottom:14px">Menciona este email al llamar y te aplicamos el descuento</div>
        <div style="display:inline-block;background:#E53E3E;color:white;padding:8px 20px;border-radius:50px;font-size:12px;font-weight:800">V&Aacute;LIDO HASTA 31 JULIO 2025</div>
      </div>

      <a href="tel:+34638109947" style="display:block;background:#E53E3E;color:white;text-align:center;padding:18px;border-radius:50px;font-weight:800;font-size:16px;text-decoration:none;margin-bottom:12px">
        Llamar ahora: 638 109 947
      </a>
      <a href="https://wa.me/34638109947" style="display:block;background:#25D366;color:white;text-align:center;padding:18px;border-radius:50px;font-weight:800;font-size:16px;text-decoration:none">
        Contactar por WhatsApp
      </a>
    </div>

    <div style="background:#F9FAFB;padding:20px 28px;text-align:center;border-top:1px solid #E5E7EB">
      <p style="color:#9CA3AF;font-size:12px;margin:0 0 4px">alarmasenbarcelona.com &middot; Barcelona y alrededores</p>
      <p style="color:#9CA3AF;font-size:12px;margin:0">Tel: 638 109 947 &middot; info@alarmasenbarcelona.com</p>
    </div>

  </div>
</body>
</html>`;
}

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

    try {
      const { data: notifData, error: notifErr } = await resend.emails.send({
        from: 'info@alarmasenbarcelona.com',
        to: 'tcnpremium@gmail.com',
        reply_to: 'tcnpremium@gmail.com',
        subject: 'NUEVO PRESUPUESTO - ' + formData.nombre.trim(),
        html: buildNotifEmail(formData, phoneClean)
      });
      if (notifErr) {
        notifStatus = 'failed';
        notifError = JSON.stringify(notifErr);
        console.error('RESEND ERROR notif:', JSON.stringify(notifErr));
      } else {
        notifStatus = 'sent';
        console.log('Notif email OK id:', notifData?.id);
      }
    } catch (emailErr) {
      notifStatus = 'failed';
      notifError = emailErr.message;
      console.error('Notif email FAILED:', emailErr.message);
    }

    if (formData.email?.trim()) {
      try {
        const { data: confirmData, error: confirmErr } = await resend.emails.send({
          from: 'info@alarmasenbarcelona.com',
          to: formData.email.trim(),
          subject: 'Solicitud recibida — te llamamos antes de 24h',
          html: buildConfirmEmail(formData)
        });
        if (confirmErr) {
          console.error('RESEND ERROR confirm:', JSON.stringify(confirmErr));
        } else {
          console.log('Confirm email OK id:', confirmData?.id, 'to:', formData.email.trim());
        }
      } catch (emailErr) {
        console.error('Confirm email FAILED:', emailErr.message);
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
