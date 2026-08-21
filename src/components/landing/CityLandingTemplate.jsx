import React, { useState } from "react";
import { MapPin, Phone, CheckCircle, Shield, Camera, Fingerprint, Wrench, ChevronRight, Wifi, Clock, Smartphone, Lock, Zap, Eye, Radio, AlertTriangle } from "lucide-react";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";
import CityLandingSEO from "../seo/CityLandingSEO";
import HeroContactModal from "./HeroContactModal";
import AlarmKitsGrid from "./AlarmKitsGrid";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { base44 } from "@/api/api";
import { businessStats } from "@/lib/businessStats";

const SERVICES = [
  { Icon: Shield, title: "Alarmas inteligentes AJAX", desc: "Paneles de control, sensores inalámbricos, detectores de movimiento, sirenas y notificaciones instantáneas en el móvil." },
  { Icon: Camera, title: "Videovigilancia 4K Hikvision", desc: "Cámaras IP 4K con visión nocturna en color, grabación local sin cuotas y control remoto desde cualquier dispositivo." },
  { Icon: Fingerprint, title: "Control de accesos biométrico", desc: "Huella dactilar, tarjeta NFC, código PIN y registro completo de entradas y salidas. Sin llaves, sin duplicados." },
  { Icon: Wrench, title: "Mantenimiento y soporte 24/7", desc: "Revisiones técnicas periódicas, soporte inmediato, actualizaciones de firmware y garantía de 3 años en todos los productos." }
];

