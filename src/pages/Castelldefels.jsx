import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";

export default function CastelldefelsPage() {
  return (
    <CityLandingTemplate
      city="Castelldefels"
      seoPath="/Castelldefels"
      intro="Premium Tech Security ofrece protección premium para viviendas de lujo y segundas residencias en la costa de Castelldefels, con alarmas AJAX y videovigilancia Hikvision resistentes a la humedad y salinidad del entorno costero."
      lat={41.2833}
      lng={1.9750}
    />
  );
}
