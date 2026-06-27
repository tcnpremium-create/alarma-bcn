import React from "react";
import { Link } from "react-router-dom";

const ARTICLES = [
  {
    title: "¿Cuánto cuesta instalar cámaras de seguridad en Barcelona en 2026?",
    category: "Cámaras · 5 min lectura",
    excerpt: "Analizamos los precios reales de instalación de videovigilancia en Barcelona según el tipo de inmueble, número de cámaras y tecnología elegida.",
    link: "/GuiaSeguridadBarcelona",
  },
  {
    title: "Alarmas sin cuotas mensuales en Barcelona: ¿Es posible?",
    category: "Alarmas · 4 min lectura",
    excerpt: "Te explicamos cómo funcionan los sistemas de alarma sin permanencia y sin cuotas mensuales que instalamos en Premium Tech Security.",
    link: "/SistemasAlarma",
  },
  {
    title: "Las mejores cámaras de seguridad para comunidades de vecinos en 2026",
    category: "Cámaras · 6 min lectura",
    excerpt: "Guía completa sobre qué cámaras instalar en portales, garajes y zonas comunes. Normativa RGPD incluida.",
    link: "/camaras-barcelona",
  },
  {
    title: "Cómo proteger tu negocio en Barcelona con videovigilancia 4K",
    category: "Negocios · 5 min lectura",
    excerpt: "Descubre los sistemas de videovigilancia profesional con IA que instalamos en comercios, oficinas y naves industriales de Barcelona.",
    link: "/Videovigilancia",
  },
  {
    title: "Guía completa de alarmas para el hogar en Barcelona 2026",
    category: "Alarmas · 7 min lectura",
    excerpt: "Todo lo que necesitas saber antes de instalar una alarma en tu hogar: tipos de sensores, conexión a CRA, app móvil y precios reales.",
    link: "/alarmas-barcelona",
  },
];

export default function BlogHighlights() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-center mb-10" style={{ color: "#0A0A1A" }}>
          Guías y artículos destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((a, i) => (
            <div key={i} className="bg-white flex flex-col" style={{ border: "1px solid #E5E7EB", borderRadius: 16, padding: 24 }}>
              <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold text-white mb-3" style={{ backgroundColor: "#E53E3E" }}>
                {a.category}
              </span>
              <h3 className="mb-2" style={{ fontWeight: 700, fontSize: 18, color: "#0A0A1A", lineHeight: 1.3 }}>
                {a.title}
              </h3>
              <p className="flex-1 mb-4" style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.6 }}>
                {a.excerpt}
              </p>
              <Link to={a.link} className="text-sm font-semibold" style={{ color: "#E53E3E" }}>
                Leer artículo →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}