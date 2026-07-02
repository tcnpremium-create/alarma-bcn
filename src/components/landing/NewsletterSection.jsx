import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, CheckCircle } from "lucide-react";
import { NewsletterAPI } from "@/api/api";

export default function NewsletterSection() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Introduce tu email para suscribirte.");
      return;
    }
    if (!aceptaPrivacidad) {
      setError("Debes aceptar la Política de Privacidad para continuar.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      await NewsletterAPI.subscribe({ nombre, email, aceptaPrivacidad });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "No se ha podido completar la suscripción. Inténtalo de nuevo.");
    }
  };

  return (
    <section style={{ background: "#060B14", padding: "72px 20px" }}>
      <div style={{
        maxWidth: 640, margin: "0 auto",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20, padding: "48px 32px",
        textAlign: "center"
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: "rgba(229,62,62,0.12)", border: "1px solid rgba(229,62,62,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px"
        }}>
          <Mail size={22} color="#E53E3E" />
        </div>

        <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 900, color: "#FFFFFF", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
          Únete a nuestra newsletter
        </h2>
        <p style={{ fontSize: 14, color: "#94A3B8", margin: "0 0 32px", lineHeight: 1.7, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
          Consejos de seguridad, novedades de producto y ofertas exclusivas para tu hogar o negocio. Sin spam, cancela cuando quieras.
        </p>

        {status === "success" ? (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            padding: "20px 16px", background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.3)", borderRadius: 14
          }}>
            <CheckCircle size={28} color="#22C55E" />
            <p style={{ color: "#F1F5F9", fontSize: 14, fontWeight: 600, margin: 0 }}>
              ¡Gracias por suscribirte! Revisa tu bandeja de entrada.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="newsletter-fields" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <input
                type="text"
                placeholder="Nombre (opcional)"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10, padding: "13px 16px", fontSize: 14, color: "#F1F5F9", outline: "none"
                }}
              />
              <input
                type="email"
                placeholder="Tu email *"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10, padding: "13px 16px", fontSize: 14, color: "#F1F5F9", outline: "none"
                }}
              />
            </div>

            <label style={{
              display: "flex", alignItems: "flex-start", gap: 10, textAlign: "left",
              marginBottom: 20, cursor: "pointer"
            }}>
              <input
                type="checkbox"
                required
                checked={aceptaPrivacidad}
                onChange={(e) => setAceptaPrivacidad(e.target.checked)}
                style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0, accentColor: "#E53E3E", cursor: "pointer" }}
              />
              <span style={{ fontSize: 12.5, color: "#94A3B8", lineHeight: 1.6 }}>
                He leído y acepto la{" "}
                <Link to="/Privacidad" style={{ color: "#FC8181", textDecoration: "underline" }}>
                  Política de Privacidad
                </Link>{" "}
                y el tratamiento de mis datos para recibir comunicaciones. *
              </span>
            </label>

            {error && (
              <p style={{ color: "#FCA5A5", fontSize: 13, marginBottom: 16 }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                width: "100%", background: "#E53E3E", color: "#fff",
                fontWeight: 700, fontSize: 15, borderRadius: 50, padding: "15px 0",
                border: "none", cursor: status === "loading" ? "not-allowed" : "pointer",
                opacity: status === "loading" ? 0.7 : 1,
                boxShadow: "0 0 32px rgba(229,62,62,0.25)"
              }}
            >
              {status === "loading" ? "Enviando..." : "Suscribirse"}
            </button>
          </form>
        )}

        <style>{`
          @media (max-width: 560px) {
            .newsletter-fields { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
