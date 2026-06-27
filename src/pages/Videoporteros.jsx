import React, { useState } from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import HeroContactModal from "../components/landing/HeroContactModal";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BRANDS = [
  { name: "FERMAX", color: "#E53E3E", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", text: "Líder español en videoporteros. Sistemas 2 hilos y IP. Pantallas táctiles Full HD. App MEET para apertura remota." },
  { name: "BTICINO", color: "#0A0A1A", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80", text: "Gama LINEA 5000 con pantalla táctil vertical 7 pulgadas. Cámara 5MP HQ. Configuración remota vía app Home+ Project." },
  { name: "GOLMAR", color: "#1a5276", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80", text: "Tecnología WDR para visión perfecta con contraluz. Gama Sixty5 con pantalla táctil capacitiva. Ideal para grandes comunidades." },
  { name: "IP ONEX", color: "#117a65", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", text: "Máxima robustez y funciones avanzadas. Integración con cámaras HD y control de accesos. Protección superior en entornos exigentes." },
];

const SOLUTIONS = [
  {
    icon: "🏠", title: "Vivienda Unifamiliar",
    features: ["Videoportero con cámara HD 1080p", "App móvil apertura remota", "Visión nocturna integrada", "Audio bidireccional HD", "Instalación en 1 día"],
    price: "Desde 299€ instalado",
    wa: "https://wa.me/34638109947?text=Hola,%20quiero%20un%20videoportero%20para%20mi%20vivienda",
  },
  {
    icon: "🏘️", title: "Comunidad de Vecinos",
    features: ["Sistema 2 hilos o IP según instalación existente", "Pantalla táctil directorio de vecinos", "Cámara WDR anti-contraluz", "Apertura garaje integrada", "Gestión centralizada", "RGPD cumplimiento incluido"],
    price: "Desde 599€ instalado",
    wa: "https://wa.me/34638109947?text=Hola,%20quiero%20un%20videoportero%20para%20mi%20comunidad",
  },
  {
    icon: "🏢", title: "Empresa / Oficina",
    features: ["Sistema IP puro alta seguridad", "Integración con alarma y CCTV", "Control de accesos unificado", "Registro de entradas/salidas", "App multidispositivo", "Mantenimiento incluido 1 año"],
    price: "Presupuesto a medida",
    wa: "https://wa.me/34638109947?text=Hola,%20quiero%20un%20videoportero%20para%20mi%20empresa",
  },
];

const TECH = [
  { icon: "🎥", title: "Cámara hasta 5MP", desc: "Identifica con total claridad quién llama, de día y de noche" },
  { icon: "📱", title: "Apertura Remota", desc: "Abre la puerta desde cualquier parte del mundo con tu móvil" },
  { icon: "🔗", title: "Integración Total", desc: "Compatible con tu sistema de alarma y cámaras de seguridad" },
  { icon: "🔊", title: "Audio HD", desc: "Comunicación bidireccional cristalina con cancelación de eco" },
];

const FAQS = [
  { q: "¿Puedo instalar un videoportero sin cambiar el cableado de 2 hilos?", a: "Sí. Instalamos módulos IP que convierten tu instalación de 2 hilos existente en un sistema inteligente con app, sin necesidad de cambiar el cableado. Es la solución más económica para comunidades que quieren modernizarse." },
  { q: "¿Cuánto cuesta instalar un videoportero en una comunidad de vecinos?", a: "Depende del número de viviendas y del sistema actual. Para una comunidad de 10-20 vecinos, el precio parte desde 599€ con instalación incluida. Ofrecemos presupuesto gratuito sin compromiso." },
  { q: "¿El videoportero se puede integrar con mis cámaras de seguridad?", a: "Sí, todos nuestros sistemas IP se integran nativamente con cámaras CCTV y sistemas de alarma, creando una plataforma de seguridad unificada gestionable desde una sola app." },
  { q: "¿Qué pasa si me llaman cuando estoy fuera?", a: "Con nuestros sistemas recibes una notificación en tu móvil, ves al visitante en tiempo real y puedes abrir la puerta remotamente desde cualquier lugar del mundo." },
];

export default function Videoporteros() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-white" style={{ paddingBottom: 70 }}>
      <AdvancedSEO
        title="Instalación Videoporteros Barcelona | Fermax, Bticino, Golmar | Premium Tech Security"
        description="Instalamos videoporteros IP y 2 hilos en Barcelona y toda Catalunya. Fermax, Bticino, Golmar. Para comunidades, negocios y hogares. Presupuesto gratis 638 10 99 47."
        keywords="videoporteros Barcelona, instalación videoportero, Fermax Barcelona, Bticino, Golmar, videoportero IP, videoportero comunidad vecinos"
        canonicalUrl="https://alarmasenbarcelona.com/videoporteros"
      />
      <Navbar />

      {/* Hero */}
      <section style={{ backgroundColor: "#0A0A1A", minHeight: "60vh", padding: "40px 20px", paddingTop: 100 }} className="sm:pt-28 flex items-center">
        <div className="max-w-3xl mx-auto">
          <span style={{ display: "inline-block", backgroundColor: "#E53E3E", color: "#fff", borderRadius: 20, fontSize: 11, fontWeight: 800, padding: "6px 14px", marginBottom: 16 }}>
            📹 VIDEOPORTEROS IP · BARCELONA
          </span>
          <h1 style={{ fontWeight: 900, fontSize: 32, color: "#fff", lineHeight: 1.15, margin: 0 }}>
            Videoporteros Inteligentes con App Móvil. Ve quién llama desde cualquier lugar.
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: 16, lineHeight: 1.7, marginTop: 12 }}>
            Instalamos videoporteros IP de última generación para hogares, comunidades y empresas en Barcelona y toda Catalunya. Control total desde tu smartphone. Apertura remota. Imagen HD 24/7.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 28, paddingTop: 20, paddingBottom: 20, borderTop: "1px solid rgba(255,255,255,0.15)", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
            <div><div style={{ fontSize: 28, fontWeight: 900, color: "#E53E3E" }}>2500+</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Instalaciones</div></div>
            <div><div style={{ fontSize: 28, fontWeight: 900, color: "#E53E3E" }}>15+</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Años experiencia</div></div>
            <div><div style={{ fontSize: 28, fontWeight: 900, color: "#E53E3E" }}>24/7</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Soporte</div></div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
            <button onClick={() => setShowModal(true)} style={{ width: "100%", backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: 18, border: "none", cursor: "pointer" }}>
              Solicitar presupuesto →
            </button>
            <a href="tel:+34638109947" style={{ width: "100%", backgroundColor: "#fff", color: "#0A0A1A", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: 18, border: "none", textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxSizing: "border-box" }}>
              📞 Llamar
            </a>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "40px 20px" }}>
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 22, color: "#0A0A1A", marginBottom: 20 }}>Marcas Oficiales que Instalamos</h2>
          <div className="grid grid-cols-2 gap-4">
            {BRANDS.map((b) => (
              <div key={b.name} style={{ backgroundColor: "#F8F9FA", borderRadius: 12, padding: 20, textAlign: "center" }}>
                <img src={b.image} alt={b.name} style={{ width: "100%", height: 120, objectFit: "contain", padding: 16, marginBottom: 8 }} />
                <div style={{ fontWeight: 900, fontSize: 20, color: b.color, marginBottom: 8 }}>{b.name}</div>
                <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, margin: 0 }}>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "40px 20px" }}>
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 22, color: "#0A0A1A", marginBottom: 20 }}>Solución para Cada Espacio</h2>
          <div className="grid grid-cols-1 gap-5">
            {SOLUTIONS.map((s) => (
              <div key={s.title} style={{ backgroundColor: "#fff", borderRadius: 16, padding: 24, border: "1px solid #E5E7EB" }}>
                <h3 style={{ fontWeight: 800, fontSize: 18, color: "#0A0A1A", marginBottom: 12 }}>{s.icon} {s.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {s.features.map((f) => (
                    <li key={f} style={{ fontSize: 14, color: "#374151", lineHeight: 2 }}>
                      <span style={{ color: "#E53E3E", fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setShowModal(true)} style={{ display: "block", width: "100%", backgroundColor: "#E53E3E", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 50, padding: 14, textAlign: "center", textDecoration: "none", marginTop: 16, boxSizing: "border-box", border: "none", cursor: "pointer" }}>
                  Solicitar presupuesto →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech */}
      <section style={{ backgroundColor: "#0A0A1A", padding: "40px 20px" }}>
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 22, color: "#fff", marginBottom: 20 }}>Tecnología que Marca la Diferencia</h2>
          <div className="grid grid-cols-2 gap-4">
            {TECH.map((t) => (
              <div key={t.title} style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: "#fff", marginBottom: 6 }}>{t.title}</h3>
                <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.5, margin: 0 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "40px 20px" }}>
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 22, color: "#0A0A1A", marginBottom: 20 }}>Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-[#F8F9FA] rounded-xl border border-gray-200 px-5 overflow-hidden">
                <AccordionTrigger className="text-left text-[15px] font-semibold text-[#0A0A1A] hover:text-[#E53E3E] transition-colors duration-300 py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "linear-gradient(135deg, #E53E3E, #C53030)", padding: "40px 20px" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#fff", marginBottom: 8 }}>¿Necesitas un Videoportero en Barcelona?</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginBottom: 24 }}>Presupuesto gratuito · Instalación en 1 día · Garantía de por vida</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button onClick={() => setShowModal(true)} style={{ width: "100%", backgroundColor: "#fff", color: "#E53E3E", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: 18, border: "none", cursor: "pointer" }}>
              Solicitar presupuesto →
            </button>
            <a href="tel:+34638109947" style={{ width: "100%", border: "2px solid rgba(255,255,255,0.5)", color: "#fff", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: 16, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxSizing: "border-box", backgroundColor: "transparent" }}>
              📞 Llamar
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
      <HeroContactModal open={showModal} onClose={() => setShowModal(false)} defaultServicio="Videoportero" />
    </div>
  );
}