import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown, Cpu, Radio, DoorClosed, Smartphone, Bell, Shield,
  KeyRound, ShieldCheck, PhoneCall, BadgeCheck, Wifi,
} from "lucide-react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { Marquee } from "../magicui/marquee";
import { ShinyButton } from "../magicui/shiny-button";
import { ALARM_KITS } from "@/data/alarmKits";

const CERTIFICATIONS = [
  { label: "Grado 2 · EN 50131", icon: ShieldCheck },
  { label: "Ajax Certified Partner", icon: BadgeCheck },
  { label: "CRA Homologada 24/7", icon: PhoneCall },
  { label: "Cifrado AES-128", icon: Wifi },
  { label: "Instaladores Homologados", icon: Shield },
];

function itemIcon(text) {
  const t = text.toLowerCase();
  if (t.includes("hub")) return Cpu;
  if (t.includes("detector") || t.includes("motioncam")) return Radio;
  if (t.includes("magnético") || t.includes("puerta")) return DoorClosed;
  if (t.includes("mando")) return Smartphone;
  if (t.includes("sirena")) return Bell;
  if (t.includes("teclado") || t.includes("keypad")) return KeyRound;
  if (t.includes("receptora") || t.includes("policía") || t.includes("24/7")) return PhoneCall;
  if (t.includes("app")) return Smartphone;
  return ShieldCheck;
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

export default function AlarmKitsGrid({ city, onRequestQuote }) {
  const [openId, setOpenId] = useState(null);

  return (
    <section style={{ background: "#0A1120", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-block",
            background: "rgba(229,62,62,0.1)", border: "1px solid rgba(229,62,62,0.3)",
            borderRadius: 100, padding: "5px 18px", marginBottom: 16
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Kits de Alarmas Ajax — Precios Transparentes
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", fontWeight: 900, margin: "0 0 10px", letterSpacing: "-0.025em" }}>
            <AnimatedGradientText>
              Kits de Alarma Ajax con instalación incluida{city ? ` en ${city}` : ""}
            </AnimatedGradientText>
          </h2>
          <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>Precio cerrado. Sin sorpresas. Sin cuotas mensuales obligatorias.</p>
        </div>

        {/* Certifications marquee */}
        <div style={{ marginBottom: 40 }}>
          <Marquee speed={26}>
            {CERTIFICATIONS.map((c) => (
              <div
                key={c.label}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 100, padding: "8px 18px", whiteSpace: "nowrap",
                }}
              >
                <c.icon size={14} color="#E53E3E" />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#CBD5E0", letterSpacing: "0.02em" }}>{c.label}</span>
              </div>
            ))}
          </Marquee>
        </div>

        <div className="kits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {ALARM_KITS.map((kit, i) => {
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
                    borderRadius: 100, padding: "4px 14px", whiteSpace: "nowrap",
                    letterSpacing: "0.08em"
                  }}>
                    {kit.badge}
                  </div>
                )}

                <h3 style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 800, margin: "0 0 4px", lineHeight: 1.3 }}>{kit.title}</h3>
                <p style={{ color: "#94A3B8", fontSize: 12, margin: "0 0 20px", lineHeight: 1.5 }}>{kit.subtitle}</p>

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
                  maxHeight: isOpen ? 600 : 0, overflow: "hidden",
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
