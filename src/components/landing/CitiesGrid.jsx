import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const CITIES = [
  { name: "Barcelona", path: "/alarmas-barcelona" },
  { name: "Sabadell", path: "/alarmas-sabadell" },
  { name: "Girona", path: "/alarmas-girona" },
  { name: "Tarragona", path: "/alarmas-tarragona" },
  { name: "Lleida", path: "/alarmas-lleida" },
  { name: "Hospitalet", path: "/Hospitalet" },
];

export default function CitiesGrid() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A2E] text-center mb-4 tracking-tight">
          Ciudades donde instalamos
        </h2>
        <p className="text-gray-500 text-center mb-12 text-lg max-w-2xl mx-auto">
          Cobertura profesional en toda Cataluña con desplazamiento incluido
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CITIES.map((city) => (
            <Link
              key={city.name}
              to={city.path}
              className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-[#E53E3E]/40 hover:shadow-lg hover:shadow-[#E53E3E]/5 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#E53E3E]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E53E3E]/20 transition-colors">
                <MapPin className="w-5 h-5 text-[#E53E3E]" />
              </div>
              <div>
                <span className="font-bold text-[#1A1A2E] group-hover:text-[#E53E3E] transition-colors">
                  Cámaras de seguridad en {city.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}