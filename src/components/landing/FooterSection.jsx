import React from "react";
import { Link } from "react-router-dom";

const LOGO_BLANCO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/1bda847fb_logoblanco.png";

const SERVICIOS = [
  { label: "Cámaras", href: "/camaras-barcelona" },
  { label: "Alarmas", href: "/alarmas-barcelona" },
  { label: "Videoporteros", href: "/videoporteros" },
  { label: "Control Accesos", href: "/ControlAccesos" },
  { label: "Tecnología", href: "/tecnologia" },
];

const ZONAS = [
  { label: "Barcelona", href: "/camaras-barcelona" },
  { label: "Sabadell", href: "/camaras-sabadell" },
  { label: "Girona", href: "/camaras-girona" },
  { label: "Tarragona", href: "/camaras-tarragona" },
  { label: "Lleida", href: "/camaras-lleida" },
  { label: "Hospitalet", href: "/Hospitalet" },
];

export default function FooterSection() {
  return (
    <footer className="bg-[#0A1628]" style={{ paddingBottom: 70 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Column 1 - Brand */}
          <div>
            <img src={LOGO_BLANCO} alt="Premium Tech Security" className="h-12 mb-4" />
            <p className="text-white/60 text-sm leading-relaxed">
              Instaladores certificados en Barcelona y Catalunya
            </p>
          </div>

          {/* Column 2 - Servicios */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Servicios</h4>
            <ul className="space-y-2">
              {SERVICIOS.map((s) => (
                <li key={s.href}>
                  <Link to={s.href} className="text-white/60 hover:text-white text-sm transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Zonas */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Zonas</h4>
            <ul className="space-y-2">
              {ZONAS.map((z) => (
                <li key={z.href}>
                  <Link to={z.href} className="text-white/60 hover:text-white text-sm transition-colors">{z.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs">
            <span>© 2026 Premium Tech Security · NIF B67014076</span>
            <div className="flex items-center gap-4">
              <Link to="/AvisoLegal" className="hover:text-white transition-colors">Aviso Legal</Link>
              <Link to="/Privacidad" className="hover:text-white transition-colors">Privacidad</Link>
              <Link to="/Cookies" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}