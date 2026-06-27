import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";

export default function Mataro() {
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
              <span className="text-sm">Catalunya • Mataró</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Instalación de Alarmas en Mataró
            </h1>
            <p className="text-xl text-white/70 max-w-3xl">
              Protección integral para hogares y negocios en Mataró. Sistemas de alarma inteligentes con tecnología de vanguardia.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-[#0A1628] mb-6">
              Empresa Líder en Alarmas en Mataró
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              <strong>Mataró</strong>, capital del Maresme y puerta de entrada a la Costa Brava, es una ciudad costera con gran actividad turística, comercial y residencial. La <strong>seguridad en Mataró</strong> es prioritaria tanto para viviendas de primera residencia como para segundas residencias cerca de la playa.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              En <strong>Premium Tech Security</strong> somos especialistas en <strong>instalación de alarmas en Mataró</strong>, ofreciendo soluciones diseñadas específicamente para viviendas costeras, apartamentos turísticos, comercios del centro y todo tipo de negocios. Nuestro equipo local conoce perfectamente las necesidades de seguridad de la zona.
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              ¿Por qué Instalar una Alarma en Mataró?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {[
                "Protección de segundas residencias",
                "Seguridad para apartamentos turísticos",
                "Alarmas resistentes a ambiente marino",
                "Control remoto durante ausencias",
                "Prevención de okupación",
                "Protección de comercios del paseo"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#F8F9FC] rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#E63946] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Servicios de Seguridad en Mataró
            </h3>

            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para viviendas:</strong> Sistemas inalámbricos adaptados a clima costero, sin mantenimiento complejo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para segundas residencias:</strong> Ideal si no vives todo el año en Mataró. Control total desde tu móvil. <Link to={createPageUrl("Blog")} className="text-[#E63946] hover:underline">Lee nuestra guía completa →</Link></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Videovigilancia exterior:</strong> Cámaras resistentes con protección IP67, visión nocturna y detección de movimiento inteligente.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Sistemas anti-okupación:</strong> Detección inmediata de accesos no autorizados y alerta en tiempo real.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Central receptora 24/7:</strong> Monitorización continua con verificación y aviso a propietario y autoridades.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Cobertura en Toda Mataró
            </h3>

            <p className="text-gray-600 leading-relaxed mb-4">
              Damos servicio en todos los barrios de Mataró: <strong>Centre, Havana, Cerdanyola, Pla d'en Boet, Rocafonda, Molins, Cirera, La Llàntia, El Palau, Eixample</strong> y todas las urbanizaciones costeras. Instalación rápida en cualquier zona del municipio.
            </p>

            <div className="bg-[#0A1628] text-white rounded-2xl p-8 my-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-[#E63946]" />
                <h4 className="text-2xl font-bold">Instalación Express en Mataró</h4>
              </div>
              <p className="text-white/80 mb-6">
                Desplazamiento a Mataró en el mismo día. Valoración in situ gratuita. Instalación profesional en 24-48h adaptada a ambiente costero.
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
              Tecnología Avanzada Resistente al Clima Marino
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              En zonas costeras como Mataró, es fundamental instalar equipos preparados para la humedad y la salinidad. Trabajamos con <strong>Ajax Systems</strong> (equipos inalámbricos con protección avanzada), <strong>Hikvision</strong> (cámaras con certificación marina IP67), <strong>Dahua</strong> (tecnología anti-corrosión) y <strong>DSC</strong> (alarmas probadas en ambientes exigentes).
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Todos nuestros sistemas incluyen batería de respaldo, conectividad dual (WiFi + 4G) y app móvil con control total. Integración con Alexa y Google Home disponible.
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Presupuesto Personalizado en Mataró
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Cada propiedad requiere un estudio específico. Ofrecemos valoración gratuita con propuesta detallada y sin compromiso. <strong>Sin permanencia.</strong> Precio fijo. Mantenimiento preventivo incluido. Confía en los expertos en seguridad de Mataró.
            </p>
          </div>

          <div className="mt-16 bg-[#F8F9FC] rounded-2xl p-8">
            <div className="mb-6 p-6 bg-white rounded-xl border-l-4 border-[#E63946]">
              <p className="text-sm text-gray-500 mb-2">Opinión verificada</p>
              <p className="text-gray-700 italic mb-3">
                "Protegieron mi casa de verano cerca de la playa. El sistema funciona perfectamente y puedo controlarlo desde Barcelona sin problemas."
              </p>
              <p className="text-sm font-semibold text-[#0A1628]">— Carles F., Mataró</p>
            </div>
            
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6 text-center">
              Solicita tu Presupuesto Gratis para Mataró
            </h3>
            <ContactForm />
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}