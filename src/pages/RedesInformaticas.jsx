import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, ArrowRight, Building2, Briefcase, Store, Home, Wifi, Cable, Server, Router, Settings2, TrendingUp, Network } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ChatWidget from "../components/chatbot/ChatWidget";
import ContactForm from "../components/landing/ContactForm";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import Breadcrumbs from "../components/landing/Breadcrumbs";
import { createPageUrl } from "@/utils";

export default function RedesInformaticas() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const soluciones = [
    { Icon: Building2, title: "Redes para empresas", desc: "Infraestructura de red completa para oficinas y empresas" },
    { Icon: Briefcase, title: "Redes para oficinas", desc: "Cableado y conectividad para espacios de trabajo" },
    { Icon: Store, title: "Redes para negocios", desc: "Conectividad fiable para comercios y locales" },
    { Icon: Home, title: "Redes para viviendas", desc: "Cableado y WiFi profesional para el hogar" },
  ];

  const componentes = [
    { Icon: Wifi, title: "WiFi profesional", desc: "Puntos de acceso de uso profesional con cobertura completa del espacio" },
    { Icon: Cable, title: "Cableado estructurado", desc: "Instalación de cableado Ethernet normalizado y ordenado" },
    { Icon: Server, title: "Racks y electrónica de red", desc: "Armarios rack, switches y routers correctamente instalados" },
    { Icon: Router, title: "Puntos de acceso", desc: "Distribución de puntos de red y WiFi según las necesidades del espacio" },
    { Icon: Settings2, title: "Configuración de red", desc: "Puesta en marcha y configuración de todos los equipos instalados" },
    { Icon: TrendingUp, title: "Ampliación de redes", desc: "Ampliamos redes existentes sin necesidad de rehacer la instalación" },
  ];

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060e1a", paddingBottom: 70 }}>
      <AdvancedSEO
        title="Redes Informáticas en Barcelona | Cableado e Instalación de Red | Premium Tech Security"
        description="Instalación de redes informáticas en Barcelona: cableado estructurado, WiFi profesional, switches y racks para empresas, oficinas y viviendas. Presupuesto gratis 638 10 99 47."
        canonicalUrl="https://alarmasenbarcelona.com/redes-informaticas"
        keywords="redes informáticas Barcelona, instalación de redes Barcelona, cableado estructurado Barcelona, WiFi profesional Barcelona, redes para empresas"
        schema={{
          "@type": "Service",
          "name": "Instalación de Redes Informáticas",
          "serviceType": "Cableado estructurado, WiFi profesional e infraestructura de red",
          "provider": { "@type": "LocalBusiness", "name": "Premium Tech Security" },
          "areaServed": "Barcelona, Catalunya"
        }}
      />
      <Navbar />

      <section style={{ position: "relative", overflow: "hidden" }} className="text-white pt-28 pb-16 lg:pt-32 lg:pb-24">
        <img
          src="/images/redes-rack-cableado-estructurado.webp"
          alt="Rack de comunicaciones con cableado estructurado"
          loading="eager"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(26,42,58,0.88) 100%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: "relative", zIndex: 2 }}>
          <Link to={createPageUrl("Home")} className="inline-flex items-center gap-2 text-[#E63946] hover:text-[#d32f3c] mb-6 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Volver a inicio
          </Link>
          <div className="mb-6">
            <Breadcrumbs items={[{ label: "Servicios" }, { label: "Redes Informáticas" }]} />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Redes Informáticas en Barcelona</h1>
          <p className="text-xl text-gray-300 max-w-2xl">Instalación de redes, cableado estructurado y WiFi profesional para empresas, oficinas, negocios y viviendas.</p>
        </div>
      </section>

      <section style={{ padding: "80px 0 112px", background: "#060e1a" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 48, textAlign: "center" }}>
              Soluciones de red para cada espacio
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {soluciones.map((s, idx) => (
                <div key={idx} className="magic-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28, transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: "rgba(229,62,62,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <s.Icon size={22} color="#E63946" />
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: "#94A3B8", fontSize: 14 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 48, marginBottom: 80 }}>
            <h2 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#FFFFFF", marginBottom: 16, textAlign: "center" }}>
              Infraestructura de red profesional
            </h2>
            <p style={{ color: "#94A3B8", textAlign: "center", maxWidth: 680, margin: "0 auto 32px", lineHeight: 1.7 }}>
              Diseñamos e instalamos la infraestructura de red necesaria para que tu empresa, oficina o vivienda tenga conectividad estable y ordenada, con cableado normalizado y equipos correctamente configurados.
            </p>
            <img
              src="/images/redes-switch-profesional.webp"
              alt="Instalación profesional de red informática y cableado"
              loading="lazy"
              style={{ width: "100%", maxHeight: 280, objectFit: "cover", objectPosition: "center", borderRadius: 14, display: "block", marginBottom: 40 }}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {componentes.map((c, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(229,62,62,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <c.Icon size={20} color="#E63946" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 4 }}>{c.title}</h3>
                    <p style={{ color: "#94A3B8", fontSize: 14 }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 80, textAlign: "center" }}>
            <p style={{ color: "#94A3B8", fontSize: 14 }}>
              ¿Vas a instalar <Link to="/camaras-barcelona" style={{ color: "#E63946", fontWeight: 700 }}>cámaras IP</Link> u otros sistemas conectados? Una buena red es la base de todo. También puedes consultar nuestra página de{" "}
              <Link to="/sonorizacion" style={{ color: "#E63946", fontWeight: 700 }}>sonorización</Link> si necesitas distribuir audio en red.
            </p>
          </div>

          <style>{`
            .magic-card:hover { transform: translateY(-6px); border-color: rgba(229,62,62,0.55); box-shadow: 0 20px 48px rgba(229,62,62,0.18); }
          `}</style>

          <div className="text-center bg-gradient-to-r from-[#E63946] to-[#d32f3c] text-white rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-black mb-4 flex items-center justify-center gap-3">
              <Network className="w-8 h-8" />
              Infraestructura de red profesional
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Consulta gratuita sin compromiso. Diseñamos la red adecuada para tu empresa, oficina o vivienda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToContact}
                className="bg-white text-[#E63946] hover:bg-gray-100 px-8 py-6 rounded-lg font-bold flex items-center justify-center gap-2"
              >
                Solicitar presupuesto de red
                <ArrowRight className="w-5 h-5" />
              </Button>
              <a
                href="tel:+34638109947"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-6 rounded-lg font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Llamar
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id="contacto" style={{ background: "#0a1120", padding: "80px 0 112px" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 16 }}>
              Solicita presupuesto de red
            </h2>
            <p style={{ color: "#94A3B8", fontSize: "1.125rem", maxWidth: 640, margin: "0 auto" }}>
              Cuéntanos tu proyecto y te diseñaremos la mejor solución de red. Presupuesto personalizado sin compromiso.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>

      <FooterSection />
      <ChatWidget />
    </div>
  );
}
