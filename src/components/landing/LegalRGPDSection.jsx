import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    q: "¿Puedo instalar cámaras en mi comunidad de vecinos?",
    a: "Sí, con condiciones. Deben aprobarse en junta de propietarios y solo pueden enfocar zonas comunes: portal, garaje y escaleras. No se pueden enfocar puertas de vecinos salvo consentimiento expreso en acta. En Premium Tech Security gestionamos todo el proceso legal por ti, sin coste adicional.",
  },
  {
    q: "¿Puedo grabar la vía pública con mis cámaras?",
    a: "Solo parcialmente. Si necesitas enfocar la entrada de tu hogar o negocio y capturas inevitablemente un pequeño tramo de calle, está permitido. No se puede enfocar la vía pública de forma directa e intencionada según la LOPD.",
  },
  {
    q: "¿Quién puede acceder a las grabaciones en una comunidad?",
    a: "Solo la persona designada como responsable de las imágenes, generalmente el presidente o administrador de finca. Si tienes mantenimiento contratado con nosotros, asumimos la responsabilidad y garantizamos el cumplimiento RGPD total.",
  },
  {
    q: "¿Cuánto tiempo se pueden conservar las grabaciones?",
    a: "Según la LOPD, un máximo de 30 días naturales. Nuestros sistemas se configuran automáticamente para respetar este plazo sin que tengas que hacer nada manualmente.",
  },
  {
    q: "¿Necesito poner carteles informativos de videovigilancia?",
    a: "Sí, es obligatorio por ley. En Premium Tech Security incluimos e instalamos la señalética homologada en todas nuestras instalaciones, sin ningún coste adicional.",
  },
  {
    q: "¿Puedo instalar reconocimiento de matrículas en mi parking?",
    a: "Sí, es perfectamente legal en espacios privados. Nuestros sistemas LPR permiten crear listas blancas y negras y automatizar barreras de acceso, siempre bajo normativa RGPD.",
  },
];

export default function LegalRGPDSection() {
  return (
    <section id="legal" className="py-20 lg:py-28" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 mb-4">✓ ASESORAMIENTO LEGAL INCLUIDO</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A1A] mb-4">Cámaras de Seguridad y la Ley</h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">Instalamos siempre cumpliendo la normativa LOPD/RGPD vigente en España. Sin sorpresas legales.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-xl border border-gray-200 px-5 overflow-hidden">
                <AccordionTrigger className="text-left text-[15px] sm:text-base font-semibold text-[#0A0A1A] hover:text-[#E53E3E] transition-colors duration-300 py-5 [&[data-state=open]>svg]:text-[#E53E3E]">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-12 text-center bg-white rounded-xl p-6 sm:p-8" style={{ border: "2px dashed #E53E3E" }}>
          <p className="text-[#0A0A1A] font-semibold text-base sm:text-lg mb-4">¿Tienes dudas sobre la legalidad de tu instalación?</p>
          <a
            href="https://wa.me/34638109947"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E53E3E] hover:bg-[#C53030] text-white font-bold text-sm transition-colors duration-300"
          >
            Consulta gratuita sin compromiso →
          </a>
        </motion.div>
      </div>
    </section>
  );
}