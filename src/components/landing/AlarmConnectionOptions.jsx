import React from "react";
import { Smartphone, ShieldCheck } from "lucide-react";

// Las alarmas Ajax se pueden instalar sin conexión a central receptora (CRA)
// o conectadas a una. Lo decide el cliente y se ofrecen las dos. El precio
// del sistema NO incluye la conexión a CRA: es un servicio aparte.
const OPTIONS = [
  {
    Icon: Smartphone,
    title: "Sin conexión a central",
    badge: "Sin cuotas",
    desc: "La alarma te avisa en el móvil con una notificación y suena la sirena. Tú controlas el sistema desde la app, sin cuotas ni permanencia.",
  },
  {
    Icon: ShieldCheck,
    title: "Con conexión a central receptora (CRA)",
    badge: "Servicio opcional",
    desc: "Una central receptora homologada vigila tu alarma las 24 horas y puede verificar el aviso y avisar a las autoridades. Se contrata aparte: no está incluida en el precio del sistema.",
  },
];

export default function AlarmConnectionOptions({ onRequestQuote }) {
  return (
    <section style={{ backgroundColor: "#fff", padding: "56px 24px" }}>
      <div className="max-w-4xl mx-auto">
        <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 8px", textAlign: "center" }}>
          Con o sin central receptora: tú eliges
        </h2>
        <p style={{ color: "#6B7280", fontSize: 15, textAlign: "center", margin: "0 0 28px" }}>
          Instalamos la alarma Ajax de las dos formas y la decisión es tuya.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {OPTIONS.map(({ Icon, title, badge, desc }) => (
            <div key={title} style={{ background: "#F8F9FA", borderRadius: 18, padding: 24, border: "1px solid #E5E7EB" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(229,62,62,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={20} color="#E53E3E" />
                </span>
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", color: "#E53E3E" }}>{badge}</span>
              </div>
              <h3 style={{ fontWeight: 800, fontSize: 17, color: "#0A0A1A", margin: "0 0 8px" }}>{title}</h3>
              <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button
            type="button"
            onClick={onRequestQuote}
            style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "14px 28px", border: "none", cursor: "pointer" }}
          >
            Pedir presupuesto de alarma →
          </button>
        </div>
      </div>
    </section>
  );
}
