# Proyecto: Premium Tech Security
- Dominio: alarmasenbarcelona.com (confirmado: `DEPLOY.md`, `vercel.json` redirige www→apex, `public/robots.txt` y `public/sitemap.xml`)
- Repositorio: tcnpremium-create/alarma-bcn (público)
- Stack: Vite + React (SPA con prerender), API serverless en `api/` (leads), Supabase, Resend/nodemailer, Stripe (front)
- Despliegue: Vercel (DNS en Hostinger). No desplegar sin autorización.
- Comandos: `npm run lint`, `npm run typecheck`, `npm test` (node --test), `npm run build`
- CI existente: build-check, codeql, seo-indexability (no modificar workflows sin autorización)
- Sensibles: formulario/API de leads (`api/lead*.js`), claves Supabase/Resend (solo variables de entorno, nunca valores), Google Business Profile (solo lectura)
