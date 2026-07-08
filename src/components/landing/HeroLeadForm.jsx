import React from "react";
import LeadCaptureForm from "./LeadCaptureForm";

export default function HeroLeadForm() {
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
          <LeadCaptureForm />
        </div>
      </div>
    </section>
  );
}
