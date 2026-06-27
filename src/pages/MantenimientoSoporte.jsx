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

export default function MantenimientoSoporte() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const services = [
    { icon: "🔧", title: "Mantenimiento preventivo", desc: "Revisiones periódicas para garantizar funcionamiento óptimo" },
    { icon: "🚨", title: "Soporte de emergencia", desc: "Respuesta inmediata ante fallos o incidencias" },
    { icon: "📱", title: "Actualizaciones de firmware", desc: "Mejoras de seguridad y nuevas funcionalidades" },
    { icon: "🧪", title: "Pruebas periódicas", desc: "Comprobación de sensores, cámaras y sistemas" },
    { icon: "💬", title: "Asesoramiento técnico", desc: "Consultoría para optimizar tu sistema" },
    { icon: "📞", title: "Soporte telefónico 24/7", desc: "Equipo disponible siempre para resolver dudas" }
  ];

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <AdvancedSEO 
        title="Mantenimiento Sistemas Seguridad 24/7 Barcelona | Soporte Técnico"
        description="Servicio de mantenimiento y soporte técnico 24/7 para sistemas de seguridad en Barcelona. Alarmas, cámaras, control de accesos. Respuesta inmediata certificada."
        keywords="mantenimiento alarmas Barcelona, soporte técnico seguridad, reparación cámaras, mantenimiento sistemas seguridad, servicio técnico 24/7, revisión alarmas"
        schema={{
          "@type": "Service",
          "name": "Mantenimiento y Soporte Técnico 24/7",
          "serviceType": "Mantenimiento de Sistemas de Seguridad",
          "provider": {
            "@type": "LocalBusiness",
            "name": "PremiumTechSecurity"
          },
          "areaServed": "Barcelona, Catalunya"
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
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Mantenimiento y Soporte Técnico 24/7 Barcelona</h1>
          <p className="text-xl text-gray-300 max-w-2xl">Servicio técnico profesional certificado disponible 24 horas al día, 7 días a la semana. Mantenimiento preventivo, reparación de emergencia, instalación y asesoramiento técnico para todos tus sistemas de seguridad: alarmas, cámaras de videovigilancia y control de accesos en Barcelona y Catalunya.</p>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-6">Servicio Técnico Profesional Disponible 24/7</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Tu sistema de seguridad es crítico para la protección de tu hogar o negocio. Por eso contamos con equipo técnico profesional certificado disponible 24 horas al día, 7 días a la semana, para garantizar que tus alarmas, cámaras de videovigilancia y sistemas de control de accesos funcionen perfectamente en todo momento.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Ofrecemos servicio técnico integral desde la instalación inicial profesional certificada, pasando por el mantenimiento preventivo periódico, hasta la reparación de emergencia inmediata. Nos encargamos de absolutamente todo el ciclo de vida de tus sistemas de seguridad en Barcelona para que tú tengas total tranquilidad y protección garantizada.
              </p>
              <ul className="space-y-3">
                {["Técnicos certificados", "Respuesta en menos de 1 hora", "Piezas de repuesto disponibles", "Garantía en reparaciones"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-[#E63946]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=600&fit=crop"
                alt="Servicio técnico profesional"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Services */}
          <div className="mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-12 text-center">Servicios incluidos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-[#0A1628] mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Planes */}
          <div className="mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-12 text-center">Planes de mantenimiento</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Básico", price: "desde 29€/mes", features: ["Soporte telefónico", "Actualizaciones", "Pruebas trimestrales"] },
                { name: "Profesional", price: "desde 59€/mes", features: ["Soporte 24/7", "Mantenimiento mensual", "Reparaciones incluidas", "Piezas de repuesto"], popular: true },
                { name: "Premium", price: "desde 99€/mes", features: ["Todo incluido", "Visitas mensuales", "Ampliación de sistema", "Asesoramiento continuo"] }
              ].map((plan, idx) => (
                <div key={idx} className={`rounded-xl p-8 ${plan.popular ? 'bg-gradient-to-br from-[#E63946] to-[#d32f3c] text-white shadow-2xl scale-105' : 'bg-gray-50 border border-gray-200'}`}>
                  {plan.popular && <div className="text-sm font-bold bg-white text-[#E63946] px-3 py-1 rounded-full w-fit mb-4">MÁS POPULAR</div>}
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-[#0A1628]'}`}>{plan.name}</h3>
                  <div className={`text-3xl font-bold mb-6 ${plan.popular ? 'text-white' : 'text-[#E63946]'}`}>{plan.price}</div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2">
                        <Check className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-[#E63946]'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA optimizado */}
          <div className="text-center bg-gradient-to-r from-[#E63946] to-[#d32f3c] text-white rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-black mb-4">🛠️ Soporte 24/7 para tu sistema de seguridad</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Primera consulta gratuita. Elige el plan de mantenimiento ideal y disfruta de tranquilidad total.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={scrollToContact}
                className="bg-white text-[#E63946] hover:bg-gray-100 px-8 py-6 rounded-lg font-bold flex items-center justify-center gap-2"
              >
                Contratar plan ahora
                <ArrowRight className="w-5 h-5" />
              </Button>
              <a
                href="tel:+34638109947"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-6 rounded-lg font-bold flex items-center justify-center gap-2"
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
              Contrata tu plan de mantenimiento
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Cuéntanos qué sistema tienes instalado y te recomendaremos el mejor plan de soporte.
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