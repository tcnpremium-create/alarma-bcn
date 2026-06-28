import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * LocalitySEO - Full SEO component for locality-specific pages.
 * Generates LocalBusiness schema with address, hours, area served + all meta tags.
 */
export default function LocalitySEO({
  city,
  province = "Barcelona",
  title,
  description,
  keywords,
  canonicalUrl,
  lat,
  lng,
  pageUrl,
}) {
  const fullTitle = title || `Alarmas en ${city} | Instalación Sistemas Seguridad 24/7 | PremiumTechSecurity`;
  const fullDesc = description || `Instalación profesional de alarmas en ${city}. Sistemas de seguridad AJAX, cámaras 4K, control de accesos. Presupuesto gratuito ☎ 638 10 99 47.`;
  const fullKeywords = keywords || `alarmas ${city}, instalación alarmas ${city}, sistemas seguridad ${city}, cámaras seguridad ${city}, videovigilancia ${city}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Premium Tech Security - Alarmas ${city}`,
    "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/b61d56d39_UNETEALIMPERIO.png",
    "@id": pageUrl || `https://alarmasenbarcelona.com/${city.toLowerCase()}`,
    "url": pageUrl || `https://alarmasenbarcelona.com/${city.toLowerCase()}`,
    "telephone": "+34638109947",
    "email": "tcnpremium@gmail.com",
    "priceRange": "400€ - 3000€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Coll i Vehi, 141",
      "addressLocality": "Barcelona",
      "postalCode": "08001",
      "addressRegion": province,
      "addressCountry": "ES"
    },
    "geo": lat && lng ? {
      "@type": "GeoCoordinates",
      "latitude": lat,
      "longitude": lng
    } : undefined,
    "areaServed": [
      { "@type": "City", "name": city },
      { "@type": "State", "name": "Catalunya" }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "hasMap": `https://maps.google.com/?q=alarmas+seguridad+${encodeURIComponent(city)}`,
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": lat && lng ? {
        "@type": "GeoCoordinates",
        "latitude": lat,
        "longitude": lng
      } : undefined,
      "geoRadius": "15000"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.instagram.com/premiumtechsecurity",
      "https://www.facebook.com/premiumtechsecurity"
    ]
  };

  // Remove undefined keys
  const cleanSchema = JSON.parse(JSON.stringify(schema));

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <meta name="keywords" content={fullKeywords} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Premium Tech Security" />
      <meta property="og:locale" content="es_ES" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="geo.region" content="ES-CT" />
      <meta name="geo.placename" content={city} />
      {lat && lng && <meta name="geo.position" content={`${lat};${lng}`} />}
      {lat && lng && <meta name="ICBM" content={`${lat}, ${lng}`} />}
      <script type="application/ld+json">{JSON.stringify(cleanSchema)}</script>
    </Helmet>
  );
}