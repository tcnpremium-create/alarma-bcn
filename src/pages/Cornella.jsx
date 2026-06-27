import React, { useEffect } from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ContactForm from "../components/landing/ContactForm";
import { motion } from "framer-motion";
import { Shield, Clock, MapPin, Phone, Mail, CheckCircle } from "lucide-react";

export default function CornellaPage() {
  useEffect(() => {
    document.title = "Alarmas en Cornellà de Llobregat | Instalación Profesional 24/7";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        {/* Hero Local */}
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
                <span className="text-white text-sm font-semibold">Servicio en Cornellà de Llobregat</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Instalación de Alarmas en Cornellà de Llobregat
              </h1>
              
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Protección profesional para hogares y negocios en Cornellà. Sistemas de seguridad avanzados con técnicos certificados y respuesta 24/7.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="tel:+34638109947" className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#d32f3c] text-white px-8 py-4 rounded-full font-semibold transition-all">
                  <Phone className="w-5 h-5" />
                  638 10 99 47
                </a>
                <a href="#contacto" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold backdrop-blur-sm transition-all">
                  Presupuesto Gratis
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Servicios en Cornellà */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-4">
                Servicios de Seguridad en Cornellà
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Soluciones completas de seguridad adaptadas a las necesidades de Cornellà de Llobregat
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Alarmas para Viviendas",
                  description: "Protección integral para pisos y casas en Cornellà. Sensores de última generación y control remoto desde tu móvil.",
                  icon: Shield
                },
                {
                  title: "Alarmas para Negocios",
                  description: "Seguridad profesional para comercios, oficinas y naves industriales en el polígono de Cornellà.",
                  icon: Shield
                },
                {
                  title: "Videovigilancia HD",
                  description: "Cámaras de alta definición para interior y exterior. Grabación continua y acceso remoto 24/7.",
                  icon: Shield
                },
                {
                  title: "Control de Accesos",
                  description: "Cerraduras inteligentes y sistemas biométricos para máxima seguridad en accesos.",
                  icon: Shield
                },
                {
                  title: "Central Receptora",
                  description: "Conexión a central de alarmas con respuesta inmediata ante cualquier incidencia.",
                  icon: Clock
                },
                {
                  title: "Mantenimiento",
                  description: "Revisiones periódicas y asistencia técnica para garantizar el correcto funcionamiento.",
                  icon: Shield
                }
              ].map((servicio, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <servicio.icon className="w-12 h-12 text-[#E63946] mb-4" />
                  <h3 className="text-xl font-bold text-[#0A1628] mb-3">{servicio.title}</h3>
                  <p className="text-gray-600">{servicio.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Por qué elegirnos en Cornellà */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-6">
                  Tu Empresa de Seguridad de Confianza en Cornellà
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Con años de experiencia en Cornellà de Llobregat, conocemos perfectamente las necesidades de seguridad de la zona. Desde el centro urbano hasta las áreas industriales, ofrecemos soluciones personalizadas.
                </p>
                <ul className="space-y-4">
                  {[
                    "Técnicos certificados con experiencia en Cornellà",
                    "Instalación profesional en menos de 24h",
                    "Cobertura total: centro, polígonos y zonas residenciales",
                    "Atención personalizada en catalán y castellano",
                    "Precios competitivos sin compromiso",
                    "Garantía total en equipos y mano de obra"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80"
                  alt="Instalación de alarmas en Cornellà"
                  className="rounded-xl w-full h-auto shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonios locales */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-12 text-center">
              Opiniones de Clientes en Cornellà
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "María G.",
                  barrio: "Cornellà Centre",
                  text: "Instalación rápida y profesional. El técnico me explicó todo perfectamente. Muy contenta con el servicio.",
                  rating: 5
                },
                {
                  name: "Josep M.",
                  barrio: "Almeda",
                  text: "Tengo alarma en mi negocio desde hace un año. Funciona perfectamente y el servicio de atención es excelente.",
                  rating: 5
                },
                {
                  name: "Laura S.",
                  barrio: "Sant Ildefons",
                  text: "Muy profesionales. Me asesoraron bien sobre qué sistema necesitaba para mi casa. Totalmente recomendable.",
                  rating: 5
                }
              ].map((testimonio, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonio.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonio.text}"</p>
                  <div>
                    <div className="font-semibold text-[#0A1628]">{testimonio.name}</div>
                    <div className="text-sm text-gray-500">{testimonio.barrio}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mapa */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-8 text-center">
              Nuestra Ubicación en Cornellà
            </h2>
            <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-xl h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11972.345678!2d2.0745!3d41.3579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4981c6b3c3d5b%3A0x4c8a8c8c8c8c8c8c!2sCornell%C3%A0%20de%20Llobregat%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Mapa de Cornellà de Llobregat"
              />
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-20 bg-gradient-to-br from-[#0A1628] to-[#1a2642]">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Solicita tu Presupuesto Gratis
              </h2>
              <p className="text-lg text-white/80">
                Atendemos en Cornellà de Llobregat y alrededores
              </p>
            </motion.div>
            <ContactForm />
          </div>
        </section>

        <FooterSection />
      </div>
  );
}