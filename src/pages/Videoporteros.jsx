import React, { useState } from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import HeroContactModal from "../components/landing/HeroContactModal";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Smartphone, Eye, Wifi, Shield, Star, ChevronRight, Bell, Key, Clock, Camera, Users, Building2, Lock } from "lucide-react";

const SOLUTIONS = [
  {
    icon: "🏠",
    title: "Vivienda Unifamiliar",
    desc: "La solución perfecta para chalet o casa. Cámara HD con visión nocturna, app móvil y apertura desde cualquier lugar.",
    features: [
      "Cámara HD 1080p o superior",
      "App móvil apertura remota",
      "Visión nocturna automática",
      "Audio bidireccional HD",
      "Historial de visitas con foto",
      "Instalación en 1 día",
    ],
    price: "Desde 299€ instalado",
  },
  {
    icon: "🏘️",
    title: "Comunidad de Vecinos",
    desc: "Sistema profesional para edificios y comunidades. Compatible con cableado 2 hilos existente, sin obras.",
    features: [
      "Compatible con instalación 2 hilos existente",
      "Directorio digital de vecinos",
      "Cámara WDR anti-contraluz",
      "Control de garaje integrado",
      "Tarjetas RFID / llaveros NFC",
      "App individual por propietario",
      "Cumplimiento RGPD incluido",
      "Gestión centralizada",
    ],
    price: "Desde 599€ instalado",
  },
  {
    icon: "🏢",
    title: "Empresa / Oficina",
    desc: "Seguridad de nivel corporativo. Control de accesos biométrico, registro de entradas y gestión desde panel web.",
    features: [
      "Sistema IP puro con cifrado",
      "Control biométrico: huella y facial",
      "Registro de entradas y salidas",
      "Acceso temporal para visitas",
      "Integración con alarma y CCTV",
      "Panel de gestión web centralizado",
      "App multidispositivo para directivos",
      "Mantenimiento preventivo incluido",
    ],
    price: "Presupuesto a medida",
  },
];

const ALL_SERVICES = [
  { icon: <Camera className="w-5 h-5" />, title: "Videoportero HD", desc: "Imagen en 1080p, 4K o 5MP con ángulo de 150°. Identifica con claridad a cada visitante." },
  { icon: <Smartphone className="w-5 h-5" />, title: "Apertura Remota", desc: "Abre la puerta desde el móvil estés donde estés: de viaje, en el trabajo o en el sofá." },
  { icon: <Bell className="w-5 h-5" />, title: "Notificación Instantánea", desc: "Recibes un aviso en el móvil en el momento en que alguien pulsa el pulsador." },
  { icon: <Eye className="w-5 h-5" />, title: "Visión Nocturna", desc: "Cámara con infrarrojos automáticos. Visión perfecta de noche sin iluminación adicional." },
  { icon: <Key className="w-5 h-5" />, title: "RFID / Tarjetas NFC", desc: "Apertura sin manos con tarjeta, llavero o smartphone por NFC. Sin cables de más." },
  { icon: <Users className="w-5 h-5" />, title: "Reconocimiento Facial", desc: "Acceso automático por reconocimiento de cara. Ideal para oficinas y empresas con mucho personal." },
  { icon: <Lock className="w-5 h-5" />, title: "Huella Dactilar", desc: "Lector biométrico de huella para acceso seguro e intransferible. 0% riesgo de copia." },
  { icon: <Clock className="w-5 h-5" />, title: "Historial de Visitas", desc: "Log completo con foto, hora y método de apertura de cada entrada registrada." },
  { icon: <Building2 className="w-5 h-5" />, title: "Control de Garaje", desc: "Integración directa con la barrera o puerta de garaje desde la misma app o panel." },
  { icon: <Wifi className="w-5 h-5" />, title: "Acceso Temporal / QR", desc: "Genera un código temporal para visitas, repartidores o trabajadores. Caduca automáticamente." },
  { icon: <Shield className="w-5 h-5" />, title: "Integración con Alarma", desc: "El videoportero se comunica con tu sistema de alarma. Una sola app lo controla todo." },
  { icon: <Star className="w-5 h-5" />, title: "Mantenimiento Preventivo", desc: "Revisión anual incluida, actualizaciones de firmware remoto y soporte técnico prioritario." },
];

