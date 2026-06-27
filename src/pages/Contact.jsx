import React from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";
import { Helmet } from "react-helmet";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contacto | Premium Tech Security - Alarmas Barcelona</title>
        <meta name="description" content="Contacta con Premium Tech Security para un presupuesto gratuito de alarmas y seguridad en Barcelona. Teléfono: 638 10 99 47. Email: tcnpremium@gmail.com." />
        <link rel="canonical" href="https://alarmasenbarcelona.com/Contact" />
      </Helmet>
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0A1628] mb-4">
            Contacta con Nosotros
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl">
            ¿Necesitas un sistema de seguridad para tu hogar o negocio? Contacta con nosotros y te ofreceremos un presupuesto gratuito sin compromiso.
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Información de Contacto</h2>

              <a href="tel:+34638109947" className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="bg-[#E63946] p-3 rounded-lg flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                  <p className="text-lg font-semibold text-[#0A1628]">638 10 99 47</p>
                </div>
              </a>

              <a href="mailto:tcnpremium@gmail.com" className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="bg-[#E63946] p-3 rounded-lg flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-lg font-semibold text-[#0A1628]">tcnpremium@gmail.com</p>
                </div>
              </a>

              <a href="https://wa.me/34638109947" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="bg-[#25D366] p-3 rounded-lg flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">WhatsApp</p>
                  <p className="text-lg font-semibold text-[#0A1628]">Enviar mensaje por WhatsApp</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl">
                <div className="bg-[#E63946] p-3 rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Zona de cobertura</p>
                  <p className="font-semibold text-[#0A1628]">Barcelona y área metropolitana</p>
                  <p className="text-sm text-gray-500 mt-1">Sabadell, Badalona, Hospitalet, Terrassa, Mataró, Sant Cugat y más</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl">
                <div className="bg-[#E63946] p-3 rounded-lg flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Horario de atención</p>
                  <p className="font-semibold text-[#0A1628]">Lunes a Viernes: 9:00 - 19:00</p>
                  <p className="font-semibold text-[#0A1628]">Sábados: 10:00 - 14:00</p>
                  <p className="text-sm text-gray-500 mt-1">Emergencias 24/7 disponibles</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Solicitar Presupuesto Gratis</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}