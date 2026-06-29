import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  { stars: 5, text: "Instalaron 4 cámaras HD en nuestra comunidad en un solo día. Todo perfecto, app configurada y precio cerrado desde el principio.", name: "Adam H.", location: "Sants, Barcelona", initials: "AH" },
  { stars: 5, text: "Necesitaba cámaras para mi local sin cuotas mensuales. Vinieron el mismo día, me explicaron todo y en 2 horas funcionando desde el móvil.", name: "Carlos R.", location: "Eixample, Barcelona", initials: "CR" },
  { stars: 5, text: "Buscaba instalador en Hospitalet y vinieron el mismo día. Presupuesto sin sorpresas, instalación impecable. 100% recomendable.", name: "Camila Y.", location: "Hospitalet", initials: "CY" },
  { stars: 5, text: "Instalación de alarma Ajax en mi negocio. Profesionales, rápidos y sin letra pequeña. La app funciona perfectamente.", name: "Lorena M.", location: "Barcelona", initials: "LM" },
  { stars: 5, text: "Cámaras para el portal y azotea de nuestra comunidad. RGPD gestionado por ellos, sin preocupaciones. Muy recomendables.", name: "Oier K.", location: "Barcelona", initials: "OK" },
];

function GoogleG() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8 }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#22C55E" />
        <path d="M7 12.5L10.5 16L17 8.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: 11, color: "#16A34A", fontWeight: 600, letterSpacing: 0.1 }}>Reseña verificada</span>
      <GoogleG />
    </div>
  );
}

export default function GoogleReviews() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0A0A1A" }}>
            ⭐⭐⭐⭐⭐ Nuestros clientes opinan
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            4.8/5 · Más de 13 reseñas verificadas en Google
          </p>
        </div>

        <div className="relative">
          <button onClick={() => scroll(-1)} className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center hover:bg-gray-50">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={() => scroll(1)} className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center hover:bg-gray-50">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
            {REVIEWS.map((r, i) => (
              <div key={i} className="flex-shrink-0 w-[300px] bg-white p-5 flex flex-col" style={{ borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", scrollSnapAlign: "start" }}>
                <div className="text-yellow-400 text-lg mb-3">{"⭐".repeat(r.stars)}</div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">"{r.text}"</p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: "#E53E3E" }}>
                    {r.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.location}</p>
                    <VerifiedBadge />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="https://share.google/qLHzQDlIaunfZJUQf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#E53E3E] text-[#E53E3E] rounded-full font-bold text-sm hover:bg-[#E53E3E] hover:text-white transition-colors"
          >
            Ver todas las reseñas en Google →
          </a>
        </div>
      </div>
    </section>
  );
}
