import React from "react";
import RelatedLinksSection from "./RelatedLinksSection";

/**
 * Enlaces relacionados de las landings de municipio y distrito.
 *
 * Las diez páginas locales (Sant Cugat, El Prat, Castelldefels, Viladecans,
 * Badalona, Hospitalet, Terrassa, Mataró, Cornellà y Eixample) no tenían
 * ningún enlace contextual: ni entrante ni saliente. Eran callejones sin
 * salida colgando del sitemap.
 *
 * Aquí NO se añade contenido: solo enlaces a páginas que ya existen. Las
 * guías de cada municipio se eligen a partir de lo que la propia página ya
 * dice —Castelldefels habla de segundas residencias, El Prat de naves y
 * comercios junto al aeropuerto, Sant Cugat de chalets y domótica—, no de
 * suposiciones sobre el municipio. Donde la página no da pie a nada concreto
 * se usan las guías generales, que le sirven a cualquiera.
 */

const GENERAL_GUIDES = [
  { to: "/BlogArticle/consejos-elegir-alarma-perfecta", label: "Cómo elegir la alarma adecuada" },
  { to: "/BlogArticle/alarmas-sin-cuota-mensual", label: "Alarmas sin cuota mensual" },
  { to: "/BlogArticle/cuanto-tarda-instalar-alarma", label: "Cuánto tarda la instalación" },
];

/** Guías por página, justificadas por el texto que ya tiene cada una. */
const GUIDES = {
  SantCugat: [
    { to: "/BlogArticle/alarmas-chalets", label: "Alarmas para chalets y casas unifamiliares" },
    { to: "/BlogArticle/domotica-seguridad-smart-home", label: "Domótica y seguridad en casas conectadas" },
    { to: "/BlogArticle/alarmas-app-movil", label: "Controlar la alarma desde el móvil" },
  ],
  ElPrat: [
    { to: "/BlogArticle/alarma-local-comercial", label: "Alarmas para locales comerciales" },
    { to: "/BlogArticle/proteger-negocio-robos-barcelona", label: "Proteger un negocio frente a robos" },
    { to: "/BlogArticle/control-accesos-biometrico-empresas", label: "Control de accesos en empresas" },
  ],
  Castelldefels: [
    { to: "/BlogArticle/alarmas-chalets", label: "Alarmas para chalets y viviendas aisladas" },
    { to: "/BlogArticle/alarmas-app-movil", label: "Vigilar la casa a distancia desde el móvil" },
    { to: "/BlogArticle/sensores-movimiento-alarma", label: "Cómo funcionan los sensores de movimiento" },
  ],
  Viladecans: [
    { to: "/BlogArticle/elegir-alarma-hogar-barcelona", label: "Elegir alarma para el hogar" },
    { to: "/BlogArticle/alarma-local-comercial", label: "Alarmas para comercios" },
    { to: "/BlogArticle/camaras-ip-barcelona-2026", label: "Qué mirar en una cámara IP" },
  ],
  BarrioEixample: [
    { to: "/BlogArticle/alarmas-pisos-barcelona", label: "Alarmas para pisos" },
    { to: "/BlogArticle/alarmas-comunidades-vecinos", label: "Alarmas en comunidades de vecinos" },
    { to: "/BlogArticle/zonas-riesgo-robo-barcelona-2026", label: "Zonas con más robos en Barcelona" },
  ],
};

export default function LocalLandingLinks({ city, page }) {
  const groups = [
    {
      title: "Servicios",
      links: [
        { to: "/alarmas-barcelona", label: "Alarmas Ajax en la provincia de Barcelona" },
        { to: "/camaras-barcelona", label: "Cámaras de videovigilancia" },
        { to: "/control-accesos", label: "Control de accesos" },
        { to: "/Servicios", label: "Todos los servicios" },
      ],
    },
    {
      title: "Precios y soporte",
      links: [
        { to: "/Promociones", label: "Kits de alarma y precios" },
        { to: "/Calculadora", label: "Calcular tu presupuesto" },
        { to: "/MantenimientoSoporte", label: "Mantenimiento y soporte" },
      ],
    },
    {
      title: "Guías",
      links: GUIDES[page] || GENERAL_GUIDES,
    },
  ];

  return <RelatedLinksSection heading={`Seguridad en ${city}: información relacionada`} groups={groups} />;
}
