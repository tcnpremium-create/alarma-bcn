import React from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, ClipboardList, FileText, Wrench, Smartphone, ArrowRight } from "lucide-react";

// Secciones de apoyo de las páginas de cámaras por ciudad. Datos reales de
// Search Console: la gente busca "empresa instaladora de cámaras de
// vigilancia" e "instalador de cámaras de seguridad", y la página no lo
// decía con esas palabras. También refuerza el enlazado interno hacia las
// páginas de cada zona y las guías del blog.

const STEPS = [
  { Icon: Phone, title: "Cuéntanos qué quieres proteger", desc: "Por llamada, WhatsApp o formulario: vivienda, negocio o comunidad." },
  { Icon: FileText, title: "Presupuesto gratis en 24h", desc: "Sin compromiso y con el precio claro, sin cuotas mensuales." },
  { Icon: Wrench, title: "Instalación en 24-48h", desc: "Cámaras, grabador y cableado instalados por nuestro equipo." },
  { Icon: Smartphone, title: "Listo para usar desde el móvil", desc: "Dejamos el sistema funcionando con la app para ver las cámaras en directo." },
];

const ZONES = [
  { to: "/camaras-barcelona", label: "Barcelona" },
  { to: "/camaras-sabadell", label: "Sabadell" },
  { to: "/camaras-girona", label: "Girona" },
  { to: "/camaras-tarragona", label: "Tarragona" },
  { to: "/camaras-lleida", label: "Lleida" },
  { to: "/Badalona", label: "Badalona" },
  { to: "/Hospitalet", label: "L'Hospitalet" },
  { to: "/Terrassa", label: "Terrassa" },
  { to: "/Mataro", label: "Mataró" },
  { to: "/SantCugat", label: "Sant Cugat" },
  { to: "/Cornella", label: "Cornellà" },
  { to: "/Viladecans", label: "Viladecans" },
  { to: "/Castelldefels", label: "Castelldefels" },
  { to: "/ElPrat", label: "El Prat" },
  { to: "/BarrioEixample", label: "Eixample" },
];

const GUIDES = [
  { to: "/BlogArticle/camaras-ip-barcelona-2026", title: "Cámaras IP en Barcelona: todo lo que necesitas saber en 2026" },
  { to: "/BlogArticle/videovigilancia-empresas-barcelona", title: "Videovigilancia para empresas en Barcelona: guía 2026" },
  { to: "/BlogArticle/comparativa-ajax-hikvision", title: "Comparativa Ajax vs Hikvision 2026" },
  { to: "/BlogArticle/normativa-videovigilancia-rgpd-catalunya", title: "Normativa de videovigilancia y RGPD en Catalunya 2026" },
  { to: "/BlogArticle/videovigilancia-ia-barcelona-2026", title: "Videovigilancia con IA en Barcelona: tecnologías 2026" },
];

export default function CameraLocalSections({ city, currentPath, onRequestQuote }) {
  const zones = ZONES.filter((z) => z.to !== currentPath);

  return (
    <>
      {/* ── EMPRESA INSTALADORA ── */}
      <section style={{ backgroundColor: "#0A0A1A", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#fff", margin: "0 0 12px" }}>
            Empresa instaladora de cámaras de vigilancia en {city}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.7, margin: "0 0 24px", maxWidth: 720 }}>
            Premium Tech Security es una empresa instaladora de cámaras de seguridad en {city} y alrededores.
            Diseñamos el sistema, lo instalamos y lo dejamos funcionando: cámaras Hikvision o Dahua, grabador con
            disco duro propio y app en tu móvil. Trabajamos para viviendas, comercios, oficinas y comunidades de
            vecinos, con presupuesto gratis y sin cuotas mensuales.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 420 }}>
            <button
              type="button"
              onClick={onRequestQuote}
              style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: 16, border: "none", cursor: "pointer" }}
            >
              Pedir presupuesto de cámaras →
            </button>
            <a
              href="https://wa.me/34638109947?text=Hola%2C%20estoy%20interesado%20en%20instalar%20c%C3%A1maras%20de%20seguridad."
              target="_blank"
              rel="noopener noreferrer"
              style={{ border: "2px solid rgba(255,255,255,0.35)", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 50, padding: 14, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <MessageCircle size={18} /> Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── PASO A PASO ── */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "56px 20px" }}>
        <div className="max-w-5xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 8px" }}>Así es la instalación, paso a paso</h2>
          <p style={{ color: "#6B7280", fontSize: 15, margin: "0 0 28px" }}>De la primera llamada a verlo funcionando en tu móvil.</p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {STEPS.map(({ Icon, title, desc }, i) => (
              <li key={title} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                  <Icon size={20} color="#E53E3E" />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: "#0A0A1A", margin: "0 0 4px" }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5, margin: 0 }}>{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── ZONAS Y GUÍAS ── */}
      <section style={{ backgroundColor: "#fff", padding: "56px 20px" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 22, color: "#0A0A1A", margin: "0 0 8px" }}>Dónde instalamos cámaras de seguridad</h2>
            <p style={{ color: "#6B7280", fontSize: 14, margin: "0 0 16px" }}>Barcelona, su área metropolitana y el resto de Catalunya.</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {zones.map((z) => (
                <li key={z.to}>
                  <Link to={z.to} style={{ display: "inline-block", padding: "8px 14px", borderRadius: 50, border: "1px solid #E5E7EB", color: "#0A0A1A", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                    {z.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 22, color: "#0A0A1A", margin: "0 0 8px" }}>Guías para elegir tus cámaras</h2>
            <p style={{ color: "#6B7280", fontSize: 14, margin: "0 0 16px" }}>Lo que conviene saber antes de decidir.</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {GUIDES.map((g) => (
                <li key={g.to}>
                  <Link to={g.to} style={{ display: "flex", alignItems: "center", gap: 8, color: "#0A0A1A", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                    <ClipboardList size={16} color="#E53E3E" style={{ flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>{g.title}</span>
                    <ArrowRight size={14} color="#9CA3AF" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
