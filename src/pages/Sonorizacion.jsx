import React, { useEffect } from "react";
import { Phone, ArrowRight, Volume2, SlidersHorizontal, Layers, Mic, Radio, Settings2, PanelTop, PanelLeft, Bluetooth, Waves, Grid3x3, Smartphone, MonitorSmartphone, Home, ChefHat, Bath, Dumbbell, BedDouble, UtensilsCrossed, Store, Building2, Building, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import ChatWidget from "../components/chatbot/ChatWidget";
import SonorizacionLeadForm from "../components/landing/SonorizacionLeadForm";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import Breadcrumbs from "../components/landing/Breadcrumbs";

const WHATSAPP_SONORIZACION = "https://wa.me/34638109947?text=" + encodeURIComponent("Hola, necesito un presupuesto de sonorización.");

export default function Sonorizacion() {
  useEffect(() => {
    if (window.location.hash) {
      const id = setTimeout(() => {
        document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'instant' });
      }, 100);
      return () => clearTimeout(id);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const categorias = [
    { Icon: PanelTop, title: "Altavoces de techo" },
    { Icon: PanelLeft, title: "Altavoces empotrados" },
    { Icon: Bluetooth, title: "Altavoces Bluetooth" },
    { Icon: SlidersHorizontal, title: "Amplificadores" },
    { Icon: Layers, title: "Mezcladores" },
    { Icon: Mic, title: "Micrófonos" },
    { Icon: Grid3x3, title: "Sistemas multizona" },
    { Icon: Radio, title: "Megafonía" },
    { Icon: Waves, title: "Sonido ambiental" },
  ];

  const altavocesFeatures = [
    { Icon: PanelTop, title: "Empotrados en techo", desc: "Integrados en el techo, sin ocupar espacio visible en la estancia." },
    { Icon: PanelLeft, title: "Empotrados en pared", desc: "Instalación en pared para espacios donde el techo no es una opción." },
    { Icon: Bluetooth, title: "Conectividad Bluetooth", desc: "Reproduce música desde el móvil sin cables ni instalaciones adicionales." },
    { Icon: Waves, title: "Sonido ambiental", desc: "Cobertura uniforme pensada para crear ambiente sonoro en todo el espacio." },
    { Icon: Grid3x3, title: "Sistemas multizona", desc: "Control independiente de volumen y fuente por zona, cuando el proyecto lo requiere." },
    { Icon: Smartphone, title: "Control desde el móvil", desc: "Gestiona la reproducción desde tu smartphone cuando el modelo sea compatible." },
    { Icon: MonitorSmartphone, title: "Panel de control opcional", desc: "Algunos modelos incluyen panel con pantalla táctil para gestionar la reproducción directamente desde el equipo." },
  ];

  const altavocesAplicaciones = [
    { Icon: Home, title: "Viviendas" },
    { Icon: ChefHat, title: "Cocinas" },
    { Icon: Bath, title: "Baños" },
    { Icon: UtensilsCrossed, title: "Restaurantes" },
    { Icon: Store, title: "Comercios" },
    { Icon: Building2, title: "Oficinas" },
    { Icon: Dumbbell, title: "Gimnasios" },
    { Icon: BedDouble, title: "Apartamentos turísticos" },
    { Icon: Building, title: "Locales" },
  ];

  const espacios = [
    { title: "Restaurantes", img: "/images/sonorizacion-espacio-restaurante.webp", alt: "Interior de restaurante moderno preparado para sonorización ambiental" },
    { title: "Comercios", img: "/images/sonorizacion-espacio-comercio.webp", alt: "Interior de tienda moderna con ambiente sonoro" },
    { title: "Oficinas", img: "/images/sonorizacion-espacio-oficina.webp", alt: "Oficina moderna preparada para megafonía y sonido ambiental" },
  ];
  const espaciosTexto = ["Viviendas", "Comunidades", "Naves", "Eventos"];

  const multizonaAplicaciones = ["Restaurantes", "Comercios", "Oficinas", "Hoteles", "Viviendas", "Comunidades"];

  const amplificacionItems = [
    { Icon: SlidersHorizontal, title: "Amplificadores", desc: "De instalación, multizona y para sistemas distribuidos" },
    { Icon: Layers, title: "Mezcladores", desc: "Para gestionar varias fuentes de audio en un mismo sistema" },
    { Icon: Settings2, title: "Controladores", desc: "Gestión centralizada del sistema de sonido instalado" },
    { Icon: Radio, title: "Racks", desc: "Instalación ordenada de toda la electrónica del sistema" },
  ];

  const proceso = [
    { num: "01", title: "Estudio del espacio", desc: "Analizamos las dimensiones, acústica y uso real del local o zona a sonorizar." },
    { num: "02", title: "Diseño", desc: "Planteamos la distribución de altavoces y equipos según el espacio y el objetivo sonoro." },
    { num: "03", title: "Selección de equipos", desc: "Elegimos los altavoces, amplificadores y controladores adecuados a cada proyecto." },
    { num: "04", title: "Instalación", desc: "Montaje profesional del cableado, altavoces y electrónica del sistema." },
    { num: "05", title: "Configuración", desc: "Ajuste de zonas, volúmenes y fuentes de audio del sistema instalado." },
    { num: "06", title: "Pruebas", desc: "Verificación final de cobertura y calidad de sonido en todo el espacio." },
  ];

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060e1a", paddingBottom: 70 }}>
      <AdvancedSEO
        title="Sonorización Profesional Barcelona | Altavoces Empotrados y de Techo | Premium Tech Security"
        description="Sonorización profesional en Barcelona: instalación de altavoces empotrados y de techo con Bluetooth, amplificadores y sistemas multizona para restaurantes, comercios, oficinas y viviendas. Presupuesto gratis 638 10 99 47."
        canonicalUrl="https://alarmasenbarcelona.com/sonorizacion"
        keywords="sonorización Barcelona, sonorización profesional Barcelona, instalación de altavoces Barcelona, instalación altavoces techo Barcelona, altavoces empotrados Barcelona, altavoces empotrados Bluetooth Barcelona, altavoces de techo Bluetooth Barcelona, sonido ambiental Barcelona, sonorización restaurantes Barcelona, sonorización locales Barcelona, instalación sonido negocios Barcelona"
        schema={{
          "@type": "Service",
          "name": "Sonorización Profesional",
          "serviceType": "Instalación de sistemas de sonido, altavoces empotrados en techo y pared con Bluetooth para negocios, comunidades y eventos",
          "provider": { "@type": "LocalBusiness", "name": "Premium Tech Security" },
          "areaServed": "Barcelona, Catalunya"
        }}
      />
      <Navbar />

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "78vh", display: "flex", alignItems: "flex-end" }}>
        <img
          src="/images/sonorizacion-hero-restaurante.webp"
          alt="Instalación de sonorización profesional en restaurante moderno"
          loading="eager"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,14,26,0.55) 0%, rgba(6,14,26,0.55) 40%, rgba(6,14,26,0.96) 100%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ position: "relative", zIndex: 2, paddingTop: 140, paddingBottom: 56, width: "100%" }}>
          <div className="mb-6">
            <Breadcrumbs items={[{ label: "Servicios" }, { label: "Sonorización" }]} />
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.35)", borderRadius: 20, padding: "6px 16px", color: "#F87171", fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 20 }}>
            <Volume2 size={14} />
            INSTALACIÓN PROFESIONAL DE SONIDO
          </span>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6" style={{ lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            Sonorización Profesional
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-10">
            Diseñamos e instalamos sistemas de sonido para viviendas, negocios, restaurantes, oficinas, comunidades y espacios profesionales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToContact}
              className="bg-[#E63946] hover:bg-[#d32f3c] text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
            >
              Solicitar presupuesto
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href={WHATSAPP_SONORIZACION}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/25 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 0 112px", background: "#060e1a" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Categorías de sonido */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 16, textAlign: "center" }}>
              Todo lo que instalamos
            </h2>
            <p style={{ color: "#94A3B8", textAlign: "center", maxWidth: 640, margin: "0 auto 48px", lineHeight: 1.7 }}>
              Diseñamos e instalamos el sistema de sonido con los equipos adecuados a cada espacio.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {categorias.map((c, idx) => (
                <div key={idx} className="magic-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, display: "flex", alignItems: "center", gap: 14, transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(229,62,62,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <c.Icon size={20} color="#E63946" />
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>{c.title}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Altavoces Empotrados con Bluetooth */}
          <div id="altavoces-empotrados" style={{ marginBottom: 80, scrollMarginTop: 100 }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center" style={{ marginBottom: 56 }}>
              <div>
                <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 20 }}>
                  Altavoces Empotrados con Bluetooth
                </h2>
                <p style={{ color: "#94A3B8", fontSize: "1.05rem", lineHeight: 1.75 }}>
                  Disfruta de un sistema de sonido integrado en techo o pared, con conectividad Bluetooth y control sencillo desde dispositivos compatibles.
                </p>
              </div>
              <img
                src="/images/altavoces-empotrados-techo.webp"
                alt="Altavoces empotrados en techo con conectividad Bluetooth"
                loading="lazy"
                style={{ width: "100%", borderRadius: 16, display: "block", background: "#fff" }}
              />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginBottom: 56 }}>
              {altavocesFeatures.map((f, idx) => (
                <div key={idx} className="magic-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(229,62,62,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <f.Icon size={20} color="#E63946" />
                  </div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 6 }}>{f.title}</h3>
                  <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 24, textAlign: "center" }}>
              Ideal para
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4" style={{ marginBottom: 40 }}>
              {altavocesAplicaciones.map((a, idx) => (
                <div key={idx} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px 12px", textAlign: "center" }}>
                  <a.Icon size={22} color="#E63946" style={{ margin: "0 auto 8px" }} />
                  <p style={{ color: "#CBD5E0", fontSize: 12.5, fontWeight: 600, margin: 0 }}>{a.title}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToContact}
                className="bg-[#E63946] hover:bg-[#d32f3c] text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
              >
                Quiero instalar altavoces empotrados
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sonorizamos todo tipo de espacios */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 16, textAlign: "center" }}>
              Sonorizamos todo tipo de espacios
            </h2>
            <p style={{ color: "#94A3B8", textAlign: "center", maxWidth: 640, margin: "0 auto 48px", lineHeight: 1.7 }}>
              Cada espacio tiene sus propias necesidades acústicas. Diseñamos el sistema en función de tu proyecto.
            </p>
            <div className="grid sm:grid-cols-3 gap-6" style={{ marginBottom: 24 }}>
              {espacios.map((e, idx) => (
                <div key={idx} style={{ borderRadius: 16, overflow: "hidden", position: "relative", background: "#0A0A1A", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
                  <img src={e.img} alt={e.alt} loading="lazy" style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,26,0.88) 0%, transparent 55%)" }} />
                  <h3 style={{ position: "absolute", left: 18, bottom: 16, color: "#fff", fontSize: 17, fontWeight: 800, margin: 0 }}>{e.title}</h3>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ color: "#64748B", fontSize: 13, fontWeight: 600, marginRight: 10 }}>También sonorizamos:</span>
              {espaciosTexto.map((t) => (
                <span key={t} style={{ display: "inline-block", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "6px 14px", color: "#CBD5E0", fontSize: 12.5, fontWeight: 600, margin: "4px 4px" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Sonido multizona */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 48, marginBottom: 80 }}>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(229,62,62,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Grid3x3 size={24} color="#E63946" />
                </div>
                <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 16 }}>
                  Sonido multizona
                </h2>
                <p style={{ color: "#94A3B8", fontSize: "1.05rem", lineHeight: 1.75 }}>
                  Controla diferentes zonas de sonido de forma independiente según las necesidades de tu espacio.
                </p>
              </div>
              <div>
                <p style={{ color: "#64748B", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
                  Aplicaciones
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {multizonaAplicaciones.map((a) => (
                    <span key={a} style={{ display: "inline-block", background: "rgba(229,62,62,0.08)", border: "1px solid rgba(229,62,62,0.2)", borderRadius: 20, padding: "8px 16px", color: "#F87171", fontSize: 13, fontWeight: 700 }}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Amplificación y control */}
          <div style={{ marginBottom: 80 }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <img
                src="/images/sonorizacion-amplificacion-rack.webp"
                alt="Rack de amplificación y control de sonido profesional"
                loading="lazy"
                style={{ width: "100%", borderRadius: 16, display: "block", objectFit: "cover", maxHeight: 360 }}
              />
              <div>
                <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 16 }}>
                  Amplificación y control
                </h2>
                <p style={{ color: "#94A3B8", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: 28 }}>
                  Diseñamos el sistema de amplificación y control en función del espacio y las necesidades de cada proyecto.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {amplificacionItems.map((a, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(229,62,62,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <a.Icon size={17} color="#E63946" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 2 }}>{a.title}</h3>
                        <p style={{ color: "#94A3B8", fontSize: 12.5 }}>{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Proceso */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 16, textAlign: "center" }}>
              Así diseñamos tu sistema
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginTop: 48 }}>
              {proceso.map((p, idx) => (
                <div key={idx} className="magic-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28, transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease" }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#E63946", marginBottom: 10, letterSpacing: 1 }}>{p.num}</div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Relacionados */}
          <div style={{ marginBottom: 80, textAlign: "center" }}>
            <p style={{ color: "#94A3B8", fontSize: 14 }}>
              ¿También necesitas cableado o red para tu sistema de sonido? Consulta nuestra página de{" "}
              <Link to="/redes-informaticas" style={{ color: "#E63946", fontWeight: 700 }}>redes informáticas</Link>.
            </p>
          </div>

          <style>{`
            .magic-card:hover { transform: translateY(-6px); border-color: rgba(229,62,62,0.55); box-shadow: 0 20px 48px rgba(229,62,62,0.18); }
          `}</style>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-[#E63946] to-[#d32f3c] text-white rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-black mb-4 flex items-center justify-center gap-3">
              <Volume2 className="w-8 h-8" />
              Sonorización profesional para tu espacio
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Consulta gratuita sin compromiso. Diseñamos el sistema de sonido adecuado a tu local, negocio o comunidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToContact}
                className="bg-white text-[#E63946] hover:bg-gray-100 px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
              >
                Solicitar presupuesto de sonorización
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="tel:+34638109947"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Llamar
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id="contacto" style={{ background: "#0a1120", padding: "80px 0 112px" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: 16 }}>
              Solicita presupuesto de sonorización
            </h2>
            <p style={{ color: "#94A3B8", fontSize: "1.125rem", maxWidth: 640, margin: "0 auto" }}>
              Cuéntanos tu proyecto y te diseñaremos la mejor solución de sonido. Presupuesto personalizado sin compromiso.
            </p>
          </div>
          <SonorizacionLeadForm />
        </div>
      </div>

      <FooterSection />
      <ChatWidget />
    </div>
  );
}
