import React from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";
import { motion } from "framer-motion";
import { Shield, MapPin, Phone } from "lucide-react";

export default function CastelldefelsPage() {
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
              <span className="text-white text-sm font-semibold">Castelldefels</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Sistemas de Seguridad en Castelldefels
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Protección premium para viviendas de lujo y segundas residencias en la costa. Alarmas inteligentes y videovigilancia avanzada.
            </p>
            
            <a href="tel:+34638109947" className="inline-flex items-center gap-2 bg-[#E63946] text-white px-8 py-4 rounded-full font-semibold">
              <Phone className="w-5 h-5" />
              Llámanos: 638 10 99 47
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Seguridad Costera Premium</h2>
              <p className="text-lg text-gray-700 mb-4">
                Castelldefels requiere soluciones especiales adaptadas al entorno costero. Nuestros sistemas resisten la humedad y salinidad mientras ofrecen máxima protección.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#E63946]" />
                  <span>Equipos resistentes a ambientes marinos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#E63946]" />
                  <span>Protección para segundas residencias</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#E63946]" />
                  <span>Control remoto desde cualquier lugar</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80"
                alt="Seguridad Castelldefels"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-20 bg-[#0A1628]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Contacto</h2>
          <ContactForm />
        </div>
      </section>

      <FooterSection />
    </div>
  );
}