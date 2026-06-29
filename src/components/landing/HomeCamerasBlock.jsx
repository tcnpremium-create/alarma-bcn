import React from "react";
import { Phone, Eye, Camera, Moon, Smartphone, Shield } from "lucide-react";

const FEATURES = [
  { Icon: Eye, label: "Detección" },
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
        <span style={{ display: "inline-block", backgroundColor: "#E53E3E", color: "#fff", borderRadius: 4, fontSize: 11, fontWeight: 800, padding: "6px 14px", letterSpacing: "0.06em", marginBottom: 12 }}>
          CÁMARAS DE SEGURIDAD · BARCELONA
        </span>

        <h2 style={{ fontWeight: 900, fontSize: 28, color: "#0A0A1A", lineHeight: 1.15, margin: 0 }}>
          Deja de preocuparte. Vigila todo en 4K desde tu móvil.
        </h2>

        <img
          src="/images/camara-domo.jpeg"
          alt="Cámara domo de seguridad HD"
          style={{
            width: "100%",
            borderRadius: 16,
            marginTop: 20,
            marginBottom: 4,
            objectFit: "cover",
            maxHeight: 260,
            display: "block",
            boxShadow: "0 4px 24px rgba(0,0,0,0.10)"
          }}
        />

        <p style={{ color: "#374151", fontSize: 16, lineHeight: 1.7, marginTop: 14 }}>
          No dejes que los delincuentes elijan tu propiedad. Nuestras cámaras detectan movimiento e intrusos en tiempo real y te avisan al instante. Imagen cristalina en 4K, visión nocturna en color y grabación continua. Instalación profesional incluida. Sin cuotas mensuales.
        </p>

        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          {FEATURES.map(({ Icon, label }) => (
            <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "#F3F4F6", borderRadius: 20, padding: "8px 14px", fontSize: 12, fontWeight: 700 }}>
              <Icon style={{ width: 13, height: 13, color: "#E53E3E" }} />
              {label}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
          <button
            onClick={() => onOpenModal && onOpenModal()}
            style={{ width: "100%", backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: 18, border: "none", cursor: "pointer" }}
          >
            Solicitar presupuesto →
          </button>
          <a href="tel:+34638109947"
            style={{ width: "100%", backgroundColor: "#0A0A1A", color: "#fff", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: 18, border: "none", textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxSizing: "border-box" }}
          >
            <Phone style={{ width: 18, height: 18 }} />
            Llamar
          </a>
        </div>

        <div style={{ marginTop: 28 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
            ▶ Ve tu hogar protegido en tiempo real
          </p>
          <video
            controls
            playsInline
            preload="metadata"
            style={{ width: "100%", borderRadius: 16, display: "block", boxShadow: "0 4px 24px rgba(0,0,0,0.12)", backgroundColor: "#000" }}
          >
            <source src="https://pub-c09bc177726a4cf0b240409a82635955.r2.dev/casa-protegida.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
