import React from "react";
import { Link } from "react-router-dom";
import { Volume2, Network, KeyRound, Fingerprint, Bell } from "lucide-react";

const SERVICES = [
  { Icon: Volume2, title: "Sonorización", desc: "Sistemas de sonido profesional para negocios y comunidades", href: "/sonorizacion" },
  { Icon: Network, title: "Redes informáticas", desc: "Cableado estructurado y WiFi profesional", href: "/redes-informaticas" },
  { Icon: KeyRound, title: "Cerraduras", desc: "Cerraduras inteligentes y cilindros de seguridad", href: "/cerraduras" },
  { Icon: Fingerprint, title: "Control de accesos", desc: "Lectores biométricos, tarjetas y códigos", href: "/control-accesos" },
  { Icon: Bell, title: "Videoporteros", desc: "Videoporteros IP para hogares y comunidades", href: "/videoporteros" },
];

export default function HomeMoreServices() {
  return (
    <section style={{ backgroundColor: "#F8F9FA", padding: "56px 20px" }}>
      <div className="max-w-6xl mx-auto">
        <h2 style={{ fontWeight: 900, fontSize: 24, color: "#0A0A1A", textAlign: "center", margin: 0 }}>
          Más soluciones de Premium Tech Security
        </h2>
        <p style={{ color: "#6B7280", fontSize: 15, textAlign: "center", marginTop: 8, marginBottom: 32 }}>
          Además de cámaras y alarmas, somos integradores de seguridad y tecnología
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {SERVICES.map((s) => (
            <Link
              key={s.href}
              to={s.href}
              className="bg-white rounded-2xl p-5 text-center hover:shadow-lg transition-shadow"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textDecoration: "none" }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(229,62,62,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                <s.Icon size={22} color="#E63946" />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: 14, color: "#0A0A1A", marginBottom: 4 }}>{s.title}</h3>
              <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
