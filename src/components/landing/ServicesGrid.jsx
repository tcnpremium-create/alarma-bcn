import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, AlertCircle, Camera, Lock, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";

export default function ServicesGrid() {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      icon: AlertCircle,
      title: "Sistemas de Alarma",
      description: "Alarmas conectadas con detección de movimiento, rotura de cristal y apertura de puertas. Control desde tu móvil 24/7.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
      features: ["Detección 24/7", "Control móvil", "Notificaciones en tiempo real"],
      page: "SistemasAlarma"
    },
    {
      id: 2,
      icon: Camera,
      title: "Videovigilancia",
      description: "Cámaras profesionales HIKVISION y DAHUA. Grabación en nube, visión nocturna y análisis inteligente.",
      image: "https://images.unsplash.com/photo-1600138130521-b0ec4ab5e5b5?w=500&h=400&fit=crop",
      features: ["Grabación en nube", "Visión nocturna 4K", "IA y análisis"],
      page: "Videovigilancia"
    },
    {
      id: 3,
      icon: Lock,
      title: "Control de Accesos",
      description: "Sistemas de acceso con código, huella dactilar y tarjeta. Perfecto para negocios y comunidades.",
      image: "https://images.unsplash.com/photo-1563089145-3a3178d5ebb0?w=500&h=400&fit=crop",
      features: ["Códigos PIN", "Huella dactilar", "Registro de entradas"],
      page: "ControlAccesos"
    },
    {
      id: 4,
      icon: Wrench,
      title: "Mantenimiento y Soporte",
      description: "Servicio técnico profesional disponible 24/7. Instalación, mantenimiento y reparación de sistemas.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop",
      features: ["Soporte 24/7", "Instalación experta", "Mantenimiento preventivo"],
      page: "MantenimientoSoporte"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1628] mb-6">
            Soluciones de Seguridad Completas
          </h2>
          <p className="text-xl text-gray-600">
            Desde alarmas inteligentes hasta videovigilancia profesional. Todo lo que necesitas para proteger tu hogar o negocio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => navigate(createPageUrl(service.page))}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                {/* Imagen */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Contenido */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#E63946]/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#E63946]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0A1628]">{service.title}</h3>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-[#E63946] rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full bg-[#E63946] hover:bg-[#d32f3c] text-white font-bold py-3 flex items-center justify-center gap-2 group/btn">
                    Más información
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}