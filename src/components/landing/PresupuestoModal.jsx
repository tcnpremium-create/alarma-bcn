import React, { useState } from "react";
import { X, Phone, Home, Building2, Users, Warehouse, Camera, ShieldAlert, Video, KeyRound, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SPACES = [
  { id: "hogar", Icon: Home, label: "Mi hogar" },
  { id: "negocio", Icon: Building2, label: "Mi negocio" },
  { id: "comunidad", Icon: Users, label: "Mi comunidad" },
  { id: "nave", Icon: Warehouse, label: "Mi nave industrial" },
];

const SERVICES = [
  { id: "Cámaras de seguridad", Icon: Camera, label: "Cámaras de seguridad" },
  { id: "Sistema de alarma", Icon: ShieldAlert, label: "Sistema de alarma" },
  { id: "Videoportero", Icon: Video, label: "Videoportero" },
  { id: "Control de accesos", Icon: KeyRound, label: "Control de accesos" },
];

export default function PresupuestoModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [space, setSpace] = useState("");
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ nombre: "", telefono: "", ciudad: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const toggleService = (id) => {
    setServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.telefono.trim()) return;
    setSubmitting(true);
    await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: form.nombre,
        telefono: form.telefono,
        zona: form.ciudad,
        servicio_interes: services.join(", "),
        tipo_cliente: space,
        origen: "formulario_web",
        estado: "nuevo",
      })
    });
    setSubmitting(false);
    setSuccess(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep(1); setSpace(""); setServices([]); setForm({ nombre: "", telefono: "", ciudad: "" }); setSuccess(false); }, 300);
  };

  const canNext = step === 1 ? !!space : step === 2 ? services.length > 0 : false;

  return (
    <div className="fixed inset-0 z-[1100] flex items-end sm:items-center justify-center" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]" />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="relative bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 style={{ fontWeight: 900, fontSize: 22, color: "#0A0A1A", margin: 0 }}>Solicita tu Presupuesto Gratis</h3>
              <p style={{ color: "#6B7280", fontSize: 14, marginTop: 4 }}>Sin compromiso · Respuesta en menos de 24h</p>
            </div>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-700 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-2 my-5">
            {[1, 2, 3].map((s) => (
              <div key={s} className="w-2.5 h-2.5 rounded-full transition-colors" style={{ backgroundColor: step >= s ? "#E53E3E" : "#E5E7EB" }} />
            ))}
          </div>

          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle style={{ width: 36, height: 36, color: "#22C55E" }} />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: 20, color: "#0A0A1A", marginBottom: 8 }}>¡Perfecto! Te llamamos antes de 24h.</h3>
              <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 20 }}>Mientras tanto, puedes llamarnos</p>
              <a href="tel:+34638109947" className="inline-flex items-center gap-2 bg-[#E53E3E] text-white px-6 py-3 rounded-full font-bold text-base">
                <Phone className="w-5 h-5" />
                Llamar
              </a>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} transition={{ duration: 0.2 }}>
                {step === 1 && (
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: 17, color: "#0A0A1A", marginBottom: 16 }}>¿Qué necesitas proteger?</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {SPACES.map((s) => (
                        <button key={s.id} onClick={() => setSpace(s.id)}
                          className="p-5 rounded-2xl border-2 text-center transition-all"
                          style={{ borderColor: space === s.id ? "#E53E3E" : "#E5E7EB", backgroundColor: space === s.id ? "#FFF5F5" : "white" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                            <div style={{
                              width: 48, height: 48, borderRadius: 14,
                              backgroundColor: space === s.id ? "#FEE2E2" : "#F3F4F6",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              transition: "background-color 0.2s"
                            }}>
                              <s.Icon style={{ width: 22, height: 22, color: "#E53E3E" }} />
                            </div>
                          </div>
                          <span style={{ fontWeight: 700, fontSize: 13, color: "#0A0A1A" }}>{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: 17, color: "#0A0A1A", marginBottom: 16 }}>¿Qué servicio te interesa?</h4>
                    <div className="space-y-3">
                      {SERVICES.map((s) => (
                        <button key={s.id} onClick={() => toggleService(s.id)}
                          className="w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all"
                          style={{ borderColor: services.includes(s.id) ? "#E53E3E" : "#E5E7EB", backgroundColor: services.includes(s.id) ? "#FFF5F5" : "white" }}>
                          <div style={{
                            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                            backgroundColor: services.includes(s.id) ? "#FEE2E2" : "#F3F4F6",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "background-color 0.2s"
                          }}>
                            <s.Icon style={{ width: 20, height: 20, color: "#E53E3E" }} />
                          </div>
                          <span style={{ fontWeight: 700, fontSize: 14, color: "#0A0A1A" }}>{s.label}</span>
                          <div className="ml-auto w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0"
                            style={{ borderColor: services.includes(s.id) ? "#E53E3E" : "#D1D5DB", backgroundColor: services.includes(s.id) ? "#E53E3E" : "white" }}>
                            {services.includes(s.id) && <span style={{ color: "white", fontSize: 10, fontWeight: 900 }}>✓</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <form onSubmit={handleSubmit}>
                    <h4 style={{ fontWeight: 700, fontSize: 17, color: "#0A0A1A", marginBottom: 16 }}>¿Cómo te llamamos?</h4>
                    <div className="space-y-3">
                      <input type="text" placeholder="Tu nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E53E3E]/40 focus:border-[#E53E3E]" />
                      <input type="tel" placeholder="Tu teléfono" required value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E53E3E]/40 focus:border-[#E53E3E]" />
                      <input type="text" placeholder="Barcelona, Sabadell..." value={form.ciudad} onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E53E3E]/40 focus:border-[#E53E3E]" />
                    </div>
                    <button type="submit" disabled={submitting}
                      className="w-full mt-5 py-4 rounded-full font-bold text-base text-white disabled:opacity-50"
                      style={{ backgroundColor: "#E53E3E" }}>
                      {submitting ? "Enviando..." : "Recibir presupuesto gratis →"}
                    </button>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {!success && step < 3 && (
            <button onClick={() => { if (canNext) setStep(step + 1); }} disabled={!canNext}
              className="w-full mt-5 py-4 rounded-full font-bold text-base text-white disabled:opacity-40"
              style={{ backgroundColor: "#E53E3E" }}>
              Siguiente →
            </button>
          )}
          {!success && step > 1 && (
            <button onClick={() => setStep(step - 1)} className="w-full mt-2 text-center text-sm text-gray-500 hover:text-gray-700 py-2">
              ← Atrás
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}