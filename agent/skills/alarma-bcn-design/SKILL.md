---
name: alarma-bcn-design
description: The Alarma BCN Design System — the primary visual and UX authority for any frontend/UI work on alarmasbarcelona.com (alarma-bcn repo), a professional home/business security company (alarmas, cámaras CCTV, control de accesos, videoporteros, mantenimiento) serving Barcelona and surrounding areas. Combines Emil Kowalski's design-engineering/motion principles and the Taste Skill anti-generic standards with this project's own brand direction, existing tokens, and conversion goals. Use this skill BEFORE designing or implementing any screen, component, page, landing, or UI change in this repo. Also use it to review existing UI for consistency, spacing, hierarchy, accessibility, and to decide whether to reuse an existing component (src/components/ui, src/components/landing, etc.) before creating a new one. Independent from — and never mixed with — KYMAT's or Bonikas' design systems, which live in unrelated repositories/projects.
license: MIT
metadata:
  author: alarma-bcn
  version: "1.0.0"
---

# Alarma BCN Design System

alarmasbarcelona.com es la web de una empresa profesional de seguridad
(alarmas, cámaras CCTV, control de accesos, videoporteros, mantenimiento y
soporte) que opera en Barcelona y su área metropolitana (Sabadell, Girona,
Lleida, Tarragona, Badalona, Cornellà, Hospitalet, Mataró, Terrassa,
Viladecans, Castelldefels, Sant Cugat, El Prat...). Todo el frontend de
este repositorio (`tcnpremium-create/alarma-bcn`) debe seguir esta skill
como autoridad visual y de UX principal.

Este proyecto es independiente de KYMAT y de Bonikas (otros repos/proyectos
del mismo propietario, con sus propias identidades y skills). **No mezclar
paletas, tono ni componentes entre proyectos.**

Esta skill **combina y prioriza**, en este orden:

1. **`emil-design-eng`** y el resto de skills de Emil Kowalski instaladas en
   `.claude/skills/` (`animate`, `apple-design`, `review-animations`,
   `improve-animations`, `ask-sonner`, `pick-ui-library`) — para
   microinteracciones, motion y pulido de componentes.
2. **Taste Skill** (`high-end-visual-design`, `redesign-existing-projects`,
   `design-taste-frontend`, `minimalist-ui`, etc.) — para evitar el
   aspecto genérico "empresa de alarmas de plantilla" / "AI generated
   website".
3. **Las reglas específicas de Alarma BCN** descritas abajo, que tienen
   **prioridad** cuando entran en conflicto con lo anterior — en
   particular, la identidad de marca ya existente (ver "Identidad actual").

Antes de tocar cualquier UI: lee esta skill entera, revisa qué skills
instaladas aplican al caso concreto (animación → `animate`; revisar motion
→ `review-animations`; elegir librería → `pick-ui-library`; toasts →
`ask-sonner`, ya usado en el proyecto vía `sonner`/`react-hot-toast`), y
**busca componentes existentes en `src/components/ui` y
`src/components/landing` antes de crear nuevos**.

## Identidad actual (punto de partida — no la sustituyas, mejórala)

El proyecto ya tiene una identidad reconocible que hay que conservar y
refinar, no reinventar:

- **Tipografía:** Inter (ya cargada vía Google Fonts en `index.html`,
  pesos 300–800). Mantenerla; no introducir una segunda familia sin
  justificación real.
- **Color de titulares/marca:** azul marino muy oscuro `#0A1628`
  (`.article-content h1/h2` en `src/globals.css`) — es el tono de
  "autoridad técnica" del proyecto. Úsalo como referencia para un primary
  oscuro tipo navy, no negro puro.
- **Rojo de alerta/CTA:** `red-500`/`red-600` ya se usa de forma repetida
  en CTAs y elementos de urgencia/seguridad. Es el acento de la marca
  (asociación con alarma/protección activa) — consérvalo como color de
  acción, pero con moderación (ver "Evitar siempre").
- **Verde:** usado para estados de éxito/confirmación (`green-600/700`,
  `bg-green-100`). Mantener esa convención semántica (verde = éxito/estado
  seguro), no reutilizarlo para otra cosa.
- **Neutros:** gray/slate (`gray-50` a `gray-900`, `slate-*`) para texto y
  fondos — es la base tonal del sitio, coherente con un look técnico y
  serio. Mantener esta escala en vez de introducir otra.
- **Sistema de componentes:** shadcn/ui estilo "new-york" sobre Radix UI
  (`components.json`, `src/components/ui/`), tokens HSL en
  `src/index.css` (`--background`, `--primary`, `--destructive`, etc.),
  Tailwind con `darkMode: class`. **Extiende estos tokens, no crees un
  sistema paralelo.** Si hace falta un tono propio de marca (ej. el navy
  `#0A1628`), añádelo como token nuevo (`--brand-navy` o similar) en vez de
  hardcodear el hex en componentes.
