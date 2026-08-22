/**
 * cameraKits.js — única fuente de verdad para los kits de videovigilancia.
 *
 * Antes existían 3 copias independientes de estos mismos datos
 * (HomeCamerasBlock, CameraKitsGrid, Promociones) que podían divergir
 * entre sí con el tiempo, igual que pasó antes con los kits de alarma
 * (ver alarmKits.js). Este archivo centraliza esos datos: todos los
 * componentes importan este mismo array, así que un cambio de precio o
 * de característica futuro solo se hace una vez.
 *
 * NOMBRES COMERCIALES (ver informe entregado): los 3 kits pasan de un
 * nombre genérico ("Kit 2/4/8 Cámaras", que repetía el número de
 * cámaras dos veces en pantalla junto al badge) a un nombre comercial
 * propio — Kit Esencial / Kit Protección / Kit Profesional — con el
 * número de cámaras como especificación secundaria en el campo
 * `cameras`, no en el título. Los `id` internos ("basico", "profesional",
 * "empresarial") se mantienen sin cambios para no romper referencias
 * existentes — son claves internas, no se muestran en ningún sitio.
 *
 * Jerarquía comercial: el Kit Esencial es la promoción de entrada, el
 * Kit Protección es el producto recomendado/protagonista, el Kit
 * Profesional es la opción de máxima cobertura para empresas.
 *
 * Especificaciones: no se ha inventado ni cambiado ninguna característica
 * técnica en esta revisión — solo título, badge y el nuevo campo
 * `description` (texto comercial corto, sustituye al antiguo `ideal`
 * en los 3 sitios donde se mostraba, sin duplicar información).
 *
 * Campos:
 * - id: identificador estable del kit (uso interno, no se muestra)
 * - badge: etiqueta comercial destacada sobre la tarjeta
 * - title: nombre comercial (nunca incluye el número de cámaras — ver
 *   `cameras` para eso, así no se repite el número dos veces)
 * - cameras: nº de cámaras, especificación secundaria visible junto al
 *   título
 * - description: frase comercial corta que resume para quién es el kit
 * - price: importe numérico como string (con separador de miles "."),
 *   SIN el símbolo "€" ni el prefijo "Desde" — cada componente construye
 *   el texto visible ("Desde 899 € + IVA") a partir de este número, para
 *   no tener que hacer parsing de strings tipo "Desde 899 €" en el
 *   schema.org (ver Promociones.jsx).
 * - isFrom: true si el precio se debe mostrar como "Desde X €" (precio
 *   variable según configuración); false/ausente si es un precio cerrado.
 * - highlight: true si esta es la tarjeta que debe recibir el mayor
 *   peso visual (protagonista) — evita depender de la posición del kit
 *   en el array para decidir qué tarjeta se destaca.
 * - ctaLabel: texto del botón principal de este kit.
 * - items: equipos y servicios incluidos en el kit
 * - storageNote: texto breve para comunicar condiciones de cableado o
 *   ampliación de almacenamiento sin inventar precios que no existen.
 */
export const CAMERA_KITS = [
  {
    id: "basico",
    badge: "PROMOCIÓN",
    title: "Kit Esencial",
    cameras: "2 cámaras",
    description: "La solución económica para empezar a proteger tu vivienda o pequeño negocio.",
    price: "689",
    isFrom: true,
    highlight: false,
    ctaLabel: "Quiero esta promoción",
    items: [
      "2 cámaras de seguridad 2 MP",
      "Grabador DVR/NVR según tecnología del sistema",
      "Disco duro incluido",
      "Instalación profesional incluida",
      "Hasta 10 metros de cableado por techo falso incluidos",
    ],
  },
  {
    id: "profesional",
    badge: "★ MÁS RECOMENDADO",
    title: "Kit Protección",
    cameras: "4 cámaras",
    description: "La opción más equilibrada para proteger tu vivienda o negocio.",
    price: "899",
    isFrom: true,
    highlight: true,
    ctaLabel: "Solicitar presupuesto",
    items: [
      "4 cámaras profesionales 4MP",
      "Grabador NVR profesional",
      "Disco duro 1TB incluido",
      "Detección inteligente por Inteligencia Artificial",
      "Visión nocturna optimizada",
      "Instalación y configuración certificada incluida",
    ],
    storageNote: "Cableado incluido según condiciones del kit. Ampliación de almacenamiento disponible según necesidad.",
  },
  {
    id: "empresarial",
    badge: "MÁXIMA COBERTURA",
    title: "Kit Profesional",
    cameras: "8 cámaras",
    description: "Para empresas, naves, comunidades y grandes superficies.",
    price: "1.499",
    isFrom: true,
    highlight: false,
    ctaLabel: "Solicitar presupuesto",
    items: [
      "8 cámaras profesionales 4K Ultra HD",
      "Grabador NVR profesional 8 canales",
      "Disco duro 1TB incluido",
      "Detección por IA avanzada de personas y vehículos",
      "Visión nocturna de largo alcance",
      "Instalación completa incluida",
    ],
    storageNote: "Cableado incluido según condiciones del kit. Ampliación de almacenamiento disponible según necesidad.",
  },
];

/** Aviso de precio orientativo — mostrar junto a cualquier precio "Desde". */
export const PRICE_DISCLAIMER =
  "Precio orientativo. El presupuesto final depende de la configuración y características de la instalación.";
