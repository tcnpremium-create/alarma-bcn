import React, { useState } from "react";
import { ALARM_KITS as KITS } from "@/data/alarmKits";

const css = `
  .a-cta-primary { background: #E53E3E; transition: background .2s ease, box-shadow .25s ease, transform .2s ease; }
  .a-cta-primary:hover { background: #d32f3c; box-shadow: 0 8px 24px rgba(229,62,62,.35); transform: translateY(-1px); }
  .a-cta-sec { transition: background .2s, border-color .2s; }
  .a-cta-sec:hover { background: rgba(255,255,255,.12)!important; border-color: rgba(255,255,255,.3)!important; }
  .a-kit-card { transition: border-color .2s ease; }
  .a-kit-card:hover { border-color: rgba(255,255,255,.22)!important; }
  .a-accordion-btn { transition: background .2s; }
  .a-accordion-btn:hover { background: rgba(255,255,255,.04)!important; }
`;

// Solo lo que realmente importa de un vistazo — el resto (specs completas,
// FAQ técnicas) se explica en la página de cada kit, no aquí encima.
const KEY_FACTS = [
  "Ecosistema Ajax",
  "Grado 2 certificado",
  "Anti-inhibición de señal",
  "Verificación en Central Receptora en 15s",
  "App de control 24/7",
  "Sin cuotas ni permanencia",
];

export default function HomeAlarmsBlock({ onOpenModal }) {
  const [open, setOpen] = useState(null);

  return (
    <section
      style={{
        position: "relative", overflow: "hidden", padding: "0 0 64px",
        backgroundImage: "url('/images/ajax-alarm-hero.jpeg')",
        backgroundSize: "cover", backgroundPosition: "center 28%", backgroundRepeat: "no-repeat",
      }}
    >
      <style>{css}</style>

      {/* Dark overlay */}
      <div style={{ position:"absolute",inset:0,zIndex:0,background:"linear-gradient(170deg,rgba(4,5,16,.80) 0%,rgba(6,3,14,.70) 40%,rgba(4,5,16,.88) 100%)" }} />
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:120,zIndex:0,background:"linear-gradient(to bottom,transparent,rgba(4,5,16,.97))" }} />

      {/* ── CONTENT ── */}
      <div className="max-w-2xl mx-auto" style={{ position:"relative",zIndex:3,padding:"72px 20px 0" }}>

        {/* Fotografía grande — mismo tratamiento que la sección de Cámaras */}
        <div style={{ borderRadius:20,overflow:"hidden",marginBottom:28,boxShadow:"0 24px 60px rgba(0,0,0,.5)" }}>
          <img
            src="/images/ajax-products-lineup.jpeg"
            alt="Kit de alarma Ajax: Hub, MotionCam, KeyPad y sirena"
            style={{ width:"100%",display:"block",objectFit:"cover",height:260,objectPosition:"center" }}
          />
        </div>

        {/* Badge + Heading */}
        <span style={{ display:"inline-block",color:"#F87171",fontSize:12,fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10 }}>
          Alarmas Ajax · Barcelona
        </span>
        <h2 style={{ color:"#fff",fontWeight:900,fontSize:30,lineHeight:1.15,margin:0 }}>
          Alta seguridad con el ecosistema Ajax
        </h2>
        <p style={{ color:"#94A3B8",fontSize:15.5,lineHeight:1.75,marginTop:14,maxWidth:480 }}>
          Protegemos hogares, negocios y comunidades con detección avanzada y verificación en la Central Receptora en menos de 15 segundos. Sin cuotas, sin permanencia.
        </p>

        {/* Lo importante, de un vistazo — sin cajas ni chips */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"8px 22px", marginTop:24 }}>
          {KEY_FACTS.map((fact) => (
            <span key={fact} style={{ display:"inline-flex", alignItems:"center", gap:7, color:"#CBD5E0", fontSize:13.5, fontWeight:600 }}>
              <span style={{ width:4, height:4, borderRadius:"50%", background:"#E53E3E", flexShrink:0 }} />
              {fact}
            </span>
          ))}
        </div>

        {/* ② Promo kit cards — accordion */}
        <div style={{ marginTop:24,display:"flex",flexDirection:"column",gap:10 }}>
          <p style={{ color:"#94A3B8",fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",margin:"0 0 4px" }}>
            Kits de Alarmas Ajax — Precios Transparentes
          </p>
          {KITS.map((kit) => {
            const isOpen = open === kit.id;
            return (
              <div
                key={kit.id}
                className="a-kit-card"
                style={{
                  background:"rgba(255,255,255,.03)",
                  border:`1px solid ${isOpen ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.08)"}`,
                  borderRadius:14,
                  overflow:"hidden",
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
                      <span style={{ color:"#f87171",fontSize:11,fontWeight:700 }}>ESPECIFICACIONES TÉCNICAS: </span>
                      <span style={{ color:"#94A3B8",fontSize:11 }}>{kit.tech}</span>
                    </div>
                    <button
                      onClick={() => onOpenModal(`${kit.title}`)}
                      className="a-cta-primary"
                      style={{ width:"100%",marginTop:14,color:"#fff",fontWeight:800,fontSize:15,borderRadius:50,padding:"14px 0",border:"none",cursor:"pointer" }}
                    >
                      Solicitar este kit →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div style={{ display:"flex",flexDirection:"column",gap:12,marginTop:32 }}>
          <button
            onClick={() => onOpenModal("Sistema de alarma")}
            className="a-cta-primary"
            style={{ width:"100%",color:"#fff",fontWeight:800,fontSize:16,borderRadius:50,padding:18,border:"none",cursor:"pointer" }}
          >
            Blindar mi propiedad ahora →
          </button>
          <a
            href="tel:+34638109947"
            className="a-cta-sec"
            style={{ width:"100%",backgroundColor:"rgba(255,255,255,.08)",backdropFilter:"blur(8px)",color:"#fff",fontWeight:800,fontSize:16,borderRadius:50,padding:18,border:"1px solid rgba(255,255,255,.16)",textAlign:"center",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxSizing:"border-box" }}
          >
            Llamar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
