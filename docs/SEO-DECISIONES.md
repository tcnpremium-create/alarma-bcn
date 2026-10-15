# Decisiones SEO y datos de referencia

Léelo antes de cambiar títulos, descripciones o la estructura de URLs.

## Regla: el título de la home no se toca sin datos

Entre el 21/08 y el 15/10 el `<title>` de la home se cambió **8 veces**. Cada cambio obliga a
Google a reevaluar la página y a recalcular cómo la muestra. Mientras se mide el efecto de
un título, no se cambia otro.

| Fecha | Título de la home |
|---|---|
| hasta 21/08 | Alarmas en Barcelona \| Instalación AJAX \| Premium Tech Security |
| 21/08 | Cámaras de Seguridad y Alarmas en Barcelona \| Premium Tech Security |
| 04/10 11:09 | Instalación de Cámaras de Seguridad y Alarmas en Barcelona \| Premium Tech |
| 04/10 20:28 | Cámaras de Seguridad y Alarmas en Barcelona \| Premium Tech |
| 08/10 | Alarmas en Barcelona sin Cuotas \| Ajax y Cámaras |
| 12/10 (mañana) | Instalación de Cámaras de Seguridad Barcelona \| Premium Tech |
| 12/10 (tarde) | Instaladores de Alarmas y Cámaras en Barcelona \| Premium Tech |

**Norma:** como máximo un cambio de título de la home cada 6–8 semanas, y solo con datos de
Search Console que lo justifiquen (consulta, posición, CTR). Anota aquí cada cambio.

## Datos de referencia (a 15/10/2026)

Solicitudes reales del formulario (sin pruebas propias ni spam), desde el 29/06:

| Periodo | Semanas | Reales | Por semana |
|---|---|---|---|
| 20/07 – 16/08 | 4 | 10 | 2,5 |
| 17/08 – 27/09 | 6 | 9 | 1,5 |
| 28/09 – 14/10 | 2,5 | 1 (dudosa) | ≈ 0 |

Search Console, 14/09–11/10 frente a las 4 semanas anteriores: impresiones 25.000 → 11.711
(−53 %), clics 117 → 87 (−26 %), posición media 19,2 → 13,9.

El tráfico de Google llega sobre todo a páginas informativas (home, MapaRiesgo, comparativa
Ajax vs Hikvision), no a las comerciales. Por eso los botones de presupuesto de esas páginas
abren el formulario en el mismo sitio (`openDrawer`) en vez de enviar a `/#contacto`.

## Cómo medir

- Las solicitudes llevan `source_page` (página de origen) desde el 11/10.
- Los eventos `form_open`, `form_start`, `form_submit`, `form_success`, `form_error`,
  `click_phone` y `click_whatsapp` se envían a GA4 solo con consentimiento y sin datos personales.
- Pendiente: acceso a GA4 y a Search Console por fecha para fechar la caída de impresiones.
