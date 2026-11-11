# Diagnóstico SEO prioritario — cámaras Barcelona (11-11-2026)

Fuente: Google Search Console mediante Windsor.ai, propiedad `alarmasenbarcelona.com`, período completo 2026-11-03 a 2026-11-09. Son impresiones de Google, no visitas ni leads.

## Consulta comercial exacta

`instalacion de camaras de seguridad barcelona`:

| URL | Clics | Impresiones | Posición media |
|---|---:|---:|---:|
| / | 0 | 2 | 13.5 |
| /camaras-barcelona | 0 | 18 | 49.6111 |
| /Servicios | 0 | 3 | 95 |

`camaras de seguridad barcelona`:

| URL | Clics | Impresiones | Posición media |
|---|---:|---:|---:|
| / | 0 | 11 | 29.9091 |
| /camaras-barcelona | 0 | 10 | 32.4 |
| /Promociones | 0 | 5 | 40.6 |

`instalacion de camaras de seguridad sabadell`:

| URL | Clics | Impresiones | Posición media |
|---|---:|---:|---:|
| / | 0 | 10 | 2.9 |
| /camaras-sabadell | 0 | 12 | 7.25 |
| www / | 0 | 1 | 1 |

Las posiciones son medias por URL y consulta, no posiciones fijas. Una misma búsqueda puede generar impresiones para varias URLs y contextos; no sumar posiciones.

## Inspección de código en main

- `src/pages/CamarasBarcelona.jsx`: título, descripción, ruta y texto intro específicos.
- `src/components/landing/CameraCityTemplate.jsx`: H1 de instalación por ciudad, canonical propio, schema Service/FAQPage, CTA y teléfono.
- `src/components/landing/HomeCamerasBlock.jsx`: ya enlaza a `/camaras-barcelona` con anchor descriptivo.
- `public/__prerendered__/camaras-barcelona.html`: contiene title, H1, description y canonical correctos; no se ha comprobado HTTP público.
- `vercel.json`: rewrites prerender y redirección www configurados; comprobar respuesta HTTP real.
- `public/robots.txt` y `public/sitemap.xml`: permiten e incluyen la landing.

## Orden de trabajo sin cambios de riesgo

1. Confirmar en HTTP público (sin JS) código 200, title, H1, canonical, meta robots y que www responde 308/301 al host canónico.
2. Usar Inspección de URL de GSC para `/camaras-barcelona`: estado de indexación, canonical elegido por Google, fecha de último rastreo, si Google ve HTML correcto.
3. Comparar consultas por página y fecha, especialmente caída de la portada, antes de cambiar title/description.
4. Evaluar enlaces internos contextuales adicionales **solo si** aportan navegación real (el enlace de la home ya existe).
5. Regenerar snapshots con `npm run prerender` cuando cambie texto SEO; verificar que no quedan obsoletos.
6. Ejecutar `npm test`, `npm run build` y pruebas de smoke de las 4 landings en preview; fusionar solo tras validar.
7. Medir 7 y 28 días completos contra ventanas comparables. No atribuir cambios de ranking a commits sin evidencia.

No alterar precios, teléfonos, direcciones, Google Maps ni diseño sin validación. No se han medido conversiones reales de leads.
