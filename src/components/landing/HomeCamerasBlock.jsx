import React, { useState } from "react";

const css = `
  .cams-scanlines::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 3px,
      rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
    );
    pointer-events: none;
    z-index: 1;
  }
  @keyframes c-rec-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
  @keyframes c-scan {
    0%   { top: 0%; }
    100% { top: 100%; }
  }
  @keyframes c-emitter {
    0%,100%{ box-shadow:0 0 6px 2px rgba(239,68,68,.9),0 0 14px 4px rgba(239,68,68,.4) }
    50%    { box-shadow:0 0 3px 1px rgba(239,68,68,.5),0 0 7px 2px rgba(239,68,68,.2) }
  }
  @keyframes c-shimmer {
    0%  { background-position:-200% center }
    100%{ background-position:200% center }
  }
  .c-cta-primary {
    background: linear-gradient(90deg,#b91c1c 0%,#ef4444 40%,#ff7070 50%,#ef4444 60%,#b91c1c 100%);
    background-size: 200% auto;
    animation: c-shimmer 3s linear infinite;
    transition: box-shadow .3s ease;
  }
  .c-cta-primary:hover { box-shadow:0 0 32px rgba(239,68,68,.65),0 0 60px rgba(239,68,68,.25)!important }
  .c-cta-sec { transition: background .3s, border-color .3s }
  .c-cta-sec:hover { background:rgba(255,255,255,.14)!important; border-color:rgba(255,255,255,.32)!important }
  .c-kit-card { transition: border-color .25s, box-shadow .25s }
  .c-kit-card:hover { border-color:rgba(239,68,68,.50)!important; box-shadow:0 0 0 1px rgba(239,68,68,.2),0 0 20px rgba(239,68,68,.12)!important }
`;

const KITS = [
  {
    id: "basico",
    badge: "ENTRADA",
    popular: false,
    title: "Kit Básico",
    cameras: "2 Cámaras",
    price: "desde 299 €",
    priceNote: "instalación incluida",
    color: "rgba(100,116,139,.25)",
    borderColor: "rgba(100,116,139,.3)",
    items: [
      "2 cámaras Hikvision 4K domo",
      "Grabador NVR 4 canales",
      "Disco duro 1TB (≈30 días grabación)",
      "Visión nocturna en color 20m",
      "App Hik-Connect · iOS y Android",
      "Instalación profesional incluida",
    ],
    ideal: "Pisos, garajes y locales pequeños",
  },
  {
    id: "profesional",
    badge: "MÁS VENDIDO",
    popular: true,
    title: "Kit Profesional",
    cameras: "4 Cámaras",
    price: "desde 549 €",
    priceNote: "instalación incluida",
    color: "rgba(220,38,38,.12)",
    borderColor: "rgba(220,38,38,.45)",
    items: [
      "4 cámaras Hikvision 4K (domo + bullet)",
      "Grabador NVR 8 canales PoE",
      "Disco duro 2TB (≈30 días grabación)",
      "Detección IA de personas y vehículos",
      "Visión nocturna en color 30m",
      "Alertas push en tiempo real",
      "App Hik-Connect · iOS y Android",
      "Instalación y configuración completa",
    ],
    ideal: "Casas, negocios y comunidades medianas",
  },
  {
    id: "empresarial",
    badge: "MÁXIMA COBERTURA",
    popular: false,
    title: "Kit Empresarial",
    cameras: "8 Cámaras",
    price: "desde 999 €",
    priceNote: "instalación incluida",
    color: "rgba(109,40,217,.12)",
    borderColor: "rgba(139,92,246,.3)",
    items: [
      "8 cámaras Hikvision 4K (variedad de tipos)",
      "Grabador NVR 16 canales PoE",
      "2 discos duros 4TB (≈30 días en 4K)",
      "IA avanzada: detección facial y de matrículas",
      "Visión nocturna full-color 40m",
      "Integración con sistema de alarma Ajax",
      "Monitor de 21\" de visualización incluido",
      "Alertas por email, push y SMS",
      "Instalación, configuración y formación",
    ],
    ideal: "Empresas, polígonos, comunidades grandes y fincas",
  },
];

const FEATURES = [
  { icon: "📹", label: "Resolución 4K" },
  { icon: "🌙", label: "Color Nocturno" },
  { icon: "🤖", label: "IA Integrada" },
  { icon: "📱", label: "App 24/7" },
  { icon: "🛡️", label: "Sin cuotas" },
  { icon: "⚡", label: "Alertas Instant." },
];

