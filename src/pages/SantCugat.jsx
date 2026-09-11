import React from "react";
import CityLandingTemplate from "../components/landing/CityLandingTemplate";

export default function SantCugatPage() {
  return (
    <CityLandingTemplate
      city="Sant Cugat del Vallès"
      seoPath="/SantCugat"
      intro="Premium Tech Security ofrece sistemas de seguridad de alta gama para Sant Cugat del Vallès, zona residencial de alto nivel, con soluciones AJAX, Hikvision y Fermax adaptadas a chalets, áticos y negocios premium."
      lat={41.4722}
      lng={2.0836}
    />
  );
}
