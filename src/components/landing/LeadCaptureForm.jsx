import React, { useState } from "react";
import { User, Mail, Phone, MapPin, MessageSquare, CheckCircle } from "lucide-react";
import { LeadAPI } from "@/api/api";

const inputStyle = {
  width: "100%", boxSizing: "border-box",
  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 10, padding: "13px 16px 13px 42px", fontSize: 16, color: "#F1F5F9", outline: "none",
};
const selectStyle = { ...inputStyle, padding: "13px 16px", appearance: "auto" };
const iconStyle = { position: "absolute", left: 14, top: 16, color: "#64748B", pointerEvents: "none" };
// Labels claros sobre fondo oscuro — antes usaban un gris pensado para
// fondo claro (text-gray-700) y quedaban casi ilegibles aquí.
const labelStyle = { display: "block", fontSize: 12.5, fontWeight: 700, color: "#CBD5E0", marginBottom: 6, letterSpacing: "0.01em" };

const ESPACIOS = ["Vivienda", "Restaurante", "Comercio", "Oficina", "Comunidad", "Nave", "Evento", "Otro"];
const TAMANOS = ["Menos de 50 m²", "50–150 m²", "150–300 m²", "300–500 m²", "Más de 500 m²"];
const NECESIDADES = ["Música ambiental", "Altavoces empotrados", "Altavoces Bluetooth", "Megafonía", "Sistema multizona", "Sonido profesional", "Otro"];

function tipoClienteFor(espacio) {
  if (espacio === "Vivienda") return "hogar";
  if (espacio === "Comunidad") return "comunidad";
  return "negocio";
}

