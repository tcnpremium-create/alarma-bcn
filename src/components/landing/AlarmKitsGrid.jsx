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
import KitFinder from "./KitFinder";
import KitPhotos from "./KitPhotos";

const CERTIFICATIONS = [
  { label: "Grado 2 · EN 50131", icon: ShieldCheck },
  { label: "Ajax Certified Partner", icon: BadgeCheck },
  { label: "Compatible con CRA (opcional)", icon: PhoneCall },
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

const FINDER_STEPS = [
  { id: "lugar", question: "¿Dónde quieres instalar la alarma?", options: [
    { value: "piso", label: "Piso o casa pequeña", hint: "Una vivienda con pocos accesos" },
    { value: "grande", label: "Vivienda grande o local", hint: "Más estancias, más accesos" },
    { value: "empresa", label: "Empresa, nave o negocio con valor", hint: "Mayor nivel de protección" },
  ] },
  { id: "foto", question: "¿Quieres que la alarma haga foto al intruso?", options: [
    { value: "no", label: "No hace falta", hint: "Detector de movimiento y sirena" },
    { value: "si", label: "Sí, con verificación por imagen", hint: "Detectores MotionCam con cámara" },
  ] },
  { id: "cra", question: "¿Quieres conectarla a una central receptora (CRA)?", options: [
    { value: "no", label: "No, sin conexión y sin cuotas", hint: "La alarma te avisa en el móvil" },
    { value: "si", label: "Sí, con central receptora", hint: "Servicio opcional que se contrata aparte" },
    { value: "ns", label: "Aún no lo sé", hint: "Lo decides más adelante" },
  ] },
];

const LUGAR_TXT = { piso: "un piso o casa pequeña", grande: "una vivienda grande o local", empresa: "una empresa o negocio" };

// Kits en orden: Hogar (399), Vivienda / Negocio (699), Profesional / Empresa (1.399).
// Solo el kit Profesional / Empresa lleva MotionCam (verificación por imagen).
function recommendAlarmKit(a) {
  let idx = { piso: 0, grande: 1, empresa: 2 }[a.lugar];
  if (a.foto === "si") idx = 2;
  const kit = ALARM_KITS[idx];
  const reasons = [`Para ${LUGAR_TXT[a.lugar]}, la ${kit.title} (${kit.subtitle.toLowerCase()}) es el punto de partida adecuado.`];
  if (a.foto === "si") reasons.push("Incluye detectores MotionCam: fotografían al intruso para verificar el aviso.");
  reasons.push("Instalación profesional incluida. Sin cuotas mensuales por el sistema.");
  const notes = [];
  if (a.cra === "no") notes.push("Sin conexión a central: la alarma te avisa en el móvil y suena la sirena.");
  if (a.cra === "si") notes.push("La conexión a central receptora (CRA) es un servicio opcional que se contrata aparte: no está incluida en el precio del kit.");
  if (a.cra === "ns") notes.push("Instalamos la alarma con o sin central receptora: lo decides tú.");
  if (kit.isFrom) notes.push("Es una configuración base que se puede ampliar según tus necesidades.");
  return { kit, reasons, notes };
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
  const [pickedId, setPickedId] = useState(null);

  // Al recomendar un kit se resalta su tarjeta y se despliegan sus componentes.
  const handleRecommend = (id) => {
    setPickedId(id);
    setOpenId(id);
  };

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
          <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>Precios claros. Sin sorpresas. Sin cuotas mensuales obligatorias.</p>
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

        <KitFinder
          title="¿Qué alarma necesito?"
          subtitle="3 preguntas rápidas y te recomendamos el kit adecuado, con su precio."
          steps={FINDER_STEPS}
          recommend={recommendAlarmKit}
          kitSubtitle={(kit) => kit.subtitle}
          onRecommend={handleRecommend}
          onRequestQuote={(kit) => onRequestQuote(kit)}
          whatsappMessage={(kit, a) => `Hola, me interesa la ${kit.title} para ${LUGAR_TXT[a.lugar]}. ¿Me podéis dar un presupuesto?`}
          disclaimer="Precio orientativo. El presupuesto final depende de la configuración y características de la instalación."
        />

        <div className="kits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {ALARM_KITS.map((kit) => {
            const isHighlighted = kit.highlight;
            const isOpen = openId === kit.id;
            return (
              <div key={kit.id} className={`kit-card${pickedId === kit.id ? " kit-card--picked" : ""}`} style={{
                background: isHighlighted ? "rgba(229,62,62,0.06)" : "rgba(255,255,255,0.03)",
                border: isHighlighted ? "2px solid #E53E3E" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, padding: "32px 26px",
                position: "relative", display: "flex", flexDirection: "column",
                boxShadow: isHighlighted ? "0 0 48px rgba(229,62,62,0.2)" : "none",
                transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease"
              }}>
                {pickedId === kit.id && (
                  <div style={{
                    position: "absolute", top: 12, right: 12, background: "#22C55E", color: "#fff",
                    fontSize: 10, fontWeight: 800, borderRadius: 100, padding: "4px 10px", letterSpacing: "0.06em",
                  }}>
                    ✔ TU KIT
                  </div>
                )}
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
                  {kit.isFrom && (
                    <span style={{ color: "#94A3B8", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 2 }}>
                      Desde
                    </span>
                  )}
                  <div style={{ color: "#E53E3E", fontSize: 42, fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em" }}>{kit.price} €</div>
                  <span style={{ color: "#64748B", fontSize: 11, marginTop: 4, display: "block" }}>+ IVA{kit.isFrom ? " · precio orientativo" : " (IVA no incluido)"}</span>
                </div>

                <div style={{ marginBottom: 18 }}><KitPhotos photos={kit.photos} /></div>

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
                  {kit.expandNote && kit.expandNote.map((note) => (
                    <p key={note} style={{ color: "#64748B", fontSize: 11.5, marginTop: 10, marginBottom: 0, lineHeight: 1.5 }}>
                      {note}
                    </p>
                  ))}
                </div>

                <ShinyButton onClick={() => onRequestQuote(kit)} style={{ width: "100%", marginTop: "auto", padding: "14px 0", fontSize: 14 }}>
                  Solicitar presupuesto
                </ShinyButton>
              </div>
            );
          })}
        </div>

        {/* Hover + responsive stacking */}
        <style>{`
          .kit-card:hover { transform: translateY(-6px); border-color: rgba(229,62,62,0.55); box-shadow: 0 20px 48px rgba(229,62,62,0.18); }
          /* Tarjeta elegida en el buscador: borde verde con un pulso breve. */
          .kit-card--picked { border-color: #22C55E !important; animation: kitPicked 1.2s ease 2; }
          @keyframes kitPicked { 0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.0); } 50% { box-shadow: 0 0 0 8px rgba(34,197,94,0.25); } }
          @media (prefers-reduced-motion: reduce) { .kit-card--picked { animation: none !important; } }
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
