import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";

export default function CornellaPage() {
  return (
    <CityLandingTemplate
      city="Cornellà de Llobregat"
      seoPath="/Cornella"
      intro="Premium Tech Security ofrece protección profesional para hogares y negocios en Cornellà de Llobregat, con sistemas AJAX, Hikvision y Fermax instalados por técnicos certificados y respuesta 24/7."
      lat={41.3564}
      lng={2.0700}
    />
  );
}