const TECH = [
  { icon: <Eye className="w-7 h-7" style={{ color: "#E53E3E" }} />, title: "Cámara hasta 5MP WDR", desc: "Identifica con total claridad quién llama, incluso a contraluz, de día y de noche" },
  { icon: <Smartphone className="w-7 h-7" style={{ color: "#E53E3E" }} />, title: "Apertura Remota Global", desc: "Abre la puerta desde cualquier parte del mundo con tu móvil, aunque estés de viaje" },
  { icon: <Wifi className="w-7 h-7" style={{ color: "#E53E3E" }} />, title: "Integración Total", desc: "Compatible con tu sistema de alarma, cámaras de seguridad y control de accesos" },
  { icon: <Shield className="w-7 h-7" style={{ color: "#E53E3E" }} />, title: "Instalación Garantizada", desc: "Técnicos certificados. Garantía de 3 años en todos los equipos instalados" },
];

const FAQS = [
  { q: "¿Puedo modernizar mi videoportero de 2 hilos sin cambiar el cableado?", a: "Sí. Instalamos módulos IP que convierten tu instalación de 2 hilos existente en un sistema inteligente con app, sin necesidad de cambiar el cableado. Es la solución más económica para comunidades que quieren modernizarse y permite mantener toda la infraestructura existente." },
  { q: "¿Cuánto cuesta instalar un videoportero en una comunidad de vecinos?", a: "Depende del número de viviendas y del sistema actual. Para una comunidad de 10-20 vecinos, el precio parte desde 599€ con instalación incluida. Ofrecemos presupuesto gratuito sin compromiso y sin letra pequeña." },
  { q: "¿El reconocimiento facial es legal en España? ¿Cumple el RGPD?", a: "Sí, es completamente legal si se implementa correctamente. Nosotros nos encargamos de todo: instalación de señalética informativa obligatoria, configuración de los plazos de retención de datos, y documentación RGPD lista para presentar a inspección. El sistema no comparte datos con terceros." },
  { q: "¿El videoportero se puede integrar con mis cámaras de seguridad?", a: "Sí, todos nuestros sistemas IP se integran nativamente con cámaras CCTV y sistemas de alarma, creando una plataforma de seguridad unificada gestionable desde una sola app." },
  { q: "¿Qué pasa si me llaman cuando estoy fuera?", a: "Con nuestros sistemas recibes una notificación instantánea en tu móvil, ves al visitante en tiempo real con vídeo HD y puedes abrir la puerta remotamente desde cualquier lugar del mundo." },
  { q: "¿Cuánto tarda la instalación?", a: "Una vivienda unifamiliar se instala en pocas horas. Una comunidad de vecinos de 10-20 pisos se completa en 1 día. Para empresas con control de accesos avanzado, entre 1 y 2 días. Trabajamos de manera limpia y ordenada, sin obras ni molestias." },
  { q: "¿Puedo dar acceso temporal a un repartidor o técnico?", a: "Sí. Los sistemas que instalamos permiten generar códigos QR o PIN de acceso con caducidad programada. Perfectos para repartidores de paquetería, técnicos de mantenimiento o inquilinos temporales. El acceso se registra con foto y hora." },
];

