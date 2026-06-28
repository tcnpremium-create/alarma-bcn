import React from "react";
import { Helmet } from "react-helmet-async";

const SEO_DATA = {
  "/": {
    title: "Instalación Alarmas y Cámaras de Seguridad Barcelona | Premium Tech Security",
    description: "Instaladores certificados de alarmas AJAX, cámaras Hikvision 4K y control de acceso en Barcelona y toda Catalunya. Presupuesto gratis en 24h. ☎ 638 109 947",
    keywords: "instalacion alarmas Barcelona, camaras seguridad Barcelona, instaladores seguridad Barcelona, sistemas alarma Barcelona, videovigilancia Barcelona, control acceso Barcelona",
    canonical: "https://alarmasenbarcelona.com"
  },
  "/alarmas-barcelona": {
    title: "Alarmas y Cámaras Seguridad Barcelona | Instalación Profesional | Premium Tech",
    description: "Alarmas de seguridad en Barcelona sin cuotas. Ajax, Hikvision. Respuesta en 15 segundos. Instalación certificada. Presupuesto gratis. Tel: 638 10 99 47",
    keywords: "alarmas Barcelona, cámaras seguridad Barcelona, instalación alarmas Barcelona, empresa seguridad Barcelona, AJAX Barcelona, Hikvision Barcelona",
    canonical: "https://alarmasenbarcelona.com/alarmas-barcelona"
  },
  "/alarmas-girona": {
    title: "Instalación Alarmas y Cámaras Seguridad Girona | Premium Tech Security",
    description: "Alarmas de seguridad en Girona. Sin cuotas mensuales. Respuesta CRA en 15 segundos. Instalación profesional certificada. Tel: 638 10 99 47",
    keywords: "alarmas Girona, cámaras seguridad Girona, instalación alarmas Girona, videovigilancia Girona, seguridad Costa Brava",
    canonical: "https://alarmasenbarcelona.com/alarmas-girona"
  },
  "/alarmas-tarragona": {
    title: "Alarmas y Videovigilancia Tarragona | Instalación Profesional | Premium Tech",
    description: "Instalación alarmas seguridad Tarragona. Ajax Systems. Sin cuotas. Central Receptora 24/7. Presupuesto gratis sin compromiso. Tel: 638 10 99 47",
    keywords: "alarmas Tarragona, cámaras seguridad Tarragona, instalación alarmas Tarragona, videovigilancia Tarragona, seguridad Tarragona",
    canonical: "https://alarmasenbarcelona.com/alarmas-tarragona"
  },
  "/alarmas-lleida": {
    title: "Sistemas de Seguridad Lleida | Alarmas y Cámaras | Premium Tech Security",
    description: "Alarmas de seguridad en Lleida sin cuotas mensuales. Ajax Hub. Respuesta en 15 segundos. Instalación incluida. Presupuesto gratis. Tel: 638 10 99 47",
    keywords: "alarmas Lleida, cámaras seguridad Lleida, instalación alarmas Lleida, videovigilancia Lleida, seguridad Lleida",
    canonical: "https://alarmasenbarcelona.com/alarmas-lleida"
  },
  "/alarmas-sabadell": {
    title: "Alarmas y Cámaras Seguridad Sabadell | Premium Tech Security",
    description: "Sistemas de alarma en Sabadell. Ajax Hub. Sin permanencia ni cuotas. Central Receptora 24/7. Instalación incluida. Tel: 638 10 99 47",
    keywords: "alarmas Sabadell, cámaras seguridad Sabadell, instalación alarmas Sabadell, videovigilancia Sabadell, seguridad Vallès Occidental",
    canonical: "https://alarmasenbarcelona.com/alarmas-sabadell"
  }
};

export default function CityLandingSEO({ path }) {
  const seo = SEO_DATA[path];
  if (!seo) return null;

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_ES" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
    </Helmet>
  );
}

export { SEO_DATA };