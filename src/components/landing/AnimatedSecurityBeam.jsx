import React from "react";
import { Home, ShieldAlert, Smartphone } from "lucide-react";

const NODES = [
  { label: "Tu Casa", Icon: Home, color: "#00D4FF" },
  { label: "Sistema Ajax", Icon: ShieldAlert, color: "#7C3AED" },
  { label: "Tu Móvil", Icon: Smartphone, color: "#0080FF" },
];

const STEPS = [
  "Sensor detecta movimiento",
  "Alerta en 15 segundos",
  "Notificación en tu móvil",
];

export default function AnimatedSecurityBeam() {
  return (
    <section style={{ background: "#060e1a", padding: "56px 20px" }}>
      <style>{`
        @keyframes beam-travel {
          0%   { left: 10%; opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 90%; opacity: 0; }
        }
        @keyframes beam-travel-glow {
          0%   { left: 10%; opacity: 0; }
          5%   { opacity: 0.25; }
          90%  { opacity: 0.25; }
          100% { left: 90%; opacity: 0; }
        }
        @keyframes pulse-node {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,210,255,0.25); }
          50%       { box-shadow: 0 0 0 10px rgba(0,210,255,0); }
        }
      `}</style>
      <div className="max-w-3xl mx-auto">
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 22, margin: 0 }}>
            Así protegemos tu hogar en tiempo real
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginTop: 10 }}>
            Detección instantánea · Alerta en 15 segundos · Control desde tu móvil
          </p>
        </div>

        {/* Beam animation area */}
        <div style={{ position: "relative", height: 100 }}>
          {/* Connecting line */}
          <div style={{
            position: "absolute", top: 31, left: "10%", right: "10%",
            height: 1.5,
            background: "linear-gradient(90deg, rgba(0,210,255,0.3) 0%, rgba(124,58,237,0.45) 50%, rgba(0,128,255,0.3) 100%)",
            borderRadius: 2,
          }} />

          {/* Dashed overlay on line */}
          <svg
            aria-hidden="true"
            style={{ position: "absolute", top: 25, left: "10%", width: "80%", height: 14, overflow: "visible" }}
          >
            <line x1="0" y1="7" x2="100%" y2="7"
              stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="6 5"
            />
          </svg>

          {/* Traveling dot */}
          <div style={{
            position: "absolute",
            top: 23,
            width: 18, height: 18,
            borderRadius: "50%",
            background: "radial-gradient(circle, #00D4FF 30%, #7C3AED 100%)",
            boxShadow: "0 0 10px #00D4FF",
            animation: "beam-travel 2.8s ease-in-out infinite",
            marginLeft: -9,
          }} />
          {/* Glow halo */}
          <div style={{
            position: "absolute",
            top: 15,
            width: 34, height: 34,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,210,255,0.3) 0%, transparent 70%)",
            animation: "beam-travel-glow 2.8s ease-in-out infinite",
            marginLeft: -17,
          }} />

          {/* Node icons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0 10%" }}>
            {NODES.map(({ label, Icon, color }, i) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: color + "14",
                  border: `2px solid ${color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: i === 0 ? "pulse-node 3s ease-in-out infinite" : "none",
                  boxSizing: "border-box",
                }}>
                  <Icon style={{ width: 26, height: 26, color }} />
                </div>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps row */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 10% 0", gap: 8 }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{
              flex: 1, textAlign: "center",
              padding: "8px 6px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 8,
            }}>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
