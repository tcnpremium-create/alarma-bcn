import React from "react";
import { motion } from "framer-motion";

const brands = [
  {
    name: "Hikvision",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/f456fcddd_Hikvision.png",
    desc: "Líder mundial en videovigilancia"
  },
  {
    name: "Ajax Systems",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/e5b934cfe_ajax.png",
    desc: "Sistemas inalámbricos inteligentes"
  },
  {
    name: "Dahua",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/57d3ce767_dahua.png",
    desc: "Innovación en seguridad profesional"
  },
  {
    name: "DSC",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/c30196417_dsc.jpg",
    desc: "Tecnología de alarmas de confianza"
  }
];

export default function TechnologySection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[#E63946] font-semibold text-sm tracking-widest uppercase">
            Tecnología de Primer Nivel
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0A1628] tracking-tight">
            Trabajamos con las mejores marcas
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Instalamos equipos de última generación de los fabricantes líderes mundiales en seguridad.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-[#E63946]/20 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="h-16 flex items-center justify-center mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
              </div>
              <h3 className="font-semibold text-[#0A1628] text-sm">{brand.name}</h3>
              <p className="mt-2 text-xs text-gray-500">{brand.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}