import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

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
      return res.status(400).json({ error: 'Nombre y teléfono son obligatorios' });
    }

    const phoneClean = formData.telefono.replace(/\s/g, '');

    // Guardar lead en Supabase (crítico)
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

    // Email de notificación a tcnpremium@gmail.com
    try {
      const notifResult = await resend.emails.send({
        from: 'notificaciones@tsoapp.es',
        to: 'tcnpremium@gmail.com',
        subject: 'NUEVO PRESUPUESTO - ' + formData.nombre.trim(),
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#E53E3E;padding:20px;border-radius:8px 8px 0 0">
            <h2 style="color:white;margin:0">NUEVA SOLICITUD DE PRESUPUESTO</h2>
          </div>
          <div style="background:#f9f9f9;padding:20px;border:1px solid #eee;border-radius:0 0 8px 8px">
            <p><strong>Nombre:</strong> ${formData.nombre.trim()}</p>
            <p><strong>Telefono:</strong> ${phoneClean}</p>
            <p><strong>Email:</strong> ${formData.email?.trim() || '-'}</p>
            <p><strong>Tipo cliente:</strong> ${formData.tipo_cliente || '-'}</p>
            <p><strong>Zona:</strong> ${formData.zona?.trim() || '-'}</p>
            <p><strong>Servicio:</strong> ${formData.servicio_interes?.trim() || '-'}</p>
            <p><strong>Mensaje:</strong> ${formData.mensaje?.trim() || '-'}</p>
            <a href="tel:+34${phoneClean}" style="display:inline-block;background:#E53E3E;color:white;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:bold;margin-top:12px">Llamar ahora</a>
          </div>
        </div>`
      });
      notifStatus = 'sent';
      console.log('Email enviado OK:', notifResult?.id);
    } catch (emailErr) {
      notifStatus = 'failed';
      notifError = emailErr.message;
      console.error('Email FALLIDO:', emailErr.message);
    }

    // Email de confirmación al usuario (si proporcionó email)
    if (formData.email?.trim()) {
      try {
        await resend.emails.send({
          from: 'notificaciones@tsoapp.es',
          to: formData.email.trim(),
          subject: 'Hemos recibido tu solicitud - Premium Tech Security',
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#E53E3E;padding:20px;border-radius:8px 8px 0 0">
              <h2 style="color:white;margin:0">Gracias, ${formData.nombre.trim()}!</h2>
            </div>
            <div style="background:#f9f9f9;padding:20px;border:1px solid #eee;border-radius:0 0 8px 8px">
              <p>Recibimos tu solicitud para <strong>${formData.servicio_interes || 'sistema de seguridad'}</strong>.</p>
              <p>Te contactamos antes de <strong>24 horas</strong>.</p>
              <a href="tel:+34638109947" style="display:inline-block;background:#E53E3E;color:white;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:bold;margin-top:12px">638 10 99 47</a>
            </div>
          </div>`
        });
      } catch (emailErr) {
        console.error('Email confirmacion fallido:', emailErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      id: lead.id,
      emailNotif: notifStatus,
      emailError: notifError
    });

  } catch (error) {
    console.error('Error handler:', error);
    return res.status(500).json({ error: 'Error interno', detail: error.message });
  }
}