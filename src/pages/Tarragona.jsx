import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Shield, CheckCircle } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";

export default function Tarragona() {
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
              <span className="text-sm">Catalunya • Tarragona</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Instalación de Alarmas en Tarragona
            </h1>
            <p className="text-xl text-white/70 max-w-3xl">
              Protección integral para hogares y negocios en Tarragona. Sistemas de alarma avanzados con instalación profesional.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-[#0A1628] mb-6">
              Expertos en Sistemas de Seguridad en Tarragona
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              <strong>Tarragona</strong>, capital de la Costa Dorada y ciudad con patrimonio histórico excepcional, combina turismo, industria petroquímica y un fuerte sector comercial. La <strong>seguridad en Tarragona</strong> es esencial para proteger viviendas del casco antiguo, chalets costeros, naves industriales y todo tipo de negocios.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              En <strong>Premium Tech Security</strong> somos especialistas en <strong>instalación de alarmas en Tarragona</strong>, ofreciendo soluciones personalizadas para propiedades urbanas, segundas residencias en la costa y empresas de todos los sectores. Nuestro equipo local conoce perfectamente las necesidades de seguridad de Tarragona y su entorno.
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              ¿Por qué Instalar una Alarma en Tarragona?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {[
                "Protección de viviendas históricas",
                "Seguridad para chalets costeros",
                "Alarmas para sector turístico",
                "Protección industrial en polígonos",
                "Control remoto desde cualquier lugar",
                "Prevención de robos e intrusiones"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#F8F9FC] rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#E63946] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Servicios Completos en Tarragona
            </h3>

            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para viviendas:</strong> Sistemas inalámbricos inteligentes sin obras, con app móvil y control total.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para hoteles y apartamentos turísticos:</strong> Seguridad profesional con control de accesos y videovigilancia integrada.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Seguridad industrial:</strong> Protección avanzada para naves y polígonos del Camp de Tarragona.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Videovigilancia profesional:</strong> Cámaras 4K resistentes con visión nocturna, grabación continua y almacenamiento en la nube.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Central receptora 24/7:</strong> Monitorización continua con verificación y respuesta inmediata ante alertas.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Cobertura en Tarragona y Provincia
            </h3>

            <p className="text-gray-600 leading-relaxed mb-4">
              Servicio en Tarragona capital (<strong>Part Alta, Eixample, Torreforta, Sant Pere i Sant Pau, La Mora, Savinosa, Sant Salvador</strong>) y en toda la provincia: <strong>Reus, Cambrils, Salou, Vila-seca, Tortosa, El Vendrell, Valls, Amposta</strong> y todas las poblaciones del Tarragonès, Baix Penedès, Baix Camp y más.
            </p>

            <div className="bg-[#0A1628] text-white rounded-2xl p-8 my-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-[#E63946]" />
                <h4 className="text-2xl font-bold">Instalación Rápida en Tarragona</h4>
              </div>
              <p className="text-white/80 mb-6">
                Técnicos locales en Tarragona y provincia. Valoración gratuita sin compromiso. Instalación profesional en 24-48h adaptada a tu propiedad.
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
              Marcas Líderes en Seguridad
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              Solo instalamos equipos de las mejores marcas: <strong>Ajax Systems</strong> (alarmas inalámbricas de última generación), <strong>Hikvision</strong> (líder mundial en videovigilancia), <strong>Dahua Technology</strong> (innovación y calidad probada) y <strong>DSC</strong> (sistemas tradicionales de máxima fiabilidad).
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Todos con app móvil iOS/Android, notificaciones push instantáneas, batería de respaldo y conectividad dual (Internet + 4G). Compatible con domótica y smart home.
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Presupuesto Sin Compromiso en Tarragona
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Cada propiedad requiere un estudio personalizado. Ofrecemos valoración técnica gratuita con propuesta detallada y sin compromiso. <strong>Sin permanencia.</strong> Precio transparente. Garantía del fabricante. Confía en los especialistas en alarmas de Tarragona.
            </p>
          </div>

          <div className="mt-16 bg-[#F8F9FC] rounded-2xl p-8">
            <div className="mb-6 p-6 bg-white rounded-xl border-l-4 border-[#E63946]">
              <p className="text-sm text-gray-500 mb-2">Cliente satisfecho</p>
              <p className="text-gray-700 italic mb-3">
                "Protegieron mi casa en Salou con un sistema completo. La instalación fue muy profesional y ahora duermo tranquilo."
              </p>
              <p className="text-sm font-semibold text-[#0A1628]">— David L., Tarragona</p>
            </div>
            
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6 text-center">
              Solicita tu Presupuesto Gratis para Tarragona
            </h3>
            <ContactForm />
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}