import React from "react";
import { Clock, AlertCircle, Camera, Smartphone, Users, Zap, Shield, Wrench } from "lucide-react";

export default function SistemasIncluidos() {
  const features = [
    {
      icon: Clock,
      title: "Detección 24/7",
      desc: "Sensores inteligentes monitoreando tu propiedad constantemente, día y noche."
    },
    {
      icon: AlertCircle,
      title: "Aviso inmediato a central",
      desc: "En caso de activación, notificación instantánea a nuestra central de monitoreo."
    },
    {
      icon: Camera,
      title: "Cámaras con visión nocturna",
      desc: "Grabación 4K HD con visión infrarroja hasta 50 metros sin iluminación."
    },
    {
      icon: Smartphone,
      title: "Control desde la App",
      desc: "Arma/desarma, visualiza en vivo y accede a grabaciones desde tu móvil."
    },
    {
      icon: Users,
      title: "Instalación profesional",
      desc: "Técnicos certificados con experiencia en sistemas de seguridad."
    },
    {
      icon: Zap,
      title: "Respuesta rápida",
      desc: "Equipo de intervención disponible en menos de 30 minutos ante incidentes."
    },
    {
      icon: Shield,
      title: "Garantía 3 años",
      desc: "Cobertura completa de equipos y servicio de reparación sin coste adicional."
    },
    {
      icon: Wrench,
      title: "Mantenimiento técnico",
      desc: "Revisiones periódicas y soporte 24/7 para garantizar funcionamiento óptimo."
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1628] mb-6">
            Qué incluyen nuestros sistemas
          </h2>
          <p className="text-xl text-gray-600">
            Protección integral con todas las funcionalidades que necesitas para máxima tranquilidad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all hover:border-[#E63946]/30">
                <div className="w-14 h-14 bg-[#E63946]/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-[#E63946]" />
                </div>
                <h3 className="text-lg font-bold text-[#0A1628] mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}