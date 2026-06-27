import React from "react";
import { Link } from "react-router-dom";
import { Camera, Shield, Bell, Key } from "lucide-react";

const SERVICES = [
  { icon: Camera, title: "Cámaras 4K con IA", text: "Detecta intrusos al instante. Visión nocturna en color. Control desde el móvil.", link: "/camaras-barcelona", cta: "Ver cámaras →" },
  { icon: Shield, title: "Alarmas Conectadas", text: "Blindadas contra inhibidores. Central Receptora 24/7. Respuesta en 15 segundos.", link: "/alarmas-barcelona", cta: "Ver alarmas →" },
  { icon: Bell, title: "Videoporteros IP", text: "Ve quién llama desde tu móvil. Apertura remota. Fermax, Bticino y Golmar.", link: "/videoporteros", cta: "Ver videoporteros →" },
  { icon: Key, title: "Control de Accesos", text: "Biometría facial, tarjetas RFID y apertura remota para empresas y comunidades.", link: "/ControlAccesos", cta: "Ver accesos →" },
];

export default function HomeServicesGrid() {
  return (
    <section style={{ backgroundColor: "#FFFFFF", padding: "48px 20px" }}>
      <div className="max-w-5xl mx-auto">
        <h2 style={{ fontWeight: 900, fontSize: 26, color: "#0A0A1A", textAlign: "center", margin: 0, lineHeight: 1.15 }}>
          Todo lo que necesitas para estar protegido
        </h2>
        <p style={{ color: "#6B7280", fontSize: 16, textAlign: "center", marginTop: 8, marginBottom: 32 }}>
          Instalación profesional en Barcelona y toda Catalunya
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-[20px] border border-[#F0F0F0] p-6 sm:p-7 text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-[#FFF0F0] flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-7 h-7 text-[#E53E3E]" />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: 17, color: "#0A0A1A", marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, marginBottom: 12 }}>{s.text}</p>
              <Link to={s.link} style={{ color: "#E53E3E", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                {s.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}