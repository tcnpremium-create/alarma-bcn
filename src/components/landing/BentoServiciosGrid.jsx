import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Shield, Bell, Key } from "lucide-react";

const SERVICES = [
  {
    Icon: Camera,
    title: "Cámaras 4K con IA",
    text: "Detecta intrusos al instante con reconocimiento de personas y vehículos. Visión nocturna en color. Control total desde el móvil en tiempo real.",
    link: "/videovigilancia",
    cta: "Ver cámaras",
    accent: "#00D4FF",
    large: true,
  },
  {
    Icon: Shield,
    title: "Alarmas Ajax",
    text: "Blindadas contra inhibidores. Central Receptora 24/7. Respuesta en 15 segundos.",
    link: "/sistemas-alarma",
    cta: "Ver alarmas",
    accent: "#7C3AED",
  },
  {
    Icon: Bell,
    title: "Videoporteros IP",
    text: "Ve quién llama desde el móvil. Apertura remota. Fermax, Bticino y Golmar.",
    link: "/videoporteros",
    cta: "Ver videoporteros",
    accent: "#0080FF",
  },
  {
    Icon: Key,
    title: "Control de Accesos",
    text: "Biometría facial, RFID y apertura remota para empresas y comunidades.",
    link: "/control-accesos",
    cta: "Ver accesos",
    accent: "#10B981",
  },
];

function BeamCard({ Icon, title, text, link, cta, accent }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ position: "relative", borderRadius: 18, cursor: "default" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Rotating border beam */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, borderRadius: 18,
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0%, ${accent} 25%, transparent 50%)`,
          animation: hovered ? "bento-spin 2s linear infinite" : "none",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      {/* Card inner (1px inset to expose beam) */}
      <div style={{
        position: "relative", margin: 1, borderRadius: 17,
        background: "linear-gradient(135deg, #0d1628 0%, #0a0f1a 100%)",
        border: hovered ? "none" : "1px solid rgba(255,255,255,0.07)",
        padding: "28px 24px",
        height: "calc(100% - 2px)",
        boxSizing: "border-box",
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12, marginBottom: 16,
          background: accent + "14", border: `1px solid ${accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon style={{ width: 22, height: 22, color: accent }} />
        </div>
        <h3 style={{ fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 8, lineHeight: 1.3 }}>
          {title}
        </h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 18 }}>
          {text}
        </p>
        <Link
          to={link}
          style={{ fontSize: 13, fontWeight: 700, color: accent, textDecoration: "none", letterSpacing: "0.02em" }}
        >
          {cta} →
        </Link>
      </div>
    </div>
  );
}

export default function BentoServiciosGrid() {
  return (
    <section style={{ background: "#060e1a", padding: "64px 20px" }}>
      <style>{`@keyframes bento-spin { to { transform: rotate(360deg); } }`}</style>
      <div className="max-w-5xl mx-auto">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{
            display: "inline-block", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em",
            color: "rgba(0,210,255,0.8)", textTransform: "uppercase",
            border: "1px solid rgba(0,210,255,0.2)", borderRadius: 20, padding: "4px 14px", marginBottom: 14,
          }}>
            Servicios Premium
          </span>
          <h2 style={{ fontWeight: 900, fontSize: 28, color: "#fff", lineHeight: 1.2, margin: 0 }}>
            Todo lo que necesitas para estar protegido
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, marginTop: 10 }}>
            Instalación profesional en Barcelona y toda Catalunya
          </p>
        </div>

        {/* Bento grid: large left + 3 stacked right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }} className="bento-grid">
          <style>{`
            @media (min-width: 640px) {
              .bento-grid { grid-template-columns: 1fr 1fr !important; }
              .bento-large { grid-row: span 3; }
            }
          `}</style>
          <div className="bento-large">
            <BeamCard {...SERVICES[0]} />
          </div>
          {SERVICES.slice(1).map(s => (
            <BeamCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
