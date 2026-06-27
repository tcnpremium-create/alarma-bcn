import React from "react";
import { CheckCircle, MapPin, Hammer, Users, Phone } from "lucide-react";

export default function ProcessSection() {
  const steps = [
  {
    icon: MapPin,
    number: "1",
    title: "Análisis gratuito",
    desc: "Visitamos tu propiedad sin coste para analizar necesidades de seguridad"
  },
  {
    icon: CheckCircle,
    number: "2",
    title: "Presupuesto personalizado",
    desc: "Te presentamos una solución adaptada con detalles técnicos y financiación"
  },
  {
    icon: Hammer,
    number: "3",
    title: "Instalación profesional",
    desc: "Técnicos certificados instalan y comprueban todo en tu presencia"
  },
  {
    icon: Users,
    number: "4",
    title: "Formación incluida",
    desc: "Te enseñamos cómo usar el sistema, app y funciones avanzadas"
  },
  {
    icon: Phone,
    number: "5",
    title: "Soporte 24/7",
    desc: "Soporte técnico permanente, mantenimiento y asistencia ilimitada"
  }];


  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1628] mb-6">
            Cómo trabajamos
          </h2>
          <p className="text-xl text-gray-600">
            Proceso simple y transparent, de principio a fin.
          </p>
        </div>

        <div className="relative">
          {/* Desktop line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#E63946] via-[#E63946] to-transparent"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative text-center">
                  {/* Number circle */}
                  



                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-[#E63946]/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#E63946]" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-[#0A1628] mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>);

            })}
          </div>
        </div>
      </div>
    </section>);

}