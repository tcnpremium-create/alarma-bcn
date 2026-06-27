import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";

export default function AlarmasTarragona() {
  return (
    <CityLandingTemplate
      city="Tarragona"
      seoPath="/alarmas-tarragona"
      intro="Servicio de instalación de sistemas de seguridad en Tarragona, Reus, Cambrils, Tortosa y toda la provincia. Presupuesto gratuito en 24h, instalación certificada por técnicos especializados."
      lat={41.1189}
      lng={1.2445}
      zones={["Part Alta", "Eixample", "Torreforta", "Reus", "Cambrils", "Salou", "Vila-seca", "Tortosa", "El Vendrell", "Valls", "Amposta", "Sant Pere i Sant Pau"]}
    />
  );
}