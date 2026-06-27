import React from "react";
import { Ban, Wrench, ShieldCheck, Smartphone } from "lucide-react";

const CARDS = [
  {
    icon: Ban,
    title: "Sin cuotas mensuales",
    description: "Paga solo por la instalación. Sin contratos de permanencia ni costes ocultos.",
  },
  {
    icon: Wrench,
    title: "Instalación incluida",
    description: "Instaladores certificados. Tu sistema funcionando en menos de 24 horas.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía de por vida",
    description: "Todos nuestros equipos con garantía extendida y soporte técnico permanente.",
  },
  {
    icon: Smartphone,
    title: "Soporte 24/7",
    description: "Asistencia técnica en cualquier momento. Por teléfono, WhatsApp o presencial.",
  },
];

export default function WhyChooseUsCards() {
  return (
    <section className="py-16 sm:py-20 bg-[#1A1A2E]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4 tracking-tight">
          ¿Por qué elegirnos?
        </h2>
        <p className="text-white/60 text-center mb-12 text-lg max-w-2xl mx-auto">
          Más de 2.500 clientes confían en nosotros para proteger lo que más importa
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 text-center hover:bg-white/10 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-[#E53E3E]/15 flex items-center justify-center mx-auto mb-5">
                <card.icon className="w-7 h-7 text-[#E53E3E]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}