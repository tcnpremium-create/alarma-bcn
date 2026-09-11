import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";

export default function Terrassa() {
  return (
    <CityLandingTemplate
      city="Terrassa"
      seoPath="/Terrassa"
      intro="Premium Tech Security es especialista en instalación de alarmas en Terrassa, importante polo industrial y comercial del Vallès Occidental, con soluciones AJAX, Hikvision y Fermax para casas con jardín, pisos urbanos, polígonos industriales y negocios."
      lat={41.5634}
      lng={2.0082}
      zones={["Centre", "Ègara", "Can Palet", "Les Fonts", "La Maurina", "Torresana", "Montserrat", "Vallparadís", "Sant Pere", "Ca n'Anglada", "Can Parellada", "Segle XX"]}
    />
  );
}
