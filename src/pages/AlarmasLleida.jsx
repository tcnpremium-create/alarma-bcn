import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";

export default function AlarmasLleida() {
  return (
    <CityLandingTemplate
      city="Lleida"
      seoPath="/alarmas-lleida"
      intro="Instalamos alarmas AJAX y cámaras de videovigilancia 4K en Lleida y toda la comarca. Respuesta rápida, garantía total y mantenimiento incluido en todos los sistemas."
      lat={41.6176}
      lng={0.6200}
      zones={["Centre Històric", "Cappont", "La Bordeta", "Pardinyes", "Balàfia", "Balaguer", "Mollerussa", "Tàrrega", "La Seu d'Urgell", "Cervera", "Alcarràs", "Bellpuig"]}
    />
  );
}