import React from "react";
import { MapPin, Phone, CheckCircle, Shield, Camera, Fingerprint, Wrench, ChevronRight, Eye, Radio, AlertTriangle } from "lucide-react";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";
import CityLandingSEO from "../seo/CityLandingSEO";
import Breadcrumbs from "./Breadcrumbs";
import LeadCaptureForm from "./LeadCaptureForm";
import AlarmConnectionOptions from "./AlarmConnectionOptions";
import AlarmKitsGrid from "./AlarmKitsGrid";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { businessStats } from "@/lib/businessStats";
import { useLeadDrawer } from "@/context/LeadDrawerContext";

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
  { step: "03", title: "Verificación en CRA (opcional)", desc: "Si contratas la conexión a una Central Receptora de Alarmas (servicio opcional, no incluido en el precio), un operador verifica visualmente mediante MotionCam y activa el protocolo.", icon: Shield },
  { step: "04", title: "Respuesta", desc: "Con la CRA opcional contratada, aviso a guardia de seguridad o a la Policía según el protocolo activado por la Central Receptora.", icon: AlertTriangle },
];

const AJAX_COMPONENTS = [
  { name: "Hub 2", img: "/images/ajax/hub-2-blanco.webp", desc: "Central principal. Gestiona todos los dispositivos. Cifrado AES-128 end-to-end. Triple comunicación: WiFi + Ethernet + GSM/SIM.", tag: "Central" },
  { name: "MotionProtect", img: "/images/ajax/motionprotect.webp", desc: "Detector PIR de movimiento con tecnología dual. Antimasking integrado. Inmunidad a mascotas hasta 20 kg. Alcance 12m × 90°.", tag: "Detector" },
  { name: "MotionProtect Outdoor", img: "/images/ajax/motionprotect-outdoor.webp", desc: "Detector de movimiento para exterior, pensado para jardines, terrazas y perímetros. Resistente a la intemperie.", tag: "Exterior" },
  { name: "DualCurtain Outdoor", img: "/images/ajax/dualcurtain-outdoor.webp", desc: "Detector de cortina para exterior. Vigila ventanas, puertas y fachadas sin invadir el resto del jardín.", tag: "Exterior" },
  { name: "DoorProtect", desc: "Sensor magnético para puertas y ventanas. Detecta apertura, cierre y vibración simultáneamente. Batería 3,5 años.", tag: "Sensor" },
  { name: "MotionCam", desc: "Detector con cámara Ajax integrada. Fotografía al intruso en el instante exacto del disparo; con CRA contratada, sirve para la fotoverificación.", tag: "Ajax Cam" },
  { name: "GlassProtect", desc: "Detector de rotura de cristal de amplio alcance. Identifica el sonido específico de rotura y vibración. Cubre hasta 9m².", tag: "Detector" },
  { name: "HomeSiren", img: "/images/ajax/homesiren.webp", desc: "Sirena interior inalámbrica con aviso sonoro y luminoso. Va incluida en nuestros kits de alarma.", tag: "Sirena" },
  { name: "StreetSiren", img: "/images/ajax/streetsiren.webp", desc: "Sirena exterior Ajax con señalización LED. 113 dB audibles a 400 metros. IP55 certificado para intemperie.", tag: "Sirena" },
  { name: "KeyPad", img: "/images/ajax/keypad.webp", desc: "Teclado táctil retroiluminado. Armar y desarmar con código PIN personalizable.", tag: "Control" },
  { name: "KeyPad Outdoor", img: "/images/ajax/keypad-outdoor.webp", desc: "Teclado para exterior con teclas físicas y lector de tarjetas y pulseras. Arma y desarma el sistema desde la puerta de entrada.", tag: "Control" },
  { name: "SpaceControl", img: "/images/ajax/spacecontrol.webp", desc: "Mando a distancia con cuatro botones: armar, desarmar, modo noche y pánico. Va incluido en nuestros kits de alarma.", tag: "Mando" },
  { name: "KeyPad TouchScreen", img: "/images/ajax/keypad-touchscreen.webp", desc: "Teclado con pantalla táctil y lector de tarjetas y pulseras. Gestiona el sistema sin sacar el móvil.", tag: "Control" },
  { name: "ReX 2", desc: "Repetidor de señal radio Ajax. Duplica el alcance del sistema hasta 2.000m adicionales en instalaciones de gran superficie.", tag: "Repetidor" },
];

