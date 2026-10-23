import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import { useLeadDrawer } from "@/context/LeadDrawerContext";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import Breadcrumbs from "../components/landing/Breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Smartphone, Eye, Wifi, Shield, Star, ChevronRight, Bell, Key, Clock, Camera, Users, Building2, Lock, Home, ScanFace, Fingerprint, CreditCard, Hash, PackageCheck, ClipboardList } from "lucide-react";
import { businessStats } from "@/lib/businessStats";

const SOLUTIONS = [
  {
    icon: <Home className="w-7 h-7" style={{ color: "#E53E3E" }} />,
    title: "Vivienda Unifamiliar",
    desc: "Videoportero conectado para chalet o casa con cámara y apertura desde el móvil cuando el equipo y la conexión son compatibles.",
    features: [
      "Cámara HD 1080p o superior",
      "App móvil apertura remota",
      "Visión nocturna automática",
      "Audio bidireccional HD",
      "Historial de visitas con foto",
      "Instalación en 1 día",
    ],
    price: "Presupuesto personalizado",
  },
  {
    icon: <Users className="w-7 h-7" style={{ color: "#E53E3E" }} />,
    title: "Comunidad de Vecinos",
    desc: "Videoporteros para comunidades: estudiamos si el cableado de dos hilos existente puede reutilizarse y qué necesita cada vivienda.",
    features: [
      "Reutilización de dos hilos tras comprobación técnica",
      "Directorio digital de vecinos",
      "Cámara WDR anti-contraluz",
      "Control de garaje integrado",
      "Tarjetas RFID / llaveros NFC",
      "App individual por propietario",
      "Orientación sobre privacidad de imágenes",
      "Gestión centralizada",
    ],
    price: "Presupuesto personalizado",
  },
  {
    icon: <Building2 className="w-7 h-7" style={{ color: "#E53E3E" }} />,
    title: "Empresa / Oficina",
    desc: "Sistemas de videoportero IP y control de acceso para oficinas, con permisos de apertura adecuados a cada proyecto.",
    features: [
      "Sistema IP puro con cifrado",
      "Alternativas de tarjeta, móvil o PIN compatibles",
      "Registro de entradas y salidas",
      "Acceso temporal para visitas",
      "Integración con alarma y CCTV",
      "Panel de gestión web centralizado",
      "App multidispositivo para directivos",
      "Mantenimiento disponible según presupuesto",
    ],
    price: "Presupuesto a medida",
  },
];

const ALL_SERVICES = [
  { icon: <Camera className="w-5 h-5" />, title: "Videoportero HD", desc: "Seleccionamos resolución y ángulo de cámara apropiados para cada acceso, según el fabricante y modelo." },
  { icon: <Smartphone className="w-5 h-5" />, title: "Apertura Remota", desc: "Gestiona la apertura desde el móvil con un equipo conectado y una app compatible." },
  { icon: <Bell className="w-5 h-5" />, title: "Notificación Instantánea", desc: "Recibes un aviso en el móvil en el momento en que alguien pulsa el pulsador." },
  { icon: <Eye className="w-5 h-5" />, title: "Visión Nocturna", desc: "La calidad de visión nocturna depende de la cámara, la iluminación y el montaje." },
  { icon: <Key className="w-5 h-5" />, title: "RFID / Tarjetas NFC", desc: "Apertura sin manos con tarjeta, llavero o smartphone por NFC. Sin cables de más." },
  { icon: <Users className="w-5 h-5" />, title: "Biometría: evaluación previa", desc: "No se implanta sin justificar la base jurídica, la necesidad y el análisis de riesgos. Priorizamos alternativas menos invasivas." },
  { icon: <Lock className="w-5 h-5" />, title: "Teclado PIN", desc: "Códigos o credenciales configurables según el sistema elegido." },
  { icon: <Clock className="w-5 h-5" />, title: "Historial de Visitas", desc: "Registro de eventos disponible según el modelo, los permisos y la configuración." },
  { icon: <Building2 className="w-5 h-5" />, title: "Control de Garaje", desc: "La integración con la puerta del garaje depende de los dispositivos y la electrónica existente." },
  { icon: <Wifi className="w-5 h-5" />, title: "Acceso Temporal / QR", desc: "Los equipos compatibles permiten configurar códigos o accesos temporales." },
  { icon: <Shield className="w-5 h-5" />, title: "Integración con Alarma", desc: "Antes de integrar alarma, cámaras y videoportero comprobamos la compatibilidad de los modelos y aplicaciones." },
  { icon: <Star className="w-5 h-5" />, title: "Mantenimiento Preventivo", desc: "Revisión y soporte disponibles según equipo y condiciones de mantenimiento contratadas." },
];