const WHY_US = [
  `${businessStats.experienceText} en Catalunya`,
  `Instalación en ${businessStats.installTimeframe} sin obras ni roturas`,
  "Presupuesto gratuito y sin compromiso",
  "Sin permanencia obligatoria",
  "Tecnología AJAX + Hikvision certificada",
  `Garantía de ${businessStats.warrantyYears} años en todos los productos`
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

const buildFaqs = (city) => [
  { q: "¿Cuánto tiempo tarda la instalación de una alarma Ajax?", a: `Una instalación residencial estándar se completa en 3-4 horas. Al ser 100% inalámbrica, no requiere obra ni canaletas. Instalaciones de oficinas o comunidades en ${city} pueden requerir 1 día.` },
  { q: "¿Necesito línea de teléfono fija?", a: "No. Ajax trabaja sobre WiFi, Ethernet y tiene SIM de respaldo integrada en el Hub. Si falla el internet, cambia a red móvil automáticamente sin intervención humana." },
  { q: "¿Qué pasa si cortan la luz?", a: "El Hub 2 tiene batería de respaldo interna de hasta 16 horas. Los sensores y detectores Ajax funcionan con pilas de larga duración (3-7 años) independientemente de la red eléctrica." },
  { q: "¿Incluye servicio de CRA (Central Receptora de Alarmas)?", a: "Sí. Todos nuestros sistemas incluyen conexión a CRA homologada. Cuando salta la alarma, el operador verifica visualmente mediante MotionCam y coordina la respuesta policial en menos de 15 segundos." },
  { q: "¿Puedo controlar la alarma desde el móvil?", a: "Sí, mediante la app oficial Ajax Systems para iOS y Android. Armar, desarmar, recibir notificaciones, ver el historial de eventos y acceder a las imágenes MotionCam en tiempo real." },
  { q: "¿Qué diferencia hay entre alarma inalámbrica Ajax y sistemas cableados?", a: "Ajax no requiere obra, se instala en horas, es ampliable en cualquier momento y tiene comunicación redundante (WiFi + SIM). Para viviendas y pymes, Ajax ofrece el mejor equilibrio entre fiabilidad, facilidad y seguridad del mercado." },
  { q: "¿Son los sistemas Ajax compatibles con comunidades de vecinos?", a: "Sí. Ajax Hub 3 gestiona hasta 200 dispositivos en una sola instalación. Permite zonas independientes, administración multidispositivo y acceso diferenciado por usuario. Ideal para comunidades de vecinos y grandes empresas." },
];

export default function CityLandingTemplate({ city, seoPath, intro }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nombre: "", telefono: "", ciudad: city, mensaje: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono) return;
    setSending(true);
    await base44.entities.Lead.create({
      nombre: form.nombre,
      telefono: form.telefono,
      zona: form.ciudad,
      mensaje: form.mensaje,
      origen: "formulario_web",
      tipo_cliente: "hogar"
    });
    setSent(true);
    setSending(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", paddingBottom: 128 }}>
      <CityLandingSEO path={seoPath} />
      <Navbar />

      {/* HERO (full-width imagen AJAX) */}
      <section style={{
        position: "relative", overflow: "hidden",
        backgroundImage: "url('/images/ajax-hero-dispositivos.jpeg')",
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,11,20,0.55) 0%, rgba(6,11,20,0.8) 60%, #0A0A1A 100%)" }} />
        <div className="max-w-5xl mx-auto" style={{ position: "relative", zIndex: 2, padding: "112px 24px 64px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
            <MapPin style={{ width: 13, height: 13, color: "#F87171" }} />
            <span style={{ color: "#F87171", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>Catalunya • {city}</span>
          </div>
          <h1 style={{ fontWeight: 900, fontSize: "clamp(28px, 5vw, 52px)", color: "#fff", lineHeight: 1.1, margin: "0 0 16px" }}>
            Instalación de Alarmas de Seguridad en {city}
          </h1>
          <p style={{ color: "#CBD5E0", fontSize: 16, lineHeight: 1.75, margin: "0 0 32px", maxWidth: 580 }}>
            {intro}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => setShowModal(true)}
              style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "14px 28px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
            >
              Solicitar presupuesto de alarma <ChevronRight style={{ width: 18, height: 18 }} />
            </button>
            <a
              href="tel:+34638109947"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 50, padding: "14px 24px", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
            >
              <Phone style={{ width: 16, height: 16 }} />
              Llamar
            </a>
          </div>
        </div>
      </section>

      {/* KITS DE ALARMA AJAX */}
      <AlarmKitsGrid city={city} onRequestQuote={() => setShowModal(true)} />

      {/* SERVICES */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "64px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <span style={{ display: "inline-block", backgroundColor: "#E53E3E", color: "#fff", borderRadius: 4, fontSize: 11, fontWeight: 800, padding: "5px 12px", letterSpacing: "0.08em", marginBottom: 16 }}>
            SERVICIOS EN {city.toUpperCase()}
          </span>
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#0A0A1A", margin: "0 0 32px" }}>Todo lo que instalamos</h2>
          <div className="grid sm:grid-cols-2" style={{ gap: 20 }}>
            {SERVICES.map(({ Icon, title, desc }) => (
              <div key={title} style={{ backgroundColor: "#fff", borderRadius: 14, padding: "24px 20px", borderLeft: "3px solid #E53E3E", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <Icon style={{ width: 24, height: 24, color: "#E53E3E", marginBottom: 12 }} />
                <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0A0A1A", margin: "0 0 8px" }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={{ backgroundColor: "#fff", padding: "64px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.14em", textTransform: "uppercase" }}>Proceso</span>
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#0A0A1A", margin: "10px 0 32px" }}>¿Cómo funciona el sistema Ajax?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 2 }}>
            {HOW_IT_WORKS.map((step, idx) => (
              <div key={step.step} style={{ padding: "28px 22px", background: idx % 2 === 0 ? "#F8F9FA" : "#fff", borderTop: `3px solid ${idx === 0 ? "#E53E3E" : "#E5E7EB"}`, border: "1px solid #E5E7EB" }}>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#E5E7EB", lineHeight: 1, marginBottom: 12 }}>{step.step}</div>
                <div style={{ width: 38, height: 38, background: "rgba(229,62,62,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <step.icon size={18} color="#E53E3E" />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0A0A1A", margin: "0 0 8px" }}>{step.title}</h3>
                <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPONENTES AJAX */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "64px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.14em", textTransform: "uppercase" }}>Dispositivos del ecosistema</span>
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#0A0A1A", margin: "10px 0 8px" }}>Componentes del sistema Ajax</h2>
          <p style={{ fontSize: 13, color: "#6B7280", maxWidth: 560, margin: "0 0 24px" }}>Cada dispositivo trabaja en conjunto dentro del ecosistema Ajax. Adaptamos los componentes a la geometría exacta de tu espacio en {city}.</p>
          <img
            src="/images/ajax-componentes.jpeg"
            alt="Componentes sistema alarma Ajax: Hub 2, MotionProtect, DoorProtect, MotionCam"
            style={{ width: "100%", maxHeight: 220, objectFit: "contain", background: "#000", borderRadius: 14, display: "block", marginBottom: 32 }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 12 }}>
            {AJAX_COMPONENTS.map((c) => (
              <div key={c.name} style={{ backgroundColor: "#fff", borderRadius: 12, padding: "20px 18px", border: "1px solid #E5E7EB" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, background: "rgba(229,62,62,0.1)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Shield size={16} color="#E53E3E" />
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#E53E3E", background: "rgba(229,62,62,0.1)", borderRadius: 100, padding: "3px 8px", letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.tag}</span>
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: "#0A0A1A", margin: "0 0 6px" }}>{c.name}</h3>
                <p style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.55, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 10, marginTop: 32 }}>
            {TECH_FEATURES.map((f) => (
              <div key={f.title} style={{ backgroundColor: "#fff", borderRadius: 11, padding: "18px 16px", border: "1px solid #E5E7EB", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 34, height: 34, background: "rgba(229,62,62,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <f.icon size={16} color="#E53E3E" />
                </div>
                <div>
                  <h4 style={{ fontSize: 12, fontWeight: 800, color: "#0A0A1A", margin: "0 0 4px" }}>{f.title}</h4>
                  <p style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.8, marginTop: 28, maxWidth: 680 }}>
            El protocolo radio <strong style={{ color: "#374151" }}>Jeweller</strong> es propietario de doble vía con alcance de 2.000 metros y cifrado AES-128 end-to-end. Compatible con +50 CRA profesionales homologadas en España, integración nativa con Google Home y Amazon Alexa, y soporte técnico certificado en español disponible 24/7.
          </p>
        </div>
      </section>

      {/* WHY US */}
      <section style={{ backgroundColor: "#0A0A1A", padding: "64px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2" style={{ gap: 40, alignItems: "center" }}>
            <div>
              <span style={{ display: "inline-block", backgroundColor: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", color: "#F87171", borderRadius: 20, fontSize: 11, fontWeight: 700, padding: "5px 14px", letterSpacing: 1, marginBottom: 16 }}>
                ¿POR QUÉ ELEGIRNOS?
              </span>
              <h2 style={{ fontWeight: 900, fontSize: 26, color: "#fff", margin: "0 0 24px" }}>
                La empresa de referencia en {city}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {WHY_US.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <CheckCircle style={{ width: 18, height: 18, color: "#E53E3E", flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "#D1D5DB" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {[[`★ ${businessStats.googleRating}`, "Valoración Google"], [businessStats.installTimeframe, "Tiempo instalación"], [`${businessStats.warrantyYears} años`, "Garantía"], ["24/7", "Soporte técnico"]].map(([num, label]) => (
                <div key={label} style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "20px 24px", flex: "1 1 120px", border: "1px solid rgba(255,255,255,0.08)", minWidth: 120 }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#E53E3E", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "64px 24px" }}>
        <div className="max-w-3xl mx-auto">
          <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.14em", textTransform: "uppercase" }}>FAQ</span>
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#0A0A1A", margin: "10px 0 8px" }}>Preguntas frecuentes sobre alarmas Ajax en {city}</h2>
          <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 28 }}>Todo lo que necesitas saber antes de instalar tu sistema de alarma</p>
          <Accordion type="single" collapsible className="space-y-2">
            {buildFaqs(city).map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-xl border border-gray-200 px-5 overflow-hidden">
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

      {/* CONTACT FORM */}
      <section style={{ backgroundColor: "#fff", padding: "64px 24px" }}>
        <div className="max-w-lg mx-auto">
          <span style={{ display: "inline-block", backgroundColor: "#E53E3E", color: "#fff", borderRadius: 4, fontSize: 11, fontWeight: 800, padding: "5px 12px", letterSpacing: "0.08em", marginBottom: 16 }}>
            PRESUPUESTO GRATUITO
          </span>
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#0A0A1A", margin: "0 0 8px" }}>
            Solicita tu presupuesto en {city}
          </h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Sin compromiso · Respuesta en menos de 24h</p>
          {sent ? (
            <div style={{ backgroundColor: "#F0FFF4", border: "2px solid #9AE6B4", borderRadius: 16, padding: 32, textAlign: "center" }}>
              <CheckCircle style={{ width: 48, height: 48, color: "#38A169", margin: "0 auto 16px", display: "block" }} />
              <h3 style={{ fontWeight: 800, fontSize: 20, color: "#276749", margin: "0 0 8px" }}>¡Solicitud enviada!</h3>
              <p style={{ color: "#2F855A", marginBottom: 20 }}>Te contactaremos en menos de 24h con tu presupuesto personalizado.</p>
              <a href="tel:+34638109947" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, borderRadius: 50, padding: "12px 24px", textDecoration: "none" }}>
                <Phone style={{ width: 16, height: 16 }} />
                Llamar ahora
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ backgroundColor: "#F8F9FA", borderRadius: 16, padding: 28, border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Nombre *</label>
                <input
                  type="text" required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Tu nombre completo"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #D1D5DB", fontSize: 14, outline: "none", boxSizing: "border-box", backgroundColor: "#fff" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Teléfono *</label>
                <input
                  type="tel" required
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  placeholder="600 000 000"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #D1D5DB", fontSize: 14, outline: "none", boxSizing: "border-box", backgroundColor: "#fff" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Mensaje (opcional)</label>
                <textarea
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  rows={3}
                  placeholder="Describe brevemente lo que necesitas..."
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #D1D5DB", fontSize: 14, outline: "none", boxSizing: "border-box", resize: "none", backgroundColor: "#fff" }}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "15px 0", border: "none", cursor: sending ? "not-allowed" : "pointer", opacity: sending ? 0.7 : 1 }}
              >
                {sending ? "Enviando..." : "Solicitar presupuesto de alarma →"}
              </button>
              <p style={{ fontSize: 12, color: "#9CA3AF", textAlign: "center", margin: 0 }}>Sin compromiso · Respuesta en menos de 24h</p>
            </form>
          )}
        </div>
      </section>

      <FooterSection />

      <HeroContactModal
        open={showModal}
        defaultServicio={`Seguridad en ${city}`}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
