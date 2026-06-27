import React from "react";
import { Clock, Shield, Award, HeadphonesIcon } from "lucide-react";

export default function ValueProposition() {
  const features = [
  {
    icon: Clock,
    title: "Respuesta en 15 segundos",
    desc: "Nuestra central de alarmas reacciona inmediatamente ante cualquier incidencia",
    highlight: "15s"
  },
  {
    icon: Shield,
    title: "100% personalizado",
    desc: "Diseñamos tu sistema a medida según las necesidades de tu hogar o negocio",
    highlight: "A medida"
  },
  {
    icon: Award,
    title: "Instalación profesional",
    desc: "Técnicos certificados con más de 15 años de experiencia en seguridad",
    highlight: "15+ años"
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte 24/7",
    desc: "Equipo disponible las 24 horas del día, los 7 días de la semana",
    highlight: "24/7"
  }];


  return (
    <section aria-label="Propuesta de valor" className="py-16 lg:py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Value headline similar to Sector Alarm */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="text-sm font-bold text-red-600">PRIMERA VISITA GRATUITA</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-[#0A1628] mb-4">
            Un sistema de alarma diseñado para proteger lo que más quieres
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Con nuestra alarma conectada, estamos a tu disposición 24/7. Nuestros sistemas, instalados por 
            profesionales certificados, se adaptan 100% a tus necesidades. En caso de emergencia, nuestra 
            Central de Alarmas responde inmediatamente, verificando la alarma y avisando a los servicios 
            de emergencia.
          </p>
        </div>

        {/* Key features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-red-100 transition-all duration-300 group">

                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-2xl font-black text-red-500/20 group-hover:text-red-500/30 transition-colors">
                    {feature.highlight}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0A1628] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>);

          })}
        </div>

        {/* Trust indicators similar to Sector Alarm */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-gray-100">
          <div className="text-center">
            <p className="text-3xl font-black text-[#0A1628]">2.500+</p>
            <p className="text-sm text-gray-600 mt-1">Clientes activos</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-[#0A1628]">4.9/5</p>
            <p className="text-sm text-gray-600 mt-1">Valoración media</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-[#0A1628]">&lt;30min</p>
            <p className="text-sm text-gray-600 mt-1">Tiempo respuesta</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-[#0A1628]">98%</p>
            <p className="text-sm text-gray-600 mt-1">Clientes satisfechos</p>
          </div>
        </div>
      </div>
    </section>);

}