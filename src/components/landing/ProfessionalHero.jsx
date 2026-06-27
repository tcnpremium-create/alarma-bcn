import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function ProfessionalHero() {
  const scrollToContact = () => {
    const contactForm = document.querySelector('[data-contact-form]');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full pt-20 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#1a2a3a]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E63946] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
        {/* Contenido izquierdo */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="w-2 h-2 bg-[#E63946] rounded-full"></span>
            <span className="text-sm text-white font-medium">Protección 24/7 en toda Catalunya</span>
          </div>

          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Protege tu hogar y negocio con <span className="text-[#E63946]">seguridad profesional</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Sistemas de alarmas, videovigilancia y control de accesos instalados por expertos. Tecnología AJAX, Hikvision y Dahua. Disponible en Barcelona, Hospitalet, Badalona y toda Catalunya.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={scrollToContact}
              className="bg-[#E63946] hover:bg-[#d32f3c] text-white px-8 py-6 rounded-lg font-bold text-base shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 group"
            >
              Solicitar presupuesto
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-6 rounded-lg font-bold text-base backdrop-blur-md border border-white/30 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
            <div>
              <div className="text-3xl font-bold text-[#E63946]">15+</div>
              <div className="text-sm text-gray-400">Años protegiendo</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#E63946]">2500+</div>
              <div className="text-sm text-gray-400">Clientes confían</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#E63946]">24/7</div>
              <div className="text-sm text-gray-400">Soporte técnico</div>
            </div>
          </div>
        </div>

        {/* Imagen derecha */}
        <div className="hidden lg:block relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=600&h=700&fit=crop"
              alt="Seguridad profesional"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}