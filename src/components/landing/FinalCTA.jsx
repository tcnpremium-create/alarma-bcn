import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

export default function FinalCTA() {
  const scrollToContact = () => {
    const contactForm = document.querySelector('[data-contact-form]');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-28 pb-28 sm:pb-20 lg:pb-28 bg-gradient-to-r from-[#E63946] via-[#d32f3c] to-[#c8282f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Instala tu sistema de seguridad hoy mismo
        </h2>
        <p className="text-base sm:text-lg text-white/90 mb-8 sm:mb-12 leading-relaxed">
          Presupuesto gratuito, sin compromiso. Instalación rápida y profesional. Soporte 24/7 incluido.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Button
            onClick={scrollToContact}
            className="w-full sm:w-auto bg-white hover:bg-gray-100 active:bg-gray-200 text-[#E63946] px-8 sm:px-10 py-5 sm:py-6 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
            style={{ touchAction: "manipulation" }}
          >
            Presupuesto →
          </Button>
          <a
            href="https://wa.me/34638109947"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white/20 hover:bg-white/30 active:bg-white/40 text-white px-8 sm:px-10 py-5 sm:py-6 rounded-xl font-bold text-base border border-white/40 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            style={{ touchAction: "manipulation" }}
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
          <a
            href="tel:+34638109947"
            className="w-full sm:w-auto bg-white/20 hover:bg-white/30 active:bg-white/40 text-white px-8 sm:px-10 py-5 sm:py-6 rounded-xl font-bold text-base border border-white/40 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            style={{ touchAction: "manipulation" }}
          >
            <Phone className="w-5 h-5" />
            Llamar
          </a>
        </div>

        <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-white/20">
          <p className="text-white/80 text-xs sm:text-sm">
            ✓ Instalación rápida • ✓ Sin sorpresas en el precio • ✓ Soporte técnico gratuito • ✓ Garantía oficial
          </p>
        </div>
      </div>
    </section>
  );
}