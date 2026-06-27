import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EnhancedCoverageArea() {
  const mainZones = [
    { name: "Barcelona", cities: "Centro, Eixample, Gràcia, Sarrià, Les Corts, Montjuïc, Zona Franca" },
    { name: "Badalona", cities: "Centro, litoral, zonas residenciales" },
    { name: "Hospitalet de Llobregat", cities: "Centro, industrial, comercial" },
    { name: "Sabadell", cities: "Centro, Mercat, Val d'Aran, Santa Rosa" },
    { name: "Terrassa", cities: "Centro, Egara, Urbana, Ferran" },
    { name: "Mataró", cities: "Centro, Llefià, Arenys" },
    { name: "Granollers", cities: "Centro, Ànima, Can Sabata" },
    { name: "Toda Catalunya", cities: "Girona, Lleida, Tarragona y alrededores" }
  ];

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section aria-label="Cobertura geográfica" className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1628] mb-4 sm:mb-6">
            Cobertura en toda Catalunya
          </h2>
          <p className="text-xl text-gray-600">
            Instalación y soporte técnico disponible en Barcelona y toda la región.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainZones.map((zone, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-[#E63946]/30">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-[#E63946]" />
                <h3 className="text-lg font-bold text-[#0A1628]">{zone.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{zone.cities}</p>
            </div>
          ))}
        </div>

        {/* Info box */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1a2a3a] text-white rounded-xl p-8 text-center">
          <p className="text-lg mb-4">¿Tu zona no aparece?</p>
          <p className="text-gray-300 mb-6">Consulta con nuestro equipo, es posible que podamos cubrir tu área.</p>
          <Button
            onClick={scrollToContact}
            className="bg-[#E63946] hover:bg-[#d32f3c] text-white px-8 py-3 font-bold flex items-center justify-center gap-2 mx-auto"
          >
            Consultar disponibilidad
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}