const TECH = [
  { icon: <Eye className="w-7 h-7" style={{ color: "#E53E3E" }} />, title: "Cámara hasta 5MP WDR", desc: "Identifica con total claridad quién llama, incluso a contraluz, de día y de noche" },
  { icon: <Smartphone className="w-7 h-7" style={{ color: "#E53E3E" }} />, title: "Apertura Remota Global", desc: "Apertura remota cuando el equipo conectado y la app lo permiten" },
  { icon: <Wifi className="w-7 h-7" style={{ color: "#E53E3E" }} />, title: "Integración Total", desc: "Integración posible tras comprobar protocolos y equipos existentes" },
  { icon: <Shield className="w-7 h-7" style={{ color: "#E53E3E" }} />, title: "Instalación Garantizada", desc: "Equipos con garantía legal aplicable e instalación profesional" },
];

const FAQS = [
  { q: "¿Puedo modernizar mi videoportero de 2 hilos sin cambiar el cableado?", a: "En muchos casos sí, pero depende del estado y tecnología del cableado. Revisamos la placa y los terminales antes de recomendar Fermax DUOX Plus, BTicino u otra solución compatible." },
  { q: "¿Cuánto cuesta instalar un videoportero en una comunidad de vecinos?", a: "Depende del número de viviendas y del sistema actual. Ofrecemos presupuesto gratuito y personalizado sin compromiso y sin letra pequeña, adaptado al tamaño de tu comunidad." },
  { q: "¿El reconocimiento facial es legal en España? ¿Cumple el RGPD?", a: "El reconocimiento facial y la huella son tratamientos especialmente sensibles según el RGPD y los criterios de la AEPD. No basta con señalizar: hay que justificar la base jurídica, necesidad y proporcionalidad, evaluar riesgos y estudiar alternativas como tarjeta o PIN antes de instalarlo." },
  { q: "¿El videoportero se puede integrar con mis cámaras de seguridad?", a: "Depende de la marca, protocolos y generación. Verificamos la compatibilidad de los equipos existentes antes de presupuestar integración; no todos se gestionan desde una misma app." },
  { q: "¿Qué pasa si me llaman cuando estoy fuera?", a: "Con un sistema conectado compatible, conexión a internet y la app configurada, puedes atender llamadas y abrir la puerta a distancia según el modelo." },
  { q: "¿Cuánto tarda la instalación?", a: "El plazo depende del estado del cableado, el número de viviendas, las modificaciones de la placa y el sistema elegido. Indicamos la duración en el presupuesto." },
  { q: "¿Puedo dar acceso temporal a un repartidor o técnico?", a: "Algunos equipos permiten códigos PIN o QR temporales. Comprobamos la disponibilidad en cada modelo y configuramos permisos y caducidad respetando la privacidad." },
];

