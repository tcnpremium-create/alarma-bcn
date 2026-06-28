import React, { useState } from "react";
import { MapPin, Phone, CheckCircle, Shield, Camera, Fingerprint, Wrench, ChevronRight } from "lucide-react";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";
import CityLandingSEO from "../seo/CityLandingSEO";
import HeroContactModal from "./HeroContactModal";
import { base44 } from "@/api/api";

const SERVICES = [
  { Icon: Shield, title: "Alarmas inteligentes AJAX", desc: "Paneles de control, sensores inalámbricos, detectores de movimiento, sirenas y notificaciones instantáneas en el móvil." },
  { Icon: Camera, title: "Videovigilancia 4K Hikvision", desc: "Cámaras IP 4K con visión nocturna en color, grabación local sin cuotas y control remoto desde cualquier dispositivo." },
  { Icon: Fingerprint, title: "Control de accesos biométrico", desc: "Huella dactilar, tarjeta NFC, código PIN y registro completo de entradas y salidas. Sin llaves, sin duplicados." },
  { Icon: Wrench, title: "Mantenimiento y soporte 24/7", desc: "Revisiones técnicas periódicas, soporte inmediato, actualizaciones de firmware y garantía de por vida en equipos." }
];

const WHY_US = [
  "Más de 15 años de experiencia en Catalunya",
  "Instalación en 24-48h sin obras ni roturas",
  "Presupuesto gratuito y sin compromiso",
  "Sin permanencia obligatoria",
  "Tecnología AJAX + Hikvision certificada",
  "Garantía de por vida en equipos"
];

export default function CityLandingTemplate({ city, seoPath, intro }) {
  const [showModal, setShowModal] = useState(false);
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
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", paddingBottom: 70 }}>
      <CityLandingSEO path={seoPath} />
      <Navbar />

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0A0A1A 0%, #0F1923 60%, #1a2a3a 100%)", paddingTop: 112, paddingBottom: 64 }}>
        <div className="max-w-5xl mx-auto" style={{ padding: "0 24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
            <MapPin style={{ width: 13, height: 13, color: "#F87171" }} />
            <span style={{ color: "#F87171", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>Catalunya • {city}</span>
          </div>
          <h1 style={{ fontWeight: 900, fontSize: "clamp(28px, 5vw, 52px)", color: "#fff", lineHeight: 1.1, margin: "0 0 16px" }}>
            Instalación de Alarmas y Cámaras de Seguridad en {city}
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.75, margin: "0 0 32px", maxWidth: 580 }}>
            {intro}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => setShowModal(true)}
              style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "14px 28px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
            >
              Solicitar presupuesto gratis <ChevronRight style={{ width: 18, height: 18 }} />
            </button>
            <a
              href="tel:+34638109947"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 50, padding: "14px 24px", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
            >
              <Phone style={{ width: 16, height: 16 }} />
              Llamar
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "64px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <span style={{ display: "inline-block", backgroundColor: "#E53E3E", color: "#fff", borderRadius: 4, fontSize: 11, fontWeight: 800, padding: "5px 12px", letterSpacing: "0.08em", marginBottom: 16 }}>
            SERVICIOS EN {city.toUpperCase()}
          </span>
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#0A0A1A", margin: "0 0 32px" }}>Todo lo que instalamos</h2>
          <div className="grid sm:grid-cols-2" style={{ gap: 20 }}>
            {SERVICES.map(({ Icon, title, desc }) => (
              <div key={title} style={{ backgroundColor: "#fff", borderRadius: 14, padding: "24px 20px", borderLeft: "3px solid #E53E3E", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <Icon style={{ width: 24, height: 24, color: "#E53E3E", marginBottom: 12 }} />
                <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0A0A1A", margin: "0 0 8px" }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section style={{ backgroundColor: "#0A0A1A", padding: "64px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2" style={{ gap: 40, alignItems: "center" }}>
            <div>
              <span style={{ display: "inline-block", backgroundColor: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", color: "#F87171", borderRadius: 20, fontSize: 11, fontWeight: 700, padding: "5px 14px", letterSpacing: 1, marginBottom: 16 }}>
                ¿POR QUÉ ELEGIRNOS?
              </span>
              <h2 style={{ fontWeight: 900, fontSize: 26, color: "#fff", margin: "0 0 24px" }}>
                La empresa de referencia en {city}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {WHY_US.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <CheckCircle style={{ width: 18, height: 18, color: "#E53E3E", flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "#D1D5DB" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {[["15+", "Años experiencia"], ["2.500+", "Sistemas activos"], ["24h", "Tiempo instalación"], ["24/7", "Soporte técnico"]].map(([num, label]) => (
                <div key={label} style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "20px 24px", flex: "1 1 120px", border: "1px solid rgba(255,255,255,0.08)", minWidth: 120 }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#E53E3E", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section style={{ backgroundColor: "#fff", padding: "64px 24px" }}>
        <div className="max-w-lg mx-auto">
          <span style={{ display: "inline-block", backgroundColor: "#E53E3E", color: "#fff", borderRadius: 4, fontSize: 11, fontWeight: 800, padding: "5px 12px", letterSpacing: "0.08em", marginBottom: 16 }}>
            PRESUPUESTO GRATUITO
          </span>
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#0A0A1A", margin: "0 0 8px" }}>
            Solicita tu presupuesto en {city}
          </h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 28 }}>Sin compromiso · Respuesta en menos de 24h</p>
          {sent ? (
            <div style={{ backgroundColor: "#F0FFF4", border: "2px solid #9AE6B4", borderRadius: 16, padding: 32, textAlign: "center" }}>
              <CheckCircle style={{ width: 48, height: 48, color: "#38A169", margin: "0 auto 16px", display: "block" }} />
              <h3 style={{ fontWeight: 800, fontSize: 20, color: "#276749", margin: "0 0 8px" }}>¡Solicitud enviada!</h3>
              <p style={{ color: "#2F855A", marginBottom: 20 }}>Te contactaremos en menos de 24h con tu presupuesto personalizado.</p>
              <a href="tel:+34638109947" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, borderRadius: 50, padding: "12px 24px", textDecoration: "none" }}>
                <Phone style={{ width: 16, height: 16 }} />
                Llamar ahora
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ backgroundColor: "#F8F9FA", borderRadius: 16, padding: 28, border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Nombre *</label>
                <input
                  type="text" required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Tu nombre completo"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #D1D5DB", fontSize: 14, outline: "none", boxSizing: "border-box", backgroundColor: "#fff" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Teléfono *</label>
                <input
                  type="tel" required
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  placeholder="600 000 000"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #D1D5DB", fontSize: 14, outline: "none", boxSizing: "border-box", backgroundColor: "#fff" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Mensaje (opcional)</label>
                <textarea
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  rows={3}
                  placeholder="Describe brevemente lo que necesitas..."
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #D1D5DB", fontSize: 14, outline: "none", boxSizing: "border-box", resize: "none", backgroundColor: "#fff" }}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "15px 0", border: "none", cursor: sending ? "not-allowed" : "pointer", opacity: sending ? 0.7 : 1 }}
              >
                {sending ? "Enviando..." : "Solicitar presupuesto →"}
              </button>
              <p style={{ fontSize: 12, color: "#9CA3AF", textAlign: "center", margin: 0 }}>Sin compromiso · Respuesta en menos de 24h</p>
            </form>
          )}
        </div>
      </section>

      <FooterSection />

      {showModal && (
        <HeroContactModal
          defaultServicio={`Seguridad en ${city}`}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
