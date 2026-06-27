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
    <div className="min-h-screen bg-white" style={{ paddingBottom: 70 }}>
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

      {/* Hero */}
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
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-6">Control de Accesos Profesional con Tecnología Biométrica</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Instala sistemas profesionales de control de accesos que te permiten controlar quién entra, cuándo y a qué áreas de tu propiedad. Tecnología biométrica y electrónica de última generación: reconocimiento de huella dactilar, facial, códigos PIN y tarjetas RFID. Elimina las llaves perdidas y gestiona todos los accesos de forma centralizada desde un solo sistema de seguridad.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Soluciones de control de accesos perfectas para todo tipo de instalaciones en Barcelona: oficinas corporativas, edificios de viviendas, comercios, centros comerciales, aparcamientos, naves industriales, fábricas, hospitales, clínicas y cualquier espacio donde necesites controlar y registrar quién entra y sale con máxima seguridad.
              </p>
              <ul className="space-y-3">
                {["Múltiples métodos de autenticación", "Registro automático de accesos", "Gestión de horarios", "Integración con alarmas"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[#E63946]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=90"
                alt="Control de accesos biométrico facial"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Features */}
          <div className="mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-12 text-center">Características principales</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-[#0A1628] mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Casos de uso */}
          <div className="bg-gray-50 rounded-2xl p-12 mb-20">
            <h2 className="text-3xl font-bold text-[#0A1628] mb-12 text-center">Soluciones para cada sector</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Oficinas y empresas", desc: "Control de acceso a despachos, salas de reuniones y áreas restringidas" },
                { title: "Edificios residenciales", desc: "Acceso a viviendas, garajes y áreas comunes de comunidades" },
                { title: "Comercios", desc: "Control de acceso a áreas de almacén, oficinas y cajas" },
                { title: "Hospitales y clínicas", desc: "Acceso restringido a quirófanos, farmacia y archivos" }
              ].map((caso, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-[#0A1628] mb-2">{caso.title}</h3>
                  <p className="text-gray-600">{caso.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA optimizado */}
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

      {/* Contact Section con formulario */}
      <div id="contacto" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-4">
              Solicita presupuesto para control de accesos
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
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