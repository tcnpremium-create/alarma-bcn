import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";

export default function Badalona() {
  return (
    <CityLandingTemplate
      city="Badalona"
      seoPath="/Badalona"
      intro="Premium Tech Security lleva más de una década instalando alarmas en Badalona, tercera ciudad más poblada de Catalunya, protegiendo tanto viviendas cerca del paseo marítimo como negocios del centro urbano con sistemas AJAX, Hikvision y Fermax."
      lat={41.4501}
      lng={2.2471}
      zones={["Centre", "Dalt de la Vila", "Canyadó", "Casagemes", "La Pau", "Gorg", "Pomar", "Progrés", "Llefi", "Bufalà", "Montigalà"]}
    />
  );
}
