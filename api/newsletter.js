import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { nombre, email, aceptaPrivacidad } = req.body || {};
    const emailClean = email?.trim().toLowerCase();

    if (!emailClean || !EMAIL_RE.test(emailClean)) {
      return res.status(400).json({ error: 'Email no válido' });
    }
    if (!aceptaPrivacidad) {
      return res.status(400).json({ error: 'Debes aceptar la política de privacidad' });
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{
        nombre: nombre?.trim() || '',
        email: emailClean,
        acepta_privacidad: true,
        origen: 'home',
      }]);

    if (error) {
      if (error.code === '23505') {
        return res.status(200).json({ success: true, alreadySubscribed: true });
      }
      throw error;
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Newsletter handler error:', error);
    return res.status(500).json({ error: 'Error interno', detail: error.message });
  }
}
