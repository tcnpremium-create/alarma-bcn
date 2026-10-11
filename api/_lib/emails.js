// Plantillas de correo. TODO dato del cliente se escapa: antes se insertaba tal cual
// en el HTML (un nombre con <, > o comillas rompía el correo o inyectaba contenido).

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const multiline = (value) => esc(value).replace(/\r?\n/g, '<br>');

export function notifSubject(lead) {
  const base = 'NUEVO PRESUPUESTO - ' + String(lead.nombre || '').trim();
  return lead.is_test ? '[PRUEBA TÉCNICA — NO CLIENTE REAL] ' + base : base;
}

export function buildNotifEmail(lead, { sinGuardar = false } = {}) {
  const phone = esc(lead.telefono);
  const banner = lead.is_test
    ? '<div style="background:#FEF3C7;color:#92400E;padding:12px 24px;font-weight:bold">PRUEBA TÉCNICA — NO ES UN CLIENTE REAL. No requiere llamada.</div>'
    : sinGuardar
      ? '<div style="background:#FEE2E2;color:#991B1B;padding:12px 24px;font-weight:bold">ATENCIÓN: esta solicitud NO se pudo guardar en la base de datos. Este correo es el único registro: anótala.</div>'
      : '';
  const row = (label, value) =>
    `<tr><td style="padding:8px 0;color:#666;width:140px;vertical-align:top">${label}</td><td style="padding:8px 0">${value}</td></tr>`;
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
    <div style="background:#E53E3E;padding:24px">
      <h2 style="color:white;margin:0;font-size:20px">NUEVA SOLICITUD - alarmasenbarcelona.com</h2>
    </div>${banner}
    <div style="padding:24px;background:#fff">
      <table style="width:100%;border-collapse:collapse">
        ${row('Nombre', `<strong>${esc(lead.nombre)}</strong>`)}
        ${row('Teléfono', `<strong>${phone}</strong>`)}
        ${row('Email', esc(lead.email) || '-')}
        ${row('Tipo cliente', esc(lead.tipo_cliente) || '-')}
        ${row('Zona', esc(lead.zona) || '-')}
        ${row('Servicio', esc(lead.servicio_interes) || '-')}
        ${row('Descripción', multiline(lead.mensaje) || '-')}
        ${row('Origen', esc(lead.origen || '-') + (lead.source_page ? ' · ' + esc(lead.source_page) : ''))}
        ${row('Recibida', esc(lead.created_at || new Date().toISOString()))}
      </table>
      <a href="tel:${esc(String(lead.telefono).replace(/[^+\d]/g, ''))}" style="display:inline-block;margin-top:20px;background:#E53E3E;color:white;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:16px">Llamar ${phone}</a>
    </div>
  </div>`;
}

export function buildAlertEmail(rows) {
  const items = rows
    .map((r) => `<li>${esc(r.nombre)} · ${esc(r.telefono)} · ${esc(r.created_at)} · intentos: ${esc(r.notif_attempts)} · ${esc(r.notif_error || '')}</li>`)
    .join('');
  return `<div style="font-family:Arial,sans-serif;max-width:600px">
    <h2 style="color:#B91C1C">ALERTA: solicitudes guardadas SIN aviso por correo</h2>
    <p>Estas solicitudes están guardadas en Supabase (tabla <code>leads</code>) pero no se ha podido avisar por correo tras varios intentos. <strong>Llama a estos clientes.</strong></p>
    <ul>${items}</ul></div>`;
}

// La confirmación al cliente lleva texto fijo, sin fechas ni plazos de oferta.
export function buildConfirmEmail(lead) {
  const nombre = esc(String(lead.nombre || '').trim());
  const servicio = esc(String(lead.servicio_interes || '').trim() || 'sistema de seguridad');
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F3F4F6">
  <div style="max-width:600px;margin:0 auto;background:#fff;font-family:Arial,Helvetica,sans-serif">
    <div style="background:#0A0A1A;padding:20px 28px;text-align:center">
      <div style="color:#E53E3E;font-size:20px;font-weight:900;letter-spacing:-0.5px">alarmasenbarcelona.com</div>
      <div style="color:#9CA3AF;font-size:12px;margin-top:4px">Premium Tech Security</div>
    </div>
    <div style="background:linear-gradient(135deg,#E53E3E 0%,#C53030 100%);padding:32px 28px;text-align:center">
      <h1 style="color:white;margin:0 0 8px;font-size:24px;font-weight:900">&#161;Solicitud recibida, ${nombre}!</h1>
    </div>
    <div style="padding:32px 28px">
      <p style="color:#374151;font-size:16px;line-height:1.7;margin:0 0 24px">
        Hemos recibido tu solicitud para <strong style="color:#0A0A1A">${servicio}</strong>.
        Nuestro equipo te contactar&aacute; lo antes posible con una propuesta personalizada.
      </p>
      <a href="tel:+34638109947" style="display:block;background:#E53E3E;color:white;text-align:center;padding:18px;border-radius:50px;font-weight:800;font-size:16px;text-decoration:none;margin-bottom:12px">
        Llamar ahora: 638 10 99 47
      </a>
      <a href="https://wa.me/34638109947" style="display:block;background:#25D366;color:white;text-align:center;padding:18px;border-radius:50px;font-weight:800;font-size:16px;text-decoration:none">
        Contactar por WhatsApp
      </a>
    </div>
    <div style="background:#F9FAFB;padding:20px 28px;text-align:center;border-top:1px solid #E5E7EB">
      <p style="color:#9CA3AF;font-size:12px;margin:0">Tel: 638 10 99 47 &middot; <a href="mailto:tcnpremium@gmail.com" style="color:#9CA3AF;text-decoration:underline">tcnpremium@gmail.com</a></p>
    </div>
  </div>
</body>
</html>`;
}
