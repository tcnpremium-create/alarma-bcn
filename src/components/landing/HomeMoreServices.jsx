import React from "react";
import { Link } from "react-router-dom";
import { Fingerprint, Bell, ArrowRight } from "lucide-react";

// Sonorización, Redes y Cerraduras tienen fotografía profesional real
// (composición principal + detalle). El resto de líneas sigue con tarjeta
// de icono hasta que haya fotografía propia — mismo alto de "zona de
// medios" para que la cuadrícula se lea como un solo sistema visual, no
// como una mezcla de plantillas.
const PHOTO_CARDS = [
  {
    href: "/sonorizacion",
    title: "SONORIZACIÓN PROFESIONAL",
    desc: "Diseño e instalación de sistemas de sonido para negocios, restaurantes, oficinas y viviendas.",
    mainImg: "/images/sonorizacion-hero-restaurante.webp",
    mainAlt: "Instalación de sonorización profesional en restaurante moderno",
    detailImg: "/images/altavoces-empotrados-techo.webp",
    detailAlt: "Altavoces empotrados en techo con conectividad Bluetooth",
  },
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
      {/* Zona de imagen: la foto de detalle vive DENTRO de este contenedor
          recortado, como chip anclado a la esquina de la foto principal —
          nunca puede colarse sobre el título/descripción de abajo, a
          cualquier ancho de pantalla. */}
      <div style={{ position: "relative", height: 168, overflow: "hidden", background: "#0A0A1A", borderRadius: "20px 20px 0 0" }}>
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
        <div style={{
          position: "absolute", right: 10, bottom: 10,
          width: 56, height: 56, borderRadius: 12, overflow: "hidden",
          border: "2.5px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}>
          <img src={detailImg} alt={detailAlt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
      <div style={{ padding: "16px 18px 18px", borderRadius: "0 0 20px 20px", overflow: "hidden" }}>
        <h3 style={{ fontWeight: 900, fontSize: 15, letterSpacing: "0.03em", color: "#0A0A1A", marginBottom: 6 }}>{title}</h3>
        <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5, margin: "0 0 12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{desc}</p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ marginBottom: 20 }}>
          {PHOTO_CARDS.map((c) => <PhotoCard key={c.href} {...c} />)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ICON_CARDS.map((c) => <IconCard key={c.href} {...c} />)}
        </div>
      </div>
    </section>
  );
}
