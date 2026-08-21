import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, ArrowRight, KeyRound, Plug, ShieldCheck, BatteryCharging, Smartphone, Building2, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ChatWidget from "../components/chatbot/ChatWidget";
import ContactForm from "../components/landing/ContactForm";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import Breadcrumbs from "../components/landing/Breadcrumbs";
import { createPageUrl } from "@/utils";

export default function Cerraduras() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const tipos = [
    { Icon: KeyRound, title: "Cerraduras inteligentes", desc: "Sistemas de apertura electrónica para vivienda y negocio" },
    { Icon: Plug, title: "Cerraduras electrónicas", desc: "Cerraduras con apertura eléctrica para puertas de viviendas y negocios" },
    { Icon: ShieldCheck, title: "Cilindros de seguridad", desc: "Cilindros de alta seguridad para puertas de acceso" },
    { Icon: BatteryCharging, title: "Cilindros electrónicos", desc: "Apertura electrónica sin necesidad de llave física" },
    { Icon: Smartphone, title: "Apertura mediante móvil", desc: "Abre tu puerta desde el smartphone, sin llave física" },
    { Icon: Building2, title: "Soluciones para negocios", desc: "Sistemas de cierre para locales, oficinas y comunidades" },
  ];

  const espacios = [
    { title: "Viviendas", desc: "Sustitución y mejora de cerraduras en puertas de acceso al hogar" },
    { title: "Negocios", desc: "Sistemas de cierre y apertura para locales comerciales" },
    { title: "Apartamentos", desc: "Soluciones de acceso para pisos y alquiler de corta estancia" },
    { title: "Oficinas", desc: "Control de apertura en despachos y áreas de trabajo" },
  ];

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060e1a", paddingBottom: 70 }}>
      <AdvancedSEO
        title="Cerraduras Inteligentes y Electrónicas en Barcelona | Premium Tech Security"
        description="Instalación de cerraduras inteligentes, cilindros de seguridad y cilindros electrónicos en Barcelona para viviendas, negocios y oficinas. Presupuesto gratis 638 10 99 47."
        canonicalUrl="https://alarmasenbarcelona.com/cerraduras"
        keywords="cerraduras inteligentes Barcelona, cerraduras electrónicas Barcelona, cilindros de seguridad Barcelona, cerradura electrónica negocio"
        schema={{
          "@type": "Service",
          "name": "Cerraduras Inteligentes y Electrónicas",
          "serviceType": "Instalación de cerraduras inteligentes y cilindros de seguridad",
          "provider": { "@type": "LocalBusiness", "name": "Premium Tech Security" },
          "areaServed": "Barcelona, Catalunya"
        }}
      />
      <Navbar />

      <section style={{ position: "relative", overflow: "hidden" }} className="text-white pt-28 pb-16 lg:pt-32 lg:pb-24">
        <img
          src="/images/cerradura-inteligente.webp"
          alt="Cerradura inteligente con lector de huella instalada en puerta"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.4 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(26,42,58,0.88) 100%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: "relative", zIndex: 2 }}>
          <Link to={createPageUrl("Home")} className="inline-flex items-center gap-2 text-[#E63946] hover:text-[#d32f3c] mb-6 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Volver a inicio
          </Link>
          <div className="mb-6">
            <Breadcrumbs items={[{ label: "Servicios" }, { label: "Cerraduras" }]} />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Cerraduras Inteligentes y Electrónicas</h1>
          <p className="text-xl text-gray-300 max-w-2xl">Cerraduras electrónicas, cilindros de seguridad y sistemas de apertura para viviendas, negocios y oficinas en Barcelona.</p>
        </div>
      </section>

      <section style={{ padding: "80px 0 112px", background: "#060e1a" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 48, textAlign: "center" }}>
              Tipos de cerradura que instalamos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tipos.map((t, idx) => (
                <div key={idx} className="magic-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 32, transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(229,62,62,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <t.Icon size={24} color="#E63946" />
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{t.title}</h3>
                  <p style={{ color: "#94A3B8" }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 48, marginBottom: 80 }}>
            <h2 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#FFFFFF", marginBottom: 48, textAlign: "center" }}>
              Soluciones según tu espacio
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {espacios.map((e, idx) => (
                <div key={idx} className="magic-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 24, transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{e.title}</h3>
                  <p style={{ color: "#94A3B8" }}>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 80, textAlign: "center" }}>
            <p style={{ color: "#94A3B8", fontSize: 14 }}>
              ¿Necesitas gestionar el acceso de varias personas con tarjetas, códigos o lectores biométricos? Eso lo resuelve nuestra página de{" "}
              <Link to="/control-accesos" style={{ color: "#E63946", fontWeight: 700 }}>control de accesos</Link>.
            </p>
          </div>

          <style>{`
            .magic-card:hover { transform: translateY(-6px); border-color: rgba(229,62,62,0.55); box-shadow: 0 20px 48px rgba(229,62,62,0.18); }
          `}</style>

          <div className="text-center bg-gradient-to-r from-[#E63946] to-[#d32f3c] text-white rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-black mb-4 flex items-center justify-center gap-3">
              <LockKeyhole className="w-8 h-8" />
              Cerraduras inteligentes para tu vivienda o negocio
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Consulta gratuita sin compromiso. Te ayudamos a elegir la solución de cierre adecuada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToContact}
                className="bg-white text-[#E63946] hover:bg-gray-100 px-8 py-6 rounded-lg font-bold flex items-center justify-center gap-2"
              >
                Consultar solución
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
              Consulta tu solución de cerradura
            </h2>
            <p style={{ color: "#94A3B8", fontSize: "1.125rem", maxWidth: 640, margin: "0 auto" }}>
              Cuéntanos tu proyecto y te asesoramos sobre la mejor opción. Presupuesto personalizado sin compromiso.
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