export default function HomeCamerasBlock({ onOpenModal }) {
  const [open, setOpen] = useState(null);

  return (
    <section
      className="cams-scanlines"
      style={{ position:"relative",overflow:"hidden",backgroundColor:"#060e1a",padding:"44px 20px 48px" }}
    >
      <style>{css}</style>

      {/* Subtle dark grid */}
      <div style={{ position:"absolute",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(239,68,68,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(239,68,68,0.025) 1px,transparent 1px)",backgroundSize:"48px 48px" }} />

      {/* ── LASER SCANNER ── */}
      <div aria-hidden="true" style={{ position:"absolute",inset:0,pointerEvents:"none",zIndex:2 }}>
        <div style={{ position:"absolute",left:0,right:0,height:3,background:"linear-gradient(to right,transparent 0%,rgba(239,68,68,.18) 5%,rgba(239,68,68,.60) 25%,rgba(239,68,68,.90) 50%,rgba(239,68,68,.60) 75%,rgba(239,68,68,.18) 95%,transparent 100%)",filter:"blur(1px)",boxShadow:"0 0 20px 5px rgba(239,68,68,.35),0 0 45px 10px rgba(239,68,68,.12)",animation:"c-scan 4.5s ease-in-out infinite alternate" }} />
        <div style={{ position:"absolute",left:0,right:0,height:10,background:"linear-gradient(to right,transparent 5%,rgba(239,68,68,.04) 20%,rgba(239,68,68,.11) 50%,rgba(239,68,68,.04) 80%,transparent 95%)",filter:"blur(5px)",animation:"c-scan 4.5s ease-in-out infinite alternate" }} />
      </div>

      {/* REC badge */}
      <div aria-hidden="true" style={{ position:"absolute",top:14,right:16,zIndex:5,display:"flex",alignItems:"center",gap:5,background:"rgba(0,0,0,.65)",backdropFilter:"blur(6px)",border:"1px solid rgba(239,68,68,.45)",borderRadius:6,padding:"4px 10px" }}>
        <span style={{ width:7,height:7,borderRadius:"50%",backgroundColor:"#EF4444",display:"inline-block",animation:"c-rec-blink 1.2s step-start infinite" }} />
        <span style={{ color:"#fff",fontSize:10,fontWeight:800,letterSpacing:"0.12em" }}>REC</span>
      </div>
      {[{top:10,left:10},{top:10,right:56},{bottom:10,left:10},{bottom:10,right:10}].map((pos,i)=>(
        <div key={i} aria-hidden="true" style={{ position:"absolute",...pos,zIndex:4,width:8,height:8,borderRadius:"50%",border:"1.5px solid rgba(239,68,68,.55)",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ width:3,height:3,borderRadius:"50%",backgroundColor:"#ef4444",animation:`c-emitter ${1.4+i*.35}s ${i*.4}s ease-in-out infinite` }} />
        </div>
      ))}

      {/* ── CONTENT ── */}
      <div className="max-w-2xl mx-auto" style={{ position:"relative",zIndex:3 }}>

        {/* Red accent bar */}
        <div style={{ height:4,backgroundColor:"#dc2626",width:"100%",marginBottom:22,boxShadow:"0 0 12px rgba(220,38,38,.6)",borderRadius:2 }} />

        {/* Badge + Title */}
        <span style={{ display:"inline-block",backgroundColor:"#dc2626",color:"#fff",borderRadius:20,fontSize:11,fontWeight:800,padding:"6px 14px",letterSpacing:".05em",marginBottom:12 }}>
          📹 CÁMARAS DE SEGURIDAD · BARCELONA
        </span>
        <h2 style={{ fontWeight:900,fontSize:28,color:"#FFFFFF",lineHeight:1.12,margin:0 }}>
          Vigila todo en 4K. Detecta intrusos con Inteligencia Artificial.
        </h2>
        <p style={{ color:"#94A3B8",fontSize:15,lineHeight:1.72,marginTop:12 }}>
          Instalamos cámaras Hikvision 4K con IA que detectan personas y vehículos en tiempo real. Visión nocturna en color, grabación continua y alertas instantáneas en tu móvil. Instalación profesional certificada, sin cuotas mensuales.
        </p>

        {/* Feature pills */}
        <div style={{ display:"flex",gap:8,marginTop:16,flexWrap:"wrap" }}>
          {FEATURES.map((f)=>(
            <span key={f.label} style={{ display:"inline-flex",alignItems:"center",gap:6,backgroundColor:"rgba(255,255,255,.07)",border:"1px solid rgba(239,68,68,.25)",color:"#E2E8F0",borderRadius:20,padding:"7px 13px",fontSize:12,fontWeight:700,backdropFilter:"blur(4px)" }}>
              {f.icon} {f.label}
            </span>
          ))}
        </div>

        {/* ── KIT CARDS ── */}
        <div style={{ marginTop:28 }}>
          <p style={{ color:"#94A3B8",fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",margin:"0 0 12px" }}>
            🎁 Kits de Videovigilancia — Precios Transparentes
          </p>
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            {KITS.map((kit)=>{
              const isOpen = open === kit.id;
              return (
                <div
                  key={kit.id}
                  className="c-kit-card"
                  style={{ background:`${kit.color}`,backdropFilter:"blur(12px)",border:`1px solid ${isOpen ? kit.borderColor : kit.borderColor.replace(/\.[0-9.]+\)$/,".2)")}`,borderRadius:14,overflow:"hidden",boxShadow:isOpen ? `0 0 0 1px ${kit.borderColor.replace(/\.[0-9.]+\)$/,".15)")},0 0 24px rgba(239,68,68,.1)` : "none",position:"relative" }}
                >
                  {kit.popular && (
                    <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(to right,transparent,#ef4444 30%,#ef4444 70%,transparent)",borderRadius:"14px 14px 0 0" }} />
                  )}
                  <button
                    onClick={() => setOpen(isOpen ? null : kit.id)}
                    style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 18px",background:"transparent",border:"none",cursor:"pointer",textAlign:"left" }}
                  >
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex",alignItems:"center",gap:7,marginBottom:3 }}>
                        <span style={{ fontSize:9,fontWeight:800,letterSpacing:".1em",backgroundColor: kit.popular ? "rgba(220,38,38,.3)" : "rgba(100,116,139,.2)",color: kit.popular ? "#f87171" : "#94A3B8",borderRadius:4,padding:"2px 7px" }}>{kit.badge}</span>
                      </div>
                      <div>
                        <span style={{ color:"#fff",fontSize:16,fontWeight:800 }}>{kit.title}</span>
                        <span style={{ color:"#ef4444",fontSize:16,fontWeight:800,marginLeft:8 }}>— {kit.cameras}</span>
                      </div>
                      <div style={{ color:"#64748B",fontSize:11,marginTop:2 }}>Ideal: {kit.ideal}</div>
                    </div>
                    <div style={{ textAlign:"right",marginLeft:12,flexShrink:0 }}>
                      <div style={{ color:"#ef4444",fontSize:17,fontWeight:900,lineHeight:1 }}>{kit.price}</div>
                      <div style={{ color:"#64748B",fontSize:10 }}>{kit.priceNote}</div>
                      <div style={{ color:"rgba(255,255,255,.35)",fontSize:18,marginTop:4,transition:"transform .25s",transform:isOpen ? "rotate(180deg)" : "rotate(0)" }}>▾</div>
                    </div>
                  </button>

                  {isOpen && (
                    <div style={{ padding:"0 18px 20px",borderTop:"1px solid rgba(239,68,68,.12)" }}>
                      <p style={{ color:"#94A3B8",fontSize:12,marginTop:12,marginBottom:10 }}>Incluye en la instalación:</p>
                      <ul style={{ listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:7 }}>
                        {kit.items.map((item)=>(
                          <li key={item} style={{ display:"flex",alignItems:"flex-start",gap:8,color:"#E2E8F0",fontSize:13 }}>
                            <span style={{ color:"#ef4444",fontWeight:900,flexShrink:0 }}>✓</span>{item}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => onOpenModal && onOpenModal(kit.title)}
                        className="c-cta-primary"
                        style={{ width:"100%",marginTop:16,color:"#fff",fontWeight:800,fontSize:15,borderRadius:50,padding:"14px 0",border:"none",cursor:"pointer",boxShadow:"0 0 20px rgba(239,68,68,.35)" }}
                      >
                        Solicitar presupuesto — {kit.cameras} →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display:"flex",flexDirection:"column",gap:12,marginTop:28 }}>
          <button
            onClick={() => onOpenModal && onOpenModal("Cámaras de seguridad")}
            className="c-cta-primary"
            style={{ width:"100%",color:"#fff",fontWeight:800,fontSize:16,borderRadius:50,padding:18,border:"none",cursor:"pointer",boxShadow:"0 0 24px rgba(239,68,68,.45)" }}
          >
            Solicitar presupuesto gratis →
          </button>
          <a
            href="tel:+34638109947"
            className="c-cta-sec"
            style={{ width:"100%",backgroundColor:"rgba(255,255,255,.08)",backdropFilter:"blur(8px)",color:"#fff",fontWeight:800,fontSize:16,borderRadius:50,padding:18,border:"1px solid rgba(255,255,255,.16)",textAlign:"center",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxSizing:"border-box" }}
          >
            📞 Llamar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
