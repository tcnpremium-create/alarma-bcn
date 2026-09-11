import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";

export default function EnhancedHero() {
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full bg-black overflow-hidden pt-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=1600&h=900&fit=crop"
          alt="Seguridad profesional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8">
            <span className="w-2 h-2 bg-[#E63946] rounded-full animate-pulse"></span>
            <span className="text-sm text-white font-medium">Protección 24/7 en toda Catalunya</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Protegemos tu hogar o negocio con <span className="text-[#E63946]">tecnología de última generación</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
            Alarmas inteligentes, cámaras 4K, control de accesos e instalación certificada. Seguridad integral para toda Catalunya con respuesta 24/7.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 py-8 border-y border-white/10">
            <div>
              <div className="text-4xl font-bold text-[#E63946]">15+</div>
              <div className="text-sm text-gray-300">Años de experiencia</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#E63946]">2500+</div>
              <div className="text-sm text-gray-300">Clientes protegidos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#E63946]">24/7</div>
              <div className="text-sm text-gray-300">Soporte técnico</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={scrollToContact}
              className="bg-[#E63946] hover:bg-[#d32f3c] text-white px-8 py-6 rounded-lg font-bold text-base shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
            >
              Solicitar presupuesto
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a
              href="tel:+34638109947"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 rounded-lg font-bold text-base backdrop-blur-md border border-white/30 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              638 10 99 47
            </a>
            <a
              href="https://wa.me/34638109947"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 rounded-lg font-bold text-base backdrop-blur-md border border-white/30 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
  );
}