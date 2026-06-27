import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";

export default function AlarmasSabadell() {
  return (
    <CityLandingTemplate
      city="Sabadell"
      seoPath="/alarmas-sabadell"
      intro="Servicio de instalación de alarmas y cámaras de vigilancia en Sabadell, Terrassa, Badalona y Vallès Occidental. Empresa local con más de 15 años de experiencia."
      lat={41.5432}
      lng={2.1094}
      zones={["Centre", "Gràcia", "Creu Alta", "Can Puiggener", "La Concòrdia", "Can Oriac", "Torre-romeu", "Can Llong", "Castellarnau", "Can Feu", "Can Rull", "Terrassa"]}
    />
  );
}