import React from "react";
import { CheckCircle, MapPin, Hammer, Users, Phone } from "lucide-react";

export default function ProcessSection() {
  const steps = [
  {
    icon: MapPin,
    number: "01",
    title: "Análisis gratuito",
    desc: "Visitamos tu propiedad sin coste para analizar necesidades de seguridad"
  },
  {
    icon: CheckCircle,
    number: "02",
    title: "Presupuesto personalizado",
    desc: "Te presentamos una propuesta adaptada con detalles técnicos y opciones disponibles"
  },
  {
    icon: Hammer,
    number: "03",
    title: "Instalación profesional",
    desc: "Técnicos certificados instalan y comprueban todo en tu presencia"
  },
  {
    icon: Users,
    number: "04",
    title: "Formación incluida",
    desc: "Te enseñamos cómo usar el sistema, app y funciones avanzadas"
  },
  {
    icon: Phone,
    number: "05",
    title: "Soporte 24/7",
    desc: "Soporte técnico y opciones de mantenimiento para el sistema instalado"
  }];


  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
          <h2 className="mb-3 text-3xl font-bold leading-tight text-[#0A1628] sm:mb-5 sm:text-4xl lg:text-5xl">
            Cómo trabajamos
          </h2>
          <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
            Proceso simple y transparente, de principio a fin.
          </p>
        </div>

        <div className="relative">
          {/* Desktop line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#E63946] via-[#E63946] to-transparent"></div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <article key={idx} className="relative flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm sm:flex-col sm:p-5 sm:text-center">
                  {/* Number circle */}
                  



                  {/* Icon */}
                  <div className="shrink-0 sm:flex sm:justify-center sm:mb-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E63946]/10">
                      <Icon className="h-6 w-6 text-[#E63946]" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <p className="mb-1 text-[11px] font-bold tracking-[0.16em] text-[#E63946]">{step.number}</p>
                    <h3 className="mb-1 text-base font-bold text-[#0A1628] sm:text-lg">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{step.desc}</p>
                  </div>
                </article>);

            })}
          </div>
        </div>
      </div>
    </section>);

}
