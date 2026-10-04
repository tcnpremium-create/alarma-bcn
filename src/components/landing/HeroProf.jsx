import React, { useEffect, useState } from "react";
import { Phone, ShieldCheck, MessageCircle, Home, Store, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLeadDrawer } from "@/context/LeadDrawerContext";
import { businessStats } from "@/lib/businessStats";

const SLIDES = [
  {
    img: "/images/camaras-variedad-exterior.webp",
    pos: "center center",
    label: "Videovigilancia 4K",
  },
  {
    img: "/images/hero-intruder.jpeg",
    pos: "65% center",
    label: "Protección perimetral",
  },
  {
    img: "/images/hero-ajax.jpeg",
    pos: "center center",
    label: "Alarmas Ajax",
  },
];

const PROTECTION = [
  { Icon: Home, title: "Vivienda", text: "Casa, piso o chalet", lead: "Protección para vivienda" },
  { Icon: Store, title: "Negocio", text: "Local, oficina o nave", lead: "Protección para negocio" },
  { Icon: Building2, title: "Comunidad", text: "Zonas comunes y accesos", lead: "Protección para comunidad" },
];

export default function HeroProf() {
  const [active, setActive] = useState(0);
  const { openDrawer } = useLeadDrawer();

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="pt-hero">
      <style>{`
        .pt-hero {
          position: relative;
          overflow: hidden;
          min-height: 100svh;
          background: #020609;
          isolation: isolate;
        }
        @keyframes pt-kenburns {
          0% { transform: scale(1.02) translate3d(0,0,0); }
          50% { transform: scale(1.1) translate3d(-1.1%,-.5%,0); }
          100% { transform: scale(1.04) translate3d(.8%,.3%,0); }
        }
        @keyframes pt-enter {
          from { opacity:0; transform:translateY(18px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes pt-pulse {
          0%,100% { box-shadow:0 0 0 0 rgba(229,62,62,.28); }
          50% { box-shadow:0 0 0 9px rgba(229,62,62,0); }
        }
        .pt-hero__grid {
          position: relative;
          z-index: 10;
          max-width: 1240px;
          margin: 0 auto;
          padding: 138px 24px 98px;
          display: grid;
          grid-template-columns: minmax(0,1.12fr) minmax(330px,.68fr);
          gap: 54px;
          align-items: center;
        }
        .pt-hero__panel {
          background: linear-gradient(180deg,rgba(11,18,30,.82),rgba(7,12,20,.72));
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 24px;
          padding: 24px;
          backdrop-filter: blur(18px);
          box-shadow: 0 30px 80px rgba(0,0,0,.42);
          animation: pt-enter .85s .15s both;
        }
        .pt-protect-card {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          text-align: left;
          border: 1px solid rgba(255,255,255,.09);
          background: rgba(255,255,255,.045);
          border-radius: 16px;
          padding: 15px;
          color: #fff;
          cursor: pointer;
          transition: transform .2s ease,border-color .2s ease,background .2s ease;
        }
        .pt-protect-card:hover {
          transform: translateY(-2px);
          border-color: rgba(229,62,62,.55);
          background: rgba(229,62,62,.08);
        }
        .pt-main-cta {
          position: relative;
          overflow: hidden;
          border: 0;
          border-radius: 12px;
          padding: 16px 26px;
          background: #e53e3e;
          color: white;
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 12px 34px rgba(229,62,62,.3);
          transition: transform .2s ease,box-shadow .2s ease;
        }
        .pt-main-cta:hover { transform:translateY(-2px); box-shadow:0 16px 42px rgba(229,62,62,.42); }
        .pt-secondary-cta {
          display:inline-flex;
          align-items:center;
          justify-content:center;
          gap:8px;
          border:1px solid rgba(255,255,255,.16);
          border-radius:12px;
          padding:15px 18px;
          color:#fff;
          font-weight:800;
          text-decoration:none;
          background:rgba(255,255,255,.055);
          backdrop-filter:blur(7px);
        }
        .pt-slide-button {
          border: 1px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.66);
          background: rgba(6,10,18,.42);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          padding: 8px 12px;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
          transition: all .25s ease;
        }
        .pt-slide-button[data-active="true"] {
          color:#fff;
          border-color:rgba(229,62,62,.6);
          background:rgba(229,62,62,.14);
        }
        @media (max-width: 920px) {
          .pt-hero__grid {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 112px 18px 78px;
          }
          .pt-hero__panel { max-width: 620px; }
        }
        @media (max-width: 560px) {
          .pt-hero__grid { padding-top: 94px; }
          .pt-hero__panel { padding: 18px; border-radius: 20px; }
          .pt-main-cta,.pt-secondary-cta { width:100%; box-sizing:border-box; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pt-hero img { animation:none !important; }
          .pt-hero__panel { animation:none; }
        }
      `}</style>

      {SLIDES.map((slide, i) => (
        <div
          key={slide.img}
          style={{
            position:"absolute", inset:0, zIndex:0,
            opacity: active === i ? 1 : 0,
            transition:"opacity 1.15s ease",
          }}
        >
          <img
            src={slide.img}
            alt=""
            aria-hidden="true"
            style={{
              width:"100%", height:"100%", objectFit:"cover", objectPosition:slide.pos,
              animation: active === i ? "pt-kenburns 6.8s ease-in-out both" : "none",
              willChange:"transform"
            }}
          />
        </div>
      ))}

      <div style={{position:"absolute",inset:0,zIndex:1,background:"linear-gradient(90deg,rgba(1,5,10,.97) 0%,rgba(3,8,14,.88) 40%,rgba(3,8,14,.56) 68%,rgba(3,8,14,.28) 100%)"}} />
      <div style={{position:"absolute",inset:0,zIndex:1,background:"linear-gradient(to top,rgba(3,8,14,.98) 0%,transparent 38%)"}} />
      <div style={{position:"absolute",left:"-8%",top:"10%",width:520,height:520,borderRadius:"50%",zIndex:1,background:"radial-gradient(circle,rgba(229,62,62,.13),transparent 68%)"}} />

      <div className="pt-hero__grid">
        <div>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:9,
            border:"1px solid rgba(229,62,62,.4)",background:"rgba(229,62,62,.1)",
            borderRadius:999,padding:"7px 14px",marginBottom:22,
            animation:"pt-pulse 3.2s ease-in-out infinite"
          }}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#ef4444"}} />
            <span style={{color:"#fecaca",fontSize:11,fontWeight:900,letterSpacing:".09em",textTransform:"uppercase"}}>
              Seguridad profesional · Barcelona y Catalunya
            </span>
          </div>

          <h1 style={{
            margin:0,maxWidth:760,color:"#fff",fontWeight:950,lineHeight:.98,
            letterSpacing:"-.045em",fontSize:"clamp(2.55rem,6.4vw,5.35rem)"
          }}>
            Instalación de Cámaras de Seguridad
            <span style={{display:"block",color:"#ef4444"}}>y Alarmas en Barcelona</span>
          </h1>

          <p style={{maxWidth:650,margin:"24px 0 0",color:"rgba(255,255,255,.68)",fontSize:"clamp(1rem,1.8vw,1.16rem)",lineHeight:1.7}}>
            Diseñamos e instalamos sistemas Hikvision, Dahua y Ajax para viviendas, negocios y comunidades. Control desde el móvil, instalación certificada y presupuesto sin compromiso.
          </p>

          <div style={{display:"flex",gap:18,flexWrap:"wrap",marginTop:26}}>
            {[
              "Sin permanencia",
              `Instalación ${businessStats.installTimeframe}`,
              "Control desde el móvil",
            ].map((item) => (
              <span key={item} style={{display:"inline-flex",alignItems:"center",gap:7,color:"rgba(255,255,255,.82)",fontSize:13,fontWeight:750}}>
                <CheckCircle2 size={15} color="#ef4444" /> {item}
              </span>
            ))}
          </div>

          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:32}}>
            <button className="pt-main-cta" onClick={() => openDrawer("Presupuesto sistema de seguridad")}>
              Quiero presupuesto gratuito <ArrowRight size={17} style={{display:"inline",verticalAlign:"middle",marginLeft:7}} />
            </button>
            <a className="pt-secondary-cta" href="tel:+34638109947"><Phone size={17}/> Llamar</a>
            <a className="pt-secondary-cta" href="https://wa.me/34638109947?text=Hola%2C%20quiero%20un%20presupuesto%20para%20un%20sistema%20de%20seguridad." target="_blank" rel="noopener noreferrer">
              <MessageCircle size={17}/> WhatsApp
            </a>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap",marginTop:28}}>
            <a href="https://share.google/trjJFOqRhcldWdEbg" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",display:"inline-flex",alignItems:"center",gap:8}}>
              <span style={{color:"#fbbf24",fontWeight:950}}>★ {businessStats.googleRating}</span>
              <span style={{color:"rgba(255,255,255,.55)",fontSize:12}}>Google · {businessStats.googleReviewCount} reseñas</span>
            </a>
            <span style={{width:1,height:18,background:"rgba(255,255,255,.16)"}} />
            <span style={{display:"inline-flex",alignItems:"center",gap:7,color:"rgba(255,255,255,.55)",fontSize:12}}>
              <ShieldCheck size={15} color="#ef4444"/> Instalación profesional
            </span>
          </div>

          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:30}}>
            {SLIDES.map((slide,i)=>(
              <button key={slide.img} className="pt-slide-button" data-active={active===i} onClick={()=>setActive(i)}>
                {String(i+1).padStart(2,"0")} · {slide.label}
              </button>
            ))}
          </div>
        </div>

        <aside className="pt-hero__panel" aria-label="Elige qué quieres proteger">
          <span style={{color:"#f87171",fontSize:11,fontWeight:900,letterSpacing:".1em",textTransform:"uppercase"}}>Diagnóstico rápido</span>
          <h2 style={{color:"#fff",fontSize:"clamp(1.5rem,3vw,2.1rem)",lineHeight:1.08,margin:"8px 0 8px",fontWeight:950,letterSpacing:"-.03em"}}>
            ¿Qué quieres proteger?
          </h2>
          <p style={{color:"#94a3b8",fontSize:13.5,lineHeight:1.6,margin:"0 0 18px"}}>
            Dinos el tipo de espacio y te preparamos una propuesta ajustada a tu instalación.
          </p>

          <div style={{display:"grid",gap:10}}>
            {PROTECTION.map(({Icon,title,text,lead})=>(
              <button key={title} className="pt-protect-card" onClick={()=>openDrawer(lead)}>
                <span style={{width:44,height:44,borderRadius:13,display:"grid",placeItems:"center",background:"rgba(229,62,62,.12)",border:"1px solid rgba(229,62,62,.24)",flexShrink:0}}>
                  <Icon size={20} color="#f87171"/>
                </span>
                <span style={{flex:1}}>
                  <strong style={{display:"block",fontSize:15.5,color:"#fff"}}>{title}</strong>
                  <span style={{fontSize:12,color:"#94a3b8"}}>{text}</span>
                </span>
                <ArrowRight size={18} color="#64748b"/>
              </button>
            ))}
          </div>

          <div style={{marginTop:16,padding:"14px 15px",borderRadius:14,background:"rgba(255,255,255,.035)",border:"1px solid rgba(255,255,255,.08)"}}>
            <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"baseline"}}>
              <span style={{color:"#cbd5e1",fontSize:12}}>Respuesta comercial</span>
              <strong style={{color:"#fff",fontSize:13}}>{businessStats.installTimeframe}</strong>
            </div>
            <div style={{height:1,background:"rgba(255,255,255,.08)",margin:"11px 0"}} />
            <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"baseline"}}>
              <span style={{color:"#cbd5e1",fontSize:12}}>Presupuesto</span>
              <strong style={{color:"#fff",fontSize:13}}>Gratuito</strong>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
