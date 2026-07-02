import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Camera, HardDrive, ShieldCheck, Moon, Cpu, Radio } from "lucide-react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { ShinyButton } from "../magicui/shiny-button";

export const CAMERA_KITS = [
  {
    id: "basico",
    badge: null,
    title: "Plan Visión Hogar",
    cameras: "2 Cámaras",
    price: "699 €",
    items: [
      "2 cámaras de alta definición 2K",
      "Grabador NVR profesional con disco local",
      "Instalación certificada incluida",
      "Certificado de seguridad homologado",
      "Placas disuasorias para exterior incluidas",
      "Sin cuotas mensuales",
    ],
    ideal: "Viviendas y pequeños comercios",
  },
  {
    id: "profesional",
    badge: "MÁS VENDIDO",
    title: "Plan Visión Negocio 360°",
    cameras: "4 Cámaras",
    price: "890 €",
    items: [
      "4 cámaras Alta Definición 4MPX",
      "Grabador NVR profesional con disco duro 2TB",
      "Detección inteligente por Inteligencia Artificial",
      "Visión nocturna optimizada",
      "Instalación y configuración certificada incluida",
    ],
    ideal: "Casas, negocios y comunidades medianas",
  },
  {
    id: "empresarial",
    badge: "MÁXIMA COBERTURA",
    title: "Plan Visión Corporativa Total",
    cameras: "8 Cámaras",
    price: "1.500 €",
    items: [
      "8 cámaras profesionales 4K Ultra HD",
      "Grabador NVR 8 canales con disco duro 4TB",
      "Detección por IA avanzada de personas y vehículos",
      "Visión nocturna de largo alcance",
      "Instalación completa incluida",
    ],
    ideal: "Empresas, polígonos, comunidades grandes y fincas",
  },
];

function itemIcon(text) {
  const t = text.toLowerCase();
  if (t.includes("cámara")) return Camera;
  if (t.includes("nvr") || t.includes("disco")) return HardDrive;
  if (t.includes("ia") || t.includes("inteligencia") || t.includes("detección")) return Cpu;
  if (t.includes("nocturna")) return Moon;
  if (t.includes("certificad") || t.includes("homologad") || t.includes("placas")) return ShieldCheck;
  return Radio;
}

function KitItemBento({ item }) {
  const Icon = itemIcon(item);
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -3 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      style={{
        display: "flex", flexDirection: "column", gap: 8,
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12, padding: "14px 12px", cursor: "default",
      }}
    >
      <div style={{
        width: 30, height: 30, borderRadius: 8, background: "rgba(229,62,62,0.12)",
        border: "1px solid rgba(229,62,62,0.25)", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={15} color="#E53E3E" />
      </div>
      <span style={{ color: "#CBD5E0", fontSize: 12, fontWeight: 600, lineHeight: 1.4 }}>{item}</span>
    </motion.div>
  );
}

export default function CameraKitsGrid({ city, onRequestQuote }) {
  const [openId, setOpenId] = useState(null);

  return (
    <section style={{ background: "#0A1120", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            display: "inline-block",
            background: "rgba(229,62,62,0.1)", border: "1px solid rgba(229,62,62,0.3)",
            borderRadius: 100, padding: "5px 18px", marginBottom: 16
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Kits Profesionales de Videovigilancia — Precios Transparentes
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", fontWeight: 900, margin: "0 0 10px", letterSpacing: "-0.025em" }}>
            <AnimatedGradientText>
              Kits de Cámaras con instalación incluida{city ? ` en ${city}` : ""}
            </AnimatedGradientText>
          </h2>
          <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>Precio cerrado. Sin sorpresas. Sin cuotas mensuales.</p>
        </div>

        <div className="kits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {CAMERA_KITS.map((kit, i) => {
            const isHighlighted = i === 1;
            const isOpen = openId === kit.id;
            return (
              <div key={kit.id} className="kit-card" style={{
                background: isHighlighted ? "rgba(229,62,62,0.06)" : "rgba(255,255,255,0.03)",
                border: isHighlighted ? "2px solid #E53E3E" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, padding: "32px 26px",
                position: "relative", display: "flex", flexDirection: "column",
                boxShadow: isHighlighted ? "0 0 48px rgba(229,62,62,0.2)" : "none",
                transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease"
              }}>
                {kit.badge && (
                  <div style={{
                    position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                    background: "#E53E3E", color: "#fff", fontSize: 10, fontWeight: 800,
                    borderRadius: 100, padding: "4px 14px", whiteSpace: "nowrap", letterSpacing: "0.08em"
                  }}>
                    {kit.badge}
                  </div>
                )}

                <div style={{ marginBottom: 4 }}>
                  <span style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 800 }}>{kit.title}</span>
                  <span style={{ color: "#E53E3E", fontSize: 15, fontWeight: 800, marginLeft: 8 }}>— {kit.cameras}</span>
                </div>
                <div style={{ color: "#94A3B8", fontSize: 12, marginTop: 2, marginBottom: 20 }}>Ideal: {kit.ideal}</div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ color: "#E53E3E", fontSize: 42, fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em" }}>{kit.price}</div>
                  <span style={{ color: "#64748B", fontSize: 11, marginTop: 4, display: "block" }}>* IVA no incluido</span>
                </div>

                <button
                  onClick={() => setOpenId(isOpen ? null : kit.id)}
                  aria-expanded={isOpen}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    width: "100%", background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
                    padding: "11px 14px", marginBottom: isOpen ? 14 : 20,
                    color: "#CBD5E0", fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                    letterSpacing: "0.01em"
                  }}
                >
                  {isOpen ? "Ocultar componentes" : "Ver componentes incluidos"}
                  <ChevronDown size={15} style={{ transition: "transform 0.25s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", color: "#E53E3E", flexShrink: 0 }} />
                </button>

                <div style={{
                  maxHeight: isOpen ? 500 : 0, overflow: "hidden",
                  transition: "max-height 0.35s ease, margin-bottom 0.3s ease",
                  marginBottom: isOpen ? 20 : 0
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                    {kit.items.map((item) => <KitItemBento key={item} item={item} />)}
                  </div>
                </div>

                <ShinyButton onClick={onRequestQuote} style={{ width: "100%", marginTop: "auto", padding: "14px 0", fontSize: 14 }}>
                  Solicitar presupuesto gratis
                </ShinyButton>
              </div>
            );
          })}
        </div>

        {/* Hover + responsive stacking */}
        <style>{`
          .kit-card:hover { transform: translateY(-6px); border-color: rgba(229,62,62,0.55); box-shadow: 0 20px 48px rgba(229,62,62,0.18); }
          @media (max-width: 720px) {
            .kits-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 1024px) and (min-width: 721px) {
            .kits-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
