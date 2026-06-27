# Deploy alarmasenbarcelona.com → Vercel + Supabase

## PASO 1 — Supabase: crear la tabla

1. Ve a https://supabase.com → tu proyecto
2. SQL Editor → Nueva query
3. Pega el contenido de `supabase-schema.sql` y ejecuta
4. Ve a Settings → API → copia:
   - Project URL → SUPABASE_URL
   - anon/public key → VITE_SUPABASE_ANON_KEY
   - service_role key → SUPABASE_SERVICE_KEY

## PASO 2 — GitHub: subir el código

```bash
git init
git add .
git commit -m "alarmasenbarcelona.com - migración a Vercel + Supabase"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/alarma-bcn.git
git push -u origin main
```

## PASO 3 — Vercel: conectar y desplegar

1. Ve a https://vercel.com → New Project
2. Importa el repositorio de GitHub
3. En Environment Variables añade:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_KEY
   - RESEND_API_KEY (re_... de resend.com)
4. Deploy

## PASO 4 — Dominio en Hostinger

En Hostinger DNS, cambiar:
- CNAME www → cname.vercel-dns.com
- A @ → 76.76.21.21

## PASO 5 — Dominio en Vercel

En Vercel → tu proyecto → Settings → Domains
→ Añadir: alarmasenbarcelona.com y www.alarmasenbarcelona.com
