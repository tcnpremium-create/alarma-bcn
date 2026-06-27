import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const barrios = [
  "Eixample", "Gràcia", "Sants-Montjuïc", "Sarrià-Sant Gervasi",
  "Les Corts", "Sant Andreu", "Nou Barris", "Horta-Guinardó",
  "Sant Martí", "Ciutat Vella", "L'Hospitalet", "Badalona",
];

export default function SeoLocalSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#E63946] font-semibold text-sm tracking-widest uppercase">
              Cobertura Local
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight">
              Empresa de Alarmas en Barcelona
            </h2>
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
              <p>
                Somos especialistas en <strong>instalación de alarmas en Barcelona</strong> con más de una década 
                de experiencia protegiendo hogares y negocios. Nuestros{" "}
                <strong>sistemas de seguridad en Barcelona</strong> están diseñados para adaptarse a cada 
                tipo de propiedad y necesidad.
              </p>
              <p>
                Si buscas <strong>alarmas para casa en Barcelona</strong> o{" "}
                <strong>alarmas para negocio en Barcelona</strong>, te ofrecemos un estudio de seguridad 
                personalizado y sin compromiso. Instalamos equipos de última generación con conexión a 
                central receptora y control remoto desde tu móvil.
              </p>
              <p>
                <strong>Cobertura en toda Catalunya:</strong> Damos servicio en Barcelona ciudad, área metropolitana 
                y todas las provincias de Catalunya (Girona, Tarragona, Lleida). Garantizamos respuesta rápida 
                y mantenimiento profesional en cualquier ubicación.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[#F8F9FC] rounded-2xl p-8">
              <h3 className="font-semibold text-[#0A1628] text-lg mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#E63946]" />
                Zonas de servicio
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {barrios.map((barrio, index) => (
                  <motion.div
                    key={barrio}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-gray-100 hover:border-[#E63946]/20 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#E63946]" />
                    <span className="text-sm font-medium text-[#0A1628]">{barrio}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}