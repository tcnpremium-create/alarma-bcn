import React from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import InteractiveMap from "../components/landing/InteractiveMap";
import { motion } from "framer-motion";
import { Shield, Award, Users, MapPin, CheckCircle, Phone, Mail } from "lucide-react";
import { Helmet } from "react-helmet-async";
import AdSenseDisplay from "../components/ads/AdSenseDisplay";
import AdSenseInFeed from "../components/ads/AdSenseInFeed";

const sobreSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Premium Tech Security",
  "description": "Empresa especializada en instalación de sistemas de seguridad en Barcelona y Catalunya. Más de 30 años de experiencia en alarmas, cámaras, videoporteros y control de accesos.",
  "url": "https://www.premiumtechsecurity.es/SobreNosotros",
  "telephone": "+34638109947",
  "email": "tcnpremium@gmail.com",
  "foundingDate": "1994",
  "areaServed": "Barcelona, Catalunya",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Barcelona",
    "addressRegion": "Catalunya",
    "addressCountry": "ES"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Seguridad",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Instalación de Alarmas AJAX" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Videovigilancia Hikvision" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Control de Accesos" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Videoporteros" } }
    ]
  }
};

export default function SobreNosotros() {
  const servicios = [
    {
      icon: Shield,
      title: "Instalación de Videoporteros",
      desc: "Soluciones avanzadas que permiten ver y comunicarse con los visitantes antes de abrir la puerta, aumentando la seguridad y la comodidad."
    },
    {
      icon: Shield,
      title: "Instalación de Cámaras de Seguridad",
      desc: "Sistemas de cámaras de alta calidad para monitorear tu propiedad o negocio las 24 horas, con acceso remoto y grabación de imágenes nítidas."
    },
    {
      icon: Shield,
      title: "Instalación de Alarmas",
      desc: "Sistemas de alarmas que protegen tu hogar o negocio de intrusos, con notificaciones en tiempo real y conectividad con los servicios de emergencia."
    },
    {
      icon: Shield,
      title: "Instalación de Control de Accesos",
      desc: "Soluciones eficientes y seguras para gestionar el acceso a propiedades, negocios e instalaciones industriales, asegurando un control total de las entradas."
    }
  ];

  const razones = [
    {
      title: "Experiencia y Profesionalismo",
      desc: "Contamos con un equipo de técnicos altamente capacitados, con años de experiencia en la instalación de sistemas de seguridad de calidad."
    },
    {
      title: "Soluciones Personalizadas",
      desc: "Entendemos que cada cliente tiene necesidades únicas, por lo que proporcionamos sistemas adaptados a tu hogar, negocio o industria."
    },
    {
      title: "Tecnología de Vanguardia",
      desc: "Trabajamos con las mejores marcas del mercado, como FERMAX para videoporteros, AJAX sistemas de alarma, y DAHUA o HIKVISION cámaras de seguridad de última tecnología."
    },
    {
      title: "Cobertura Local",
      desc: "Ofrecemos nuestros servicios en Barcelona, Sabadell, Badalona, Hospitalet, Cerdanyola del Vallés, Ripollet, Granollers, Rubí, Sentmenat, Santa Perpètua de Mogoda, Sant Just Desvern, entre otras localidades cercanas."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Sobre Nosotros | Premium Tech Security - Empresa de Seguridad en Barcelona</title>
        <meta name="description" content="Premium Tech Security — Instaladores de alarmas y cámaras de seguridad en Barcelona con 15+ años de experiencia. Sin cuotas. Tel: 638 10 99 47" />
        <link rel="canonical" href="https://www.premiumtechsecurity.es/SobreNosotros" />
        <script type="application/ld+json">{JSON.stringify(sobreSchema)}</script>
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#1a2642]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Sobre Premium Tech Security: Tu Empresa de Seguridad en Barcelona
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Más de 30 años instalando sistemas de seguridad profesionales para hogares, negocios e industrias en Barcelona y Catalunya
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-[#E63946]/10 rounded-full px-4 py-2 mb-6">
                <Award className="w-4 h-4 text-[#E63946]" />
                <span className="text-[#E63946] text-sm font-semibold">Más de 30 años de experiencia</span>
              </div>
              <h2 className="text-4xl font-bold text-[#0A1628] mb-6">
                Nuestra Misión
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                En <strong>Premium Tech Security</strong>, somos expertos en instalaciones avanzadas de seguridad para hogares, negocios e industrias.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Con más de <strong>30 años de experiencia en el sector</strong>, nos especializamos en la instalación de videoporteros, cámaras de seguridad, alarmas y sistemas de control de accesos en Barcelona y toda su área metropolitana.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nuestra misión es proporcionar <strong>tranquilidad y protección</strong> mediante sistemas de seguridad de última generación, fiables y fáciles de usar. Nos adaptamos a las necesidades particulares de cada cliente, ofreciendo soluciones personalizadas que superan las expectativas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Equipo Premium Tech Security"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Por Qué Elegirnos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#0A1628] mb-4">
              ¿Por Qué Elegirnos?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Somos tu mejor opción en sistemas de seguridad
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {razones.map((razon, index) => (
              <motion.div
                key={razon.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#E63946]/10 p-3 rounded-lg flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-[#E63946]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A1628] mb-3">
                      {razon.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {razon.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8"><AdSenseInFeed /></div>

      {/* Nuestros Servicios */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#0A1628] mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Soluciones integrales de seguridad adaptadas a tus necesidades
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {servicios.map((servicio, index) => {
              const Icon = servicio.icon;
              return (
                <motion.div
                  key={servicio.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-[#E63946]/30 transition-all hover:shadow-lg"
                >
                  <Icon className="w-12 h-12 text-[#E63946] mb-4" />
                  <h3 className="text-xl font-bold text-[#0A1628] mb-3">
                    {servicio.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {servicio.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calidad y Servicio */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#0A1628] mb-6">
              Compromiso con la Excelencia
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              En Premium Tech Security, nos aseguramos de que cada instalación cumpla con los más altos estándares de calidad y seguridad.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Trabajamos con tecnología de punta, lo que nos permite ofrecer un servicio de excelencia y garantizar la satisfacción de nuestros clientes. Además, contamos con un <strong>servicio postventa</strong> para que tu sistema siempre funcione correctamente.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ad Display */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8"><AdSenseDisplay /></div>

      {/* Mapa Interactivo + Contacto */}
      <section className="py-20 bg-gradient-to-br from-[#0A1628] to-[#1a2642]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Encuéntranos
            </h2>
            <p className="text-lg sm:text-xl text-white/80 mb-4 sm:mb-8">
              ¿Quieres mejorar la seguridad de tu propiedad o negocio?
            </p>
            <p className="text-base sm:text-lg text-white/70 mb-8 sm:mb-10">
              Contáctanos y nuestro equipo de expertos te ofrecerá una solución personalizada, ajustada a tus necesidades.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Mapa */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[400px] sm:h-[500px] lg:h-[600px] w-full"
            >
              <InteractiveMap />
            </motion.div>

            {/* Info de contacto */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 sm:p-8 border border-white/20">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Información de contacto</h3>
                
                <div className="space-y-4">
                  <a
                    href="tel:+34638109947"
                    className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
                  >
                    <div className="bg-[#E63946] p-3 rounded-lg group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">Teléfono</p>
                      <p className="text-white font-semibold text-lg">638 10 99 47</p>
                    </div>
                  </a>

                  <a
                    href="mailto:tcnpremium@gmail.com"
                    className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
                  >
                    <div className="bg-[#E63946] p-3 rounded-lg group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">Email</p>
                      <p className="text-white font-semibold text-sm sm:text-base break-all">tcnpremium@gmail.com</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="bg-[#E63946] p-3 rounded-lg flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">Zona de cobertura</p>
                      <p className="text-white font-semibold text-sm sm:text-base">Barcelona y área metropolitana</p>
                      <p className="text-white/70 text-xs sm:text-sm mt-2">
                        Sabadell, Badalona, Hospitalet, Cerdanyola, Ripollet, Granollers, Rubí, Sant Cugat y más
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-white/60 text-sm mb-4">Horario de atención</p>
                  <p className="text-white font-medium">Lunes a Viernes: 9:00 - 19:00</p>
                  <p className="text-white font-medium">Sábados: 10:00 - 14:00</p>
                  <p className="text-white/70 text-sm mt-2">Emergencias 24/7 disponibles</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}