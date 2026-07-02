import React from "react";

const css = `
  /* ── Scan lines overlay ── */
  .alarms-scanlines::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 3px,
      rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
    );
    pointer-events: none;
    z-index: 1;
  }

  /* ── REC badge blink ── */
  @keyframes rec-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  /* ── Horizontal perimeter scanner ── */
  @keyframes perimeter-scan {
    0%   { top: 0%; }
    100% { top: 100%; }
  }

  /* ── Emitter pulse ── */
  @keyframes emitter-glow {
    0%, 100% { box-shadow: 0 0 6px 2px rgba(239,68,68,0.9), 0 0 14px 4px rgba(239,68,68,0.45); }
    50%       { box-shadow: 0 0 3px 1px rgba(239,68,68,0.6), 0 0 7px 2px rgba(239,68,68,0.2); }
  }

  /* ── Card hover glow ── */
  .alarm-card-glow {
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .alarm-card-glow:hover {
    box-shadow: 0 0 0 1px rgba(239,68,68,0.5), 0 0 24px rgba(239,68,68,0.2);
    border-color: rgba(239,68,68,0.6) !important;
  }

  /* ── CTA button shimmer ── */
  @keyframes btn-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .alarm-cta-primary {
    background: linear-gradient(90deg, #dc2626 0%, #ef4444 40%, #ff6b6b 50%, #ef4444 60%, #dc2626 100%);
    background-size: 200% auto;
    animation: btn-shimmer 3s linear infinite;
    transition: box-shadow 0.3s ease;
  }
  .alarm-cta-primary:hover {
    box-shadow: 0 0 30px rgba(239,68,68,0.6), 0 0 60px rgba(239,68,68,0.25) !important;
  }
  .alarm-cta-secondary:hover {
    background: rgba(255,255,255,0.14) !important;
    border-color: rgba(255,255,255,0.32) !important;
  }

  /* ── Corner bracket decoration ── */
  .corner-tl::before, .corner-br::after {
    content: '';
    position: absolute;
    width: 14px; height: 14px;
    border-color: rgba(239,68,68,0.6);
    border-style: solid;
  }
  .corner-tl::before {
    top: 0; left: 0;
    border-width: 2px 0 0 2px;
  }
  .corner-br::after {
    bottom: 0; right: 0;
    border-width: 0 2px 2px 0;
  }
`;

