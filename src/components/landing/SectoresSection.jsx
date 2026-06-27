import React from "react";
import { motion } from "framer-motion";

const SECTORS = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=90",
    icon: "🏠",
    title: "Hogar y Vivienda",
    features: ["Cámaras HD exteriores e interiores", "App móvil iOS y Android", "Sin cuotas mensuales", "Instalación en 1 día", "Garantía de por vida"],
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=90",
    icon: "🏢",
    title: "Negocio y Comercio",
    features: ["IA anti-falsas alarmas", "Grabación 24/7 continua", "Control de accesos integrado", "Compatible con Central Receptora", "Resolución 4K identificación"],
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=90",
    icon: "🏘️",
    title: "Comunidad de Vecinos",
    features: ["Portal, garaje y zonas comunes", "Gestión legal RGPD incluida", "Señalética homologada incluida", "NVR local seguro", "Acceso restringido al presidente"],
  },
  {
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=90",
    icon: "🚗",
    title: "Parking y Garajes",
    features: ["Reconocimiento de matrículas LPR", "Listas blancas y negras", "Apertura automática de barreras", "Control remoto 24/7", "Cámaras antivandálicas certificadas"],
  },
  {
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=90",
    icon: "🏭",
    title: "Nave Industrial y Empresa",
    features: ["Cámaras termográficas perimetrales", "Detección de intrusos por IA", "CCTV profesional certificado", "Integración con alarma y CRA", "Centro de control local o remoto"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function SectoresSection() {
  return (
    <section id="sectores" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ backgroundColor: "rgba(229,62,62,0.1)", color: "#E53E3E" }}>SOLUCIONES A MEDIDA</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A1A] mb-4">Una Solución para Cada Espacio</h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">Diseñamos cada instalación de forma personalizada — nunca soluciones genéricas</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTORS.map((s, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="group rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:border-[#E53E3E] hover:shadow-[0_8px_30px_rgba(229,62,62,0.15)] hover:-translate-y-1"
            >
              <div className="h-[200px] overflow-hidden">
                <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-6 sm:p-8">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-lg text-[#0A0A1A] mb-4">{s.title}</h3>
                <ul className="space-y-2 mb-5">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#E53E3E] font-bold mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contacto" className="text-[#E53E3E] font-bold text-sm hover:underline transition-colors duration-300">Ver solución →</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}