import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const SEO_LINKS = [
  { text: "Instalación de Cámaras de Seguridad en Barcelona", to: "/camaras-barcelona" },
  { text: "Cámaras de Seguridad en Sabadell", to: "/camaras-sabadell" },
  { text: "Cámaras de Seguridad en Girona", to: "/camaras-girona" },
  { text: "Cámaras de Seguridad en Tarragona", to: "/camaras-tarragona" },
  { text: "Cámaras de Seguridad en Lleida", to: "/camaras-lleida" },
  { text: "Alarmas de Seguridad en Barcelona", to: "/alarmas-barcelona" },
  { text: "Alarmas en Sabadell", to: "/alarmas-sabadell" },
  { text: "Alarmas en Girona", to: "/alarmas-girona" },
  { text: "Alarmas en Tarragona", to: "/alarmas-tarragona" },
  { text: "Alarmas en Lleida", to: "/alarmas-lleida" },
];

export default function HomeSeoLocal() {
  const [open, setOpen] = useState(false);

  return (
    <section style={{ backgroundColor: "#FFFFFF", padding: "10px 20px" }}>
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "10px 0",
            color: "#9CA3AF",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          Áreas de servicio y cobertura técnica
          <ChevronDown
            className="w-4 h-4 transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>

        <div
          style={{
            maxHeight: open ? 600 : 0,
            overflow: "hidden",
            transition: "max-height 0.35s ease",
          }}
        >
          <div style={{ paddingBottom: 16 }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {SEO_LINKS.map((link) => (
                <li key={link.to} style={{ marginBottom: 6 }}>
                  <Link
                    to={link.to}
                    style={{ color: "#6B7280", fontSize: 13, textDecoration: "underline" }}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
            <p style={{ color: "#9CA3AF", fontSize: 12, marginTop: 12, lineHeight: 1.6 }}>
              Sistemas de Alarmas de Alta Seguridad para Hogar y Negocios en Catalunya. Videovigilancia profesional Barcelona, Sabadell, Girona, Tarragona, Lleida, Hospitalet, Badalona, Cornella, Mataro, Terrassa, Sant Cugat, Castelldefels, Viladecans, El Prat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}