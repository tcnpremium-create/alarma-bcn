import React, { useEffect, useRef } from "react";
import { Phone } from "lucide-react";

function SecurityParticles() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, particles, rafId;

    const init = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: 55 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.5,
      }));
    };
    init();
    window.addEventListener("resize", init);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,210,255,0.75)";
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,210,255,${0.12 * (1 - d / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3 }}
    />
  );
}

export default function HeroProf({ onOpenModal }) {
  return (
    <section
      aria-label="Hero - Seguridad premium para hogar y negocio en Barcelona"
      className="relative w-full overflow-hidden pt-16 sm:pt-20"
      style={{
        height: "90vh",
        maxHeight: "90vh",
        background: "linear-gradient(135deg, #020609 0%, #060e1a 50%, #0a0f1a 100%)",
      }}
    >
      {/* Video — subtle texture */}
      <video
        autoPlay loop muted playsInline preload="auto" aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.12, zIndex: 1 }}
      >
        <source src="https://pub-c09bc177726a4cf0b240409a82635955.r2.dev/casa-protegida.mp4" type="video/mp4" />
      </video>

      {/* Retro grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 2,
        backgroundImage: "linear-gradient(rgba(0,200,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.04) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
        maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 15%, rgba(0,0,0,0.4) 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 15%, rgba(0,0,0,0.4) 85%, transparent 100%)",
      }} />

      {/* Particle network */}
      <SecurityParticles />

      {/* Radial glow left */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 4,
        background: "radial-gradient(ellipse 55% 50% at 15% 55%, rgba(0,100,220,0.14) 0%, transparent 70%)",
      }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" aria-hidden="true"
        style={{ background: "linear-gradient(to top, #060e1a, transparent)", zIndex: 10 }} />

      {/* Content */}
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col justify-center h-full pb-16 sm:pb-0 pt-12 sm:pt-0"
        style={{ position: "relative", zIndex: 5 }}
      >
        <div className="max-w-2xl">

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
            style={{ background: "rgba(0,210,255,0.08)", border: "1px solid rgba(0,210,255,0.22)" }}>
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse shrink-0" />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", color: "rgba(0,210,255,0.9)", textTransform: "uppercase" }}>
              Sistema Activo · Barcelona y Área Metropolitana
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[30px] sm:text-5xl lg:text-[3.5rem] tracking-tight"
            style={{ fontWeight: 900, lineHeight: 1.1, color: "#fff", marginBottom: 20 }}
          >
            Tu Hogar o Negocio<br />
            <span style={{
              background: "linear-gradient(90deg, #00D4FF 0%, #0080FF 55%, #7C3AED 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Blindado Sin Cuotas
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] sm:text-lg mb-7 max-w-xl"
            style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.75 }}>
            Cámaras 4K con IA y alarmas Ajax que detectan intrusos antes de que actúen. Alertas en tiempo real en tu móvil. Instalación profesional. Sin permanencia.
          </p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mb-8 py-4"
            style={{ borderTop: "1px solid rgba(0,210,255,0.12)", borderBottom: "1px solid rgba(0,210,255,0.12)" }}>
            {[["2.500+", "Sistemas Activos"], ["24/7", "Monitorización"], ["15s", "Respuesta"]].map(([val, label]) => (
              <div key={label}>
                <div className="text-2xl sm:text-3xl font-black" style={{ color: "#00D4FF" }}>{val}</div>
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mt-0.5"
                  style={{ color: "rgba(255,255,255,0.4)" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onOpenModal && onOpenModal()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 rounded-full font-bold text-base text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ minHeight: 52, background: "linear-gradient(135deg, #E53E3E, #C53030)", boxShadow: "0 0 28px rgba(229,62,62,0.4), 0 4px 16px rgba(0,0,0,0.3)" }}
            >
              Solicitar Presupuesto Gratis →
            </button>
            <a
              href="tel:+34638109947"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 rounded-full font-bold text-base transition-all duration-200 hover:scale-[1.02]"
              style={{ minHeight: 52, border: "1px solid rgba(0,210,255,0.28)", color: "rgba(255,255,255,0.88)", background: "rgba(0,210,255,0.06)" }}
            >
              <Phone className="w-4 h-4" style={{ color: "#00D4FF" }} />
              Llamar Ahora
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