// Formulario único de presupuesto/contacto, usado desde el drawer global
// en todas las páginas. El servicio llega preseleccionado (no hay que
// volver a pedírselo al usuario) y solo Sonorización añade sus 3
// preguntas de cualificación — el resto de servicios usan los mismos
// campos comunes, sin inventar columnas nuevas en el backend.
export default function LeadCaptureForm({ service = "", onSuccess }) {
  const isSonorizacion = service === "Sonorización";
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", zona: "", mensaje: "", espacio: "", tamano: "", necesidad: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.telefono.trim()) {
      setError("Nombre y teléfono son obligatorios.");
      return;
    }
    if (!/^\d{9}$/.test(form.telefono.replace(/\s/g, ""))) {
      setError("Indica un teléfono válido (9 dígitos).");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const qualifiers = isSonorizacion
        ? [
          form.espacio && `Espacio a sonorizar: ${form.espacio}`,
          form.tamano && `Tamaño aproximado: ${form.tamano}`,
          form.necesidad && `Necesidad: ${form.necesidad}`,
        ].filter(Boolean).join(" · ")
        : "";

      await LeadAPI.create({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        telefono: form.telefono.replace(/\s/g, ""),
        zona: form.zona.trim(),
        tipo_cliente: isSonorizacion ? tipoClienteFor(form.espacio) : "hogar",
        servicio_interes: service || "",
        mensaje: [qualifiers, form.mensaje.trim()].filter(Boolean).join(" — "),
        origen: "formulario_web",
      });
      setStatus("success");
      onSuccess?.();
    } catch (err) {
      console.error("Error enviando formulario de presupuesto:", err);
      setStatus("error");
      setError("No se ha podido enviar. Llámanos al 638 10 99 47 o inténtalo de nuevo.");
    }
  };

  if (status === "success") {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        padding: "28px 16px", background: "rgba(34,197,94,0.08)",
        border: "1px solid rgba(34,197,94,0.3)", borderRadius: 14, textAlign: "center",
      }}>
        <CheckCircle size={30} color="#22C55E" />
        <p style={{ color: "#F1F5F9", fontSize: 15, fontWeight: 700, margin: 0 }}>
          ¡Solicitud recibida, {form.nombre.split(" ")[0]}!
        </p>
        <p style={{ color: "#94A3B8", fontSize: 13, margin: 0 }}>
          Te llamamos en menos de 24h. Revisa también tu email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {service && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16,
          background: "rgba(229,62,62,0.1)", border: "1px solid rgba(229,62,62,0.28)",
          borderRadius: 20, padding: "6px 14px",
        }}>
          <span style={{ color: "#94A3B8", fontSize: 12 }}>Presupuesto de</span>
          <span style={{ color: "#F87171", fontSize: 12.5, fontWeight: 800 }}>{service}</span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {isSonorizacion && (
          <>
            <div>
              <label style={labelStyle} htmlFor="lcf-espacio">¿Qué necesitas sonorizar?</label>
              <select id="lcf-espacio" value={form.espacio} onChange={set("espacio")} style={selectStyle}>
                <option value="">Selecciona...</option>
                {ESPACIOS.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="grid sm:grid-cols-2" style={{ gap: 14 }}>
              <div>
                <label style={labelStyle} htmlFor="lcf-tamano">Tamaño aproximado</label>
                <select id="lcf-tamano" value={form.tamano} onChange={set("tamano")} style={selectStyle}>
                  <option value="">Selecciona...</option>
                  {TAMANOS.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle} htmlFor="lcf-necesidad">¿Qué necesitas?</label>
                <select id="lcf-necesidad" value={form.necesidad} onChange={set("necesidad")} style={selectStyle}>
                  <option value="">Selecciona...</option>
                  {NECESIDADES.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
          </>
        )}

        <div>
          <label style={labelStyle} htmlFor="lcf-nombre">Nombre *</label>
          <div style={{ position: "relative" }}>
            <User size={16} style={iconStyle} />
            <input id="lcf-nombre" type="text" autoComplete="name" required value={form.nombre} onChange={set("nombre")} style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle} htmlFor="lcf-telefono">Teléfono *</label>
          <div style={{ position: "relative" }}>
            <Phone size={16} style={iconStyle} />
            <input id="lcf-telefono" type="tel" inputMode="tel" autoComplete="tel" placeholder="6XX XXX XXX" required value={form.telefono} onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value.replace(/\D/g, "").slice(0, 9) }))} style={inputStyle} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2" style={{ gap: 14 }}>
          <div>
            <label style={labelStyle} htmlFor="lcf-email">Email <span style={{ fontWeight: 400, color: "#64748B" }}>(opcional)</span></label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={iconStyle} />
              <input id="lcf-email" type="email" autoComplete="email" value={form.email} onChange={set("email")} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle} htmlFor="lcf-zona">Zona / localidad <span style={{ fontWeight: 400, color: "#64748B" }}>(opcional)</span></label>
            <div style={{ position: "relative" }}>
              <MapPin size={16} style={iconStyle} />
              <input id="lcf-zona" type="text" autoComplete="address-level2" placeholder="Ej: Eixample, Sabadell..." value={form.zona} onChange={set("zona")} style={inputStyle} />
            </div>
          </div>
        </div>
        <div>
          <label style={labelStyle} htmlFor="lcf-mensaje">Mensaje <span style={{ fontWeight: 400, color: "#64748B" }}>(opcional)</span></label>
          <div style={{ position: "relative" }}>
            <MessageSquare size={16} style={iconStyle} />
            <textarea
              id="lcf-mensaje"
              placeholder="Cuéntanos qué necesitas..."
              rows={3}
              value={form.mensaje}
              onChange={set("mensaje")}
              style={{ ...inputStyle, resize: "vertical", minHeight: 84 }}
            />
          </div>
        </div>
      </div>

      {error && <p style={{ color: "#FCA5A5", fontSize: 13, marginTop: 14, marginBottom: 0 }}>{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          width: "100%", marginTop: 20,
          background: "#E53E3E", color: "#fff", fontWeight: 700, fontSize: 15.5,
          borderRadius: 50, padding: "15px 0", border: "none",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          opacity: status === "loading" ? 0.7 : 1,
          boxShadow: "0 0 28px rgba(229,62,62,0.3)",
        }}
      >
        {status === "loading" ? "Enviando..." : "Solicitar presupuesto gratis"}
      </button>
      <p style={{ fontSize: 11.5, color: "#64748B", textAlign: "center", marginTop: 12, marginBottom: 0 }}>
        🔒 Tus datos están protegidos. Solo se usarán para contactarte.
      </p>
    </form>
  );
}
