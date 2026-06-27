import React from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";
import { motion } from "framer-motion";
import { Shield, MapPin, Phone, CheckCircle } from "lucide-react";

export default function ElPratPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0A1628] to-[#1a2642] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-[#E63946]/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-[#E63946]" />
              <span className="text-white text-sm font-semibold">El Prat de Llobregat</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Instalación de Alarmas en El Prat de Llobregat
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Protección profesional para hogares y negocios cerca del aeropuerto. Sistemas de seguridad con respuesta inmediata 24/7.
            </p>
            
            <a href="tel:+34638109947" className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#d32f3c] text-white px-8 py-4 rounded-full font-semibold">
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
              <p className="text-gray-600">Protección completa para viviendas en El Prat con tecnología inalámbrica de última generación.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Shield className="w-12 h-12 text-[#E63946] mb-4" />
              <h3 className="text-xl font-bold mb-3">Seguridad para Empresas</h3>
              <p className="text-gray-600">Sistemas profesionales para naves industriales y comercios en la zona del aeropuerto.</p>
            </div>
          </div>
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