const TECH_STATS = [
  { value: "2.000 m", label: "alcance de la señal radio Jeweller" },
  { value: "AES-128", label: "cifrado extremo a extremo" },
  { value: "7 años", label: "de batería en los sensores" },
  { value: "0 obras", label: "instalación 100% inalámbrica" },
];

const TECH_FEATURES = [
  { title: "Aviso en tiempo real", desc: "Notificación en tu móvil en el momento de la detección." },
  { title: "App Ajax 24/7", desc: "Armar, desarmar, historial y cámaras Ajax desde el móvil." },
  { title: "Antimanipulación", desc: "Detección de sabotaje físico y electrónico en cada dispositivo." },
];

const buildFaqs = (city) => [
  { q: "¿Cuánto tiempo tarda la instalación de una alarma Ajax?", a: `Una instalación residencial estándar se completa en 3-4 horas. Al ser 100% inalámbrica, no requiere obra ni canaletas. Instalaciones de oficinas o comunidades en ${city} pueden requerir 1 día.` },
  { q: "¿Necesito línea de teléfono fija?", a: "No. Ajax trabaja sobre WiFi, Ethernet y tiene SIM de respaldo integrada en el Hub. Si falla el internet, cambia a red móvil automáticamente sin intervención humana." },
  { q: "¿Qué pasa si cortan la luz?", a: "El Hub 2 tiene batería de respaldo interna de hasta 16 horas. Los sensores y detectores Ajax funcionan con pilas de larga duración (3-7 años) independientemente de la red eléctrica." },
  { q: "¿Incluye servicio de CRA (Central Receptora de Alarmas)?", a: "Tienes dos opciones y decides tú. Sin conexión a CRA: la alarma te avisa en el móvil y suena la sirena, sin cuotas. Con conexión a CRA: una central receptora homologada vigila el sistema; es un servicio opcional que se contrata aparte y no está incluido en el precio. Instalamos las dos; te lo explicamos sin compromiso al hacer el presupuesto." },
  { q: "¿Puedo controlar la alarma desde el móvil?", a: "Sí, mediante la app oficial Ajax Systems para iOS y Android. Armar, desarmar, recibir notificaciones, ver el historial de eventos y acceder a las imágenes MotionCam en tiempo real." },
  { q: "¿Qué diferencia hay entre alarma inalámbrica Ajax y sistemas cableados?", a: "Ajax no requiere obra, se instala en horas, es ampliable en cualquier momento y tiene comunicación redundante (WiFi + SIM). Para viviendas y pymes, Ajax ofrece el mejor equilibrio entre fiabilidad, facilidad y seguridad del mercado." },
  { q: "¿Son los sistemas Ajax compatibles con comunidades de vecinos?", a: "Sí. Ajax Hub 3 gestiona hasta 200 dispositivos en una sola instalación. Permite zonas independientes, administración multidispositivo y acceso diferenciado por usuario. Ideal para comunidades de vecinos y grandes empresas." },
];

