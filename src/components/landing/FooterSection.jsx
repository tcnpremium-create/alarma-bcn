import React from "react";
import { Link } from "react-router-dom";
import { openCookiePreferences } from "@/components/CookieBanner";

const LOGO_BLANCO = "/images/logo-premium-blanco.webp";

const SEGURIDAD = [
  // /Servicios y /SobreNosotros no recibían NI UN enlace en todo el sitio: se
  // llegaba a ellas solo por el sitemap, pese a ser la página que reúne toda
  // la oferta y la de empresa.
  { label: "Todos los servicios", href: "/Servicios" },
  { label: "Cámaras de seguridad", href: "/camaras-barcelona" },
  { label: "Alarmas", href: "/alarmas-barcelona" },
  { label: "Videoporteros", href: "/videoporteros" },
  { label: "Control de accesos", href: "/control-accesos" },
  { label: "Cerraduras", href: "/cerraduras" },
  { label: "Kits y precios", href: "/Promociones" },
  { label: "Mantenimiento y soporte", href: "/MantenimientoSoporte" },
  { label: "Sobre nosotros", href: "/SobreNosotros" },
];

const TECNOLOGIA = [
  { label: "Redes informáticas", href: "/redes-informaticas" },
];

const SONIDO = [
  { label: "Sonorización profesional", href: "/sonorizacion" },
];

// La columna "Zonas" enlazaba solo a las páginas de cámaras, y por eso las
// 4 landings /alarmas-{ciudad} recibían un único enlace en todo el sitio
// (desde la home) mientras las de cámaras tenían uno en cada página.
// Ahora cada servicio tiene su columna de zonas.
const ZONAS_ALARMAS = [
  { label: "Alarmas en Barcelona", href: "/alarmas-barcelona" },
  { label: "Alarmas en Sabadell", href: "/alarmas-sabadell" },
  { label: "Alarmas en Girona", href: "/alarmas-girona" },
  { label: "Alarmas en Tarragona", href: "/alarmas-tarragona" },
  { label: "Alarmas en Lleida", href: "/alarmas-lleida" },
  { label: "Alarmas en L'Hospitalet", href: "/Hospitalet" },
];

const ZONAS_CAMARAS = [
  { label: "Cámaras en Barcelona", href: "/camaras-barcelona" },
  { label: "Cámaras en Sabadell", href: "/camaras-sabadell" },
  { label: "Cámaras en Girona", href: "/camaras-girona" },
  { label: "Cámaras en Tarragona", href: "/camaras-tarragona" },
  { label: "Cámaras en Lleida", href: "/camaras-lleida" },
];

export default function FooterSection() {
  return (
    <footer className="bg-[#0A1628]" style={{ paddingBottom: 70 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1 - Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={LOGO_BLANCO} alt="Premium Tech Security" loading="lazy" decoding="async" className="h-12 mb-4" />
            <p className="text-white/60 text-sm leading-relaxed">
              Instaladores certificados en Barcelona y Catalunya
            </p>
          </div>

          {/* Column 2 - Seguridad */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Seguridad</h4>
            <ul className="space-y-2">
              {SEGURIDAD.map((s) => (
                <li key={s.href}>
                  <Link to={s.href} className="text-white/60 hover:text-white text-sm transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Tecnología + Sonido */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Tecnología</h4>
            <ul className="space-y-2 mb-6">
              {TECNOLOGIA.map((t) => (
                <li key={t.href}>
                  <Link to={t.href} className="text-white/60 hover:text-white text-sm transition-colors">{t.label}</Link>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Sonido</h4>
            <ul className="space-y-2">
              {SONIDO.map((s) => (
                <li key={s.href}>
                  <Link to={s.href} className="text-white/60 hover:text-white text-sm transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Alarmas por zona */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Alarmas por zona</h4>
            <ul className="space-y-2">
              {ZONAS_ALARMAS.map((z) => (
                <li key={z.href}>
                  <Link to={z.href} className="text-white/60 hover:text-white text-sm transition-colors">{z.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 - Cámaras por zona */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Cámaras por zona</h4>
            <ul className="space-y-2">
              {ZONAS_CAMARAS.map((z) => (
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
              <button
                type="button"
                onClick={() => openCookiePreferences()}
                className="hover:text-white transition-colors underline-offset-2"
              >
                Preferencias de cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}