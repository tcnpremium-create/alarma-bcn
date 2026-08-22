/**
 * alarmKits.js — única fuente de verdad para los kits de alarma Ajax.
 *
 * Antes existían 3 copias independientes de estos mismos datos
 * (HomeAlarmsBlock, AlarmKitsGrid, Promociones) que habían empezado a
 * divergir entre sí. Este archivo centraliza esos datos: los tres
 * componentes (y CityLandingSEO para el JSON-LD) importan este mismo
 * array, así que un cambio de precio o característica futuro solo se
 * hace una vez.
 *
 * CORRECCIÓN DEFINITIVA DE CONFIGURACIÓN (ver informe entregado —
 * "CORRECCIÓN DEFINITIVA — CONFIGURACIÓN REAL DE LOS KITS DE ALARMA").
 * Esta revisión sustituye una configuración anterior que el cliente
 * indicó como incorrecta. Configuración final, sin interpretación:
 *
 * - Alarma Hogar: 399€, precio cerrado. Configuración sin tocar.
 * - Alarma Vivienda / Negocio: DESDE 699€. Configuración BASE = 2
 *   detectores normales + instalación + configuración y puesta en
 *   marcha. NO lleva MotionCam. NO lleva detectores adicionales.
 * - Alarma Profesional / Empresa: DESDE 1.399€. Configuración BASE = 2
 *   MotionCam + 2 detectores normales + instalación + configuración y
 *   puesta en marcha. NO son 4 MotionCam. NO son 4 detectores.
 *
 * Los kits "Vivienda/Negocio" y "Profesional/Empresa" son
 * configuraciones base ampliables — de ahí el precio "Desde" y el
 * texto de ampliación (`expandNote`). No se muestra ningún precio
 * tachado ni un precio anterior inventado: son precios "Desde" porque
 * la configuración es realmente variable, no una promoción con
 * descuento ficticio.
 *
 * Nombres comerciales: "Alarma Hogar" / "Alarma Vivienda / Negocio" /
 * "Alarma Profesional / Empresa" — sin nombres ambiguos tipo "Kit Gran
 * Instalación", "Kit Comunidad" o "Kit Industrial" que no corresponden
 * a la configuración real.
 *
 * Campos:
 * - id: identificador estable del kit (uso interno, no se muestra)
 * - badge: etiqueta comercial destacada sobre la tarjeta
 * - title: nombre comercial
 * - subtitle: para Vivienda/Negocio y Profesional/Empresa, resumen
 *   corto de la configuración base ("2 detectores", "2 MotionCam + 2
 *   detectores") — para Hogar, descripción de marketing (no se ha
 *   pedido cambiarla, kit sin tocar). Se muestra junto al título.
 * - price: importe numérico como string (con separador de miles "."),
 *   SIN el símbolo "€" — cada componente construye el texto visible
 *   ("Desde 1.399 € + IVA") a partir de este número, sin duplicar
 *   precios en JSON-LD ni en otros componentes (ver
 *   CityLandingSEO.jsx, que calcula lowPrice/highPrice desde este
 *   array en vez de tener el precio hardcodeado).
 * - isFrom: true si se debe mostrar como "Desde X €" (configuración
 *   base ampliable); false/ausente si es un precio cerrado.
 * - highlight: true si esta es la tarjeta que debe recibir el mayor
 *   peso visual (protagonista) — mismo criterio que cameraKits.js.
 * - ivaNote: si se debe mostrar el aviso "+ IVA"
 * - items: equipos y servicios incluidos en la configuración BASE del
 *   kit — no se añade ningún dispositivo que no esté explícitamente
 *   confirmado.
 * - expandNote: array de 1-2 frases sobre ampliación de la
 *   configuración base — solo para los kits "Desde" (Vivienda/Negocio
 *   y Profesional/Empresa). No es una lista de dispositivos concretos
 *   de ampliación, es una nota comercial genérica.
 * - tech: resumen técnico de una línea (Grado, antiinhibición, batería, etc.)
 */
export const ALARM_KITS = [
  {
    id: "hogar",
    badge: "MÁS POPULAR",
    title: "Alarma Hogar",
    subtitle: "Protección completa para viviendas",
    price: "399",
    isFrom: false,
    highlight: false,
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
    title: "Alarma Vivienda / Negocio",
    subtitle: "2 detectores",
    price: "699",
    isFrom: true,
    highlight: true,
    ivaNote: true,
    items: [
      "2 detectores de movimiento normales",
      "Instalación profesional",
      "Configuración y puesta en marcha",
    ],
    expandNote: [
      "Configuración ampliable según las necesidades de tu instalación.",
      "Podemos ampliar el sistema con dispositivos adicionales según las necesidades del espacio.",
    ],
    tech: "Grado 2 · Antiinhibición · Verificación en 15s · Comunicación cifrada",
  },
  {
    id: "empresa",
    badge: "PARA EMPRESAS",
    title: "Alarma Profesional / Empresa",
    subtitle: "2 MotionCam + 2 detectores",
    price: "1.399",
    isFrom: true,
    highlight: false,
    ivaNote: true,
    items: [
      "2 detectores MotionCam (verificación por imagen)",
      "2 detectores de movimiento normales",
      "Instalación profesional",
      "Configuración y puesta en marcha",
    ],
    expandNote: [
      "Configuración ampliable según las necesidades de tu instalación.",
      "Podemos ampliar el sistema con dispositivos adicionales según las necesidades del espacio.",
    ],
    tech: "Grado 2 · Verificación fotográfica en Central Receptora",
  },
];
