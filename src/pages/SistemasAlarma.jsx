import React, { useState } from "react";
import { Shield, Wifi, Clock, Smartphone, AlertTriangle, Eye, Lock, Radio, ChevronDown, ChevronUp, Check, Zap, MapPin, Phone } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import HeroContactModal from "../components/landing/HeroContactModal";
import AdvancedSEO from "../components/seo/AdvancedSEO";

const ALARM_KITS = [
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
  { icon: Wifi,       title: "Jeweller Radio",   desc: "Protocolo propietario doble vía con cifrado AES-128 y alcance de 2.000m" },
  { icon: Clock,      title: "15 seg respuesta", desc: "De la detección a la CRA en menos de un cuarto de minuto" },
  { icon: Smartphone, title: "App Ajax 24/7",    desc: "Armar, desarmar, historial y cámaras Ajax desde el móvil" },
  { icon: Lock,       title: "Antimanipulación", desc: "Detección de sabotaje físico y electrónico en cada dispositivo" },
  { icon: Zap,        title: "Batería 7 años",   desc: "Sensores autónomos. Sin obras de mantenimiento en años" },
  { icon: MapPin,     title: "100% inalámbrico", desc: "Instalación en horas. Sin agujeros, sin canaletas, sin obras" },
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
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#060B14" }}>
      <AdvancedSEO
        title="Alarmas Ajax Barcelona | Instalación Profesional | Premium Tech Security"
        description="Sistemas de alarma Ajax en Barcelona y Catalunya. Respuesta certificada en 15 segundos. 100% inalámbrico sin obras. Partner oficial Ajax. Tel: 638 10 99 47"
        keywords="alarmas Ajax Barcelona, sistema alarma inalámbrico Barcelona, instalación alarma Barcelona, Central Receptora alarmas, Ajax Hub Barcelona, alarma sin cuotas Catalunya"
        canonicalUrl="/sistemas-alarma"
        ogImage="/images/ajax-hero-dispositivos.jpeg"
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
              "offers": { "@type": "AggregateOffer", "lowPrice": "399", "highPrice": "1300", "priceCurrency": "EUR", "offerCount": "3" }
            },
            {
              "@type": "FAQPage",
              "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
            }
          ]
        }}
      />

      <Navbar />

      {/* ── HERO (full-width imagen) ── */}
      <section style={{
        position: "relative", overflow: "hidden",
        minHeight: 620,
        backgroundImage: "url('/images/ajax-hero-dispositivos.jpeg')",
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
        {/* Darkening gradient for text contrast */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,11,20,0.55) 0%, rgba(6,11,20,0.75) 55%, #060B14 100%)" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "72px 24px 64px", textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(229,62,62,0.15)",
            border: "1px solid rgba(229,62,62,0.4)",
            borderRadius: 100, padding: "6px 16px", marginBottom: 26
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#E53E3E" }} />
            <span style={{ color: "#FC8181", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Ajax Systems · Partner Oficial · Barcelona</span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.1rem, 5vw, 3.6rem)", fontWeight: 900,
            color: "#FFFFFF", lineHeight: 1.08,
            margin: "0 auto 20px", letterSpacing: "-0.03em", maxWidth: 780
          }}>
            Sistemas de Alarma<br />
            <span style={{ color: "#E53E3E" }}>Profesionales Ajax.</span>
          </h1>
          <p style={{
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "#CBD5E0",
            maxWidth: 560, lineHeight: 1.7, margin: "0 auto 40px"
          }}>
            La tecnología de alarma inalámbrica más avanzada del mercado. Respuesta certificada en menos de 15 segundos. Sin obras ni canaletas.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 36, marginBottom: 40, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { val: "15s",     label: "Respuesta CRA" },
              { val: "2000m",   label: "Alcance señal" },
              { val: "7 años",  label: "Batería sensores" },
              { val: "AES-128", label: "Cifrado militar" },
            ].map(s => (
              <div key={s.val}>
                <div style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: "#E53E3E", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                background: "#E53E3E", color: "#fff", border: "none",
                borderRadius: 9, padding: "15px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 0 32px rgba(229,62,62,0.35)"
              }}
            >
              Solicitar presupuesto gratis
            </button>
            <a
              href="tel:+34638109947"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                color: "#CBD5E0", border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 9, padding: "15px 26px", fontSize: 15, fontWeight: 600, textDecoration: "none",
                background: "rgba(255,255,255,0.06)"
              }}
            >
              <Phone size={16} /> Llamar ahora
            </a>
          </div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginTop: 34,
            background: "rgba(6,11,20,0.6)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(229,62,62,0.3)", borderRadius: 100, padding: "8px 18px"
          }}>
            <span style={{ fontSize: 11, color: "#FC8181", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Partner Oficial</span>
            <span style={{ fontSize: 12, color: "#94A3B8" }}>Ajax Systems · Catalunya</span>
          </div>
        </div>
      </section>

      {/* ── KITS DE ALARMA ── */}
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
              Kits de Alarma Ajax con instalación incluida
            </h2>
            <p style={{ fontSize: 14, color: "#475569", margin: 0 }}>Precio cerrado. Sin sorpresas. Sin cuotas mensuales obligatorias.</p>
          </div>

          <div className="kits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {ALARM_KITS.map((kit, i) => {
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
                      borderRadius: 100, padding: "4px 14px", whiteSpace: "nowrap",
                      letterSpacing: "0.08em"
                    }}>
                      {kit.badge}
                    </div>
                  )}

                  <h3 style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 800, margin: "0 0 4px", lineHeight: 1.3 }}>{kit.title}</h3>
                  <p style={{ color: "#475569", fontSize: 12, margin: "0 0 20px", lineHeight: 1.5 }}>{kit.subtitle}</p>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ color: "#E53E3E", fontSize: 42, fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em" }}>{kit.price}</div>
                    <span style={{ color: "#475569", fontSize: 11, marginTop: 4, display: "block" }}>* IVA no incluido</span>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 }}>
                    {kit.items.map((item) => (
                      <li key={item} style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.9, display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: "#E53E3E", flexShrink: 0, fontWeight: 900, fontSize: 14, lineHeight: 1.9 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setModalOpen(true)}
                    style={{
                      display: "block", width: "100%",
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

      {/* ── CÓMO FUNCIONA ── */}
      <section style={{ background: "#060B14", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.14em", textTransform: "uppercase" }}>Proceso</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)", fontWeight: 900, color: "#FFFFFF", margin: "10px 0 0", letterSpacing: "-0.025em" }}>
              ¿Cómo funciona el sistema Ajax?
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2 }}>
            {HOW_IT_WORKS.map((step, idx) => (
              <div key={step.step} style={{
                padding: "40px 30px",
                background: idx % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
                borderTop: `3px solid ${idx === 0 ? "#E53E3E" : "rgba(255,255,255,0.08)"}`
              }}>
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "rgba(255,255,255,0.06)", lineHeight: 1, marginBottom: 16 }}>{step.step}</div>
                <div style={{
                  width: 42, height: 42, background: "rgba(229,62,62,0.12)",
                  borderRadius: 10, display: "flex", alignItems: "center",
                  justifyContent: "center", marginBottom: 16,
                  border: "1px solid rgba(229,62,62,0.25)"
                }}>
                  <step.icon size={20} color="#E53E3E" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#F1F5F9", margin: "0 0 10px" }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECNOLOGÍA AJAX ── */}
      <section style={{ background: "#0A1120", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.14em", textTransform: "uppercase" }}>Tecnología Ajax Systems</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)", fontWeight: 900, color: "#FFFFFF", margin: "12px 0 20px", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
              El sistema de alarma más fiable del mundo
            </h2>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.8, margin: "0 0 20px" }}>
              Ajax Systems es el fabricante europeo nº1 en alarmas profesionales. El protocolo radio <strong style={{ color: "#94A3B8" }}>Jeweller</strong> es propietario de doble vía con alcance de 2.000 metros y cifrado AES-128 end-to-end — sin interferencias WiFi, sin puntos de fallo.
            </p>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.8, margin: "0 0 30px" }}>
              El <strong style={{ color: "#94A3B8" }}>MotionCam</strong> fotografia al intruso en el momento exacto del disparo para verificación visual inmediata en la CRA.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Partner oficial Ajax Systems en Catalunya", "Técnicos certificados Ajax grado 2", "+500 sistemas Ajax activos instalados", "Soporte técnico en español 24/7"].map(item => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", background: "#E53E3E",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    <Check size={11} color="#fff" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 14, color: "#94A3B8" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
            <img
              src="/images/ajax-componentes.jpeg"
              alt="Componentes sistema alarma Ajax: Hub 2, MotionProtect, DoorProtect, MotionCam"
              style={{ width: "100%", display: "block", background: "#000" }}
            />
            <div style={{
              position: "absolute", bottom: 14, left: 14,
              background: "#E53E3E", borderRadius: 10, padding: "12px 16px",
              boxShadow: "0 8px 24px rgba(229,62,62,0.5)"
            }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1 }}>15s</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.9)", marginTop: 3 }}>Respuesta CRA</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPONENTES AJAX ── */}
      <section style={{ background: "#060B14", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.14em", textTransform: "uppercase" }}>Dispositivos del ecosistema</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)", fontWeight: 900, color: "#FFFFFF", margin: "10px 0 12px", letterSpacing: "-0.025em" }}>Componentes del sistema Ajax</h2>
            <p style={{ fontSize: 13, color: "#475569", maxWidth: 520, margin: "0 auto" }}>Cada dispositivo trabaja en conjunto dentro del ecosistema Ajax. Una instalación adapta los componentes a la geometría exacta del espacio.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {AJAX_COMPONENTS.map(c => (
              <div key={c.name} style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 12, padding: "26px 22px",
                border: "1px solid rgba(255,255,255,0.07)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, background: "rgba(229,62,62,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(229,62,62,0.2)" }}>
                    <Shield size={20} color="#E53E3E" />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#E53E3E", background: "rgba(229,62,62,0.1)", borderRadius: 100, padding: "3px 10px", letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(229,62,62,0.2)" }}>{c.tag}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#F1F5F9", margin: "0 0 8px" }}>{c.name}</h3>
                <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.65, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARACTERÍSTICAS TÉCNICAS ── */}
      <section style={{ background: "#0A1120", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.14em", textTransform: "uppercase" }}>Por qué Ajax</span>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "#FFFFFF", margin: "12px 0 18px", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                Tecnología que elimina los puntos de fallo
              </h2>
              <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.8, marginBottom: 24 }}>
                Protocolo propietario, cifrado end-to-end, redundancia de comunicaciones y antimanipulación en cada dispositivo. Sin vulnerabilidades conocidas en el mercado de alarmas profesionales.
              </p>
              {[
                "Compatible con +50 CRA profesionales homologadas en España",
                "App oficial Ajax iOS y Android incluida sin coste adicional",
                "Integración nativa con Google Home y Amazon Alexa",
                "Soporte técnico certificado en español disponible 24/7",
              ].map(item => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#E53E3E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <Check size={11} color="#fff" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {TECH_FEATURES.map(f => (
                <div key={f.title} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 11, padding: "22px 18px", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ width: 38, height: 38, background: "rgba(229,62,62,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, border: "1px solid rgba(229,62,62,0.2)" }}>
                    <f.icon size={18} color="#E53E3E" />
                  </div>
                  <h4 style={{ fontSize: 12, fontWeight: 800, color: "#F1F5F9", margin: "0 0 5px" }}>{f.title}</h4>
                  <p style={{ fontSize: 11, color: "#475569", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#060B14", padding: "80px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.14em", textTransform: "uppercase" }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: "#FFFFFF", margin: "10px 0 0", letterSpacing: "-0.025em" }}>Preguntas frecuentes sobre alarmas Ajax</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {FAQS.map((faq, idx) => (
              <div key={idx} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#F1F5F9", paddingRight: 16, lineHeight: 1.4 }}>{faq.q}</span>
                  {openFaq === idx
                    ? <ChevronUp size={17} color="#E53E3E" style={{ flexShrink: 0 }} />
                    : <ChevronDown size={17} color="#475569" style={{ flexShrink: 0 }} />
                  }
                </button>
                {openFaq === idx && (
                  <div style={{ padding: "0 24px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.8, margin: "16px 0 0" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ background: "#0A1120", padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/ajax-hero-dispositivos.jpeg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.04 }} />
        <div style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}>
          <div style={{
            width: 60, height: 60,
            background: "rgba(229,62,62,0.12)", border: "1px solid rgba(229,62,62,0.25)",
            borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px"
          }}>
            <Shield size={26} color="#E53E3E" />
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)", fontWeight: 900, color: "#FFFFFF", margin: "0 0 14px", letterSpacing: "-0.025em" }}>Protege tu hogar hoy mismo</h2>
          <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.75, margin: "0 0 36px" }}>Presupuesto personalizado en 24 horas. Instalación en menos de una semana. Sin compromiso ni permanencia.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                background: "#E53E3E", color: "#fff", border: "none",
                borderRadius: 9, padding: "15px 36px", fontSize: 15, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 0 32px rgba(229,62,62,0.35)"
              }}
            >
              Solicitar presupuesto gratis
            </button>
            <a
              href="tel:+34638109947"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                color: "#CBD5E0", border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 9, padding: "15px 26px", fontSize: 15, fontWeight: 600, textDecoration: "none",
                background: "rgba(255,255,255,0.04)"
              }}
            >
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
