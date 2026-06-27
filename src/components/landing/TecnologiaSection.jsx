import React from "react";
import { motion } from "framer-motion";

const CARDS = [
  {
    image: "https://images.unsplash.com/photo-1585206031650-9e9a7c87dcfe?w=1200&q=90",
    badge: "CERO FALSAS ALARMAS",
    icon: "🤖",
    title: "Inteligencia Artificial",
    text: "Detecta personas y vehículos automáticamente. Filtra lluvia, hojas y animales. Solo alertas reales cuando importa.",
  },
  {
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&q=90",
    badge: "MÍNIMO 2K GARANTIZADO",
    icon: "📹",
    title: "Resolución 4K Ultra HD",
    text: "Mínimo 4MPx (2K). Disponible en 5MP, 4K y 8K. Identifica rostros y matrículas con total claridad, de día y de noche.",
  },
  {
    image: "https://images.unsplash.com/photo-1549109926-58f039549485?w=1200&q=90",
    badge: "OSCURIDAD TOTAL",
    icon: "🌙",
    title: "Visión Nocturna en Color",
    text: "Color real en oscuridad total mediante IA. No solo infrarrojo. Cámaras termográficas disponibles para máxima seguridad perimetral.",
  },
  {
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=90",
    badge: "iOS Y ANDROID",
    icon: "📱",
    title: "Control 24/7 desde el Móvil",
    text: "App profesional. Visualización en directo, grabaciones, alertas instantáneas y control total desde cualquier lugar del mundo.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function TecnologiaSection() {
  return (
    <section id="tecnologia" className="py-20 lg:py-28" style={{ backgroundColor: "#0A0A1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: "rgba(229,62,62,0.15)", color: "#E53E3E" }}>
            <span className="w-2 h-2 bg-[#E53E3E] rounded-full animate-pulse" /> TECNOLOGÍA PREMIUM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-5 mb-4">Tecnología que Trabaja por Ti</h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">Sistemas de última generación con Inteligencia Artificial integrada</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CARDS.map((card, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{ height: 380 }}
            >
              <img src={card.image} alt={card.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)" }} />
              <div className="absolute inset-0 rounded-2xl transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(229,62,62,0.4)] group-hover:ring-1 group-hover:ring-[#E53E3E]/50" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white mb-3" style={{ backgroundColor: "rgba(229,62,62,0.9)" }}>{card.badge}</span>
                <div className="text-2xl mb-1">{card.icon}</div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-1">{card.title}</h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}