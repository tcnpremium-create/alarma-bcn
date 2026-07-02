import React, { useState } from "react";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";
import AdvancedSEO from "../seo/AdvancedSEO";
import HeroContactModal from "./HeroContactModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Smartphone, Clock, CheckCircle, Camera, Wifi, Eye, HardDrive, Lock, Sun } from "lucide-react";

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

const SERVICES = [
  {
    num: "01",
    title: "Cámaras para Hogar",
    desc: "Protege tu vivienda con cámaras HD 4K en puntos clave: acceso principal, garaje, jardín. Control total desde el móvil, visión nocturna en color y grabación local sin cuotas.",
    features: ["Cámaras domo y bala HD 4K exteriores e interiores", "Visión nocturna en color hasta 30m", "Grabador NVR con disco duro local", "App móvil iOS y Android gratuita", "Alertas por movimiento en tiempo real", "Sin cuotas mensuales"],
  },
  {
    num: "02",
    title: "Cámaras para Negocio",
    desc: "Instalaciones profesionales para tiendas, oficinas y locales comerciales. Grabación continua 24/7, acceso multiusuario y alta resolución para identificar detalles con claridad.",
    features: ["Resolución 4K Ultra HD para identificación de detalles", "Grabación continua 24/7 con grabador profesional", "Cámaras PTZ motorizadas con zoom óptico", "Acceso remoto multiusuario desde cualquier dispositivo", "Compatible con central receptora de alarmas", "Cumplimiento normativa RGPD incluido"],
  },
  {
    num: "03",
    title: "Cámaras para Comunidades",
    desc: "Solución completa para portales, garajes, escaleras y zonas comunes. Gestión RGPD incluida, señalética homologada y acceso restringido por perfiles.",
    features: ["Cobertura de portal, garaje y zonas comunes", "Cámaras domo antivandálicas IP66", "Grabador NVR con almacenamiento RAID", "Gestión legal RGPD con documentación incluida", "Señalética homologada incluida", "Acceso restringido por roles (presidente, administrador)"],
  },
];

const WHAT_WE_DO = [
  { icon: <Camera className="w-5 h-5" />, title: "Cámara Domo", desc: "Para interiores y exteriores. Diseño discreto, 360°, resistente al vandalismo." },
  { icon: <Eye className="w-5 h-5" />, title: "Cámara Bullet", desc: "Larga distancia, hasta 60m. Ideal para entradas, vallas y accesos exteriores." },
  { icon: <Wifi className="w-5 h-5" />, title: "Cámara PTZ", desc: "Motorizada con zoom óptico 20x. Control remoto de pan, tilt y zoom." },
  { icon: <Sun className="w-5 h-5" />, title: "Visión Nocturna Color", desc: "Imagen en color incluso en oscuridad total gracias a infrarrojos avanzados." },
  { icon: <HardDrive className="w-5 h-5" />, title: "Grabador NVR / DVR", desc: "Almacenamiento local seguro de 1 a 16TB. Sin depender de la nube." },
  { icon: <Smartphone className="w-5 h-5" />, title: "App Móvil", desc: "Visualización en tiempo real desde iOS y Android. Sin coste adicional." },
  { icon: <Lock className="w-5 h-5" />, title: "Sin Cuotas Mensuales", desc: "Pago único, sin sorpresas. El sistema es tuyo para siempre." },
  { icon: <Shield className="w-5 h-5" />, title: "Matrícula y Zona", desc: "Cámaras con lectura de matrículas y detección por zonas configurables." },
];

const BENEFITS = [
  { icon: Shield, title: "Sin cuotas mensuales", desc: "Pago único, sin permanencia ni sorpresas" },
  { icon: CheckCircle, title: "Instalación incluida", desc: "Técnicos certificados, sin obras ni roturas" },
  { icon: Clock, title: "Garantía de por vida", desc: "Soporte técnico y mantenimiento permanente" },
  { icon: Smartphone, title: "Respuesta en 24h", desc: "Presupuesto y visita en menos de un día" },
];

