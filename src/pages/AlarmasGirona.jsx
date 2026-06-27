import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";

export default function AlarmasGirona() {
  return (
    <CityLandingTemplate
      city="Girona"
      seoPath="/alarmas-girona"
      intro="Instalamos sistemas de alarma y cámaras de seguridad en Girona ciudad, Costa Brava, la Bisbal, Figueres, Olot y toda la provincia. Tecnología AJAX y Hikvision 4K con respuesta 24/7."
      lat={41.9794}
      lng={2.8214}
      zones={["Barri Vell", "Eixample", "Santa Eugènia", "Montilivi", "Can Gibert", "Figueres", "Lloret de Mar", "Blanes", "Olot", "Palafrugell", "Roses", "Sant Feliu de Guíxols"]}
    />
  );
}