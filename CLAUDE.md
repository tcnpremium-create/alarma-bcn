# alarma-bcn (alarmasbarcelona.com)

App React (Vite + JSX) generada originalmente con Base44, con Tailwind CSS
y componentes shadcn/ui sobre Radix UI (`components.json`, estilo
"new-york"), routing con `react-router-dom`, backend en Supabase y
despliegue en Vercel (ver `DEPLOY.md` y `vercel.json`). Es la web de una
empresa profesional de seguridad (alarmas, cámaras CCTV, control de
accesos, videoporteros, mantenimiento) en Barcelona y su área
metropolitana.

Este repositorio es independiente de KYMAT y de Bonikas (otros
proyectos/repos del mismo propietario). No comparte identidad de marca,
componentes ni skills con ellos.

## Diseño / UI-UX

Para cualquier trabajo de frontend o UI/UX en este repositorio:

- Usa siempre `.claude/skills/alarma-bcn-design/SKILL.md` como guía
  principal de diseño visual — es la autoridad sobre identidad de marca
  (navy `#0A1628`, rojo de acción, verde de éxito, neutros gray/slate,
  tipografía Inter), principios de producto, motion, UX orientada a
  conversión (presupuesto, llamada, WhatsApp) y arquitectura de
  componentes de este proyecto.
- Combínala con las skills instaladas de Emil Kowalski
  (`emil-design-eng`, `animate`, `apple-design`, `review-animations`,
  `improve-animations`, `pick-ui-library`, `ask-sonner`, etc.) para motion
  y pulido de componentes, y con las skills de Taste
  (`high-end-visual-design`, `redesign-existing-projects`,
  `design-taste-frontend`, `minimalist-ui`, etc.) para evitar un resultado
  genérico o "AI generated website".
- **`alarma-bcn-design` tiene prioridad** sobre las reglas genéricas de
  Emil Kowalski/Taste cuando hay conflicto de identidad visual (p. ej.
  conservar el acento rojo de marca aunque una skill genérica sugiera
  quitarlo).
- No crear interfaces genéricas ni sustituir la identidad de marca
  existente (navy + rojo + neutros + Inter) por otra sin justificación.
- Antes de crear un componente nuevo, revisa `src/components/ui`,
  `src/components/landing` y el resto de `src/components/*` — reutiliza o
  extiende en vez de duplicar.
- La consistencia visual entre las páginas de ciudad/servicio
  (`src/pages/Alarmas*.jsx`, `Camaras*.jsx`, páginas de localidad, etc.)
  es prioritaria.
- Ver `.claude/skills/alarma-bcn-design/SKILL.md` para el flujo completo
  de trabajo antes de implementar cualquier cambio de UI.

## Skills instaladas

Instaladas con el gestor `skills` (`npx skills`), trackeadas en
`skills-lock.json`, expuestas a los agentes vía symlinks en
`.claude/skills/`:

- Emil Kowalski – Skills for Design Engineers
  (`github:emilkowalski/skills`): `animate`, `animate-expo`,
  `animation-vocabulary`, `apple-design`, `ask-sonner`, `emil-design-eng`,
  `find-animation-opportunities`, `improve-animations`, `pick-ui-library`,
  `prototype`, `review-animations`, `write-swift`.
- Taste Skill (`github:Leonxlnx/taste-skill`): `brandkit`,
  `industrial-brutalist-ui`, `gpt-taste`, `image-to-code`,
  `imagegen-frontend-mobile`, `imagegen-frontend-web`, `minimalist-ui`,
  `full-output-enforcement`, `redesign-existing-projects`,
  `high-end-visual-design`, `stitch-design-taste`,
  `design-taste-frontend`, `design-taste-frontend-v1`.
- `alarma-bcn-design`: skill propia del proyecto (no viene de un repo
  externo), ver arriba.

Para actualizar las skills externas: `npx skills update`. Para restaurar
desde `skills-lock.json` en un checkout nuevo: `npx skills
experimental_install`.

**Nota:** este repo ya tenía `.claude/` en `.gitignore` antes de esta
configuración (convención existente, no modificada). El contenido real de
todas las skills vive en `.agents/skills/` (y su copia universal en
`agent/skills/`), que sí están versionados; `.claude/skills/*` son
symlinks locales a `.agents/skills/*` que Claude Code usa para
descubrirlas. Si `.claude/skills/` no existe tras un `git clone` nuevo,
regenera los symlinks con `npx skills experimental_sync` (o repite `npx
skills add emilkowalski/skills --all -y` y `npx skills add
Leonxlnx/taste-skill --all -y`, que no duplican lo ya instalado) y crea a
mano el symlink `.claude/skills/alarma-bcn-design -> ../../.agents/skills/alarma-bcn-design`
si `experimental_sync` no lo cubre.

## Notas generales

- No borres código existente ni sustituyas dependencias sin necesidad.
- No cambies la arquitectura del proyecto (Base44/Vite/Supabase/Vercel)
  sin justificarlo.
- No toques `vercel.json`, configuración de dominio ni variables de
  entorno como parte de trabajo de diseño.
- Respeta los cambios locales del usuario y las configuraciones
  existentes.
