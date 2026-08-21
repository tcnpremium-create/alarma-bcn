import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, ArrowRight, Store, UtensilsCrossed, Building2, Users, PartyPopper, Factory, Volume2, SlidersHorizontal, Layers, Mic, Radio, Settings2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ChatWidget from "../components/chatbot/ChatWidget";
import ContactForm from "../components/landing/ContactForm";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import Breadcrumbs from "../components/landing/Breadcrumbs";
import { createPageUrl } from "@/utils";

export default function Sonorizacion() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const necesidades = [
    { Icon: Store, title: "Negocio", desc: "Ambientación sonora para tiendas y comercios" },
    { Icon: UtensilsCrossed, title: "Restaurante", desc: "Sonido ambiental discreto en sala y terraza" },
    { Icon: Building2, title: "Oficina", desc: "Megafonía y sonido para espacios de trabajo" },
    { Icon: Users, title: "Comunidad", desc: "Sonorización de zonas comunes y exteriores" },
    { Icon: PartyPopper, title: "Evento", desc: "Sistemas de sonido para actos y celebraciones" },
    { Icon: Factory, title: "Nave / Empresa", desc: "Megafonía industrial y sistemas multizona" },
  ];

  const componentes = [
    { Icon: Volume2, title: "Altavoces", desc: "De techo, de pared, profesionales, para interior y exterior" },
    { Icon: SlidersHorizontal, title: "Amplificadores", desc: "De instalación, multizona y para sistemas distribuidos" },
    { Icon: Layers, title: "Mezcladores", desc: "Para gestionar varias fuentes de audio en un mismo sistema" },
    { Icon: Mic, title: "Micrófonos", desc: "Para megafonía, avisos y locución en directo" },
    { Icon: Radio, title: "Sistemas multizona", desc: "Control de volumen y fuente independiente por zona" },
    { Icon: Settings2, title: "Controladores", desc: "Gestión centralizada del sistema de sonido instalado" },
  ];

  const proceso = [
    { num: "01", title: "Estudio del espacio", desc: "Analizamos las dimensiones, acústica y uso real del local o zona a sonorizar." },
    { num: "02", title: "Diseño del sistema", desc: "Planteamos la distribución de altavoces y equipos según el espacio y el objetivo sonoro." },
    { num: "03", title: "Selección de equipos", desc: "Elegimos los altavoces, amplificadores y controladores adecuados a cada proyecto." },
    { num: "04", title: "Instalación", desc: "Montaje profesional del cableado, altavoces y electrónica del sistema." },
    { num: "05", title: "Configuración", desc: "Ajuste de zonas, volúmenes y fuentes de audio del sistema instalado." },
    { num: "06", title: "Pruebas", desc: "Verificación final de cobertura y calidad de sonido en todo el espacio." },
  ];

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060e1a", paddingBottom: 70 }}>
      <AdvancedSEO
        title="Sonorización Profesional en Barcelona | Instalación de Sonido | Premium Tech Security"
        description="Instalación de sistemas de sonido profesional para negocios, locales, comunidades y eventos en Barcelona. Altavoces, amplificadores y sistemas multizona. Presupuesto gratis 638 10 99 47."
        canonicalUrl="https://alarmasenbarcelona.com/sonorizacion"
        keywords="sonorización Barcelona, instalación de sonido Barcelona, sonorización profesional, altavoces techo Barcelona, megafonía Barcelona, sonido ambiental negocios"
        schema={{
          "@type": "Service",
          "name": "Sonorización Profesional",
          "serviceType": "Instalación de sistemas de sonido para negocios, comunidades y eventos",
          "provider": { "@type": "LocalBusiness", "name": "Premium Tech Security" },
          "areaServed": "Barcelona, Catalunya"
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1628] to-[#1a2a3a] text-white pt-28 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link to={createPageUrl("Home")} className="inline-flex items-center gap-2 text-[#E63946] hover:text-[#d32f3c] mb-6 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Volver a inicio
          </Link>
          <div className="mb-6">
            <Breadcrumbs items={[{ label: "Servicios" }, { label: "Sonorización" }]} />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Sonorización Profesional en Barcelona</h1>
          <p className="text-xl text-gray-300 max-w-2xl">Instalación de sistemas de sonido para negocios, locales, eventos, comunidades y espacios profesionales.</p>
        </div>
      </section>

      <section style={{ padding: "80px 0 112px", background: "#060e1a" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* ¿Qué necesitas sonorizar? */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 48, textAlign: "center" }}>
              ¿Qué necesitas sonorizar?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {necesidades.map((n, idx) => (
                <div key={idx} className="magic-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 32, transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(229,62,62,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <n.Icon size={24} color="#E63946" />
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{n.title}</h3>
                  <p style={{ color: "#94A3B8" }}>{n.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Componentes */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 48, marginBottom: 80 }}>
            <h2 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#FFFFFF", marginBottom: 16, textAlign: "center" }}>
              Componentes del sistema
            </h2>
            <p style={{ color: "#94A3B8", textAlign: "center", maxWidth: 640, margin: "0 auto 48px", lineHeight: 1.7 }}>
              Diseñamos e instalamos el sistema de sonido con los equipos adecuados a cada espacio: altavoces de techo o pared, amplificación de instalación o multizona, mezcladores y controladores.
            </p>
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

          {/* Proceso */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 16, textAlign: "center" }}>
              Diseñamos e instalamos tu sistema
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginTop: 48 }}>
              {proceso.map((p, idx) => (
                <div key={idx} className="magic-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28, transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease" }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#E63946", marginBottom: 10, letterSpacing: 1 }}>{p.num}</div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Relacionados */}
          <div style={{ marginBottom: 80, textAlign: "center" }}>
            <p style={{ color: "#94A3B8", fontSize: 14 }}>
              ¿También necesitas cableado o red para tu sistema de sonido? Consulta nuestra página de{" "}
              <Link to="/redes-informaticas" style={{ color: "#E63946", fontWeight: 700 }}>redes informáticas</Link>.
            </p>
          </div>

          <style>{`
            .magic-card:hover { transform: translateY(-6px); border-color: rgba(229,62,62,0.55); box-shadow: 0 20px 48px rgba(229,62,62,0.18); }
          `}</style>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-[#E63946] to-[#d32f3c] text-white rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-black mb-4 flex items-center justify-center gap-3">
              <Volume2 className="w-8 h-8" />
              Sonorización profesional para tu espacio
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Consulta gratuita sin compromiso. Diseñamos el sistema de sonido adecuado a tu local, negocio o comunidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToContact}
                className="bg-white text-[#E63946] hover:bg-gray-100 px-8 py-6 rounded-lg font-bold flex items-center justify-center gap-2"
              >
                Solicitar presupuesto de sonorización
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
              Solicita presupuesto de sonorización
            </h2>
            <p style={{ color: "#94A3B8", fontSize: "1.125rem", maxWidth: 640, margin: "0 auto" }}>
              Cuéntanos tu proyecto y te diseñaremos la mejor solución de sonido. Presupuesto personalizado sin compromiso.
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
