import React, { useState } from "react";
import { Shield, Wifi, Clock, Smartphone, AlertTriangle, Eye, Lock, Radio, ChevronDown, ChevronUp, Check, Zap, MapPin, Phone } from "lucide-react";
import FooterSection from "../components/landing/FooterSection";
import HeroContactModal from "../components/landing/HeroContactModal";
import AdvancedSEO from "../components/seo/AdvancedSEO";

const ALARM_PROMOS = [
  {
    header: "Kit Alarma Hogar — Sistema Ajax Avanzado",
    oldPrice: "590€", price: "349€", savings: "241€",
    features: ["Central Ajax Hub 2 inalámbrico", "2 detectores de movimiento PIR antimascotas", "1 sensor de apertura puerta/ventana", "Sirena exterior certificada 113dB", "Conexión a Central Receptora 24/7", "App móvil control total", "Instalación profesional incluida", "Sin cuotas de mantenimiento obligatorias"],
    ctaText: "WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20el%20Kit%20Alarma%20Hogar%20Avanzado%20por%20349€",
  },
  {
    header: "Kit Alarma Negocio — Oficina y Comercio · Más Vendido", badge: "MÁS VENDIDO",
    oldPrice: "990€", price: "599€", savings: "391€",
    features: ["Central Ajax Hub 2 Plus (4G + WiFi + Ethernet)", "4 detectores MotionCam con fotoverificación Ajax", "2 sensores apertura puertas/ventanas", "Sirena interior + exterior certificada grado 2", "Detector Ajax GlassProtect rotura de cristal", "Conexión a Central Receptora 24/7", "App multidispositivo para todo el equipo", "Instalación profesional en 1 día", "Garantía de por vida en equipos"],
    ctaText: "WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20el%20Kit%20Alarma%20Negocio%20por%20599€",
  },
  {
    header: "Kit Alarma Comunidad — Gran Empresa y Comunidades",
    oldPrice: "1.490€", price: "899€", savings: "591€",
    features: ["Central Ajax Hub 3 de máxima capacidad", "8 detectores PIR avanzados multidireccionales", "4 sensores apertura zonas comunes", "2 sirenas exteriores certificadas grado 2", "Control de accesos Ajax integrado", "CRA con verificación visual Ajax MotionCam", "App multiadministrador para comunidad", "Instalación profesional 1-2 días", "Cumplimiento normativa RGPD incluido", "Garantía de por vida en equipos"],
    ctaText: "WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20el%20Kit%20Alarma%20Comunidad%20por%20899€",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Detección", desc: "Los sensores Ajax detectan movimiento, apertura o vibración en milisegundos con tecnología PIR dual y antienmascaramiento.", icon: Eye },
  { step: "02", title: "Señal cifrada", desc: "La alerta viaja cifrada AES-128 por protocolo radio Jeweller hasta la central Hub. Sin cables, sin interferencias.", icon: Radio },
  { step: "03", title: "Verificación CRA", desc: "La Central Receptora de Alarmas verifica visualmente mediante MotionCam y activa el protocolo en menos de 15 segundos.", icon: Shield },
  { step: "04", title: "Respuesta", desc: "Guardia de seguridad o Policía Nacional en tu domicilio. Actuación real, documentada y certificada.", icon: AlertTriangle },
];

const AJAX_COMPONENTS = [
  { name: "Hub 2", desc: "Central principal. Gestiona todos los dispositivos. Cifrado AES-128 end-to-end. Triple comunicación: WiFi + Ethernet + GSM/SIM.", tag: "Central" },
  { name: "MotionProtect", desc: "Detector PIR de movimiento con tecnología dual. Antimasking integrado. Inmunidad a mascotas hasta 20 kg. Alcance 12m × 90°.", tag: "Detector" },
  { name: "DoorProtect", desc: "Sensor magnético para puertas y ventanas. Detecta apertura, cierre y vibración simultáneamente. Batería 3,5 años.", tag: "Sensor" },
  { name: "MotionCam", desc: "Detector con cámara Ajax integrada. Fotografía al intruso en el instante exacto del disparo para fotoverificación en CRA.", tag: "Ajax Cam" },
  { name: "GlassProtect", desc: "Detector de rotura de cristal de amplio alcance. Identifica el sonido específico de rotura y vibración. Cubre hasta 9m².", tag: "Detector" },
  { name: "StreetSiren", desc: "Sirena exterior Ajax con señalización LED. 113 dB audibles a 400 metros. IP55 certificado para intemperie.", tag: "Sirena" },
  { name: "KeyPad Touch", desc: "Teclado táctil retroiluminado. Armar y desarmar con código PIN personalizable. Compatible con tarjetas y tags NFC.", tag: "Control" },
  { name: "ReX 2", desc: "Repetidor de señal radio Ajax. Duplica el alcance del sistema hasta 2.000m adicionales en instalaciones de gran superficie.", tag: "Repetidor" },
];

const TECH_FEATURES = [
  { icon: Wifi, title: "Jeweller Radio", desc: "Protocolo propietario doble vía con cifrado AES-128 y alcance de 2.000m" },
  { icon: Clock, title: "15 seg respuesta", desc: "De la detección a la CRA en menos de un cuarto de minuto" },
  { icon: Smartphone, title: "App Ajax 24/7", desc: "Armar, desarmar, historial y cámaras Ajax desde el móvil" },
  { icon: Lock, title: "Antimanipulación", desc: "Detección de sabotaje físico y electrónico en cada dispositivo" },
  { icon: Zap, title: "Batería 7 años", desc: "Sensores autónomos. Sin obras de mantenimiento en años" },
  { icon: MapPin, title: "100% inalámbrico", desc: "Instalación en horas. Sin agujeros, sin canaletas, sin obras" },
];

const FAQS = [
  { q: "¿Cuánto tiempo tarda la instalación de una alarma Ajax?", a: "Una instalación residencial estándar se completa en 3-4 horas. Al ser 100% inalámbrica, no requiere obra ni canaletas. Instalaciones de oficinas o comunidades pueden requerir 1 día." },
  { q: "¿Necesito línea de teléfono fija?", a: "No. Ajax trabaja sobre WiFi, Ethernet y tiene SIM de respaldo integrada en el Hub. Si falla el internet, cambia a red móvil automáticamente sin intervención humana." },
  { q: "¿Qué pasa si cortan la luz?", a: "El Hub 2 tiene batería de respaldo interna de hasta 16 horas. Los sensores y detectores Ajax funcionan con pilas de larga duración (3-7 años) independientemente de la red eléctrica." },
  { q: "¿Incluye servicio de CRA (Central Receptora de Alarmas)?", a: "Sí. Todos nuestros sistemas incluyen conexión a CRA homologada. Cuando salta la alarma, el operador verifica visualmente mediante MotionCam y coordina la respuesta policial en menos de 15 segundos." },
  { q: "¿Puedo controlar la alarma desde el móvil?", a: "Sí, mediante la app oficial Ajax Systems para iOS y Android. Armar, desarmar, recibir notificaciones, ver el historial de eventos y acceder a las imágenes MotionCam en tiempo real." },
  { q: "¿Qué diferencia hay entre alarma inalámbrica Ajax y sistemas cableados?", a: "Ajax no requiere obra, se instala en horas, es ampliable en cualquier momento y tiene comunicación redundante (WiFi + SIM). Para viviendas y pymes, Ajax ofrece el mejor equilibrio entre fiabilidad, facilidad y seguridad del mercado." },
  { q: "¿Son los sistemas Ajax compatibles con comunidades de vecinos?", a: "Sí. Ajax Hub 3 gestiona hasta 200 dispositivos en una sola instalación. Permite zonas independientes, administración multidispositivo y acceso diferenciado por usuario. Ideal para comunidades de vecinos y grandes empresas." },
];

export default function SistemasAlarma() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff" }}>
      <AdvancedSEO
        title="Alarmas Ajax Barcelona | Instalación Profesional | Premium Tech Security"
        description="Sistemas de alarma Ajax en Barcelona y Catalunya. Respuesta certificada en 15 segundos. 100% inalámbrico sin obras. Partner oficial Ajax. Desde 349€ instalado. Tel: 638 10 99 47"
        keywords="alarmas Ajax Barcelona, sistema alarma inalámbrico Barcelona, instalación alarma Barcelona, Central Receptora alarmas, Ajax Hub Barcelona, alarma sin cuotas Catalunya"
        canonicalUrl="https://alarmasenbarcelona.com/sistemas-alarma"
        ogImage="https://alarmasenbarcelona.com/images/ajax-sistema-alarma.jpeg"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "name": "Instalación de Sistemas de Alarma Ajax",
              "serviceType": "Instalación de Alarmas de Seguridad Profesional",
              "description": "Instalación de sistemas de alarma Ajax inalámbricos certificados en Barcelona y Catalunya. Partner oficial Ajax Systems. Respuesta CRA en 15 segundos.",
              "provider": { "@type": "LocalBusiness", "name": "Premium Tech Security", "telephone": "+34638109947" },
              "areaServed": ["Barcelona", "Girona", "Tarragona", "Lleida", "Catalunya"],
              "offers": { "@type": "AggregateOffer", "lowPrice": "349", "highPrice": "899", "priceCurrency": "EUR", "offerCount": "3" }
            },
            {
              "@type": "FAQPage",
              "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
            }
          ]
        }}
      />

      {/* ── 1. HERO ── */}
      <section style={{ position: "relative", background: "#0A0F1A", overflow: "hidden", minHeight: 580 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/ajax-sistema-alarma.jpeg')", backgroundSize: "cover", backgroundPosition: "center right", opacity: 0.32 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #0A0F1A 58%, transparent 100%)" }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "80px 24px 72px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.4)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E53E3E" }} />
            <span style={{ color: "#FC8181", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Ajax Systems · Partner Oficial · Barcelona</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1, maxWidth: 680, margin: "0 0 18px", letterSpacing: "-0.02em" }}>
            Sistemas de Alarma<br /><span style={{ color: "#E53E3E" }}>Profesionales Ajax.</span>
          </h1>
          <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "#CBD5E0", maxWidth: 500, lineHeight: 1.65, margin: "0 0 36px" }}>
            La tecnología de alarma inalámbrica más avanzada del mercado. Respuesta certificada en menos de 15 segundos. Sin obras ni canaletas.
          </p>

          <div style={{ display: "flex", gap: 36, marginBottom: 40, flexWrap: "wrap" }}>
            {[{ val: "15s", label: "Respuesta CRA" }, { val: "2000m", label: "Alcance señal" }, { val: "7 años", label: "Batería sensores" }, { val: "AES-128", label: "Cifrado militar" }].map(s => (
              <div key={s.val}>
                <div style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: "#E53E3E", lineHeight: 1 }}>{s.val}</div>
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
      <section style={{ background: "#0F1923", padding: "52px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Oferta exclusiva · Plazas limitadas</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 900, color: "#FFFFFF", margin: "8px 0 6px", letterSpacing: "-0.02em" }}>
              Kits de Alarma Ajax con instalación incluida
            </h2>
            <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>Precio cerrado. Sin sorpresas. Sin cuotas mensuales obligatorias.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 14 }}>
            {ALARM_PROMOS.map((kit, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.06)", border: i === 1 ? "2px solid #E53E3E" : "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "26px 22px", position: "relative" }}>
                {kit.badge && (
                  <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: "#E53E3E", color: "#fff", fontSize: 10, fontWeight: 800, borderRadius: 100, padding: "3px 12px", whiteSpace: "nowrap" }}>
                    {kit.badge}
                  </div>
                )}
                <h3 style={{ color: "#fff", fontSize: 13, fontWeight: 800, marginBottom: 14, lineHeight: 1.35 }}>{kit.header}</h3>
                <div style={{ marginBottom: 14 }}>
                  <span style={{ color: "#6B7280", fontSize: 12, textDecoration: "line-through" }}>Antes {kit.oldPrice}</span>
                  <div style={{ color: "#E53E3E", fontSize: 34, fontWeight: 900, lineHeight: 1.1 }}>{kit.price}</div>
                  <span style={{ display: "inline-block", background: "rgba(34,197,94,0.15)", color: "#22C55E", fontSize: 11, fontWeight: 800, borderRadius: 6, padding: "2px 9px", marginTop: 4 }}>AHORRA {kit.savings}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px" }}>
                  {kit.features.map((f, j) => (
                    <li key={j} style={{ color: "#CBD5E0", fontSize: 12, lineHeight: 1.85, display: "flex", gap: 6, alignItems: "flex-start" }}>
                      <span style={{ color: "#22C55E", flexShrink: 0, fontWeight: 700 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <p style={{ color: "#6B7280", fontSize: 10, margin: "0 0 10px" }}>* IVA no incluido</p>
                <a href={kit.ctaHref} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", textAlign: "center", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 50, padding: "13px", textDecoration: "none" }}>
                  WhatsApp — Reservar ahora
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CÓMO FUNCIONA ── */}
      <section style={{ background: "#FFFFFF", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Proceso</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "#0A0F1A", margin: "8px 0 0", letterSpacing: "-0.02em" }}>¿Cómo funciona el sistema Ajax?</h2>
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

      {/* ── 4. AJAX TECHNOLOGY + IMAGES ── */}
      <section style={{ background: "#0A0F1A", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Tecnología Ajax Systems</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "#FFFFFF", margin: "10px 0 18px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              El sistema de alarma más fiable del mundo
            </h2>
            <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.75, margin: "0 0 18px" }}>
              Ajax Systems es el fabricante europeo nº1 en alarmas profesionales. El protocolo radio <strong style={{ color: "#CBD5E0" }}>Jeweller</strong> es un sistema propietario de doble vía con alcance de 2.000 metros y cifrado AES-128 end-to-end — sin interferencias WiFi, sin puntos de fallo.
            </p>
            <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.75, margin: "0 0 28px" }}>
              El <strong style={{ color: "#CBD5E0" }}>MotionCam</strong> es la cámara integrada exclusiva del ecosistema Ajax: no es una cámara de videovigilancia independiente, sino el sensor de movimiento que fotografía al intruso en el momento exacto del disparo para verificación visual en la CRA.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Partner oficial Ajax Systems en Catalunya", "Técnicos certificados Ajax grado 2", "+500 sistemas Ajax activos instalados", "Soporte técnico en español 24/7"].map(item => (
                <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#E53E3E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check size={10} color="#fff" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 13, color: "#CBD5E0" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}>
              <img src="/images/ajax-componentes.jpeg" alt="Componentes sistema alarma Ajax: Hub 2, MotionProtect, DoorProtect, MotionCam" style={{ width: "100%", display: "block", background: "#000" }} />
              <div style={{ position: "absolute", bottom: 12, left: 12, background: "#E53E3E", borderRadius: 8, padding: "10px 14px", boxShadow: "0 4px 16px rgba(229,62,62,0.5)" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", lineHeight: 1 }}>15s</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>Respuesta CRA</div>
              </div>
            </div>
            <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 32px rgba(0,0,0,0.4)" }}>
              <img src="/images/ajax-sistema-alarma.jpeg" alt="Sistema de alarma Ajax instalado en vivienda en Barcelona" style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. COMPONENTES AJAX ── */}
      <section style={{ background: "#F8FAFC", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Dispositivos del ecosistema</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "#0A0F1A", margin: "8px 0 10px", letterSpacing: "-0.02em" }}>Componentes del sistema Ajax</h2>
            <p style={{ fontSize: 13, color: "#64748B", maxWidth: 500, margin: "0 auto" }}>Cada dispositivo trabaja en conjunto dentro del ecosistema Ajax. Una instalación adapta los componentes a la geometría exacta del espacio.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
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

      {/* ── 6. CARACTERÍSTICAS TÉCNICAS ── */}
      <section style={{ background: "#FFFFFF", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>Por qué Ajax</span>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 900, color: "#0A0F1A", margin: "10px 0 16px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Tecnología que elimina los puntos de fallo
              </h2>
              <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.75, marginBottom: 22 }}>
                Protocolo propietario, cifrado end-to-end, redundancia de comunicaciones y antimanipulación en cada dispositivo. Sin vulnerabilidades conocidas en el mercado de alarmas profesionales.
              </p>
              {["Compatible con +50 CRA profesionales homologadas en España", "App oficial Ajax iOS y Android incluida sin coste adicional", "Integración nativa con Google Home y Amazon Alexa", "Soporte técnico certificado en español disponible 24/7"].map(item => (
                <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#E53E3E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Check size={10} color="#fff" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {TECH_FEATURES.map(f => (
                <div key={f.title} style={{ background: "#F8FAFC", borderRadius: 10, padding: "20px 16px", border: "1px solid #E2E8F0" }}>
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

      {/* ── 7. FAQ ── */}
      <section style={{ background: "#F8FAFC", padding: "72px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.12em", textTransform: "uppercase" }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: "#0A0F1A", margin: "8px 0 0", letterSpacing: "-0.02em" }}>Preguntas frecuentes sobre alarmas Ajax</h2>
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

      {/* ── 8. CTA FINAL ── */}
      <section style={{ background: "#0A0F1A", padding: "72px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/ajax-sistema-alarma.jpeg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.07 }} />
        <div style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}>
          <div style={{ width: 56, height: 56, background: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Shield size={24} color="#E53E3E" />
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "#FFFFFF", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Protege tu hogar hoy mismo</h2>
          <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.7, margin: "0 0 32px" }}>Presupuesto personalizado en 24 horas. Instalación en menos de una semana. Sin compromiso ni permanencia.</p>
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
      {modalOpen && <HeroContactModal onClose={() => setModalOpen(false)} defaultServicio="Alarmas Ajax" />}
    </div>
  );
}
