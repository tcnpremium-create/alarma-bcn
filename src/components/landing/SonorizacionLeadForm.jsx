import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/api";
import { CheckCircle, Loader2, Phone } from "lucide-react";
import { registerPhoneForTracking } from "@/components/tracking/useHubSpotTracking";

// Formulario corto de cualificación para Sonorización. El backend (api/lead.js)
// solo persiste un conjunto fijo de columnas (nombre, telefono, tipo_cliente,
// zona, servicio_interes, mensaje...) — cualquier campo nuevo que no exista ahí
// se perdería o rompería el insert. Por eso las 3 respuestas de cualificación
// se componen dentro de servicio_interes/mensaje en vez de inventar columnas.
const ESPACIOS = ["Vivienda", "Restaurante", "Comercio", "Oficina", "Comunidad", "Nave", "Evento", "Otro"];
const TAMANOS = ["Menos de 50 m²", "50–150 m²", "150–300 m²", "300–500 m²", "Más de 500 m²"];
const NECESIDADES = ["Música ambiental", "Altavoces empotrados", "Altavoces Bluetooth", "Megafonía", "Sistema multizona", "Sonido profesional", "Otro"];

function tipoClienteFor(espacio) {
  if (espacio === "Vivienda") return "hogar";
  if (espacio === "Comunidad") return "comunidad";
  return "negocio";
}

export default function SonorizacionLeadForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    espacio: "",
    tamano: "",
    necesidad: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.nombre.trim() || formData.nombre.trim().length < 2) {
      setError("Por favor, indica tu nombre.");
      return;
    }
    if (!/^\d{9}$/.test(formData.telefono.replace(/\s/g, ""))) {
      setError("Por favor, indica un teléfono válido (9 dígitos).");
      return;
    }

    setLoading(true);
    try {
      const mensaje = [
        formData.espacio && `Espacio a sonorizar: ${formData.espacio}`,
        formData.tamano && `Tamaño aproximado: ${formData.tamano}`,
        formData.necesidad && `Necesidad: ${formData.necesidad}`,
      ].filter(Boolean).join(" · ");

      await base44.entities.Lead.create({
        nombre: formData.nombre.trim(),
        telefono: formData.telefono.replace(/\s/g, ""),
        tipo_cliente: tipoClienteFor(formData.espacio),
        servicio_interes: formData.espacio ? `Sonorización — ${formData.espacio}` : "Sonorización",
        mensaje: mensaje || "Solicitud de presupuesto de sonorización",
        urgencia: "media",
        origen: "formulario_web",
      });

      registerPhoneForTracking(formData.telefono);
      setSuccess(true);
      setFormData({ nombre: "", telefono: "", espacio: "", tamano: "", necesidad: "" });
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      console.error("Error enviando formulario de sonorización:", err);
      setError("No hemos podido enviar tu solicitud. Llámanos o inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-2xl p-6 sm:p-10 text-center shadow-xl"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-green-900 mb-3 sm:mb-4">¡Presupuesto solicitado!</h3>
        <p className="text-base sm:text-lg text-green-800 mb-2">Hemos recibido tu solicitud correctamente</p>
        <p className="text-sm sm:text-base text-green-700 mb-5 sm:mb-6">Nos pondremos en contacto contigo en menos de 24 horas</p>
        <a href="tel:+34638109947" className="bg-white rounded-xl p-4 inline-flex items-center gap-2 active:bg-gray-50 transition-colors" style={{ touchAction: "manipulation" }}>
          <Phone className="w-5 h-5 text-[#E63946]" />
          <p className="text-sm text-gray-600">¿Urgente? Llámanos al <strong className="text-[#E63946]">638 10 99 47</strong></p>
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="flex flex-col gap-1">
        <label htmlFor="son-espacio" className="text-sm font-medium text-gray-700">¿Qué necesitas sonorizar?</label>
        <Select value={formData.espacio} onValueChange={(v) => setFormData({ ...formData, espacio: v })}>
          <SelectTrigger id="son-espacio" style={{ fontSize: 16 }} className="h-12 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:border-[#E63946] transition-colors">
            <SelectValue placeholder="Selecciona..." />
          </SelectTrigger>
          <SelectContent>
            {ESPACIOS.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="son-tamano" className="text-sm font-medium text-gray-700">Tamaño aproximado</label>
          <Select value={formData.tamano} onValueChange={(v) => setFormData({ ...formData, tamano: v })}>
            <SelectTrigger id="son-tamano" style={{ fontSize: 16 }} className="h-12 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:border-[#E63946] transition-colors">
              <SelectValue placeholder="Selecciona..." />
            </SelectTrigger>
            <SelectContent>
              {TAMANOS.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="son-necesidad" className="text-sm font-medium text-gray-700">¿Qué necesitas?</label>
          <Select value={formData.necesidad} onValueChange={(v) => setFormData({ ...formData, necesidad: v })}>
            <SelectTrigger id="son-necesidad" style={{ fontSize: 16 }} className="h-12 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:border-[#E63946] transition-colors">
              <SelectValue placeholder="Selecciona..." />
            </SelectTrigger>
            <SelectContent>
              {NECESIDADES.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="son-nombre" className="text-sm font-medium text-gray-700">Nombre completo *</label>
          <input
            id="son-nombre"
            type="text"
            inputMode="text"
            autoComplete="name"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
            minLength={2}
            style={{ fontSize: 16 }}
            className="h-12 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#E63946] focus:outline-none transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="son-telefono" className="text-sm font-medium text-gray-700">Teléfono *</label>
          <input
            id="son-telefono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="6XX XXX XXX"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value.replace(/\D/g, "").slice(0, 9) })}
            required
            style={{ fontSize: 16 }}
            className="h-12 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#E63946] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
        className="w-full bg-[#E63946] hover:bg-[#d32f3c] active:bg-[#c12f3a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] min-h-[56px]"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Enviando...
          </>
        ) : (
          "Solicitar presupuesto →"
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center leading-relaxed">
        🔒 Tus datos están protegidos. Solo se usarán para contactarte.
      </p>
    </form>
  );
}
