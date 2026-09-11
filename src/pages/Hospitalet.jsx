import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";

export default function Hospitalet() {
  return (
    <CityLandingTemplate
      city="L'Hospitalet de Llobregat"
      seoPath="/Hospitalet"
      intro="Premium Tech Security es especialista en instalación de alarmas en L'Hospitalet de Llobregat, segundo municipio más poblado de Catalunya, con soluciones adaptadas a viviendas, locales comerciales, naves industriales y oficinas mediante sistemas AJAX, Hikvision y Fermax."
      lat={41.3598}
      lng={2.0993}
      zones={["Centre", "Collblanc", "La Torrassa", "Bellvitge", "La Florida", "Pubilla Cases", "Can Serra", "Sanfeliu", "Santa Eulàlia"]}
    />
  );
}
