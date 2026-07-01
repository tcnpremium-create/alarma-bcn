import React, { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";

const SLIDES = [
  {
    img: "/images/hero-cameras.jpeg",
    pos: "center center",
    badge: "Videovigilancia 4K · IA Avanzada",
    h1a: "Vigilancia Total",
    h1b: "Sin Puntos Ciegos",
    sub: "Cámaras 4K Hikvision con detección inteligente de personas y vehículos. Visión nocturna en color 30m. Control desde tu móvil.",
  },
  {
    img: "/images/hero-intruder.jpeg",
    pos: "65% center",
    badge: "Sistema Activo · Barcelona y Área Metropolitana",
    h1a: "Tu Hogar o Negocio",
    h1b: "Blindado Sin Cuotas",
    sub: "Cámaras 4K con IA y alarmas Ajax que detectan intrusos antes de que actúen. Alertas en tiempo real en tu móvil. Sin permanencia.",
  },
  {
    img: "/images/hero-ajax.jpeg",
    pos: "center center",
    badge: "Alarmas Ajax · Grado 2 Certificado",
    h1a: "La Tecnología",
    h1b: "Que te Protege",
    sub: "Ecosistema Ajax: la alarma más avanzada del mundo instalada en tu hogar o negocio. Respuesta garantizada en 15 segundos.",
  },
];

function RedLaserEffect() {
  return (
    <div
      style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes laser-v-sweep {
          0%   { transform: translateY(-100vh); }
          100% { transform: translateY(200vh); }
        }
        @keyframes laser-h-sweep {
          0%   { transform: translateX(-200vw) skewX(-18deg); }
          100% { transform: translateX(200vw) skewX(-18deg); }
        }
        @keyframes laser-v2-sweep {
          0%   { transform: translateY(-100vh); }
          100% { transform: translateY(200vh); }
        }
      `}</style>

      {/* Vertical scanner beam 1 — slow, wide glow */}
      <div
        style={{
          position: "absolute",
          top: 0, left: "23%",
          width: 2, height: "100vh",
          background: "linear-gradient(to bottom, transparent 0%, rgba(239,68,68,0.55) 25%, rgba(239,68,68,0.1) 50%, rgba(239,68,68,0.55) 75%, transparent 100%)",
          filter: "blur(1.5px)",
          boxShadow: "0 0 12px 2px rgba(239,68,68,0.25)",
          animation: "laser-v-sweep 13s linear infinite",
        }}
      />

      {/* Vertical scanner beam 2 — faster, thinner */}
      <div
        style={{
          position: "absolute",
          top: 0, left: "68%",
          width: 1, height: "100vh",
          background: "linear-gradient(to bottom, transparent 0%, rgba(239,68,68,0.4) 30%, rgba(239,68,68,0.06) 50%, rgba(239,68,68,0.4) 70%, transparent 100%)",
          filter: "blur(0.8px)",
          animation: "laser-v2-sweep 19s 6s linear infinite",
        }}
      />

      {/* Diagonal sweep beam */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: 3, height: "200vh",
          background: "linear-gradient(to bottom, transparent 0%, rgba(239,68,68,0.35) 20%, rgba(239,68,68,0.08) 50%, rgba(239,68,68,0.35) 80%, transparent 100%)",
          filter: "blur(2px)",
          animation: "laser-h-sweep 28s 11s linear infinite",
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}

export default function HeroProf({ onOpenModal }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % SLIDES.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ position: "relative", overflow: "hidden", minHeight: "100vh", background: "#020609" }}>
      <style>{`
        @keyframes hero-fade-in {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,210,255,0.3); }
          50%       { box-shadow: 0 0 0 8px rgba(0,210,255,0); }
        }
        .hero-dot-btn { transition: all 0.3s ease; }
        @media (max-width: 640px) {
          .hero-content-inner { padding: 100px 16px 80px !important; }
        }
      `}</style>

      {/* Slide images — stacked, crossfade */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            transition: "opacity 1.4s ease",
            opacity: active === i ? 1 : 0,
          }}
        >
          <img
            src={s.img}
            alt=""
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: s.pos }}
          />
        </div>
      ))}

      {/* Left gradient overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(90deg, rgba(2,6,9,0.93) 0%, rgba(2,6,9,0.80) 38%, rgba(2,6,9,0.45) 65%, rgba(2,6,9,0.12) 100%)" }} />
      {/* Bottom vignette */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to top, rgba(6,14,26,0.9) 0%, transparent 30%)" }} />

      {/* Retro grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,210,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.04) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      {/* Radial glow */}
      <div style={{ position: "absolute", top: "20%", left: "8%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)", zIndex: 2, pointerEvents: "none" }} />

      {/* Red laser effect — replaces blue particles */}
      <RedLaserEffect />

      {/* Content */}
      <div
        className="hero-content-inner"
        style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "160px 24px 100px" }}
      >
        <div style={{ maxWidth: 620 }}>
          {/* Badge */}
          <div
            key={`badge-${active}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,210,255,0.1)", border: "1px solid rgba(0,210,255,0.35)",
              borderRadius: 100, padding: "6px 16px", marginBottom: 24,
              animation: "badge-pulse 3s ease-in-out infinite, hero-fade-in 0.7s ease forwards",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00D4FF", display: "inline-block", flexShrink: 0 }} />
            <span style={{ color: "#67E8F9", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {SLIDES[active].badge}
            </span>
          </div>

          {/* Headline */}
          <h1
            key={`h1-${active}`}
            style={{
              fontWeight: 900, lineHeight: 1.08, margin: "0 0 18px",
              fontSize: "clamp(2rem, 6vw, 3.8rem)", letterSpacing: "-0.03em",
              animation: "hero-fade-in 0.8s ease 0.1s both",
            }}
          >
            <span style={{ color: "#FFFFFF", display: "block" }}>{SLIDES[active].h1a}</span>
            <span style={{
              display: "block",
              background: "linear-gradient(90deg, #00D4FF 0%, #7C3AED 50%, #0080FF 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              {SLIDES[active].h1b}
            </span>
          </h1>

          {/* Subtext */}
          <p
            key={`sub-${active}`}
            style={{
              color: "rgba(255,255,255,0.62)", fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              lineHeight: 1.7, maxWidth: 480, margin: "0 0 36px",
              animation: "hero-fade-in 0.8s ease 0.2s both",
            }}
          >
            {SLIDES[active].sub}
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: 28, marginBottom: 40, flexWrap: "wrap", animation: "hero-fade-in 0.8s ease 0.3s both" }}>
            {[
              { val: "+200", label: "Instalaciones BCN" },
              { val: "4K", label: "Ultra HD" },
              { val: "15s", label: "Respuesta Ajax" },
              { val: "★ 4.8", label: "Google Reviews" },
            ].map(s => (
              <div key={s.val}>
                <div style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", fontWeight: 900, color: "#00D4FF", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28, animation: "hero-fade-in 0.8s ease 0.4s both" }}>
            <button
              onClick={onOpenModal}
              style={{
                background: "#E53E3E", color: "#fff", border: "none",
                borderRadius: 8, padding: "15px 32px", fontSize: 15, fontWeight: 800, cursor: "pointer",
                boxShadow: "0 0 20px rgba(229,62,62,0.35)",
              }}
            >
              Presupuesto gratis →
            </button>
            <a
              href="tel:+34615774532"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)",
                borderRadius: 8, padding: "15px 24px", fontSize: 15, fontWeight: 700, textDecoration: "none",
                background: "rgba(255,255,255,0.05)", backdropFilter: "blur(6px)",
              }}
            >
              <Phone size={16} /> Llamar ahora
            </a>
          </div>

          {/* Google reviews badge */}
          <a
            href="https://share.google/trjJFOqRhcldWdEbg"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "8px 18px",
              textDecoration: "none", animation: "hero-fade-in 0.8s ease 0.5s both",
            }}
          >
            <span style={{ color: "#FBBF24", fontWeight: 700, fontSize: 14 }}>★ 4.8</span>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>Reseñas verificadas en Google</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>Ver →</span>
          </a>
        </div>
      </div>

      {/* Slide dot indicators */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 8, zIndex: 10,
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="hero-dot-btn"
            aria-label={`Slide ${i + 1}`}
            style={{
              width: active === i ? 24 : 8, height: 8, borderRadius: 4,
              background: active === i ? "#00D4FF" : "rgba(255,255,255,0.25)",
              border: "none", cursor: "pointer", padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
