import React from "react";
import { Users, Shield, Zap, Award, Clock, Headphones } from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Users,
      title: "Instaladores Profesionales",
      description: "Equipo técnico certificado con más de 15 años de experiencia en instalaciones de sistemas de seguridad."
    },
    {
      icon: Shield,
      title: "Tecnología de Confianza",
      description: "Utilizamos marcas líderes: AJAX, Hikvision, Dahua y DSC. Garantía oficial en todos los productos."
    },
    {
      icon: Zap,
      title: "Respuesta Ultrarrápida",
      description: "Centro de monitoreo 24/7 con respuesta en menos de 5 minutos ante cualquier alerta."
    },
    {
      icon: Award,
      title: "Servicio en Todo Catalunya",
      description: "Cobertura completa en Barcelona, Hospitalet, Badalona, Sabadell, Terrassa, Mataró y más zonas."
    },
    {
      icon: Clock,
      title: "Disponibilidad Total",
      description: "Instalación rápida sin obras. Servicios de urgencia 24 horas, 7 días a la semana."
    },
    {
      icon: Headphones,
      title: "Soporte Técnico Premium",
      description: "Atención al cliente telefónica. Soporte técnico gratuito durante toda la vida útil de tu sistema."
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1628] mb-6">
            Por qué confían en nosotros
          </h2>
          <p className="text-xl text-gray-600">
            Más de 2.500 clientes en Catalunya nos han elegido por nuestra profesionalidad, transparencia y calidad.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-[#E63946] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#E63946]/10 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#E63946]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1628] mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Certificaciones */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <p className="text-center text-gray-600 mb-8 font-semibold">Certificaciones y reconocimientos</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="text-center">
              <div className="bg-white border border-gray-200 rounded-lg p-4 inline-block">
                <Shield className="w-8 h-8 text-[#E63946]" />
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-700">ISO 9001</p>
            </div>
            <div className="text-center">
              <div className="bg-white border border-gray-200 rounded-lg p-4 inline-block">
                <Award className="w-8 h-8 text-[#E63946]" />
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-700">Certificado CCN</p>
            </div>
            <div className="text-center">
              <div className="bg-white border border-gray-200 rounded-lg p-4 inline-block">
                <Zap className="w-8 h-8 text-[#E63946]" />
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-700">Expert AJAX</p>
            </div>
            <div className="text-center">
              <div className="bg-white border border-gray-200 rounded-lg p-4 inline-block">
                <Users className="w-8 h-8 text-[#E63946]" />
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-700">Partner Hikvision</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}