import React, { useState } from "react";
import { Shield, Wifi, Clock, Smartphone, AlertTriangle, Eye, Lock, Radio, ChevronDown, ChevronUp, Check, Zap, MapPin, Phone } from "lucide-react";
import FooterSection from "../components/landing/FooterSection";
import HeroContactModal from "../components/landing/HeroContactModal";
import PromoAccordion from "../components/landing/PromoAccordion";
import AdvancedSEO from "../components/seo/AdvancedSEO";

const ALARM_PROMOS = [
  {
    header: "Kit Alarma Hogar — Sistema Ajax Avanzado",
    oldPrice: "590€", price: "349€", savings: "241€",
    features: ["Central de alarma Ajax Hub 2", "2 detectores de movimiento PIR", "1 detector de apertura puerta/ventana", "Sirena exterior disuasoria", "Conexión a Central Receptora 24/7", "App móvil control total", "Instalación profesional incluida", "Sin cuotas de mantenimiento obligatorias"],
    ctaText: "WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20el%20Kit%20Alarma%20Hogar%20Avanzado%20por%20349€",
  },
  {
    header: "Kit Alarma Negocio — Oficina y Comercio · Más Vendido", badge: "MÁS VENDIDO",
    oldPrice: "990€", price: "599€", savings: "391€",
    features: ["Central Ajax Hub 2 Plus (4G + WiFi + Ethernet)", "4 detectores de movimiento con cámara integrada (fotoverificación)", "2 detectores apertura puertas/ventanas", "Sirena interior + exterior certificada grado 2", "Detector de rotura de cristales", "Conexión a Central Receptora 24/7", "App multidispositivo para todo el equipo", "Instalación profesional en 1 día", "Garantía de por vida en equipos"],
    ctaText: "WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20el%20Kit%20Alarma%20Negocio%20por%20599€",
  },
  {
    header: "Kit Alarma Comunidad — Gran Empresa y Comunidades",
    oldPrice: "1.490€", price: "899€", savings: "591€",
    features: ["Central Ajax Hub 3 de máxima capacidad", "8 detectores PIR avanzados", "4 aperturas zonas comunes", "2 sirenas exteriores certificadas grado 2", "Control de accesos integrado", "Conexión a Central Receptora con verificación visual", "App multiadministrador comunidad", "Instalación profesional 1-2 días", "Cumplimiento normativa RGPD incluido", "Garantía de por vida en equipos"],
    ctaText: "WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20el%20Kit%20Alarma%20Comunidad%20por%20899€",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Detección", desc: "Los sensores Ajax detectan movimiento, apertura o vibración en milisegundos con tecnología dual PIR.", icon: Eye },
  { step: "02", title: "Señal cifrada", desc: "La alerta viaja cifrada por radio Jeweller hasta la central. Sin cables, sin interferencias.", icon: Radio },
  { step: "03", title: "Verificación", desc: "La CRA verifica la alerta en menos de 15 segundos mediante fotoverificación.", icon: Shield },
  { step: "04", title: "Respuesta", desc: "Guardia de seguridad o Policía Nacional en su domicilio. Actuación real y documentada.", icon: AlertTriangle },
];

const AJAX_COMPONENTS = [
  { name: "Hub 2", desc: "Central principal. Gestiona todos los dispositivos con cifrado AES-128 de extremo a extremo.", tag: "Central" },
  { name: "MotionProtect", desc: "Detector de movimiento PIR dual. Antimasking integrado. Alcance 12m × 90°.", tag: "Detector" },
  { name: "DoorProtect", desc: "Sensor magnético para puertas y ventanas. Detecta apertura y vibración simultáneamente.", tag: "Sensor" },
  { name: "MotionCam", desc: "Detector con cámara integrada. Fotografía el intruso en el momento exacto del disparo.", tag: "Cámara" },
  { name: "GlassProtect", desc: "Detector de rotura de cristal de amplio alcance. Cubre ventanas de toda la habitación.", tag: "Detector" },
  { name: "StreetSiren", desc: "Sirena exterior con LED. 113 dB audibles a 400 metros. IP55 intemperie.", tag: "Sirena" },
  { name: "KeyPad", desc: "Teclado táctil retroiluminado para armar/desarmar con código PIN personalizable.", tag: "Control" },
  { name: "ReX 2", desc: "Repetidor de señal radio. Duplica el alcance del sistema en instalaciones grandes.", tag: "Repetidor" },
];

const TECH_FEATURES = [
  { icon: Wifi, title: "Jeweller Radio", desc: "Protocolo propietario doble vía con cifrado AES-128 y alcance de 2.000m" },
  { icon: Clock, title: "Respuesta 15 seg", desc: "De la detección a la CRA en menos de un cuarto de minuto" },
  { icon: Smartphone, title: "App Ajax 24/7", desc: "Control total desde móvil: armar, desarmar, historial en tiempo real" },
  { icon: Lock, title: "Antimanipulación", desc: "Detección de sabotaje físico y electrónico en todos los dispositivos" },
  { icon: Zap, title: "Batería 7 años", desc: "Sensores autónomos con pila de larga duración sin mantenimiento" },
  { icon: MapPin, title: "Sin obras", desc: "Instalación inalámbrica en horas, sin agujeros ni canaletas" },
];

const FAQS = [
  { q: "¿Cuánto tiempo tarda la instalación de una alarma Ajax?", a: "Una instalación residencial estándar se completa en 3-4 horas. Al ser inalámbrica no requiere obra ni canaletas." },
  { q: "¿Necesito línea de teléfono fija?", a: "No. Ajax trabaja sobre WiFi/Ethernet y tiene SIM de respaldo integrada. Si falla el internet, sigue funcionando por red móvil." },
  { q: "¿Qué pasa si cortan la luz?", a: "La central Hub 2 tiene batería de respaldo de hasta 16 horas. Los sensores funcionan con pilas independientemente de la red eléctrica." },
  { q: "¿Incluye servicio de CRA?", a: "Sí. Todos nuestros sistemas incluyen conexión a CRA homologada. Verifican la alerta y coordinan la respuesta policial en menos de 15 segundos." },
  { q: "¿Puedo controlar la alarma desde el móvil?", a: "Sí, mediante la app oficial Ajax Systems para iOS y Android. Armar, desarmar, recibir notificaciones y ver el historial en tiempo real." },
  { q: "¿Los sensores Ajax funcionan en el exterior?", a: "Sí. Ajax tiene gama outdoor específica: detectores exteriores, sirenas de calle y cámaras diseñadas para lluvia y temperaturas extremas." },
  { q: "¿Qué diferencia hay entre alarma inalámbrica y cableada?", a: "La inalámbrica (Ajax) no requiere obra, se instala en horas y es fácilmente ampliable. Para viviendas y pymes, Ajax ofrece el mejor equilibrio entre fiabilidad y comodidad." },
];

export default function SistemasAlarma() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff" }}>
      <AdvancedSEO
        title="Alarmas Ajax Barcelona | Instalación Profesional | Premium Tech Security"
        description="Sistemas de alarma Ajax en Barcelona y Catalunya. Respuesta en 15 segundos. Inalámbrico sin obras. Partner oficial Ajax. Desde 349€ instalado. Tel: 638 10 99 47"
        keywords="alarmas Ajax Barcelona, sistema alarma inalámbrico, instalación alarma Barcelona, Central Receptora alarmas, Ajax Hub Barcelona"
        canonicalUrl="https://alarmasenbarcelona.com/SistemasAlarma"
      />

      {/* ── HERO ── */}
      <section style={{ position: "relative", background: "#0A0F1A", overflow: "hidden", minHeight: 580 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/ajax-sistema-alarma.jpeg')",
          backgroundSize: "cover", backgroundPosition: "center right",
          opacity: 0.3,
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #0A0F1A 55%, transparent 100%)" }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "80px 24px 72px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.4)",
            borderRadius: 100, padding: "6px 16px", marginBottom: 24,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E53E3E" }} />
            <span style={{ color: "#FC8181", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Ajax Systems · Partner Oficial · Barcelona
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 3.4rem)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1, maxWidth: 680, margin: "0 0 18px", letterSpacing: "-0.02em" }}>
            Sistemas de Alarma<br /><span style={{ color: "#E53E3E" }}>Profesionales Ajax.</span>
          </h1>
          <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)", color: "#CBD5E0", maxWidth: 500, lineHeight: 1.65, margin: "0 0 36px" }}>
            La tecnología de alarma más avanzada del mercado. Respuesta certificada en menos de 15 segundos. Instalación inalámbrica sin obras.
          </p>

          <div style={{ display: "flex", gap: 32, marginBottom: 40, flexWrap: "wrap" }}>
            {[{ val: "15s", label: "Respuesta CRA" }, { val: "2000m", label: "Alcance señal" }, { val: "7 años", label: "Batería sensores" }, { val: "AES-128", label: "Cifrado" }].map(s => (
              <div key={s.val}>
                <div style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900, color: "#E53E3E", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "#718096", marginTop: 3, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setModalOpen(true)} style={{ background: "#E53E3E", color: "#fff", border: "none", borderRadius: 8, padding: "13px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Solicitar presupuesto gratis
            </button>
            <a href="tel:+34638109947" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#fff", border: "2px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "13px 24px", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              <Phone size={15} /> Llamar
            </a>
          </div>
        </div>
      </section>

      {/* ── AJAX IMAGE + COMPONENTS PHOTO ── */}
      <section style={{ background: "#0A0F1A", padding: "0 24px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ borderRadius: 12, overflow: "hidden" }}>
              <img src="/images/ajax-sistema-alarma.jpeg" alt="Sistema de alarma Ajax instalado en vivienda Barcelona" style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }} />
            </div>
            <div style={{ borderRadius: 12, overflow: "hidden", background: "#000" }}>
              <img src="/images/ajax-componentes.jpeg" alt="Componentes sistema alarma Ajax: Hub, detectores PIR, sensores puerta" style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROMOCIONES AL PRINCIPIO ── */}
      <section style={{ background: "#0F1923", padding: "64px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Oferta limitada</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "#FFFFFF", margin: "8px 0 10px", letterSpacing: "-0.02em" }}>
              Kits de Alarma Ajax con instalación incluida
            </h2>
            <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>Precio cerrado. Sin sorpresas. Sin cuotas mensuales obligatorias.</p>
          </div>
          <PromoAccordion items={ALARM_PROMOS} />
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section style={{ background: "#FFFFFF", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Proceso</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "#0A0F1A", margin: "8px 0 0", letterSpacing: "-0.02em" }}>¿Cómo funciona el sistema?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2 }}>
            {HOW_IT_WORKS.map((step, idx) => (
              <div key={step.step} style={{ padding: "36px 28px", background: idx % 2 === 0 ? "#F8FAFC" : "#FFFFFF", borderTop: "3px solid " + (idx === 0 ? "#E53E3E" : "#E2E8F0") }}>
                <div style={{ fontSize: "3rem", fontWeight: 900, color: "#E8ECF0", lineHeight: 1, marginBottom: 14 }}>{step.step}</div>
                <div style={{ width: 40, height: 40, background: "#FFF1F1", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <step.icon size={20} color="#E53E3E" />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0A0F1A", margin: "0 0 8px" }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AJAX TECHNOLOGY SECTION with big image ── */}
      <section style={{ background: "#0A0F1A", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Tecnología Ajax</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "#FFFFFF", margin: "10px 0 18px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              El sistema de alarma más fiable del mundo
            </h2>
            <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.75, margin: "0 0 20px" }}>
              Ajax Systems es el fabricante europeo nº1 en alarmas profesionales. Sus dispositivos utilizan el protocolo radio <strong style={{ color: "#CBD5E0" }}>Jeweller</strong> — sistema propietario de doble vía con alcance de 2.000m y cifrado AES-128 end-to-end.
            </p>
            <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.75, margin: "0 0 28px" }}>
              Sin cableado que cortar, sin interferencias WiFi. Batería de respaldo automática y comunicación redundante SIM + internet. El sistema sigue funcionando aunque corten la luz y el internet.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Partner oficial Ajax Systems en Cataluña", "Técnicos certificados Ajax grado 2", "+500 sistemas Ajax instalados", "Soporte técnico 24/7 en español"].map(item => (
                <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#E53E3E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check size={10} color="#fff" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 13, color: "#CBD5E0" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.5)", background: "#000" }}>
              <img src="/images/ajax-componentes.jpeg" alt="Dispositivos Ajax: Hub 2, MotionProtect, DoorProtect, sensores inalámbricos" style={{ width: "100%", display: "block" }} />
            </div>
            <div style={{ position: "absolute", bottom: -16, left: -16, background: "#E53E3E", borderRadius: 10, padding: "12px 16px", boxShadow: "0 6px 24px rgba(229,62,62,0.4)" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1 }}>15s</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>Respuesta CRA</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPONENTES AJAX ── */}
      <section style={{ background: "#F8FAFC", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Dispositivos</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "#0A0F1A", margin: "8px 0 10px", letterSpacing: "-0.02em" }}>Componentes del sistema Ajax</h2>
            <p style={{ fontSize: 14, color: "#64748B", maxWidth: 500, margin: "0 auto" }}>Cada dispositivo trabaja en conjunto. Una instalación adapta los componentes a la geometría de tu espacio.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
            {AJAX_COMPONENTS.map(c => (
              <div key={c.name} style={{ background: "#FFFFFF", borderRadius: 11, padding: "24px 20px", border: "1px solid #E2E8F0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, background: "#0A0F1A", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Shield size={20} color="#E53E3E" />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#E53E3E", background: "#FFF1F1", borderRadius: 100, padding: "2px 9px", letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.tag}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0A0F1A", margin: "0 0 6px" }}>{c.name}</h3>
                <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH FEATURES ── */}
      <section style={{ background: "#FFFFFF", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Por qué Ajax</span>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "#0A0F1A", margin: "10px 0 18px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Tecnología que marca la diferencia
              </h2>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.75, marginBottom: 24 }}>
                Cada detalle del sistema elimina los puntos de fallo de otras alarmas. Protocolo propietario, cifrado end-to-end, redundancia de comunicaciones y antimanipulación en cada dispositivo.
              </p>
              {["Compatibilidad con +50 CRA profesionales en España", "App oficial iOS y Android incluida", "Integración con Google Home y Alexa", "Soporte técnico en español 24/7"].map(item => (
                <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#E53E3E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Check size={10} color="#fff" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {TECH_FEATURES.map(f => (
                <div key={f.title} style={{ background: "#F8FAFC", borderRadius: 11, padding: "20px 16px", border: "1px solid #E2E8F0" }}>
                  <div style={{ width: 36, height: 36, background: "#FFF1F1", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                    <f.icon size={18} color="#E53E3E" />
                  </div>
                  <h4 style={{ fontSize: 12, fontWeight: 800, color: "#0A0F1A", margin: "0 0 4px" }}>{f.title}</h4>
                  <p style={{ fontSize: 11, color: "#64748B", lineHeight: 1.55, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#F8FAFC", padding: "72px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: "#0A0F1A", margin: "8px 0 0", letterSpacing: "-0.02em" }}>Preguntas frecuentes</h2>
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

      {/* ── FINAL CTA ── */}
      <section style={{ background: "#0A0F1A", padding: "72px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/ajax-sistema-alarma.jpeg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.07 }} />
        <div style={{ position: "relative", maxWidth: 580, margin: "0 auto" }}>
          <div style={{ width: 56, height: 56, background: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Shield size={24} color="#E53E3E" />
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "#FFFFFF", margin: "0 0 14px", letterSpacing: "-0.02em" }}>Protege tu hogar hoy mismo</h2>
          <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.7, margin: "0 0 36px" }}>Presupuesto personalizado en 24 horas. Instalación en menos de una semana. Sin compromiso.</p>
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
      {modalOpen && <HeroContactModal onClose={() => setModalOpen(false)} defaultServicio="Alarmas" />}
    </div>
  );
}
