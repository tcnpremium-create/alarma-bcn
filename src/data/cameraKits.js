/**
 * cameraKits.js — única fuente de verdad para los kits de videovigilancia.
 *
 * Antes existían 3 copias independientes de estos mismos datos
 * (HomeCamerasBlock, CameraKitsGrid, Promociones) que podían divergir
 * entre sí con el tiempo, igual que pasó antes con los kits de alarma
 * (ver alarmKits.js). Este archivo centraliza esos datos: todos los
 * componentes importan este mismo array, así que un cambio de precio o
 * de características futuro solo se hace una vez.
 *
 * Nombres: donde las 3 copias diferían ("Kit Básico/Profesional/Empresarial"
 * vs "Plan Visión Hogar/Negocio 360°/Corporativa Total"), se adopta la
 * versión que ya aparecía en 2 de los 3 sitios (Kit Básico/Profesional/
 * Empresarial), mismo criterio usado al centralizar alarmKits.js.
 *
 * Revisión de precios (ver informe entregado): el Kit Profesional y el
 * Kit Empresarial pasan a mostrarse como precio "Desde" en vez de precio
 * cerrado, y su configuración base pasa de serie a 1TB de almacenamiento
 * (antes 2TB / 4TB respectivamente) — el usuario que necesite más
 * capacidad puede solicitar ampliación en el presupuesto. El Kit Básico
 * no se ha tocado (fuera del alcance de esta revisión de precios).
 *
 * Campos:
 * - id: identificador estable del kit
 * - badge: etiqueta destacada sobre la tarjeta
 * - title: nombre comercial
 * - cameras: nº de cámaras, para mostrar en la tarjeta
 * - price: importe numérico como string (con separador de miles "."),
 *   SIN el símbolo "€" ni el prefijo "Desde" — cada componente construye
 *   el texto visible ("Desde 989 € + IVA") a partir de este número, para
 *   no tener que hacer parsing de strings tipo "Desde 989 €" en el
 *   schema.org (ver Promociones.jsx).
 * - isFrom: true si el precio se debe mostrar como "Desde X €" (precio
 *   variable según configuración); false/ausente si es un precio cerrado.
 * - items: equipos y servicios incluidos en el kit
 * - storageNote: si el kit tiene almacenamiento configurable, texto breve
 *   para comunicarlo sin inventar precios de ampliación que no existen.
 * - ideal: para qué tipo de cliente es este kit
 */
export const CAMERA_KITS = [
  {
    id: "basico",
    badge: null,
    title: "Kit Básico",
    cameras: "2 Cámaras",
    price: "699",
    isFrom: false,
    items: [
      "2 cámaras de alta definición 2K",
      "Grabador NVR profesional con disco local",
      "Instalación certificada incluida",
      "Certificado de seguridad homologado",
      "Placas disuasorias para exterior incluidas",
      "Sin cuotas mensuales",
    ],
    ideal: "Viviendas y pequeños comercios",
  },
  {
    id: "profesional",
    badge: "MÁS VENDIDO",
    title: "Kit Profesional",
    cameras: "4 Cámaras",
    price: "989",
    isFrom: true,
    items: [
      "4 cámaras profesionales 4MP",
      "Grabador NVR profesional",
      "Disco duro 1TB incluido",
      "Detección inteligente por Inteligencia Artificial",
      "Visión nocturna optimizada",
      "Instalación y configuración certificada incluida",
    ],
    storageNote: "Ampliación de almacenamiento disponible según necesidad.",
    ideal: "Casas, negocios y comunidades medianas",
  },
  {
    id: "empresarial",
    badge: "MÁXIMA COBERTURA",
    title: "Kit Empresarial",
    cameras: "8 Cámaras",
    price: "1.699",
    isFrom: true,
    items: [
      "8 cámaras profesionales 4K Ultra HD",
      "Grabador NVR profesional 8 canales",
      "Disco duro 1TB incluido",
      "Detección por IA avanzada de personas y vehículos",
      "Visión nocturna de largo alcance",
      "Instalación completa incluida",
    ],
    storageNote: "Ampliación de almacenamiento disponible según necesidad.",
    ideal: "Empresas, polígonos, comunidades grandes y fincas",
  },
];

/** Aviso de precio orientativo — mostrar junto a cualquier precio "Desde". */
export const PRICE_DISCLAIMER =
  "Precio orientativo. El presupuesto final depende de la configuración y características de la instalación.";
