import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";
import { businessStats } from "@/lib/businessStats";

export default function AlarmasBarcelona() {
  return (
    <CityLandingTemplate
      city="Barcelona"
      seoPath="/alarmas-barcelona"
      intro={`Premium Tech Security es la empresa instaladora de referencia en Barcelona. ${businessStats.experienceText}, protegiendo hogares, negocios y comunidades de vecinos con sistemas AJAX, Hikvision y Fermax. Instalación certificada en ${businessStats.installTimeframe}.`}
      lat={41.3874}
      lng={2.1686}
      zones={["Eixample", "Gràcia", "Sant Martí", "Sants-Montjuïc", "Horta-Guinardó", "Nou Barris", "Les Corts", "Sarrià-Sant Gervasi", "Ciutat Vella", "Sant Andreu", "Poblenou", "Diagonal Mar"]}
    />
  );
}