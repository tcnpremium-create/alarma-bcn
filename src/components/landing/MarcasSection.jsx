import React from "react";
import { motion } from "framer-motion";

const BRANDS = ["HIKVISION", "DAHUA", "AJAX SYSTEMS", "AXIS"];
const STATS = [
  { value: "2K · 4K · 8K", label: "Resoluciones disponibles" },
  { value: "Hasta 16TB", label: "Almacenamiento NVR local" },
  { value: "WiFi · PoE · 4G", label: "Tipos de conectividad" },
];
const TAGS = ["Hikvision", "Dahua", "Ajax Systems", "Axis", "Hanwha", "Uniview", "Dahua WizSense", "Hikvision AcuSense"];

export default function MarcasSection() {
  return (
    <section id="marcas" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600 mb-4">TECNOLOGÍA CERTIFICADA</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A1A] mb-4">Trabajamos con las Mejores Marcas</h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">Instalación profesional con equipos de primera línea mundial</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-12">
          {BRANDS.map((b) => (
            <span key={b} className="px-5 sm:px-7 py-3 rounded-full text-white font-bold text-sm sm:text-base" style={{ backgroundColor: "#111827" }}>{b}</span>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {STATS.map((s, i) => (
            <div key={i} className="rounded-2xl p-6 sm:p-8 text-center" style={{ backgroundColor: "#F8F9FA" }}>
              <div className="text-xl sm:text-2xl font-black text-[#E53E3E] mb-2">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {TAGS.map((t) => (
            <span key={t} className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-xs sm:text-sm font-medium hover:border-[#E53E3E] hover:text-[#E53E3E] transition-colors duration-300">{t}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}