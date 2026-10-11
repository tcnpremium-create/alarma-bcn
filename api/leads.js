import { createSupabaseDb } from './_lib/db.js';
import { isAdmin } from './_lib/auth.js';

// Listado de solicitudes: SOLO administración. Antes era público y devolvía
// nombre, teléfono y email de todos los clientes a cualquiera que abriera la URL.
const db = createSupabaseDb();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const auth = isAdmin(req);
  if (!auth.ok) return res.status(auth.status).json({ error: auth.error });

  const { data, error } = await db.list({ includeTest: req.query?.include_test === '1' });
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}
