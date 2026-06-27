import React, { useState, useEffect } from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import { motion } from "framer-motion";
import { Tag, Shield, Camera, Fingerprint, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const HERO_SLIDES = [
  {
    src: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/8aa6e0d97_IMG_8651.jpeg",
    title: "Protege lo que más importa. Ojos que nunca duermen.",
  },
  {
    src: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/4e899e1fb_IMG_8650.jpeg",
    title: "Seguridad inteligente para tu negocio. Vigilancia sin límites.",
  },
];


const cameraKits = [
  {
    name: "Kit 2 Cámaras",
    price: "680€",
    features: [
      "1 Grabador Full HD con grabación de imágenes",
      "1 Disco duro de capacidad 27 días",
      "2 Cámaras Full HD grabación día y noche",
      "Instalación del equipo incluida"
    ]
  },
  {
    name: "Kit 4 Cámaras",
    price: "880€",
    features: [
      "1 Grabador Full HD con grabación de imágenes",
      "1 Disco duro de capacidad 27 días",
      "4 Cámaras Full HD grabación día y noche",
      "Instalación del equipo incluida"
    ],
    popular: true
  },
  {
    name: "Kit 8 Cámaras",
    price: "1480€",
    features: [
      "1 Grabador Full HD con grabación de imágenes",
      "1 Disco duro de capacidad 27 días",
      "8 Cámaras Full HD grabación día y noche",
      "Instalación del equipo incluida",
      "10m de DVR a cámara"
    ]
  }
];

const alarmKits = [
  {
    name: "Kit Inicial",
    description: "Protección básica para pisos pequeños. Detector de movimiento y sensor de apertura con notificaciones al móvil.",
    pvp: "550€",
    promo: "400€",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/8f0bb1f1c_KITINICIAL.png"
  },
  {
    name: "Kit Standard",
    description: "Solución completa con 3 detectores PIR inmunes a mascotas. Perfecto para hogares medianos.",
    pvp: "700€",
    promo: "500€",
    popular: true,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/771cbf78d_kitstandard.jpg"
  },
  {
    name: "Kit Superior",
    description: "Máxima seguridad con HUB 2 y cámaras MotionCam que envían fotos instantáneas al móvil.",
    pvp: "850€",
    promo: "600€",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/bcf002abb_kitsuperior.jpg"
  }
];

const promoSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Promociones en Sistemas de Seguridad Barcelona - Premium Tech Security",
  "description": "Ofertas y kits de alarmas AJAX y cámaras Hikvision con instalación incluida en Barcelona y Catalunya.",
  "url": "https://www.premiumtechsecurity.es/Promociones",
  "itemListElement": [
    ...alarmKits.map((kit, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Product",
        "name": kit.name,
        "description": kit.description,
        "offers": {
          "@type": "Offer",
          "price": kit.promo.replace("€", ""),
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "Premium Tech Security" }
        }
      }
    })),
    ...cameraKits.map((kit, i) => ({
      "@type": "ListItem",
      "position": alarmKits.length + i + 1,
      "item": {
        "@type": "Product",
        "name": kit.name,
        "offers": {
          "@type": "Offer",
          "price": kit.price.replace("€", ""),
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "Premium Tech Security" }
        }
      }
    }))
  ]
};

