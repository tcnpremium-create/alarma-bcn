import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileCheck, Lock, ScrollText, CheckCircle2 } from "lucide-react";

const certifications = [
  {
    icon: ShieldCheck,
    title: "Cumplimiento Normativa",
    desc: "Cumplimos con toda la normativa de seguridad privada vigente en España."
  },
  {
    icon: FileCheck,
    title: "RGPD y Videovigilancia",
    desc: "Instalaciones conformes con el Reglamento General de Protección de Datos."
  },
  {
    icon: Lock,
    title: "Sistemas Homologados",
    desc: "Todos nuestros equipos cumplen con las certificaciones europeas requeridas."
  },
  {
    icon: ScrollText,
    title: "Protocolos Documentados",
    desc: "Procesos certificados y trazabilidad completa de cada instalación."
  },
  {
    icon: CheckCircle2,
    title: "Transparencia Contractual",
    desc: "Contratos claros, sin letra pequeña. Transparencia total con nuestros clientes."
  }
];

export default function CertificationsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#F8F9FC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[#E63946] font-semibold text-sm tracking-widest uppercase">
            Certificaciones y Cumplimiento
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight">
            Garantía legal y técnica
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Cumplimos con todas las normativas y certificaciones exigidas para garantizar tu seguridad y tranquilidad.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#E63946]/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0A1628] flex items-center justify-center mb-4">
                <cert.icon className="w-6 h-6 text-[#E63946]" />
              </div>
              <h3 className="font-semibold text-[#0A1628] text-base mb-2">{cert.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{cert.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}