export default function Videoporteros() {
  const { openDrawer } = useLeadDrawer();
  const openQuote = () => openDrawer("Videoportero");

  return (
    <div style={{ minHeight: "100vh", background: "#060e1a", paddingBottom: 70 }}>
      <AdvancedSEO
        title="Instalación de Videoporteros en Barcelona | Fermax y BTicino"
        description="Instalación y cambio de videoporteros en Barcelona para viviendas y comunidades. Fermax, BTicino y Golmar, sistemas de 2 hilos o IP y apertura móvil según modelo. Presupuesto gratis."
        keywords="instalación videoporteros Barcelona, cambiar portero automático Barcelona, Fermax DUOX Plus, BTicino, Golmar, videoportero comunidad Barcelona, videoportero 2 hilos"
        canonicalUrl="https://alarmasenbarcelona.com/videoporteros"
        ogImage="https://alarmasenbarcelona.com/images/bticino-videoportero.jpeg"
        schema={{ "@type": "Service", "name": "Instalación de videoporteros en Barcelona", "serviceType": "Sustitución de porteros automáticos, videoporteros de dos hilos o IP", "provider": { "@id": "https://alarmasenbarcelona.com/#business" }, "areaServed": { "@type": "City", "name": "Barcelona" } }}
      />
      <Navbar />

      {/* ── HERO (imagen real de instalación de fondo) ── */}
      <section style={{
        position: "relative", overflow: "hidden", minHeight: "72vh",
        backgroundImage: "url('/images/bticino-videoportero.jpeg')",
        backgroundSize: "cover", backgroundPosition: "center 20%",
        paddingTop: 100, paddingBottom: 64,
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, rgba(6,14,26,0.94) 0%, rgba(6,14,26,0.82) 42%, rgba(6,14,26,0.35) 100%)" }} />
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,62,62,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ marginBottom: 20 }}>
            <Breadcrumbs items={[{ label: "Servicios", href: "/Servicios" }, { label: "Videoporteros" }]} />
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#C53030", boxShadow: "0 0 8px #E53E3E" }} />
            <span style={{ color: "#F87171", fontSize: 12, fontWeight: 700 }}>Videoporteros · Control de accesos · Barcelona</span>
          </div>

          <h1 style={{ fontWeight: 900, fontSize: "clamp(26px, 5vw, 44px)", color: "#fff", lineHeight: 1.15, margin: 0, maxWidth: 640 }}>
            Instalación de Videoporteros en Barcelona.<br />
            <span style={{ color: "#E53E3E" }}>Ve quién llama</span> desde cualquier lugar.
          </h1>
          <p style={{ color: "#CBD5E0", fontSize: 16, lineHeight: 1.75, marginTop: 14, maxWidth: 560 }}>
            Instalamos o sustituimos videoporteros de dos hilos o IP para viviendas, comunidades y empresas de Barcelona. Revisamos el cableado existente y configuramos la app móvil cuando el equipo lo permite.
          </p>
          <div style={{ display: "flex", gap: 28, marginTop: 24, paddingTop: 20, paddingBottom: 20, borderTop: "1px solid rgba(255,255,255,0.15)", flexWrap: "wrap" }}>
            <div><div style={{ fontSize: 26, fontWeight: 900, color: "#E53E3E" }}>{businessStats.googleRating}★</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>Valoración en Google ({businessStats.googleReviewCount} reseñas)</div></div>
            <div><div style={{ fontSize: 26, fontWeight: 900, color: "#E53E3E" }}>{businessStats.installTimeframe}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>Plazo de instalación</div></div>
            <div><div style={{ fontSize: 26, fontWeight: 900, color: "#E53E3E" }}>3 años</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>Garantía</div></div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
            <button onClick={openQuote} style={{ backgroundColor: "#C53030", color: "#fff", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: "16px 28px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              Solicitar presupuesto gratis <ChevronRight className="w-5 h-5" />
            </button>
            <a href="tel:+34638109947" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 50, padding: "14px 26px", textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              📞 638 10 99 47
            </a>
          </div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginTop: 32,
            background: "rgba(6,14,26,0.6)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(229,62,62,0.3)", borderRadius: 100, padding: "8px 18px"
          }}>
            <span style={{ fontSize: 13, color: "#FC8181", fontWeight: 600, }}>Instalación real</span>
            <span style={{ fontSize: 12, color: "#94A3B8" }}>BTicino Classe 300 · Barcelona</span>
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section style={{ background: "#0a1120", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontWeight: 900, fontSize: 24, color: "#FFFFFF", margin: 0 }}>Marcas de videoporteros que instalamos</h2>
            <p style={{ color: "#94A3B8", fontSize: 14, marginTop: 8 }}>Soluciones Fermax, BTicino y Golmar según instalación, número de viviendas y compatibilidad</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">

            {/* FERMAX */}
            <div style={{ backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ backgroundColor: "#1B4F8A", padding: "24px 20px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 100 }}>
                <img src="/images/logo-fermax.png" alt="Fermax videoporteros" loading="lazy" decoding="async" style={{ height: 52, width: "auto", objectFit: "contain", display: "block" }} />
              </div>
              <div style={{ padding: "20px 20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <Star className="w-4 h-4" style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8", }}>Fabricante español</span>
                </div>
                <p style={{ fontSize: 13, color: "#CBD5E0", lineHeight: 1.7, margin: 0 }}>
                  Fermax ofrece porteros y videoporteros para viviendas y comunidades. Su tecnología <strong style={{ color: "#fff" }}>DUOX Plus</strong> permite estudiar la renovación de instalaciones de dos hilos según su estado. La app <strong style={{ color: "#fff" }}>DuoxMe</strong> gestiona llamadas y apertura en terminales compatibles; los planes y funcionalidades dependen de la conectividad Wi-Fi o 4G.
                </p>
                <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["DUOX Plus 2 hilos", "App DuoxMe", "Wi-Fi o 4G según equipo", "Revisión de cableado"].map(tag => (
                    <span key={tag} style={{ fontSize: 11, backgroundColor: "rgba(27,79,138,0.25)", color: "#93C5FD", borderRadius: 20, padding: "3px 10px", fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* BTICINO */}
            <div style={{ backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ backgroundColor: "#0A0A1A", minHeight: 100, overflow: "hidden" }}>
                <img src="/images/bticino-videoportero.jpeg" alt="BTicino Classe 300" loading="lazy" decoding="async" style={{ width: "100%", height: 140, objectFit: "cover", objectPosition: "top", display: "block" }} />
              </div>
              <div style={{ padding: "20px 20px 24px" }}>
                <div style={{ fontWeight: 900, fontSize: 16, color: "#FFFFFF", marginBottom: 6 }}>BTicino · Classe 300</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <Star className="w-4 h-4" style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8", }}>Diseño italiano · Grupo Legrand</span>
                </div>
                <p style={{ fontSize: 13, color: "#CBD5E0", lineHeight: 1.7, margin: 0 }}>
                  BTicino, del Grupo Legrand, dispone de videoporteros conectados de dos hilos. La familia <strong style={{ color: "#fff" }}>Classe 300X</strong> incluye opciones con pantalla de 7 pulgadas. La aplicación varía según generación: <strong style={{ color: "#fff" }}>Door Entry</strong> en unidades antiguas y <strong style={{ color: "#fff" }}>Home + Security</strong> en los modelos nuevos compatibles.
                </p>
                <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Classe 300X", "Pantalla 7 pulgadas", "App según generación", "Dos hilos"].map(tag => (
                    <span key={tag} style={{ fontSize: 11, backgroundColor: "rgba(255,255,255,0.06)", color: "#CBD5E0", borderRadius: 20, padding: "3px 10px", fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* GOLMAR */}
            <div style={{ backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ backgroundColor: "#E87722", padding: "24px 20px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 100 }}>
                <img src="/images/logo-golmar.png" alt="Golmar videoporteros" loading="lazy" decoding="async" style={{ height: 60, width: "auto", objectFit: "contain", display: "block" }} />
              </div>
              <div style={{ padding: "20px 20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <Star className="w-4 h-4" style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8", }}>Marca española</span>
                </div>
                <p style={{ fontSize: 13, color: "#CBD5E0", lineHeight: 1.7, margin: 0 }}>
                  Golmar ofrece porteros automáticos y videoporteros para edificios y comunidades. Podemos estudiar la renovación de placas, monitores y abrepuertas teniendo en cuenta el cableado existente; la llamada al móvil y otras funciones dependen de la gama elegida.
                </p>
                <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Comunidades", "Porteros automáticos", "Cambio de placa", "Opciones conectadas"].map(tag => (
                    <span key={tag} style={{ fontSize: 11, backgroundColor: "rgba(232,119,34,0.15)", color: "#FCA47A", borderRadius: 20, padding: "3px 10px", fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={openQuote} style={{ backgroundColor: "#C53030", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "14px 32px", border: "none", cursor: "pointer" }}>
              ¿No sabes qué marca necesitas? Te asesoramos gratis →
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTROL DE ACCESOS ── */}
      <section style={{ backgroundColor: "#0F1923", padding: "56px 20px", overflow: "hidden" }}>
        <div className="max-w-5xl mx-auto">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ display: "inline-block", color: "#F87171", fontSize: 11, fontWeight: 700, marginBottom: 14 }}>
              CONTROL DE ACCESOS COMPATIBLES
            </span>
            <h2 style={{ fontWeight: 900, fontSize: 26, color: "#fff", margin: 0 }}>
              Más que un videoportero —<br />
              <span style={{ color: "#E53E3E" }}>Sistema de seguridad completo</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: 15, marginTop: 12, maxWidth: 540, margin: "12px auto 0" }}>
              Estudiamos la integración con tarjetas, códigos PIN, cerraduras electrónicas y gestión de visitantes. La biometría necesita una evaluación legal y de riesgos específica antes de plantearse.
            </p>
          </div>

          <p style={{ color: "#CBD5E0", fontSize: 14, lineHeight: 1.6, marginTop: 20 }}>Para puertas de Barcelona también instalamos <Link to="/cerraduras" style={{ color: "#F87171", fontWeight: 700 }}>cerraduras electrónicas</Link> y <Link to="/control-accesos" style={{ color: "#F87171", fontWeight: 700 }}>control de accesos</Link>. Revisamos los equipos actuales antes de proponer cambios.</p>
          {/* Imagen facial recognition - grande */}
          <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 20, boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
            <img
              src="/images/reconocimiento-facial.jpeg"
              alt="Sistema de reconocimiento facial para control de accesos en empresa"
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "auto", maxHeight: 380, objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          </div>

          {/* Dos imágenes lado a lado */}
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}>
              <img
                src="/images/control-accesos-biometrico.webp"
                alt="Lector biométrico de huella dactilar para control de accesos"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: 240, objectFit: "cover", objectPosition: "center", display: "block" }}
              />
            </div>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}>
              <img
                src="/images/seguridad-digital.png"
                alt="Seguridad digital y protección de datos biométricos"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: 240, objectFit: "cover", objectPosition: "center", display: "block" }}
              />
            </div>
          </div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { Icon: ScanFace, title: "Reconocimiento Facial", desc: "La identificación biométrica requiere evaluar su necesidad, base jurídica y riesgos antes de decidir si resulta viable." },
              { Icon: Fingerprint, title: "Huella Dactilar", desc: "Como alternativa a la huella, recomendamos valorar PIN o tarjetas sin almacenar datos biométricos." },
              { Icon: CreditCard, title: "Tarjeta RFID / NFC", desc: "Tarjetas de proximidad y llaveros NFC para comunidades y empresas con mucho personal rotativo." },
              { Icon: Hash, title: "Teclado PIN", desc: "Acceso con código numérico como método secundario o para zonas de menor seguridad." },
              { Icon: PackageCheck, title: "Acceso Temporal", desc: "Código QR o PIN de un solo uso para repartidores, técnicos o visitas puntuales. Caduca automáticamente." },
              { Icon: ClipboardList, title: "Registro Completo", desc: "Registro configurable en dispositivos compatibles, con acceso restringido y conservación adecuada." },
            ].map(f => (
              <div key={f.title} style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px 18px" }}>
                <div style={{ marginBottom: 8 }}><f.Icon size={24} color="#E53E3E" /></div>
                <h3 style={{ fontWeight: 800, fontSize: 14, color: "#fff", marginBottom: 6, marginTop: 0 }}>{f.title}</h3>
                <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TODO LO QUE HACEMOS ── */}
      <section style={{ background: "#060e1a", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontWeight: 900, fontSize: 24, color: "#FFFFFF", margin: 0 }}>Servicios y opciones según el modelo</h2>
            <p style={{ color: "#94A3B8", fontSize: 14, marginTop: 8 }}>Desde la instalación básica hasta el sistema de seguridad más avanzado — lo hacemos todo</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {ALL_SERVICES.map((s) => (
              <div key={s.title} style={{ backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "18px 16px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(229,62,62,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#E53E3E", flexShrink: 0 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 13, color: "#FFFFFF", margin: 0 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section style={{ background: "#0a1120", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#FFFFFF", marginBottom: 8 }}>Solución para Cada Espacio</h2>
          <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 28 }}>Adaptamos el sistema exacto a tus necesidades y presupuesto</p>
          <div className="grid sm:grid-cols-3 gap-5">
            {SOLUTIONS.map((s) => (
              <div key={s.title} style={{ backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: 10 }}>{s.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: 17, color: "#FFFFFF", marginBottom: 6, marginTop: 0 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 12, marginTop: 0 }}>{s.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
                  {s.features.map((f) => (
                    <li key={f} style={{ fontSize: 12, color: "#CBD5E0", lineHeight: 2 }}>
                      <span style={{ color: "#E53E3E", fontWeight: 700, marginRight: 6 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 16, padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 13, fontWeight: 700, color: "#E53E3E" }}>{s.price}</div>
                <button onClick={openQuote} style={{ display: "block", width: "100%", backgroundColor: "#C53030", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 50, padding: 13, textAlign: "center", marginTop: 10, boxSizing: "border-box", border: "none", cursor: "pointer" }}>
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
      <section style={{ background: "#060e1a", padding: "56px 20px" }}>
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#FFFFFF", marginBottom: 8 }}>Preguntas Frecuentes</h2>
          <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 28 }}>Resolvemos las dudas más habituales sobre videoporteros y control de accesos</p>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-[#0d1b2a] rounded-xl border border-[rgba(255,255,255,0.08)] px-5 overflow-hidden">
                <AccordionTrigger className="text-left text-[15px] font-semibold text-white hover:text-[#E53E3E] transition-colors duration-300 py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#94A3B8] text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Relacionados */}
      <div style={{ textAlign: "center", padding: "0 20px 32px" }}>
        <p style={{ color: "#94A3B8", fontSize: 14 }}>
          Combina tu videoportero con un sistema de{" "}
          <Link to="/control-accesos" style={{ color: "#E63946", fontWeight: 700 }}>control de accesos</Link>{" "}
          para gestionar quién entra y sale de tu edificio.
        </p>
      </div>

      {/* ── FINAL CTA ── */}
      <section style={{ background: "linear-gradient(135deg, #E53E3E, #C53030)", padding: "48px 20px" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#fff", marginBottom: 8 }}>¿Necesitas Videoportero o Control de Accesos en Barcelona?</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginBottom: 28 }}>Presupuesto gratuito · Plazo según instalación · Garantía según condiciones</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={openQuote} style={{ backgroundColor: "#fff", color: "#C53030", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: 18, border: "none", cursor: "pointer" }}>
              Solicitar presupuesto gratis →
            </button>
            <a href="tel:+34638109947" style={{ border: "2px solid rgba(255,255,255,0.5)", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: 16, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "transparent" }}>
              📞 638 10 99 47
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
