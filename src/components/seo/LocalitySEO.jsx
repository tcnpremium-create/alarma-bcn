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
  // Las diez páginas siguen pasando pageUrl, pero ya no se usa: era lo que
  // daba a cada municipio un @id y una url propios, es decir, un negocio
  // distinto por página. Se acepta y se ignora para no tocar 10 ficheros.
  pageUrl: _pageUrl,
}) {
  const fullTitle = title || `Alarmas en ${city} | Instalación Sistemas Seguridad 24/7 | PremiumTechSecurity`;
  const fullDesc = description || `Instalación profesional de alarmas en ${city}. Sistemas de seguridad AJAX, cámaras 4K, control de accesos. Presupuesto gratuito ☎ 638 10 99 47.`;
  const fullKeywords = keywords || `alarmas ${city}, instalación alarmas ${city}, sistemas seguridad ${city}, cámaras seguridad ${city}, videovigilancia ${city}`;

  // UNA SOLA EMPRESA, NO DIEZ.
  //
  // Antes cada página de municipio declaraba su propio negocio: nombre
  // distinto ("Premium Tech Security - Alarmas Mataró"), @id distinto y url
  // distinta, pero con la MISMA dirección de Barcelona y el MISMO teléfono.
  // Para Google eso son diez negocios locales que comparten sede y número:
  // el patrón exacto de las páginas de ubicación falsas.
  //
  // Ahora las diez describen la misma entidad (@id de la home) y lo que
  // cambia es areaServed: el municipio donde se presta el servicio.
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Premium Tech Security",
    "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/b61d56d39_UNETEALIMPERIO.png",
    "@id": "https://alarmasenbarcelona.com/#business",
    "url": "https://alarmasenbarcelona.com",
    "telephone": "+34638109947",
    "email": "tcnpremium@gmail.com",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carrer de Coll i Vehí, 141",
      "addressLocality": "Barcelona",
      "postalCode": "08026",
      "addressRegion": province,
      "addressCountry": "ES"
    },
    // Sin "geo": esas coordenadas eran las del MUNICIPIO, y en un
    // LocalBusiness "geo" significa dónde está el establecimiento. Ponerlas
    // afirmaba una sede en Sant Cugat, en El Prat, en Mataró… que no existe.
    // Las coordenadas siguen usándose en los meta geo.position/ICBM de abajo,
    // que son otra cosa y no afirman sede.
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
    "hasMap": "https://maps.google.com/maps?cid=5715602764533889179",
    // Sin "serviceArea": el radio de 15 km se centraba en el municipio, lo
    // que reforzaba la misma idea de sede local. areaServed ya dice dónde se
    // trabaja, sin inventar un centro de operaciones.
    // SIN aggregateRating: ver el motivo en AdvancedSEO.jsx.
    "sameAs": [
      "https://www.instagram.com/premiumtechsecurity",
      "https://www.facebook.com/p/Alarmas-en-barcelona-premium-100086091741859/"
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