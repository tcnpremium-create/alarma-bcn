import React from "react";
import { motion } from "framer-motion";
import { Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/bf491c79b_cabecera.png"
          alt=""
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/75 via-[#0A1628]/50 to-transparent" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">

            <Shield className="w-4 h-4 text-[#E63946]" />
            <span className="text-white/80 text-sm font-medium tracking-wide">
              Empresa certificada en Barcelona
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">

            Instalación de Seguridad en Barcelona con{" "}
            <span className="text-[#E63946]">Respuesta Inmediata</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl">

            Protege tu hogar o negocio con sistemas de seguridad avanzados
            y técnicos certificados en Barcelona.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4">

            <Button
              size="lg"
              className="bg-[#E63946] hover:bg-[#d32f3c] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-[#E63946]/25 transition-all hover:shadow-xl hover:shadow-[#E63946]/30 hover:scale-[1.02]"
              onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}>

              Solicitar Presupuesto Gratis
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#0A1628] rounded-full px-8 py-6 text-base font-semibold backdrop-blur-sm transition-all"
              asChild>

              <a href="tel:+34638109947" className="bg-slate-950 text-slate-50 px-8 py-6 text-base font-semibold rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm h-10 border-2 border-white hover:bg-white hover:text-[#0A1628] backdrop-blur-sm transition-all">📞 638 10 99 47

              </a>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 flex items-center gap-8 flex-wrap">

            {[
            { value: "500+", label: "Instalaciones" },
            { value: "24h", label: "Respuesta" },
            { value: "4.9★", label: "Valoración" }].
            map((stat) =>
            <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-white/50">{stat.label}</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </section>);

}