- **Animación:** `framer-motion` ya es dependencia del proyecto — úsala
  para las transiciones/microinteracciones en vez de añadir otra librería
  de animación.
- Cualquier cambio de marca (color, tipografía, tono) debe partir de
  auditar lo que ya existe (`redesign-existing-projects` ayuda aquí) y
  proponer una evolución coherente, nunca un rediseño desde cero.

## Dirección de marca

La web debe transmitir: **seguridad, confianza, tecnología,
profesionalidad, protección, rapidez, solvencia, empresa homologada,
instalación profesional, servicio premium, cercanía, conversión.**

Debe parecer una **empresa tecnológica de seguridad moderna y potente**,
no una web genérica de instalador de alarmas de los años 2000 ni una
plantilla SaaS sin alma. Referencia de nivel: el mismo rigor visual que
`kymat-design` y las skills de Taste exigen para cualquier producto
premium, aplicado aquí a seguridad física/tecnológica en vez de a audio.

### Evitar siempre

- Gradientes decorativos sin función (el navy + rojo + neutros ya dan
  suficiente carácter).
- Sombras excesivas o "glassmorphism" gratuito.
- Tarjetas como contenedor por defecto para todo (usar tarjeta solo cuando
  agrupar contenido con borde/fondo aporta algo real: un plan, un kit, un
  testimonio — no para cada bloque de texto).
- Animaciones excesivas o simultáneas; el rojo de marca ya llama la
  atención, no hace falta que todo se mueva a la vez.
- Elementos decorativos sin propósito (iconos random, ilustraciones
  genéricas de "seguridad" tipo stock).
- Texto de relleno o copy vago ("soluciones innovadoras a tu medida").
- Diseños típicos "generados por IA": hero enorme + 3 tarjetas +
  gradiente morado-azul + emojis como iconos. Aquí NUNCA.
- Botones gigantes sin jerarquía: un CTA primario claro por sección
  (presupuesto / llamada / WhatsApp), el resto secundario.

## Principios de producto

1. Jerarquía visual evidente de un vistazo (tamaño, peso, contraste,
   posición — no solo color).
2. Cada elemento debe justificar su presencia con una razón de UX o de
   conversión; si no la tiene, se elimina.
3. Claridad antes que decoración.
4. Espaciado, grid, tipografía y contraste usados con intención, no para
   rellenar huecos.
5. Animaciones suaves y funcionales (ver Animación).
6. Microinteracciones con feedback real (hover, focus, envío de
   formulario, click en WhatsApp/llamada).
7. Consistencia entre todas las páginas de ciudad/servicio (Sabadell,
   Girona, Lleida, Tarragona, Badalona, Cornellà...) — mismo patrón de
   componentes, mismo lenguaje visual, solo cambia el contenido local.
8. Responsive obligatorio, con especial cuidado en móvil (la mayoría del
   tráfico de "alarma urgente" / "presupuesto alarma" es móvil).
9. Accesibilidad obligatoria (ver Accesibilidad).
10. Contemplar siempre estados: loading, empty, error y success (formularios
    de contacto/presupuesto, calculadora, área de clientes).
11. Componentes reutilizables vía variants, no duplicados por página de
    ciudad o servicio.
12. Antes de crear un componente nuevo, revisa `src/components/ui`
    (shadcn/Radix), `src/components/landing` y `src/components/services`
    — casi cualquier bloque de landing (hero, features, testimonios,
    pricing/kits, FAQ, CTA final) ya tiene un equivalente reutilizable
    entre las páginas de ciudad.

## Animación (principios de Emil Kowalski)

Aplica la skill `animate` (y `review-animations` al revisar código
existente) con estas reglas específicas:

- Microinteracciones con propósito: hover en CTAs, focus en formularios,
  feedback de envío (loading → success/error), apertura de drawers/menús.
- Transiciones suaves con easing natural (`framer-motion` ya lo facilita);
  evitar `linear` puro salvo en indicadores de progreso continuo.
- Feedback inmediato en acciones críticas de conversión: click en
  "Solicitar presupuesto", "Llamar", "WhatsApp" debe responder
  visualmente al instante, aunque la acción real (abrir WhatsApp, enviar
  formulario) tarde un poco.
- Motion con propósito, nunca decorativo puro — nada de "radarPulse"-style
  loops infinitos salvo donde refuercen el mensaje (p. ej. un pulso sutil
  en un icono de "sistema activo/monitorizado" tiene sentido temático;
  usarlo con moderación, no en toda la página).
- Respetar `prefers-reduced-motion` en todas las animaciones no
  funcionales.

## UX orientada a conversión

Los objetivos de negocio del sitio son: solicitudes de presupuesto,
llamadas, WhatsApp, solicitudes de instalación, mantenimiento, alarmas,
cámaras CCTV, control de accesos, videoporteros y otros servicios de
seguridad.

