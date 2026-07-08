import React, { useState } from "react";
import { User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { LeadAPI } from "@/api/api";

const inputStyle = {
  width: "100%", boxSizing: "border-box",
  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 10, padding: "13px 16px 13px 42px", fontSize: 14.5, color: "#F1F5F9", outline: "none",
};
const iconStyle = { position: "absolute", left: 14, top: 16, color: "#64748B", pointerEvents: "none" };

export default function HeroLeadForm() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.telefono.trim() || !form.email.trim()) {
      setError("Nombre, email y teléfono son obligatorios.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      await LeadAPI.create({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim(),
        mensaje: form.mensaje.trim(),
        origen: "formulario_web",
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError("No se ha podido enviar. Llámanos al 638 10 99 47 o inténtalo de nuevo.");
    }
  };

  return (
    <section id="solicitar-presupuesto" style={{ background: "#0A1120", padding: "56px 20px 72px" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20, padding: "36px 28px",
        }}>
          <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.7rem)", fontWeight: 900, color: "#FFFFFF", margin: "0 0 8px", textAlign: "center" }}>
            Solicita tu presupuesto gratis
          </h2>
          <p style={{ fontSize: 13.5, color: "#94A3B8", margin: "0 0 28px", textAlign: "center" }}>
            Sin compromiso. Te contactamos en menos de 24h.
          </p>

          {status === "success" ? (
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
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ position: "relative" }}>
                  <User size={16} style={iconStyle} />
                  <input type="text" placeholder="Nombre *" required value={form.nombre} onChange={set("nombre")} style={inputStyle} />
                </div>
                <div style={{ position: "relative" }}>
                  <Mail size={16} style={iconStyle} />
                  <input type="email" placeholder="Correo electrónico *" required value={form.email} onChange={set("email")} style={inputStyle} />
                </div>
                <div style={{ position: "relative" }}>
                  <Phone size={16} style={iconStyle} />
                  <input type="tel" placeholder="Teléfono *" required value={form.telefono} onChange={set("telefono")} style={inputStyle} />
                </div>
                <div style={{ position: "relative" }}>
                  <MessageSquare size={16} style={iconStyle} />
                  <textarea
                    placeholder="Cuéntanos qué necesitas (opcional)"
                    rows={4}
                    value={form.mensaje}
                    onChange={set("mensaje")}
                    style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
                  />
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
                {status === "loading" ? "Enviando..." : "Solicitar Presupuesto Gratis"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
