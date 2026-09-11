import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function TecnologiaTeaser() {
  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: "#0A0A1A" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5" style={{ backgroundColor: "rgba(229,62,62,0.15)", color: "#E53E3E" }}>
          <span className="w-2 h-2 bg-[#E53E3E] rounded-full animate-pulse" /> INNOVACIÓN
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">Tecnología Premium</h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-8">
          Inteligencia Artificial, resolución 4K, visión nocturna en color y control total desde tu móvil. Descubre por qué somos diferentes.
        </p>
        <Link
          to="/tecnologia"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#E53E3E] hover:bg-[#C53030] text-white font-bold text-base transition-colors duration-300"
        >
          Descubre nuestra tecnología
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
}