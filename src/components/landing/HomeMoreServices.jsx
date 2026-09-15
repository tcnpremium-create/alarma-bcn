import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Sonorización, Redes, Cerraduras, Control de accesos y Videoporteros
// tienen fotografía real (composición principal + detalle, salvo Control
// de accesos, que solo lleva una imagen — ver más abajo). ICON_CARDS queda
// vacío por ahora: se deja declarado, sin renderizarse, para el día que
// haya una línea de servicio nueva sin fotografía propia todavía.
//
// width/height en cada entrada son las dimensiones NATIVAS del fichero
// (comprobadas con `file`), no un tamaño de diseño: el contenedor sigue
// fijando el alto real vía CSS (igual que antes), pero el atributo permite
// al navegador reservar la proporción correcta antes de que cargue la
// imagen y evita que aviven layout shift, sin cambiar el diseño.
const PHOTO_CARDS = [
  {
    href: "/sonorizacion",
    title: "SONORIZACIÓN PROFESIONAL",
    desc: "Diseño e instalación de sistemas de sonido para negocios, restaurantes, oficinas y viviendas.",
    mainImg: "/images/sonorizacion-hero-restaurante.webp",
    mainAlt: "Instalación de sonorización profesional en restaurante moderno",
    mainW: 1600, mainH: 2400,
    detailImg: "/images/altavoces-empotrados-techo.webp",
    detailAlt: "Altavoces empotrados en techo con conectividad Bluetooth",
    detailW: 1380, detailH: 990,
  },
  {
    href: "/redes-informaticas",
    title: "REDES INFORMÁTICAS",
    desc: "Diseño, instalación y configuración de redes profesionales para empresas, oficinas, negocios y viviendas.",
    mainImg: "/images/redes-rack-cableado-estructurado.webp",
    mainAlt: "Rack de comunicaciones con cableado estructurado",
    mainW: 588, mainH: 441,
    detailImg: "/images/redes-switch-profesional.webp",
    detailAlt: "Instalación profesional de red informática y cableado",
    detailW: 450, detailH: 288,
  },
  {
    href: "/cerraduras",
    title: "CERRADURAS INTELIGENTES",
    desc: "Soluciones modernas para proteger y controlar el acceso a viviendas, negocios y espacios profesionales.",
    mainImg: "/images/cerradura-inteligente-puerta.webp",
    mainAlt: "Cerradura inteligente instalada en puerta",
    mainW: 1200, mainH: 900,
    detailImg: "/images/cerradura-electronica-control-acceso.webp",
    detailAlt: "Solución de cerradura electrónica para control de acceso",
    detailW: 554, detailH: 554,
  },
  {
    // Solo una imagen a propósito: el lector biométrico ya se ve completo
    // y con contexto (mano, puerta) en una sola foto; forzar una segunda
    // imagen de detalle no aportaba nada distinto.
    href: "/control-accesos",
    title: "CONTROL DE ACCESOS",
    desc: "Lectores biométricos, tarjetas y códigos para empresas y comunidades.",
    mainImg: "/images/control-accesos-biometrico.webp",
    // Mismo alt ya usado para esta imagen en /control-accesos, para no
    // tener dos descripciones distintas de la misma foto en el sitio.
    mainAlt: "Lector biométrico de huella dactilar para control de accesos en Barcelona",
    mainW: 1200, mainH: 600,
  },
  {
    href: "/videoporteros",
    title: "VIDEOPORTEROS",
    desc: "Videoporteros IP para hogares y comunidades. Fermax, Bticino y Golmar.",
    mainImg: "/images/videoportero.jpeg",
    mainAlt: "Videoportero instalado en vivienda con pantalla y auricular",
    mainW: 1000, mainH: 750,
    detailImg: "/images/bticino-videoportero.jpeg",
    detailAlt: "Videoportero BTicino Classe 300 con llaves de proximidad",
    detailW: 832, detailH: 1000,
  },
];

const ICON_CARDS = [];

function PhotoCard({ title, desc, href, mainImg, mainAlt, mainW, mainH, detailImg, detailAlt, detailW, detailH }) {
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
          width={mainW}
          height={mainH}
          loading="lazy"
          decoding="async"
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
            transition: "transform 0.4s ease",
          }}
          className="group-hover:scale-105"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,26,0.45) 0%, transparent 45%)" }} />
        {/* Chip de detalle: opcional. Control de accesos no lo lleva —
            una sola imagen ya es suficiente y clara para esa tarjeta. */}
        {detailImg && (
          <div style={{
            position: "absolute", right: 10, bottom: 10,
            width: 56, height: 56, borderRadius: 12, overflow: "hidden",
            border: "2.5px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}>
            <img
              src={detailImg}
              alt={detailAlt}
              width={detailW}
              height={detailH}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PHOTO_CARDS.map((c) => <PhotoCard key={c.href} {...c} />)}
        </div>

        {/* ICON_CARDS está vacío ahora mismo (las dos únicas entradas que
            tenía ya llevan fotografía real, arriba). Se deja sin renderizar
            en vez de un <div> vacío, para el día que haya una línea nueva
            sin foto propia todavía. */}
        {ICON_CARDS.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ marginTop: 20 }}>
            {ICON_CARDS.map((c) => <IconCard key={c.href} {...c} />)}
          </div>
        )}
      </div>
    </section>
  );
}
