import React, { useEffect, useState } from "react";
import { Phone, ShieldCheck } from "lucide-react";
import { useLeadDrawer } from "@/context/LeadDrawerContext";
import { businessStats } from "@/lib/businessStats";

const SLIDES = [
  {
    img: "/images/camaras-variedad-exterior.webp",
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
    h1a: "Sistemas de Alarma en Barcelona",
    h1b: "Alta Seguridad AJAX",
    sub: "Ecosistema Ajax: tecnología avanzada de detección, cifrado end-to-end y verificación en la Central Receptora en menos de 15 segundos.",
  },
];

export default function HeroProf() {
  const [active, setActive] = useState(0);
  const { openDrawer } = useLeadDrawer();

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
        .hero-cta-glow { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .hero-cta-glow:hover { transform: translateY(-2px); box-shadow: 0 0 32px rgba(229,62,62,0.55); }
        .hero-cta-glow::after {
          content: ""; position: absolute; top: 0; left: -75%; width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
        }
        .hero-cta-glow:hover::after { animation: hero-shine 0.9s ease; }
        @keyframes hero-shine { from { left: -75%; } to { left: 125%; } }
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

          {/* Authority tag */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10, padding: "10px 14px", marginBottom: 28, maxWidth: 480,
            animation: "hero-fade-in 0.8s ease 0.25s both",
          }}>
            <ShieldCheck size={16} color="#00D4FF" style={{ flexShrink: 0 }} />
            <span style={{ color: "#CBD5E0", fontSize: 12.5, fontWeight: 600, lineHeight: 1.5 }}>
              Instaladores Homologados en Barcelona y Área Metropolitana — Respuesta e instalación técnica en 24/48h
            </span>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 28, marginBottom: 40, flexWrap: "wrap", animation: "hero-fade-in 0.8s ease 0.3s both" }}>
            {[
              { val: businessStats.installTimeframe, label: "Instalación" },
              { val: "4K", label: "Ultra HD" },
              { val: "15s", label: "Transmisión Ajax" },
              { val: `★ ${businessStats.googleRating}`, label: "Google Reviews" },
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
              onClick={openDrawer}
              className="hero-cta-glow"
              style={{
                background: "#E53E3E", color: "#fff", border: "none",
                borderRadius: 8, padding: "15px 32px", fontSize: 15, fontWeight: 800, cursor: "pointer",
                boxShadow: "0 0 20px rgba(229,62,62,0.35)",
                position: "relative", overflow: "hidden", display: "inline-block",
              }}
            >
              Solicitar presupuesto gratis →
            </button>
            <a
              href="tel:+34638109947"
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
            <span style={{ color: "#FBBF24", fontWeight: 700, fontSize: 14 }}>★ {businessStats.googleRating}</span>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>Reseñas en Google</span>
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
