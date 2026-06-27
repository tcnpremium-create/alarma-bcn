import React from "react";

const TRUST = [
  { emoji: "🛡️", title: "Sin cuotas mensuales", text: "Pago único, sin sorpresas. Tu sistema es tuyo para siempre." },
  { emoji: "⚡", title: "Instalación en 24-48h", text: "Desde que pides presupuesto hasta que tu sistema funciona." },
  { emoji: "🔧", title: "Garantía de por vida", text: "Todos nuestros equipos e instalaciones con garantía total permanente." },
  { emoji: "⭐", title: "4.8/5 en Google", text: "Más de 13 reseñas verificadas de clientes reales en Barcelona." },
];

export default function HomeTrustSection() {
  return (
    <section style={{ backgroundColor: "#F8F9FA", padding: "48px 20px" }}>
      <div className="max-w-4xl mx-auto">
        <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", textAlign: "center", margin: 0, lineHeight: 1.15 }}>
          ¿Por qué elegir Premium Tech Security?
        </h2>
        <p style={{ color: "#6B7280", fontSize: 16, textAlign: "center", marginTop: 8, marginBottom: 32 }}>
          Más de 15 años protegiendo hogares y negocios en Catalunya
        </p>
        <div className="grid grid-cols-2 gap-4">
          {TRUST.map((t) => (
            <div
              key={t.title}
              className="bg-white rounded-2xl p-6 text-center"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <div style={{ fontSize: 36, marginBottom: 8 }}>{t.emoji}</div>
              <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0A0A1A", marginBottom: 6 }}>{t.title}</h3>
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}