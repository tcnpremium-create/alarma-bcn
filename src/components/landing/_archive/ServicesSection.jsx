import React from "react";
import { motion } from "framer-motion";
import { Lock, Building2, Camera, Smartphone, Siren, Wrench } from "lucide-react";

const services = [
  {
    icon: Lock,
    title: "Alarmas para Viviendas",
    description: "Sistemas de alarma inteligentes diseñados para proteger tu hogar las 24 horas del día, con detección de intrusión y alertas en tiempo real.",
  },
  {
    icon: Building2,
    title: "Alarmas para Negocios",
    description: "Soluciones de seguridad profesionales para comercios, oficinas y naves industriales con control de accesos y monitorización.",
  },
  {
    icon: Camera,
    title: "Cámaras de Videovigilancia",
    description: "Cámaras HD con visión nocturna y grabación en la nube. Vigila tu propiedad desde cualquier lugar, en cualquier momento.",
  },
  {
    icon: Smartphone,
    title: "Control Remoto desde el Móvil",
    description: "Gestiona tu sistema de seguridad desde tu smartphone. Activa, desactiva y recibe notificaciones al instante.",
  },
  {
    icon: Siren,
    title: "Conexión a Central Receptora",
    description: "Tu alarma conectada a una central de alarmas 24/7 que actúa inmediatamente ante cualquier incidencia.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento y Soporte Técnico",
    description: "Servicio técnico en Barcelona con asistencia prioritaria y mantenimiento preventivo para que tu sistema siempre funcione.",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[#E63946] font-semibold text-sm tracking-widest uppercase">
            Nuestros Servicios
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight">
            Soluciones de seguridad a tu medida
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Ofrecemos una gama completa de sistemas de seguridad para proteger lo que más importa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl border border-gray-100 bg-white hover:bg-[#0A1628] transition-all duration-500 hover:border-[#0A1628] hover:shadow-2xl hover:shadow-[#0A1628]/10"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E63946]/10 group-hover:bg-[#E63946]/20 flex items-center justify-center transition-colors duration-500">
                <service.icon className="w-6 h-6 text-[#E63946]" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#0A1628] group-hover:text-white transition-colors duration-500">
                {service.title}
              </h3>
              <p className="mt-3 text-gray-500 group-hover:text-white/60 leading-relaxed transition-colors duration-500">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}