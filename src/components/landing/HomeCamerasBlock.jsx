import React from "react";
import { Phone, Cpu, Camera, Moon, Smartphone, Shield } from "lucide-react";

const FEATURES = [
  { Icon: Cpu, label: "IA Activa" },
  { Icon: Camera, label: "4K HD" },
  { Icon: Moon, label: "Visión Nocturna" },
  { Icon: Smartphone, label: "App 24/7" },
  { Icon: Shield, label: "Sin cuotas" },
];

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
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 800,
            padding: "6px 14px",
            letterSpacing: "0.06em",
            marginBottom: 12,
          }}
        >
          CÁMARAS DE SEGURIDAD · BARCELONA
        </span>

        <h2 style={{ fontWeight: 900, fontSize: 28, color: "#0A0A1A", lineHeight: 1.15, margin: 0 }}>
          Deja de preocuparte. Vigila todo en 4K desde tu móvil.
        </h2>

        <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.7, marginTop: 14 }}>
          No dejes que los delincuentes elijan tu propiedad. Nuestras cámaras con Inteligencia Artificial detectan intrusos en tiempo real y te avisan al instante. Imagen cristalina en 4K, visión nocturna en color y grabación continua. Instalación profesional incluida. Sin cuotas mensuales.
        </p>

        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          {FEATURES.map(({ Icon, label }) => (
            <span
              key={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                backgroundColor: "#F3F4F6",
                borderRadius: 20,
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              <Icon style={{ width: 13, height: 13, color: "#E53E3E" }} />
              {label}
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
            Solicitar presupuesto →
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
            <Phone style={{ width: 18, height: 18 }} />
            638 10 99 47
          </a>
        </div>
      </div>
    </section>
  );
}
