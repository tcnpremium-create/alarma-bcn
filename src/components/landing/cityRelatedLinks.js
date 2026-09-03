/**
 * Enlaces internos relacionados de cada landing de ciudad.
 *
 * La cadena que se quiere construir es HOME -> servicio principal -> landing
 * de ciudad -> artículo relacionado -> conversión. La home ya enlaza a las 10
 * landings de ciudad; lo que faltaba era la continuación: desde la landing no
 * se podía llegar a nada.
 *
 * Reglas que se han seguido al elegir cada enlace:
 *
 *   - Solo destinos que existen de verdad (las 71 rutas prerenderizadas).
 *   - "Zonas cercanas" solo donde la cercanía es real: las landings de
 *     municipio son todas de la provincia de Barcelona, así que cuelgan de
 *     /alarmas-barcelona; Sabadell enlaza con Terrassa y Sant Cugat, que son
 *     sus vecinas del Vallès. Girona, Tarragona y Lleida no tienen landings
 *     de municipio, así que no se les inventa ninguna.
 *   - Las guías de Barcelona ("precio en Barcelona", "zonas de riesgo") se
 *     enlazan solo desde la página de Barcelona. Para el resto de ciudades se
 *     usan guías sin ciudad, que le sirven igual a alguien de Lleida.
 *   - El texto del enlace describe el destino y cambia según la página; no se
 *     repite el mismo anchor comercial en todas partes.
 */

const NEUTRAL_GUIDES = [
  { to: "/BlogArticle/consejos-elegir-alarma-perfecta", label: "Cómo elegir la alarma adecuada" },
  { to: "/BlogArticle/alarmas-sin-cuota-mensual", label: "Alarmas sin cuota mensual: cómo funcionan" },
  { to: "/BlogArticle/cuanto-tarda-instalar-alarma", label: "Cuánto tarda una instalación" },
];

const BARCELONA_GUIDES = [
  { to: "/BlogArticle/precio-instalar-alarma-barcelona", label: "Qué cuesta instalar una alarma en Barcelona" },
  { to: "/BlogArticle/elegir-alarma-hogar-barcelona", label: "Elegir alarma para el hogar en Barcelona" },
  { to: "/BlogArticle/zonas-riesgo-robo-barcelona-2026", label: "Zonas con más robos en Barcelona" },
  { to: "/GuiaSeguridadBarcelona", label: "Guía de seguridad de Barcelona" },
];

const CAMERA_GUIDES = [
  { to: "/BlogArticle/camaras-ip-barcelona-2026", label: "Cámaras IP: qué mirar antes de comprar" },
  { to: "/BlogArticle/normativa-videovigilancia-rgpd-catalunya", label: "Normativa de videovigilancia y RGPD" },
  { to: "/BlogArticle/videovigilancia-empresas-barcelona", label: "Videovigilancia para empresas" },
];

/** Landings de municipio y distrito, todas de la provincia de Barcelona. */
const PROVINCIA_BARCELONA = [
  { to: "/Hospitalet", label: "L'Hospitalet de Llobregat" },
  { to: "/Badalona", label: "Badalona" },
  { to: "/BarrioEixample", label: "Eixample (Barcelona)" },
  { to: "/Cornella", label: "Cornellà de Llobregat" },
  { to: "/ElPrat", label: "El Prat de Llobregat" },
  { to: "/SantCugat", label: "Sant Cugat del Vallès" },
  { to: "/Castelldefels", label: "Castelldefels" },
  { to: "/Viladecans", label: "Viladecans" },
  { to: "/Terrassa", label: "Terrassa" },
  { to: "/Mataro", label: "Mataró" },
];

const NEARBY = {
  barcelona: PROVINCIA_BARCELONA,
  sabadell: [
    { to: "/Terrassa", label: "Terrassa" },
    { to: "/SantCugat", label: "Sant Cugat del Vallès" },
    { to: "/alarmas-barcelona", label: "Barcelona ciudad" },
  ],
  girona: [],
  tarragona: [],
  lleida: [],
};

/** Slug de ciudad a partir de la ruta ("/alarmas-girona" -> "girona"). */
export function citySlugFromPath(path) {
  return (path || "").replace(/^\/(?:alarmas|camaras)-/, "");
}

/** Grupos de enlaces para una landing de alarmas. */
export function alarmCityGroups(city, seoPath) {
  const slug = citySlugFromPath(seoPath);
  return [
    {
      title: `Otros servicios en ${city}`,
      links: [
        { to: `/camaras-${slug}`, label: `Cámaras de seguridad en ${city}` },
        { to: "/control-accesos", label: "Control de accesos y biometría" },
        { to: "/videoporteros", label: "Videoporteros y porteros automáticos" },
        { to: "/cerraduras", label: "Cerraduras inteligentes" },
      ],
    },
    {
      title: "Precios y soporte",
      links: [
        { to: "/Promociones", label: "Kits de alarma y precios" },
        { to: "/Calculadora", label: "Calcular tu presupuesto" },
        { to: "/MantenimientoSoporte", label: "Mantenimiento y soporte técnico" },
      ],
    },
    {
      title: "Guías de seguridad",
      links: slug === "barcelona" ? BARCELONA_GUIDES : NEUTRAL_GUIDES,
    },
  ];
}

/**
 * Zonas cercanas con landing propia. Va en un bloque aparte porque en
 * Barcelona son diez y no caben en una columna junto a servicios y guías.
 */
export function alarmCityNearby(seoPath) {
  return NEARBY[citySlugFromPath(seoPath)] || [];
}

/** Grupos de enlaces para una landing de cámaras. */
export function cameraCityGroups(city, seoPath) {
  const slug = citySlugFromPath(seoPath);
  return [
    {
      title: `Otros servicios en ${city}`,
      links: [
        { to: `/alarmas-${slug}`, label: `Alarmas y sistemas antiintrusión en ${city}` },
        { to: "/videoporteros", label: "Videoporteros con cámara" },
        { to: "/control-accesos", label: "Control de accesos y biometría" },
        { to: "/redes-informaticas", label: "Redes y cableado para videovigilancia" },
      ],
    },
    {
      title: "Precios y soporte",
      links: [
        { to: "/Promociones", label: "Kits y precios de instalación" },
        { to: "/MantenimientoSoporte", label: "Mantenimiento y soporte técnico" },
      ],
    },
    {
      title: "Antes de instalar",
      links: CAMERA_GUIDES,
    },
  ];
}

export { PROVINCIA_BARCELONA, NEUTRAL_GUIDES, BARCELONA_GUIDES, CAMERA_GUIDES };
