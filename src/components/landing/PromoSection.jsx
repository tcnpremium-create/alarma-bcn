import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Shield } from "lucide-react";

export default function PromoSection() {
  const handleContactClick = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  // Kits de Alarmas Ajax con imágenes originales exactas
  const alarmKits = [
    {
      id: 1,
      name: "INICIAL",
      description: "Este kit protege de forma efectiva el interior de tu hogar o local gracias a su detector de movimiento y su sensor de apertura de puerta. Enviará una notificación inmediata a tu móvil cuando detecte el primer paso de un intruso y activará su potente sirena.",
      pvp: "550€",
      promo: "400€",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/8f0bb1f1c_KITINICIAL.png"
    },
    {
      id: 2,
      name: "STANDARD",
      description: "Este Kit de Ajax con 3 PIR es la alarma con sensor de movimiento para negocio o hogar capaz de detectar el paso de personas a una distancia de 12 metros. De esta manera, el sistema emitirá de inmediato notificaciones push en tu móvil. Inmune a mascotas y corrientes de aire.",
      pvp: "700€",
      promo: "500€",
      featured: true,
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/771cbf78d_kitstandard.jpg"
    },
    {
      id: 3,
      name: "SUPERIOR",
      description: "Con esta alarma tendrás los elementos necesarios para disuadir a intrusos. Este sistema incluye una central HUB 2 compatible con los detectores de movimiento de última generación MOTIONCAM que registran fotografías y las envía a tu móvil cuando detecta presencia humana.",
      pvp: "850€",
      promo: "600€",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/bcf002abb_kitsuperior.jpg"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1628] mb-6">
            Kits y Promociones
          </h2>
          <p className="text-xl text-gray-600">
            Elige el kit que mejor se adapte a tus necesidades. Precios sin sorpresas, instalación gratis incluida.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {alarmKits.map((kit, index) => (
            <div
              key={kit.id}
              className={`relative bg-white rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                kit.featured
                  ? 'border-[#E63946] shadow-2xl md:scale-105'
                  : 'border-gray-200 hover:shadow-xl hover:border-gray-300'
              }`}
            >
              {/* Etiqueta destacado */}
              {kit.featured && (
                <div className="absolute top-4 right-4 bg-[#E63946] text-white px-4 py-2 rounded-full text-sm font-bold z-10">
                  Más Popular
                </div>
              )}

              {/* Imagen del kit */}
              {kit.image && (
                <div className="relative w-full h-56 bg-gray-50 flex items-center justify-center p-4 border-b border-gray-200">
                  <img 
                    src={kit.image} 
                    alt={kit.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Contenido */}
              <div className={`p-8 ${kit.featured ? 'bg-gray-50' : 'bg-white'}`}>
                <h3 className="text-2xl font-bold text-[#0A1628] mb-3">{kit.name}</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{kit.description}</p>

                {/* Precios */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 line-through">PVP: {kit.pvp}</span>
                    <span className="text-3xl font-bold text-[#E63946]">{kit.promo}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Sin sorpresas. Instalación incluida.</p>
                </div>

                <Button
                  onClick={handleContactClick}
                  className={`w-full font-bold py-3 flex items-center justify-center gap-2 group ${
                    kit.featured
                      ? 'bg-[#E63946] hover:bg-[#d32f3c] text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-[#0A1628]'
                  }`}
                >
                  Lo Quiero
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}