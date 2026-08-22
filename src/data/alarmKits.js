/**
 * alarmKits.js — única fuente de verdad para los kits de alarma Ajax.
 *
 * Antes existían 3 copias independientes de estos mismos datos
 * (HomeAlarmsBlock, AlarmKitsGrid, Promociones) que habían empezado a
 * divergir entre sí (nombres de kit distintos, una línea de producto
 * distinta en el kit "gran instalación"). Este archivo centraliza esos
 * datos: los tres componentes importan este mismo array, así que un
 * cambio de precio o de característica futuro solo se hace una vez.
 *
 * Ningún precio ni característica del resto de kits se ha inventado ni
 * modificado al centralizar: donde las 3 copias coincidían se mantiene
 * tal cual; donde diferían (nombre "Kit Alarma X" vs "Plan Protección X",
 * y la línea de sirenas del kit de gran instalación) se ha adoptado la
 * versión que ya aparecía en 2 de los 3 sitios.
 *
 * Revisión de precios: se añade el kit "empresa" (nuevo, no existía antes
 * como tarjeta propia) — ver informe de revisión comercial entregado.
 * Los kits Hogar, Negocio y Gran Instalación NO se han tocado.
 *
 * IMPORTANTE sobre el kit "empresa": el coste estimado en el informe se
 * basa en precios públicos de referencia (Ajax MotionCam, KeyPad,
 * StreetSiren), NO en costes reales de proveedor de Premium Tech
 * Security — no disponemos de esa cifra. El margen mostrado en el
 * informe es, por tanto, PROVISIONAL y debe validarse con el coste real
 * de compra de los 4 MotionCam antes de darlo por definitivo.
 *
 * Campos:
 * - id: identificador estable del kit
 * - badge: etiqueta destacada sobre la tarjeta
 * - title / subtitle: nombre comercial y descripción corta
 * - price: importe numérico como string (con separador de miles "."),
 *   SIN el símbolo "€" — cada componente construye el texto visible a
 *   partir de este número (mismo criterio que cameraKits.js).
 * - isFrom: true si se debe mostrar como "Desde X €" (precio variable
 *   según configuración); false/ausente si es un precio cerrado.
 * - ivaNote: si se debe mostrar el aviso "* IVA no incluido"
 * - items: equipos y servicios incluidos en el kit
 * - tech: resumen técnico de una línea (Grado, antiinhibición, batería, etc.)
 */
export const ALARM_KITS = [
  {
    id: "hogar",
    badge: "MÁS POPULAR",
    title: "Kit Alarma Hogar",
    subtitle: "Protección completa para viviendas",
    price: "399",
    isFrom: false,
    ivaNote: true,
    items: [
      "Hub Ajax (central de control)",
      "1 detector de movimiento (sin cámara)",
      "1 detector magnético para puerta principal",
      "1 mando a distancia",
      "Sirena interior HomeSiren",
      "App Ajax gratuita · iOS y Android",
      "Instalación certificada incluida",
      "Sin cuotas mensuales · Grado 2",
    ],
    tech: "Grado 2 · Antiinhibición 3G/4G · Batería de respaldo 38h",
  },
  {
    id: "negocio",
    badge: "RECOMENDADO",
    title: "Kit Alarma Negocio",
    subtitle: "Seguridad profesional para locales y oficinas",
    price: "699",
    isFrom: false,
    ivaNote: true,
    items: [
      "Hub Ajax (central de control)",
      "2 detectores de movimiento sin cámara",
      "2 detectores magnéticos (puertas/ventanas)",
      "Sirena interior HomeSiren",
      "Central Receptora activa 24/7",
      "Instalación certificada incluida",
      "Grado 2 · Conexión cifrada",
    ],
    tech: "Grado 2 · Antiinhibición · Verificación en 15s · Comunicación cifrada",
  },
  {
    id: "empresa",
    badge: "PARA EMPRESAS",
    title: "Alarma para Empresas y Locales",
    subtitle: "Solución profesional con verificación por imagen",
    price: "1.099",
    isFrom: true,
    ivaNote: true,
    items: [
      "Central Ajax profesional",
      "Teclado de control de acceso",
      "Sirena",
      "4 detectores MotionCam (verificación por imagen)",
      "Instalación y configuración",
      "Puesta en marcha",
    ],
    tech: "Grado 2 · Verificación fotográfica en Central Receptora",
  },
  {
    id: "comunidad",
    badge: "GRAN INSTALACIÓN",
    title: "Kit Alarma Gran Instalación",
    subtitle: "Para viviendas grandes, comunidades y naves industriales",
    price: "1.300",
    isFrom: false,
    ivaNote: true,
    items: [
      "Hub+ Ajax (hasta 200 dispositivos)",
      "4 detectores de movimiento MotionCam",
      "2 detectores magnéticos perimetrales",
      "1 teclado KeyPad en zona de acceso",
      "Sirena exterior de alta potencia",
      "Sirenas interiores incluidas",
      "Protocolo de aviso a la Policía activado desde la CRA",
      "Instalación y configuración completa incluida",
    ],
    tech: "Grado 2 · Canal de backup GSM + Ethernet · Batería 80h",
  },
];
