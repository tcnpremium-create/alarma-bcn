import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://alarmasenbarcelona.com";
const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/c939af4e3_logonegro.png";
const OG_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/0a79ea220_UNETEALIMPERIO1.png";

export default function AdvancedSEO({ 
  title = "Alarmas Barcelona | Instalación Sistemas Seguridad Catalunya",
  description = "Empresa líder en instalación de alarmas en Barcelona y Catalunya. Sistemas AJAX, cámaras 4K Hikvision, respuesta 24/7. Presupuesto gratis. Llama al 638 10 99 47.",
  keywords = "alarmas Barcelona, sistemas seguridad Barcelona, alarmas hogar, alarmas negocios, AJAX alarmas, cámaras seguridad, instalación alarmas Catalunya, videovigilancia Barcelona",
  ogImage = OG_IMAGE,
  canonicalUrl,
  type = "website"
}) {
  const canonical = canonicalUrl || SITE_URL;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#business`,
        "name": "Premium Tech Security",
        "alternateName": "Alarmas Barcelona - Premium Tech Security",
        "description": "Empresa especializada en la instalación profesional de alarmas, cámaras de seguridad, videoporteros y control de accesos en Barcelona y toda Catalunya. Más de 15 años de experiencia. 2500+ sistemas activos. Técnicos certificados AJAX e Hikvision.",
        "image": ogImage,
        "logo": LOGO_URL,
        "url": SITE_URL,
        "telephone": "+34638109947",
        "email": "tcnpremium@gmail.com",
        "priceRange": "€€",
        "currenciesAccepted": "EUR",
        "paymentAccepted": "Efectivo, Tarjeta, Transferencia",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Coll i Vehi, 141",
          "addressLocality": "Barcelona",
          "addressRegion": "Catalunya",
          "postalCode": "08001",
          "addressCountry": "ES"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 41.3851,
          "longitude": 2.1734
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "19:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "10:00",
            "closes": "14:00"
          }
        ],
        "areaServed": [
          { "@type": "City", "name": "Barcelona" },
          { "@type": "City", "name": "Badalona" },
          { "@type": "City", "name": "Hospitalet de Llobregat" },
          { "@type": "City", "name": "Sabadell" },
          { "@type": "City", "name": "Terrassa" },
          { "@type": "City", "name": "Mataró" },
          { "@type": "City", "name": "Sant Cugat del Vallès" },
          { "@type": "City", "name": "Cornellà de Llobregat" },
          { "@type": "AdministrativeArea", "name": "Catalunya" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "13",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "María G." },
            "reviewRating": { "@type": "Rating", "ratingValue": "5" },
            "reviewBody": "Después de instalar AJAX en nuestra vivienda en Gràcia, dormimos mucho más tranquilos. La app es súper intuitiva y recibimos las alertas al instante."
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Josep T." },
            "reviewRating": { "@type": "Rating", "ratingValue": "5" },
            "reviewBody": "Instalé 8 cámaras Hikvision en mi negocio y la calidad de imagen es impresionante, incluso de noche. Puedo ver todo desde el móvil en tiempo real."
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Servicios de Seguridad",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Instalación de Alarmas AJAX",
                "description": "Sistemas de alarma inalámbricos AJAX con certificación Grado 2, detectores inmunes a mascotas y conexión a CRA 24/7"
              },
              "priceSpecification": { "@type": "PriceSpecification", "price": "400", "priceCurrency": "EUR", "description": "Desde 400€ con instalación incluida" }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Videovigilancia Hikvision 4K",
                "description": "Cámaras IP Full HD y 4K con visión nocturna ColorVu, IA y acceso remoto"
              },
              "priceSpecification": { "@type": "PriceSpecification", "price": "680", "priceCurrency": "EUR", "description": "Desde 680€ kit 2 cámaras con instalación" }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Control de Accesos Biométrico",
                "description": "Sistemas RFID, huella dactilar y reconocimiento facial para empresas y comunidades"
              },
              "priceSpecification": { "@type": "PriceSpecification", "price": "350", "priceCurrency": "EUR", "description": "Desde 350€" }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Videoporteros IP",
                "description": "Videoporteros con pantalla táctil 7 pulgadas, apertura remota desde smartphone"
              },
              "priceSpecification": { "@type": "PriceSpecification", "price": "450", "priceCurrency": "EUR", "description": "Desde 450€" }
            }
          ]
        },
        "knowsAbout": [
          "Alarmas para hogar",
          "Alarmas para negocios",
          "Cámaras de seguridad",
          "Videovigilancia IP",
          "Control de accesos",
          "Videoporteros",
          "Domótica",
          "AJAX Systems",
          "Hikvision",
          "Seguridad electrónica Barcelona"
        ],
        "sameAs": [
          "https://www.instagram.com/premiumtechsecurity",
          "https://www.facebook.com/premiumtechsecurity"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": "Alarmas Barcelona - Premium Tech Security",
        "description": "Portal de referencia en instalación de alarmas y sistemas de seguridad en Barcelona y Catalunya",
        "publisher": { "@id": `${SITE_URL}/#organization` },
        "inLanguage": "es-ES"
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "Premium Tech Security",
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": LOGO_URL,
          "width": 400,
          "height": 400
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+34638109947",
          "contactType": "customer service",
          "areaServed": "ES",
          "availableLanguage": ["Spanish", "Catalan"]
        },
        "sameAs": [
          "https://www.instagram.com/premiumtechsecurity",
          "https://www.facebook.com/premiumtechsecurity"
        ]
      }
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": SITE_URL
      }
    ]
  };

  return (
    <Helmet>
      <html lang="es" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Alarmas Barcelona - Premium Tech Security" />
      <meta property="og:locale" content="es_ES" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Mobile */}
      <meta name="theme-color" content="#E63946" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="ES-CT" />
      <meta name="geo.placename" content="Barcelona" />
      <meta name="geo.position" content="41.3851;2.1734" />
      <meta name="ICBM" content="41.3851, 2.1734" />
      
      {/* Robots */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
    </Helmet>
  );
}