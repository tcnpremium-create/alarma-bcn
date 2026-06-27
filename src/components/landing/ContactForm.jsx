import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from "@/api/api";
import { CheckCircle, Loader2, Phone } from "lucide-react";
import { registerPhoneForTracking } from "@/components/tracking/useHubSpotTracking";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipo_cliente: "hogar",
    zona: "",
    servicio_interes: "",
    mensaje: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim() || formData.nombre.length < 2) {
      alert("Por favor, ingresa un nombre válido");
      return;
    }
    if (formData.email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        alert("Por favor, ingresa un email válido");
        return;
      }
    }
    if (!/^\d{9}$/.test(formData.telefono.replace(/\s/g, ''))) {
      alert("Por favor, ingresa un teléfono válido (9 dígitos)");
      return;
    }

    setLoading(true);
    const lead = await base44.entities.Lead.create({
      ...formData,
      urgencia: "media",
      origen: "formulario_web"
    });

    // Sync to HubSpot CRM
    base44.functions.invoke('syncToHubspot', {
      leadData: { ...formData, urgencia: "media", origen: "formulario_web" },
      dealStage: 'nuevo'
    }).catch(e => console.warn('HubSpot sync error:', e));

    base44.analytics.track({
      eventName: "lead_form_submitted",
      properties: { tipo_cliente: formData.tipo_cliente, zona: formData.zona, leadId: lead.id }
    });

    registerPhoneForTracking(formData.telefono);
    setSuccess(true);
    setLoading(false);
    setFormData({ nombre: "", email: "", telefono: "", tipo_cliente: "hogar", zona: "", servicio_interes: "", mensaje: "" });
    setTimeout(() => setSuccess(false), 6000);
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
        <h3 className="text-2xl sm:text-3xl font-bold text-green-900 mb-3 sm:mb-4">¡Presupuesto Solicitado!</h3>
        <p className="text-base sm:text-lg text-green-800 mb-2">
          ✅ Hemos recibido tu solicitud correctamente
        </p>
        <p className="text-sm sm:text-base text-green-700 mb-5 sm:mb-6">
          Nos pondremos en contacto contigo en menos de 24 horas
        </p>
        <a href="tel:+34638109947" className="bg-white rounded-xl p-4 inline-flex items-center gap-2 active:bg-gray-50 transition-colors" style={{ touchAction: "manipulation" }}>
          <Phone className="w-5 h-5 text-[#E63946]" />
          <p className="text-sm text-gray-600">
            ¿Urgente? Llámanos al <strong className="text-[#E63946]">638 10 99 47</strong>
          </p>
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" noValidate>
      {/* Nombre y Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="nombre" className="text-sm font-medium text-gray-700">Nombre completo *</label>
          <input
            id="nombre"
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
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email <span className="text-gray-400">(opcional)</span></label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{ fontSize: 16 }}
            className="h-12 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#E63946] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Teléfono y Tipo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="telefono" className="text-sm font-medium text-gray-700">Teléfono *</label>
          <input
            id="telefono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="6XX XXX XXX"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value.replace(/\D/g, '').slice(0, 9) })}
            required
            style={{ fontSize: 16 }}
            className="h-12 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#E63946] focus:outline-none transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tipo_cliente" className="text-sm font-medium text-gray-700">Tipo de propiedad</label>
          <Select value={formData.tipo_cliente} onValueChange={(value) => setFormData({ ...formData, tipo_cliente: value })}>
            <SelectTrigger id="tipo_cliente" style={{ fontSize: 16 }} className="h-12 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:border-[#E63946] transition-colors">
              <SelectValue placeholder="Selecciona..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hogar">🏠 Hogar / Vivienda</SelectItem>
              <SelectItem value="negocio">🏢 Negocio / Comercio</SelectItem>
              <SelectItem value="comunidad">🏘️ Comunidad</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Zona y Servicio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="zona" className="text-sm font-medium text-gray-700">Zona / Barrio</label>
          <input
            id="zona"
            type="text"
            inputMode="text"
            autoComplete="address-level2"
            placeholder="Ej: Eixample, Gràcia..."
            value={formData.zona}
            onChange={(e) => setFormData({ ...formData, zona: e.target.value })}
            style={{ fontSize: 16 }}
            className="h-12 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#E63946] focus:outline-none transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="servicio" className="text-sm font-medium text-gray-700">Servicio de interés</label>
          <Select value={formData.servicio_interes} onValueChange={(value) => setFormData({ ...formData, servicio_interes: value })}>
            <SelectTrigger id="servicio" style={{ fontSize: 16 }} className="h-12 px-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:border-[#E63946] transition-colors">
              <SelectValue placeholder="Selecciona servicio..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cámaras de seguridad">📹 Cámaras de seguridad</SelectItem>
              <SelectItem value="Sistema de alarma">🔔 Sistema de alarma</SelectItem>
              <SelectItem value="Control de accesos">🚪 Control de accesos</SelectItem>
              <SelectItem value="Videovigilancia comunidad">🏘️ Videovigilancia comunidad</SelectItem>
              <SelectItem value="Pack completo seguridad">📦 Pack completo seguridad</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mensaje */}
      <div className="flex flex-col gap-1">
        <label htmlFor="mensaje" className="text-sm font-medium text-gray-700">Mensaje <span className="text-gray-400">(opcional)</span></label>
        <textarea
          id="mensaje"
          placeholder="Cuéntanos qué necesitas..."
          value={formData.mensaje}
          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
          rows={3}
          style={{ fontSize: 16, resize: "none" }}
          className="px-4 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#E63946] focus:outline-none transition-colors"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
        className="w-full bg-[#E63946] hover:bg-[#d32f3c] active:bg-[#c12f3a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl h-14 sm:h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] min-h-[56px]"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Enviando...
          </>
        ) : (
          "Presupuesto →"
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center leading-relaxed">
        🔒 Tus datos están protegidos. Solo se usarán para contactarte.
      </p>
    </form>
  );
}