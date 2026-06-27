import React from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";
import { motion } from "framer-motion";
import { Shield, MapPin, Phone, CheckCircle } from "lucide-react";

export default function SantCugatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0A1628] to-[#1a2642] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-[#E63946]/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-[#E63946]" />
              <span className="text-white text-sm font-semibold">Servicio en Sant Cugat del Vallès</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Alarmas Premium en Sant Cugat del Vallès
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Sistemas de seguridad de alta gama para viviendas y negocios en Sant Cugat. Tecnología avanzada adaptada a zonas residenciales exclusivas.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+34638109947" className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#d32f3c] text-white px-8 py-4 rounded-full font-semibold">
                <Phone className="w-5 h-5" />
                638 10 99 47
              </a>
              <a href="#contacto" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold backdrop-blur-sm">
                Presupuesto Gratis
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-12 text-center">
            Seguridad Premium en Sant Cugat
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                Sant Cugat del Vallès es una zona residencial de alto nivel que requiere soluciones de seguridad a la altura. Nuestros sistemas se adaptan perfectamente a chalets, áticos y negocios premium de la zona.
              </p>
              <ul className="space-y-4">
                {[
                  "Sistemas discretos de alta tecnología",
                  "Integración domótica para smart homes",
                  "Videovigilancia 4K con visión nocturna",
                  "Cerraduras inteligentes biométricas",
                  "Central receptora con respuesta prioritaria",
                  "Instalación invisible sin obras"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80"
                alt="Alarmas en Sant Cugat"
                className="rounded-xl w-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-20 bg-gradient-to-br from-[#0A1628] to-[#1a2642]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 text-center">
            Solicita Presupuesto en Sant Cugat
          </h2>
          <ContactForm />
        </div>
      </section>

      <FooterSection />
    </div>
  );
}