export default function CityLandingTemplate({ city, seoPath, intro }) {
  // El CTA del hero sigue llevando al formulario genérico de abajo (no es
  // específico de ningún kit). El CTA de cada tarjeta de kit, en cambio,
  // abre el drawer global de presupuesto con el kit concreto preseleccionado
  // (mismo sistema unificado que ya usan los kits de cámaras) — antes las
  // 3 tarjetas de alarma llevaban todas al mismo formulario genérico
  // "Alarma", sin identificar cuál de los 3 kits se había pedido.
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };
  const { openDrawer } = useLeadDrawer();

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
          <div style={{ marginBottom: 16 }}>
            <Breadcrumbs items={[{ label: "Alarmas", href: "/alarmas-barcelona" }, { label: city }]} />
          </div>
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
              onClick={scrollToContact}
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
      <AlarmKitsGrid city={city} onRequestQuote={(kit) => openDrawer(kit.title)} />

      {/* CON O SIN CRA: LO DECIDE EL CLIENTE */}
      <AlarmConnectionOptions onRequestQuote={() => openDrawer(`Alarma en ${city}`)} />

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

      {/* CÓMO FUNCIONA — línea de tiempo, sin cajas ni iconos repetidos */}
      <section style={{ backgroundColor: "#fff", padding: "64px 24px" }}>
        <div className="max-w-3xl mx-auto">
          <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.14em", textTransform: "uppercase" }}>Proceso</span>
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#0A0A1A", margin: "10px 0 36px" }}>¿Cómo funciona el sistema Ajax?</h2>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, position: "relative" }}>
            <span aria-hidden="true" style={{ position: "absolute", left: 5, top: 8, bottom: 8, width: 2, background: "linear-gradient(to bottom, #E53E3E, #E5E7EB)" }} />
            {HOW_IT_WORKS.map((step) => (
              <li key={step.step} style={{ position: "relative", paddingLeft: 36, paddingBottom: 30 }}>
                <span aria-hidden="true" style={{ position: "absolute", left: 0, top: 6, width: 12, height: 12, borderRadius: "50%", background: "#fff", border: "3px solid #E53E3E" }} />
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0A0A1A", margin: "0 0 6px" }}>
                  <span style={{ color: "#E53E3E", fontSize: 13, fontWeight: 800, marginRight: 8 }}>{step.step}</span>{step.title}
                </h3>
                <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.7, margin: 0, maxWidth: 560 }}>{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* COMPONENTES AJAX — foto + ficha técnica, sin tarjetas con icono */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "64px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.14em", textTransform: "uppercase" }}>Dispositivos del ecosistema</span>
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#0A0A1A", margin: "10px 0 8px" }}>Componentes del sistema Ajax</h2>
          <p style={{ fontSize: 14, color: "#6B7280", maxWidth: 560, margin: "0 0 32px", lineHeight: 1.6 }}>Cada dispositivo trabaja en conjunto dentro del ecosistema Ajax. Adaptamos los componentes a la geometría exacta de tu espacio.</p>

          <div className="grid lg:grid-cols-5" style={{ gap: 32, alignItems: "start" }}>
            <div className="lg:col-span-2" style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "#E9ECF1", padding: 12 }}>
              <img
                src="/images/ajax/kit-inicio.webp"
                alt="Kit de inicio de alarma Ajax: central Hub, detector de movimiento, mando y contacto magnético"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", display: "block", aspectRatio: "1 / 1", objectFit: "contain", background: "#fff", borderRadius: 10 }}
              />
            </div>
            <dl className="lg:col-span-3" style={{ margin: 0 }}>
              {AJAX_COMPONENTS.map((c) => (
                <div key={c.name} style={{ padding: "14px 0", borderBottom: "1px solid #E5E7EB", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  {c.img && (
                    <img src={c.img} alt={`Ajax ${c.name}`} loading="lazy" decoding="async" width="64" height="64" style={{ width: 64, height: 64, objectFit: "contain", background: "#fff", borderRadius: 10, border: "1px solid #E5E7EB", flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <dt style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: "#0A0A1A" }}>{c.name}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", textTransform: "uppercase" }}>{c.tag}</span>
                    </dt>
                    <dd style={{ margin: "4px 0 0", fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>{c.desc}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Cifras clave */}
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 0, marginTop: 40, borderTop: "2px solid #0A0A1A" }}>
            {TECH_STATS.map((t, i) => (
              <div key={t.label} style={{ padding: "20px 16px 8px 0", borderRight: i % 2 === 0 ? "1px solid #E5E7EB" : "none", paddingLeft: i % 2 === 1 ? 16 : 0 }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#0A0A1A", letterSpacing: "-0.02em", lineHeight: 1 }}>{t.value}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 6, lineHeight: 1.4 }}>{t.label}</div>
              </div>
            ))}
          </div>

          <ul style={{ listStyle: "none", margin: "28px 0 0", padding: 0 }} className="grid sm:grid-cols-3 gap-x-8 gap-y-5">
            {TECH_FEATURES.map((f) => (
              <li key={f.title}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: "#0A0A1A", margin: "0 0 3px" }}>{f.title}</h4>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.55, margin: 0 }}>{f.desc}</p>
              </li>
            ))}
          </ul>
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

      {/* CONTACTO — único formulario de la página; el hero y los kits de arriba
          desplazan hasta aquí en vez de abrir un popup independiente. */}
      <section id="contacto" style={{ background: "#0a1120", padding: "64px 24px", scrollMarginTop: 90 }}>
        <div className="max-w-lg mx-auto">
          <div className="text-center" style={{ marginBottom: 28 }}>
            <span style={{ display: "inline-block", backgroundColor: "#E53E3E", color: "#fff", borderRadius: 4, fontSize: 11, fontWeight: 800, padding: "5px 12px", letterSpacing: "0.08em", marginBottom: 16 }}>
              PRESUPUESTO GRATUITO
            </span>
            <h2 style={{ fontWeight: 900, fontSize: 26, color: "#fff", margin: "0 0 8px" }}>
              Solicita tu presupuesto en {city}
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 14 }}>Sin compromiso · Respuesta en menos de 24h</p>
          </div>
          <LeadCaptureForm service="Alarma" />
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
