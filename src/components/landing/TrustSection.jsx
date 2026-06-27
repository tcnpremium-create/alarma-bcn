import React from "react";
import { Award, Users, Zap, Globe } from "lucide-react";

export default function TrustSection() {
  const pillars = [
    {
      icon: Award,
      title: "Tecnología certificada",
      desc: "Equipos de marcas líderes: Hikvision, Dahua, Ajax, DSC. Instalación homologada y garantizada.",
      points: ["Hikvision 4K", "Dahua IA", "Ajax profesional", "DSC certificado"]
    },
    {
      icon: Users,
      title: "Equipo profesional",
      desc: "Técnicos especializados con más de 15 años de experiencia. Formación continua en nuevas tecnologías.",
      points: ["15+ años exp.", "Certificados", "Formación continua", "Equipo 24/7"]
    },
    {
      icon: Zap,
      title: "Respuesta garantizada",
      desc: "Central de monitoreo 24/7, intervención en menos de 30 minutos ante cualquier incidente.",
      points: ["Monitoreo 24/7", "Respuesta <30min", "Protocolo certificado", "Disponibilidad total"]
    },
    {
      icon: Globe,
      title: "Cobertura completa",
      desc: "Instalación y soporte en toda Catalunya. Presencia en Barcelona, Badalona, Sabadell y más.",
      points: ["Toda Catalunya", "Barcelona centro", "Área metropolitana", "+8 municipios"]
    }
  ];

  return (
    <section aria-label="Por qué elegirnos" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 sm:mb-6">
            Por qué confían en nosotros
          </h2>
          <p className="text-xl text-gray-300">
            Empresa de seguridad profesional con años de experiencia y miles de clientes satisfechos.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all"
              >
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">{pillar.desc}</p>

                {/* Points */}
                <div className="space-y-2 border-t border-white/10 pt-6">
                  {pillar.points.map((point, i) => (
                    <p key={i} className="text-xs text-gray-300 font-semibold tracking-wide">
                      ✓ {point}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}