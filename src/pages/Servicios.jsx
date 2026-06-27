import React, { useEffect } from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import SEOHead from "../components/seo/SEOHead";
import { motion } from "framer-motion";
import { Shield, Camera, Fingerprint, MonitorPlay, Bell, Home, Building2, Factory, CheckCircle, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";


const servicios = [
{
  icon: Shield,
  title: "Instalación de Alarmas",
  subtitle: "Sistemas inteligentes para tu máxima seguridad",
  description: "Protege tu hogar o negocio con alarmas de última generación AJAX. Detectores de movimiento inmunes a mascotas, sensores de apertura magnéticos, sirenas potentes y notificaciones instantáneas en tu móvil. Sistema antijamming y anti-sabotaje para máxima fiabilidad.",
  beneficios: [
    "Notificaciones push en tiempo real",
    "Conexión a central receptora 24/7",
    "Inmunidad a mascotas hasta 20kg",
    "Instalación profesional incluida",
    "Batería de respaldo 12-24h",
    "Control total desde app móvil",
    "Sistema antijamming integrado",
    "Certificación Grado 2"
  ],
  testimonios: [
    {
      text: "Después de instalar AJAX en nuestra vivienda en Gràcia, dormimos mucho más tranquilos. La app es súper intuitiva y recibimos las alertas al instante.",
      author: "María G.",
      role: "Cliente residencial - Gràcia"
    },
    {
      text: "Llevo 2 años con su sistema y cero falsas alarmas. Tengo dos perros grandes y el sistema los ignora perfectamente. Muy recomendable.",
      author: "Carlos M.",
      role: "Cliente residencial - Sant Cugat"
    }
  ],
  tecnologia: "AJAX Systems, DSC, Paradox",
  image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/809d1e8d7_IMG_8315.jpeg",
  precio: "Desde 400€"
},
{
  icon: Camera,
  title: "Videovigilancia y Cámaras de Seguridad",
  subtitle: "Monitoreo 24/7 con imágenes de alta calidad",
  description: "Sistemas de cámaras IP Full HD y 4K con visión nocturna ColorVu hasta 40m, grabación en disco duro local, detección de movimiento inteligente con IA y acceso remoto desde cualquier dispositivo. Analítica avanzada para detección de intrusión perimetral.",
  beneficios: [
    "Resolución Full HD y 4K disponible",
    "Visión nocturna a color hasta 40m",
    "Almacenamiento local 27+ días",
    "Detección inteligente de personas",
    "App móvil iOS y Android",
    "Grabación continua o por eventos",
    "Analítica de vídeo con IA",
    "Resistencia IP67 exterior"
  ],
  testimonios: [
    {
      text: "Instalé 8 cámaras Hikvision en mi negocio y la calidad de imagen es impresionante, incluso de noche. Puedo ver todo desde el móvil en tiempo real.",
      author: "Josep T.",
      role: "Propietario comercio - Hospitalet"
    }
  ],
  tecnologia: "HIKVISION, DAHUA, AJAX",
  image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/38f56c395_IMG_8316.jpeg",
  precio: "Desde 680€"
},
{
  icon: MonitorPlay,
  title: "Instalación de Videoporteros",
  subtitle: "Control de acceso visual para tu entrada",
  description: "Videoporteros digitales IP de última generación que te permiten ver, hablar y abrir la puerta desde tu smartphone estés donde estés. Pantalla táctil de 7'' con grabación automática de visitas. Compatible con múltiples viviendas y sistemas de comunidad.",
  beneficios: [
    "Pantalla táctil Full HD 7 pulgadas",
    "Apertura remota desde el móvil",
    "Grabación automática de visitantes",
    "Audio bidireccional alta calidad",
    "Integración con alarma",
    "Visión nocturna infrarroja",
    "Multi-vivienda compatible",
    "Intercomunicación interna"
  ],
  testimonios: [
    {
      text: "Nunca más me pierdo un paquete. Veo quién llama aunque esté en el trabajo y puedo abrir la puerta remotamente. Una maravilla.",
      author: "Laura P.",
      role: "Cliente residencial - Eixample"
    }
  ],
  tecnologia: "FERMAX, TEGUI, COMELIT",
  image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/7ec95bf45_IMG_8318.jpeg",
  precio: "Desde 450€"
},
{
  icon: Fingerprint,
  title: "Control de Accesos",
  subtitle: "Gestión inteligente de entradas y salidas",
  description: "Sistemas profesionales de control de acceso mediante tarjetas RFID, huella dactilar, reconocimiento facial o códigos PIN. Registro completo de entradas/salidas con fecha, hora y usuario. Ideal para empresas, comunidades y parkings.",
  beneficios: [
    "Múltiples métodos de identificación",
    "Registro detallado accesos",
    "Gestión de permisos por zonas horarias",
    "Integración con nóminas RRHH",
    "Control remoto en tiempo real",
    "Informes y estadísticas",
    "Hasta 10,000 usuarios",
    "Modo offline disponible"
  ],
  testimonios: [
    {
      text: "Gestionamos 120 empleados con el sistema de control de accesos. Generamos informes automáticos para nóminas. Nos ahorra horas cada mes.",
      author: "David R.",
      role: "Responsable RRHH - Empresa 22@"
    }
  ],
  tecnologia: "ZKTeco, HIKVISION, FERMAX",
  image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/118acf3ea_IMG_8317.jpeg",
  precio: "Desde 350€"
},
{
  icon: Bell,
  title: "Sistemas Anti-Intrusión Perimetral",
  subtitle: "Detecta intrusos antes de que entren",
  description: "Protección perimetral avanzada con sensores de valla, barreras infrarrojas y cámaras termográficas. Detecta cualquier intento de intrusión en el perímetro de tu propiedad antes de que accedan al interior. Ideal para chalets, naves industriales y fincas.",
  beneficios: [
    "Detección perimetral 100m",
    "Barreras infrarrojas doble haz",
    "Cámaras termográficas opcionales",
    "Inmune a condiciones climáticas",
    "Integración con alarma central",
    "Zonas de detección configurables",
    "Alerta preventiva inmediata",
    "Certificación exterior IP65"
  ],
  testimonios: [
    {
      text: "Instalamos sensores perimetrales en nuestra finca y ahora detectamos cualquier aproximación antes de que lleguen a la casa. Seguridad total.",
      author: "Antonio F.",
      role: "Propietario finca - Vallès"
    }
  ],
  tecnologia: "AJAX, OPTEX, HIKVISION",
  image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/185a69b5e_IMG_8319.jpeg",
  precio: "Desde 850€"
},
{
  icon: Home,
  title: "Domótica y Hogar Inteligente",
  subtitle: "Integra seguridad y confort en un solo sistema",
  description: "Convierte tu hogar en inteligente integrando alarmas, cámaras, iluminación, climatización y persianas en un único sistema controlado desde tu smartphone. Compatible con Alexa, Google Home y HomeKit. Escenas automatizadas y ahorro energético.",
  beneficios: [
    "Control centralizado desde app",
    "Compatible Alexa y Google Home",
    "Escenas automatizadas personalizadas",
    "Ahorro energético hasta 30%",
    "Simulación de presencia",
    "Control por voz",
    "Integración con alarma",
    "Programación horaria"
  ],
  testimonios: [
    {
      text: "Con una sola app controlo alarma, cámaras, luces y persianas. Cuando salgo de casa, todo se apaga automáticamente. Comodidad total.",
      author: "Mireia S.",
      role: "Cliente residencial - Pedralbes"
    }
  ],
  tecnologia: "KNX, AJAX, SHELLY, SONOFF",
  image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/db886e567_IMG_8320.png",
  precio: "Desde 1.200€"
},
{
  icon: Building2,
  title: "Seguridad para Comunidades de Vecinos",
  subtitle: "Protección integral para edificios y comunidades",
  description: "Soluciones completas de seguridad para comunidades: videoporteros IP multi-vivienda, control de accesos a zonas comunes, videovigilancia de parkings y zonas comunitarias, y sistemas anti-okupas. Todo gestionado desde una plataforma centralizada.",
  beneficios: [
    "Videoportero para cada vivienda",
    "Control acceso zonas comunes",
    "Videovigilancia parking 24/7",
    "Sistema anti-okupas avanzado",
    "Gestión centralizada comunidad",
    "App individual por propietario",
    "Registro completo de accesos",
    "Cumplimiento normativa RGPD"
  ],
  testimonios: [
    {
      text: "Instalamos el sistema completo en nuestra comunidad de 40 viviendas. Acabamos con los problemas de okupación y el parking está completamente vigilado.",
      author: "Manuel L.",
      role: "Presidente comunidad - Sants"
    }
  ],
  tecnologia: "FERMAX, HIKVISION, CAME",
  image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/a23233802_IMG_8321.jpeg",
  precio: "Desde 3.500€"
}];


export default function Servicios() {
  const handleContactClick = () => {
    window.location.href = "/#contacto";
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Premium Tech Security - Servicios de Seguridad",
    "description": "Instalación profesional de sistemas de seguridad en Barcelona y Catalunya. Alarmas, cámaras CCTV, control de accesos y videoporteros.",
    "url": window.location.href,
    "areaServed": [
      {
        "@type": "City",
        "name": "Barcelona",
        "containedIn": {
          "@type": "AdministrativeArea",
          "name": "Catalunya"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Seguridad",
      "itemListElement": servicios.map((servicio, idx) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": servicio.title,
          "description": servicio.description,
          "provider": {
            "@type": "LocalBusiness",
            "name": "Premium Tech Security",
            "telephone": "+34638109947",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Barcelona",
              "addressRegion": "Catalunya",
              "postalCode": "08001",
              "streetAddress": "Coll i Vehi, 141"
            }
          }
        }
      }))
    },
    "telephone": "+34638109947",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Coll i Vehi, 141",
      "addressLocality": "Barcelona",
      "postalCode": "08001",
      "addressCountry": "ES"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Servicios de Seguridad en Barcelona | Premium Tech Security"
        description="Instalación profesional de alarmas AJAX, cámaras Hikvision, control de accesos y videoporteros en Barcelona y Catalunya. Tecnología de última generación con respuesta inmediata 24/7. Presupuesto gratis."
        keywords="alarmas Barcelona, cámaras seguridad Barcelona, control accesos Barcelona, videoporteros Barcelona, seguridad Catalunya, AJAX alarmas, Hikvision, instalación seguridad"
        schema={schemaData}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#1a2f4a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center">

            <div className="inline-flex items-center gap-2 bg-[#E63946]/20 rounded-full px-5 py-2 mb-8">
              <Shield className="w-5 h-5 text-[#E63946]" />
              <span className="text-white text-sm font-semibold tracking-wide">Soluciones Profesionales</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Servicios de Seguridad<br />en Barcelona y Catalunya
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Instalación profesional de alarmas, videovigilancia, videoporteros y control de accesos con tecnología líder mundial.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Servicios Detallados */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-32">
            {servicios.map((servicio, index) => {
              const Icon = servicio.icon;
              const isEven = index % 2 === 0;

              return (
                <React.Fragment key={servicio.title}>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>

                  {/* Imagen */}
                  <div className={`relative ${!isEven ? 'lg:col-start-2' : ''}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                      <img
                        src={servicio.image}
                        alt={servicio.title}
                        className={`w-full h-[450px] transition-transform duration-700 group-hover:scale-105 ${servicio.title === "Control de Accesos" ? "object-contain bg-slate-50 p-4" : "object-cover"}`} />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/20 to-transparent" />
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                          <p className="text-white text-sm font-semibold mb-2">Tecnología Premium</p>
                          <p className="text-white/90 text-sm mb-3">{servicio.tecnologia}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-white">{servicio.precio}</span>
                            <span className="text-xs text-white/70">Instalación incluida</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-[#E63946]/10 p-4 rounded-2xl">
                        <Icon className="w-10 h-10 text-[#E63946]" />
                      </div>
                      <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628]">{servicio.title}</h2>
                        <p className="text-sm text-[#E63946] font-semibold mt-1">{servicio.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                      {servicio.description}
                    </p>

                    <div className="mb-10">
                      <h3 className="text-sm font-bold text-[#0A1628] uppercase tracking-wide mb-5 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Características Principales
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {servicio.beneficios.map((beneficio, idx) =>
                        <div key={idx} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm font-medium">{beneficio}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={handleContactClick}
                        className="bg-[#E63946] hover:bg-[#d32f3c] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">

                        Solicitar Presupuesto Gratis
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-2 border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white rounded-full px-8 py-6 text-base font-semibold">

                        <a href="tel:+34638109947">
                          <Phone className="w-5 h-5 mr-2" />
                          638 10 99 47
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>

                </React.Fragment>);

            })}
          </div>
        </div>
      </section>

      {/* CTA Final Mejorado */}
      <section className="py-24 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#1a2642] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>

            <div className="inline-flex items-center gap-2 bg-[#E63946]/20 rounded-full px-5 py-2 mb-8">
              <Phone className="w-4 h-4 text-[#E63946]" />
              <span className="text-white text-sm font-semibold">Atención Personalizada</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Necesitas Asesoramiento Profesional?
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Nuestro equipo de expertos te ayudará a diseñar la solución de seguridad perfecta para tu hogar o negocio
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button
                onClick={handleContactClick}
                className="bg-[#E63946] hover:bg-[#d32f3c] text-white rounded-full px-10 py-7 text-lg font-semibold shadow-2xl hover:shadow-[#E63946]/50 transition-all hover:scale-105">

                Solicitar Asesoramiento Gratis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#0A1628] rounded-full px-10 py-7 text-lg font-semibold backdrop-blur-sm">

                <a href="mailto:tcnpremium@gmail.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Enviar Email
                </a>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
              { value: "500+", label: "Instalaciones" },
              { value: "24/7", label: "Soporte" },
              { value: "10 años", label: "Experiencia" }].
              map((stat) =>
              <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>);

}