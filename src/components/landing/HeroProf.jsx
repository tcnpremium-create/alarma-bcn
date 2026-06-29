import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import useCountUp from "@/hooks/useCountUp";
import useScrollReveal from "@/hooks/useScrollReveal";
import HeroContactModal from "./HeroContactModal";

const TABS = [
  {
    id: "camaras",
    shortLabel: "Cámaras",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/768a8c455_IMG_8651.jpeg",
    badge: "VIDEOVIGILANCIA PROFESIONAL",
    title: <>Instalación de Cámaras de Seguridad en <span className="text-[#E53E3E]">Barcelona</span></>,
    subtitle: "Cámaras 4K con IA, visión nocturna en color y control desde tu móvil. Hikvision, Dahua y Ajax. Sin cuotas mensuales. Instalación incluida.",
    cta: "Presupuesto",
  },
  {
    id: "alarmas",
    shortLabel: "Alarmas",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/09fa8cb8c_IMG_8738.jpeg",
    badge: "PROTECCIÓN 24/7",
    title: <>Alarmas Inteligentes para tu <span className="text-[#E53E3E]">Hogar y Negocio</span></>,
    subtitle: "Sistemas AJAX certificados con detección perimetral, sensores de movimiento y respuesta inmediata. Instalación profesional en 24h sin obras.",
    cta: "Presupuesto",
  },
  {
    id: "accesos",
    shortLabel: "Accesos",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/e318f18f7_IMG_8740.jpg",
    badge: "ACCESO INTELIGENTE",
    title: <>Control de Accesos <span className="text-[#E53E3E]">Inteligente</span></>,
    subtitle: "Videoporteros IP, cerraduras inteligentes y lectores biométricos. Gestiona quién entra y sale desde tu smartphone, estés donde estés.",
    cta: "Presupuesto",
  },
];

function AnimatedStat({ end, duration, suffix, label, trigger }) {
  const count = useCountUp(end, duration, trigger);
  return (
    <div>
      <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#E53E3E]">{count}{suffix}</div>
      <div className="text-[11px] sm:text-sm text-white/70 mt-1 font-medium">{label}</div>
    </div>
  );
}

export default function HeroProf({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState(0);
  const [statsRef, statsVisible] = useScrollReveal(0.3);

  const tab = TABS[activeTab];

  return (
    <section
      aria-label="Hero - Servicios de seguridad en Barcelona"
      className="relative w-full bg-[#1A1A2E] overflow-hidden pt-16 sm:pt-20"
      style={{ height: "90vh", maxHeight: "90vh" }}
    >
      {/* Video background base layer */}
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
          opacity: 0.65,
          zIndex: 1,
        }}
      >
        <source src="https://pub-c09bc177726a4cf0b240409a82635955.r2.dev/casa-protegida.mp4" type="video/mp4" />
      </video>

      {/* Background images with crossfade — layered over video */}
      <div className="absolute inset-0" aria-hidden="true" style={{ zIndex: 2 }}>
        {TABS.map((t, idx) => (
          <img
            key={t.id}
            src={t.image}
            alt=""
            loading={idx === 0 ? "eager" : "lazy"}
            fetchpriority={idx === 0 ? "high" : undefined}
            decoding="async"
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
              opacity: activeTab === idx ? 1 : 0,
              transition: "opacity 800ms ease-in-out",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/80 via-[#1A1A2E]/50 to-transparent" style={{ zIndex: 3 }} />

      {/* Radar animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true" style={{ zIndex: 4 }}>
        <div className="relative">
          <div className="w-2 h-2 bg-[#E53E3E] rounded-full relative z-10" />
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{
                width: 300, height: 300,
                borderColor: "rgba(229, 62, 62, 0.35)",
                animation: `radarPulse 2.5s ${i * 0.8}s ease-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content — pb-16 on mobile so Llamar button clears the WhatsApp bar */}
      <div className="mx-auto px-4 py-8 relative max-w-7xl sm:px-6 lg:px-8 sm:py-20 lg:py-28 flex flex-col justify-center h-full pb-16 sm:pb-0" style={{ zIndex: 10 }}>
        <div className="max-w-3xl">
          {/* Service Tabs */}
          <div className="flex gap-2 mb-5">
            {TABS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border ${
                  activeTab === idx
                    ? "bg-[#E53E3E] border-[#E53E3E] text-white shadow-lg shadow-[#E53E3E]/30"
                    : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20"
                }`}
              >
                {t.shortLabel}
              </button>
            ))}
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 mb-4 sm:mb-5">
            <span className="w-2 h-2 bg-[#E53E3E] rounded-full animate-pulse" />
            <span className="text-[11px] sm:text-xs text-white/90 font-semibold tracking-wide uppercase">{tab.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-[28px] leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-5 tracking-tight">
            {tab.title}
          </h1>

          {/* Subtitle */}
          <p className="text-[14px] leading-[1.6] sm:text-lg lg:text-xl text-white/95 mb-5 sm:mb-7 max-w-2xl font-medium">
            {tab.subtitle}
          </p>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap gap-5 sm:gap-8 lg:gap-10 mb-6 sm:mb-8 py-4 sm:py-5 border-y border-white/20">
            <AnimatedStat end={2500} duration={2000} suffix="+" label="Sistemas activos" trigger={statsVisible} />
            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#E53E3E]">24/7</div>
              <div className="text-[11px] sm:text-sm text-white/70 mt-1 font-medium">Monitoreo continuo</div>
            </div>
            <AnimatedStat end={15} duration={1500} suffix="+" label="Años experiencia" trigger={statsVisible} />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => onOpenModal && onOpenModal()}
              className="bg-[#E53E3E] hover:bg-[#C53030] active:bg-[#9B2C2C] text-white px-7 sm:px-8 py-6 rounded-full font-bold text-base sm:text-lg shadow-2xl hover:shadow-[#E53E3E]/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group" style={{ minHeight: 52 }}
            >
              Presupuesto →
            </Button>
            <a
              href="tel:+34638109947"
              className="bg-white hover:bg-gray-100 text-[#1A1A2E] px-6 sm:px-7 py-6 rounded-full font-bold text-base border border-gray-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2" style={{ minHeight: 52 }}
            >
              <Phone className="w-4 h-4 text-[#E53E3E]" />
              Llamar
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}
