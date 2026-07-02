import React, { useState, useEffect } from "react";
import { Check, Phone, Camera, Eye, Moon, Cloud, Smartphone, Lock, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import HeroContactModal from "../components/landing/HeroContactModal";
import AdvancedSEO from "../components/seo/AdvancedSEO";

const CAMERA_KITS = [
  {
    id: "basico",
    badge: null,
    title: "Kit Básico",
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
    title: "Kit Profesional",
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
    title: "Kit Empresarial",
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

const FEATURES = [
  { icon: Camera, title: "Grabación 4K Ultra HD", desc: "8 megapíxeles. Captura matrículas, rostros y detalles a distancia con claridad total." },
  { icon: Moon, title: "Visión nocturna en color", desc: "Infrarroja hasta 50m y full-color con poca luz ambiente. Sin punto ciego." },
  { icon: Cloud, title: "Grabación en nube", desc: "Acceso seguro a las grabaciones desde cualquier lugar durante 30 días." },
  { icon: Eye, title: "Detección por IA", desc: "Detecta personas y vehículos automáticamente. Cero falsas alarmas por animales o lluvia." },
  { icon: Smartphone, title: "App en tiempo real", desc: "Streaming directo a tu móvil iOS/Android desde cualquier parte del mundo." },
  { icon: Lock, title: "NVR local + nube", desc: "Almacenamiento local con redundancia en nube. Sin dependencia de un único punto de fallo." },
];

const BRANDS = [
  {
    name: "HIKVISION",
    desc: "La marca nº1 en videovigilancia mundial. Cámaras con IA integrada, grabación 4K y compresión H.265+.",
    specs: ["Resolución 4K Ultra HD – 8MP", "Compresión inteligente H.265+", "Análisis de comportamiento IA", "App iVMS-4500 profesional"],
  },
  {
    name: "DAHUA",
    desc: "Tecnología de alta gama con IA avanzada. Reconocimiento facial, detección perimetral y full-color nocturno.",
    specs: ["Reconocimiento facial IA", "Detección perimetral activa", "Visión nocturna Full Color", "App DMSS multidispositivo"],
  },
];

const FAQS = [
  { q: "¿Cuánto tiempo tarda la instalación de cámaras de seguridad?", a: "Una instalación de 4-8 cámaras en Barcelona se realiza en 1 día. Sistemas complejos con varias plantas pueden requerir 2 días. Ofrecemos instalación en 24-48h desde la firma del presupuesto." },
  { q: "¿Las cámaras funcionan de noche?", a: "Sí. Todas las cámaras Hikvision y Dahua que instalamos tienen visión nocturna infrarroja hasta 50m y full-color con poca luz. Las 4K incluyen IA para detectar personas y vehículos incluso en oscuridad total." },
  { q: "¿Puedo ver las cámaras desde el móvil?", a: "Sí. Instalamos la app correspondiente (iVMS-4500 para Hikvision, DMSS para Dahua). Streaming en tiempo real, reproducción de grabaciones y alertas push incluidas." },
  { q: "¿Necesito hacer obras para instalar las cámaras?", a: "Las cámaras exteriores requieren soporte y cable de red (PoE). Interior es aún más sencillo. También disponemos de cámaras WiFi para instalaciones sin obra en interiores." },
  { q: "¿Cuánto tiempo guardan las grabaciones?", a: "Con disco 2TB y 4 cámaras en 2K aproximadamente 30 días de grabación continua. Con 4K la retención es de 7-15 días. Ampliable con disco adicional o nube." },
  { q: "¿Necesito cumplir la LOPD para instalar cámaras?", a: "Sí. Nos encargamos de todo: instalación técnica, carteles informativos obligatorios y asesoramiento legal para el registro en la AEPD. Sistema 100% conforme a normativa vigente." },
];

export default function Videovigilancia() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", paddingBottom: 70 }}>
      <AdvancedSEO
        title="Cámaras Videovigilancia 4K Barcelona | Hikvision y Dahua | Premium Tech Security"
        description="Instalación de cámaras de videovigilancia 4K en Barcelona y Catalunya. Hikvision, Dahua. IA integrada, visión nocturna, garantía de por vida. Sin cuotas. Tel: 638 10 99 47"
        keywords="cámaras videovigilancia Barcelona, cámaras seguridad 4K Barcelona, Hikvision Barcelona, Dahua Barcelona, instalación CCTV Barcelona, videovigilancia hogar empresa comunidad"
        canonicalUrl="https://alarmasenbarcelona.com/videovigilancia"
        ogImage="https://alarmasenbarcelona.com/images/camaras-seguridad-hero.jpeg"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "name": "Instalación de Cámaras de Videovigilancia 4K",
              "serviceType": "Instalación de Sistemas de Videovigilancia Profesional",
              "description": "Instalación de cámaras de seguridad 4K Hikvision y Dahua en Barcelona y Catalunya. IA integrada, visión nocturna, app móvil.",
              "provider": { "@type": "LocalBusiness", "name": "Premium Tech Security", "telephone": "+34638109947" },
              "areaServed": ["Barcelona", "Girona", "Tarragona", "Lleida", "Catalunya"],
              "offers": { "@type": "AggregateOffer", "lowPrice": "699", "highPrice": "1500", "priceCurrency": "EUR", "offerCount": "3" }
            },
            {
              "@type": "FAQPage",
              "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
            }
          ]
        }}
      />

      <Navbar />

      {/* ── 1. HERO (VIDEO BG) ── */}
      <style>{`
        @keyframes zone-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(229,62,62,0.55); }
          50% { opacity: 0.8; box-shadow: 0 0 0 10px rgba(229,62,62,0); }
        }
        @keyframes dot-blink {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.55; }
        }
        @media (max-width: 640px) {
          .vid-badge-zone { top: 80px !important; left: 12px !important; }
          .vid-badge-zone span:last-child { font-size: 9px !important; letter-spacing: 0.08em !important; }
          .vid-badge-active { display: none !important; }
          .vid-hero-content { padding: 128px 16px 60px !important; }
        }
      `}</style>
      <section style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 600,
        backgroundImage: "url('/images/camaras-seguridad-hero.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        {/* Video — plays on top of the poster bg-image; same image used as poster attr */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/camaras-seguridad-hero.jpeg"
          style={{
            position: "absolute",
            top: 0, right: 0, bottom: 0, left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.9,
            zIndex: 1,
          }}
        >
          <source src="https://pub-c09bc177726a4cf0b240409a82635955.r2.dev/casa-protegida.mp4" type="video/mp4" />
        </video>

        {/* Subtle gradient — only left-side darkening for text contrast */}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 2, background: "linear-gradient(105deg, rgba(10,15,26,0.72) 0%, rgba(10,15,26,0.52) 40%, rgba(10,15,26,0.08) 100%)" }} />

        {/* ZONA PERIMETRAL PROTEGIDA — pulsing badge anchored top-left */}
        <div
          className="vid-badge-zone"
          style={{
            position: "absolute",
            top: 92,
            left: 24,
            zIndex: 4,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(229,62,62,0.18)",
            border: "1px solid rgba(229,62,62,0.55)",
            borderRadius: 100,
            padding: "7px 16px",
            animation: "zone-pulse 2.5s ease-in-out infinite",
            backdropFilter: "blur(6px)",
          }}
        >
          <span style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#E53E3E",
            animation: "dot-blink 2.5s ease-in-out infinite",
            flexShrink: 0,
          }} />
          <span style={{ color: "#FC8181", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            Zona Perimetral Protegida
          </span>
        </div>

        {/* Main content */}
        <div
          className="vid-hero-content"
          style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "150px 24px 72px" }}
        >
          <div style={{ maxWidth: 640 }}>
            {/* Brand badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.4)", borderRadius: 100, padding: "6px 16px", marginBottom: 22 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E53E3E" }} />
              <span style={{ color: "#FC8181", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Hikvision · Dahua · Certificados · Barcelona</span>
            </div>

            <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 3.2rem)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1, maxWidth: 660, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
              Tu Hogar o Negocio Blindado<br /><span style={{ color: "#E53E3E" }}>Sin Cuotas Mensuales</span>
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2.2vw, 1.15rem)", color: "#E2E8F0", maxWidth: 460, lineHeight: 1.55, margin: "0 0 8px", fontWeight: 600 }}>
              Videovigilancia 4K con IA para viviendas y comercios en Barcelona.
            </p>
            <p style={{ fontSize: "clamp(0.85rem, 1.8vw, 0.97rem)", color: "#94A3B8", maxWidth: 460, lineHeight: 1.65, margin: "0 0 32px" }}>
              Cámaras Hikvision y Dahua. Visión nocturna en color, detección IA y acceso desde el móvil. Sin facturas mensuales.
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: 30, marginBottom: 36, flexWrap: "wrap" }}>
              {[{ val: "4K", label: "Ultra HD" }, { val: "50m", label: "Visión nocturna" }, { val: "30d", label: "Retención" }, { val: "IA", label: "Detección activa" }].map(s => (
                <div key={s.val}>
                  <div style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900, color: "#E53E3E", lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "#718096", marginTop: 3, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
              <button onClick={() => setModalOpen(true)} style={{ background: "#E53E3E", color: "#fff", border: "none", borderRadius: 8, padding: "14px 30px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                Solicitar presupuesto gratis
              </button>
              <a href="tel:+34638109947" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#fff", border: "2px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "14px 24px", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
                <Phone size={16} /> Llamar ahora
              </a>
            </div>
            {/* Google reviews */}
            <a
              href="https://share.google/trjJFOqRhcldWdEbg"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100, padding: "8px 18px", textDecoration: "none" }}
            >
              <span style={{ color: "#FBBF24", fontWeight: 700, fontSize: 14 }}>★ 4.8</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>Reseñas verificadas en Google</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Ver →</span>
            </a>
          </div>
        </div>

        {/* Cámaras Activas 24h — floating status card bottom-right */}
        <div
          className="vid-badge-active"
          style={{
            position: "absolute",
            bottom: 28,
            right: 28,
            zIndex: 4,
            background: "rgba(10,15,26,0.82)",
            border: "1px solid rgba(229,62,62,0.35)",
            borderRadius: 14,
            padding: "16px 22px",
            backdropFilter: "blur(10px)",
            maxWidth: 240,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22C55E",
              animation: "dot-blink 2s ease-in-out infinite",
              flexShrink: 0,
            }} />
            <span style={{ color: "#22C55E", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Sistema Activo</span>
          </div>
          <div style={{ color: "#fff", fontSize: 15, fontWeight: 800, lineHeight: 1.3, marginBottom: 5 }}>
            Cámaras de Seguridad<br />Activas 24h
          </div>
          <div style={{ color: "#94A3B8", fontSize: 11, lineHeight: 1.55 }}>
            Protección continua<br />conectada a CRA
          </div>
        </div>
      </section>

      {/* ── 2. KITS DE CÁMARAS — JUSTO DESPUÉS DEL HERO ── */}
      <section style={{ background: "#0F1923", padding: "52px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Kits Profesionales de Videovigilancia — Precios Transparentes</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 900, color: "#FFFFFF", margin: "8px 0 6px", letterSpacing: "-0.02em" }}>
              Kits de Cámaras con instalación incluida
            </h2>
            <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>Precio cerrado. Sin sorpresas. Sin cuotas mensuales.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 14 }}>
            {CAMERA_KITS.map((kit, i) => (
              <div key={kit.id} style={{
                background: "rgba(255,255,255,0.05)",
                border: i === 1 ? "2px solid #E53E3E" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14, padding: "26px 22px", position: "relative",
                display: "flex", flexDirection: "column"
              }}>
                {kit.badge && (
                  <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: "#E53E3E", color: "#fff", fontSize: 10, fontWeight: 800, borderRadius: 100, padding: "3px 12px", whiteSpace: "nowrap" }}>
                    {kit.badge}
                  </div>
                )}
                <div>
                  <span style={{ color: "#fff", fontSize: 15, fontWeight: 800 }}>{kit.title}</span>
                  <span style={{ color: "#ef4444", fontSize: 15, fontWeight: 800, marginLeft: 8 }}>— {kit.cameras}</span>
                </div>
                <div style={{ color: "#64748B", fontSize: 11, marginTop: 2, marginBottom: 16 }}>Ideal: {kit.ideal}</div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: "#E53E3E", fontSize: 36, fontWeight: 900, lineHeight: 1 }}>{kit.price}</div>
                  <span style={{ color: "#64748B", fontSize: 10 }}>* IVA no incluido</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", flex: 1 }}>
                  {kit.items.map((item) => (
                    <li key={item} style={{ color: "#CBD5E0", fontSize: 12, lineHeight: 1.85, display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "#E53E3E", flexShrink: 0, fontWeight: 900 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setModalOpen(true)}
                  style={{ display: "block", width: "100%", background: "#E53E3E", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 50, padding: "13px 0", border: "none", cursor: "pointer", textAlign: "center" }}>
                  Solicitar presupuesto gratis
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FEATURES ── */}
      <section style={{ background: "#FFFFFF", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Prestaciones</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 900, color: "#0A0F1A", margin: "8px 0 0", letterSpacing: "-0.02em" }}>Características de nuestras cámaras</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ background: "#F8FAFC", borderRadius: 11, padding: "26px 22px", border: "1px solid #E2E8F0" }}>
                <div style={{ width: 42, height: 42, background: "#FFF1F1", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <f.icon size={21} color="#E53E3E" />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0A0F1A", margin: "0 0 7px" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. MARCAS ── */}
      <section style={{ background: "#0A0F1A", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Fabricantes líderes</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 900, color: "#FFFFFF", margin: "8px 0 0", letterSpacing: "-0.02em" }}>Las mejores marcas del mundo</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {BRANDS.map(b => (
              <div key={b.name} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "34px 30px" }}>
                <h3 style={{ fontSize: 21, fontWeight: 900, color: "#FFFFFF", margin: "0 0 12px", letterSpacing: "0.04em" }}>{b.name}</h3>
                <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.7, margin: "0 0 18px" }}>{b.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {b.specs.map(s => (
                    <div key={s} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#E53E3E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={9} color="#fff" strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: 13, color: "#CBD5E0" }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <section style={{ background: "#F8FAFC", padding: "72px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: "#0A0F1A", margin: "8px 0 0", letterSpacing: "-0.02em" }}>Preguntas frecuentes sobre cámaras de seguridad</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {FAQS.map((faq, idx) => (
              <div key={idx} style={{ background: "#FFFFFF", borderRadius: 9, border: "1px solid #E2E8F0", overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#0A0F1A", paddingRight: 14, lineHeight: 1.4 }}>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={17} color="#E53E3E" style={{ flexShrink: 0 }} /> : <ChevronDown size={17} color="#94A3B8" style={{ flexShrink: 0 }} />}
                </button>
                {openFaq === idx && (
                  <div style={{ padding: "0 22px 18px", borderTop: "1px solid #F1F5F9" }}>
                    <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.75, margin: "14px 0 0" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA FINAL ── */}
      <section style={{ background: "#0A0F1A", padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ width: 52, height: 52, background: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            <Camera size={22} color="#E53E3E" />
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 900, color: "#FFFFFF", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Instala cámaras 4K hoy mismo</h2>
          <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.7, margin: "0 0 32px" }}>Presupuesto gratuito en 24h. Instalación certificada. Garantía de por vida. Sin cuotas mensuales.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setModalOpen(true)} style={{ background: "#E53E3E", color: "#fff", border: "none", borderRadius: 8, padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Solicitar presupuesto gratis
            </button>
            <a href="tel:+34638109947" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#fff", border: "2px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "14px 24px", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
              <Phone size={16} /> Llamar ahora
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
      {modalOpen && <HeroContactModal onClose={() => setModalOpen(false)} defaultServicio="Videovigilancia" />}
    </div>
  );
}
