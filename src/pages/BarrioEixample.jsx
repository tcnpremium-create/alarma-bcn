import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Shield, CheckCircle } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";

export default function BarrioEixample() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0A1628] to-[#1a2f4a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-white/60 mb-4">
              <MapPin className="w-4 h-4 text-[#E63946]" />
              <span className="text-sm">Barcelona • Eixample</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Instalación de Alarmas en el Eixample
            </h1>
            <p className="text-xl text-white/70 max-w-3xl">
              Protege tu vivienda o negocio en el Eixample con sistemas de seguridad de última generación. 
              Instalación en 24-48h por técnicos certificados.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-[#0A1628] mb-6">
              Empresa de Alarmas de Confianza en el Eixample, Barcelona
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              El <strong>Eixample</strong> es uno de los barrios más emblemáticos y céntricos de Barcelona, 
              caracterizado por su diseño urbanístico único con calles amplias y edificios modernistas. 
              Con una alta densidad de viviendas, comercios y oficinas, la seguridad es una prioridad 
              para residentes y propietarios de negocios.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              En <strong>Alarmas Barcelona</strong> somos especialistas en <strong>instalación de alarmas 
              en el Eixample</strong>, ofreciendo soluciones personalizadas tanto para pisos residenciales 
              como para locales comerciales, oficinas y consultas profesionales.
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              ¿Por qué instalar una alarma en el Eixample?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {[
                "Alta densidad de viviendas y comercios",
                "Zona turística con mucho tránsito",
                "Edificios antiguos con múltiples accesos",
                "Protección para locales comerciales",
                "Tranquilidad ante ausencias prolongadas",
                "Cumplimiento de seguros de hogar"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#F8F9FC] rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#E63946] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Nuestros Servicios de Seguridad en el Eixample
            </h3>

            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para pisos:</strong> Sistemas inalámbricos discretos ideales para viviendas en fincas del Eixample.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para comercios:</strong> Protección avanzada con control de accesos para locales y tiendas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Videovigilancia:</strong> Cámaras IP de alta resolución con grabación en la nube.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Conexión a central receptora:</strong> Monitorización 24/7 con respuesta inmediata.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Ventajas de Contratar Nuestros Servicios en el Eixample
            </h3>

            <p className="text-gray-600 leading-relaxed mb-4">
              Como empresa local con amplia experiencia en Barcelona, conocemos perfectamente las 
              características arquitectónicas del Eixample. Nuestros técnicos están acostumbrados a 
              trabajar en fincas modernistas, edificios protegidos y todo tipo de locales comerciales 
              de la zona.
            </p>

            <div className="bg-[#0A1628] text-white rounded-2xl p-8 my-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-[#E63946]" />
                <h4 className="text-2xl font-bold">Instalación Rápida en el Eixample</h4>
              </div>
              <p className="text-white/80 mb-6">
                Nos desplazamos a cualquier punto del Eixample (Dreta, Esquerra, Sant Antoni) 
                en menos de 2 horas. Instalación completa en 24-48h sin obras.
              </p>
              <a 
                href="tel:+34638109947"
                className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#d32f3c] text-white px-6 py-3 rounded-full font-semibold transition-all"
              >
                <Phone className="w-4 h-4" />
                Llamar Ahora: 638 10 99 47
              </a>
            </div>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Precios de Alarmas en el Eixample
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              Ofrecemos presupuestos personalizados sin compromiso adaptados al tamaño de tu propiedad, 
              número de sensores necesarios y nivel de seguridad deseado. Trabajamos con todas las marcas 
              líderes (Ajax, Hikvision, Dahua, DSC) para garantizar la mejor relación calidad-precio.
            </p>

            <p className="text-gray-600 leading-relaxed">
              <strong>Sin permanencia.</strong> Sin costes ocultos. Transparencia total en cada instalación.
            </p>
          </div>

          {/* CTA Form */}
          <div className="mt-16 bg-[#F8F9FC] rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6 text-center">
              Solicita tu Presupuesto Gratis para el Eixample
            </h3>
            <ContactForm />
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}