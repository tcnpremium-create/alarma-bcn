import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const ALARM_KITS = [
  {
    id: "hogar",
    badge: "MÁS POPULAR",
    title: "Kit Alarma Hogar",
    subtitle: "Protección completa para viviendas",
    price: "399 €",
    items: [
      "Hub Ajax (central de control)",
      "1 detector de movimiento (sin cámara)",
      "1 detector magnético para puerta principal",
      "1 mando a distancia",
      "Sirena interior HomeSiren",
      "App Ajax gratuita · iOS y Android",
      "Instalación certificada incluida",
      "Sin cuotas mensuales · Grado 2",
    ],
  },
  {
    id: "negocio",
    badge: "RECOMENDADO",
    title: "Kit Alarma Negocio",
    subtitle: "Seguridad profesional para locales y oficinas",
    price: "699 €",
    items: [
      "Hub Ajax (central de control)",
      "2 detectores de movimiento sin cámara",
      "2 detectores magnéticos (puertas/ventanas)",
      "Sirena interior HomeSiren",
      "Central Receptora activa 24/7",
      "Instalación certificada incluida",
      "Grado 2 · Conexión cifrada",
    ],
  },
  {
    id: "comunidad",
    badge: "GRAN INSTALACIÓN",
    title: "Kit Alarma Comunidad",
    subtitle: "Para casas unifamiliares o naves industriales",
    price: "1.300 €",
    items: [
      "Hub+ Ajax (hasta 200 dispositivos)",
      "4 detectores de movimiento MotionCam",
      "2 detectores magnéticos perimetrales",
      "1 teclado KeyPad en zona de acceso",
      "Sirena exterior de alta potencia",
      "Sirenas interiores incluidas",
      "Aviso directo a Policía verificado",
      "Instalación y configuración completa incluida",
    ],
  },
];

export default function AlarmKitsGrid({ city, onRequestQuote }) {
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
              Kits de Alarmas Ajax — Precios Transparentes
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", fontWeight: 900, color: "#FFFFFF", margin: "0 0 10px", letterSpacing: "-0.025em" }}>
            Kits de Alarma Ajax con instalación incluida{city ? ` en ${city}` : ""}
          </h2>
          <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>Precio cerrado. Sin sorpresas. Sin cuotas mensuales obligatorias.</p>
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
                  maxHeight: isOpen ? 400 : 0, overflow: "hidden",
                  transition: "max-height 0.3s ease, margin-bottom 0.3s ease",
                  marginBottom: isOpen ? 20 : 0
                }}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {kit.items.map((item) => (
                      <li key={item} style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.9, display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: "#E53E3E", flexShrink: 0, fontWeight: 900, fontSize: 14, lineHeight: 1.9 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onRequestQuote}
                  style={{
                    display: "block", width: "100%", marginTop: "auto",
                    background: isHighlighted ? "#E53E3E" : "rgba(229,62,62,0.15)",
                    color: "#fff", fontWeight: 700, fontSize: 14,
                    borderRadius: 50, padding: "14px 0", border: isHighlighted ? "none" : "1px solid rgba(229,62,62,0.4)",
                    cursor: "pointer", textAlign: "center"
                  }}
                >
                  Solicitar presupuesto gratis
                </button>
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
