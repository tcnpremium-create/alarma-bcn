# Plan de ejecución SEO — Premium Tech Security
**Fecha:** 2026-11-11
**Web:** https://alarmasenbarcelona.com
**Base de análisis:** Search Console vía Windsor.ai, 2026-10-13 a 2026-11-09 (28 días).
**Estado:** acciones planteadas salvo las expresamente marcadas como preparadas en el PR #76.

## 1. Acciones completadas en la rama SEO (no implica publicación)

- [x] Enlaces visibles y contextuales desde `/Servicios` a las siete landings de seguridad y tecnología del menú.
- [x] Actualizar HTML estático `public/__prerendered__/Servicios.html` con esos mismos enlaces. El sitio React usa `createRoot`; la copia estática sirve a los rastreadores.
- [x] Excluir `src/pages/AdminLeads.jsx`, panel privado, del cálculo de obsolescencia SEO. No altera su funcionamiento.
- [x] Actualizar `scripts/prerender-fingerprint.json` para el código revisado.
- [x] Comprobación `SEO indexability guard` verde en GitHub (commit 8862b956 y después 85f2a560).
- [x] Preview Vercel construido con éxito. El preview está protegido por autenticación: no confundir READY con test visual de la URL.

## 2. Baseline por URL (últimos 28 días)

| URL | Clics | Impresiones | Posición media |
|---|---:|---:|---:|
| / | 48 | 8.688 | 17,08 |
| /camaras-barcelona | 1 | 979 | 60,16 |
| /alarmas-barcelona | 1 | 225 | 39,65 |
| /control-accesos | 1 | 580 | 45,76 |
| /Promociones | 0 | 1.341 | 67,56 |
| /camaras-sabadell | 4 | 187 | 32,92 |
| /alarmas-sabadell | 0 | 255 | 20,39 |

Los promedios de URLs combinan muchas consultas; no representan ranking fijo de una única palabra clave.

## 3. Diagnóstico de indexación oficial (11-11-2026)

- `/camaras-barcelona`: indexada; canonical de Google correcto; rastreo el 03/11.
- `/alarmas-barcelona`: indexada; canonical correcto; rastreo el 02/11.
- `/control-accesos`: indexada; rastreo el 28/10.
- `/videoporteros`: Google responde *Google no reconoce esta URL*, a pesar de sitemap, HTML y enlaces. Comprobar tras publicar y solicitar indexación si procede.
- `/cerraduras`, `/redes-informaticas`, `/sonorizacion`: indexadas en la inspección API.

## 4. Próximas intervenciones en orden de riesgo/impacto

1. **Videoporteros (urgente):** una vez integrado PR #76, verificar el HTML público y su enlace desde /Servicios; después inspeccionar de nuevo `/videoporteros` en GSC. Confirmar canonicals y sitemap; la solicitud de indexación debe hacerse desde la herramienta oficial de Google si su API no ofrece esa acción. No declarar éxito hasta obtener un veredicto de indexación.
2. **Cámaras Barcelona:** observar por `query + page` la consulta `instalacion de camaras de seguridad barcelona`; ya se cambió title/description el 24/10 y no conviene repetir el cambio inmediatamente. Reforzar experiencia real mediante casos documentados, fotos originales y contenidos de instalación de empresas/comunidades, sin inventar cifras.
3. **Alarmas Barcelona:** separar la intención transaccional de `/alarmas-barcelona` frente a las informativas de blog y promociones. Contrastar impresiones/clics por consulta y URL antes de tocar title.
4. **Control de accesos:** estudiar un enfoque más amplio de tarjetas, PIN, puertas y empresas; no perder los términos biométricos ya visibles ni prometer tratamientos ilegales de datos.
5. **Cerraduras, redes, sonorización:** priorizar consultas validadas por GSC; sus datos son pequeños. No crear páginas casi duplicadas por localidades.
6. **Backlinks:** revisar enlaces anómalos de redes PBN, detectar si existe acción manual; no hacer desautorizaciones en masa basadas solo en un agregador.
7. **Leads:** conciliar clicks GSC, sesiones orgánicas y eventos GA4 `form_open`, `form_submit`, `form_success`, `click_phone`, `click_whatsapp`; separar problemas de SEO y de recepción de formularios.

## 5. Criterios para publicar cambios posteriores

- `npm test` y `SEO indexability guard` sin fallos.
- Preview Vercel READY y comprobación real del HTML, canonical, robots, enlaces y formularios (si preview está protegido, validar autenticado o sobre entorno controlado).
- Captura exacta de URLs/metadata antes y después; no cambiar simultáneamente todos los títulos.
- Medir 7 y 28 días completos comparables, segmentados por URL, consulta y dispositivo.
- No alterar teléfonos, dirección GBP, NAP, precios, cuota CRA ni promesas comerciales sin validación.
