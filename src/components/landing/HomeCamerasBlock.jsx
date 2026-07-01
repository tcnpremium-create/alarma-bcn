import React from "react";

const cctvCss = `
  @keyframes rec-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  @keyframes cam-h-scan {
    0%   { top: -2px; }
    100% { top: 100%; }
  }
`;

export default function HomeCamerasBlock({ onOpenModal }) {
  return (
    <section style={{ backgroundColor: "#060e1a", padding: "40px 20px", position: "relative", overflow: "hidden" }}>
      <style>{cctvCss}</style>

      {/* CCTV scan line overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Horizontal laser beam — sweeps top → bottom and bounces */}
      <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, pointerEvents: "none", zIndex: 1 }}>
        <div style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(to right, transparent 0%, rgba(239,68,68,0.15) 10%, rgba(239,68,68,0.45) 35%, rgba(239,68,68,0.7) 50%, rgba(239,68,68,0.45) 65%, rgba(239,68,68,0.15) 90%, transparent 100%)",
          filter: "blur(1px)",
          boxShadow: "0 0 8px 2px rgba(239,68,68,0.3)",
          animation: "cam-h-scan 4s ease-in-out infinite alternate",
        }} />
      </div>

      {/* REC badge */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 14, right: 16, zIndex: 3,
          display: "flex", alignItems: "center", gap: 5,
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
          border: "1px solid rgba(239,68,68,0.5)", borderRadius: 6,
          padding: "4px 10px",
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#EF4444", display: "inline-block", animation: "rec-blink 1.2s step-start infinite" }} />
        <span style={{ color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: "0.12em" }}>REC</span>
      </div>

      <div className="max-w-2xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ height: 4, backgroundColor: "#E53E3E", width: "100%", marginBottom: 24, boxShadow: "0 0 10px rgba(239,68,68,0.6)" }} />

        <span
          style={{
            display: "inline-block",
            backgroundColor: "#E53E3E",
            color: "#fff",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 800,
            padding: "6px 14px",
            marginBottom: 12,
          }}
        >
          📹 CÁMARAS DE SEGURIDAD · BARCELONA
        </span>

        <h2 style={{ fontWeight: 900, fontSize: 28, color: "#FFFFFF", lineHeight: 1.15, margin: 0 }}>
          Deja de preocuparte. Vigila todo en 4K desde tu móvil.
        </h2>

        <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.7, marginTop: 14 }}>
          No dejes que los delincuentes elijan tu propiedad. Nuestras cámaras con Inteligencia Artificial detectan intrusos en tiempo real y te avisan al instante. Imagen cristalina en 4K, visión nocturna en color y grabación continua. Instalación profesional incluida. Sin cuotas mensuales.
        </p>

        {/* Pills */}
        <div style={{ display: "flex", gap: 8, marginTop: 16, overflowX: "auto", paddingBottom: 4 }}>
          {["🤖 IA Activa", "📹 4K HD", "🌙 Nocturna Color", "📱 App 24/7", "🛡️ Sin cuotas"].map((pill) => (
            <span
              key={pill}
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#E2E8F0",
                borderRadius: 20,
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: 700,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {pill}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
          <button
            onClick={() => onOpenModal("Cámaras de seguridad")}
            style={{
              width: "100%",
              backgroundColor: "#E53E3E",
              color: "#fff",
              fontWeight: 800,
              fontSize: 16,
              borderRadius: 50,
              padding: 18,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 16px rgba(239,68,68,0.35)",
            }}
          >
            Presupuesto →
          </button>
          <a
            href="tel:+34615774532"
            style={{
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              fontWeight: 800,
              fontSize: 16,
              borderRadius: 50,
              padding: 18,
              textAlign: "center",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxSizing: "border-box",
            }}
          >
            📞 Llamar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
