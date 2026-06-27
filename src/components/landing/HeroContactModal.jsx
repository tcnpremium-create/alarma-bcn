import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/api";

const SERVICIOS = [
  "Cámaras de seguridad",
  "Sistema de alarma",
  "Control de accesos",
  "Videovigilancia comunidad",
  "Pack completo seguridad",
];

export default function HeroContactModal({ open, onClose, defaultServicio = "" }) {
  const [form, setForm] = useState({ nombre: "", telefono: "", servicio: defaultServicio, zona: "" });

  // Sync defaultServicio when modal opens with a pre-filled service
  React.useEffect(() => {
    if (open && defaultServicio) {
      setForm(prev => ({ ...prev, servicio: defaultServicio }));
    }
  }, [open, defaultServicio]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.telefono.trim()) return;
    setSubmitting(true);
    await base44.entities.Lead.create({
      nombre: form.nombre,
      telefono: form.telefono,
      servicio_interes: form.servicio,
      zona: form.zona,
      origen: "formulario_web",
      estado: "nuevo",
    });
    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => { onClose(); setSuccess(false); setForm({ nombre: "", telefono: "", servicio: "", zona: "" }); }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">¡Gracias!</h3>
            <p className="text-gray-600">Te llamamos en menos de 24h.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-1">Solicitar presupuesto</h3>
            <p className="text-gray-500 text-sm mb-6">Rellena el formulario y te contactamos gratis</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E53E3E]/40 focus:border-[#E53E3E]"
              />
              <input
                type="tel"
                placeholder="Teléfono *"
                required
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E53E3E]/40 focus:border-[#E53E3E]"
              />
              <select
                value={form.servicio}
                onChange={(e) => setForm({ ...form, servicio: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E53E3E]/40 focus:border-[#E53E3E] bg-white"
              >
                <option value="">Tipo de servicio</option>
                {SERVICIOS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Zona / Ciudad"
                value={form.zona}
                onChange={(e) => setForm({ ...form, zona: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E53E3E]/40 focus:border-[#E53E3E]"
              />
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#E53E3E] hover:bg-[#C53030] text-white py-6 rounded-xl font-bold text-base"
              >
                {submitting ? "Enviando..." : "Enviar solicitud"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}