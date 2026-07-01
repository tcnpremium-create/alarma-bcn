import React from "react";

const laserCss = `
  @keyframes beam-flicker {
    0%, 92%, 100% { opacity: 1; }
    93%            { opacity: 0.5; }
    95%            { opacity: 1; }
    97%            { opacity: 0.65; }
  }
  @keyframes emitter-pulse {
    0%, 100% { box-shadow: 0 0 5px 2px rgba(239,68,68,0.9), 0 0 12px 4px rgba(239,68,68,0.4); }
    50%       { box-shadow: 0 0 3px 1px rgba(239,68,68,0.6), 0 0 6px 2px rgba(239,68,68,0.2); }
  }
  @keyframes scan-sweep {
    0%   { top: 3%; }
    100% { top: 95%; }
  }
  @keyframes corner-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.25; }
  }
`;

const BEAMS = [
  { top: "20%", delay: "0s",   width: "70%", dur: 7  },
  { top: "50%", delay: "0.5s", width: "86%", dur: 10 },
  { top: "78%", delay: "1s",   width: "58%", dur: 13 },
];

export default function HomeAlarmsBlock({ onOpenModal }) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "44px 20px 40px",
        backgroundImage: "url('/images/ajax-alarm-hero.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <style>{laserCss}</style>

      {/* Overlay — dark enough for readability, light enough to see the image */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(170deg, rgba(4,6,18,0.72) 0%, rgba(6,4,14,0.62) 45%, rgba(4,6,18,0.76) 100%)",
      }} />
      {/* Bottom gradient to avoid abrupt cut */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 120, zIndex: 0,
        background: "linear-gradient(to bottom, transparent, rgba(4,6,18,0.90))",
      }} />

      {/* ── PERIMETER LASER BEAMS ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>

        {BEAMS.map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: b.top,
              left: 0, right: 0,
              display: "flex",
              alignItems: "center",
              animation: `beam-flicker ${b.dur}s ${b.delay} ease-in-out infinite`,
            }}
          >
            {/* Emitter */}
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              backgroundColor: "#ef4444", flexShrink: 0,
              marginLeft: "4%",
              animation: `emitter-pulse ${1.8 + i * 0.5}s ease-in-out infinite`,
            }} />
            {/* Beam */}
            <div style={{
              width: b.width, height: 1.5,
              background: "linear-gradient(to right, rgba(239,68,68,0.95) 0%, rgba(239,68,68,0.65) 55%, rgba(239,68,68,0.2) 85%, transparent 100%)",
              boxShadow: "0 0 5px 1px rgba(239,68,68,0.55), 0 0 12px 2px rgba(239,68,68,0.2)",
              flexShrink: 0,
            }} />
            {/* Receiver */}
            <div style={{
              width: 4, height: 4, borderRadius: "50%",
              backgroundColor: "rgba(239,68,68,0.45)",
              flexShrink: 0, marginLeft: 5,
              animation: `corner-blink ${2 + i * 0.6}s ease-in-out infinite`,
            }} />
          </div>
        ))}

        {/* Scanning sweep beam */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 2,
          background: "linear-gradient(to right, transparent 0%, rgba(239,68,68,0.12) 8%, rgba(239,68,68,0.42) 35%, rgba(239,68,68,0.60) 50%, rgba(239,68,68,0.42) 65%, rgba(239,68,68,0.12) 92%, transparent 100%)",
          filter: "blur(1.5px)",
          boxShadow: "0 0 10px 3px rgba(239,68,68,0.22)",
          animation: "scan-sweep 5.5s ease-in-out infinite alternate",
        }} />

        {/* Corner sensor indicators */}
        {[
          { top: 10, left: 10 }, { top: 10, right: 10 },
          { bottom: 10, left: 10 }, { bottom: 10, right: 10 },
        ].map((pos, i) => (
          <div key={i} style={{
            position: "absolute", ...pos,
            width: 9, height: 9, borderRadius: "50%",
            border: "1.5px solid rgba(239,68,68,0.65)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: 3.5, height: 3.5, borderRadius: "50%",
              backgroundColor: "#ef4444",
              animation: `emitter-pulse ${1.5 + i * 0.35}s ${i * 0.45}s ease-in-out infinite`,
            }} />
          </div>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-2xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        <span
          style={{
            display: "inline-block",
            backgroundColor: "#E53E3E",
            color: "#fff",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 800,
            padding: "6px 14px",
          }}
        >
          🔔 SISTEMAS DE ALARMA · BARCELONA
        </span>

        <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 28, lineHeight: 1.15, marginTop: 12 }}>
          Blindaje total 24/7. Reaccionamos antes de que entren.
        </h2>

        <p style={{ color: "#D1D5DB", fontSize: 16, lineHeight: 1.7, marginTop: 14 }}>
          Los okupas y ladrones eligen propiedades desprotegidas. La tuya no será una de ellas. Nuestra alarma conectada detecta la intrusión y en menos de 15 segundos nuestra Central Receptora lo verifica y avisa a la Policía. Blindada contra inhibidores de señal. Instalación certificada. Sin permanencia.
        </p>

        {/* Impact card */}
        <div style={{
          backgroundColor: "rgba(229,62,62,0.10)",
          border: "1px solid rgba(229,62,62,0.4)",
          borderRadius: 16, padding: 20, marginTop: 20,
          display: "flex", alignItems: "center", gap: 16,
          backdropFilter: "blur(8px)",
        }}>
          <div style={{
            backgroundColor: "#E53E3E", borderRadius: 12, padding: 14,
            flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <p style={{ color: "#E53E3E", fontWeight: 900, fontSize: 32, lineHeight: 1, margin: 0 }}>15s</p>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: 16, margin: 0 }}>Respuesta garantizada</p>
            <p style={{ color: "#9CA3AF", fontSize: 13, margin: 0 }}>Central Receptora activa · Aviso inmediato a Policía</p>
          </div>
        </div>

        {/* Trust pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          {["✓ Sin permanencia", "✓ Instalación incluida", "✓ Sin cuotas", "✓ Certificada"].map((p) => (
            <span key={p} style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(4px)",
              color: "#fff", borderRadius: 10,
              padding: "6px 12px", fontSize: 12,
            }}>
              {p}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
          <button
            onClick={() => onOpenModal("Sistema de alarma")}
            style={{
              width: "100%", backgroundColor: "#E53E3E", color: "#fff",
              fontWeight: 800, fontSize: 16, borderRadius: 50, padding: 18,
              border: "none", cursor: "pointer",
              boxShadow: "0 0 22px rgba(229,62,62,0.45)",
            }}
          >
            Blindar mi propiedad ahora →
          </button>
          <a
            href="tel:+34615774532"
            style={{
              width: "100%", backgroundColor: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(6px)", color: "#fff", fontWeight: 800,
              fontSize: 16, borderRadius: 50, padding: 18,
              border: "1px solid rgba(255,255,255,0.18)", textAlign: "center",
              textDecoration: "none", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8, boxSizing: "border-box",
            }}
          >
            📞 Llamar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
