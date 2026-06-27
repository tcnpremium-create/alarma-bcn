import React from "react";

export default function HomeAccessBlock({ onOpenModal }) {
  return (
    <section style={{ backgroundColor: "#F8F9FA", padding: "32px 20px" }}>
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
          🚪 CONTROL DE ACCESOS
        </span>

        <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: 0 }}>
          ¿Quién entra en tu propiedad? Tú decides.
        </h2>

        <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.7, marginTop: 14 }}>
          Porteros automáticos inteligentes, apertura remota desde el móvil y control total de accesos para garajes, comunidades y empresas. Integración con cámaras y alarmas.
        </p>

        <button
          onClick={() => onOpenModal("Control de accesos")}
          style={{
            width: "100%",
            backgroundColor: "#0A0A1A",
            color: "#fff",
            fontWeight: 800,
            fontSize: 16,
            borderRadius: 50,
            padding: 16,
            border: "none",
            cursor: "pointer",
            marginTop: 20,
          }}
        >
          Presupuesto →
        </button>
      </div>
    </section>
  );
}