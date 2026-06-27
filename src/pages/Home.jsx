import React, { useState } from "react";
import Navbar from "../components/landing/Navbar";
import HeroProf from "../components/landing/HeroProf";
import FooterSection from "../components/landing/FooterSection";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import HomeServicesGrid from "../components/landing/HomeServicesGrid";
import HomeCamerasBlock from "../components/landing/HomeCamerasBlock";
import HomeAlarmsBlock from "../components/landing/HomeAlarmsBlock";
import HomeAccessBlock from "../components/landing/HomeAccessBlock";
import HomeSeoLocal from "../components/landing/HomeSeoLocal";
import PromoAccordion from "../components/landing/PromoAccordion";
import GoogleReviews from "../components/landing/GoogleReviews";
import HomeVideoporterosTeaser from "../components/landing/HomeVideoporterosTeaser";
import HomeTrustSection from "../components/landing/HomeTrustSection";
import PresupuestoModal from "../components/landing/PresupuestoModal";

const CAMERA_PROMOS = [
  {
    header: "📦 Kit 2 Cámaras · Ideal Hogar",
    oldPrice: "690€", price: "449€", savings: "241€",
    features: ["2 Cámaras HD 4MPx (2K) exterior/interior", "Grabador NVR local con disco 1TB", "Visión nocturna en color", "App móvil iOS/Android incluida", "Instalación profesional incluida", "Garantía de por vida", "Sin cuotas mensuales"],
    ctaText: "💬 WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20reservar%20el%20Kit%202%20Cámaras%20por%20449€",
  },
  {
    header: "🏆 Kit 4 Cámaras · Más Vendido", badge: "MÁS VENDIDO",
    oldPrice: "1.190€", price: "699€", savings: "491€",
    features: ["4 Cámaras HD 4MPx (2K) exterior/interior", "Grabador NVR 4 canales con disco 2TB", "Detección por IA (personas y vehículos)", "Visión nocturna en color 30m", "App móvil iOS/Android incluida", "Instalación profesional en 1 día", "Garantía de por vida", "Sin cuotas mensuales"],
    ctaText: "💬 WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20reservar%20el%20Kit%204%20Cámaras%20por%20699€",
  },
  {
    header: "🏭 Kit 8 Cámaras · Negocio/Comunidad",
    oldPrice: "1.990€", price: "1.199€", savings: "791€",
    features: ["8 Cámaras 4K Ultra HD exterior/interior", "Grabador NVR 8 canales con disco 4TB", "IA detección avanzada de intrusos", "Reconocimiento de matrículas opcional", "Visión nocturna en color 40m", "App móvil multiusuario", "Instalación profesional 1-2 días", "Garantía de por vida", "Sin cuotas mensuales"],
    ctaText: "💬 WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20reservar%20el%20Kit%208%20Cámaras%20por%201.199€",
  },
];

const ALARM_PROMOS = [
  {
    header: "🏠 Kit Alarma Hogar Avanzado",
    oldPrice: "590€", price: "349€", savings: "241€",
    features: ["Central de alarma Ajax Hub 2", "2 detectores de movimiento PIR", "1 detector de apertura puerta/ventana", "Sirena exterior disuasoria", "Conexión a Central Receptora 24/7", "App móvil control total", "Instalación profesional incluida", "Sin cuotas de mantenimiento obligatorias"],
    ctaText: "💬 WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20el%20Kit%20Alarma%20Hogar%20Avanzado%20por%20349€",
  },
  {
    header: "🏢 Kit Alarma Negocio/Oficina · Más Vendido", badge: "MÁS VENDIDO",
    oldPrice: "990€", price: "599€", savings: "391€",
    features: ["Central Ajax Hub 2 Plus (4G + WiFi + Ethernet)", "4 detectores de movimiento con cámara integrada (fotoverificación)", "2 detectores apertura puertas/ventanas", "Sirena interior + exterior certificada grado 2", "Detector de rotura de cristales", "Conexión a Central Receptora 24/7", "App multidispositivo para todo el equipo", "Instalación profesional en 1 día", "Garantía de por vida en equipos"],
    ctaText: "💬 WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20el%20Kit%20Alarma%20Negocio%20por%20599€",
  },
  {
    header: "🏘️ Kit Alarma Comunidad / Gran Empresa",
    oldPrice: "1.490€", price: "899€", savings: "591€",
    features: ["Central Ajax Hub 3 de máxima capacidad", "8 detectores PIR avanzados", "4 aperturas zonas comunes", "2 sirenas exteriores certificadas grado 2", "Control de accesos integrado", "Conexión a Central Receptora con verificación visual", "App multiadministrador comunidad", "Instalación profesional 1-2 días", "Cumplimiento normativa RGPD incluido", "Garantía de por vida en equipos"],
    ctaText: "💬 WhatsApp", ctaHref: "https://wa.me/34638109947?text=Hola,%20quiero%20el%20Kit%20Alarma%20Comunidad%20por%20899€",
  },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white" style={{ paddingBottom: 70 }}>
      <AdvancedSEO
        title="Instalación Cámaras de Seguridad y Alarmas Barcelona | Premium Tech Security"
        description="Especialistas en instalación de cámaras de seguridad y alarmas en Barcelona y toda Catalunya. Hikvision, Dahua, Ajax. Sin cuotas. Presupuesto gratis 638 10 99 47."
        keywords="instalación cámaras seguridad Barcelona, cámaras vigilancia Barcelona, videovigilancia Barcelona, instalador cámaras Barcelona"
        canonicalUrl="https://alarmasenbarcelona.com"
      />
      <Navbar />
      <main>
        <HeroProf onOpenModal={() => setModalOpen(true)} />

        {/* Section A — Services Grid */}
        <HomeServicesGrid />

        {/* Cameras feature image + CTA */}
        <div style={{ padding: "0 20px" }}>
          <div className="max-w-2xl mx-auto">
            <img src="https://media.base44.com/images/public/6995a701232755a2d5e24b39/95a4d8b80_IMG_8649.png" alt="Cámaras de seguridad con app móvil" className="w-full h-60 object-cover rounded-2xl" />
          </div>
        </div>
        <HomeCamerasBlock onOpenModal={() => setModalOpen(true)} />
        <PromoAccordion bg="linear-gradient(135deg, #1a1a2e, #0A0A1A)" title="¡Aprovecha nuestras Promociones en Cámaras!" urgencyLine1="OFERTA ESTA SEMANA — ÚLTIMAS PLAZAS" urgencyLine2="Promociones a punto de caducar · Instalación garantizada" items={CAMERA_PROMOS} footerText="⏱️ Oferta válida hasta el domingo · Plazas limitadas" />

        <GoogleReviews />

        <HomeAlarmsBlock onOpenModal={() => setModalOpen(true)} />
        <PromoAccordion bg="#111827" title="¡Aprovecha nuestras Promociones en Alarmas!" urgencyLine1="PROMOCIONES EN ALARMAS — ESTA SEMANA" urgencyLine2="Oferta exclusiva · Stock limitado · Instalación inmediata" items={ALARM_PROMOS} footerText="⏱️ Oferta válida esta semana · Instalación garantizada en 48h" />

        {/* Trust Section */}
        <HomeTrustSection />

        <HomeVideoporterosTeaser />
        <HomeAccessBlock onOpenModal={() => setModalOpen(true)} />
        <HomeSeoLocal />
      </main>
      <FooterSection />
      <PresupuestoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}