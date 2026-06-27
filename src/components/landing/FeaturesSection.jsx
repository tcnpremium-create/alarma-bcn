import React, { memo } from "react";
import { Shield, Camera, Lock, Smartphone, AlertTriangle, Wifi } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      icon: AlertTriangle,
      title: "Detección avanzada 24/7",
      desc: "Sensores PIR doble tecnología, detectores de rotura de cristal, sensores magnéticos en puertas y ventanas."
    },
    {
      icon: Camera,
      title: "Cámaras 4K con visión nocturna",
      desc: "Grabación en ultra HD, visión infrarroja hasta 50m, análisis de IA para detectar personas y vehículos."
    },
    {
      icon: Smartphone,
      title: "Control desde la app",
      desc: "Arma/desarma remoto, visualización en vivo, historial de eventos, notificaciones instantáneas."
    },
    {
      icon: Wifi,
      title: "Conectividad inteligente",
      desc: "Integración IoT, automatización de escenas, control por voz, sin dependencia de Wi-Fi único."
    },
    {
      icon: Shield,
      title: "Respuesta profesional",
      desc: "Central de monitoreo 24/7, intervención rápida ante alarmas, protocolo de respuesta certificado."
    },
    {
      icon: Lock,
      title: "Garantía y mantenimiento",
      desc: "Garantía 3 años, revisiones trimestrales, actualizaciones de firmware, soporte técnico ilimitado."
    }
  ];

  return (
    <section aria-label="Características técnicas" className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 mb-4 sm:mb-6">
            Características técnicas profesionales
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed">
            Todos nuestros sistemas incluyen componentes de última generación con funcionalidades avanzadas certificadas.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl p-6 sm:p-7 hover:shadow-2xl transition-all duration-300 hover:border-red-400 hover:-translate-y-2 group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 group-hover:bg-red-600 rounded-xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-300">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-[13px] sm:text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}