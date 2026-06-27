import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ChatWidget from "../components/chatbot/ChatWidget";
import ContactForm from "../components/landing/ContactForm";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import { createPageUrl } from "@/utils";

export default function SistemasAlarma() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const features = [
    { icon: "🎯", title: "Detección inteligente 24/7", desc: "Sensores de movimiento, rotura de cristal y apertura de puertas" },
    { icon: "📱", title: "Control desde móvil", desc: "App intuitiva para armar/desarmar tu alarma en cualquier momento" },
    { icon: "🚨", title: "Alertas en tiempo real", desc: "Notificaciones instantáneas ante cualquier incidente" },
    { icon: "🔐", title: "Conexión segura", desc: "Comunicación cifrada con los servidores de monitoreo" },
    { icon: "⚡", title: "Instalación rápida", desc: "Montaje profesional en menos de 2 horas" },
    { icon: "💬", title: "Soporte 24/7", desc: "Equipo técnico disponible siempre que lo necesites" }
  ];

  const scrollToContact = () => {
    const contactForm = document.getElementById("contacto");
    if (contactForm) contactForm.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <AdvancedSEO 
        title="Sistemas de Alarma Profesionales Barcelona | Instalación AJAX 24/7"
        description="Sistemas de alarma inteligentes con tecnología AJAX en Barcelona. Instalación profesional, monitoreo 24/7, control desde móvil. Presupuesto gratuito sin compromiso."
        keywords="sistemas alarma Barcelona, alarmas profesionales, alarma AJAX, instalación alarmas, alarma casa Barcelona, alarma negocio, seguridad hogar, monitoreo 24/7"
        ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/20ed7642f_ChatGPTImage26feb202612_32_30.png"
        schema={{
          "@type": "Service",
          "name": "Sistemas de Alarma Profesionales",
          "serviceType": "Instalación y Monitoreo de Sistemas de Alarma",
          "provider": {
            "@type": "LocalBusiness",
            "name": "PremiumTechSecurity"
          },
          "areaServed": "Barcelona, Catalunya",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock"
          }
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1628] to-[#1a2a3a] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link to={createPageUrl("Home")} className="inline-flex items-center gap-2 text-[#E63946] hover:text-[#d32f3c] mb-6 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Volver a inicio
          </Link>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Sistemas de Alarma Inteligentes para Hogar y Negocio</h1>
          <p className="text-xl text-gray-300 max-w-2xl">Instalación profesional de alarmas en Barcelona con tecnología AJAX. Monitoreo 24/7, alertas en tiempo real y control total desde tu móvil. Protege tu hogar o negocio con la mejor tecnología de seguridad.</p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-6">Alarmas Profesionales con Tecnología de Última Generación</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Nuestros sistemas de alarma inteligentes ofrecen protección profesional 24/7 para tu hogar o negocio en Barcelona y Catalunya. Instalamos alarmas con la tecnología más avanzada de AJAX, combinando instalación profesional certificada con monitoreo constante y respuesta inmediata ante cualquier incidente.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Cada sistema de alarma se personaliza según tus necesidades de seguridad: detectores de movimiento inteligentes, sensores de rotura de cristales, detectores magnéticos para puertas y ventanas. Todo conectado y controlable desde tu móvil mediante app profesional para que estés siempre informado y protegido.
              </p>
              <ul className="space-y-3">
                {["Instalación rápida y sin obras", "Cero cuotas mensuales obligatorias", "Compatible con otros sistemas de seguridad", "Garantía de 3 años"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[#E63946]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=600&h=600&fit=crop"
                alt="Sistema de alarma profesional"
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

          {/* Tecnología */}
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1a2a3a] text-white rounded-2xl p-12 mb-20">
            <h2 className="text-3xl font-bold mb-6">Tecnología AJAX - Lo mejor del mercado</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  AJAX es la marca líder en sistemas de alarma inalámbricos en Europa. Sus detectores tienen alcance de hasta 2000 metros, batería de 7 años y conexión cifrada.
                </p>
                <ul className="space-y-2">
                  {["Detectores inalámbricos fiables", "Batería de 7 años", "Cifrado AES-256", "Aplicación profesional"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#E63946]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
                alt="Tecnología AJAX"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* CTA optimizado */}
          <div className="text-center bg-gradient-to-r from-[#E63946] to-[#d32f3c] text-white rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-black mb-4">🔒 Protege tu hogar con el mejor sistema de alarmas</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Solicita tu presupuesto gratuito sin compromiso. Instalación profesional en menos de 48 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToContact}
                className="bg-white text-[#E63946] hover:bg-gray-100 px-8 py-6 rounded-lg font-bold text-base flex items-center justify-center gap-2"
              >
                Solicitar presupuesto gratis
                <ArrowRight className="w-5 h-5" />
              </Button>
              <a
                href="tel:+34638109947"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-6 rounded-lg font-bold text-base flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Llamar ahora: 638 10 99 47
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
              Solicita presupuesto para tu sistema de alarma
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Rellena el formulario y recibe un presupuesto personalizado en menos de 24 horas. Sin compromiso.
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