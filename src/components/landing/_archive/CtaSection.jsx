import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import ContactForm from "./ContactForm";

export default function CtaSection() {
  return (
    <section id="contacto" className="py-24 lg:py-32 bg-[#F8F9FC] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#E63946]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0A1628]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0A1628] rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#E63946]/20 mb-8">
              <Shield className="w-8 h-8 text-[#E63946]" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Protege lo que más importa{" "}
              <span className="text-[#E63946]">hoy mismo</span>
            </h2>
            
            <p className="mt-5 text-white/60 text-lg max-w-xl mx-auto">
              Solicita tu presupuesto gratuito y sin compromiso. Nuestro equipo te contactará en menos de 24 horas.
            </p>

            <div className="mt-10 max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}