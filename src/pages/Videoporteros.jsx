import React, { useState } from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import HeroContactModal from "../components/landing/HeroContactModal";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Smartphone, Eye, Wifi, Shield, Star, ChevronRight } from "lucide-react";

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
  { icon: <Eye className="w-7 h-7" style={{ color: "#E53E3E" }} />, title: "Cámara hasta 5MP WDR", desc: "Identifica con total claridad quién llama, incluso a contraluz, de día y de noche" },
  { icon: <Smartphone className="w-7 h-7" style={{ color: "#E53E3E" }} />, title: "Apertura Remota", desc: "Abre la puerta desde cualquier parte del mundo con tu móvil, aunque estés de viaje" },
  { icon: <Wifi className="w-7 h-7" style={{ color: "#E53E3E" }} />, title: "Integración Total", desc: "Compatible con tu sistema de alarma, cámaras de seguridad y control de accesos" },
  { icon: <Shield className="w-7 h-7" style={{ color: "#E53E3E" }} />, title: "Instalación Garantizada", desc: "Técnicos certificados. Garantía de 3 años en todos los equipos instalados" },
];

const FAQS = [
  { q: "¿Puedo instalar un videoportero sin cambiar el cableado de 2 hilos?", a: "Sí. Instalamos módulos IP que convierten tu instalación de 2 hilos existente en un sistema inteligente con app, sin necesidad de cambiar el cableado. Es la solución más económica para comunidades que quieren modernizarse." },
  { q: "¿Cuánto cuesta instalar un videoportero en una comunidad de vecinos?", a: "Depende del número de viviendas y del sistema actual. Para una comunidad de 10-20 vecinos, el precio parte desde 599€ con instalación incluida. Ofrecemos presupuesto gratuito sin compromiso." },
  { q: "¿El videoportero se puede integrar con mis cámaras de seguridad?", a: "Sí, todos nuestros sistemas IP se integran nativamente con cámaras CCTV y sistemas de alarma, creando una plataforma de seguridad unificada gestionable desde una sola app." },
  { q: "¿Qué pasa si me llaman cuando estoy fuera?", a: "Con nuestros sistemas recibes una notificación instantánea en tu móvil, ves al visitante en tiempo real con vídeo HD y puedes abrir la puerta remotamente desde cualquier lugar del mundo." },
  { q: "¿Cuánto tarda la instalación?", a: "Una vivienda unifamiliar se instala en pocas horas. Una comunidad de vecinos de 10-20 pisos se completa en 1 día. Trabajamos de manera limpia y ordenada, sin obras ni molestias." },
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

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0F1923 0%, #1a2a3a 60%, #0A0A1A 100%)", minHeight: "70vh", paddingTop: 100, paddingBottom: 40, overflow: "hidden", position: "relative" }}>
        {/* Background accent */}
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,62,62,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 20, padding: "6px 14px", width: "fit-content" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#E53E3E", boxShadow: "0 0 8px #E53E3E" }} />
            <span style={{ color: "#F87171", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>VIDEOPORTEROS IP · BARCELONA</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 items-center">
            {/* Text */}
            <div>
              <h1 style={{ fontWeight: 900, fontSize: "clamp(26px, 5vw, 42px)", color: "#fff", lineHeight: 1.15, margin: 0 }}>
                Videoporteros Inteligentes.<br />
                <span style={{ color: "#E53E3E" }}>Ve quién llama</span> desde cualquier lugar.
              </h1>
              <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.75, marginTop: 14 }}>
                Instalamos videoporteros IP de última generación para hogares, comunidades y empresas en Barcelona y toda Catalunya. Control total desde tu smartphone. Imagen HD 24/7. Apertura remota.
              </p>

              <div style={{ display: "flex", gap: 28, marginTop: 24, paddingTop: 20, paddingBottom: 20, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <div><div style={{ fontSize: 26, fontWeight: 900, color: "#E53E3E" }}>+2500</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Instalaciones</div></div>
                <div><div style={{ fontSize: 26, fontWeight: 900, color: "#E53E3E" }}>15+</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Años experiencia</div></div>
                <div><div style={{ fontSize: 26, fontWeight: 900, color: "#E53E3E" }}>3 años</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Garantía</div></div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: "16px 24px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  Solicitar presupuesto gratis <ChevronRight className="w-5 h-5" />
                </button>
                <a href="tel:+34638109947" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 50, padding: "14px 24px", textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  📞 638 10 99 47
                </a>
              </div>
            </div>

            {/* Hero product image */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: -20, borderRadius: 32, background: "radial-gradient(circle, rgba(229,62,62,0.15) 0%, transparent 70%)" }} />
                <img
                  src="/images/bticino-videoportero.jpeg"
                  alt="Videoportero BTicino Classe 300 con monitor y placa exterior"
                  style={{ width: "100%", maxWidth: 380, borderRadius: 24, boxShadow: "0 32px 80px rgba(0,0,0,0.5)", display: "block", position: "relative" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section style={{ backgroundColor: "#fff", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: 0 }}>Marcas Oficiales que Instalamos</h2>
            <p style={{ color: "#6B7280", fontSize: 14, marginTop: 8 }}>Distribuidores oficiales de las mejores marcas europeas de videoporteros</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">

            {/* FERMAX */}
            <div style={{ backgroundColor: "#F8F9FA", borderRadius: 20, overflow: "hidden", border: "1px solid #E5E7EB" }}>
              <div style={{ backgroundColor: "#1B4F8A", padding: "24px 20px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 100 }}>
                <img src="/images/logo-fermax.png" alt="Fermax videoporteros" style={{ height: 52, width: "auto", objectFit: "contain", display: "block" }} />
              </div>
              <div style={{ padding: "20px 20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <Star className="w-4 h-4" style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5 }}>Líder en España desde 1956</span>
                </div>
                <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, margin: 0 }}>
                  Fermax nació en Valencia y es hoy uno de los mayores fabricantes de videoporteros del mundo. Su gama <strong>DUOX Plus</strong> funciona sobre el cableado de 2 hilos existente —sin obra— y ofrece imagen HD y app <strong>MEET</strong> para abrir la puerta desde cualquier parte del mundo. La serie <strong>VEO</strong> incorpora pantalla táctil de 7&quot; con visión nocturna automática. ISO 9001 · Presencia en más de 70 países.
                </p>
                <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["DUOX Plus 2 hilos", "VEO 7\" táctil", "App MEET", "Sistema IP"].map(tag => (
                    <span key={tag} style={{ fontSize: 11, backgroundColor: "#EFF6FF", color: "#1B4F8A", borderRadius: 20, padding: "3px 10px", fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* BTICINO */}
            <div style={{ backgroundColor: "#F8F9FA", borderRadius: 20, overflow: "hidden", border: "1px solid #E5E7EB" }}>
              <div style={{ backgroundColor: "#0A0A1A", padding: 0, minHeight: 100, overflow: "hidden" }}>
                <img src="/images/bticino-videoportero.jpeg" alt="BTicino Classe 300 videoportero" style={{ width: "100%", height: 140, objectFit: "cover", objectPosition: "top", display: "block" }} />
              </div>
              <div style={{ padding: "20px 20px 24px" }}>
                <div style={{ fontWeight: 900, fontSize: 17, color: "#0A0A1A", marginBottom: 6 }}>BTicino · Classe 300</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <Star className="w-4 h-4" style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5 }}>Diseño italiano · Grupo Legrand</span>
                </div>
                <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, margin: 0 }}>
                  BTicino pertenece al grupo Legrand y es sinónimo de diseño italiano de alta gama. Su sistema <strong>Classe 300 X13E</strong> incorpora una pantalla táctil vertical de <strong>7 pulgadas</strong>, cámara exterior de <strong>5MP</strong> con ángulo de 150° y tecnología WDR. La app <strong>Home+ Door</strong> permite gestión remota avanzada y se integra con la domótica BTicino MyHome. Incluye llaveros RFID para apertura sin manos.
                </p>
                <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Classe 300 X13E", "Cámara 5MP", "App Home+", "RFID incluido"].map(tag => (
                    <span key={tag} style={{ fontSize: 11, backgroundColor: "#F3F4F6", color: "#374151", borderRadius: 20, padding: "3px 10px", fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* GOLMAR */}
            <div style={{ backgroundColor: "#F8F9FA", borderRadius: 20, overflow: "hidden", border: "1px solid #E5E7EB" }}>
              <div style={{ backgroundColor: "#E87722", padding: "24px 20px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 100 }}>
                <img src="/images/logo-golmar.png" alt="Golmar videoporteros" style={{ height: 60, width: "auto", objectFit: "contain", display: "block" }} />
              </div>
              <div style={{ padding: "20px 20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <Star className="w-4 h-4" style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5 }}>Made in Spain · Desde 1971</span>
                </div>
                <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, margin: 0 }}>
                  Golmar es una marca española fundada en 1971, con sede en Barcelona, especializada en videoporteros para comunidades de vecinos. Su gama <strong>Sixty5</strong> incorpora pantalla táctil de 5&quot;, protocolo SIP y tecnología de cámara <strong>WDR</strong> (Wide Dynamic Range) que garantiza visión perfecta incluso con fuerte contraluz. La app <strong>G2Call</strong> permite contestar al portero desde el smartphone. Solución ideal para grandes comunidades y edificios de oficinas.
                </p>
                <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Gama Sixty5", "Cámara WDR", "App G2Call", "Protocolo SIP"].map(tag => (
                    <span key={tag} style={{ fontSize: 11, backgroundColor: "#FFF7ED", color: "#C2410C", borderRadius: 20, padding: "3px 10px", fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "14px 32px", border: "none", cursor: "pointer" }}>
              ¿No sabes qué marca necesitas? Te asesoramos gratis →
            </button>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", marginBottom: 8 }}>Solución para Cada Espacio</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Adaptamos el sistema exacto a tus necesidades y presupuesto</p>
          <div className="grid sm:grid-cols-3 gap-5">
            {SOLUTIONS.map((s) => (
              <div key={s.title} style={{ backgroundColor: "#fff", borderRadius: 16, padding: 24, border: "1px solid #E5E7EB", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: 17, color: "#0A0A1A", marginBottom: 12, marginTop: 0 }}>{s.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
                  {s.features.map((f) => (
                    <li key={f} style={{ fontSize: 13, color: "#374151", lineHeight: 2 }}>
                      <span style={{ color: "#E53E3E", fontWeight: 700, marginRight: 6 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 16, padding: "10px 0", borderTop: "1px solid #F3F4F6", fontSize: 13, fontWeight: 700, color: "#E53E3E" }}>{s.price}</div>
                <button onClick={() => setShowModal(true)} style={{ display: "block", width: "100%", backgroundColor: "#E53E3E", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 50, padding: 13, textAlign: "center", marginTop: 10, boxSizing: "border-box", border: "none", cursor: "pointer" }}>
                  Solicitar presupuesto →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech */}
      <section style={{ backgroundColor: "#0F1923", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#fff", marginBottom: 8 }}>Tecnología que Marca la Diferencia</h2>
          <p style={{ color: "#64748B", fontSize: 14, marginBottom: 28 }}>Instalamos equipos con la tecnología más avanzada del mercado</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TECH.map((t) => (
              <div key={t.title} style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20 }}>
                <div style={{ marginBottom: 10 }}>{t.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: 14, color: "#fff", marginBottom: 6, marginTop: 0 }}>{t.title}</h3>
                <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "56px 20px" }}>
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", marginBottom: 8 }}>Preguntas Frecuentes</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Resolvemos las dudas más habituales sobre videoporteros</p>
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
      <section style={{ background: "linear-gradient(135deg, #E53E3E, #C53030)", padding: "48px 20px" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#fff", marginBottom: 8 }}>¿Necesitas un Videoportero en Barcelona?</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginBottom: 28 }}>Presupuesto gratuito · Instalación en 1 día · Garantía 3 años</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#fff", color: "#E53E3E", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: 18, border: "none", cursor: "pointer" }}>
              Solicitar presupuesto gratis →
            </button>
            <a href="tel:+34638109947" style={{ border: "2px solid rgba(255,255,255,0.5)", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: 16, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "transparent" }}>
              📞 638 10 99 47
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
      <HeroContactModal open={showModal} onClose={() => setShowModal(false)} defaultServicio="Videoportero" />
    </div>
  );
}
