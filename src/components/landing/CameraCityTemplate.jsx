import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";
import AdvancedSEO from "../seo/AdvancedSEO";
import CameraKitsGrid from "./CameraKitsGrid";
import Breadcrumbs from "./Breadcrumbs";
import CameraLocalSections from "./CameraLocalSections";
import { useLeadDrawer } from "@/context/LeadDrawerContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Smartphone, Clock, CheckCircle, Camera, Wifi, Eye, HardDrive, Lock, Sun } from "lucide-react";

const SERVICES = [
  {
    num: "01",
    title: "Cámaras para Hogar",
    desc: "Protege tu vivienda con cámaras HD 4K en puntos clave: acceso principal, garaje, jardín. Control total desde el móvil, visión nocturna en color y grabación local sin cuotas.",
    features: ["Cámaras domo y bala HD 4K exteriores e interiores", "Visión nocturna en color hasta 30m", "Grabador NVR con disco duro local", "App móvil iOS y Android gratuita", "Alertas por movimiento en tiempo real", "Sin cuotas mensuales"],
  },
  {
    num: "02",
    title: "Cámaras para Negocio y Empresa",
    desc: "Instalaciones profesionales para tiendas, oficinas, empresas y locales comerciales. Grabación continua 24/7, acceso multiusuario y alta resolución para identificar detalles con claridad.",
    features: ["Resolución 4K Ultra HD para identificación de detalles", "Grabación continua 24/7 con grabador profesional", "Cámaras PTZ motorizadas con zoom óptico", "Acceso remoto multiusuario desde cualquier dispositivo", "Compatible con central receptora de alarmas", "Cumplimiento normativa RGPD incluido"],
  },
  {
    num: "03",
    title: "Cámaras para Comunidades",
    desc: "Solución completa para portales, garajes, escaleras y zonas comunes. Gestión RGPD incluida, señalética homologada y acceso restringido por perfiles.",
    features: ["Cobertura de portal, garaje y zonas comunes", "Cámaras domo antivandálicas IP66", "Grabador NVR con almacenamiento RAID", "Gestión legal RGPD con documentación incluida", "Señalética homologada incluida", "Acceso restringido por roles (presidente, administrador)"],
  },
];

const WHAT_WE_DO = [
  { icon: <Camera className="w-5 h-5" />, title: "Cámara Domo", desc: "Para interiores y exteriores. Diseño discreto, 360°, resistente al vandalismo." },
  { icon: <Eye className="w-5 h-5" />, title: "Cámara Bullet", desc: "Larga distancia, hasta 60m. Ideal para entradas, vallas y accesos exteriores." },
  { icon: <Wifi className="w-5 h-5" />, title: "Cámara PTZ", desc: "Motorizada con zoom óptico 20x. Control remoto de pan, tilt y zoom." },
  { icon: <Sun className="w-5 h-5" />, title: "Visión Nocturna Color", desc: "Imagen en color incluso en oscuridad total gracias a infrarrojos avanzados." },
  { icon: <HardDrive className="w-5 h-5" />, title: "Grabador NVR / DVR", desc: "Almacenamiento local seguro de 1 a 16TB. Sin depender de la nube." },
  { icon: <Smartphone className="w-5 h-5" />, title: "App Móvil / Acceso Remoto", desc: "Visualización en tiempo real desde iOS y Android, desde cualquier lugar. Sin coste adicional." },
  { icon: <Lock className="w-5 h-5" />, title: "Sin Cuotas Mensuales", desc: "Pago único, sin sorpresas. El sistema es tuyo para siempre." },
  { icon: <Shield className="w-5 h-5" />, title: "Matrícula y Zona", desc: "Cámaras con lectura de matrículas y detección por zonas configurables." },
  { icon: <Eye className="w-5 h-5" />, title: "Detección por IA", desc: "Reconocimiento inteligente de personas y vehículos. Menos falsas alarmas por animales o lluvia." },
  { icon: <Camera className="w-5 h-5" />, title: "Cámaras IP y Analógicas HD", desc: "Instalamos cámaras IP o analógicas HD según las necesidades y el presupuesto de cada proyecto." },
];

