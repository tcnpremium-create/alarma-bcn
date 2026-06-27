import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Shield, CheckCircle } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";

export default function Girona() {
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
              <span className="text-sm">Catalunya • Girona</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Instalación de Alarmas en Girona
            </h1>
            <p className="text-xl text-white/70 max-w-3xl">
              Sistemas de seguridad profesionales para hogares y negocios en Girona y provincia. Protección 24/7 con tecnología líder.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-[#0A1628] mb-6">
              Empresa Especializada en Alarmas en Girona
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              <strong>Girona</strong>, capital de provincia y puerta de entrada a la Costa Brava, combina un casco antiguo histórico con zonas residenciales modernas y un potente sector turístico y comercial. La <strong>seguridad en Girona</strong> es fundamental para proteger tanto propiedades urbanas como masías y casas rurales de la provincia.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              En <strong>Premium Tech Security</strong> somos especialistas en <strong>instalación de alarmas en Girona</strong>, ofreciendo soluciones para viviendas, hoteles, restaurantes, comercios y propiedades rurales. Nuestro equipo técnico conoce perfectamente las necesidades de seguridad tanto de la capital como de poblaciones de toda la provincia.
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Ventajas de Instalar una Alarma en Girona
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {[
                "Protección de viviendas en casco antiguo",
                "Seguridad para masías y casas rurales",
                "Alarmas para hoteles y turismo",
                "Protección de comercios",
                "Sistemas para grandes propiedades",
                "Conexión remota desde cualquier lugar"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#F8F9FC] rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#E63946] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Soluciones de Seguridad en Girona
            </h3>

            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para viviendas urbanas:</strong> Sistemas inalámbricos discretos ideales para pisos y casas en Girona capital.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para masías y propiedades rurales:</strong> Protección perimetral extensa, cámaras de largo alcance y detectores de movimiento para grandes espacios.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Seguridad para hoteles y restaurantes:</strong> Control de accesos, videovigilancia profesional y alarmas zonificadas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Videovigilancia HD:</strong> Cámaras 4K con visión nocturna avanzada, grabación continua y almacenamiento en la nube.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Central receptora 24/7:</strong> Monitorización constante con respuesta inmediata ante cualquier alerta.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Cobertura en Girona y Provincia
            </h3>

            <p className="text-gray-600 leading-relaxed mb-4">
              Operamos en Girona capital (<strong>Barri Vell, Eixample, Santa Eugènia, Montilivi, Can Gibert, Palau, Fontajau, Pedret</strong>) y en toda la provincia: <strong>Figueres, Lloret de Mar, Blanes, Olot, Palafrugell, Sant Feliu de Guíxols, Roses</strong> y todas las poblaciones del Empordà, La Selva, El Gironès y más.
            </p>

            <div className="bg-[#0A1628] text-white rounded-2xl p-8 my-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-[#E63946]" />
                <h4 className="text-2xl font-bold">Instalación Profesional en Girona</h4>
              </div>
              <p className="text-white/80 mb-6">
                Servicio en Girona capital y toda la provincia. Técnicos locales con amplia experiencia. Instalación en 24-48h adaptada a cada tipo de propiedad.
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
              Tecnología de Máxima Calidad
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              Trabajamos exclusivamente con las marcas líderes: <strong>Ajax Systems</strong> (sistemas inalámbricos con alcance extendido ideal para masías), <strong>Hikvision</strong> (videovigilancia profesional de grado militar), <strong>Dahua Technology</strong> (cámaras con IA y reconocimiento facial) y <strong>DSC</strong> (alarmas tradicionales de máxima fiabilidad).
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Todos los sistemas incluyen app móvil multiplataforma, alertas instantáneas, batería de respaldo y conectividad dual. Integración con domótica disponible.
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Presupuesto Personalizado en Girona
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Cada propiedad en Girona tiene características únicas. Ofrecemos estudio de seguridad gratuito con presupuesto detallado y sin compromiso. <strong>Sin permanencia obligatoria.</strong> Contratos transparentes. Precio cerrado. Confía en los profesionales de la seguridad en Girona.
            </p>
          </div>

          <div className="mt-16 bg-[#F8F9FC] rounded-2xl p-8">
            <div className="mb-6 p-6 bg-white rounded-xl border-l-4 border-[#E63946]">
              <p className="text-sm text-gray-500 mb-2">Testimonio verificado</p>
              <p className="text-gray-700 italic mb-3">
                "Instalaron el sistema de seguridad en nuestra masía cerca de Girona. El servicio fue excelente y ahora tenemos control total desde Barcelona."
              </p>
              <p className="text-sm font-semibold text-[#0A1628]">— Joan M., Girona</p>
            </div>
            
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6 text-center">
              Solicita tu Presupuesto Gratis para Girona
            </h3>
            <ContactForm />
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}