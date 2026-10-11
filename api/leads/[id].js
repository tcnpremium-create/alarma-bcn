import { createSupabaseDb } from '../_lib/db.js';
import { isAdmin } from '../_lib/auth.js';

const db = createSupabaseDb();

// Solo estos campos se pueden cambiar desde el panel. Antes se aceptaba cualquier
// campo del cuerpo (incluido el estado del aviso o is_test) sin autenticar.
const EDITABLE = ['estado', 'notas', 'notas_internas', 'prioridad', 'fecha_contacto', 'resultado'];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' });

  const auth = isAdmin(req);
  if (!auth.ok) return res.status(auth.status).json({ error: auth.error });

  const patch = {};
  for (const key of EDITABLE) if (key in (req.body || {})) patch[key] = req.body[key];
  if (!Object.keys(patch).length) return res.status(400).json({ error: 'Ningún campo editable' });

  const { data, error } = await db.update(req.query.id, patch);
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}
