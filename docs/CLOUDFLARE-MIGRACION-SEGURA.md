# Migración segura a Cloudflare Pages — solo staging, NO publicada

**Estado:** laboratorio en la rama chore/cloudflare-staging-no-cutover-20261125.
**No cambiar los DNS ni desactivar Vercel.** alarmasenbarcelona.com sigue en Vercel.

## Por qué NO cortar todavía

En Vercel los avisos entran principalmente por Gmail SMTP. En Cloudflare,
el adaptador propuesto usa Resend HTTPS y declara gmail:false: NO simula
un canal SMTP disponible. El código original documenta una cuenta Resend
suspendida. La presencia de una clave no certifica su validez o su entrega.
Es obligatorio comprobar recepción real antes del cambio.

## Alcance preparado

- 45 redirects y 71 rewrites extraídos del vercel.json original;
  preservan HTML prerenderizados SEO, canonical, 404 y rutas legales.
- API de presupuestos, deduplicación, administrador y campaña Black Friday.
- API privada de mantenimiento, pero SIN horarios de cron automáticos.
- Envío HTTPS mediante Resend, con estado de proveedor verificable.
- CI dedicada con tests, build y empaquetado de Functions, sin deploy.

## Configuración futura de staging en Cloudflare

1. Crear un proyecto Pages **independiente** de prueba llamado
   premium-tech-security-staging, conectar el repositorio GitHub
   tcnpremium-create/alarma-bcn y seleccionar la rama staging.
   No asignar aún alarmasenbarcelona.com ni www.
2. Comando de build: npm run cf:build. Salida: dist. Node 22.
   Functions en el directorio functions; wrangler.jsonc usa
   compatibilidad 2026-11-25 y nodejs_compat.
3. Configurar únicamente en los secretos de Pages Functions:
   SUPABASE_URL, SUPABASE_SERVICE_KEY, RESEND_API_KEY, RESEND_FROM,
   ADMIN_TOKEN y CRON_SECRET. No poner secretos en variables VITE_*,
   GitHub ni en el cliente. Verificar previamente el dominio remitente.
4. Probar GET /api/lead y exigir base de datos y canal de correo OK;
   esto solo acredita configuración y acceso a BD, NO entrega de email.
5. Enviar una única prueba marcada como técnica, con teléfono 000000000
   y sin datos reales. Comprobar en Supabase is_test, notif_status,
   notif_via e id del proveedor y recepción real en tcnpremium@gmail.com.
   El HTTP 200 por sí solo no sirve.
6. Probar el panel /AdminLeads con token, y 401/503 sin autorización;
   probar actualizaciones PATCH y la campaña sin otorgar cupones reales.
7. Comparar las 70 rutas SEO, sitemap, canonical, 404 reales, metadatos,
   áreas privadas y redirecciones, sin generar duplicados ni soft 404.
8. Configurar cron seguro externo para /api/cron/keepalive y
   /api/cron/retry-notifs (Authorization: Bearer CRON_SECRET).
   Los cron de vercel.json NO se transfieren por sí solos a Pages.
9. La redirección www a apex depende de la cabecera Host en Vercel;
   se migrará con Redirect Rules en Cloudflare SOLO durante el cambio
   final de DNS, no como redirect general en public/_redirects.
10. Mantener Vercel activo hasta comprobar todo. Planificar rollback
    de DNS y ventanas de verificación, sin provocar cortes.

## Comprobaciones técnicas (sin realizar deploy)

- npm ci && npm test
- npm run cf:build
- npx --yes wrangler@4.167.0 pages functions build functions --outdir=.cloudflare-bundle --compatibility-date=2026-11-25 --compatibility-flags=nodejs_compat

**Prohibido realizar el cutover** si no existe acceso a Cloudflare,
si el correo HTTPS no entrega de verdad, si faltan crons, si fallan
formularios o si cambian los 404 o las rutas orgánicas. Ninguna prueba
debe enviar correo a clientes reales ni conceder promociones reales.
