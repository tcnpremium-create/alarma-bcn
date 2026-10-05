import React from "react";
import { ALARM_KITS } from "@/data/alarmKits";
import KitPhotos from "./KitPhotos";

// Sección que va DESPUÉS de los kits: enseña con fotos lo que lleva cada uno.
// Dentro de las tarjetas de los kits no hay imágenes.
export default function KitShowcase({ onRequestQuote }) {
  return (
    <section style={{ background: "#0A1120", padding: "8px 24px 64px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <h2 style={{ color: "#F1F5F9", fontSize: "clamp(1.3rem, 2.6vw, 1.8rem)", fontWeight: 900, margin: "0 0 6px" }}>Así son los equipos de cada kit</h2>
          <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>Lo que te instalamos, equipo a equipo.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {ALARM_KITS.map((kit) => (
            <div key={kit.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "22px 20px" }}>
              <h3 style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 800, margin: "0 0 2px" }}>{kit.title}</h3>
              <p style={{ color: "#94A3B8", fontSize: 12, margin: "0 0 16px" }}>{kit.isFrom ? "Desde " : ""}{kit.price} € + IVA</p>
              <KitPhotos photos={kit.photos} size={78} />
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 26 }}>
          <button type="button" onClick={onRequestQuote} style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "14px 28px", border: "none", cursor: "pointer" }}>
            Pedir presupuesto de alarma →
          </button>
        </div>
      </div>
    </section>
  );
}
