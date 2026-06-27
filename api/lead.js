import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const formData = req.body;
    if (!formData?.nombre?.trim() || !formData?.telefono?.trim()) {
      return res.status(400).json({ error: 'Nombre y teléfono son obligatorios' });
    }

    const phoneClean = formData.telefono.replace(/\s/g, '');

    // Save lead first (critical)
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

<<<<<<< HEAD
    await resend.emails.send({
      from: 'info@alarmasenbarcelona.com',
      to: 'tcnpremium@gmail.com',
      subject: `🔔 NUEVO PRESUPUESTO - ${formData.nombre}`,
      html: `<h2 style="color:#E53E3E">🔔 NUEVA SOLICITUD</h2>
        <p><b>Nombre:</b> ${formData.nombre}</p>
        <p><b>Teléfono:</b> ${phoneClean}</p>
        <p><b>Email:</b> ${formData.email || '-'}</p>
        <p><b>Tipo:</b> ${formData.tipo_cliente || '-'}</p>
        <p><b>Zona:</b> ${formData.zona || '-'}</p>
        <p><b>Servicio:</b> ${formData.servicio_interes || '-'}</p>
        <p><b>Mensaje:</b> ${formData.mensaje || '-'}</p>
        <a href="tel:+34${phoneClean}" style="background:#E53E3E;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:16px">📞 Llamar ahora</a>`
    });

    if (formData.email) {
      await resend.emails.send({
        from: 'info@alarmasenbarcelona.com',
        to: formData.email,
        subject: '✅ Hemos recibido tu solicitud — Premium Tech Security',
        html: `<h2 style="color:#E53E3E">¡Gracias, ${formData.nombre}!</h2>
          <p>Recibimos tu solicitud para <b>${formData.servicio_interes || 'sistema de seguridad'}</b>.</p>
          <p>Te contactamos antes de <b>24 horas</b>. O llámanos:</p>
          <a href="tel:+34638109947" style="background:#E53E3E;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block">📞 Llamar</a>`
=======
    // Send notification email (non-critical - don't fail if email fails)
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'tcnpremium@gmail.com',
        subject: `🔔 NUEVO PRESUPUESTO - ${formData.nombre}`,
        html: `<h2 style="color:#E53E3E">🔔 NUEVA SOLICITUD</h2>
          <p><b>Nombre:</b> ${formData.nombre}</p>
          <p><b>Teléfono:</b> ${phoneClean}</p>
          <p><b>Email:</b> ${formData.email || '-'}</p>
          <p><b>Tipo:</b> ${formData.tipo_cliente || '-'}</p>
          <p><b>Zona:</b> ${formData.zona || '-'}</p>
          <p><b>Servicio:</b> ${formData.servicio_interes || '-'}</p>
          <p><b>Mensaje:</b> ${formData.mensaje || '-'}</p>
          <a href="tel:+34${phoneClean}" style="background:#E53E3E;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:16px">📞 Llamar ahora</a>`
>>>>>>> faaccb5adb7d77e58197dcaa2e9e853acb80c076
      });
    } catch (emailErr) {
      console.error('Email failed:', emailErr.message);
    }

    // Send confirmation email to user (non-critical)
    if (formData.email) {
      try {
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: formData.email,
          subject: '✅ Hemos recibido tu solicitud — Premium Tech Security',
          html: `<h2 style="color:#E53E3E">¡Gracias, ${formData.nombre}!</h2>
            <p>Recibimos tu solicitud para <b>${formData.servicio_interes || 'sistema de seguridad'}</b>.</p>
            <p>Te contactamos antes de <b>24 horas</b>. O llámanos:</p>
            <a href="tel:+34638109947" style="background:#E53E3E;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block">📞 Llamar</a>`
        });
      } catch (emailErr) {
        console.error('Confirmation email failed:', emailErr.message);
      }
    }

    return res.status(200).json({ success: true, id: lead.id });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error interno' });
  }
}
