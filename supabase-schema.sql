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

-- Tabla de suscriptores a la newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  nombre TEXT DEFAULT '',
  email TEXT NOT NULL UNIQUE,
  acepta_privacidad BOOLEAN NOT NULL DEFAULT FALSE,
  origen TEXT DEFAULT 'home'
);

CREATE INDEX IF NOT EXISTS newsletter_subscribers_created_at_idx ON newsletter_subscribers(created_at DESC);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON newsletter_subscribers
  FOR ALL USING (auth.role() = 'service_role');

-- Política: anon puede insertar suscripciones (desde el formulario web)
CREATE POLICY "Anon can insert newsletter subscribers" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);
