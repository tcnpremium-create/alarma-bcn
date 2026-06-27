import React from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";
import { motion } from "framer-motion";
import { Shield, MapPin, Phone } from "lucide-react";

export default function ViladecansPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0A1628] to-[#1a2642]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-[#E63946]/20 rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-[#E63946]" />
              <span className="text-white text-sm font-semibold">Viladecans</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Alarmas en Viladecans
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Instalación profesional de sistemas de seguridad en Viladecans. Protege tu hogar o negocio con tecnología avanzada.
            </p>
            
            <a href="tel:+34638109947" className="inline-flex items-center gap-2 bg-[#E63946] text-white px-8 py-4 rounded-full font-semibold">
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
              <p className="text-gray-600">Sistemas completos para viviendas</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <Shield className="w-10 h-10 text-[#E63946] mb-4" />
              <h3 className="text-xl font-bold mb-2">Alarmas Negocio</h3>
              <p className="text-gray-600">Protección para comercios</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <Shield className="w-10 h-10 text-[#E63946] mb-4" />
              <h3 className="text-xl font-bold mb-2">Videovigilancia</h3>
              <p className="text-gray-600">Cámaras HD profesionales</p>
            </div>
          </div>
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