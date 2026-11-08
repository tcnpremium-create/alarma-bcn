import React from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";
import { motion } from "framer-motion";
import { Shield, MapPin, Phone } from "lucide-react";
import LocalitySEO from "../components/seo/LocalitySEO";
import { Link } from "react-router-dom";

export default function ViladecansPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LocalitySEO
        city="Viladecans"
        title="Alarmas y Cámaras de Seguridad en Viladecans | Premium Tech"
        description="Instalación de alarmas y cámaras de seguridad en Viladecans. Sin cuotas mensuales. Ajax y Hikvision. Presupuesto gratis 638 10 99 47."
        keywords="alarmas Viladecans, instalación alarmas Viladecans, sistemas seguridad Viladecans, cámaras Viladecans, videovigilancia Viladecans"
        canonicalUrl="https://alarmasenbarcelona.com/Viladecans"
        lat={41.3153}
        lng={2.0192}
        pageUrl="https://alarmasenbarcelona.com/Viladecans"
      />
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0A1628] to-[#1a2642]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-[#C53030]/20 rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-[#E63946]" />
              <span className="text-white text-sm font-semibold">Viladecans</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Alarmas en Viladecans
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Instalamos alarmas Ajax, cámaras de seguridad y sistemas de videovigilancia en Viladecans para viviendas, comercios y comunidades. Te ayudamos a elegir equipos según los accesos, el espacio y el presupuesto.
            </p>
            
            <a href="tel:+34638109947" className="inline-flex items-center gap-2 bg-[#C53030] text-white px-8 py-4 rounded-full font-semibold">
              <Phone className="w-5 h-5" />
              638 10 99 47
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios en Viladecans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <Shield className="w-10 h-10 text-[#E63946] mb-4" />
              <h3 className="text-xl font-bold mb-2">Alarmas Hogar</h3>
              <p className="text-gray-600">Alarmas Ajax para pisos, casas y segundas residencias, con detectores de movimiento y contactos magnéticos según cada acceso. Avisos al móvil sin cuota obligatoria y posibilidad de contratar una central receptora.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <Shield className="w-10 h-10 text-[#E63946] mb-4" />
              <h3 className="text-xl font-bold mb-2">Alarmas Negocio</h3>
              <p className="text-gray-600">Soluciones para locales, oficinas y pequeños negocios. Revisamos accesos, horarios de uso y zonas sensibles para proponer una instalación ajustada al inmueble y a las necesidades de seguridad.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <Shield className="w-10 h-10 text-[#E63946] mb-4" />
              <h3 className="text-xl font-bold mb-2">Videovigilancia</h3>
              <p className="text-gray-600">Cámaras Hikvision o Dahua para entradas, locales y zonas comunes, con grabación local en NVR y visualización desde el móvil. Calculamos la capacidad del disco y comprobamos el tendido de cable antes de presupuestar.</p>
            </div>
          </div>
          <p className="mt-8 text-gray-700 text-base leading-relaxed">
            La instalación se plantea para cada propiedad: número de sensores y cámaras, ubicaciones, acceso remoto y mantenimiento posterior. Si buscas una solución concreta, consulta nuestro servicio de <Link to="/alarmas-barcelona" className="underline font-semibold">instalación de alarmas</Link> o el de <Link to="/camaras-barcelona" className="underline font-semibold">instalación de cámaras de seguridad</Link>. También podemos preparar un presupuesto combinado.
          </p>
        </div>
      </section>

      <section id="contacto" className="py-20 bg-[#0A1628]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Solicita Presupuesto</h2>
          <ContactForm />
        </div>
      </section>

      <FooterSection />
    </div>
  );
}