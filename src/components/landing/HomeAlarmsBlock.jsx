import React from "react";
import { Phone } from "lucide-react";

export default function HomeAlarmsBlock({ onOpenModal }) {
  return (
    <section style={{ backgroundColor: "#0A0A1A", padding: "40px 20px" }}>
      <div className="max-w-2xl mx-auto">
        <span
          style={{
            display: "inline-block",
            backgroundColor: "#E53E3E",
            color: "#fff",
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 800,
            padding: "6px 14px",
            letterSpacing: "0.06em",
          }}
        >
          SISTEMAS DE ALARMA · BARCELONA
        </span>

        <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 28, lineHeight: 1.15, marginTop: 12 }}>
          Blindaje total 24/7. Reaccionamos antes de que entren.
        </h2>

        <p style={{ color: "#D1D5DB", fontSize: 16, lineHeight: 1.7, marginTop: 14 }}>
          Los okupas y ladrones eligen propiedades desprotegidas. La tuya no será una de ellas. Nuestra alarma conectada detecta la intrusión y en menos de 15 segundos nuestra Central Receptora lo verifica y avisa a la Policía. Blindada contra inhibidores de señal. Instalación certificada. Sin permanencia.
        </p>

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

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          {["Sin permanencia", "Instalación incluida", "Sin cuotas", "Certificada"].map((p) => (
            <span
              key={p}
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "#fff",
                borderRadius: 10,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {p}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
          <button
            onClick={() => onOpenModal && onOpenModal()}
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
            href="tel:+34638109947"
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
            <Phone style={{ width: 18, height: 18 }} />
            638 10 99 47
          </a>
        </div>
      </div>
    </section>
  );
}
