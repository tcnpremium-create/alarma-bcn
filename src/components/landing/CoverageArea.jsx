import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function CoverageArea() {
  const zones = [
    { name: "Barcelona", slug: "Barcelona", population: "Capital" },
    { name: "Hospitalet", slug: "Hospitalet", population: "Área metropolitana" },
    { name: "Badalona", slug: "Badalona", population: "Costa Maresme" },
    { name: "Sabadell", slug: "Sabadell", population: "Vallés Occidental" },
    { name: "Terrassa", slug: "Terrassa", population: "Vallés Occidental" },
    { name: "Mataró", slug: "Mataro", population: "Maresme" },
    { name: "Cornellà", slug: "Cornella", population: "Baix Llobregat" },
    { name: "El Prat", slug: "ElPrat", population: "Baix Llobregat" },
    { name: "Sant Cugat", slug: "SantCugat", population: "Vallés Occidental" },
    { name: "Viladecans", slug: "Viladecans", population: "Baix Llobregat" },
    { name: "Castelldefels", slug: "Castelldefels", population: "Baix Llobregat" },
    { name: "Girona", slug: "Girona", population: "Girona" },
    { name: "Lleida", slug: "Lleida", population: "Lleida" },
    { name: "Tarragona", slug: "Tarragona", population: "Tarragona" }
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0A1628] to-[#1a2a3a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-6 h-6 text-[#E63946]" />
            <span className="text-[#E63946] font-semibold text-lg">Cobertura Completa</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Atendemos toda Catalunya
          </h2>
          <p className="text-xl text-gray-300">
            Instalación y servicio técnico disponible en todas estas ciudades y sus alrededores.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
          {zones.map((zone) => (
            <Link
              key={zone.slug}
              to={createPageUrl(zone.slug)}
              className="group bg-white/10 backdrop-blur-md border border-white/20 hover:border-[#E63946] rounded-lg p-4 transition-all duration-300 text-center cursor-pointer hover:bg-white/20"
            >
              <p className="font-semibold text-white group-hover:text-[#E63946] transition-colors text-sm md:text-base">
                {zone.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">{zone.population}</p>
            </Link>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿No ves tu zona?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Aunque tu ciudad no aparezca aquí, es posible que cubramos tu zona. Contáctanos y te informaremos sobre disponibilidad de servicio.
          </p>
          <Button className="bg-[#E63946] hover:bg-[#d32f3c] text-white px-8 py-3 font-bold inline-flex items-center gap-2 group">
            Consultar disponibilidad
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}