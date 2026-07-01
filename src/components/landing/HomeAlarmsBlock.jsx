import React from "react";

const laserCss = `
  @keyframes alarms-laser-v {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(200%); }
  }
  @keyframes alarms-laser-h {
    0%   { transform: translateX(-120%) skewX(-22deg); }
    100% { transform: translateX(220%) skewX(-22deg); }
  }
`;

export default function HomeAlarmsBlock({ onOpenModal }) {
  return (
    <section style={{ backgroundColor: "#0A0A1A", padding: "40px 20px", position: "relative", overflow: "hidden" }}>
      <style>{laserCss}</style>

      {/* Red laser beams */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} aria-hidden="true">
        {/* Vertical beam 1 */}
        <div style={{
          position: "absolute", top: 0, left: "15%",
          width: 1, height: "100%",
          background: "linear-gradient(to bottom, transparent, rgba(239,68,68,0.5), transparent)",
          filter: "blur(1px)",
          boxShadow: "0 0 8px rgba(239,68,68,0.3)",
          animation: "alarms-laser-v 10s linear infinite",
        }} />
        {/* Vertical beam 2 */}
        <div style={{
          position: "absolute", top: 0, left: "80%",
          width: 2, height: "100%",
          background: "linear-gradient(to bottom, transparent, rgba(239,68,68,0.35), transparent)",
          filter: "blur(0.5px)",
          animation: "alarms-laser-v 16s 5s linear infinite",
        }} />
        {/* Diagonal sweep */}
        <div style={{
          position: "absolute", top: "25%", left: 0,
          width: 2, height: "200%",
          background: "linear-gradient(to bottom, transparent, rgba(239,68,68,0.3), transparent)",
          filter: "blur(1.5px)",
          animation: "alarms-laser-h 20s 7s linear infinite",
          transformOrigin: "top left",
        }} />
      </div>

      <div className="max-w-2xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
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
        <div
          style={{
            backgroundColor: "rgba(229,62,62,0.12)",
            border: "1px solid rgba(229,62,62,0.4)",
            borderRadius: 16,
            padding: 20,
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              backgroundColor: "#E53E3E",
              borderRadius: 12,
              padding: 14,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
            <span
              key={p}
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "#fff",
                borderRadius: 10,
                padding: "6px 12px",
                fontSize: 12,
              }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
          <button
            onClick={() => onOpenModal("Sistema de alarma")}
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
            }}
          >
            Blindar mi propiedad ahora →
          </button>
          <a
            href="tel:+34615774532"
            style={{
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#fff",
              fontWeight: 800,
              fontSize: 16,
              borderRadius: 50,
              padding: 18,
              border: "none",
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
