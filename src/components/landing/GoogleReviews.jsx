import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  { stars: 5, text: "Instalaron 4 cámaras HD en nuestra comunidad en un solo día. Todo perfecto, app configurada y precio cerrado desde el principio.", name: "Adam H.", location: "Sants, Barcelona", initials: "AH" },
  { stars: 5, text: "Necesitaba cámaras para mi local sin cuotas mensuales. Vinieron el mismo día, me explicaron todo y en 2 horas funcionando desde el móvil.", name: "Carlos R.", location: "Eixample, Barcelona", initials: "CR" },
  { stars: 5, text: "Buscaba instalador en Hospitalet y vinieron el mismo día. Presupuesto sin sorpresas, instalación impecable. 100% recomendable.", name: "Camila Y.", location: "Hospitalet", initials: "CY" },
  { stars: 5, text: "Instalación de alarma Ajax en mi negocio. Profesionales, rápidos y sin letra pequeña. La app funciona perfectamente.", name: "Lorena M.", location: "Barcelona", initials: "LM" },
  { stars: 5, text: "Cámaras para el portal y azotea de nuestra comunidad. RGPD gestionado por ellos, sin preocupaciones. Muy recomendables.", name: "Oier K.", location: "Barcelona", initials: "OK" },
];

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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.google.com/maps/search/Premium+Tech+Security+Barcelona"
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