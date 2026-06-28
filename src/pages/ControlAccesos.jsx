import React, { useState } from "react";
import { Phone, Lock, Fingerprint, CreditCard, ClipboardList, Clock, BarChart3, Shield, Check, Building2, Home, ShoppingBag, Stethoscope } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import HeroContactModal from "../components/landing/HeroContactModal";

const FEATURES = [
  { Icon: Lock, title: "Código PIN", desc: "Códigos personalizados por usuario. Fácil revocación sin cambiar cerraduras." },
  { Icon: Fingerprint, title: "Huella dactilar", desc: "Lector biométrico de alta precisión. Sin llaves, sin tarjetas. Acceso en menos de 1 segundo." },
  { Icon: CreditCard, title: "Tarjetas RFID", desc: "Control con tarjetas y llaveros inteligentes sin contacto. Fácil de gestionar y anular al instante." },
  { Icon: ClipboardList, title: "Registro completo", desc: "Historial detallado de cada acceso: quién, cuándo y desde dónde. Exportable." },
  { Icon: Clock, title: "Horarios programables", desc: "Restricciones horarias por usuario o grupo. Control total de franjas horarias de acceso." },
  { Icon: BarChart3, title: "Panel centralizado", desc: "Gestiona todos los accesos desde una sola plataforma. Añade o elimina usuarios al instante." },
];

const USE_CASES = [
  { Icon: Building2, title: "Oficinas y empresas", desc: "Control de zonas restringidas, salas de servidores, despachos directivos y áreas de administración." },
  { Icon: Home, title: "Comunidades de vecinos", desc: "Acceso a portal, garaje, zonas comunes y piscinas. Sin llaves, sin perderlas jamás." },
  { Icon: ShoppingBag, title: "Comercios y locales", desc: "Control de acceso a almacén, caja fuerte y backoffice. Historial para auditorías." },
  { Icon: Stethoscope, title: "Hospitales y clínicas", desc: "Acceso restringido a quirófanos, farmacia y archivos clínicos. Cumplimiento normativo incluido." },
];

