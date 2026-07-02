import React, { useState } from "react";

const css = `
  .alarms-bg-scanlines::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 3px,
      rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
    );
    pointer-events: none;
    z-index: 1;
  }
  @keyframes a-rec-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
  @keyframes a-scan {
    0%   { top: 0%; }
    100% { top: 100%; }
  }
  @keyframes a-emitter {
    0%,100%{ box-shadow:0 0 6px 2px rgba(239,68,68,.9),0 0 14px 4px rgba(239,68,68,.4) }
    50%    { box-shadow:0 0 3px 1px rgba(239,68,68,.6),0 0 7px 2px rgba(239,68,68,.2) }
  }
  @keyframes a-shimmer {
    0%  { background-position:-200% center }
    100%{ background-position:200% center }
  }
  .a-cta-primary {
    background: linear-gradient(90deg,#b91c1c 0%,#ef4444 40%,#ff7070 50%,#ef4444 60%,#b91c1c 100%);
    background-size: 200% auto;
    animation: a-shimmer 3s linear infinite;
    transition: box-shadow .3s ease;
  }
  .a-cta-primary:hover { box-shadow:0 0 32px rgba(239,68,68,.65),0 0 60px rgba(239,68,68,.25)!important }
  .a-cta-sec { transition: background .3s, border-color .3s }
  .a-cta-sec:hover { background:rgba(255,255,255,.14)!important; border-color:rgba(255,255,255,.32)!important }
  .a-kit-card { transition: border-color .25s, box-shadow .25s }
  .a-kit-card:hover { border-color:rgba(239,68,68,.55)!important; box-shadow:0 0 0 1px rgba(239,68,68,.25),0 0 20px rgba(239,68,68,.15)!important }
  .a-accordion-btn { transition: background .2s }
  .a-accordion-btn:hover { background:rgba(239,68,68,.08)!important }
`;

const KITS = [
  {
    id: "hogar",
    badge: "MÁS POPULAR",
    title: "Kit Alarma Hogar",
    subtitle: "Protección completa para viviendas",
    price: "399 €",
    ivaNote: true,
    items: [
      "Hub Ajax (central de control)",
      "1 detector de movimiento (sin cámara)",
      "1 detector magnético para puerta principal",
      "1 mando a distancia",
      "Sirena interior HomeSiren",
      "App Ajax gratuita · iOS y Android",
      "Instalación certificada incluida",
      "Sin cuotas mensuales · Grado 2",
    ],
    tech: "Grado 2 · Antiinhibición 3G/4G · Batería de respaldo 38h",
  },
  {
    id: "negocio",
    badge: "RECOMENDADO",
    title: "Kit Alarma Negocio",
    subtitle: "Seguridad profesional para locales y oficinas",
    price: "699 €",
    ivaNote: true,
    items: [
      "Hub Ajax (central de control)",
      "2 detectores de movimiento sin cámara",
      "2 detectores magnéticos (puertas/ventanas)",
      "Sirena interior HomeSiren",
      "Central Receptora activa 24/7",
      "Instalación certificada incluida",
      "Grado 2 · Conexión cifrada",
    ],
    tech: "Grado 2 · Antiinhibición · Verificación en 15s · Comunicación cifrada",
  },
  {
    id: "comunidad",
    badge: "GRAN INSTALACIÓN",
    title: "Kit Alarma Comunidad",
    subtitle: "Para casas unifamiliares o naves industriales",
    price: "1.300 €",
    ivaNote: true,
    items: [
      "Hub+ Ajax (hasta 200 dispositivos)",
      "4 detectores de movimiento MotionCam",
      "2 detectores magnéticos perimetrales",
      "1 teclado KeyPad en zona de acceso",
      "Sirena exterior de alta potencia",
      "1 sirena interior incluida",
      "Aviso directo a Policía verificado",
      "Instalación y configuración completa incluida",
    ],
    tech: "Grado 2 · Canal de backup GSM + Ethernet · Batería 80h",
  },
];

