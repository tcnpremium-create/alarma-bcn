import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, Star } from "lucide-react";
import HeroContactModal from "./HeroContactModal";

export default function HeroProf({ onOpenModal }) {
  return (
    <section
      aria-label="Hero - Seguridad para tu hogar en Barcelona"
      className="relative w-full overflow-hidden pt-16 sm:pt-20"
      style={{
        height: "90vh",
        maxHeight: "90vh",
        backgroundColor: "#0a0f1a",
        backgroundImage: "url('/images/hero-intruder.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* Video layer — plays over the photo when available */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, right: 0, bottom: 0, left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.7,
          zIndex: 1,
        }}
      >
        <source src="https://pub-c09bc177726a4cf0b240409a82635955.r2.dev/casa-protegida.mp4" type="video/mp4" />
      </video>

      {/* 45% dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, right: 0, bottom: 0, left: 0,
          background: "rgba(10, 15, 26, 0.45)",
          zIndex: 2,
        }}
      />

      {/* Left-side gradient for text readability */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, right: 0, bottom: 0, left: 0,
          background: "linear-gradient(90deg, rgba(10,15,26,0.72) 0%, rgba(10,15,26,0.35) 55%, rgba(10,15,26,0.05) 100%)",
          zIndex: 3,
        }}
      />

      {/* Content */}
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col justify-center h-full pb-16 sm:pb-0"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="max-w-2xl">

          {/* Perimeter active badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E53E3E] animate-pulse" />
            <span className="text-[11px] sm:text-xs text-white/90 font-bold tracking-widest uppercase">
              Zonificación Perimetral Activa
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[30px] leading-[1.1] sm:text-5xl lg:text-[3.5rem] font-black text-white mb-5 tracking-tight">
            Tu Hogar Blindado<br />
            <span className="text-[#E53E3E]">Sin Cuotas Mensuales</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] leading-[1.7] sm:text-lg text-white/90 mb-6 max-w-xl font-medium">
            Seguridad activa con cámaras 4K e Inteligencia Artificial. Recibe alertas en tu móvil antes de que toquen tu puerta, sin facturas eternas.
          </p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mb-7 py-4 border-y border-white/20">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#E53E3E]">2.500+</div>
              <div className="text-[11px] sm:text-xs text-white/70 mt-0.5 font-medium uppercase tracking-wide">Sistemas Activos</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#E53E3E]">24/7</div>
              <div className="text-[11px] sm:text-xs text-white/70 mt-0.5 font-medium uppercase tracking-wide">Cero Vulnerabilidad</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#E53E3E]">15s</div>
              <div className="text-[11px] sm:text-xs text-white/70 mt-0.5 font-medium uppercase tracking-wide">Respuesta</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <Button
              onClick={() => onOpenModal && onOpenModal()}
              className="w-full sm:w-auto bg-[#E53E3E] hover:bg-[#C53030] active:bg-[#9B2C2C] text-white px-8 py-6 rounded-full font-bold text-base shadow-2xl hover:shadow-[#E53E3E]/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ minHeight: 52 }}
            >
              Solicitar Presupuesto Gratis →
            </Button>
            <a
              href="tel:+34638109947"
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-[#1A1A2E] px-6 py-6 rounded-full font-bold text-base border border-gray-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ minHeight: 52 }}
            >
              <Phone className="w-4 h-4 text-[#E53E3E]" />
              Llamar Ahora
            </a>
          </div>

          {/* Google Maps reviews badge */}
          <a
            href="https://share.google/trjJFOqRhcldWdEbg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-4 py-2.5 rounded-full border border-white/20 transition-all duration-200 group"
          >
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
            <span className="text-yellow-400 font-bold text-sm">4.8</span>
            <span className="text-white/50 text-xs">|</span>
            <span className="text-white/80 text-xs">13 opiniones verificadas de vecinos de Barcelona</span>
            <span className="text-white/50 text-xs group-hover:text-white/80 transition-colors ml-1">Ver en Google →</span>
          </a>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to top, white, transparent)", zIndex: 11 }}
      />
    </section>
  );
}
