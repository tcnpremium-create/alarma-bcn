import React from "react";
import { motion } from "framer-motion";
import { Award, Clock, FileText, Users, Cpu, Ban } from "lucide-react";

const reasons = [
  { icon: Award, title: "Técnicos Certificados", desc: "Profesionales cualificados con amplia experiencia en instalación de sistemas de seguridad." },
  { icon: Clock, title: "Instalación en 24-48h", desc: "Rapidez y eficiencia. Tu sistema de alarma operativo en menos de 48 horas." },
  { icon: FileText, title: "Presupuesto Sin Compromiso", desc: "Estudio y valoración gratuita adaptada a tus necesidades reales de seguridad." },
  { icon: Users, title: "Atención Personalizada", desc: "Trato cercano y directo. Somos una empresa local que conoce Barcelona." },
  { icon: Cpu, title: "Última Tecnología", desc: "Sistemas de alarma de última generación con conectividad smart y IA." },
  { icon: Ban, title: "Sin Permanencia", desc: "Flexibilidad total. Sin contratos de permanencia obligatorios." },
];

export default function WhyUsSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#F8F9FC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#E63946] font-semibold text-sm tracking-widest uppercase">
              ¿Por qué elegirnos?
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight leading-tight">
              Tu seguridad es nuestra prioridad absoluta
            </h2>
            <p className="mt-5 text-gray-500 text-lg leading-relaxed">
              Somos una empresa de alarmas en Barcelona comprometida con la protección de hogares y negocios. 
              Combinamos tecnología avanzada con un servicio cercano y profesional.
            </p>

            <div className="mt-10 relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Seguridad en el hogar"
                className="w-full h-64 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent rounded-2xl" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-semibold text-lg">Más de 10 años</p>
                <p className="text-white/70">protegiendo hogares en Barcelona</p>
              </div>
            </div>
          </motion.div>

          {/* Right column - reasons grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-5 rounded-xl bg-white border border-gray-100 hover:border-[#E63946]/20 hover:shadow-lg hover:shadow-[#E63946]/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0A1628] flex items-center justify-center">
                  <reason.icon className="w-5 h-5 text-[#E63946]" />
                </div>
                <h3 className="mt-4 font-semibold text-[#0A1628]">{reason.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}