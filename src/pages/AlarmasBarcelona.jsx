import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";

export default function AlarmasBarcelona() {
  return (
    <CityLandingTemplate
      city="Barcelona"
      seoPath="/alarmas-barcelona"
      intro="Premium Tech Security es la empresa instaladora de referencia en Barcelona. Más de 15 años protegiendo hogares, negocios y comunidades de vecinos con sistemas AJAX, Hikvision y Fermax. Instalación certificada en 24-48h."
      lat={41.3874}
      lng={2.1686}
      zones={["Eixample", "Gràcia", "Sant Martí", "Sants-Montjuïc", "Horta-Guinardó", "Nou Barris", "Les Corts", "Sarrià-Sant Gervasi", "Ciutat Vella", "Sant Andreu", "Poblenou", "Diagonal Mar"]}
    />
  );
}