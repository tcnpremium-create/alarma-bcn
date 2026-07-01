import React from "react";

const REVIEWS = [
  { stars: 5, text: "Instalaron 4 cámaras HD en nuestra comunidad en un solo día. Todo perfecto, app configurada y precio cerrado desde el principio.", name: "Adam H.", location: "Sants, Barcelona" },
  { stars: 5, text: "Necesitaba cámaras para mi local sin cuotas mensuales. Vinieron el mismo día, en 2 horas funcionando desde el móvil.", name: "Carlos R.", location: "Eixample, Barcelona" },
  { stars: 5, text: "Buscaba instalador en Hospitalet y vinieron el mismo día. Presupuesto sin sorpresas, instalación impecable.", name: "Camila Y.", location: "Hospitalet" },
  { stars: 5, text: "Alarma Ajax en mi negocio. Profesionales, rápidos y sin letra pequeña. La app funciona perfectamente.", name: "Lorena M.", location: "Barcelona" },
  { stars: 5, text: "Cámaras para el portal y azotea de nuestra comunidad. RGPD gestionado por ellos. Muy recomendables.", name: "Oier K.", location: "Barcelona" },
];

const ZONES = ["Eixample", "Gràcia", "Sarrià-Sant Gervasi", "Sants-Montjuïc", "Les Corts", "Hospitalet", "Badalona", "Sant Cugat", "Terrassa", "Sabadell", "Cornellà", "Esplugues", "Gavà", "Castelldefels"];

function Stars({ count }) {
  return (
    <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ stars, text, name, location }) {
  return (
    <article style={{
      minWidth: 272, maxWidth: 272, marginRight: 14,
      background: "linear-gradient(135deg, #0e1727 0%, #0a0f1a 100%)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16,
      padding: "20px 20px 18px",
      flexShrink: 0,
    }}>
      <Stars count={stars} />
      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.65, marginBottom: 14, minHeight: 60 }}>
        "{text}"
      </p>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(135deg, #E53E3E, #C53030)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0,
        }}>
          {name.split(" ").map(w => w[0]).join("").slice(0, 2)}
        </div>
        <div>
          <p style={{ color: "#fff", fontSize: 13, fontWeight: 700, margin: 0 }}>{name}</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: 0, marginTop: 2 }}>{location}</p>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" style={{ marginLeft: "auto", flexShrink: 0 }} aria-label="Google">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>
    </article>
  );
}

export default function MarqueeSocial() {
  const doubled = [...REVIEWS, ...REVIEWS];
  const quadZones = [...ZONES, ...ZONES, ...ZONES, ...ZONES];

  return (
    <section style={{ background: "#060e1a", padding: "64px 0", overflow: "hidden" }}>
      <style>{`
        @keyframes mq-fwd  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes mq-rev  { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .mq-reviews { animation: mq-fwd 30s linear infinite; }
        .mq-reviews:hover { animation-play-state: paused; }
        .mq-zones   { animation: mq-rev 22s linear infinite; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36, padding: "0 20px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ color: "#F59E0B", fontSize: 18, letterSpacing: 2 }}>★★★★★</span>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 22 }}>4.8</span>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>/ 5 en Google</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: 0 }}>
          Más de 200 instalaciones en Barcelona y área metropolitana
        </p>
      </div>

      {/* Reviews track */}
      <div style={{ overflow: "hidden", marginBottom: 14 }}>
        <div className="mq-reviews" style={{ display: "flex", width: "max-content", padding: "4px 0" }}>
          {doubled.map((r, i) => <ReviewCard key={i} {...r} />)}
        </div>
      </div>

      {/* Zone badges track (reverse) */}
      <div style={{ overflow: "hidden", marginBottom: 36 }}>
        <div className="mq-zones" style={{ display: "flex", gap: 10, width: "max-content", padding: "4px 0" }}>
          {quadZones.map((zone, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(0,210,255,0.05)", border: "1px solid rgba(0,210,255,0.15)",
              borderRadius: 20, padding: "6px 16px",
              color: "rgba(0,210,255,0.65)", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00D4FF", display: "inline-block" }} />
              {zone}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "0 20px" }}>
        <a
          href="https://share.google/trjJFOqRhcldWdEbg"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 26px",
            border: "1px solid rgba(0,210,255,0.22)", borderRadius: 50,
            color: "rgba(255,255,255,0.72)", fontSize: 14, fontWeight: 700,
            textDecoration: "none", background: "rgba(0,210,255,0.04)",
            transition: "border-color 0.2s",
          }}
        >
          Ver todas las reseñas en Google →
        </a>
      </div>
    </section>
  );
}
