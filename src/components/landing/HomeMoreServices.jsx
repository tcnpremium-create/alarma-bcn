import React from "react";
import { Link } from "react-router-dom";
import { Volume2, Fingerprint, Bell, ArrowRight } from "lucide-react";

// Cerraduras y Redes tienen fotografía profesional real (composición principal +
// detalle). El resto de líneas sigue con tarjeta de icono hasta que haya
// fotografía propia — mismo alto de "zona de medios" para que la cuadrícula
// se lea como un solo sistema visual, no como una mezcla de plantillas.
const PHOTO_CARDS = [
  {
    href: "/redes-informaticas",
    title: "REDES INFORMÁTICAS",
    desc: "Diseño, instalación y configuración de redes profesionales para empresas, oficinas, negocios y viviendas.",
    mainImg: "/images/redes-rack-cableado-estructurado.webp",
    mainAlt: "Rack de comunicaciones con cableado estructurado",
    detailImg: "/images/redes-switch-profesional.webp",
    detailAlt: "Instalación profesional de red informática y cableado",
  },
  {
    href: "/cerraduras",
    title: "CERRADURAS INTELIGENTES",
    desc: "Soluciones modernas para proteger y controlar el acceso a viviendas, negocios y espacios profesionales.",
    mainImg: "/images/cerradura-inteligente-puerta.webp",
    mainAlt: "Cerradura inteligente instalada en puerta",
    detailImg: "/images/cerradura-electronica-control-acceso.webp",
    detailAlt: "Solución de cerradura electrónica para control de acceso",
  },
];

const ICON_CARDS = [
  { Icon: Volume2, title: "Sonorización", desc: "Sonido profesional y altavoces empotrados con Bluetooth", href: "/sonorizacion#altavoces-empotrados" },
  { Icon: Fingerprint, title: "Control de accesos", desc: "Lectores biométricos, tarjetas y códigos", href: "/control-accesos" },
  { Icon: Bell, title: "Videoporteros", desc: "Videoporteros IP para hogares y comunidades", href: "/videoporteros" },
];

function PhotoCard({ title, desc, href, mainImg, mainAlt, detailImg, detailAlt }) {
  return (
    <Link
      to={href}
      className="group"
      style={{
        display: "block", position: "relative", background: "#fff", borderRadius: 20,
        textDecoration: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
    >
      <div style={{ position: "relative", height: 200, overflow: "hidden", background: "#0A0A1A", borderRadius: "20px 20px 0 0" }}>
        <img
          src={mainImg}
          alt={mainAlt}
          loading="lazy"
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
            transition: "transform 0.4s ease",
          }}
          className="group-hover:scale-105"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,26,0.45) 0%, transparent 45%)" }} />
      </div>
      {/* Imagen de detalle superpuesta — fuera del contenedor recortado para que no se corte */}
      <div style={{
        position: "absolute", left: 16, top: 172,
        width: 80, height: 80, borderRadius: 14, overflow: "hidden",
        border: "3px solid #fff", boxShadow: "0 6px 16px rgba(0,0,0,0.22)",
      }}>
        <img src={detailImg} alt={detailAlt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ padding: "40px 20px 22px", borderRadius: "0 0 20px 20px", overflow: "hidden" }}>
        <h3 style={{ fontWeight: 900, fontSize: 15, letterSpacing: "0.03em", color: "#0A0A1A", marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.55, margin: "0 0 14px", minHeight: 40 }}>{desc}</p>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 800, color: "#E53E3E" }}>
          Ver soluciones
          <ArrowRight size={14} className="group-hover:translate-x-1" style={{ transition: "transform 0.2s ease" }} />
        </span>
      </div>
    </Link>
  );
}

function IconCard({ Icon, title, desc, href }) {
  return (
    <Link
      to={href}
      className="bg-white rounded-2xl text-center hover:shadow-lg transition-shadow"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textDecoration: "none", padding: "24px 18px", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(229,62,62,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
        <Icon size={22} color="#E53E3E" />
      </div>
      <h3 style={{ fontWeight: 800, fontSize: 14, color: "#0A0A1A", marginBottom: 4 }}>{title}</h3>
      <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5, margin: 0 }}>{desc}</p>
    </Link>
  );
}

export default function HomeMoreServices() {
  return (
    <section style={{ backgroundColor: "#F8F9FA", padding: "56px 20px" }}>
      <div className="max-w-6xl mx-auto">
        <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", textAlign: "center", margin: 0 }}>
          Más soluciones tecnológicas
        </h2>
        <p style={{ color: "#6B7280", fontSize: 15, textAlign: "center", marginTop: 8, marginBottom: 36 }}>
          Además de cámaras y alarmas, somos integradores de seguridad y tecnología
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ marginBottom: 20 }}>
          {PHOTO_CARDS.map((c) => <PhotoCard key={c.href} {...c} />)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {ICON_CARDS.map((c) => <IconCard key={c.href} {...c} />)}
        </div>
      </div>
    </section>
  );
}