export default function Promociones() {
  const [activeTab, setActiveTab] = useState("camaras");
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    if (heroPaused) return;
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroPaused]);

  const handleContactClick = () => {
    window.location.href = "/#contacto";
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Ofertas en Alarmas y Cámaras de Seguridad Barcelona | Premium Tech Security</title>
        <meta name="description" content="Kits de alarmas AJAX desde 400€ y videovigilancia Hikvision desde 680€ con instalación incluida en Barcelona. Ofertas exclusivas en seguridad para hogar y negocio." />
        <link rel="canonical" href="https://www.premiumtechsecurity.es/Promociones" />
        <script type="application/ld+json">{JSON.stringify(promoSchema)}</script>
      </Helmet>
      <Navbar />
      
      {/* Hero Carousel */}
      <section
        className="relative w-full min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] overflow-hidden pt-16 sm:pt-20"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
      >
        <div className="absolute inset-0" aria-hidden="true">
          {HERO_SLIDES.map((slide, idx) => (
            <img
              key={idx}
              src={slide.src}
              alt=""
              loading={idx === 0 ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: heroSlide === idx ? 1 : 0,
                transition: "opacity 800ms ease-in-out",
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 sm:py-28 lg:py-32 flex flex-col justify-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#E63946]/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
              <Tag className="w-5 h-5 text-[#E63946]" />
              <span className="text-white text-sm font-semibold">Ofertas Limitadas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              {HERO_SLIDES[heroSlide].title}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed mb-8">
              Aprovecha nuestras ofertas exclusivas en sistemas de alarmas y videovigilancia profesional. Instalación incluida y garantía de por vida.
            </p>
            <Button
              onClick={handleContactClick}
              className="bg-[#E63946] hover:bg-[#d32f3c] text-white px-8 py-6 rounded-xl font-bold text-lg shadow-2xl hover:shadow-red-600/40 transition-all hover:scale-[1.02] flex items-center gap-2 group"
            >
              Solicitar presupuesto
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: heroSlide === idx ? "#E63946" : "rgba(255,255,255,0.4)",
                transform: heroSlide === idx ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </section>

      {/* Tabs de Navegación */}
      <section className="py-6 sm:py-8 border-b border-gray-200 sticky top-16 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <button
              onClick={() => setActiveTab("alarmas")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-base transition-all ${
                activeTab === "alarmas"
                  ? "bg-[#E63946] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">ALARMAS</span>
              <span className="sm:hidden">Alarmas</span>
            </button>
            <button
              onClick={() => setActiveTab("camaras")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-base transition-all ${
                activeTab === "camaras"
                  ? "bg-[#E63946] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">CÁMARAS</span>
              <span className="sm:hidden">Cámaras</span>
            </button>
            <button
              onClick={() => setActiveTab("controles")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-base transition-all ${
                activeTab === "controles"
                  ? "bg-[#E63946] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden lg:inline">CONTROLES DE ACCESO</span>
              <span className="lg:hidden">Controles</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contenido según tab activo */}
      {activeTab === "alarmas" && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-[#0A1628] mb-4">Kits de Alarmas AJAX</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Sistemas inalámbricos de última generación con notificaciones en tiempo real
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {alarmKits.map((kit, index) => (
                <motion.div
                  key={kit.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl border-2 p-6 hover:shadow-2xl transition-all ${
                    kit.popular ? "border-[#E63946] shadow-xl" : "border-gray-200"
                  }`}
                >
                  {kit.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E63946] text-white px-4 py-1 rounded-full text-sm font-bold">
                      MÁS VENDIDO
                    </div>
                  )}
                  
                  <div className="w-full h-48 bg-gray-50 rounded-xl flex items-center justify-center mb-6 p-4">
                    <img 
                      src={kit.image} 
                      alt={kit.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-[#0A1628] mb-3">{kit.name}</h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">{kit.description}</p>
                  
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg text-gray-400 line-through">{kit.pvp}</span>
                    <span className="text-4xl font-bold text-[#E63946]">{kit.promo}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-5">* IVA no incluido</p>
                  
                  <Button
                    onClick={handleContactClick}
                    className={`w-full rounded-full font-semibold ${
                      kit.popular
                        ? "bg-[#E63946] hover:bg-[#d32f3c] text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-[#0A1628]"
                    }`}
                  >
                    Solicitar Presupuesto
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Video Ajax */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <h3 className="text-3xl font-bold text-[#0A1628] text-center mb-8">
                Descubre la Tecnología AJAX
              </h3>
              <div className="max-w-4xl mx-auto">
                <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/SfR5fydWE9s"
                    title="Sistemas de Alarmas Ajax"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {activeTab === "camaras" && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-[#0A1628] mb-4">Kits de Videovigilancia</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Sistemas de cámaras Full HD con grabación 24/7 y visión nocturna
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cameraKits.map((kit, index) => (
                <motion.div
                  key={kit.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl border-2 p-6 hover:shadow-2xl transition-all ${
                    kit.popular ? "border-[#E63946] shadow-xl" : "border-gray-200"
                  }`}
                >
                  {kit.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E63946] text-white px-4 py-1 rounded-full text-sm font-bold">
                      MÁS POPULAR
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-[#0A1628] mb-2">{kit.name}</h3>
                  <div className="text-4xl font-bold text-[#E63946] mb-1">{kit.price}</div>
                  <p className="text-xs text-gray-400 mb-5">* IVA no incluido</p>
                  
                  <div className="space-y-3 mb-8">
                    {kit.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    onClick={handleContactClick}
                    className={`w-full rounded-full font-semibold ${
                      kit.popular
                        ? "bg-[#E63946] hover:bg-[#d32f3c] text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-[#0A1628]"
                    }`}
                  >
                    Solicitar Presupuesto
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === "controles" && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-4xl font-bold text-[#0A1628] mb-6">Control de Acceso</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  <strong>Instalación de sistema de control de acceso</strong> a través de lector de tarjetas de proximidad, 
                  destrabador eléctrico, lector dactilar, lector facial, teclera de códigos, etc.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Nuestros sistemas de control de accesos pueden funcionar con <strong>respaldo computacional</strong> y 
                  registro de cada entrada o también de <strong>manera local</strong> realizando aperturas de puntos específicos.
                </p>
                
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-lg font-bold text-[#0A1628] mb-4">Métodos de Identificación:</h3>
                  <div className="space-y-3">
                    {[
                      "Tarjetas de proximidad RFID",
                      "Lector de huella dactilar",
                      "Reconocimiento facial avanzado",
                      "Teclera con códigos PIN",
                      "Combinación de múltiples métodos",
                      "Control remoto desde app móvil"
                    ].map((metodo, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#E63946] flex-shrink-0" />
                        <span className="text-gray-700">{metodo}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleContactClick}
                    className="bg-[#E63946] hover:bg-[#d32f3c] text-white rounded-full px-8 py-6 font-semibold"
                  >
                    Solicitar Presupuesto Personalizado
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-2 border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white rounded-full px-8 py-6 font-semibold"
                  >
                    <a href="tel:+34638109947">Llamar Ahora</a>
                  </Button>
                </div>
              </div>

              <div>
                <img
                  src="https://media.base44.com/images/public/6995a701232755a2d5e24b39/1d629183e_IMG_8285.png"
                  alt="Sistema de Control de Acceso"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              ¿Listo para Proteger tu Propiedad?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Contacta con nosotros y te asesoraremos sin compromiso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+34638109947"
                className="inline-flex items-center justify-center bg-[#E63946] hover:bg-[#d32f3c] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                Llamar Ahora: 638 10 99 47
              </a>
              <a
                href="/#contacto"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-[#0A1628] px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                Solicitar Presupuesto
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}