export default function ControlAccesos() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", paddingBottom: 70 }}>
      <AdvancedSEO
        title="Control de Accesos Biométrico Barcelona | Huella Dactilar y Facial"
        description="Control de accesos en Barcelona. Cerraduras inteligentes y lectores biométricos. Apertura remota desde móvil. Presupuesto gratis. Tel: 638 10 99 47"
        keywords="control accesos Barcelona, control biométrico, huella dactilar, reconocimiento facial, tarjetas RFID, control accesos oficinas, seguridad empresas Barcelona"
        schema={{
          "@type": "Service",
          "name": "Control de Accesos Biométrico",
          "serviceType": "Sistemas de Control de Accesos para Empresas",
          "provider": {
            "@type": "LocalBusiness",
            "name": "PremiumTechSecurity"
          },
          "areaServed": "Barcelona, Catalunya"
        }}
      />
      <Navbar />

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0A0A1A 0%, #0F1923 50%, #1a1a2e 100%)", color: "#fff", paddingTop: 112, paddingBottom: 64 }}>
        <div className="max-w-6xl mx-auto" style={{ padding: "0 24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 20, padding: "5px 14px", marginBottom: 24 }}>
            <span style={{ color: "#F87171", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>CONTROL DE ACCESOS · BARCELONA</span>
          </div>
          <div className="grid lg:grid-cols-2" style={{ gap: 40 }}>
            <div>
              <h1 style={{ fontWeight: 900, fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.1, margin: "0 0 20px", color: "#fff" }}>
                Control de Accesos Biométrico Profesional
              </h1>
              <p style={{ color: "#94A3B8", fontSize: 17, lineHeight: 1.75, margin: "0 0 32px" }}>
                Gestiona quién entra, cuándo y a qué zonas. Huella dactilar, reconocimiento facial, tarjetas RFID y código PIN — todo integrado en un solo sistema. Sin llaves, sin riesgos, sin complicaciones.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 380 }}>
                <button
                  onClick={() => setShowModal(true)}
                  style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "15px 24px", border: "none", cursor: "pointer" }}
                >
                  Solicitar presupuesto gratis →
                </button>
                <a
                  href="tel:+34638109947"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 50, padding: "13px 24px", textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                >
                  <Phone style={{ width: 16, height: 16 }} />
                  Llamar
                </a>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/images/reconocimiento-facial.jpeg"
                alt="Sistema de reconocimiento facial y control de accesos biométrico"
                style={{ width: "100%", borderRadius: 16, maxHeight: 340, objectFit: "cover", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "64px 20px" }}>
        <div className="max-w-5xl mx-auto">
          <span style={{ display: "inline-block", backgroundColor: "#E53E3E", color: "#fff", borderRadius: 4, fontSize: 11, fontWeight: 800, padding: "5px 12px", letterSpacing: "0.08em", marginBottom: 16 }}>
            TECNOLOGÍA DE CONTROL DE ACCESOS
          </span>
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#0A0A1A", margin: "0 0 8px" }}>Múltiples métodos de acceso</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 36, maxWidth: 560 }}>
            Cada sistema se adapta a tu nivel de seguridad requerido. Combinamos varios métodos en una misma instalación.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 20 }}>
            {FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} style={{ backgroundColor: "#fff", borderRadius: 14, padding: "24px 20px", borderLeft: "3px solid #E53E3E", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
                <Icon style={{ width: 24, height: 24, color: "#E53E3E", marginBottom: 12 }} />
                <h3 style={{ fontWeight: 800, fontSize: 15, color: "#0A0A1A", margin: "0 0 6px" }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIOMETRIC IMAGE */}
      <section style={{ backgroundColor: "#0A0A1A", padding: "56px 20px 0" }}>
        <div className="max-w-5xl mx-auto">
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
            <span style={{ display: "inline-flex", alignItems: "center", backgroundColor: "rgba(229,62,62,0.15)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 20, padding: "5px 14px", color: "#F87171", fontSize: 11, fontWeight: 700, letterSpacing: 1, width: "fit-content" }}>
              SEGURIDAD BIOMÉTRICA
            </span>
            <h2 style={{ fontWeight: 900, fontSize: 24, color: "#fff", margin: 0 }}>El futuro del control de accesos</h2>
            <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.7, margin: 0, maxWidth: 540 }}>
              Los sistemas biométricos eliminan las vulnerabilidades de las llaves y tarjetas tradicionales. Sin duplicados posibles, sin llaves perdidas, sin accesos no autorizados. Cada entrada queda registrada automáticamente con fecha, hora y usuario.
            </p>
          </div>
          <img
            src="/images/control-accesos-biometrico.webp"
            alt="Lector biométrico de huella dactilar para control de accesos profesional"
            style={{ width: "100%", borderRadius: "20px 20px 0 0", display: "block", maxHeight: 320, objectFit: "cover" }}
          />
        </div>
      </section>

      {/* USE CASES */}
      <section style={{ backgroundColor: "#fff", padding: "64px 20px" }}>
        <div className="max-w-5xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#0A0A1A", margin: "0 0 8px" }}>Soluciones por sector</h2>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 36 }}>Adaptamos cada instalación al uso, volumen de usuarios y nivel de seguridad requerido</p>
          <div className="grid sm:grid-cols-2" style={{ gap: 20 }}>
            {USE_CASES.map(({ Icon, title, desc }) => (
              <div key={title} style={{ backgroundColor: "#F8F9FA", borderRadius: 14, padding: "24px 20px", border: "1px solid #E5E7EB" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "rgba(229,62,62,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Icon style={{ width: 20, height: 20, color: "#E53E3E" }} />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0A0A1A", margin: "0 0 8px" }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section style={{ backgroundColor: "#F8F9FA", padding: "64px 20px" }}>
        <div className="max-w-5xl mx-auto">
          <h2 style={{ fontWeight: 900, fontSize: 26, color: "#0A0A1A", margin: "0 0 36px" }}>Todo lo que incluye nuestro servicio</h2>
          <div className="grid sm:grid-cols-2" style={{ gap: 12 }}>
            {[
              "Visita técnica gratuita y estudio de accesos",
              "Instalación de lectores biométricos certificados",
              "Configuración de usuarios y permisos",
              "Integración con sistemas de alarma existentes",
              "Formación de uso para el personal",
              "Documentación de cumplimiento normativo",
              "Soporte técnico post-instalación",
              "Mantenimiento preventivo anual"
            ].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "#fff", borderRadius: 10, padding: "14px 16px", border: "1px solid #E5E7EB" }}>
                <Check style={{ width: 18, height: 18, color: "#E53E3E", flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #0A0A1A 0%, #1a1a2e 100%)", padding: "64px 20px" }}>
        <div className="max-w-2xl mx-auto" style={{ textAlign: "center" }}>
          <h2 style={{ fontWeight: 900, fontSize: 28, color: "#fff", margin: "0 0 12px" }}>
            Control de accesos profesional en Barcelona
          </h2>
          <p style={{ color: "#94A3B8", fontSize: 16, margin: "0 0 32px" }}>
            Consulta gratuita sin compromiso. Diseñamos la solución perfecta para tu empresa u oficina.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360, margin: "0 auto" }}>
            <button
              onClick={() => setShowModal(true)}
              style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 16, borderRadius: 50, padding: 18, border: "none", cursor: "pointer" }}
            >
              Solicitar presupuesto gratis →
            </button>
            <a
              href="tel:+34638109947"
              style={{ border: "2px solid rgba(255,255,255,0.5)", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: 16, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "transparent" }}
            >
              <Phone style={{ width: 18, height: 18 }} />
              Llamar
            </a>
          </div>
        </div>
      </section>

      <FooterSection />

      {showModal && (
        <HeroContactModal
          defaultServicio="Control de accesos"
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