export default function HomeAlarmsBlock({ onOpenModal }) {
  return (
    <section
      className="alarms-scanlines"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "44px 20px 44px",
        backgroundImage: "url('/images/ajax-alarm-hero.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center 28%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <style>{css}</style>

      {/* Dark gradient overlay — image visible, text readable */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(170deg, rgba(4,5,16,0.76) 0%, rgba(6,3,14,0.65) 42%, rgba(4,5,16,0.82) 100%)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 100, zIndex: 0,
        background: "linear-gradient(to bottom, transparent, rgba(4,5,16,0.94))",
      }} />

      {/* Grid overlay — military control monitor feel */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(239,68,68,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* ── PERIMETER LASER SCANNER ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
        {/* Main scan beam */}
        <div style={{
          position: "absolute",
          left: 0, right: 0, height: 3,
          background: "linear-gradient(to right, transparent 0%, rgba(239,68,68,0.15) 5%, rgba(239,68,68,0.55) 25%, rgba(239,68,68,0.85) 50%, rgba(239,68,68,0.55) 75%, rgba(239,68,68,0.15) 95%, transparent 100%)",
          filter: "blur(1px)",
          boxShadow: "0 0 18px 4px rgba(239,68,68,0.35), 0 0 40px 8px rgba(239,68,68,0.12)",
          animation: "perimeter-scan 5s ease-in-out infinite alternate",
        }} />
        {/* Glow echo */}
        <div style={{
          position: "absolute",
          left: 0, right: 0, height: 8,
          background: "linear-gradient(to right, transparent 5%, rgba(239,68,68,0.04) 20%, rgba(239,68,68,0.10) 50%, rgba(239,68,68,0.04) 80%, transparent 95%)",
          filter: "blur(4px)",
          animation: "perimeter-scan 5s ease-in-out infinite alternate",
        }} />
      </div>

      {/* REC badge */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 14, right: 16, zIndex: 5,
        display: "flex", alignItems: "center", gap: 5,
        background: "rgba(0,0,0,0.60)", backdropFilter: "blur(6px)",
        border: "1px solid rgba(239,68,68,0.45)", borderRadius: 6, padding: "4px 10px",
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: "50%", backgroundColor: "#EF4444",
          display: "inline-block", animation: "rec-blink 1.2s step-start infinite",
        }} />
        <span style={{ color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: "0.12em" }}>REC</span>
      </div>

      {/* Corner sensors */}
      {[{ top: 10, left: 10 }, { top: 10, right: 10 }, { bottom: 10, left: 10 }, { bottom: 10, right: 10 }].map((pos, i) => (
        <div key={i} aria-hidden="true" style={{
          position: "absolute", ...pos, zIndex: 4,
          width: 8, height: 8, borderRadius: "50%",
          border: "1.5px solid rgba(239,68,68,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 3, height: 3, borderRadius: "50%", backgroundColor: "#ef4444",
            animation: `emitter-glow ${1.4 + i * 0.35}s ${i * 0.4}s ease-in-out infinite`,
          }} />
        </div>
      ))}

      {/* ── CONTENT ── */}
      <div className="max-w-2xl mx-auto" style={{ position: "relative", zIndex: 3 }}>

        {/* Product lineup image */}
        <div
          className="alarm-card-glow corner-tl corner-br"
          style={{
            position: "relative",
            borderRadius: 16, overflow: "hidden",
            border: "1px solid rgba(239,68,68,0.22)",
            marginBottom: 28,
            boxShadow: "0 0 0 1px rgba(239,68,68,0.1), 0 8px 32px rgba(0,0,0,0.6)",
          }}
        >
          <img
            src="/images/ajax-products-lineup.jpeg"
            alt="Productos Ajax: Hub, cámaras PIR, teclado y sirena"
            style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: 160 }}
          />
          {/* Bottom fade */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 50,
            background: "linear-gradient(to bottom, transparent, rgba(4,5,16,0.85))",
          }} />
        </div>

        {/* Badge */}
        <span style={{
          display: "inline-block", backgroundColor: "#dc2626", color: "#fff",
          borderRadius: 20, fontSize: 11, fontWeight: 800, padding: "6px 14px",
          letterSpacing: "0.04em",
        }}>
          🔔 SISTEMAS DE ALARMA · BARCELONA
        </span>

        <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 28, lineHeight: 1.15, marginTop: 12 }}>
          Blindaje total 24/7. Reaccionamos antes de que entren.
        </h2>

        <p style={{ color: "#CBD5E1", fontSize: 15.5, lineHeight: 1.72, marginTop: 14 }}>
          Los okupas y ladrones eligen propiedades desprotegidas. La tuya no será una de ellas. Nuestra alarma conectada detecta la intrusión y en menos de 15 segundos nuestra Central Receptora lo verifica y avisa a la Policía. Blindada contra inhibidores de señal. Instalación certificada. Sin permanencia.
        </p>

        {/* 15s Impact card */}
        <div
          className="alarm-card-glow corner-tl corner-br"
          style={{
            position: "relative",
            backgroundColor: "rgba(220,38,38,0.08)",
            border: "1px solid rgba(220,38,38,0.35)",
            borderRadius: 16, padding: 20, marginTop: 20,
            display: "flex", alignItems: "center", gap: 16,
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{
            backgroundColor: "#dc2626", borderRadius: 12, padding: 14,
            flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(220,38,38,0.5)",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <p style={{ color: "#EF4444", fontWeight: 900, fontSize: 34, lineHeight: 1, margin: 0, textShadow: "0 0 20px rgba(239,68,68,0.5)" }}>15s</p>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: 16, margin: 0 }}>Respuesta garantizada</p>
            <p style={{ color: "#94A3B8", fontSize: 13, margin: 0 }}>Central Receptora activa · Aviso inmediato a Policía</p>
          </div>
        </div>

        {/* Trust pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          {["✓ Sin permanencia", "✓ Instalación incluida", "✓ Sin cuotas", "✓ Certificada"].map((p) => (
            <span key={p} style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "#E2E8F0", borderRadius: 10,
              padding: "6px 12px", fontSize: 12, fontWeight: 600,
            }}>
              {p}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
          <button
            onClick={() => onOpenModal("Sistema de alarma")}
            className="alarm-cta-primary"
            style={{
              width: "100%", color: "#fff",
              fontWeight: 800, fontSize: 16, borderRadius: 50, padding: 18,
              border: "none", cursor: "pointer",
              boxShadow: "0 0 24px rgba(239,68,68,0.45)",
            }}
          >
            Blindar mi propiedad ahora →
          </button>
          <a
            href="tel:+34638109947"
            className="alarm-cta-secondary"
            style={{
              width: "100%", backgroundColor: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)", color: "#fff", fontWeight: 800,
              fontSize: 16, borderRadius: 50, padding: 18,
              border: "1px solid rgba(255,255,255,0.16)", textAlign: "center",
              textDecoration: "none", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8, boxSizing: "border-box",
              transition: "background 0.3s ease, border-color 0.3s ease",
            }}
          >
            📞 Llamar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
