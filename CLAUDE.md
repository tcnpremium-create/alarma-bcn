# alarmasenbarcelona.com — Premium Tech Security

## Herramientas y flujo de calidad (Claude Code)

MCP del proyecto (`.mcp.json`, sin secretos): `playwright`, `chrome-devtools` (incluye Lighthouse), `shadcn`, `magicui`. Los wrappers de `.claude/mcp/` añaden `--no-sandbox` y el Chromium incluido solo en contenedores cloud.
Conectores de la cuenta claude.ai (no van en el repo): GitHub, Render, Netlify, Vercel, Context7, OpenRush (Search Console), OpenSEO, Semrush, Ahrefs, Windsor.ai, Supermetrics, Cloudinary.
Plugins: `figma` (requiere iniciar sesión con `/mcp`), `firecrawl` (requiere `FIRECRAWL_API_KEY` en el entorno, nunca en el repo).

Agentes especializados en `.claude/agents/` — usa el que toque en vez de cargar todas las herramientas:
- `frontend-designer` — diseño/desarrollo UI (shadcn, Magic UI, Figma, Context7).
- `seo-auditor` — SEO técnico/local/IA con datos reales (GSC vía OpenRush, OpenSEO, Semrush, Ahrefs).
- `perf-a11y` — Core Web Vitals, Lighthouse, WCAG 2.2 AA.
- `qa-conversion` — teléfono, WhatsApp, formularios y entrega real.

Antes de cada despliegue: build + lint/tests del repo → `qa-conversion` → `perf-a11y` (móvil) → `seo-auditor` en las URLs tocadas. Desplegar solo con autorización del propietario y verificar después en producción.
Reglas: no inventar datos SEO; no gastar créditos/planes sin permiso; no mezclar archivos, credenciales ni configuración entre negocios; no migrar de plataforma de hosting por iniciativa propia.

### Datos de este proyecto
- Dominio: https://alarmasenbarcelona.com — servido por **Vercel** (Vite + React, prerender). Leads: `api/lead.js` → Supabase + Resend/Gmail; `GET /api/lead` es el chequeo de salud.
- Teléfono/WhatsApp: +34 638 10 99 47. Search Console conectado vía OpenRush.
- Prioridad comercial: cámaras/CCTV, alarmas Ajax, empresas, perimetrales, antiocupación, control de accesos y videoporteros.
- Comprobar: `npm run lint`, `npm test`, `npm run build`.
