import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";

export default function Mataro() {
  return (
    <CityLandingTemplate
      city="Mataró"
      seoPath="/Mataro"
      intro="Premium Tech Security es especialista en instalación de alarmas en Mataró, capital del Maresme, con soluciones diseñadas para viviendas costeras, apartamentos turísticos y comercios del centro mediante sistemas AJAX, Hikvision y Fermax."
      lat={41.5381}
      lng={2.4445}
      zones={["Centre", "Havana", "Cerdanyola", "Pla d'en Boet", "Rocafonda", "Molins", "Cirera", "La Llàntia", "El Palau", "Eixample"]}
    />
  );
}
