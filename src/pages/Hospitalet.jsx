import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Shield, CheckCircle } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";
import LocalitySEO from "../components/seo/LocalitySEO";
import GoogleMapEmbed from "../components/landing/GoogleMapEmbed";

export default function Hospitalet() {
  return (
    <div className="min-h-screen bg-white">
      <LocalitySEO
        city="L'Hospitalet de Llobregat"
        title="Alarmas en L'Hospitalet de Llobregat | Seguridad Profesional 24/7"
        description="Instalación de alarmas en L'Hospitalet de Llobregat. Sistemas AJAX, videovigilancia 4K, control de accesos. Técnicos certificados. Presupuesto gratuito ☎ 638 10 99 47."
        keywords="alarmas Hospitalet, instalación alarmas Hospitalet, sistemas seguridad Hospitalet, cámaras seguridad Hospitalet, videovigilancia Hospitalet Llobregat"
        canonicalUrl="https://alarmasenbarcelona.com/Hospitalet"
        lat={41.3598}
        lng={2.0993}
        pageUrl="https://alarmasenbarcelona.com/Hospitalet"
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
              <span className="text-sm">Catalunya • L'Hospitalet de Llobregat</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Instalación de Alarmas en L'Hospitalet de Llobregat
            </h1>
            <p className="text-xl text-white/70 max-w-3xl">
              Protección profesional para hogares y negocios en L'Hospitalet. Sistemas de seguridad de última generación con instalación en 24-48h.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-[#0A1628] mb-6">
              Empresa Líder en Sistemas de Seguridad en L'Hospitalet
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              <strong>L'Hospitalet de Llobregat</strong> es el segundo municipio más poblado de Catalunya, con una intensa actividad comercial e industrial. Su proximidad a Barcelona y su tejido empresarial diverso hacen que la <strong>seguridad en L'Hospitalet</strong> sea una prioridad tanto para familias como para propietarios de negocios.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              En <strong>Premium Tech Security</strong> somos especialistas en <strong>instalación de alarmas en L'Hospitalet de Llobregat</strong>, ofreciendo soluciones adaptadas a viviendas, locales comerciales, naves industriales y oficinas. Nuestro equipo técnico conoce perfectamente las necesidades de seguridad de cada barrio de L'Hospitalet.
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              ¿Por qué necesitas una alarma en L'Hospitalet?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {[
                "Segunda ciudad más poblada de Catalunya",
                "Alta densidad de comercios y negocios",
                "Protección para polígonos industriales",
                "Seguridad 24/7 en viviendas",
                "Disuasión efectiva contra robos",
                "Cumplimiento de requisitos de seguros"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#F8F9FC] rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#E63946] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Servicios de Seguridad en L'Hospitalet
            </h3>

            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para viviendas:</strong> Sistemas inalámbricos inteligentes con control remoto desde tu móvil.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Seguridad para comercios:</strong> Protección integral con cámaras, sensores y control de accesos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para naves industriales:</strong> Soluciones robustas para grandes espacios en polígonos de L'Hospitalet.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Videovigilancia profesional:</strong> Cámaras 4K con visión nocturna y grabación en la nube.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Central receptora de alarmas:</strong> Monitorización continua 24/7 con respuesta inmediata ante alertas.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Cobertura en Todos los Barrios de L'Hospitalet
            </h3>

            <p className="text-gray-600 leading-relaxed mb-4">
              Damos servicio en toda L'Hospitalet: <strong>Centre, Collblanc, La Torrassa, Bellvitge, La Florida, Pubilla Cases, Can Serra, Sanfeliu, Santa Eulàlia</strong> y todos los polígonos industriales. Nuestros técnicos se desplazan rápidamente a cualquier punto del municipio.
            </p>

            <div className="bg-[#0A1628] text-white rounded-2xl p-8 my-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-[#E63946]" />
                <h4 className="text-2xl font-bold">Instalación Express en L'Hospitalet</h4>
              </div>
              <p className="text-white/80 mb-6">
                Nos desplazamos a cualquier barrio de L'Hospitalet en menos de 2 horas. Instalación completa y funcional en 24-48h sin necesidad de obras.
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
              Tecnología de Última Generación
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              Trabajamos exclusivamente con las marcas líderes mundiales en seguridad: <strong>Ajax Systems, Hikvision, Dahua Technology y DSC</strong>. Todos nuestros sistemas incluyen:
            </p>

            <ul className="space-y-2 text-gray-600 mb-8">
              <li>✓ App móvil para iOS y Android</li>
              <li>✓ Alertas instantáneas en tiempo real</li>
              <li>✓ Integración con domótica (Google Home, Alexa)</li>
              <li>✓ Batería de respaldo ante cortes de luz</li>
              <li>✓ Comunicación dual (Internet + GSM)</li>
              <li>✓ Garantía del fabricante</li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Precios Transparentes en L'Hospitalet
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Ofrecemos presupuestos personalizados sin letra pequeña. <strong>Sin permanencia obligatoria.</strong> Sin costes ocultos. Precio cerrado desde el primer día. Solicita tu estudio gratuito y descubre por qué somos la empresa de confianza en L'Hospitalet.
            </p>
          </div>

          <div className="mt-16 bg-[#F8F9FC] rounded-2xl p-8">
            <div className="mb-6 p-6 bg-white rounded-xl border-l-4 border-[#E63946]">
              <p className="text-sm text-gray-500 mb-2">Testimonio verificado</p>
              <p className="text-gray-700 italic mb-3">
                "Instalaron mi alarma en el negocio de La Florida en un solo día. Funcionamiento perfecto y atención muy profesional."
              </p>
              <p className="text-sm font-semibold text-[#0A1628]">— Javier R., L'Hospitalet de Llobregat</p>
            </div>
            
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6 text-center">
              Solicita tu Presupuesto Gratis para L'Hospitalet
            </h3>
            <ContactForm />

            {/* Mapa de cobertura */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-[#0A1628] mb-4">Área de Servicio en L'Hospitalet</h3>
              <GoogleMapEmbed city="L'Hospitalet de Llobregat" query="L'Hospitalet de Llobregat, Barcelona, España" height="380px" />
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}