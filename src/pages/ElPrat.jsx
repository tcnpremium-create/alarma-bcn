import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";

export default function ElPratPage() {
  return (
    <CityLandingTemplate
      city="El Prat de Llobregat"
      seoPath="/ElPrat"
      intro="Premium Tech Security protege hogares y negocios en El Prat de Llobregat, incluida su zona junto al aeropuerto, con sistemas AJAX, Hikvision y Fermax de respuesta inmediata 24/7."
      lat={41.3253}
      lng={2.0958}
    />
  );
}
