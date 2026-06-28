import React, { useState } from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import HeroContactModal from "../components/landing/HeroContactModal";
import PromoAccordion from "../components/landing/PromoAccordion";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Smartphone, Clock, CheckCircle, Wifi, Bell, Lock, Radio, ChevronRight } from "lucide-react";

const ALARM_PROMOS = [
  {
    header: "Kit Alarma Hogar — Sistema Avanzado",
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

const AJAX_COMPONENTS = [
  { title: "Hub 2 / Hub 2 Plus", desc: "Central de control Ajax. Conecta hasta 100 dispositivos. WiFi + Ethernet + 4G (en Hub 2 Plus). Batería de respaldo 16h." },
  { title: "MotionProtect", desc: "Detector de movimiento PIR inalámbrico. Alcance 12m × 110°. Batería 7 años. Inmune a mascotas (<20kg)." },
  { title: "DoorProtect", desc: "Sensor magnético de apertura para puertas y ventanas. Detecta apertura y vibración. Batería 6 años." },
  { title: "MotionCam", desc: "Detector PIR con cámara integrada. Al detectar movimiento toma fotos en tiempo real para verificación visual." },
  { title: "GlassProtect", desc: "Detector de rotura de cristales. Cobertura 9m. Distingue entre impacto en cristal y ruidos ambientales." },
  { title: "StreetSiren / HomeSiren", desc: "Sirenas interior y exterior certificadas grado 2. Potencia 113 dB. Luz estroboscópica. Batería propia anti-sabotaje." },
  { title: "KeyPad / Button", desc: "Teclado con código PIN o botón de pánico físico para armar/desarmar la alarma sin app." },
  { title: "ReX (Extensor)", desc: "Duplica el rango de cobertura hasta 1800m adicionales. Para edificios grandes, sótanos o naves industriales." },
];

const FEATURES = [
  { icon: <Radio className="w-6 h-6" />, title: "Protocolo Jeweller", desc: "Protocolo inalámbrico de Ajax con alcance hasta 2000m. Comunicación cifrada y bidireccional en tiempo real." },
  { icon: <Shield className="w-6 h-6" />, title: "Cifrado AES-256", desc: "El mismo cifrado que usan los gobiernos. Imposible interceptar o hackear la comunicación." },
  { icon: <Bell className="w-6 h-6" />, title: "Anti-inhibición GSM", desc: "El sistema detecta y alerta si alguien intenta bloquear la señal con inhibidores de frecuencia." },
  { icon: <Wifi className="w-6 h-6" />, title: "Triple Comunicación", desc: "WiFi + Ethernet + SIM 4G simultáneos. Si falla uno, el sistema sigue comunicando por los otros dos canales." },
  { icon: <Clock className="w-6 h-6" />, title: "Batería 7 años", desc: "Los sensores inalámbricos funcionan hasta 7 años con una sola pila. Sin preocupaciones de mantenimiento." },
  { icon: <Smartphone className="w-6 h-6" />, title: "App Ajax Security", desc: "Control total desde el móvil: armar, desarmar, ver el estado de cada sensor, recibir notificaciones y gestionar usuarios." },
  { icon: <Lock className="w-6 h-6" />, title: "Anti-Tamper", desc: "Cada sensor Ajax detecta si alguien intenta desmontarlo o abrirlo. Alerta inmediata ante manipulación física." },
  { icon: <CheckCircle className="w-6 h-6" />, title: "Fotoverificación", desc: "Los detectores MotionCam envían fotos en tiempo real al dispararse, permitiendo verificar la alarma antes de llamar a Policía." },
];

const FAQS = [
  { q: "¿Qué diferencia hay entre una alarma inalámbrica y una cableada?", a: "La alarma inalámbrica (Ajax) no requiere pasar cables por paredes, se instala en pocas horas y es ideal para viviendas, oficinas y negocios. La alarma cableada se instala durante obra o reforma y es más recomendable para proyectos de construcción nueva o renovación total del inmueble. Ambas ofrecen el mismo nivel de seguridad. Te asesoramos sobre cuál encaja mejor con tu situación." },
  { q: "¿El sistema Ajax funciona si se va la luz o cortan internet?", a: "Sí. La central Ajax Hub 2 tiene batería de respaldo integrada que aguanta hasta 16 horas sin corriente. Además, el Hub 2 Plus tiene SIM 4G incorporada: si falla el internet, la alarma sigue comunicando por red móvil. Es un sistema diseñado específicamente para resistir intentos de sabotaje." },
  { q: "¿Puede alguien bloquear la señal Ajax con un inhibidor GSM?", a: "Ajax detecta los inhibidores de señal y genera una alerta de anti-jamming. El sistema avisa inmediatamente si alguien intenta bloquear las comunicaciones. Es uno de los pocos sistemas del mercado con esta protección activa." },
  { q: "¿Necesito contratar una Central Receptora de Alarmas?", a: "No es obligatorio. Puedes optar por autogestión (recibir tú las alertas en el móvil) o conectar a nuestra Central Receptora 24/7 que verifica cada alarma y avisa a la Policía. Para negocios y comunidades siempre recomendamos Central Receptora. Para uso doméstico depende de tus preferencias." },
  { q: "¿Cuántos sensores puede conectar una central Ajax?", a: "El Hub 2 admite hasta 100 dispositivos Ajax. El Hub 2 Plus hasta 200 dispositivos. Para instalaciones muy grandes (naves industriales, grandes edificios) se pueden conectar varios Hubs entre sí o usar extensores ReX para ampliar la cobertura." },
  { q: "¿Incluye la instalación en el precio?", a: "Sí, todos nuestros kits incluyen la instalación profesional. Nuestros técnicos certificados realizan la instalación, configuración de la app, alta en el sistema y formación al cliente. Sin costes ocultos." },
  { q: "¿Qué pasa si me roban un sensor?", a: "Cada sensor Ajax tiene protección anti-tamper que detecta cualquier intento de desmontaje y genera una alerta inmediata. Además, si alguien extrae el dispositivo con fuerza, el sistema lo reporta como manipulado y alerta en tiempo real." },
];

export default function SistemasAlarma() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-white" style={{ paddingBottom: 70 }}>
      <AdvancedSEO
        title="Sistemas de Alarma Profesionales Barcelona | Instalación AJAX Inalámbrica y Cableada"
        description="Sistemas de alarma Ajax inalámbricos y cableados en Barcelona. Instalación profesional, monitoreo 24/7, control desde móvil. Kits desde 349€. Presupuesto gratuito sin compromiso."
        keywords="sistemas alarma Barcelona, alarmas profesionales, alarma AJAX, instalación alarmas, alarma casa Barcelona, alarma negocio, alarma inalámbrica, alarma cableada, seguridad hogar"
        canonicalUrl="https://alarmasenbarcelona.com/sistemas-alarma"
      />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background: "linear-gradient(135deg, #0A0A1A 0%, #0F1923 60%, #1a2a3a 100%)", minHeight: "65vh", paddingTop: 100, paddingBottom: 48, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: "5%", left: "50%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,62,62,0.08) 0%, transparent 70%)", pointerEvents: "none", transform: "translateX(-50%)" }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 20, padding: "6px 14px", marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#E53E3E", boxShadow: "0 0 8px #E53E3E" }} />
            <span style={{ color: "#F87171", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>ALARMAS AJAX · INALÁMBRICAS Y CABLEADAS · BARCELONA</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 items-center">
            <div>
              <h1 style={{ fontWeight: 900, fontSize: "clamp(26px, 5vw, 44px)", color: "#fff", lineHeight: 1.15, margin: 0 }}>
                Sistemas de Alarma<br />
                <span style={{ color: "#E53E3E" }}>Profesionales Ajax.</span><br />
                Respuesta en 15 segundos.
              </h1>
              <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.75, marginTop: 14 }}>
                Instalamos sistemas de alarma Ajax inalámbricos y alarmas cableadas en Barcelona y toda Catalunya. Detección perimetral avanzada, anti-inhibición GSM y conexión a Central Receptora 24/7. Sin cuotas obligatorias.
              </p>
              <div style={{ display: "flex", gap: 20, marginTop: 20, paddingTop: 18, paddingBottom: 18, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <div><div style={{ fontSize: 26, fontWeight: 900, color: "#E53E3E" }}>15s</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Respuesta central</div></div>
                <div><div style={{ fontSize: 26, fontWeight: 900, color: "#E53E3E" }}>2000m</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Alcance sensores</div></div>
                <div><div style={{ fontSize: 26, fontWeight: 900, color: "#E53E3E" }}>7 años</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Batería sensores</div></div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                <button onClick={() => setShowModal(true)} style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: "16px 24px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  Solicitar presupuesto gratis <ChevronRight className="w-5 h-5" />
                </button>
                <a href="tel:+34638109947" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 50, padding: "14px 24px", textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  📞 Llamar
                </a>
              </div>
            </div>
            {/* Ajax image */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: -24, borderRadius: 32, background: "radial-gradient(circle, rgba(229,62,62,0.12) 0%, transparent 70%)" }} />
                <img
                  src="/images/ajax-sistema-alarma.jpeg"
                  alt="Sistema de alarma Ajax — central, detectores y sirenas"
                  style={{ width: "100%", maxWidth: 420, borderRadius: 20, boxShadow: "0 32px 80px rgba(0,0,0,0.6)", display: "block", position: "relative" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AJAX SYSTEM DESCRIPTION ── */}
      <section style={{ backgroundColor: "#fff", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-10 items-start">
            <div>
              <span style={{ display: "inline-block", backgroundColor: "rgba(229,62,62,0.1)", color: "#E53E3E", borderRadius: 20, fontSize: 11, fontWeight: 700, padding: "5px 14px", marginBottom: 14, letterSpacing: 1 }}>
                TECNOLOGÍA AJAX · LÍDER EUROPEO
              </span>
              <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 14px" }}>¿Qué es el sistema Ajax?</h2>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, margin: "0 0 12px" }}>
                Ajax Systems es la marca de seguridad electrónica de más rápido crecimiento en Europa, galardonada con múltiples premios internacionales. Sus sistemas son utilizados por cuerpos de seguridad, embajadas y empresas de primer nivel en más de 130 países.
              </p>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, margin: "0 0 12px" }}>
                A diferencia de las alarmas convencionales, Ajax utiliza su propio protocolo inalámbrico propietario llamado <strong>Jeweller</strong>, que garantiza comunicación en tiempo real con respuesta de menos de 0,15 segundos entre el sensor y la central. El alcance en campo abierto es de hasta <strong>2000 metros</strong>, mucho mayor que cualquier alarma WiFi convencional.
              </p>
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, margin: 0 }}>
                Toda la comunicación está cifrada con <strong>AES-256</strong> y el sistema detecta activamente los intentos de inhibición de señal (jamming), algo que ninguna alarma de baja gama ofrece. La central Hub dispone de batería de respaldo de 16 horas y triple canal de comunicación: WiFi, Ethernet y 4G simultáneos.
              </p>
            </div>
            <div>
              <span style={{ display: "inline-block", backgroundColor: "rgba(229,62,62,0.1)", color: "#E53E3E", borderRadius: 20, fontSize: 11, fontWeight: 700, padding: "5px 14px", marginBottom: 14, letterSpacing: 1 }}>
                INALÁMBRICA VS. CABLEADA
              </span>
              <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 14px" }}>¿Cuál necesito?</h2>
              <div style={{ backgroundColor: "#F8F9FA", borderRadius: 16, padding: 20, marginBottom: 12, border: "1px solid #E5E7EB" }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#0A0A1A", marginBottom: 8 }}>Alarma Inalámbrica Ajax</div>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7, margin: "0 0 10px" }}>
                  Sin obras ni cableado. Instalación en pocas horas. Ideal para viviendas, pisos, oficinas y comercios ya construidos. Fácilmente ampliable y reubicable. La opción más popular hoy.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["Sin pasar cables por paredes", "Instalación en pocas horas", "Ampliable en cualquier momento", "Batería de respaldo en todos los sensores"].map(f => (
                    <li key={f} style={{ fontSize: 12, color: "#374151", lineHeight: 2 }}>
                      <span style={{ color: "#22C55E", fontWeight: 700, marginRight: 6 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ backgroundColor: "#F8F9FA", borderRadius: 16, padding: 20, border: "1px solid #E5E7EB" }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#0A0A1A", marginBottom: 8 }}>Alarma Cableada Tradicional</div>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7, margin: "0 0 10px" }}>
                  Instalación durante obra o reforma. Cableado oculto en paredes para máxima integración. Recomendada para proyectos de construcción nueva, edificios industriales y grandes instalaciones.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["Cableado completamente oculto", "Sin baterías que cambiar en sensores", "Mayor capacidad de zonas", "Integración total con domótica"].map(f => (
                    <li key={f} style={{ fontSize: 12, color: "#374151", lineHeight: 2 }}>
                      <span style={{ color: "#22C55E", fontWeight: 700, marginRight: 6 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AJAX COMPONENTS ── */}
      <section style={{ backgroundColor: "#0F1923", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#fff", margin: "0 0 8px" }}>Componentes del Sistema Ajax</h2>
          <p style={{ color: "#64748B", fontSize: 14, marginBottom: 28 }}>Cada pieza del sistema trabaja en conjunto para una protección sin puntos ciegos</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {AJAX_COMPONENTS.map((c) => (
              <div key={c.title} style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 18 }}>
                <div style={{ width: 8, height: 8, backgroundColor: "#E53E3E", borderRadius: "50%", marginBottom: 10 }} />
                <h3 style={{ fontWeight: 800, fontSize: 13, color: "#fff", margin: "0 0 6px" }}>{c.title}</h3>
                <p style={{ fontSize: 11, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH FEATURES ── */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 8px" }}>Por qué Ajax es lo mejor del mercado</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Tecnología de nivel profesional para protección real</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} style={{ backgroundColor: "#fff", borderRadius: 14, padding: 18, border: "1px solid #E5E7EB" }}>
                <div style={{ color: "#E53E3E", marginBottom: 10 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: 13, color: "#0A0A1A", margin: "0 0 6px" }}>{f.title}</h3>
                <p style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMOTIONS ── */}
      <PromoAccordion
        bg="#111827"
        title="Kits de Alarma Ajax — Precios Especiales"
        items={ALARM_PROMOS}
        footerText="Instalación profesional incluida en todos los kits · Garantía de por vida en equipos"
      />

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: "#fff", padding: "56px 20px" }}>
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 8px" }}>Preguntas Frecuentes sobre Alarmas Ajax</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Todo lo que necesitas saber antes de instalar una alarma</p>
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

      {/* ── FINAL CTA ── */}
      <section style={{ background: "linear-gradient(135deg, #E53E3E, #C53030)", padding: "48px 20px" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#fff", margin: "0 0 8px" }}>¿Necesitas una Alarma en Barcelona?</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, margin: "0 0 28px" }}>Presupuesto gratuito · Instalación en 1 día · Garantía de por vida</p>
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
      <HeroContactModal open={showModal} onClose={() => setShowModal(false)} defaultServicio="Sistema de alarma" />
    </div>
  );
}
