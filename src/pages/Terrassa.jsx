import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Shield, CheckCircle } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";
import LocalitySEO from "../components/seo/LocalitySEO";
import GoogleMapEmbed from "../components/landing/GoogleMapEmbed";

export default function Terrassa() {
  return (
    <div className="min-h-screen bg-white">
      <LocalitySEO
        city="Terrassa"
        title="Alarmas en Terrassa | Instalación Sistemas Seguridad Profesional 24/7"
        description="Instalación profesional de alarmas en Terrassa. Sistemas AJAX, cámaras Hikvision 4K, control de accesos para viviendas, naves y comercios. Presupuesto gratuito ☎ 638 10 99 47."
        keywords="alarmas Terrassa, instalación alarmas Terrassa, sistemas seguridad Terrassa, cámaras seguridad Terrassa, videovigilancia Terrassa, alarma nave industrial Terrassa"
        canonicalUrl="https://alarmasenbarcelona.com/Terrassa"
        lat={41.5634}
        lng={2.0082}
        pageUrl="https://alarmasenbarcelona.com/Terrassa"
      />
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
              <span className="text-sm">Catalunya • Terrassa</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Instalación de Alarmas en Terrassa
            </h1>
            <p className="text-xl text-white/70 max-w-3xl">
              Protección integral para hogares y empresas en Terrassa. Sistemas de alarma profesionales con tecnología avanzada.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-[#0A1628] mb-6">
              Empresa Especializada en Alarmas en Terrassa
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              <strong>Terrassa</strong>, importante polo industrial y comercial del Vallès Occidental, cuenta con un dinámico tejido empresarial y zonas residenciales de gran valor. La <strong>seguridad en Terrassa</strong> es clave para proteger viviendas unifamiliares, naves industriales y comercios del centro.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              En <strong>Premium Tech Security</strong> somos especialistas en <strong>instalación de alarmas en Terrassa</strong>, ofreciendo soluciones adaptadas a casas con jardín, pisos urbanos, polígonos industriales y todo tipo de negocios. Nuestro equipo técnico local conoce perfectamente las necesidades de seguridad de Terrassa.
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              ¿Por qué Instalar una Alarma en Terrassa?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {[
                "Protección de viviendas unifamiliares",
                "Seguridad industrial en polígonos",
                "Alarmas para comercios del centro",
                "Control de accesos en empresas",
                "Prevención de okupación",
                "Tranquilidad durante vacaciones"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#F8F9FC] rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#E63946] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Nuestros Servicios en Terrassa
            </h3>

            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para viviendas:</strong> Sistemas inalámbricos con sensores de movimiento, contactos magnéticos y sirenas exteriores.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para naves industriales:</strong> Protección perimetral, detección volumétrica y control de accesos para polígonos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Sistemas de videovigilancia:</strong> Cámaras 4K con inteligencia artificial, visión nocturna y almacenamiento en la nube.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas con niebla:</strong> Sistemas de seguridad activa que desorientan a intrusos en segundos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Conexión a CRA:</strong> Monitorización profesional 24/7 con aviso a Policía y propietario en tiempo real.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Cobertura en Toda Terrassa
            </h3>

            <p className="text-gray-600 leading-relaxed mb-4">
              Damos servicio en todos los barrios de Terrassa: <strong>Centre, Ègara, Can Palet, Les Fonts, La Maurina, Torresana, Montserrat, Vallparadís, Sant Pere, Ca n'Anglada, Can Parellada, Segle XX</strong> y todos los polígonos industriales. Respuesta rápida en cualquier zona.
            </p>

            <div className="bg-[#0A1628] text-white rounded-2xl p-8 my-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-[#E63946]" />
                <h4 className="text-2xl font-bold">Instalación Profesional en Terrassa</h4>
              </div>
              <p className="text-white/80 mb-6">
                Técnicos especializados con amplia experiencia en Terrassa. Instalación sin obras en 24-48h. Asesoramiento personalizado gratuito.
              </p>
              <a 
                href="tel:+34638109947"
                className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#d32f3c] text-white px-6 py-3 rounded-full font-semibold transition-all"
              >
                <Phone className="w-4 h-4" />
                Contacta: 638 10 99 47
              </a>
            </div>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Tecnología Líder en Seguridad
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              Instalamos exclusivamente equipos de las marcas más fiables: <strong>Ajax Systems</strong> (sistemas inalámbricos con batería de hasta 7 años), <strong>Hikvision</strong> (cámaras de videovigilancia profesional), <strong>Dahua</strong> (innovación en grabación) y <strong>DSC</strong> (alarmas tradicionales de máxima confiabilidad).
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Presupuesto Personalizado para Terrassa
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Cada propiedad tiene necesidades únicas. Ofrecemos estudio de seguridad gratuito con presupuesto detallado y sin compromiso. <strong>Sin letra pequeña. Sin permanencia forzosa.</strong> Transparencia total desde el primer contacto. Confía en los expertos locales en alarmas de Terrassa.
            </p>
          </div>

          <div className="mt-16 bg-[#F8F9FC] rounded-2xl p-8">
            <div className="mb-6 p-6 bg-white rounded-xl border-l-4 border-[#E63946]">
              <p className="text-sm text-gray-500 mb-2">Opinión verificada</p>
              <p className="text-gray-700 italic mb-3">
                "Protegieron mi nave industrial en Can Parellada con un sistema completo. La instalación fue impecable y el precio muy competitivo."
              </p>
              <p className="text-sm font-semibold text-[#0A1628]">— Marc T., Terrassa</p>
            </div>
            
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6 text-center">
              Pide tu Presupuesto Gratis para Terrassa
            </h3>
            <ContactForm />

            {/* Mapa de cobertura */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-[#0A1628] mb-4">Área de Servicio en Terrassa</h3>
              <GoogleMapEmbed city="Terrassa" query="Terrassa, Barcelona, España" height="380px" />
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}