import React from "react";
import { Link } from "react-router-dom";
import { Smartphone, Video, Wifi, Volume2 } from "lucide-react";

const PILLS = [
  { Icon: Smartphone, label: "App Móvil" },
  { Icon: Video, label: "Cámara HD" },
  { Icon: Wifi, label: "Integración" },
  { Icon: Volume2, label: "Audio HD" },
];

export default function HomeVideoporterosTeaser() {
  return (
    <section style={{ backgroundColor: "#FFFFFF", padding: "32px 20px" }}>
      <div style={{ height: 4, backgroundColor: "#0A0A1A", width: "100%", marginBottom: 24 }} />
      <div className="max-w-2xl mx-auto">
        <span style={{ display: "inline-block", backgroundColor: "#0A0A1A", color: "#fff", borderRadius: 20, fontSize: 11, fontWeight: 800, padding: "6px 14px", marginBottom: 12 }}>
          VIDEOPORTEROS IP
        </span>
        <h3 style={{ fontWeight: 900, fontSize: 22, color: "#0A0A1A", lineHeight: 1.2, margin: 0 }}>
          ¿Quién llama? Vélo en HD desde tu móvil.
        </h3>

        <img
          src="/images/videoportero.jpeg"
          alt="Videoportero IP HD"
          style={{
            width: "100%",
            borderRadius: 16,
            marginTop: 16,
            marginBottom: 4,
            objectFit: "cover",
            maxHeight: 240,
            display: "block",
            boxShadow: "0 4px 24px rgba(0,0,0,0.10)"
          }}
        />

        <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.6, marginTop: 12 }}>
          Instalamos videoporteros Fermax, Bticino y Golmar para hogares, comunidades y empresas. Apertura remota desde cualquier lugar del mundo.
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: 16, overflowX: "auto", paddingBottom: 4 }}>
          {PILLS.map(({ Icon, label }) => (
            <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "#F3F4F6", borderRadius: 20, padding: "8px 14px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>
              <Icon style={{ width: 13, height: 13, color: "#0A0A1A" }} />
              {label}
            </span>
          ))}
        </div>
        <Link to="/videoporteros" style={{ display: "block", width: "100%", backgroundColor: "#0A0A1A", color: "#fff", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: 16, border: "none", textAlign: "center", textDecoration: "none", marginTop: 20, boxSizing: "border-box" }}>
          Ver videoporteros →
        </Link>
      </div>
    </section>
  );
}
