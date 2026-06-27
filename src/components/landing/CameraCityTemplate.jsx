import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";
import AdvancedSEO from "../seo/AdvancedSEO";
import HeroContactModal from "./HeroContactModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Smartphone, Clock, CheckCircle, ArrowRight } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const SERVICES = [
  {
    icon: "🏠",
    title: "Cámaras para Hogar",
    features: ["Cámaras HD exteriores e interiores", "App móvil iOS y Android", "Visión nocturna en color", "Detección de personas por IA", "Sin cuotas mensuales"],
  },
  {
    icon: "🏢",
    title: "Cámaras para Negocio",
    features: ["IA detección inteligente", "Grabación 24/7 continua", "Identificación 4K ultra HD", "Compatible con Central Receptora", "Control remoto total"],
  },
  {
    icon: "🏘️",
    title: "Cámaras para Comunidades",
    features: ["Portal, garaje y zonas comunes", "Gestión legal RGPD incluida", "Señalética homologada", "NVR local seguro", "Acceso restringido por roles"],
  },
];

const BENEFITS = [
  { icon: Shield, title: "Sin cuotas mensuales", desc: "Pago único, sin sorpresas ni permanencia" },
  { icon: CheckCircle, title: "Instalación incluida", desc: "Instaladores certificados, sin obras" },
  { icon: Clock, title: "Garantía de por vida", desc: "Soporte técnico y mantenimiento permanente" },
  { icon: Smartphone, title: "Respuesta en 24h", desc: "Presupuesto y visita en menos de un día" },
];

export default function CameraCityTemplate({ city, seoTitle, seoDescription, seoPath, intro, faqs }) {
  const [showModal, setShowModal] = useState(false);

  const defaultFaqs = [
    {
      q: `¿Cuánto cuesta instalar cámaras de seguridad en ${city}?`,
      a: `El precio depende del número de cámaras y el tipo de instalación. En Premium Tech Security ofrecemos presupuesto gratuito sin compromiso. El precio base desde 299€ con instalación incluida y sin cuotas mensuales.`,
    },
    {
      q: `¿Qué marcas de cámaras instaláis en ${city}?`,
      a: "Trabajamos con las mejores marcas del mercado: Hikvision, Dahua y Ajax Systems. Todas nuestras cámaras son de resolución mínima 2K (4MPx), con visión nocturna en color y detección por IA.",
    },
    {
      q: `¿Cuánto tarda la instalación en ${city}?`,
      a: `La mayoría de instalaciones domésticas y de negocio se completan en un solo día. Para comunidades grandes puede requerir 2 días. Contacta con nosotros y te damos fecha concreta.`,
    },
  ];

  const faqList = faqs || defaultFaqs;

  return (
    <div className="min-h-screen bg-white" style={{ paddingBottom: 70 }}>
      <AdvancedSEO
        title={seoTitle || `Instalación Cámaras de Seguridad en ${city} | Sin Cuotas | Premium Tech Security`}
        description={seoDescription || `Instalamos cámaras de seguridad en ${city}. Hikvision, Dahua y Ajax. 4K HD. Sin cuotas mensuales. Presupuesto gratis en 24h. Llama al 638 10 99 47.`}
        keywords={`cámaras seguridad ${city}, instalación cámaras ${city}, videovigilancia ${city}, CCTV ${city}`}
        canonicalUrl={`https://alarmasenbarcelona.com${seoPath}`}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative w-full overflow-hidden pt-16 sm:pt-20" style={{ height: "70vh", maxHeight: "70vh", backgroundColor: "#0A0A1A" }}>
        <img
          src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&q=90"
          alt={`Cámaras de seguridad en ${city}`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1A] via-[#0A0A1A]/60 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col justify-center h-full text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5" style={{ backgroundColor: "rgba(229,62,62,0.15)", color: "#E53E3E" }}>
              <span className="w-2 h-2 bg-[#E53E3E] rounded-full animate-pulse" /> INSTALACIÓN PROFESIONAL EN {city.toUpperCase()}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Instalación de Cámaras de Seguridad en <span className="text-[#E53E3E]">{city}</span>
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              {intro || "Videovigilancia HD para hogar, negocio y comunidades. Sin cuotas mensuales. Presupuesto gratis en 24h."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#E53E3E] hover:bg-[#C53030] text-white font-bold text-base transition-colors duration-300"
              >
                Presupuesto →
              </button>
              <a href="tel:+34638109947" className="px-8 py-4 rounded-xl border-2 border-white/30 text-white font-bold text-base hover:bg-white/10 transition-colors duration-300 flex items-center gap-2">
                📞 Llamar
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A1A] mb-4">Soluciones de Videovigilancia en {city}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Instalación profesional adaptada a tu espacio — hogar, negocio o comunidad</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="rounded-2xl border border-gray-200 p-8 hover:border-[#E53E3E] hover:shadow-[0_8px_30px_rgba(229,62,62,0.15)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-lg text-[#0A0A1A] mb-4">{s.title}</h3>
                <ul className="space-y-2">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#E53E3E] font-bold mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 lg:py-28 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A1A] mb-4">¿Por qué elegirnos en {city}?</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#E53E3E]/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-7 h-7 text-[#E53E3E]" />
                </div>
                <h3 className="font-bold text-[#0A0A1A] mb-1">{b.title}</h3>
                <p className="text-gray-500 text-sm">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A1A] mb-4">Preguntas Frecuentes — Cámaras en {city}</h2>
          </motion.div>
          <Accordion type="single" collapsible className="space-y-2">
            {faqList.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-[#F8F9FA] rounded-xl border border-gray-200 px-5 overflow-hidden">
                <AccordionTrigger className="text-left text-[15px] font-semibold text-[#0A0A1A] hover:text-[#E53E3E] transition-colors duration-300 py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28" style={{ background: "linear-gradient(135deg, #E53E3E 0%, #C53030 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">¿Necesitas Cámaras de Seguridad en {city}?</h2>
          <p className="text-white/90 text-lg mb-8">Presupuesto gratuito · Sin compromiso · Instalación incluida</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#E53E3E] font-bold text-base hover:bg-gray-100 transition-colors duration-300"
            >
              Presupuesto →
            </button>
            <a href="tel:+34638109947" className="px-8 py-4 rounded-xl border-2 border-white/50 text-white font-bold text-base hover:bg-white/10 transition-colors duration-300 flex items-center gap-2">
              📞 Llamar
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
      <HeroContactModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}