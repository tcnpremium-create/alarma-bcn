import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import { Shield, Camera, Fingerprint, CheckCircle, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { ALARM_KITS } from "@/data/alarmKits";
import { CAMERA_KITS } from "@/data/cameraKits";
import { useLeadDrawer } from "@/context/LeadDrawerContext";

const VALID_TABS = ["alarmas", "camaras", "controles"];

const promoSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Kits de Seguridad Barcelona - Alarmas y Cámaras | Alarmas BCN",
  "description": "Kits de alarmas Ajax y videovigilancia profesional con instalación incluida en Barcelona.",
  "url": "https://www.alarmasenbarcleona.com/Promociones",
  "itemListElement": [
    ...ALARM_KITS.map((kit, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Product",
        "name": kit.title,
        "description": kit.subtitle,
        "offers": {
          "@type": "Offer",
          "price": kit.price.replace(".", ""),
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "Alarmas BCN" },
        },
      },
    })),
    ...CAMERA_KITS.map((kit, i) => ({
      "@type": "ListItem",
      "position": ALARM_KITS.length + i + 1,
      "item": {
        "@type": "Product",
        "name": `${kit.title} — ${kit.cameras}`,
        "offers": {
          "@type": "Offer",
          "price": kit.price.replace(".", ""),
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "Alarmas BCN" },
        },
      },
    })),
  ],
};

const BG = "#060B14";
const BG2 = "#0A1120";
const RED = "#E53E3E";
const RED_DIM = "rgba(229,62,62,0.15)";
const BORDER = "rgba(255,255,255,0.07)";
const TEXT = "#E2E8F0";
const TEXT_DIM = "#94A3B8";

