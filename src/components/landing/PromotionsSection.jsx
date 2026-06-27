import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Shield, CheckCircle, Tag } from "lucide-react";

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
    name: "INICIAL",
    description: "Este kit protege de forma efectiva el interior de tu hogar o local gracias a su detector de movimiento y su sensor de apertura de puerta. Enviará una notificación inmediata a tu móvil cuando detecte el primer paso de un intruso y activará su potente sirena.",
    pvp: "550€",
    promo: "400€",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/8f0bb1f1c_KITINICIAL.png"
  },
  {
    name: "STANDARD",
    description: "Este Kit de Ajax con 3 PIR es la alarma con sensor de movimiento para negocio o hogar capaz de detectar el paso de personas a una distancia de 12 metros. De esta manera, el sistema emitirá de inmediato notificaciones push en tu móvil. Inmune a mascotas y corrientes de aire.",
    pvp: "700€",
    promo: "500€",
    popular: true,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/771cbf78d_kitstandard.jpg"
  },
  {
    name: "SUPERIOR",
    description: "Con esta alarma tendrás los elementos necesarios para disuadir a intrusos. Este sistema incluye una central HUB 2 compatible con los detectores de movimiento de última generación MOTIONCAM que registran fotografías y las envía a tu móvil cuando detecta presencia humana.",
    pvp: "850€",
    promo: "600€",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/bcf002abb_kitsuperior.jpg"
  }
];

export default function PromotionsSection() {
  const handleContactClick = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#E63946]/10 rounded-full px-4 py-2 mb-4">
            <Tag className="w-4 h-4 text-[#E63946]" />
            <span className="text-[#E63946] text-sm font-semibold">Ofertas Especiales</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0A1628] mb-4">
            Promociones Actuales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aprovecha nuestras ofertas exclusivas en sistemas de seguridad profesionales
          </p>
        </motion.div>

        {/* Promociones de Cámaras */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <Camera className="w-6 h-6 text-[#E63946]" />
            <h3 className="text-2xl font-bold text-[#0A1628]">Kits de Videovigilancia</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cameraKits.map((kit, index) => (
              <motion.div
                key={kit.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl border-2 p-8 hover:shadow-xl transition-all duration-300 ${
                  kit.popular ? "border-[#E63946] shadow-lg" : "border-gray-200"
                }`}
              >
                {kit.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E63946] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-[#0A1628] mb-2">{kit.name}</h4>
                  <div className="text-4xl font-bold text-[#E63946]">{kit.price}</div>
                </div>
                <div className="space-y-3 mb-6">
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
                  Lo Quiero
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Promociones de Alarmas */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <Shield className="w-6 h-6 text-[#E63946]" />
            <h3 className="text-2xl font-bold text-[#0A1628]">Kits de Alarmas Ajax</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alarmKits.map((kit, index) => (
              <motion.div
                key={kit.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl border-2 p-8 hover:shadow-xl transition-all duration-300 ${
                  kit.popular ? "border-[#E63946] shadow-lg" : "border-gray-200"
                }`}
              >
                {kit.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E63946] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </div>
                )}
                {kit.image && (
                  <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center mb-6 p-4">
                    <img 
                      src={kit.image} 
                      alt={kit.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-[#0A1628] mb-3">{kit.name}</h4>
                  <p className="text-sm text-gray-600 mb-4 text-left leading-relaxed">{kit.description}</p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-lg text-gray-400 line-through">PVP: {kit.pvp}</div>
                    <div className="text-3xl font-bold text-[#E63946]">{kit.promo}</div>
                  </div>
                </div>
                <Button
                  onClick={handleContactClick}
                  className={`w-full rounded-full font-semibold ${
                    kit.popular
                      ? "bg-[#E63946] hover:bg-[#d32f3c] text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-[#0A1628]"
                  }`}
                >
                  Lo Quiero
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}