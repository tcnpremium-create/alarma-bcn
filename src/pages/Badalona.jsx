import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Shield, CheckCircle } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";
import LocalitySEO from "../components/seo/LocalitySEO";
import GoogleMapEmbed from "../components/landing/GoogleMapEmbed";

export default function Badalona() {

  return (
    <div className="min-h-screen bg-white">
      <LocalitySEO
        city="Badalona"
        title="Alarmas en Badalona | Instalación Profesional 24/7 | PremiumTechSecurity"
        description="Instalación de alarmas en Badalona. Sistemas AJAX, cámaras 4K, control de accesos para hogares y negocios. Presupuesto gratuito ☎ 638 10 99 47. Respuesta inmediata."
        keywords="alarmas Badalona, instalación alarmas Badalona, sistemas seguridad Badalona, cámaras seguridad Badalona, videovigilancia Badalona, alarma hogar Badalona"
        canonicalUrl="https://alarmasenbarcelona.com/Badalona"
        lat={41.4501}
        lng={2.2471}
        pageUrl="https://alarmasenbarcelona.com/Badalona"
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
              <span className="text-sm">Catalunya • Badalona</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Instalación de Alarmas en Badalona
            </h1>
            <p className="text-xl text-white/70 max-w-3xl">
              Sistemas de seguridad profesionales para hogares y negocios en Badalona. Protección 24/7 con tecnología de vanguardia.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-[#0A1628] mb-6">
              Expertos en Seguridad y Alarmas en Badalona
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              <strong>Badalona</strong>, tercera ciudad más poblada de Catalunya, combina zonas residenciales tranquilas con áreas comerciales de gran actividad. La <strong>seguridad en Badalona</strong> es fundamental para proteger tanto viviendas cerca del mar como negocios en el centro urbano.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              En <strong>Premium Tech Security</strong> llevamos más de una década instalando <strong>alarmas en Badalona</strong>, protegiendo hogares, comercios y comunidades de vecinos. Conocemos las particularidades de cada barrio y adaptamos nuestras soluciones a las necesidades reales de seguridad.
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Ventajas de Instalar una Alarma en Badalona
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {[
                "Protección de viviendas cerca del paseo marítimo",
                "Seguridad para comercios en el centro",
                "Alarmas para segundas residencias",
                "Control remoto desde cualquier lugar",
                "Disuasión efectiva ante okupación",
                "Respuesta inmediata ante alertas"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#F8F9FC] rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#E63946] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Servicios Completos de Seguridad en Badalona
            </h3>

            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para casas y pisos:</strong> Sistemas inteligentes sin cables con instalación rápida y limpia.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para comercios:</strong> Protección avanzada con cámaras HD y control de accesos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Videovigilancia exterior e interior:</strong> Cámaras resistentes a la intemperie ideales para la zona costera.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Sistemas anti-okupación:</strong> Sensores específicos que detectan intrusiones cuando no estás.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Conexión a CRA 24/7:</strong> Central receptora de alarmas que actúa inmediatamente ante cualquier incidente.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Servicio en Todos los Barrios de Badalona
            </h3>

            <p className="text-gray-600 leading-relaxed mb-4">
              Cubrimos toda Badalona: <strong>Centre, Dalt de la Vila, Canyadó, Casagemes, La Pau, Gorg, Pomar, Progrés, Llefi, Bufalà, Montigalà</strong> y todas las urbanizaciones costeras. Instalamos y mantenemos sistemas de seguridad en cualquier punto del municipio.
            </p>

            <div className="bg-[#0A1628] text-white rounded-2xl p-8 my-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-[#E63946]" />
                <h4 className="text-2xl font-bold">Instalación Inmediata en Badalona</h4>
              </div>
              <p className="text-white/80 mb-6">
                Desplazamiento gratuito a Badalona. Valoración in situ sin compromiso. Instalación completa en 24-48 horas. ¡Empieza a proteger tu propiedad hoy mismo!
              </p>
              <a 
                href="tel:+34638109947"
                className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#d32f3c] text-white px-6 py-3 rounded-full font-semibold transition-all"
              >
                <Phone className="w-4 h-4" />
                Llamar: 638 10 99 47
              </a>
            </div>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Marcas Líderes en Seguridad
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              Solo instalamos equipos de las mejores marcas mundiales: <strong>Ajax Systems</strong> (alarmas inalámbricas inteligentes), <strong>Hikvision y Dahua</strong> (videovigilancia profesional) y <strong>DSC</strong> (sistemas de alarma tradicional probados). Todos con app móvil, alertas instantáneas y grabación en la nube.
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Presupuesto Sin Compromiso en Badalona
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Cada propiedad es diferente. Por eso ofrecemos un estudio personalizado gratuito para diseñar la solución de seguridad perfecta para ti. <strong>Sin permanencia.</strong> Precio transparente. Garantía total. Confía en los expertos en alarmas de Badalona.
            </p>
          </div>

          <div className="mt-16 bg-[#F8F9FC] rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6">Opiniones de Clientes en Badalona</h3>
            <div className="space-y-4 mb-8">
              <div className="p-6 bg-white rounded-xl border-l-4 border-[#E63946]">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#E63946]">★</span>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-3">
                  "Vivo en Montigalà y necesitaba seguridad para mi casa. La instalación fue rapidísima y ahora controlo todo desde el móvil. Muy recomendables."
                </p>
                <p className="text-sm font-semibold text-[#0A1628]">— Laura S., Montigalà (Badalona)</p>
              </div>
              <div className="p-6 bg-white rounded-xl border-l-4 border-gray-300">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#E63946]">★</span>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-3">
                  "Instalaron alarma y 4 cámaras en mi comercio del centro de Badalona. Profesionales, rápidos y el sistema funciona perfecto."
                </p>
                <p className="text-sm font-semibold text-[#0A1628]">— Carlos M., Centre (Badalona)</p>
              </div>
              <div className="p-6 bg-white rounded-xl border-l-4 border-gray-300">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#E63946]">★</span>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-3">
                  "Tengo piso cerca del mar y me preocupaba la okupación. El sistema AJAX me da tranquilidad total aunque esté de viaje."
                </p>
                <p className="text-sm font-semibold text-[#0A1628]">— Isabel R., La Pau (Badalona)</p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6 text-center">
              Solicita tu Presupuesto para Badalona
            </h3>
            <ContactForm />

            {/* Mapa de cobertura */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-[#0A1628] mb-4">Área de Servicio en Badalona</h3>
              <GoogleMapEmbed city="Badalona" query="Badalona, Barcelona, España" height="380px" />
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}