import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, CheckCircle, Shield, Camera, Fingerprint, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";
import CityLandingSEO from "../seo/CityLandingSEO";
import { base44 } from "@/api/api";

const SERVICES = [
  { icon: Shield, title: "Alarmas inteligentes AJAX", desc: "Paneles, sensores inalámbricos, detectores de movimiento inmunes a mascotas, sirenas y notificaciones instantáneas." },
  { icon: Camera, title: "Videovigilancia 4K Hikvision", desc: "Cámaras IP 4K con visión nocturna en color, grabación 30 días, detección IA de personas y vehículos." },
  { icon: Fingerprint, title: "Control de accesos biométrico", desc: "Huella dactilar, tarjeta NFC, reconocimiento facial y código PIN con registro completo de entradas." },
  { icon: Wrench, title: "Mantenimiento y soporte 24/7", desc: "Revisiones técnicas periódicas, soporte inmediato, actualizaciones de firmware y reemplazo de componentes." }
];

export default function CityLandingTemplate({ city, seoPath, intro, zones, lat, lng }) {
  const [form, setForm] = useState({ nombre: "", telefono: "", ciudad: city, mensaje: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono) return;
    setSending(true);
    await base44.entities.Lead.create({
      nombre: form.nombre,
      telefono: form.telefono,
      zona: form.ciudad,
      mensaje: form.mensaje,
      origen: "formulario_web",
      tipo_cliente: "hogar"
    });
    setSent(true);
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-white" style={{ paddingBottom: 70 }}>
      <CityLandingSEO path={seoPath} />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#1a2f4a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 text-white/60 mb-4">
              <MapPin className="w-4 h-4 text-[#E63946]" />
              <span className="text-sm">Catalunya • {city}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-5 leading-tight">
              Instalación de Alarmas y Cámaras de Seguridad en {city}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl leading-relaxed mb-8">
              {intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="https://wa.me/34638109947" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-4 rounded-xl font-bold text-base transition-all">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
              <a href="tel:+34638109947"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-bold text-base backdrop-blur-sm border border-white/30 transition-all">
                <Phone className="w-5 h-5" /> Llamar
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0A1628] mb-10 text-center">
            Servicios de seguridad en {city}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border-2 border-slate-100 hover:border-[#E63946]/30 rounded-2xl p-6 sm:p-7 transition-all hover:shadow-lg">
                <div className="bg-[#E63946]/10 p-3 rounded-xl w-fit mb-4">
                  <s.icon className="w-7 h-7 text-[#E63946]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0A1628] mb-2">{s.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-8 text-center">
            Zonas que cubrimos en {city}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {zones.map((zone) => (
              <div key={zone} className="flex items-center gap-2 bg-white rounded-xl p-3 sm:p-4 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-[#E63946] flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">{zone}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Map */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-6">Nuestra cobertura en {city}</h2>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <iframe
                  title={`Mapa de cobertura en ${city}`}
                  src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses`}
                  width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-6 bg-[#0A1628] text-white rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-7 h-7 text-[#E63946]" />
                  <h3 className="text-xl font-bold">¿Por qué elegirnos?</h3>
                </div>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E63946] mt-0.5 flex-shrink-0" /> Más de 15 años de experiencia en Catalunya</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E63946] mt-0.5 flex-shrink-0" /> Instalación en 24-48h sin obras</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E63946] mt-0.5 flex-shrink-0" /> Presupuesto gratuito y sin compromiso</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E63946] mt-0.5 flex-shrink-0" /> Sin permanencia obligatoria</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E63946] mt-0.5 flex-shrink-0" /> Tecnología AJAX + Hikvision certificada</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-6">Solicita presupuesto gratis</h2>
              {sent ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">¡Solicitud enviada!</h3>
                  <p className="text-green-700 mb-4">Te contactaremos en menos de 24h con tu presupuesto personalizado.</p>
                  <a href="tel:+34638109947" className="inline-flex items-center gap-2 bg-[#E63946] text-white px-6 py-3 rounded-xl font-bold">
                    <Phone className="w-4 h-4" /> Llamar
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-200">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombre *</label>
                    <input type="text" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-sm" placeholder="Tu nombre completo" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Teléfono *</label>
                    <input type="tel" required value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-sm" placeholder="600 000 000" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ciudad</label>
                    <input type="text" value={form.ciudad} onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mensaje</label>
                    <textarea value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-sm resize-none" placeholder="Describe brevemente lo que necesitas..." />
                  </div>
                  <Button type="submit" disabled={sending}
                    className="w-full bg-[#E63946] hover:bg-[#d32f3c] text-white py-6 rounded-xl font-bold text-base">
                    {sending ? "Enviando..." : "Presupuesto →"}
                    {!sending && <ArrowRight className="w-5 h-5 ml-2" />}
                  </Button>
                  <p className="text-xs text-slate-500 text-center">Sin compromiso · Respuesta en menos de 24h</p>
                </form>
              )}
              <a href="https://wa.me/34638109947" target="_blank" rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-4 rounded-xl font-bold text-base transition-all">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}