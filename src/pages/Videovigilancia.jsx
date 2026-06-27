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

export default function Videovigilancia() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const features = [
    { icon: "📹", title: "Grabación 4K Ultra HD", desc: "Captura cada detalle con claridad profesional" },
    { icon: "🌙", title: "Visión nocturna avanzada", desc: "Infrarroja de hasta 50 metros sin iluminación" },
    { icon: "☁️", title: "Grabación en nube", desc: "Acceso seguro a las grabaciones desde cualquier lugar" },
    { icon: "🤖", title: "Análisis inteligente", desc: "IA que detecta personas, vehículos y comportamientos sospechosos" },
    { icon: "📱", title: "Visualización en tiempo real", desc: "Streaming directo a tu móvil desde cualquier lugar" },
    { icon: "🔒", title: "Almacenamiento seguro", desc: "Servidor cifrado con redundancia de datos" }
  ];

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white" style={{ paddingBottom: 70 }}>
      <AdvancedSEO 
        title="Cámaras Videovigilancia 4K Barcelona | HIKVISION y DAHUA Profesional"
        description="Videovigilancia profesional en Barcelona y Catalunya. Cámaras 4K con IA para hogar, negocio y comunidades. Sin cuotas. Presupuesto gratis. Tel: 638 10 99 47"
        keywords="cámaras videovigilancia Barcelona, cámaras seguridad 4K, HIKVISION Barcelona, DAHUA, videovigilancia profesional, cámaras IP, grabación nube, visión nocturna"
        ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/13c328404_ChatGPTImage26feb202612_35_12.png"
        schema={{
          "@type": "Service",
          "name": "Sistemas de Videovigilancia 4K",
          "serviceType": "Instalación de Cámaras de Seguridad Profesional",
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
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Cámaras de Videovigilancia 4K Profesional Barcelona</h1>
          <p className="text-xl text-gray-300 max-w-2xl">Instalación profesional de cámaras de seguridad HIKVISION y DAHUA en Barcelona. Videovigilancia 4K con grabación en nube, visión nocturna infrarroja y análisis inteligente mediante IA. Protección total para tu hogar, negocio o comunidad.</p>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-6">Videovigilancia Profesional con Calidad 4K Ultra HD</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Instalamos cámaras de videovigilancia profesional con grabación en 4K Ultra HD y visión nocturna infrarroja de hasta 50 metros. Sistema de seguridad completo con acceso remoto a las grabaciones desde cualquier dispositivo móvil, tablet u ordenador, en cualquier momento y desde cualquier lugar del mundo.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Nuestros sistemas de videovigilancia incorporan inteligencia artificial avanzada que detecta automáticamente personas, vehículos, intrusiones y comportamientos anormales. Soluciones profesionales ideales para seguridad de hogares, negocios, oficinas, comunidades de vecinos, naves industriales y aparcamientos en Barcelona y toda Catalunya.
              </p>
              <ul className="space-y-3">
                {["Resolución 4K (8 Megapíxeles)", "Visión nocturna hasta 50 metros", "Grabación continua o por eventos", "Almacenamiento en nube de 30 días"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[#E63946]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1644368917521-240f3cecf1d7?w=600&h=600&fit=crop"
                alt="Cámaras de videovigilancia 4K"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Features */}
          <div className="mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-12 text-center">Características avanzadas</h2>
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

          {/* Marcas */}
          <div className="bg-gray-50 rounded-2xl p-12 mb-20">
            <h2 className="text-3xl font-bold text-[#0A1628] mb-8 text-center">Tecnología de las mejores marcas</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="border-r border-gray-200">
                <h3 className="text-2xl font-bold text-[#0A1628] mb-4">HIKVISION</h3>
                <p className="text-gray-600 mb-4">La marca nº1 en videovigilancia a nivel mundial. Cámaras profesionales con IA integrada, grabación en 4K y almacenamiento inteligente.</p>
                <ul className="space-y-2">
                  {["Resolución 4K-8MP", "Almacenamiento inteligente", "Análisis de comportamiento", "Integración app profesional"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-[#E63946]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0A1628] mb-4">DAHUA</h3>
                <p className="text-gray-600 mb-4">Cámaras de alta gama con inteligencia artificial avanzada. Reconocimiento facial, detección de intrusos y grabación de ultra alta definición.</p>
                <ul className="space-y-2">
                  {["Reconocimiento facial IA", "Detección de intrusos", "Compresión H.265", "Visión nocturna Full Color"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-[#E63946]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTA optimizado */}
          <div className="text-center bg-gradient-to-r from-[#E63946] to-[#d32f3c] text-white rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-black mb-4">📹 Instala cámaras 4K con visión nocturna</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Presupuesto gratuito en 24h. Instalación profesional certificada con garantía de 3 años.
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
              Solicita presupuesto para videovigilancia 4K
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Dinos qué necesitas y diseñaremos el sistema de cámaras perfecto. Presupuesto personalizado gratis.
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