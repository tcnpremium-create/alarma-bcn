import React, { useState } from "react";
import { Shield, Wifi, Clock, Smartphone, AlertTriangle, Eye, Lock, Radio, ChevronDown, ChevronUp, Check, Zap, MapPin, Phone } from "lucide-react";
import FooterSection from "../components/landing/FooterSection";
import HeroContactModal from "../components/landing/HeroContactModal";

const AJAX_COMPONENTS = [
  {
    name: "Hub 2",
    desc: "Central principal del sistema. Gestiona todos los dispositivos con cifrado de extremo a extremo.",
    img: "/images/ajax-hub.jpeg",
    tag: "Central",
  },
  {
    name: "MotionProtect",
    desc: "Detector de movimiento con tecnología dual PIR. Antimasking integrado para máxima seguridad.",
    img: null,
    tag: "Detector",
  },
  {
    name: "DoorProtect",
    desc: "Sensor magnético para puertas y ventanas. Detecta apertura y vibración simultáneamente.",
    img: null,
    tag: "Sensor",
  },
  {
    name: "MotionCam",
    desc: "Detector con cámara integrada. Fotografía el intruso en el momento del disparo.",
    img: null,
    tag: "Cámara",
  },
  {
    name: "GlassProtect",
    desc: "Detector de rotura de cristal de amplio alcance. Cubre ventanas de toda la habitación.",
    img: null,
    tag: "Detector",
  },
  {
    name: "StreetSiren",
    desc: "Sirena exterior con señalización LED. 113 dB audibles a 400 metros de distancia.",
    img: null,
    tag: "Sirena",
  },
  {
    name: "KeyPad",
    desc: "Teclado táctil para armar y desarmar el sistema con código PIN personalizable.",
    img: null,
    tag: "Control",
  },
  {
    name: "ReX 2",
    desc: "Repetidor de señal radio. Duplica el alcance del sistema en instalaciones grandes.",
    img: null,
    tag: "Repetidor",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Detección",
    desc: "Los sensores Ajax detectan movimiento, apertura o vibración en milisegundos con tecnología dual.",
    icon: Eye,
  },
  {
    step: "02",
    title: "Señal cifrada",
    desc: "La alerta viaja cifrada por radio Jeweller hasta la central. Sin cables, sin interferencias.",
    icon: Radio,
  },
  {
    step: "03",
    title: "Verificación",
    desc: "La CRA (Central Receptora de Alarmas) verifica la alerta en menos de 15 segundos.",
    icon: Shield,
  },
  {
    step: "04",
    title: "Respuesta",
    desc: "Guardia de seguridad o Policía Nacional en su domicilio. Actuación real y documentada.",
    icon: AlertTriangle,
  },
];

const TECH_FEATURES = [
  { icon: Wifi, title: "Comunicación Jeweller", desc: "Protocolo radio propietario de doble vía con cifrado AES-128" },
  { icon: Clock, title: "Respuesta en 15 seg", desc: "De la detección a la CRA en menos de un cuarto de minuto" },
  { icon: Smartphone, title: "App Ajax 24/7", desc: "Control total desde el móvil: armar, desarmar, historial" },
  { icon: Lock, title: "Antimanipulación", desc: "Detección de sabotaje físico y electrónico en todos los dispositivos" },
  { icon: Zap, title: "Batería 7 años", desc: "Sensores autónomos con pila de larga duración sin mantenimiento" },
  { icon: MapPin, title: "Sin obras", desc: "Instalación inalámbrica en horas, sin agujeros ni canaletas" },
];

const FAQS = [
  {
    q: "¿Cuánto tiempo tarda la instalación de una alarma Ajax?",
    a: "Una instalación residencial estándar se completa en 3-4 horas. Al ser inalámbrica no requiere obra ni canaletas, por lo que el tiempo se reduce considerablemente respecto a sistemas cableados.",
  },
  {
    q: "¿Necesito línea de teléfono fija?",
    a: "No. Ajax trabaja sobre conexión a internet (WiFi o Ethernet) y tiene SIM de respaldo integrada en la central. Si falla el internet, sigue funcionando por red móvil automáticamente.",
  },
  {
    q: "¿Qué pasa si cortan la luz?",
    a: "La central Hub 2 tiene batería de respaldo interna de hasta 16 horas. Los sensores funcionan con pilas de larga duración independientemente de la red eléctrica.",
  },
  {
    q: "¿Incluye servicio de CRA (Central Receptora de Alarmas)?",
    a: "Sí. Todos nuestros sistemas incluyen la conexión a una CRA homologada. Cuando salta la alarma, un operador verifica la incidencia y coordina la respuesta policial en menos de 15 segundos.",
  },
  {
    q: "¿Puedo controlar la alarma desde el móvil?",
    a: "Sí, a través de la aplicación oficial Ajax Systems para iOS y Android. Puede armar, desarmar, recibir notificaciones y ver el historial de eventos en tiempo real.",
  },
  {
    q: "¿Los sensores Ajax funcionan en el exterior?",
    a: "Sí. Ajax tiene una gama específica de dispositivos outdoor: detectores de movimiento exteriores, sirenas de calle y cámaras de vigilancia diseñadas para entornos expuestos a lluvia y temperaturas extremas.",
  },
  {
    q: "¿Qué diferencia hay entre alarma inalámbrica y cableada?",
    a: "La inalámbrica (Ajax) no requiere obra, se instala en horas y es fácilmente ampliable. La cableada es más robusta para instalaciones industriales de gran tamaño. Para viviendas y pymes, Ajax ofrece el mejor equilibrio entre fiabilidad y comodidad de instalación.",
  },
];

