import React from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";
import { motion } from "framer-motion";
import { Shield, MapPin, Phone } from "lucide-react";
import LocalitySEO from "../components/seo/LocalitySEO";
import { Link } from "react-router-dom";

export default function ElPratPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LocalitySEO
        city="El Prat de Llobregat"
        title="Alarmas y Cámaras en El Prat de Llobregat | Premium Tech"
        description="Instalación de alarmas y cámaras de seguridad en El Prat de Llobregat. Sin cuotas mensuales. Ajax y Hikvision. Presupuesto gratis 638 10 99 47."
        keywords="alarmas El Prat de Llobregat, instalación alarmas El Prat, sistemas seguridad El Prat, cámaras El Prat, videovigilancia El Prat"
        canonicalUrl="https://alarmasenbarcelona.com/ElPrat"
        lat={41.3253}
        lng={2.0958}
        pageUrl="https://alarmasenbarcelona.com/ElPrat"
      />
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0A1628] to-[#1a2642] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-[#C53030]/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-[#E63946]" />
              <span className="text-white text-sm font-semibold">El Prat de Llobregat</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Instalación de Alarmas en El Prat de Llobregat
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Instalamos alarmas y cámaras de seguridad en El Prat de Llobregat para pisos, comercios, oficinas y naves. Diseñamos el sistema según los accesos y zonas que necesitas vigilar, con control desde el móvil.
            </p>
            
            <a href="tel:+34638109947" className="inline-flex items-center gap-2 bg-[#C53030] hover:bg-[#9B2C2C] text-white px-8 py-4 rounded-full font-semibold">
              <Phone className="w-5 h-5" />
              Llamar Ahora: 638 10 99 47
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A1628] mb-8">Servicios en El Prat</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Shield className="w-12 h-12 text-[#E63946] mb-4" />
              <h3 className="text-xl font-bold mb-3">Alarmas para Hogares</h3>
              <p className="text-gray-600">Alarmas Ajax para pisos, casas y segundas residencias. Valoramos los puntos de entrada y los detectores que necesita cada inmueble; puedes recibir alertas en el móvil sin cuota obligatoria o solicitar conexión a una CRA como servicio opcional.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Shield className="w-12 h-12 text-[#E63946] mb-4" />
              <h3 className="text-xl font-bold mb-3">Seguridad para Empresas</h3>
              <p className="text-gray-600">Instalamos videovigilancia para comercios, oficinas y naves: estudiamos el cableado, la ubicación de las cámaras Hikvision o Dahua y la grabación en NVR. El tiempo de almacenamiento depende del número de cámaras, la calidad de imagen y la capacidad del disco.</p>
            </div>
          </div>
          <p className="mt-8 text-gray-700 text-base leading-relaxed">
            También instalamos sistemas para comunidades y zonas comunes, con asesoramiento sobre la ubicación de cámaras y la señalización de videovigilancia. Puedes consultar nuestras páginas de <Link to="/alarmas-barcelona" className="underline font-semibold">instalación de alarmas Ajax</Link> y <Link to="/camaras-barcelona" className="underline font-semibold">cámaras de seguridad profesionales</Link>, o pedirnos una visita de valoración sin compromiso.
          </p>
        </div>
      </section>

      <section id="contacto" className="py-20 bg-gradient-to-br from-[#0A1628] to-[#1a2642]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Contacta con Nosotros</h2>
          <ContactForm />
        </div>
      </section>

      <FooterSection />
    </div>
  );
}