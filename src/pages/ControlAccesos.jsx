import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ChatWidget from "../components/chatbot/ChatWidget";
import ContactForm from "../components/landing/ContactForm";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import { createPageUrl } from "@/utils";

export default function ControlAccesos() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const features = [
    { icon: "🔐", title: "Acceso por código PIN", desc: "Códigos personalizados para cada usuario" },
    { icon: "👆", title: "Huella dactilar", desc: "Identificación biométrica rápida y segura" },
    { icon: "🎫", title: "Tarjetas RFID", desc: "Control con tarjetas inteligentes sin contacto" },
    { icon: "📋", title: "Registro de entradas", desc: "Historial completo de accesos y usuarios" },
    { icon: "⏰", title: "Horarios programables", desc: "Control de acceso por franjas horarias" },
    { icon: "📊", title: "Reportes en tiempo real", desc: "Estadísticas y análisis de accesos" }
  ];

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060e1a", paddingBottom: 70 }}>
      <AdvancedSEO
        title="Control de Accesos Biométrico Barcelona | Huella Dactilar y Facial"
        description="Control de accesos en Barcelona. Videoporteros, cerraduras inteligentes y lectores biométricos. Apertura remota desde móvil. Presupuesto gratis. Tel: 638 10 99 47"
        keywords="control accesos Barcelona, control biométrico, huella dactilar, reconocimiento facial, tarjetas RFID, control accesos oficinas, seguridad empresas Barcelona"
        ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/0654e8483_ChatGPTImage26feb202612_37_13.png"
        schema={{
          "@type": "Service",
          "name": "Control de Accesos Biométrico",
          "serviceType": "Sistemas de Control de Accesos para Empresas",
          "provider": {
            "@type": "LocalBusiness",
            "name": "PremiumTechSecurity"
          },
          "areaServed": "Barcelona, Catalunya"
        }}
      />
      <Navbar />

      {/* Hero — already dark, keep as-is */}
      <section className="bg-gradient-to-br from-[#0A1628] to-[#1a2a3a] text-white pt-28 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link to={createPageUrl("Home")} className="inline-flex items-center gap-2 text-[#E63946] hover:text-[#d32f3c] mb-6 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Volver a inicio
          </Link>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Sistemas de Control de Accesos Biométrico Barcelona</h1>
          <p className="text-xl text-gray-300 max-w-2xl">Control de accesos biométrico facial, lector de huellas y tarjetas RFID. La tecnología más avanzada para gestionar quién entra en tu propiedad.</p>
        </div>
      </section>

      {/* Contenido */}
      <section style={{ padding: "80px 0 112px", background: "#060e1a" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <div>
              <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 24 }}>
                Control de Accesos Profesional con Tecnología Biométrica
              </h2>
              <p style={{ fontSize: "1.125rem", color: "#94A3B8", marginBottom: 16, lineHeight: 1.7 }}>
                Instala sistemas profesionales de control de accesos que te permiten controlar quién entra, cuándo y a qué áreas de tu propiedad. Tecnología biométrica y electrónica de última generación: reconocimiento de huella dactilar, facial, códigos PIN y tarjetas RFID. Elimina las llaves perdidas y gestiona todos los accesos de forma centralizada desde un solo sistema de seguridad.
              </p>
              <p style={{ fontSize: "1.125rem", color: "#94A3B8", marginBottom: 24, lineHeight: 1.7 }}>
                Soluciones de control de accesos perfectas para todo tipo de instalaciones en Barcelona: oficinas corporativas, edificios de viviendas, comercios, centros comerciales, aparcamientos, naves industriales, fábricas, hospitales, clínicas y cualquier espacio donde necesites controlar y registrar quién entra y sale con máxima seguridad.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {["Múltiples métodos de autenticación", "Registro automático de accesos", "Gestión de horarios", "Integración con alarmas"].map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: 12, color: "#CBD5E0" }}>
                    <Check style={{ width: 20, height: 20, color: "#E53E3E", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 60px rgba(0,0,0,0.45)" }}>
              <img
                src="/images/control-accesos-biometrico.webp"
                alt="Lector biométrico de huella dactilar para control de accesos en Barcelona"
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
            </div>
          </div>

          {/* Features */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 48, textAlign: "center" }}>
              Características principales
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="magic-card"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    padding: 32,
                    transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{feature.icon}</div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{feature.title}</h3>
                  <p style={{ color: "#94A3B8" }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Casos de uso */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 48, marginBottom: 80 }}>
            <h2 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#FFFFFF", marginBottom: 48, textAlign: "center" }}>
              Soluciones para cada sector
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Oficinas y empresas", desc: "Control de acceso a despachos, salas de reuniones y áreas restringidas" },
                { title: "Edificios residenciales", desc: "Acceso a viviendas, garajes y áreas comunes de comunidades" },
                { title: "Comercios", desc: "Control de acceso a áreas de almacén, oficinas y cajas" },
                { title: "Hospitales y clínicas", desc: "Acceso restringido a quirófanos, farmacia y archivos" }
              ].map((caso, idx) => (
                <div
                  key={idx}
                  className="magic-card"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    padding: 24,
                    transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                  }}
                >
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{caso.title}</h3>
                  <p style={{ color: "#94A3B8" }}>{caso.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            .magic-card:hover { transform: translateY(-6px); border-color: rgba(229,62,62,0.55); box-shadow: 0 20px 48px rgba(229,62,62,0.18); }
          `}</style>

          {/* CTA — red gradient kept as-is */}
          <div className="text-center bg-gradient-to-r from-[#E63946] to-[#d32f3c] text-white rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-black mb-4">🔐 Control de accesos biométrico profesional</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Consulta gratuita sin compromiso. Diseñamos el sistema perfecto para tu empresa u oficina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToContact}
                className="bg-white text-[#E63946] hover:bg-gray-100 px-8 py-6 rounded-lg font-bold flex items-center justify-center gap-2"
              >
                Solicitar presupuesto gratis
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

      {/* Contact Section */}
      <div id="contacto" style={{ background: "#0a1120", padding: "80px 0 112px" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 16 }}>
              Solicita presupuesto para control de accesos
            </h2>
            <p style={{ color: "#94A3B8", fontSize: "1.125rem", maxWidth: 640, margin: "0 auto" }}>
              Cuéntanos tu proyecto y te diseñaremos la mejor solución. Presupuesto personalizado sin compromiso.
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
