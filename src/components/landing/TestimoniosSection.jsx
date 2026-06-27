import React from "react";
import { motion } from "framer-motion";

const REVIEWS = [
  {
    quote: "Instalaron 4 cámaras HD en nuestra comunidad en un solo día. App configurada, sin obras, precio cerrado desde el principio. Totalmente profesionales.",
    initials: "AH",
    name: "Adam H.",
    role: "Comunidad de vecinos · Sants-Montjuïc, Barcelona",
  },
  {
    quote: "Necesitaba videovigilancia para mi local sin cuotas mensuales. Me lo explicaron todo sin tecnicismos, instalaron el sistema y en 2 horas lo tenía funcionando desde el móvil.",
    initials: "CR",
    name: "Carlos R.",
    role: "Propietario de negocio · Eixample, Barcelona",
  },
  {
    quote: "Busqué instalador de cámaras en Hospitalet y vinieron el mismo día. Presupuesto sin sorpresas, instalación impecable y calidad excelente. Los recomiendo al 100%.",
    initials: "CY",
    name: "Camila Y.",
    role: "Hogar · L'Hospitalet de Llobregat",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
};

export default function TestimoniosSection() {
  return (
    <section id="opiniones" className="py-20 lg:py-28" style={{ backgroundColor: "#0A0A1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
          <div className="text-2xl mb-3">⭐⭐⭐⭐⭐</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">Lo que Dicen Nuestros Clientes</h2>
          <p className="text-gray-400 text-base sm:text-lg">Más de 13 reseñas verificadas en Google · Valoración media 4.8/5</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible">
          {REVIEWS.map((r, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-w-[280px]"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div>
                <div className="text-[#E53E3E] text-sm mb-4">★★★★★</div>
                <p className="text-white/90 italic text-sm sm:text-base leading-relaxed mb-6">"{r.quote}"</p>
              </div>
              <div>
                <div className="h-px bg-white/10 mb-5" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E53E3E] flex items-center justify-center text-white font-bold text-sm">{r.initials}</div>
                  <div>
                    <div className="text-white font-bold text-sm">{r.name}</div>
                    <div className="text-gray-400 text-xs">{r.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-12">
          <a
            href="https://www.google.com/maps/search/Premium+Tech+Security+Barcelona"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-colors duration-300"
          >
            Ver todas las reseñas en Google →
          </a>
        </motion.div>
      </div>
    </section>
  );
}