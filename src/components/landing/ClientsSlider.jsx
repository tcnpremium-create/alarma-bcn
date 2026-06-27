import React from "react";

const clients = [
  { name: "Condis", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/9ca754eb4_condis.jpg" },
  { name: "Dia", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/b27f76df3_dia.jpg" },
  { name: "Orogold Cosmetics", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/afc8badf9_orogold.jpg" },
  { name: "Saba Aparcamientos", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/57fcd0d02_saba.png" },
  { name: "ServiMoving", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/2fd78c32a_servimoving-logo-1.png" },
  { name: "Asproseat", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/bc2c1407c_asproseat.jpg" },
  { name: "Maison Cactus", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/5936c4665_maison.png" },
];

// Duplicamos para loop infinito continuo
const track = [...clients, ...clients];

export default function ClientsSlider() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A1628] mb-3 sm:mb-4">Confían en nosotros</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Empresas de toda Catalunya protegen sus instalaciones con nuestros sistemas de seguridad
        </p>
      </div>

      <div className="relative">
        {/* Fade laterales */}
        <div className="absolute inset-y-0 left-0 w-20 lg:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 lg:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Track animado */}
        <div className="flex gap-12 lg:gap-16 clients-track">
          {track.map((client, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-36 lg:w-44 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={client.logo}
                alt={`${client.name} - cliente Premium Tech Security`}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
                width="176"
                height="80"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .clients-track {
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .clients-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}