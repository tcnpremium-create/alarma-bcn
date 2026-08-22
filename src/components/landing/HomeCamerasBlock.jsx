import React, { useState } from "react";
import { Cpu, Moon, HardDrive, Smartphone } from "lucide-react";

const BENEFITS = [
  { Icon: Cpu, text: "IA: detecta personas y vehículos" },
  { Icon: Moon, text: "Visión nocturna en color" },
  { Icon: HardDrive, text: "Grabación local, sin nube obligatoria" },
  { Icon: Smartphone, text: "Acceso remoto desde el móvil" },
];

const css = `
  .c-cta-primary { background: #E53E3E; transition: background .2s ease, box-shadow .25s ease, transform .2s ease; }
  .c-cta-primary:hover { background: #d32f3c; box-shadow: 0 8px 24px rgba(229,62,62,.35); transform: translateY(-1px); }
  .c-cta-sec { transition: background .2s, border-color .2s; }
  .c-cta-sec:hover { background: rgba(255,255,255,.12)!important; border-color: rgba(255,255,255,.3)!important; }
  .c-kit-card { transition: border-color .2s ease, background .2s ease; }
  .c-kit-card:hover { border-color: rgba(255,255,255,.22)!important; }
`;

const KITS = [
  {
    id: "profesional",
    badge: "MÁS VENDIDO",
    popular: true,
    title: "Kit Profesional",
    cameras: "4 Cámaras",
    price: "890 €",
    priceNote: "* IVA no incluido",
    color: "rgba(220,38,38,.12)",
    borderColor: "rgba(220,38,38,.45)",
    items: [
      "4 cámaras Alta Definición 4MPX",
      "Grabador NVR profesional con disco duro 2TB",
      "Detección inteligente por Inteligencia Artificial",
      "Visión nocturna optimizada",
      "Instalación y configuración certificada incluida",
    ],
    ideal: "Casas, negocios y comunidades medianas",
  },
  {
    id: "empresarial",
    badge: "MÁXIMA COBERTURA",
    popular: false,
    title: "Kit Empresarial",
    cameras: "8 Cámaras",
    price: "1.500 €",
    priceNote: "* IVA no incluido",
    color: "rgba(109,40,217,.12)",
    borderColor: "rgba(139,92,246,.3)",
    items: [
      "8 cámaras profesionales 4K Ultra HD",
      "Grabador NVR 8 canales con disco duro 4TB",
      "Detección por IA avanzada de personas y vehículos",
      "Visión nocturna de largo alcance",
      "Instalación completa incluida",
    ],
    ideal: "Empresas, polígonos, comunidades grandes y fincas",
  },
];

export default function HomeCamerasBlock({ onOpenModal }) {
  const [open, setOpen] = useState(null);
  // El CTA de esta sección es contextual: en vez de abrir el mismo drawer
  // genérico que ya ofrece el hero justo encima, lleva a los kits (con
  // precio y contenido concretos) que están a un scroll de distancia.
  const scrollToKits = () => document.getElementById("camaras-kits")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      className="cams-scanlines"
      style={{ position:"relative",overflow:"hidden",backgroundColor:"#0A0E17",padding:"72px 20px 64px" }}
    >
      <style>{css}</style>

      {/* ── CONTENT ── */}
      <div className="max-w-2xl mx-auto" style={{ position:"relative",zIndex:3 }}>

        {/* Fotografía grande — el producto habla antes que el texto */}
        <div style={{ borderRadius:20, overflow:"hidden", marginBottom:28, boxShadow:"0 24px 60px rgba(0,0,0,.5)" }}>
          <img
            src="/images/camaras-hero-dome.webp"
            alt="Cámara domo de seguridad instalada en techo interior"
            loading="lazy"
            style={{ width:"100%", height:260, objectFit:"cover", objectPosition:"center 62%", display:"block" }}
          />
        </div>

        {/* Badge + Title */}
        <span style={{ display:"inline-block",color:"#F87171",fontSize:12,fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10 }}>
          Cámaras de seguridad · Barcelona
        </span>
        <h2 style={{ fontWeight:900,fontSize:30,color:"#FFFFFF",lineHeight:1.15,margin:0 }}>
          Vigilancia 4K con Inteligencia Artificial
        </h2>
        <p style={{ color:"#94A3B8",fontSize:15.5,lineHeight:1.75,marginTop:14,maxWidth:480 }}>
          Detectan personas y vehículos en tiempo real, ven de noche en color y graban sin depender de la nube. Instalación certificada, sin cuotas mensuales.
        </p>

        {/* Beneficios — texto plano con icono, sin cajas */}
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap:"14px 24px", marginTop:28 }}>
          {BENEFITS.map(({ Icon, text }) => (
            <div key={text} style={{ display:"flex", alignItems:"center", gap:10 }}>
              <Icon size={17} color="#E53E3E" style={{ flexShrink:0 }} />
              <span style={{ color:"#CBD5E0", fontSize:13.5, fontWeight:600 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display:"flex",flexDirection:"column",gap:12,marginTop:24 }}>
          <button
            onClick={scrollToKits}
            className="c-cta-primary"
            style={{ width:"100%",color:"#fff",fontWeight:800,fontSize:16,borderRadius:50,padding:18,border:"none",cursor:"pointer" }}
          >
            Ver kits y precios ↓
          </button>
          <a
            href="tel:+34638109947"
            className="c-cta-sec"
            style={{ width:"100%",backgroundColor:"rgba(255,255,255,.08)",backdropFilter:"blur(8px)",color:"#fff",fontWeight:800,fontSize:16,borderRadius:50,padding:18,border:"1px solid rgba(255,255,255,.16)",textAlign:"center",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxSizing:"border-box" }}
          >
            Llamar ahora
          </a>
        </div>

        {/* ── KIT CARDS ── */}
        <div id="camaras-kits" style={{ marginTop:32, scrollMarginTop: 90 }}>
          <p style={{ color:"#94A3B8",fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",margin:"0 0 12px" }}>
            Kits Profesionales de Videovigilancia — Precios Transparentes
          </p>
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            {KITS.map((kit)=>{
              const isOpen = open === kit.id;
              return (
                <div
                  key={kit.id}
                  className="c-kit-card"
                  style={{ background:"rgba(255,255,255,.03)",border:`1px solid ${isOpen ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.08)"}`,borderRadius:14,overflow:"hidden",position:"relative" }}
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
                        style={{ width:"100%",marginTop:16,color:"#fff",fontWeight:800,fontSize:15,borderRadius:50,padding:"14px 0",border:"none",cursor:"pointer" }}
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

      </div>
    </section>
  );
}
