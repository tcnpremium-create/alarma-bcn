import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";

export default function PromoOriginal() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0A1628] to-[#1a2f4a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#E63946]/20 flex items-center justify-center">
            <Tag className="w-8 h-8 text-[#E63946]" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
          ¡Mira Nuestras Promociones!
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
          Kits completos de videovigilancia con instalación profesional incluida. Precio cerrado sin sorpresas. IVA no incluido.
        </p>
        <Link
          to="/Promociones"
          className="inline-flex items-center gap-3 bg-[#E63946] hover:bg-[#d32f3c] text-white font-bold text-lg rounded-full px-8 py-4 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Ver todas las promociones
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}