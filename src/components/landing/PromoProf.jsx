import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export default function PromoProf() {
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  const kits = [
    {
      name: "KIT HOGAR ESTÁNDAR",
      price: "desde 399€",
      image: "https://images.unsplash.com/photo-1497215842964-e6b87eac00cb?w=600&q=80",
      features: [
        "Panel de control inteligente",
        "4 detectores PIR",
        "6 sensores magnéticos",
        "1 sirena interior/exterior",
        "App control ilimitado",
        "Instalación profesional",
        "Garantía 3 años"
      ],
      highlighted: false
    },
    {
      name: "KIT VIDEOVIGILANCIA PRO",
      price: "desde 799€",
      image: "https://images.unsplash.com/photo-1485775364519-df21cff8f9f2?w=600&q=80",
      features: [
        "2 cámaras 4K Hikvision",
        "Visión nocturna 50m",
        "Análisis de IA integrado",
        "Grabador NVR 1TB",
        "Acceso remoto 24/7",
        "Almacenamiento en nube",
        "Instalación profesional",
        "Mantenimiento 1 año"
      ],
      highlighted: true
    },
    {
      name: "KIT COMPLETO SEGURIDAD",
      price: "desde 1.299€",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&q=80",
      features: [
        "Alarma inteligente completa",
        "4 cámaras 4K + grabador",
        "Control de accesos facial",
        "Monitoreo 24/7 certificado",
        "App control avanzada",
        "Automatización IoT",
        "Respuesta de intervención",
        "Garantía y mantenimiento incluidos"
      ],
      highlighted: false
    }
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">
            Paquetes de seguridad
          </h2>
          <p className="text-xl text-slate-600">
            Soluciones adaptadas a tu necesidad, con instalación profesional incluida.
          </p>
        </div>

        {/* Kits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {kits.map((kit, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden transition-all ${
                kit.highlighted
                  ? "ring-2 ring-red-500 shadow-2xl transform scale-105"
                  : "border border-slate-200 hover:shadow-xl"
              }`}
            >
              {/* Image */}
              <div className="relative h-56 bg-slate-200">
                <img
                  src={kit.image}
                  alt={kit.name}
                  className="w-full h-full object-cover"
                />
                {kit.highlighted && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Más popular
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`p-8 ${kit.highlighted ? "bg-slate-50" : "bg-white"}`}>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{kit.name}</h3>
                <p className="text-3xl font-black text-red-600 mb-6">{kit.price}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {kit.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  onClick={scrollToContact}
                  className={`w-full font-bold py-3 flex items-center justify-center gap-2 ${
                    kit.highlighted
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                  }`}
                >
                  Solicitar presupuesto
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">¿Necesitas una solución personalizada?</h3>
          <p className="text-gray-300 mb-6">Contacta con nuestro equipo técnico para presupuesto sin compromiso</p>
          <Button
            onClick={scrollToContact}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold flex items-center justify-center gap-2 mx-auto"
          >
            Consultar ahora
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}