export default function Promociones() {
  const [searchParams] = useSearchParams();
  // Permite enlazar directamente a una pestaña concreta (ej. desde el
  // modal de exit-intent: /Promociones?tab=camaras) sin obligar a la
  // persona a hacer clic en la pestaña manualmente.
  const requestedTab = searchParams.get("tab");
  const initialTab = VALID_TABS.includes(requestedTab) ? requestedTab : "alarmas";
  const [activeTab, setActiveTab] = useState(initialTab);
  const { openDrawer } = useLeadDrawer();

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT }}>
      <Helmet>
        <title>Kits de Alarmas y Cámaras de Seguridad Barcelona | Alarmas BCN</title>
        <meta
          name="description"
          content="Kits de alarmas Ajax desde 399€ y videovigilancia profesional desde 689€ con instalación incluida en Barcelona. Sin cuotas mensuales. Tel: 638 10 99 47"
        />
        <link rel="canonical" href="https://alarmasenbarcelona.com/Promociones" />
        <script type="application/ld+json">{JSON.stringify(promoSchema)}</script>
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(135deg, ${BG} 0%, ${BG2} 60%, #0F1A2E 100%)`,
          borderBottom: `1px solid ${BORDER}`,
          paddingTop: 96,
          paddingBottom: 64,
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: RED_DIM,
              border: `1px solid rgba(229,62,62,0.3)`,
              borderRadius: 9999,
              padding: "6px 18px",
              marginBottom: 28,
            }}
          >
            <Shield size={16} color={RED} />
            <span style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}>
              INSTALACIÓN CERTIFICADA · BARCELONA
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.1,
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
            }}
          >
            Kits de Seguridad Profesional
          </h1>
          <p
            style={{
              fontSize: 18,
              color: TEXT_DIM,
              maxWidth: 580,
              margin: "0 auto 36px",
              lineHeight: 1.65,
            }}
          >
            Alarmas Ajax y videovigilancia con instalación incluida. Sin cuotas mensuales. Presupuesto gratuito en 24h.
          </p>

          <a
            href="tel:+34638109947"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: RED,
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              padding: "14px 32px",
              borderRadius: 12,
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            <Phone size={18} />
            Llamar ahora
          </a>
        </div>
      </section>

      {/* Tabs */}
      <section
        style={{
          background: BG2,
          borderBottom: `1px solid ${BORDER}`,
          position: "sticky",
          top: 64,
          zIndex: 40,
          padding: "16px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { key: "alarmas", label: "ALARMAS", icon: <Shield size={17} /> },
            { key: "camaras", label: "CÁMARAS", icon: <Camera size={17} /> },
            { key: "controles", label: "CONTROLES DE ACCESO", icon: <Fingerprint size={17} /> },
          ].map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "10px 22px",
                  borderRadius: 9999,
                  border: active ? `1px solid ${RED}` : `1px solid ${BORDER}`,
                  background: active ? RED : "transparent",
                  color: active ? "#fff" : TEXT_DIM,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ALARMAS tab */}
      {activeTab === "alarmas" && (
        <section style={{ background: BG, padding: "72px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <h2
                style={{
                  fontSize: "clamp(26px, 4vw, 38px)",
                  fontWeight: 900,
                  color: "#fff",
                  margin: "0 0 12px",
                  letterSpacing: "-0.01em",
                }}
              >
                Sistemas de Alarma Ajax
              </h2>
              <p style={{ color: TEXT_DIM, fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
                Instalación certificada · Sin cuotas mensuales · Grado 2
              </p>
            </div>

            <div
              className="promo-kits-grid promo-kits-grid-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 18,
              }}
            >
              {ALARM_KITS.map((kit) => {
                const highlighted = kit.highlight;
                return (
                  <div
                    key={kit.id}
                    style={{
                      background: BG2,
                      borderRadius: 20,
                      border: highlighted ? `2px solid ${RED}` : `1px solid ${BORDER}`,
                      boxShadow: highlighted ? "0 0 48px rgba(229,62,62,0.2)" : "none",
                      padding: "28px 24px 32px",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                    }}
                  >
                    {kit.badge && (
                      <div
                        style={{
                          position: "absolute",
                          top: -14,
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: RED,
                          color: "#fff",
                          fontSize: 11,
                          fontWeight: 800,
                          letterSpacing: "0.08em",
                          padding: "5px 16px",
                          borderRadius: 9999,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {kit.badge}
                      </div>
                    )}

                    <div style={{ marginTop: kit.badge ? 12 : 0 }}>
                      <p style={{ color: RED, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", margin: "0 0 6px", textTransform: "uppercase" }}>
                        Alarma Ajax
                      </p>
                      <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "0 0 4px" }}>
                        {kit.title}
                      </h3>
                      <p style={{ color: TEXT_DIM, fontSize: 13, margin: "0 0 20px", lineHeight: 1.5 }}>
                        {kit.subtitle}
                      </p>
                    </div>

                    <div style={{ marginBottom: 4 }}>
                      {kit.isFrom && (
                        <span style={{ display: "block", color: TEXT_DIM, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>
                          Desde
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: 42,
                          fontWeight: 900,
                          color: RED,
                          lineHeight: 1,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {kit.price} €
                      </span>
                    </div>
                    <p style={{ color: TEXT_DIM, fontSize: 11, margin: "0 0 20px" }}>
                      + IVA{kit.isFrom ? " · precio orientativo" : " (IVA no incluido)"}
                    </p>

                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                      {kit.items.map((item, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                          <CheckCircle size={15} color="#22C55E" style={{ flexShrink: 0, marginTop: 2 }} />
                          <span style={{ color: TEXT, fontSize: 13, lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
                      {kit.expandNote && kit.expandNote.map((note) => (
                        <p key={note} style={{ color: TEXT_DIM, fontSize: 11.5, margin: "4px 0 0", lineHeight: 1.5 }}>{note}</p>
                      ))}
                    </div>

                    <button
                      onClick={() => openDrawer(kit.title)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        background: highlighted ? RED : "rgba(255,255,255,0.06)",
                        border: highlighted ? "none" : `1px solid ${BORDER}`,
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 14,
                        padding: "13px 0",
                        borderRadius: 10,
                        cursor: "pointer",
                        width: "100%",
                        marginBottom: 10,
                      }}
                    >
                      Solicitar presupuesto
                    </button>
                    <a
                      href="tel:+34638109947"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        background: "transparent",
                        color: TEXT_DIM,
                        fontWeight: 600,
                        fontSize: 13,
                        padding: "8px 0",
                        textDecoration: "none",
                      }}
                    >
                      <Phone size={14} />
                      Llamar ahora
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Ajax video */}
            <div style={{ marginTop: 64, textAlign: "center" }}>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 24, marginBottom: 28 }}>
                Tecnología Ajax — Cómo funciona
              </h3>
              <div
                style={{
                  maxWidth: 800,
                  margin: "0 auto",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: `1px solid ${BORDER}`,
                  aspectRatio: "16/9",
                }}
              >
                <iframe
                  style={{ width: "100%", height: "100%", display: "block" }}
                  src="https://www.youtube.com/embed/SfR5fydWE9s"
                  title="Sistemas de Alarmas Ajax"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CÁMARAS tab */}
      {activeTab === "camaras" && (
        <section style={{ background: BG, padding: "72px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <h2
                style={{
                  fontSize: "clamp(26px, 4vw, 38px)",
                  fontWeight: 900,
                  color: "#fff",
                  margin: "0 0 12px",
                  letterSpacing: "-0.01em",
                }}
              >
                Sistemas de Videovigilancia
              </h2>
              <p style={{ color: TEXT_DIM, fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
                Grabación 24/7 · Inteligencia Artificial · Sin cuotas mensuales
              </p>
            </div>

            <div
              className="promo-kits-grid promo-kits-grid-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 18,
              }}
            >
              {CAMERA_KITS.map((kit) => {
                const highlighted = kit.highlight;
                return (
                  <div
                    key={kit.id}
                    className={highlighted ? "promo-kit-card--highlight" : undefined}
                    style={{
                      background: BG2,
                      borderRadius: 20,
                      border: highlighted ? `2px solid ${RED}` : `1px solid ${BORDER}`,
                      boxShadow: highlighted ? "0 0 48px rgba(229,62,62,0.2)" : "none",
                      padding: "28px 24px 32px",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      transition: "box-shadow 0.3s ease",
                    }}
                  >
                    {kit.badge && (
                      <div
                        style={{
                          position: "absolute",
                          top: -14,
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: RED,
                          color: "#fff",
                          fontSize: 11,
                          fontWeight: 800,
                          letterSpacing: "0.08em",
                          padding: "5px 16px",
                          borderRadius: 9999,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {kit.badge}
                      </div>
                    )}

                    <div style={{ marginTop: kit.badge ? 12 : 0 }}>
                      <p style={{ color: RED, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", margin: "0 0 6px", textTransform: "uppercase" }}>
                        {kit.cameras}
                      </p>
                      <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "0 0 4px" }}>
                        {kit.title}
                      </h3>
                      <p style={{ color: TEXT_DIM, fontSize: 13, margin: "0 0 20px", lineHeight: 1.5 }}>
                        {kit.description}
                      </p>
                    </div>

                    <div style={{ marginBottom: 4 }}>
                      {kit.isFrom && (
                        <span style={{ display: "block", color: TEXT_DIM, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>
                          Desde
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: 42,
                          fontWeight: 900,
                          color: RED,
                          lineHeight: 1,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {kit.price} €
                      </span>
                    </div>
                    <p style={{ color: TEXT_DIM, fontSize: 11, margin: "0 0 20px" }}>
                      + IVA{kit.isFrom ? " · precio orientativo" : " (IVA no incluido)"}
                    </p>

                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                      {kit.items.map((item, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                          <CheckCircle size={15} color="#22C55E" style={{ flexShrink: 0, marginTop: 2 }} />
                          <span style={{ color: TEXT, fontSize: 13, lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
                      {kit.storageNote && (
                        <p style={{ color: TEXT_DIM, fontSize: 11.5, margin: "4px 0 0", lineHeight: 1.5 }}>{kit.storageNote}</p>
                      )}
                    </div>

                    <button
                      onClick={() => openDrawer(kit.title)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        background: highlighted ? RED : "rgba(255,255,255,0.06)",
                        border: highlighted ? "none" : `1px solid ${BORDER}`,
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 14,
                        padding: "13px 0",
                        borderRadius: 10,
                        cursor: "pointer",
                        width: "100%",
                        marginBottom: 10,
                      }}
                    >
                      {kit.ctaLabel || "Solicitar presupuesto"}
                    </button>
                    <a
                      href="tel:+34638109947"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        background: "transparent",
                        color: TEXT_DIM,
                        fontWeight: 600,
                        fontSize: 13,
                        padding: "8px 0",
                        textDecoration: "none",
                      }}
                    >
                      <Phone size={14} />
                      Llamar ahora
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CONTROLES tab */}
      {activeTab === "controles" && (
        <section style={{ background: BG, padding: "72px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 48,
                alignItems: "center",
              }}
            >
              <div>
                <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 36, margin: "0 0 20px", letterSpacing: "-0.01em" }}>
                  Control de Acceso Profesional
                </h2>
                <p style={{ color: TEXT_DIM, fontSize: 16, lineHeight: 1.7, margin: "0 0 16px" }}>
                  Instalación de sistemas de control de acceso mediante lector de tarjetas de proximidad, destrabador eléctrico, lector dactilar, reconocimiento facial y tecleras de código.
                </p>
                <p style={{ color: TEXT_DIM, fontSize: 16, lineHeight: 1.7, margin: "0 0 28px" }}>
                  Funcionamiento con respaldo computacional y registro de entradas, o de manera local para aperturas de puntos específicos.
                </p>

                <div
                  style={{
                    background: BG2,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 16,
                    padding: "24px",
                    marginBottom: 28,
                  }}
                >
                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 15, margin: "0 0 16px" }}>
                    Métodos de identificación
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      "Tarjetas de proximidad RFID",
                      "Lector de huella dactilar",
                      "Reconocimiento facial avanzado",
                      "Teclera con códigos PIN",
                      "Combinación de múltiples métodos",
                      "Control remoto desde app móvil",
                    ].map((m, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <CheckCircle size={15} color={RED} style={{ flexShrink: 0 }} />
                        <span style={{ color: TEXT, fontSize: 14 }}>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a
                    href="tel:+34638109947"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: RED,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 15,
                      padding: "13px 28px",
                      borderRadius: 10,
                      textDecoration: "none",
                    }}
                  >
                    <Phone size={16} />
                    Llamar ahora
                  </a>
                  <a
                    href="/#contacto"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid ${BORDER}`,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 15,
                      padding: "13px 28px",
                      borderRadius: 10,
                      textDecoration: "none",
                    }}
                  >
                    Solicitar presupuesto
                  </a>
                </div>
              </div>

              <div>
                <img
                  src="https://media.base44.com/images/public/6995a701232755a2d5e24b39/1d629183e_IMG_8285.png"
                  alt="Control de acceso profesional"
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", borderRadius: 16, border: `1px solid ${BORDER}` }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        style={{
          background: BG2,
          borderTop: `1px solid ${BORDER}`,
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 32, margin: "0 0 14px", letterSpacing: "-0.01em" }}>
            Protege tu propiedad hoy mismo
          </h2>
          <p style={{ color: TEXT_DIM, fontSize: 16, margin: "0 0 32px", lineHeight: 1.65 }}>
            Contacta con nosotros y te asesoraremos sin compromiso
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="tel:+34638109947"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: RED,
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                padding: "15px 32px",
                borderRadius: 12,
                textDecoration: "none",
              }}
            >
              <Phone size={18} />
              Llamar ahora
            </a>
            <a
              href="/#contacto"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${BORDER}`,
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                padding: "15px 32px",
                borderRadius: 12,
                textDecoration: "none",
              }}
            >
              Solicitar presupuesto
            </a>
          </div>
        </div>
      </section>

      {/* Responsive stacking para las rejillas de kits — antes fijas a
          repeat(3,1fr)/repeat(2,1fr) sin ningún @media, así que se
          desbordaban en móvil. */}
      <style>{`
        @media (max-width: 720px) {
          .promo-kits-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1024px) and (min-width: 721px) {
          .promo-kits-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        .promo-kit-card--highlight:hover { box-shadow: 0 24px 56px rgba(229,62,62,0.3) !important; }
        @media (prefers-reduced-motion: reduce) {
          .promo-kit-card--highlight { transition: none !important; }
        }
      `}</style>

      <FooterSection />
    </div>
  );
}