- CTA principal visible pero elegante en cada página relevante (no un
  botón gigante parpadeante; sí un contraste claro, bien posicionado,
  con copy específico — "Pide presupuesto gratis", no "Contacto").
- WhatsApp y llamada telefónica son canales de conversión de primer
  nivel para este negocio: deben estar siempre accesibles (sticky/CTA
  fijo en móvil cuando tenga sentido), sin ser intrusivos.
- Los formularios (presupuesto, contacto, calculadora) deben minimizar
  fricción: campos justos, validación clara inline, estado de envío
  visible, confirmación clara de éxito.
- Las páginas de ciudad/servicio deben mantener el mismo andamiaje de
  conversión (hero con CTA, prueba social/confianza, servicios, CTA
  final) para que el usuario reconozca el patrón entre localidades.
- La confianza se transmite con señales concretas (empresa homologada,
  años de experiencia, zonas cubiertas, testimonios reales), no con
  adjetivos vacíos.

## Accesibilidad

- Contraste AA mínimo en todo texto sobre navy/rojo/neutros.
- Navegación completa por teclado en menús, formularios y drawers.
- `focus-visible` siempre visible y consistente con los tokens de
  `--ring`.
- Roles/labels ARIA correctos en componentes Radix custom.
- No comunicar estado (éxito/error de formulario, disponibilidad) solo
  por color — acompañar siempre de icono/texto.

## Arquitectura de componentes

Antes de crear un componente nuevo, revisar y reutilizar/extender lo que
ya existe:

- `src/components/ui/` — primitives shadcn/Radix (botones, inputs,
  selects, dialogs, tooltips, tabs, toasts vía `sonner`/`react-hot-toast`,
  etc.). Extender por variant, no duplicar.
- `src/components/landing/` — bloques de landing reutilizados entre
  páginas de ciudad/servicio (hero, features, CTA, testimonios...).
- `src/components/services/`, `src/components/clientes/`,
  `src/components/blog/`, `src/components/ads/`,
  `src/components/tracking/`, `src/components/seo/` — dominios ya
  establecidos; el código nuevo de cada área va ahí, no en la raíz de
  `components/`.
- Todo componente interactivo define explícitamente sus estados: default,
  hover, focus-visible, active, disabled, loading, error.
- Antes de añadir una librería nueva, consulta `pick-ui-library` — el
  proyecto ya trae Radix, `cmdk`, `embla-carousel`, `vaul`, `sonner`,
  `react-hook-form` + `zod`; reutilízalas antes de sumar una alternativa.

## Flujo de trabajo antes de implementar

1. Analiza la pantalla/página a construir o modificar (¿es una landing de
   ciudad/servicio? ¿un formulario? ¿el área de clientes?).
2. Analiza los componentes existentes (`src/components/ui`,
   `src/components/landing`, páginas de ciudad similares) que ya cubren
   parte del problema.
3. Comprueba qué skills instaladas aplican (`emil-design-eng`, `animate`,
   `high-end-visual-design`, `minimalist-ui`, `redesign-existing-projects`,
   `pick-ui-library`, `ask-sonner`).
4. Aplica Taste Skill (evita lo genérico, ver "Evitar siempre").
5. Aplica los principios de Emil Kowalski (motion, pulido, detalle).
6. Aplica este Alarma BCN Design System (identidad actual, jerarquía,
   conversión, componentes, accesibilidad) — **esta skill tiene prioridad
   sobre las reglas genéricas de Emil Kowalski/Taste cuando hay conflicto
   de identidad visual** (p. ej. si `minimalist-ui` sugiere eliminar el
   rojo de marca, prevalece conservar el acento rojo de Alarma BCN).
7. Implementa reutilizando componentes existentes cuando sea posible.
8. Revisa visualmente el resultado (o usa `review-animations` /
   `find-animation-opportunities` si el cambio incluye motion).
9. Corrige spacing, tipografía, responsive, contraste y jerarquía antes de
   dar el cambio por terminado.
10. Verifica que no se ha roto ninguna funcionalidad existente (rutas,
    formularios, tracking/analytics, SEO por página vía Helmet).

## Notas de proyecto

- Este proyecto es una app Base44 (`README.md`) sincronizada con
  Base44 Builder: los cambios en el repo se reflejan allí. No renombrar ni
  mover estructuras base (`src/api/base44Client.js`, `pages.config.js`)
  sin necesidad real.
- Despliegue en Vercel + Supabase (`DEPLOY.md`, `vercel.json`); no tocar
  configuración de dominio, variables de entorno ni `vercel.json` como
  parte de trabajo de diseño.
- No mezclar esta skill ni sus tokens con KYMAT (`kymat-design`, otro
  repo) ni con Bonikas (otro proyecto, identidad de salón de belleza) —
  son marcas y negocios completamente distintos.
