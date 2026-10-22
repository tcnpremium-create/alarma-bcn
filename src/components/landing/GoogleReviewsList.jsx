import React from "react";
import { businessStats } from "@/lib/businessStats";
import { GOOGLE_REVIEWS_URL, reviewsFor } from "@/data/googleReviews";

// Reseñas reales de Google para las páginas locales, con el mismo aspecto
// que los testimonios que sustituye. No se atribuyen a la ciudad de la
// página: son reseñas de la empresa.
export default function GoogleReviewsList({ topic = "general", count = 3, className = "space-y-4 mb-8" }) {
  return (
    <div className={className}>
      <p className="text-sm text-gray-500">
        Reseñas reales en Google · {businessStats.googleRating}/5 con {businessStats.googleReviewCount} opiniones ·{" "}
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="text-[#E63946] font-semibold">Ver todas</a>
      </p>
      {reviewsFor(topic, count).map((r, idx) => (
        <div key={r.name} className={`p-6 bg-white rounded-xl border-l-4 ${idx === 0 ? "border-[#E63946]" : "border-gray-300"}`}>
          <div className="flex items-center gap-1 mb-2" aria-label={`${r.stars} estrellas`}>
            {[...Array(r.stars)].map((_, i) => (
              <span key={i} className="text-[#E63946]" aria-hidden="true">★</span>
            ))}
          </div>
          <p className="text-gray-700 italic mb-3">"{r.text}"</p>
          <p className="text-sm font-semibold text-[#0A1628]">— {r.name}, reseña en Google ({r.date})</p>
        </div>
      ))}
    </div>
  );
}
