import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

// Localidades realmente cubiertas: área metropolitana de Barcelona +
// capitales de provincia donde existen páginas locales dedicadas
// (camaras-X / alarmas-X). Lista única — no repetir en otras secciones de Home.
const ZONES = [
  "Barcelona", "Eixample", "Gràcia", "Sarrià-Sant Gervasi", "Sants-Montjuïc",
  "Les Corts", "Hospitalet de Llobregat", "Badalona", "Cornellà", "Esplugues",
  "Sant Cugat", "Castelldefels", "Gavà", "Terrassa", "Sabadell",
  "Mataró", "Granollers", "Girona", "Tarragona", "Lleida",
];

const LOCAL_PAGES = [
  { text: "Cámaras de Seguridad en Barcelona", to: "/camaras-barcelona" },
  { text: "Cámaras de Seguridad en Sabadell", to: "/camaras-sabadell" },
  { text: "Cámaras de Seguridad en Girona", to: "/camaras-girona" },
  { text: "Cámaras de Seguridad en Tarragona", to: "/camaras-tarragona" },
  { text: "Cámaras de Seguridad en Lleida", to: "/camaras-lleida" },
  { text: "Alarmas en Barcelona", to: "/alarmas-barcelona" },
  { text: "Alarmas en Sabadell", to: "/alarmas-sabadell" },
  { text: "Alarmas en Girona", to: "/alarmas-girona" },
  { text: "Alarmas en Tarragona", to: "/alarmas-tarragona" },
  { text: "Alarmas en Lleida", to: "/alarmas-lleida" },
];

export default function HomeSeoLocal() {
  return (
    <section style={{ backgroundColor: "#F8F9FA", padding: "64px 20px" }}>
      <div className="max-w-4xl mx-auto">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <MapPin style={{ width: 20, height: 20, color: "#E53E3E" }} />
            <span style={{ color: "#E53E3E", fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: "uppercase" }}>
              Cobertura
            </span>
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 28, color: "#0A0A1A", margin: 0, lineHeight: 1.2 }}>
            Dónde trabajamos
          </h2>
          <p style={{ color: "#6B7280", fontSize: 16, marginTop: 12, maxWidth: 620, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            Realizamos instalaciones de cámaras de seguridad, alarmas, videoporteros y soluciones tecnológicas en Barcelona y área metropolitana, además de otras zonas de Catalunya.
          </p>
        </div>

        {/* Localidades — lista única */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 36 }}>
          {ZONES.map((zone) => (
            <span key={zone} style={{
              display: "inline-flex", alignItems: "center",
              background: "#fff", border: "1px solid #E5E7EB",
              borderRadius: 20, padding: "7px 16px",
              color: "#374151", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
            }}>
              {zone}
            </span>
          ))}
        </div>

        {/* Enlaces a páginas locales diferenciadas */}
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          <p style={{ color: "#9CA3AF", fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 14 }}>
            Páginas por ciudad
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-2">
            {LOCAL_PAGES.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{ color: "#4B5563", fontSize: 13, textDecoration: "none" }}
                className="hover:text-[#E53E3E] hover:underline"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
