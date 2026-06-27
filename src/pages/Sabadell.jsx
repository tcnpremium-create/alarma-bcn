import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";
import LocalitySEO from "../components/seo/LocalitySEO";
import GoogleMapEmbed from "../components/landing/GoogleMapEmbed";

export default function Sabadell() {
  return (
    <div className="min-h-screen bg-white">
      <LocalitySEO
        city="Sabadell"
        title="Alarmas en Sabadell | Instalación Sistemas Seguridad Profesional 24/7"
        description="Instalación de alarmas en Sabadell. Sistemas AJAX inalámbricos, videovigilancia Hikvision 4K, control de accesos. Cobertura toda Sabadell ☎ 638 10 99 47."
        keywords="alarmas Sabadell, instalación alarmas Sabadell, sistemas seguridad Sabadell, cámaras Sabadell, videovigilancia Sabadell, alarma negocio Sabadell"
        canonicalUrl="https://alarmasenbarcelona.com/Sabadell"
        lat={41.5432}
        lng={2.1094}
        pageUrl="https://alarmasenbarcelona.com/Sabadell"
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
              <span className="text-sm">Catalunya • Sabadell</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Instalación de Alarmas en Sabadell
            </h1>
            <p className="text-xl text-white/70 max-w-3xl">
              Sistemas de seguridad avanzados para hogares y empresas en Sabadell. Protección profesional con instalación en 24-48h.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-[#0A1628] mb-6">
              Expertos en Sistemas de Alarmas en Sabadell
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              <strong>Sabadell</strong>, capital del Vallès Occidental y quinta ciudad más importante de Catalunya, destaca por su fuerte tejido industrial, comercial y residencial. La <strong>seguridad en Sabadell</strong> es esencial para proteger tanto las viviendas como las numerosas empresas y comercios del municipio.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              En <strong>Premium Tech Security</strong> llevamos más de 10 años instalando <strong>alarmas en Sabadell</strong>, protegiendo casas unifamiliares, pisos, naves industriales y todo tipo de negocios. Conocemos las particularidades de cada zona y ofrecemos soluciones de seguridad personalizadas adaptadas a las necesidades reales de cada cliente.
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Ventajas de Instalar una Alarma en Sabadell
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {[
                "Protección de viviendas unifamiliares y adosados",
                "Seguridad industrial en polígonos",
                "Alarmas para comercios del centro histórico",
                "Control remoto desde tu móvil",
                "Prevención de robos y okupación",
                "Respuesta inmediata ante intrusiones"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#F8F9FC] rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#E63946] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Soluciones Completas de Seguridad en Sabadell
            </h3>

            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para viviendas:</strong> Sistemas inalámbricos inteligentes sin necesidad de obras, con app móvil iOS y Android.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para comercios:</strong> Protección avanzada con cámaras, sensores perimetrales y control de accesos. <Link to={createPageUrl("Blog")} className="text-[#E63946] hover:underline">Ver guía de seguridad comercial</Link>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para naves industriales:</strong> Sistemas robustos diseñados para grandes espacios en los polígonos de Sabadell.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Videovigilancia HD:</strong> Cámaras 4K con visión nocturna, detección inteligente y grabación en la nube.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Conexión a CRA 24/7:</strong> Central receptora de alarmas que verifica y actúa ante cualquier alerta en tiempo real.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Cobertura en Todos los Barrios de Sabadell
            </h3>

            <p className="text-gray-600 leading-relaxed mb-4">
              Operamos en toda Sabadell: <strong>Centre, Gràcia, Creu Alta, Can Puiggener, La Concòrdia, Can Oriac, Torre-romeu, Can Llong, Castellarnau, Can Feu, Can Rull, Ca n'Oriac</strong> y todos los polígonos industriales. Servicio técnico local con respuesta rápida en cualquier punto del municipio.
            </p>

            <div className="bg-[#0A1628] text-white rounded-2xl p-8 my-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-[#E63946]" />
                <h4 className="text-2xl font-bold">Instalación Rápida en Sabadell</h4>
              </div>
              <p className="text-white/80 mb-6">
                Estudio de seguridad gratuito en Sabadell. Instalación profesional en 24-48h sin necesidad de obras. Técnicos certificados con amplia experiencia local.
              </p>
              <a 
                href="tel:+34638109947"
                className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#d32f3c] text-white px-6 py-3 rounded-full font-semibold transition-all"
              >
                <Phone className="w-4 h-4" />
                Llama: 638 10 99 47
              </a>
            </div>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Marcas Líderes en Tecnología de Seguridad
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              Solo instalamos equipos de las mejores marcas mundiales: <strong>Ajax Systems</strong> (sistemas inalámbricos con batería de larga duración), <strong>Hikvision</strong> (líder en videovigilancia profesional), <strong>Dahua Technology</strong> (innovación en cámaras inteligentes) y <strong>DSC</strong> (alarmas tradicionales de máxima fiabilidad). Todas con app móvil, notificaciones push instantáneas y compatibilidad con smart home.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              <Link to={createPageUrl("Blog")} className="text-[#E63946] hover:underline font-medium">
                Lee nuestro artículo comparativo: Hikvision vs Dahua para elegir la mejor opción →
              </Link>
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Presupuesto Sin Compromiso en Sabadell
            </h3>

            <p className="text-gray-600 leading-relaxed mb-4">
              Cada propiedad es única. Por eso ofrecemos un estudio de seguridad personalizado totalmente gratuito. Analizamos tu vivienda o negocio y diseñamos la solución perfecta según tus necesidades y presupuesto.
            </p>

            <p className="text-gray-600 leading-relaxed">
              <strong>Sin permanencia obligatoria.</strong> Contratos claros y transparentes. Precio cerrado desde el primer día. Mantenimiento opcional incluido. Confía en los profesionales de la seguridad en Sabadell.
            </p>
          </div>

          <div className="mt-16 bg-[#F8F9FC] rounded-2xl p-8">
            <div className="mb-6 p-6 bg-white rounded-xl border-l-4 border-[#E63946]">
              <p className="text-sm text-gray-500 mb-2">Cliente verificado</p>
              <p className="text-gray-700 italic mb-3">
                "Instalaron el sistema completo en mi casa de Creu Alta en menos de un día. El servicio fue excelente y ahora me siento mucho más tranquila."
              </p>
              <p className="text-sm font-semibold text-[#0A1628]">— Montse P., Sabadell</p>
            </div>
            
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6 text-center">
              Solicita tu Presupuesto Gratis para Sabadell
            </h3>
            <ContactForm />

            {/* Mapa de cobertura */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-[#0A1628] mb-4">Área de Servicio en Sabadell</h3>
              <GoogleMapEmbed city="Sabadell" query="Sabadell, Barcelona, España" height="380px" />
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}