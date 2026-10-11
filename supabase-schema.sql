-- Tabla de leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  nombre TEXT NOT NULL,
  email TEXT DEFAULT '',
  telefono TEXT NOT NULL,
  tipo_cliente TEXT DEFAULT 'hogar' CHECK (tipo_cliente IN ('hogar', 'negocio', 'comunidad', 'nave')),
  zona TEXT DEFAULT '',
  mensaje TEXT DEFAULT '',
  urgencia TEXT DEFAULT 'media' CHECK (urgencia IN ('baja', 'media', 'alta', 'urgente')),
  origen TEXT DEFAULT 'formulario_web' CHECK (origen IN ('formulario_web', 'chatbot', 'whatsapp', 'telefono', 'otro')),
  estado TEXT DEFAULT 'nuevo' CHECK (estado IN ('nuevo', 'contactado', 'presupuesto_enviado', 'cerrado', 'perdido')),
  servicio_interes TEXT DEFAULT '',
  notas TEXT DEFAULT '',
  description TEXT DEFAULT ''
);

-- Índices para búsqueda rápida
CREATE INDEX IF NOT EXISTS leads_estado_idx ON leads(estado);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);

-- RLS: habilitar seguridad por filas
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política: solo service role puede leer/escribir (el frontend usa anon solo para INSERT)
CREATE POLICY "Service role full access" ON leads
  FOR ALL USING (auth.role() = 'service_role');

-- Política: anon puede insertar leads (desde el formulario web)
CREATE POLICY "Anon can insert leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ===== Seguimiento del aviso por correo (migración leads_notification_tracking, aplicada 2026-10-11) =====
-- notif_status: pending | sent | failed | failed_final | legacy (anteriores al seguimiento: no se reenvían)
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS notif_status text,
  ADD COLUMN IF NOT EXISTS notif_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS notif_last_attempt_at timestamptz,
  ADD COLUMN IF NOT EXISTS notif_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS notif_via text,            -- resend | gmail
  ADD COLUMN IF NOT EXISTS notif_provider_id text,
  ADD COLUMN IF NOT EXISTS notif_error text,
  ADD COLUMN IF NOT EXISTS delivery_status text,      -- Resend: delivered, bounced...; gmail: accepted_smtp
  ADD COLUMN IF NOT EXISTS delivery_checked_at timestamptz,
  ADD COLUMN IF NOT EXISTS confirm_status text,       -- confirmación al cliente: sent | failed | skipped
  ADD COLUMN IF NOT EXISTS idempotency_key text,
  ADD COLUMN IF NOT EXISTS is_test boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS source_page text;
ALTER TABLE leads ALTER COLUMN notif_status SET DEFAULT 'pending';
CREATE UNIQUE INDEX IF NOT EXISTS leads_idempotency_key_uidx ON leads (idempotency_key) WHERE idempotency_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS leads_notif_retry_idx ON leads (created_at) WHERE notif_status IN ('pending','failed');
