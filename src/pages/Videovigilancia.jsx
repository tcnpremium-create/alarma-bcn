import React, { useState, useEffect } from "react";
import { Check, Phone, Camera, Eye, Moon, Cloud, Smartphone, Lock, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import HeroContactModal from "../components/landing/HeroContactModal";
import PromoAccordion from "../components/landing/PromoAccordion";
import AdvancedSEO from "../components/seo/AdvancedSEO";

const CAMERA_PROMOS = [
  {
    header: "Kit Básico — 2 Cámaras · Ideal Hogar",
    oldPrice: "690€", price: "449€", savings: "241€",
    features: ["2 Cámaras Hikvision 4MPx (2K) exterior/interior", "Grabador NVR local con disco 1TB", "Visión nocturna en color hasta 30m", "App móvil iOS/Android incluida", "Instalación profesional incluida", "Garantía de por vida en equipos", "Sin cuotas mensuales"],
    ctaText: "WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20reservar%20el%20Kit%202%20Cámaras%20por%20449€",
  },
  {
    header: "Kit Profesional — 4 Cámaras · Más Vendido", badge: "MÁS VENDIDO",
    oldPrice: "1.190€", price: "699€", savings: "491€",
    features: ["4 Cámaras Hikvision 4MPx (2K) exterior/interior", "Grabador NVR 4 canales con disco 2TB", "Detección IA de personas y vehículos", "Visión nocturna en color 30m", "App móvil iOS/Android incluida", "Instalación profesional en 1 día", "Garantía de por vida en equipos", "Sin cuotas mensuales"],
    ctaText: "WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20reservar%20el%20Kit%204%20Cámaras%20por%20699€",
  },
  {
    header: "Kit Empresarial — 8 Cámaras · Negocio y Comunidades",
    oldPrice: "1.990€", price: "1.199€", savings: "791€",
    features: ["8 Cámaras 4K Ultra HD exterior/interior", "Grabador NVR 8 canales con disco 4TB", "IA detección avanzada de intrusos y matrículas", "Visión nocturna en color 40m", "App móvil multiusuario", "Instalación profesional 1-2 días", "Garantía de por vida en equipos", "Sin cuotas mensuales"],
    ctaText: "WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20reservar%20el%20Kit%208%20Cámaras%20por%201.199€",
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
              "offers": { "@type": "AggregateOffer", "lowPrice": "449", "highPrice": "1199", "priceCurrency": "EUR", "offerCount": "3" }
            },
            {
              "@type": "FAQPage",
              "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
            }
          ]
        }}
      />

      <Navbar />

      {/* ── 1. HERO ── */}
      <section style={{ position: "relative", background: "#0A0F1A", overflow: "hidden", minHeight: 520, paddingTop: 80 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/camaras-seguridad-hero.jpeg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.28 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #0A0F1A 58%, transparent 100%)" }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "60px 24px 64px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.4)", borderRadius: 100, padding: "6px 16px", marginBottom: 22 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E53E3E" }} />
            <span style={{ color: "#FC8181", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Hikvision · Dahua · Certificados · Barcelona</span>
          </div>

          <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 3.2rem)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1, maxWidth: 660, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Cámaras de Seguridad<br /><span style={{ color: "#E53E3E" }}>4K Profesionales.</span>
          </h1>
          <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "#CBD5E0", maxWidth: 480, lineHeight: 1.65, margin: "0 0 32px" }}>
            Videovigilancia Hikvision y Dahua en Barcelona. Grabación 4K con IA, visión nocturna en color y acceso desde el móvil. Sin cuotas mensuales.
          </p>

          <div style={{ display: "flex", gap: 30, marginBottom: 36, flexWrap: "wrap" }}>
            {[{ val: "4K", label: "Ultra HD" }, { val: "50m", label: "Visión nocturna" }, { val: "30d", label: "Retención" }, { val: "IA", label: "Detección activa" }].map(s => (
              <div key={s.val}>
                <div style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900, color: "#E53E3E", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "#718096", marginTop: 3, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* BOTONES CTA */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setModalOpen(true)} style={{ background: "#E53E3E", color: "#fff", border: "none", borderRadius: 8, padding: "14px 30px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Solicitar presupuesto gratis
            </button>
            <a href="tel:+34638109947" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#fff", border: "2px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "14px 24px", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
              <Phone size={16} /> Llamar ahora
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. PROMOCIONES — JUSTO DESPUÉS DEL HERO ── */}
      <section style={{ background: "#0F1923", padding: "56px 24px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Oferta exclusiva · Plazas limitadas</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 900, color: "#FFFFFF", margin: "8px 0 8px", letterSpacing: "-0.02em" }}>
              Kits de Cámaras con instalación incluida
            </h2>
            <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>Precio cerrado. Sin sorpresas. Sin cuotas mensuales.</p>
          </div>
          <PromoAccordion items={CAMERA_PROMOS} />
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
