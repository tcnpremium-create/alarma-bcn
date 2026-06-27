import React from "react";

export default function HomeCamerasBlock({ onOpenModal }) {
  return (
    <section style={{ backgroundColor: "#FFFFFF", padding: "40px 20px" }}>
      <div style={{ height: 4, backgroundColor: "#E53E3E", width: "100%", marginBottom: 24 }} />
      <div className="max-w-2xl mx-auto">
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

        <h2 style={{ fontWeight: 900, fontSize: 28, color: "#0A0A1A", lineHeight: 1.15, margin: 0 }}>
          Deja de preocuparte. Vigila todo en 4K desde tu móvil.
        </h2>

        <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.7, marginTop: 14 }}>
          No dejes que los delincuentes elijan tu propiedad. Nuestras cámaras con Inteligencia Artificial detectan intrusos en tiempo real y te avisan al instante. Imagen cristalina en 4K, visión nocturna en color y grabación continua. Instalación profesional incluida. Sin cuotas mensuales.
        </p>

        {/* Pills */}
        <div style={{ display: "flex", gap: 8, marginTop: 16, overflowX: "auto", paddingBottom: 4 }}>
          {["🤖 IA Activa", "📹 4K HD", "🌙 Nocturna Color", "📱 App 24/7", "🛡️ Sin cuotas"].map((pill) => (
            <span
              key={pill}
              style={{
                backgroundColor: "#F3F4F6",
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
            }}
          >
            Presupuesto →
          </button>
          <a
            href="tel:+34638109947"
            style={{
              width: "100%",
              backgroundColor: "#0A0A1A",
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
            📞 Llamar
          </a>
        </div>
      </div>
    </section>
  );
}