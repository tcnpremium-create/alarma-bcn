import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos M.",
    barrio: "Eixample",
    text: "Instalación rápida y muy profesionales. Ahora duermo tranquilo sabiendo que mi casa está protegida. El sistema se controla fácilmente desde el móvil.",
    rating: 5,
  },
  {
    name: "María L.",
    barrio: "Gràcia",
    text: "Después de un intento de robo, contraté sus servicios. La respuesta fue inmediata y el equipo muy atento. Totalmente recomendables.",
    rating: 5,
  },
  {
    name: "Jordi P.",
    barrio: "Sarrià",
    text: "Tengo mi negocio protegido con cámaras y alarma. El servicio técnico es excelente y siempre están disponibles cuando los necesito.",
    rating: 5,
  },
  {
    name: "Ana R.",
    barrio: "Sants",
    text: "Nos asesoraron perfectamente sobre qué sistema necesitábamos. Sin letra pequeña y sin permanencia. Muy contentos con el resultado.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[#E63946] font-semibold text-sm tracking-widest uppercase">
            Testimonios
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-white/50 text-lg">
            La confianza de nuestros clientes es nuestro mejor aval.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition-colors duration-300"
            >
              <Quote className="w-8 h-8 text-[#E63946]/30 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E63946] text-[#E63946]" />
                ))}
              </div>
              <p className="text-white/80 leading-relaxed text-[15px]">
                "{t.text}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E63946]/20 flex items-center justify-center">
                  <span className="text-[#E63946] font-semibold text-sm">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.barrio}, Barcelona</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}