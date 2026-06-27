import React from "react";
import { motion } from "framer-motion";

export default function FinalCTABanner() {
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 lg:py-24" style={{ background: "linear-gradient(135deg, #E53E3E, #9B1C1C)" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">¿Listo para Proteger lo que más Importa?</h2>
        <p className="text-white/90 text-base sm:text-lg mb-10 max-w-2xl mx-auto">Presupuesto gratuito en menos de 24 horas · Sin compromiso · Instalación incluida</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToContact}
            className="px-8 py-4 rounded-xl bg-white text-[#E53E3E] font-bold text-base hover:bg-gray-100 transition-colors duration-300"
          >
            Presupuesto →
          </button>
          <a
            href="tel:+34638109947"
            className="px-8 py-4 rounded-xl border-2 border-white text-white font-bold text-base hover:bg-white/10 transition-colors duration-300"
          >
            📞 Llamar
          </a>
        </div>
      </motion.div>
    </section>
  );
}