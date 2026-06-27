import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Shield, CheckCircle } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";

export default function Lleida() {
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
              <span className="text-sm">Catalunya • Lleida</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Instalación de Alarmas en Lleida
            </h1>
            <p className="text-xl text-white/70 max-w-3xl">
              Sistemas de seguridad profesionales para hogares, empresas y explotaciones agrícolas en Lleida. Protección 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-[#0A1628] mb-6">
              Empresa Líder en Alarmas en Lleida
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              <strong>Lleida</strong>, capital de las Terres de Lleida y principal polo económico del interior de Catalunya, destaca por su sector agrícola, logístico e industrial. La <strong>seguridad en Lleida</strong> es fundamental para proteger viviendas urbanas, masías, naves industriales y explotaciones agrícolas de gran extensión.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              En <strong>Premium Tech Security</strong> somos especialistas en <strong>instalación de alarmas en Lleida</strong>, ofreciendo soluciones adaptadas tanto a propiedades urbanas como a entornos rurales extensos. Nuestro equipo técnico tiene amplia experiencia en todo tipo de instalaciones en Lleida y comarca.
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Ventajas de Instalar una Alarma en Lleida
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {[
                "Protección de viviendas urbanas",
                "Seguridad para masías y casas rurales",
                "Alarmas para naves agrícolas",
                "Protección de explotaciones",
                "Sistemas para grandes extensiones",
                "Control remoto desde cualquier lugar"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-[#F8F9FC] rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#E63946] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Soluciones de Seguridad en Lleida
            </h3>

            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para viviendas:</strong> Sistemas inalámbricos inteligentes con app móvil y control total desde cualquier lugar.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Alarmas para masías y propiedades rurales:</strong> Protección perimetral extensa con detectores de largo alcance y cámaras exterior.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Seguridad agrícola e industrial:</strong> Sistemas robustos para naves, almacenes y explotaciones con protección específica para maquinaria y equipamiento.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Videovigilancia profesional:</strong> Cámaras 4K con visión nocturna avanzada, grabación continua y almacenamiento seguro.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E63946] mt-1">•</span>
                <span><strong>Central receptora 24/7:</strong> Monitorización constante con respuesta inmediata y aviso a propietario y autoridades.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Cobertura en Lleida y Provincia
            </h3>

            <p className="text-gray-600 leading-relaxed mb-4">
              Operamos en Lleida capital (<strong>Centre Històric, Cappont, La Bordeta, Pardinyes, Balàfia, Universitat, Magraners</strong>) y en toda la provincia: <strong>Balaguer, Mollerussa, Tàrrega, La Seu d'Urgell, Cervera, Bellpuig, Alcarràs, Aitona</strong> y todas las comarcas del Segrià, Pla d'Urgell, Noguera, Urgell, Alt Urgell y más.
            </p>

            <div className="bg-[#0A1628] text-white rounded-2xl p-8 my-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-[#E63946]" />
                <h4 className="text-2xl font-bold">Instalación Profesional en Lleida</h4>
              </div>
              <p className="text-white/80 mb-6">
                Servicio técnico en Lleida capital y toda la provincia. Experiencia en instalaciones rurales y urbanas. Instalación en 24-48h adaptada a cada propiedad.
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
              Tecnología Avanzada para Entornos Exigentes
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              Instalamos exclusivamente equipos de las mejores marcas: <strong>Ajax Systems</strong> (alcance extendido ideal para masías y grandes propiedades), <strong>Hikvision</strong> (videovigilancia profesional resistente), <strong>Dahua Technology</strong> (cámaras con IA y detección avanzada) y <strong>DSC</strong> (alarmas tradicionales de máxima fiabilidad).
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Todos los sistemas incluyen conectividad dual (WiFi + 4G), batería de respaldo, app móvil multiplataforma y alertas instantáneas. Especialmente diseñados para funcionar en condiciones extremas de temperatura y entornos rurales.
            </p>

            <h3 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">
              Presupuesto Personalizado en Lleida
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Cada propiedad en Lleida tiene características únicas. Ofrecemos estudio de seguridad gratuito con presupuesto detallado y sin compromiso. <strong>Sin permanencia.</strong> Precio transparente. Garantía total. Confía en los expertos en seguridad de Lleida.
            </p>
          </div>

          <div className="mt-16 bg-[#F8F9FC] rounded-2xl p-8">
            <div className="mb-6 p-6 bg-white rounded-xl border-l-4 border-[#E63946]">
              <p className="text-sm text-gray-500 mb-2">Opinión verificada</p>
              <p className="text-gray-700 italic mb-3">
                "Protegieron nuestra explotación agrícola con un sistema completo. La instalación fue perfecta y ahora controlamos todo desde el móvil."
              </p>
              <p className="text-sm font-semibold text-[#0A1628]">— Pere R., Lleida</p>
            </div>
            
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6 text-center">
              Solicita tu Presupuesto Gratis para Lleida
            </h3>
            <ContactForm />
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}