const TECH_SPECS = [
  { label: "Antiinhibición", desc: "Detecta y bloquea intentos de interferencia de señal RF", icon: "🛡️" },
  { label: "Grado 2 Certificado", desc: "Máximo nivel de seguridad reconocido por aseguradoras en España", icon: "🏆" },
  { label: "Verificación en 15s", desc: "La Central Receptora confirma la intrusión y avisa a la Policía", icon: "⚡" },
  { label: "Cifrado de Datos", desc: "Comunicación 100% cifrada entre dispositivos y central", icon: "🔐" },
];

export default function HomeAlarmsBlock({ onOpenModal }) {
  const [open, setOpen] = useState(null);

  return (
    <section
      className="alarms-bg-scanlines"
      style={{
        position: "relative", overflow: "hidden", padding: "0 0 48px",
        backgroundImage: "url('/images/ajax-alarm-hero.jpeg')",
        backgroundSize: "cover", backgroundPosition: "center 28%", backgroundRepeat: "no-repeat",
      }}
    >
      <style>{css}</style>

      {/* Dark overlay */}
      <div style={{ position:"absolute",inset:0,zIndex:0,background:"linear-gradient(170deg,rgba(4,5,16,.80) 0%,rgba(6,3,14,.70) 40%,rgba(4,5,16,.88) 100%)" }} />
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:120,zIndex:0,background:"linear-gradient(to bottom,transparent,rgba(4,5,16,.97))" }} />
      {/* Red grid */}
      <div style={{ position:"absolute",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(239,68,68,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(239,68,68,0.03) 1px,transparent 1px)",backgroundSize:"48px 48px" }} />

      {/* ── LASER SCANNER ── */}
      <div aria-hidden="true" style={{ position:"absolute",inset:0,pointerEvents:"none",zIndex:2 }}>
        <div style={{ position:"absolute",left:0,right:0,height:3,background:"linear-gradient(to right,transparent 0%,rgba(239,68,68,.18) 5%,rgba(239,68,68,.60) 25%,rgba(239,68,68,.90) 50%,rgba(239,68,68,.60) 75%,rgba(239,68,68,.18) 95%,transparent 100%)",filter:"blur(1px)",boxShadow:"0 0 20px 5px rgba(239,68,68,.35),0 0 45px 10px rgba(239,68,68,.12)",animation:"a-scan 5s ease-in-out infinite alternate" }} />
        <div style={{ position:"absolute",left:0,right:0,height:10,background:"linear-gradient(to right,transparent 5%,rgba(239,68,68,.04) 20%,rgba(239,68,68,.11) 50%,rgba(239,68,68,.04) 80%,transparent 95%)",filter:"blur(5px)",animation:"a-scan 5s ease-in-out infinite alternate" }} />
      </div>

      {/* REC badge */}
      <div aria-hidden="true" style={{ position:"absolute",top:14,right:16,zIndex:5,display:"flex",alignItems:"center",gap:5,background:"rgba(0,0,0,.65)",backdropFilter:"blur(6px)",border:"1px solid rgba(239,68,68,.45)",borderRadius:6,padding:"4px 10px" }}>
        <span style={{ width:7,height:7,borderRadius:"50%",backgroundColor:"#EF4444",display:"inline-block",animation:"a-rec-blink 1.2s step-start infinite" }} />
        <span style={{ color:"#fff",fontSize:10,fontWeight:800,letterSpacing:"0.12em" }}>REC</span>
      </div>
      {/* Corner sensors */}
      {[{top:10,left:10},{top:10,right:10},{bottom:10,left:10},{bottom:10,right:10}].map((pos,i)=>(
        <div key={i} aria-hidden="true" style={{ position:"absolute",...pos,zIndex:4,width:8,height:8,borderRadius:"50%",border:"1.5px solid rgba(239,68,68,.6)",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ width:3,height:3,borderRadius:"50%",backgroundColor:"#ef4444",animation:`a-emitter ${1.4+i*.35}s ${i*.4}s ease-in-out infinite` }} />
        </div>
      ))}

      {/* ── CONTENT ── */}
      <div className="max-w-2xl mx-auto" style={{ position:"relative",zIndex:3,padding:"0 20px" }}>

        {/* ① Hero image — product kit at top */}
        <div style={{ borderRadius:"0 0 20px 20px",overflow:"hidden",boxShadow:"0 12px 40px rgba(0,0,0,.7)",border:"1px solid rgba(239,68,68,.2)",borderTop:"none",marginBottom:32 }}>
          <img
            src="/images/ajax-products-lineup.jpeg"
            alt="Kit de alarma Ajax: Hub, MotionCam, KeyPad y sirena"
            style={{ width:"100%",display:"block",objectFit:"cover",height:170,objectPosition:"center" }}
          />
          <div style={{ position:"absolute",inset:0,height:170,background:"linear-gradient(to bottom,transparent 60%,rgba(4,5,16,.9))",pointerEvents:"none" }} />
        </div>

        {/* Badge + Heading */}
        <span style={{ display:"inline-block",backgroundColor:"#dc2626",color:"#fff",borderRadius:20,fontSize:11,fontWeight:800,padding:"6px 14px",letterSpacing:"0.05em" }}>
          🔔 ALARMAS AJAX · BARCELONA
        </span>
        <h2 style={{ color:"#fff",fontWeight:900,fontSize:28,lineHeight:1.12,marginTop:12,marginBottom:0 }}>
          Instalación de Alarmas de Alta Seguridad en Barcelona
        </h2>
        <p style={{ color:"#CBD5E1",fontSize:15,lineHeight:1.72,marginTop:12,marginBottom:0 }}>
          Protegemos hogares, negocios y comunidades con el ecosistema Ajax — la alarma Grado 2 más avanzada del mundo. Detección verificada en 15 segundos, cámaras integradas al sistema y aviso inmediato a la Policía. Sin cuotas, sin permanencia.
        </p>

        {/* ② Promo kit cards — accordion */}
        <div style={{ marginTop:24,display:"flex",flexDirection:"column",gap:10 }}>
          <p style={{ color:"#94A3B8",fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",margin:"0 0 4px" }}>
            🎁 Promociones en Sistemas de Alarma
          </p>
          {KITS.map((kit) => {
            const isOpen = open === kit.id;
            return (
              <div
                key={kit.id}
                className="a-kit-card"
                style={{
                  background:"rgba(10,8,24,.70)",
                  backdropFilter:"blur(12px)",
                  border:`1px solid ${isOpen ? "rgba(239,68,68,.50)" : "rgba(239,68,68,.18)"}`,
                  borderRadius:14,
                  overflow:"hidden",
                  boxShadow: isOpen ? "0 0 0 1px rgba(239,68,68,.2),0 0 24px rgba(239,68,68,.12)" : "none",
                }}
              >
                {/* Accordion header */}
                <button
                  className="a-accordion-btn"
                  onClick={() => setOpen(isOpen ? null : kit.id)}
                  style={{
                    width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"16px 18px", background:"transparent", border:"none", cursor:"pointer",
                    textAlign:"left",
                  }}
                >
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:3 }}>
                      <span style={{ fontSize:9,fontWeight:800,letterSpacing:".1em",backgroundColor:"rgba(220,38,38,.25)",color:"#f87171",borderRadius:4,padding:"2px 7px" }}>{kit.badge}</span>
                      <span style={{ color:"#94A3B8",fontSize:12 }}>{kit.tech.split("·")[0].trim()}</span>
                    </div>
                    <span style={{ color:"#fff",fontSize:16,fontWeight:800 }}>{kit.title}</span>
                    <span style={{ color:"#94A3B8",fontSize:12,marginLeft:8 }}>{kit.subtitle}</span>
                  </div>
                  <div style={{ textAlign:"right",marginLeft:12,flexShrink:0 }}>
                    <div style={{ color:"#ef4444",fontSize:17,fontWeight:900,lineHeight:1 }}>{kit.price}</div>
                    {kit.ivaNote && <div style={{ color:"#64748B",fontSize:9,marginTop:1 }}>* IVA no incluido</div>}
                    <div style={{ color:"rgba(255,255,255,.35)",fontSize:18,marginTop:4,transition:"transform .25s",transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>▾</div>
                  </div>
                </button>

                {/* Expanded body */}
                {isOpen && (
                  <div style={{ padding:"0 18px 20px",borderTop:"1px solid rgba(239,68,68,.12)" }}>
                    <p style={{ color:"#94A3B8",fontSize:12,marginTop:12,marginBottom:10 }}>{kit.subtitle} — incluye:</p>
                    <ul style={{ listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:7 }}>
                      {kit.items.map((item)=>(
                        <li key={item} style={{ display:"flex",alignItems:"flex-start",gap:8,color:"#E2E8F0",fontSize:13 }}>
                          <span style={{ color:"#ef4444",fontWeight:900,flexShrink:0 }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div style={{ marginTop:14,padding:"10px 14px",background:"rgba(239,68,68,.08)",borderRadius:8,border:"1px solid rgba(239,68,68,.2)" }}>
                      <span style={{ color:"#f87171",fontSize:11,fontWeight:700 }}>⚙ ESPECIFICACIONES TÉCNICAS: </span>
                      <span style={{ color:"#94A3B8",fontSize:11 }}>{kit.tech}</span>
                    </div>
                    <button
                      onClick={() => onOpenModal(`${kit.title}`)}
                      className="a-cta-primary"
                      style={{ width:"100%",marginTop:14,color:"#fff",fontWeight:800,fontSize:15,borderRadius:50,padding:"14px 0",border:"none",cursor:"pointer",boxShadow:"0 0 20px rgba(239,68,68,.4)" }}
                    >
                      Solicitar este kit →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ③ Impact stat */}
        <div style={{ background:"rgba(220,38,38,.08)",backdropFilter:"blur(10px)",border:"1px solid rgba(220,38,38,.30)",borderRadius:16,padding:20,marginTop:24,display:"flex",alignItems:"center",gap:16 }}>
          <div style={{ backgroundColor:"#dc2626",borderRadius:12,padding:14,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 20px rgba(220,38,38,.5)" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div>
            <p style={{ color:"#EF4444",fontWeight:900,fontSize:34,lineHeight:1,margin:0,textShadow:"0 0 20px rgba(239,68,68,.5)" }}>15s</p>
            <p style={{ color:"#fff",fontWeight:800,fontSize:16,margin:0 }}>Respuesta garantizada</p>
            <p style={{ color:"#94A3B8",fontSize:12,margin:0 }}>Central Receptora activa · Aviso inmediato a Policía</p>
          </div>
        </div>

        {/* ④ Technical Ajax deep-dive */}
        <div style={{ marginTop:24 }}>
          <p style={{ color:"#94A3B8",fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",margin:"0 0 12px" }}>⚙ Tecnología Ajax — Grado Militar</p>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
            {TECH_SPECS.map((s)=>(
              <div key={s.label} style={{ background:"rgba(255,255,255,.05)",backdropFilter:"blur(6px)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,padding:"12px 14px" }}>
                <div style={{ fontSize:20,marginBottom:5 }}>{s.icon}</div>
                <p style={{ color:"#fff",fontWeight:700,fontSize:13,margin:"0 0 3px" }}>{s.label}</p>
                <p style={{ color:"#64748B",fontSize:11,margin:0,lineHeight:1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust pills */}
        <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginTop:20 }}>
          {["✓ Sin permanencia","✓ Instalación incluida","✓ Sin cuotas","✓ Grado 2 Certificado"].map((p)=>(
            <span key={p} style={{ backgroundColor:"rgba(255,255,255,.07)",backdropFilter:"blur(4px)",border:"1px solid rgba(255,255,255,.10)",color:"#E2E8F0",borderRadius:10,padding:"6px 12px",fontSize:12,fontWeight:600 }}>
              {p}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display:"flex",flexDirection:"column",gap:12,marginTop:24 }}>
          <button
            onClick={() => onOpenModal("Sistema de alarma")}
            className="a-cta-primary"
            style={{ width:"100%",color:"#fff",fontWeight:800,fontSize:16,borderRadius:50,padding:18,border:"none",cursor:"pointer",boxShadow:"0 0 24px rgba(239,68,68,.45)" }}
          >
            Blindar mi propiedad ahora →
          </button>
          <a
            href="tel:+34638109947"
            className="a-cta-sec"
            style={{ width:"100%",backgroundColor:"rgba(255,255,255,.08)",backdropFilter:"blur(8px)",color:"#fff",fontWeight:800,fontSize:16,borderRadius:50,padding:18,border:"1px solid rgba(255,255,255,.16)",textAlign:"center",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxSizing:"border-box" }}
          >
            📞 Llamar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
