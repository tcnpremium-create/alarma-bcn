import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";

export default function BarrioEixample() {
  return (
    <CityLandingTemplate
      city="Eixample"
      seoPath="/BarrioEixample"
      intro="Premium Tech Security es especialista en instalación de alarmas en el Eixample, uno de los barrios más emblemáticos y céntricos de Barcelona, con soluciones AJAX, Hikvision y Fermax personalizadas para pisos residenciales y comercios."
      lat={41.3888}
      lng={2.1590}
    />
  );
}