// Los tres tipos de cámara salen recortados de la misma foto de producto
// (bullet a la izquierda, domo en el centro, PTZ a la derecha).
const CAMERA_TYPES = [
  { title: "Cámara Domo", desc: "Para interiores y exteriores. Diseño discreto, 360°, resistente al vandalismo.", alt: "Cámara de seguridad domo", pos: "50% 50%", zoom: 3.1, origin: "61% 58%" },
  { title: "Cámara Bullet", desc: "Larga distancia, hasta 60m. Ideal para entradas, vallas y accesos exteriores.", alt: "Cámara de seguridad tipo bullet", pos: "50% 50%", zoom: 2.9, origin: "27% 55%" },
  { title: "Cámara PTZ", desc: "Motorizada con zoom óptico 20x. Control remoto de pan, tilt y zoom.", alt: "Cámara de seguridad motorizada PTZ", pos: "50% 50%", zoom: 4.2, origin: "84% 62%" },
];

const BRANDS = [
  {
    name: "HIKVISION",
    desc: "La marca nº1 en videovigilancia mundial. Cámaras con IA integrada, grabación 4K y compresión H.265+.",
    specs: ["Resolución 4K Ultra HD – 8MP", "Compresión inteligente H.265+", "Análisis de comportamiento IA", "App iVMS-4500 profesional"],
  },
  {
    name: "DAHUA",
    desc: "Tecnología de alta gama con IA avanzada. Reconocimiento facial, detección perimetral y full-color nocturno.",
    specs: ["Reconocimiento facial IA", "Detección perimetral activa", "Visión nocturna Full Color", "App DMSS multidispositivo"],
  },
];

const BENEFITS = [
  { icon: Shield, title: "Sin cuotas mensuales", desc: "Pago único, sin permanencia ni sorpresas" },
  { icon: CheckCircle, title: "Instalación incluida", desc: "Técnicos certificados, sin obras ni roturas" },
  { icon: Clock, title: "Garantía 3 años", desc: "Garantía de 3 años en todos los productos, con soporte técnico incluido" },
  { icon: Smartphone, title: "Respuesta en 24h", desc: "Presupuesto y visita en menos de un día" },
];

