import React from "react";
import { Helmet } from "react-helmet-async";

const SEO_DATA = {
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${seo.canonical}#business`,
    "name": "Premium Tech Security",
    "description": seo.description,
    "url": seo.canonical,
    "telephone": "+34638109947",
    "email": "tcnpremium@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carrer de Coll i Vehí, 141",
      "addressLocality": "Barcelona",
      "addressRegion": "Catalunya",
      "postalCode": "08026",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.3874",
      "longitude": "2.1686"
    },
    "openingHours": "Mo-Sa 08:00-20:00",
    "priceRange": "€€",
    "hasMap": "https://maps.google.com/maps?cid=5715602764533889179",
    "sameAs": [
      "https://www.instagram.com/premiumtechsecurity",
      "https://www.facebook.com/p/Alarmas-en-barcelona-premium-100086091741859/"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "19",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

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
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}

export { SEO_DATA };