export default function SistemasAlarma() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", background: "#0A0F1A", overflow: "hidden", minHeight: 620 }}>
        {/* Background image with overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/ajax-sistema-alarma.jpeg')",
          backgroundSize: "cover", backgroundPosition: "center right",
          opacity: 0.35,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, #0A0F1A 55%, transparent 100%)",
        }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "80px 24px 80px" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.4)",
            borderRadius: 100, padding: "6px 16px", marginBottom: 28,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E53E3E" }} />
            <span style={{ color: "#FC8181", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Ajax Systems · Partner Oficial · Barcelona
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#FFFFFF",
            lineHeight: 1.1, maxWidth: 700, margin: "0 0 20px",
            letterSpacing: "-0.02em",
          }}>
            Sistemas de Alarma<br />
            <span style={{ color: "#E53E3E" }}>Profesionales Ajax.</span>
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "#CBD5E0", maxWidth: 520, lineHeight: 1.65, margin: "0 0 40px" }}>
            La tecnología de alarma más avanzada del mercado. Respuesta certificada en menos de 15 segundos. Instalación inalámbrica sin obras.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: 40, marginBottom: 44, flexWrap: "wrap" }}>
            {[
              { val: "15s", label: "Tiempo de respuesta" },
              { val: "2000m", label: "Alcance de señal" },
              { val: "7 años", label: "Batería sensores" },
              { val: "AES-128", label: "Cifrado militar" },
            ].map(s => (
              <div key={s.val}>
                <div style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: "#E53E3E", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "#718096", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                background: "#E53E3E", color: "#fff", border: "none", borderRadius: 8,
                padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              Solicitar presupuesto gratis
            </button>
            <a
              href="tel:+34638109947"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "transparent", color: "#fff",
                border: "2px solid rgba(255,255,255,0.25)", borderRadius: 8,
                padding: "14px 28px", fontSize: 15, fontWeight: 700, textDecoration: "none",
              }}
            >
              <Phone size={16} />
              Llamar
            </a>
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section style={{ background: "#FFFFFF", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Proceso</span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#0A0F1A", margin: "8px 0 0", letterSpacing: "-0.02em" }}>
              ¿Cómo funciona el sistema?
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 2 }}>
            {HOW_IT_WORKS.map((step, idx) => (
              <div key={step.step} style={{ position: "relative", padding: "40px 32px", background: idx % 2 === 0 ? "#F8FAFC" : "#FFFFFF", borderTop: "3px solid " + (idx === 0 ? "#E53E3E" : "#E2E8F0") }}>
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#E8ECF0", lineHeight: 1, marginBottom: 16 }}>{step.step}</div>
                <div style={{ width: 44, height: 44, background: "#FFF1F1", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <step.icon size={22} color="#E53E3E" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0A0F1A", margin: "0 0 10px" }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AJAX IMAGE SHOWCASE ── */}
      <section style={{ background: "#0A0F1A", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, right: 0, width: "50%", height: "100%",
          backgroundImage: "url('/images/ajax-sistema-alarma.jpeg')",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.2,
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #0A0F1A 50%, transparent 100%)" }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Tecnología Ajax</span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#FFFFFF", margin: "12px 0 20px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              El sistema de alarma más fiable del mundo
            </h2>
            <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.75, margin: "0 0 28px" }}>
              Ajax Systems es el fabricante europeo nº1 en alarmas profesionales. Sus dispositivos utilizan el protocolo radio <strong style={{ color: "#CBD5E0" }}>Jeweller</strong> — un sistema propietario de doble vía con alcance de 2.000 metros y cifrado AES-128.
            </p>
            <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.75, margin: 0 }}>
              A diferencia de sistemas convencionales, Ajax elimina los puntos de fallo: sin cableado que cortar, sin interferencias WiFi, con batería de respaldo automática y comunicación redundante por SIM + internet.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
              <img
                src="/images/ajax-sistema-alarma.jpeg"
                alt="Sistema de alarma Ajax profesional"
                style={{ width: "100%", display: "block", aspectRatio: "4/3", objectFit: "cover" }}
              />
            </div>
            <div style={{
              position: "absolute", bottom: -20, left: -20,
              background: "#E53E3E", borderRadius: 12, padding: "16px 20px",
              boxShadow: "0 8px 32px rgba(229,62,62,0.4)",
            }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", lineHeight: 1 }}>15s</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>Respuesta CRA</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPONENTES AJAX ── */}
      <section style={{ background: "#F8FAFC", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Dispositivos</span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#0A0F1A", margin: "8px 0 12px", letterSpacing: "-0.02em" }}>
              Componentes del sistema Ajax
            </h2>
            <p style={{ fontSize: 15, color: "#64748B", maxWidth: 520, margin: "0 auto" }}>
              Cada dispositivo está diseñado para trabajar en conjunto. Una instalación completa adapta los componentes a la geometría y necesidades del espacio.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {AJAX_COMPONENTS.map((c, idx) => (
              <div key={c.name} style={{
                background: "#FFFFFF", borderRadius: 12, padding: "28px 24px",
                border: "1px solid #E2E8F0",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{
                    width: 48, height: 48, background: "#0A0F1A", borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Shield size={22} color="#E53E3E" />
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: "#E53E3E",
                    background: "#FFF1F1", borderRadius: 100, padding: "3px 10px",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                  }}>{c.tag}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0A0F1A", margin: "0 0 8px" }}>{c.name}</h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARACTERÍSTICAS TÉCNICAS ── */}
      <section style={{ background: "#FFFFFF", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Especificaciones</span>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#0A0F1A", margin: "12px 0 20px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Por qué Ajax es diferente
              </h2>
              <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.75, marginBottom: 32 }}>
                Cada detalle del sistema ha sido diseñado para eliminar los puntos de fallo que afectan a otras alarmas del mercado. Protocolo propietario, cifrado end-to-end, redundancia de comunicaciones.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {["Compatibilidad con +50 CRA profesionales en España", "Aplicación oficial para iOS y Android incluida", "Integración con Google Home y Amazon Alexa", "Soporte técnico en español disponible 24/7"].map(item => (
                  <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#E53E3E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <Check size={11} color="#fff" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {TECH_FEATURES.map(f => (
                <div key={f.title} style={{
                  background: "#F8FAFC", borderRadius: 12, padding: "24px 20px",
                  border: "1px solid #E2E8F0",
                }}>
                  <div style={{ width: 40, height: 40, background: "#FFF1F1", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <f.icon size={20} color="#E53E3E" />
                  </div>
                  <h4 style={{ fontSize: 13, fontWeight: 800, color: "#0A0F1A", margin: "0 0 6px" }}>{f.title}</h4>
                  <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.55, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#F8FAFC", padding: "80px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, color: "#0A0F1A", margin: "8px 0 0", letterSpacing: "-0.02em" }}>
              Preguntas frecuentes
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, idx) => (
              <div key={idx} style={{
                background: "#FFFFFF", borderRadius: 10, border: "1px solid #E2E8F0",
                overflow: "hidden",
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#0A0F1A", paddingRight: 16, lineHeight: 1.4 }}>{faq.q}</span>
                  {openFaq === idx
                    ? <ChevronUp size={18} color="#E53E3E" style={{ flexShrink: 0 }} />
                    : <ChevronDown size={18} color="#94A3B8" style={{ flexShrink: 0 }} />}
                </button>
                {openFaq === idx && (
                  <div style={{ padding: "0 24px 20px", borderTop: "1px solid #F1F5F9" }}>
                    <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.75, margin: "16px 0 0" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: "#0A0F1A", padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/ajax-sistema-alarma.jpeg')",
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.08,
        }} />
        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
          <div style={{ width: 64, height: 64, background: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Shield size={28} color="#E53E3E" />
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: "#FFFFFF", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Protege tu hogar hoy mismo
          </h2>
          <p style={{ fontSize: 16, color: "#94A3B8", lineHeight: 1.7, margin: "0 0 40px" }}>
            Presupuesto personalizado en 24 horas. Instalación en menos de una semana. Sin compromiso.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                background: "#E53E3E", color: "#fff", border: "none", borderRadius: 8,
                padding: "16px 36px", fontSize: 16, fontWeight: 700, cursor: "pointer",
              }}
            >
              Solicitar presupuesto gratis
            </button>
            <a
              href="tel:+34638109947"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                color: "#fff", border: "2px solid rgba(255,255,255,0.25)", borderRadius: 8,
                padding: "16px 28px", fontSize: 16, fontWeight: 700, textDecoration: "none",
              }}
            >
              <Phone size={18} />
              Llamar ahora
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
      {modalOpen && <HeroContactModal onClose={() => setModalOpen(false)} defaultServicio="Alarmas" />}
    </div>
  );
}