export default function Videoporteros() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-white" style={{ paddingBottom: 70 }}>
      <AdvancedSEO
        title="Instalación Videoporteros Barcelona | Fermax, Bticino, Golmar | Premium Tech Security"
        description="Instalamos videoporteros IP, control de accesos biométrico y reconocimiento facial en Barcelona y toda Catalunya. Fermax, Bticino, Golmar. Presupuesto gratis 638 10 99 47."
        keywords="videoporteros Barcelona, instalación videoportero, Fermax Barcelona, Bticino, Golmar, videoportero IP, control accesos biométrico, reconocimiento facial"
        canonicalUrl="https://alarmasenbarcelona.com/videoporteros"
      />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background: "linear-gradient(135deg, #0F1923 0%, #1a2a3a 60%, #0A0A1A 100%)", minHeight: "70vh", paddingTop: 100, paddingBottom: 48, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,62,62,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 20, padding: "6px 14px", marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#E53E3E", boxShadow: "0 0 8px #E53E3E" }} />
            <span style={{ color: "#F87171", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>VIDEOPORTEROS · CONTROL DE ACCESOS · BARCELONA</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 items-center">
            <div>
              <h1 style={{ fontWeight: 900, fontSize: "clamp(26px, 5vw, 44px)", color: "#fff", lineHeight: 1.15, margin: 0 }}>
                Videoporteros Inteligentes.<br />
                <span style={{ color: "#E53E3E" }}>Ve quién llama</span> desde cualquier lugar.
              </h1>
              <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.75, marginTop: 14 }}>
                Instalamos videoporteros IP de última generación con control de accesos biométrico, reconocimiento facial y apertura remota desde el móvil. Para hogares, comunidades y empresas en Barcelona y toda Catalunya.
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
            <div style={{ display: "flex", justifyContent: "center" }}>
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

      {/* ── BRANDS ── */}
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
                  Fermax nació en Valencia y es hoy uno de los mayores fabricantes de videoporteros del mundo. Su gama <strong>DUOX Plus</strong> moderniza instalaciones de 2 hilos existentes sin obra, añadiendo imagen HD y la app <strong>MEET</strong> para apertura remota. La serie <strong>VEO</strong> incorpora pantalla táctil de 7&quot; con visión nocturna automática. ISO 9001 · Presencia en más de 70 países.
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
              <div style={{ backgroundColor: "#0A0A1A", minHeight: 100, overflow: "hidden" }}>
                <img src="/images/bticino-videoportero.jpeg" alt="BTicino Classe 300" style={{ width: "100%", height: 140, objectFit: "cover", objectPosition: "top", display: "block" }} />
              </div>
              <div style={{ padding: "20px 20px 24px" }}>
                <div style={{ fontWeight: 900, fontSize: 16, color: "#0A0A1A", marginBottom: 6 }}>BTicino · Classe 300</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <Star className="w-4 h-4" style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5 }}>Diseño italiano · Grupo Legrand</span>
                </div>
                <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, margin: 0 }}>
                  BTicino pertenece al Grupo Legrand y es sinónimo de diseño italiano de alta gama. El <strong>Classe 300 X13E</strong> incorpora pantalla táctil vertical de <strong>7 pulgadas</strong>, cámara de <strong>5MP</strong> con ángulo de 150° y tecnología WDR. La app <strong>Home+ Door</strong> gestiona la puerta de forma remota e incluye llaveros RFID para apertura sin manos.
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
                  Golmar es una marca española fundada en 1971, con sede en Barcelona, especializada en comunidades de vecinos. Su gama <strong>Sixty5</strong> incorpora pantalla táctil de 5&quot;, protocolo SIP y tecnología de cámara <strong>WDR</strong> para visión perfecta incluso con fuerte contraluz. La app <strong>G2Call</strong> permite contestar al portero desde el smartphone. Ideal para grandes comunidades.
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

      {/* ── CONTROL DE ACCESOS ── */}
      <section style={{ backgroundColor: "#0F1923", padding: "56px 20px", overflow: "hidden" }}>
        <div className="max-w-5xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", color: "#F87171", borderRadius: 20, fontSize: 11, fontWeight: 700, padding: "5px 14px", marginBottom: 14, letterSpacing: 1 }}>
              CONTROL DE ACCESOS AVANZADO
            </span>
            <h2 style={{ fontWeight: 900, fontSize: 26, color: "#fff", margin: 0 }}>
              Más que un videoportero —<br />
              <span style={{ color: "#E53E3E" }}>Sistema de seguridad completo</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 15, marginTop: 12, maxWidth: 540, margin: "12px auto 0" }}>
              Integramos el videoportero con sistemas de control de accesos biométrico, reconocimiento facial y gestión de visitantes para una seguridad total.
            </p>
          </div>

          {/* Imagen facial recognition - grande */}
          <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 20, boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
            <img
              src="/images/reconocimiento-facial.jpeg"
              alt="Sistema de reconocimiento facial para control de accesos en empresa"
              style={{ width: "100%", height: "auto", maxHeight: 380, objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          </div>

          {/* Dos imágenes lado a lado */}
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}>
              <img
                src="/images/control-accesos-biometrico.webp"
                alt="Lector biométrico de huella dactilar para control de accesos"
                style={{ width: "100%", height: 240, objectFit: "cover", objectPosition: "center", display: "block" }}
              />
            </div>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}>
              <img
                src="/images/seguridad-digital.png"
                alt="Seguridad digital y protección de datos biométricos"
                style={{ width: "100%", height: 240, objectFit: "cover", objectPosition: "center", display: "block" }}
              />
            </div>
          </div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "👁️", title: "Reconocimiento Facial", desc: "Identifica y da acceso automático a empleados y residentes autorizados en menos de 0,3 segundos." },
              { icon: "🖐️", title: "Huella Dactilar", desc: "Lector biométrico de última generación. Acceso intransferible, sin tarjetas que perder ni pines que olvidar." },
              { icon: "💳", title: "Tarjeta RFID / NFC", desc: "Tarjetas de proximidad y llaveros NFC para comunidades y empresas con mucho personal rotativo." },
              { icon: "🔢", title: "Teclado PIN", desc: "Acceso con código numérico como método secundario o para zonas de menor seguridad." },
              { icon: "📦", title: "Acceso Temporal", desc: "Código QR o PIN de un solo uso para repartidores, técnicos o visitas puntuales. Caduca automáticamente." },
              { icon: "📋", title: "Registro Completo", desc: "Log detallado de cada acceso: foto, hora, identidad y método de apertura. Exportable para auditorías." },
            ].map(f => (
              <div key={f.title} style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px 18px" }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: 14, color: "#fff", marginBottom: 6, marginTop: 0 }}>{f.title}</h3>
                <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TODO LO QUE HACEMOS ── */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: 0 }}>Todo lo que incluye nuestro servicio</h2>
            <p style={{ color: "#6B7280", fontSize: 14, marginTop: 8 }}>Desde la instalación básica hasta el sistema de seguridad más avanzado — lo hacemos todo</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {ALL_SERVICES.map((s) => (
              <div key={s.title} style={{ backgroundColor: "#fff", borderRadius: 14, padding: "18px 16px", border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(229,62,62,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#E53E3E", flexShrink: 0 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 13, color: "#0A0A1A", margin: 0 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section style={{ backgroundColor: "#fff", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", marginBottom: 8 }}>Solución para Cada Espacio</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Adaptamos el sistema exacto a tus necesidades y presupuesto</p>
          <div className="grid sm:grid-cols-3 gap-5">
            {SOLUTIONS.map((s) => (
              <div key={s.title} style={{ backgroundColor: "#F8F9FA", borderRadius: 16, padding: 24, border: "1px solid #E5E7EB", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: 17, color: "#0A0A1A", marginBottom: 6, marginTop: 0 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 12, marginTop: 0 }}>{s.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
                  {s.features.map((f) => (
                    <li key={f} style={{ fontSize: 12, color: "#374151", lineHeight: 2 }}>
                      <span style={{ color: "#E53E3E", fontWeight: 700, marginRight: 6 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 16, padding: "10px 0", borderTop: "1px solid #E5E7EB", fontSize: 13, fontWeight: 700, color: "#E53E3E" }}>{s.price}</div>
                <button onClick={() => setShowModal(true)} style={{ display: "block", width: "100%", backgroundColor: "#E53E3E", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 50, padding: 13, textAlign: "center", marginTop: 10, boxSizing: "border-box", border: "none", cursor: "pointer" }}>
                  Solicitar presupuesto →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH ── */}
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

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "56px 20px" }}>
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", marginBottom: 8 }}>Preguntas Frecuentes</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Resolvemos las dudas más habituales sobre videoporteros y control de accesos</p>
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
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#fff", marginBottom: 8 }}>¿Necesitas Videoportero o Control de Accesos en Barcelona?</h2>
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
