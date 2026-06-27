import React, { memo } from "react";

export default function TechPartners() {
  const partners = [
    {
      name: "HIKVISION",
      logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/e80e1bbb0_Hikvision.png",
      desc: "Cámaras 4K y sistemas de videovigilancia de última generación"
    },
    {
      name: "DAHUA",
      logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/30fd73dd5_dahua.png",
      desc: "Soluciones de vigilancia inteligente con IA integrada"
    },
    {
      name: "AJAX",
      logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/293fc604f_ajax.png",
      desc: "Sistemas de alarma inalámbricos de máxima fiabilidad"
    },
    {
      name: "DSC",
      logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/6d190fc03_dsc.jpg",
      desc: "Paneles de control profesionales y detección avanzada"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-[#0A1628] to-[#1a2a3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Tecnología de marcas líderes
          </h2>
          <p className="text-xl text-gray-300">
            Trabajamos con las mejores marcas de seguridad del mundo para garantizar máxima calidad y fiabilidad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-all">
              <div className="h-16 mb-4 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={`${partner.name} - Partner tecnológico de seguridad`}
                  loading="lazy"
                  width="200"
                  height="60"
                  className="h-12 object-contain"
                />
              </div>
              <h3 className="text-white font-bold mb-2">{partner.name}</h3>
              <p className="text-sm text-gray-300">{partner.desc}</p>
            </div>
          ))}
        </div>

        {/* Certificaciones */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
          <p className="text-gray-300 mb-4">Certificaciones y homologaciones</p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
            <span>✓ Instalador homologado DSC</span>
            <span>✓ Certificado AJAX</span>
            <span>✓ Partner Hikvision oficial</span>
            <span>✓ Licencia profesional</span>
          </div>
        </div>
      </div>
    </section>
  );
}