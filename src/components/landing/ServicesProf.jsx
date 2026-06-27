import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesProf() {
  const services = [
    {
      title: "Sistemas de alarma",
      desc: "Paneles inteligentes, sensores inalámbricos, detectores de rotura, integración con cámaras.",
      image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/e190957e0_IMG_8291.png",
      page: "SistemasAlarma",
      features: ["Detección multi-zona", "App control", "Respuesta 24/7"]
    },
    {
      title: "Videovigilancia 4K",
      desc: "Cámaras HD/4K, grabación en nube, análisis de IA, visión nocturna profesional.",
      image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/2501f362b_IMG_8282.png",
      page: "Videovigilancia",
      features: ["4K ultra HD", "IA detecta personas", "Grabación 30 días"]
    },
    {
      title: "Control de accesos",
      desc: "Lector facial, huella dactilar, tarjetas NFC, integración con puertas motorizadas.",
      image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/1d629183e_IMG_8285.png",
      page: "ControlAccesos",
      features: ["Reconocimiento facial", "Auditoría completa", "Acceso remoto"]
    },
    {
      title: "Mantenimiento 24/7",
      desc: "Revisiones técnicas, soporte inmediato, reemplazo de componentes, actualizaciones.",
      image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/501fd78bd_IMG_8279.jpeg",
      page: "MantenimientoSoporte",
      features: ["Soporte técnico", "Revisiones mensuales", "Garantía extendida"]
    }
  ];

  return (
    <section aria-label="Servicios de seguridad" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-[#0A1628] to-[#1a2f4a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 sm:mb-6">
            Nuestros servicios profesionales
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300">
            Soluciones integrales de seguridad con instalación certificada y soporte permanente.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Link
                to={createPageUrl(service.page)}
                className="group rounded-2xl overflow-hidden block h-full transition-all duration-250 ease-in-out"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(230,57,70,0.6)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2), 0 0 20px rgba(230,57,70,0.15)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
              {/* Service image */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-white/10">
                <img
                  src={service.image}
                  alt={`${service.title} - Sistema de seguridad profesional en Barcelona y Catalunya`}
                  loading="lazy"
                  width="600"
                  height="400"
                  className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out ${service.title === "Control de accesos" ? "object-contain p-4 bg-white/10" : "object-cover"}`}
                    style={service.title === "Mantenimiento 24/7" ? { objectPosition: "top" } : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base mb-5 leading-relaxed">{service.desc}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.features.map((feat, i) => (
                    <span key={i} className="text-[11px] sm:text-xs bg-red-500/20 text-red-300 px-2.5 sm:px-3 py-1 rounded-full font-semibold">
                      {feat}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-red-400 font-bold group-hover:gap-4 transition-all duration-200">
                  Más información
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}