export default function CameraCityTemplate({ city, seoTitle, seoDescription, seoPath, intro, faqs }) {
  const { openDrawer } = useLeadDrawer();
  const [activeTab, setActiveTab] = useState(0);
  const openQuote = () => openDrawer(`Cámaras de seguridad en ${city}`);

  const defaultFaqs = [
    {
      q: `¿Cuánto cuesta instalar cámaras de seguridad en ${city}?`,
      a: `El precio depende del número de cámaras, tipo y ubicación. En Premium Tech Security ofrecemos presupuesto gratuito sin compromiso. Consulta nuestros kits de instalación desde 689€ (IVA no incluido) con instalación y grabador incluidos, sin cuotas mensuales.`,
    },
    {
      q: `¿Qué marcas de cámaras instaláis en ${city}?`,
      a: `Trabajamos con las mejores marcas del mercado: Hikvision y Dahua, líderes mundiales en videovigilancia. Todas nuestras cámaras son de resolución mínima 4MPx (2K), con visión nocturna en color y resistencia IP66 para exteriores.`,
    },
    {
      q: `¿Las cámaras necesitan conexión a internet para funcionar?`,
      a: `No es obligatorio. Instalamos grabadores NVR con disco duro local para que el sistema funcione sin internet y sin depender de la nube. La visualización remota desde el móvil sí requiere conexión, pero la grabación continúa aunque falle el internet.`,
    },
    {
      q: `¿Cuántos días de grabación almacena el sistema?`,
      a: `Depende del número de cámaras y la capacidad del disco. Un disco de 1TB con 2 cámaras graba aproximadamente 15-20 días continuos. Con discos de 4TB y 8 cámaras, entre 7 y 10 días en grabación continua 24/7.`,
    },
    {
      q: `¿Cuánto tarda la instalación en ${city}?`,
      a: `La mayoría de instalaciones domésticas (2-4 cámaras) se completan en unas pocas horas en un solo día. Para negocios y comunidades con 8 o más cámaras puede requerir 1-2 días. Trabajamos de manera limpia y ordenada.`,
    },
    {
      q: `¿Cumplen con el RGPD las cámaras de seguridad?`,
      a: `Sí. Nos encargamos de toda la tramitación: señalética homologada, configuración correcta de ángulo de visión (solo zona privada), documentación RGPD y registro si procede. Para comunidades de vecinos incluimos la documentación completa para la junta.`,
    },
    {
      q: `¿Puedo ver las cámaras desde el móvil en tiempo real?`,
      a: `Sí. Instalamos la app correspondiente a la marca (iVMS-4500 para Hikvision, DMSS para Dahua) con acceso remoto desde cualquier lugar. Streaming en tiempo real, reproducción de grabaciones y alertas push incluidas, sin coste adicional.`,
    },
    {
      q: `¿Es mejor un grabador propio o una cámara con cuota mensual?`,
      a: `Con un grabador propio (NVR) las imágenes se guardan en un disco duro en tu casa o negocio y no pagas cuotas por almacenarlas. Los servicios en la nube cobran una cuota mensual por guardar las imágenes. En Premium Tech Security instalamos grabador local y la visualización desde el móvil sin coste adicional.`,
    },
    {
      q: `¿Instaláis cámaras en comunidades de vecinos?`,
      a: `Sí. Para comunidades instalamos cámaras en portal, garaje y zonas comunes, e incluimos la documentación RGPD completa y la señalética homologada.`,
    },
    {
      q: `¿Instaláis cámaras fuera de ${city}?`,
      a: `Sí. Instalamos en Barcelona y su área metropolitana y en el resto de Catalunya: Girona, Tarragona, Lleida, Sabadell y más. Pide presupuesto y te confirmamos la zona.`,
    },
    {
      q: `¿Necesito hacer obras para instalar las cámaras?`,
      a: `Las cámaras exteriores requieren soporte y cable de red (PoE) para máxima fiabilidad. Para interiores también disponemos de cámaras IP por WiFi que no requieren obra ni cableado.`,
    },
  ];

  const faqList = faqs || defaultFaqs;

  return (
    <div className="min-h-screen bg-white pb-32">
      <AdvancedSEO
        title={seoTitle || `Cámaras de Seguridad en ${city} | Sin Cuotas | Premium Tech`}
        description={seoDescription || `Instalamos cámaras de seguridad en ${city}. Hikvision y Dahua. 4K HD. Sin cuotas mensuales. Presupuesto gratis en 24h. Llama al 638 10 99 47.`}
        keywords={`cámaras seguridad ${city}, instalación cámaras ${city}, videovigilancia ${city}, CCTV ${city}`}
        canonicalUrl={`https://alarmasenbarcelona.com${seoPath}`}
        includeLocalBusiness={city === "Barcelona"}
        serviceArea={city}
      />
      <Navbar />

      {/* Breadcrumb fuera del hero de altura fija (70vh) para no arriesgar overflow.
          El padding superior deja sitio a la cabecera fija (80px): sin él
          la miga de pan quedaba debajo del logo, solapada. */}
      <div style={{ backgroundColor: "#0A0A1A", padding: "96px 20px 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Breadcrumbs items={[{ label: "Cámaras", href: "/camaras-barcelona" }, { label: city }]} />
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ position: "relative", width: "100%", overflow: "hidden", height: "70vh", maxHeight: "70vh", backgroundColor: "#0A0A1A", paddingTop: 0 }}>
        <img
          src="/images/camara-domo.jpeg"
          alt={`Cámara de seguridad domo instalada en una vivienda de ${city}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "78% 35%", opacity: 0.92 }}
        />
        {/* Degradado: deja la cámara bien visible arriba y oscurece la parte
            baja, donde va el texto, para que se lea. */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0A0A1A 24%, rgba(10,10,26,0.88) 47%, rgba(10,10,26,0.12) 74%, rgba(10,10,26,0) 100%)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 800, margin: "0 auto", padding: "0 20px", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", paddingBottom: 48, paddingTop: 80 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(10,10,26,0.78)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", border: "1px solid rgba(229,62,62,0.35)", borderRadius: 20, padding: "5px 14px", color: "#F87171", fontSize: 11, fontWeight: 700, letterSpacing: 1, width: "fit-content", marginBottom: 16 }}>
            <span style={{ width: 7, height: 7, backgroundColor: "#E53E3E", borderRadius: "50%", display: "inline-block" }} />
            INSTALACIÓN PROFESIONAL EN {city.toUpperCase()}
          </span>
          <h1 style={{ fontWeight: 900, fontSize: "clamp(26px, 5vw, 46px)", color: "#fff", lineHeight: 1.15, margin: "0 0 12px" }}>
            Instalación de Cámaras de Seguridad en <span style={{ color: "#E53E3E" }}>{city}</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 16, lineHeight: 1.7, margin: "0 0 24px", maxWidth: 560 }}>
            {intro || `Videovigilancia HD 4K para hogar, negocio y comunidades. Sin cuotas mensuales. Grabador local incluido. Presupuesto gratis en 24h.`}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 380 }}>
            <button onClick={() => openQuote()} style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "15px 24px", border: "none", cursor: "pointer" }}>
              Solicitar presupuesto de cámaras →
            </button>
            <a href="tel:+34638109947" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 50, padding: "13px 24px", textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              📞 Llamar
            </a>
          </div>
        </div>
      </section>

      {/* ── KITS DE CÁMARAS ── */}
      <CameraKitsGrid city={city} onRequestQuote={(kit) => (kit?.title ? openDrawer(`${kit.title} (${kit.cameras}) — cámaras en ${city}`) : openQuote())} />

      {/* ── TODO LO QUE INSTALAMOS — fotos de los 3 tipos + lista limpia ── */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 8px" }}>Todo lo que instalamos</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Desde una cámara hasta instalaciones profesionales completas — con o sin grabador, con o sin internet</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ marginBottom: 36 }}>
            {CAMERA_TYPES.map((t) => (
              <figure key={t.title} style={{ margin: 0, borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }}>
                <div style={{ position: "relative", height: 170, overflow: "hidden", background: "#0A0A1A" }}>
                  <img
                    src="/images/camaras-variedad-exterior.webp"
                    alt={t.alt}
                    loading="lazy"
                    decoding="async"
                    style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: t.pos, transform: `scale(${t.zoom})`, transformOrigin: t.origin }}
                  />
                </div>
                <figcaption style={{ padding: "14px 16px 16px" }}>
                  <h3 style={{ fontWeight: 800, fontSize: 15, color: "#0A0A1A", margin: "0 0 4px" }}>{t.title}</h3>
                  <p style={{ fontSize: 12.5, color: "#6B7280", lineHeight: 1.55, margin: 0 }}>{t.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <dl className="grid sm:grid-cols-2" style={{ margin: 0, columnGap: 40 }}>
            {WHAT_WE_DO.slice(3).map((s) => (
              <div key={s.title} style={{ padding: "14px 0", borderBottom: "1px solid #E5E7EB" }}>
                <dt style={{ fontWeight: 800, fontSize: 14, color: "#0A0A1A" }}>{s.title}</dt>
                <dd style={{ margin: "3px 0 0", fontSize: 13, color: "#6B7280", lineHeight: 1.55 }}>{s.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── MARCAS ── */}
      <section style={{ backgroundColor: "#fff", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 8px" }}>Marcas que instalamos en {city}</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Trabajamos solo con líderes mundiales en videovigilancia IP</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {BRANDS.map((b) => (
              <div key={b.name} style={{ backgroundColor: "#F8F9FA", border: "1px solid #E5E7EB", borderRadius: 16, padding: 28 }}>
                <h3 style={{ fontWeight: 900, fontSize: 18, color: "#E53E3E", letterSpacing: 1, margin: "0 0 10px" }}>{b.name}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, margin: "0 0 16px" }}>{b.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {b.specs.map((s) => (
                    <div key={s} style={{ fontSize: 13, color: "#374151", display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "#E53E3E", fontWeight: 700, flexShrink: 0 }}>✓</span>{s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERIOR CAMERA IMAGE ── */}
      <section style={{ backgroundColor: "#0A0A1A", padding: "40px 20px 0" }}>
        <div className="max-w-4xl mx-auto">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 20, padding: "5px 14px", color: "#F87171", fontSize: 11, fontWeight: 700, letterSpacing: 1, width: "fit-content" }}>
              INSTALACIÓN EN INTERIORES Y EXTERIORES
            </span>
            <h2 style={{ fontWeight: 900, fontSize: 24, color: "#fff", margin: 0 }}>Vigilancia total, día y noche</h2>
            <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.7, margin: 0, maxWidth: 540 }}>
              Cámaras domo de última generación con visión nocturna en color. Cobertura completa de portales, pasillos, ascensores, garajes y zonas comunes. Imagen nítida en cualquier condición de luz.
            </p>
          </div>
          <img
            src="/images/camara-domo-pasillo.jpeg"
            alt="Cámara domo de seguridad instalada en pasillo de comunidad"
            loading="lazy"
            decoding="async"
            style={{ width: "100%", borderRadius: "20px 20px 0 0", marginTop: 24, display: "block", maxHeight: 320, objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </section>

      {/* ── SERVICE CARDS (Animated Tabs) ── */}
      <section style={{ backgroundColor: "#fff", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 8px" }}>Soluciones de Videovigilancia en {city}</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Instalación profesional adaptada a tu espacio — hogar, negocio o comunidad</p>

          {/* Tab bar */}
          <div style={{ display: "flex", gap: 4, background: "#F1F5F9", borderRadius: 100, padding: 5, marginBottom: 28, position: "relative" }}>
            {SERVICES.map((s, idx) => (
              <button
                key={s.num}
                onClick={() => setActiveTab(idx)}
                style={{
                  position: "relative", flex: 1, padding: "11px 12px", border: "none",
                  background: "transparent", cursor: "pointer", borderRadius: 100,
                  fontSize: 13, fontWeight: 700, zIndex: 2,
                  color: activeTab === idx ? "#fff" : "#475569",
                  transition: "color 0.25s ease",
                }}
              >
                {activeTab === idx && (
                  <motion.div
                    layoutId="camera-tab-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    style={{ position: "absolute", inset: 0, background: "#E53E3E", borderRadius: 100, zIndex: -1 }}
                  />
                )}
                {s.title}
              </button>
            ))}
          </div>

          {/* Animated tab content */}
          <div style={{ minHeight: 260 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                style={{ backgroundColor: "#F8F9FA", borderRadius: 16, padding: 28, border: "1px solid #E5E7EB" }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#E53E3E", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <span style={{ color: "#fff", fontWeight: 900, fontSize: 13 }}>{SERVICES[activeTab].num}</span>
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 18, color: "#0A0A1A", margin: "0 0 10px" }}>{SERVICES[activeTab].title}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, margin: "0 0 16px" }}>{SERVICES[activeTab].desc}</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {SERVICES[activeTab].features.map((f) => (
                    <div key={f} style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "#E53E3E", fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button onClick={() => openQuote()} style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "14px 32px", border: "none", cursor: "pointer" }}>
              Ver precios y solicitar presupuesto →
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY US — foto + razones en lista, sin iconos en cuadrados ── */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2" style={{ gap: 32, alignItems: "center" }}>
          <img
            src="/images/camara-domo-pasillo.jpeg"
            alt={`Cámara domo de seguridad instalada en un portal de ${city}`}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: 300, objectFit: "cover", objectPosition: "75% center", borderRadius: 18, display: "block", boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
          />
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 20px" }}>¿Por qué elegirnos en {city}?</h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {BENEFITS.map((b) => (
                <li key={b.title} style={{ padding: "12px 0 12px 16px", borderLeft: "3px solid #E53E3E", marginBottom: 10, background: "#fff", borderRadius: "0 10px 10px 0" }}>
                  <h3 style={{ fontWeight: 800, fontSize: 15, color: "#0A0A1A", margin: "0 0 2px" }}>{b.title}</h3>
                  <p style={{ fontSize: 13, color: "#6B7280", margin: 0, lineHeight: 1.5 }}>{b.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CameraLocalSections city={city} currentPath={seoPath} onRequestQuote={() => openQuote()} />

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: "#fff", padding: "56px 20px" }}>
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 8px" }}>Preguntas Frecuentes — Cámaras en {city}</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Todo lo que necesitas saber antes de instalar cámaras</p>
          <Accordion type="single" collapsible className="space-y-2">
            {faqList.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-[#F8F9FA] rounded-xl border border-gray-200 px-5 overflow-hidden">
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

      {/* ── FINAL CTA ── */}
      <section style={{ background: "linear-gradient(135deg, #E53E3E 0%, #C53030 100%)", padding: "48px 20px" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#fff", margin: "0 0 8px" }}>¿Necesitas Cámaras de Seguridad en {city}?</h2>
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 15, margin: "0 0 28px" }}>Presupuesto gratuito · Instalación incluida · Sin cuotas mensuales</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={() => openQuote()} style={{ backgroundColor: "#fff", color: "#E53E3E", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: 18, border: "none", cursor: "pointer" }}>
              Solicitar presupuesto de cámaras →
            </button>
            <a href="tel:+34638109947" style={{ border: "2px solid rgba(255,255,255,0.5)", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: 16, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "transparent" }}>
              📞 Llamar
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