export default function CameraCityTemplate({ city, seoTitle, seoDescription, seoPath, intro, faqs }) {
  const [showModal, setShowModal] = useState(false);

  const defaultFaqs = [
    {
      q: `¿Cuánto cuesta instalar cámaras de seguridad en ${city}?`,
      a: `El precio depende del número de cámaras, tipo y ubicación. En Premium Tech Security ofrecemos presupuesto gratuito sin compromiso. Consulta nuestros kits de instalación desde 699€ (IVA no incluido) con instalación y grabador incluidos, sin cuotas mensuales.`,
    },
    {
      q: `¿Qué marcas de cámaras instaláis en ${city}?`,
      a: `Trabajamos con las mejores marcas del mercado: Hikvision y Dahua, líderes mundiales en videovigilancia. Todas nuestras cámaras son de resolución mínima 4MPx (2K), con visión nocturna en color y resistencia IP66 para exteriores.`,
    },
    {
      q: `¿Las cámaras necesitan conexión a internet para funcionar?`,
      a: `No es obligatorio. Instalamos grabadores NVR con disco duro local para que el sistema funcione sin internet y sin depender de la nube. La visualización remota desde el móvil sí requiere conexión, pero la grabación continúa aunque falle el internet.`,
    },
    {
      q: `¿Cuántos días de grabación almacena el sistema?`,
      a: `Depende del número de cámaras y la capacidad del disco. Un disco de 1TB con 2 cámaras graba aproximadamente 15-20 días continuos. Con discos de 4TB y 8 cámaras, entre 7 y 10 días en grabación continua 24/7.`,
    },
    {
      q: `¿Cuánto tarda la instalación en ${city}?`,
      a: `La mayoría de instalaciones domésticas (2-4 cámaras) se completan en unas pocas horas en un solo día. Para negocios y comunidades con 8 o más cámaras puede requerir 1-2 días. Trabajamos de manera limpia y ordenada.`,
    },
    {
      q: `¿Cumplen con el RGPD las cámaras de seguridad?`,
      a: `Sí. Nos encargamos de toda la tramitación: señalética homologada, configuración correcta de ángulo de visión (solo zona privada), documentación RGPD y registro si procede. Para comunidades de vecinos incluimos la documentación completa para la junta.`,
    },
  ];

  const faqList = faqs || defaultFaqs;

  return (
    <div className="min-h-screen bg-white" style={{ paddingBottom: 70 }}>
      <AdvancedSEO
        title={seoTitle || `Instalación Cámaras de Seguridad en ${city} | Sin Cuotas | Premium Tech Security`}
        description={seoDescription || `Instalamos cámaras de seguridad en ${city}. Hikvision y Dahua. 4K HD. Sin cuotas mensuales. Presupuesto gratis en 24h. Llama al 638 10 99 47.`}
        keywords={`cámaras seguridad ${city}, instalación cámaras ${city}, videovigilancia ${city}, CCTV ${city}`}
        canonicalUrl={`https://alarmasenbarcelona.com${seoPath}`}
      />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", width: "100%", overflow: "hidden", height: "70vh", maxHeight: "70vh", backgroundColor: "#0A0A1A", paddingTop: 0 }}>
        <img
          src="/images/camaras-seguridad-hero.jpeg"
          alt={`Cámaras de seguridad en ${city}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0A0A1A 20%, rgba(10,10,26,0.55) 60%, rgba(10,10,26,0.2) 100%)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 800, margin: "0 auto", padding: "0 20px", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", paddingBottom: 48, paddingTop: 80 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.35)", borderRadius: 20, padding: "5px 14px", color: "#E53E3E", fontSize: 11, fontWeight: 700, letterSpacing: 1, width: "fit-content", marginBottom: 16 }}>
            <span style={{ width: 7, height: 7, backgroundColor: "#E53E3E", borderRadius: "50%", display: "inline-block" }} />
            INSTALACIÓN PROFESIONAL EN {city.toUpperCase()}
          </span>
          <h1 style={{ fontWeight: 900, fontSize: "clamp(26px, 5vw, 46px)", color: "#fff", lineHeight: 1.15, margin: "0 0 12px" }}>
            Instalación de Cámaras de Seguridad en <span style={{ color: "#E53E3E" }}>{city}</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 16, lineHeight: 1.7, margin: "0 0 24px", maxWidth: 560 }}>
            {intro || `Videovigilancia HD 4K para hogar, negocio y comunidades. Sin cuotas mensuales. Grabador local incluido. Presupuesto gratis en 24h.`}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 380 }}>
            <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "15px 24px", border: "none", cursor: "pointer" }}>
              Solicitar presupuesto gratis →
            </button>
            <a href="tel:+34638109947" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 50, padding: "13px 24px", textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              📞 Llamar
            </a>
          </div>
        </div>
      </section>

      {/* ── TODO LO QUE INSTALAMOS ── */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 8px" }}>Todo lo que instalamos</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Desde una cámara hasta instalaciones profesionales completas — con o sin grabador, con o sin internet</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }} className="sm:grid-cols-2">
            {WHAT_WE_DO.map((s, idx) => (
              <div key={s.title} style={{ display: "flex", gap: 14, padding: "20px 0", borderBottom: "1px solid #F3F4F6", alignItems: "flex-start" }}>
                <div style={{ color: "#E53E3E", flexShrink: 0, marginTop: 1 }}>{s.icon}</div>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: 14, color: "#0A0A1A", margin: "0 0 4px" }}>{s.title}</h3>
                  <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERIOR CAMERA IMAGE ── */}
      <section style={{ backgroundColor: "#0A0A1A", padding: "40px 20px 0" }}>
        <div className="max-w-4xl mx-auto">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 20, padding: "5px 14px", color: "#F87171", fontSize: 11, fontWeight: 700, letterSpacing: 1, width: "fit-content" }}>
              INSTALACIÓN EN INTERIORES Y EXTERIORES
            </span>
            <h2 style={{ fontWeight: 900, fontSize: 24, color: "#fff", margin: 0 }}>Vigilancia total, día y noche</h2>
            <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.7, margin: 0, maxWidth: 540 }}>
              Cámaras domo de última generación con visión nocturna en color. Cobertura completa de portales, pasillos, ascensores, garajes y zonas comunes. Imagen nítida en cualquier condición de luz.
            </p>
          </div>
          <img
            src="/images/camara-domo-pasillo.jpeg"
            alt="Cámara domo de seguridad instalada en pasillo de comunidad"
            style={{ width: "100%", borderRadius: "20px 20px 0 0", marginTop: 24, display: "block", maxHeight: 320, objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section style={{ backgroundColor: "#fff", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 8px" }}>Soluciones de Videovigilancia en {city}</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Instalación profesional adaptada a tu espacio — hogar, negocio o comunidad</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.num} style={{ backgroundColor: "#F8F9FA", borderRadius: 16, padding: 24, border: "1px solid #E5E7EB" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#E53E3E", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <span style={{ color: "#fff", fontWeight: 900, fontSize: 13 }}>{s.num}</span>
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0A0A1A", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65, margin: "0 0 14px" }}>{s.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {s.features.map((f) => (
                    <li key={f} style={{ fontSize: 12, color: "#374151", lineHeight: 2 }}>
                      <span style={{ color: "#E53E3E", fontWeight: 700, marginRight: 6 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "14px 32px", border: "none", cursor: "pointer" }}>
              Ver precios y solicitar presupuesto →
            </button>
          </div>
        </div>
      </section>

      {/* ── KITS DE CÁMARAS ── */}
      <section style={{ background: "#0A1120", padding: "64px 20px" }}>
        <div className="max-w-4xl mx-auto">
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
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", fontWeight: 900, color: "#FFFFFF", margin: "0 0 10px", letterSpacing: "-0.025em" }}>
              Kits de Cámaras con instalación incluida en {city}
            </h2>
            <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>Precio cerrado. Sin sorpresas. Sin cuotas mensuales.</p>
          </div>

          <div className="kits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {CAMERA_KITS.map((kit, i) => {
              const isHighlighted = i === 1;
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

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 }}>
                    {kit.items.map((item) => (
                      <li key={item} style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.9, display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: "#E53E3E", flexShrink: 0, fontWeight: 900, fontSize: 14, lineHeight: 1.9 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => setShowModal(true)} style={{
                    display: "block", width: "100%",
                    background: isHighlighted ? "#E53E3E" : "rgba(229,62,62,0.15)",
                    color: "#fff", fontWeight: 700, fontSize: 14,
                    borderRadius: 50, padding: "14px 0",
                    border: isHighlighted ? "none" : "1px solid rgba(229,62,62,0.4)",
                    cursor: "pointer", textAlign: "center"
                  }}>
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

      {/* ── WHY US ── */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 28px", textAlign: "center" }}>¿Por qué elegirnos en {city}?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: "rgba(229,62,62,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <b.icon style={{ width: 28, height: 28, color: "#E53E3E" }} />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 14, color: "#0A0A1A", margin: "0 0 4px" }}>{b.title}</h3>
                <p style={{ fontSize: 12, color: "#6B7280", margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: "#fff", padding: "56px 20px" }}>
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 8px" }}>Preguntas Frecuentes — Cámaras en {city}</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Todo lo que necesitas saber antes de instalar cámaras</p>
          <Accordion type="single" collapsible className="space-y-2">
            {faqList.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-[#F8F9FA] rounded-xl border border-gray-200 px-5 overflow-hidden">
                <AccordionTrigger className="text-left text-[15px] font-semibold text-[#0A0A1A] hover:text-[#E53E3E] transition-colors duration-300 py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: "linear-gradient(135deg, #E53E3E 0%, #C53030 100%)", padding: "48px 20px" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#fff", margin: "0 0 8px" }}>¿Necesitas Cámaras de Seguridad en {city}?</h2>
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 15, margin: "0 0 28px" }}>Presupuesto gratuito · Instalación incluida · Sin cuotas mensuales</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#fff", color: "#E53E3E", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: 18, border: "none", cursor: "pointer" }}>
              Solicitar presupuesto gratis →
            </button>
            <a href="tel:+34638109947" style={{ border: "2px solid rgba(255,255,255,0.5)", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: 16, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "transparent" }}>
              📞 Llamar
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
      <HeroContactModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
