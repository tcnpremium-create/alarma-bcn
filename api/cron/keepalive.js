import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Supabase free tier pauses a project after ~7 days without activity, which
// breaks /api/lead (and every form on the site) with "fetch failed" until
// someone notices and restores it manually. This endpoint runs on a daily
// Vercel Cron and does one trivial read, which counts as activity.
export default async function handler(req, res) {
  try {
    const { error } = await supabase.from('leads').select('id').limit(1);
    if (error) throw error;
    return res.status(200).json({ ok: true, ts: new Date().toISOString() });
  } catch (err) {
    console.error('Keepalive failed:', err.message);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
