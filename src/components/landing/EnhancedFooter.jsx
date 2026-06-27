import React from "react";
import { Shield, Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function EnhancedFooter() {
  return (
    <footer className="bg-[#0A1628] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-[#E63946]" />
              <span className="text-white font-bold text-lg">PremiumTech</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Empresa especializada en sistemas de seguridad profesional en Barcelona y Catalunya.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white/40 hover:text-[#E63946] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-[#E63946] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/40 hover:text-[#E63946] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm tracking-widest uppercase">Servicios</h4>
            <ul className="space-y-3">
              <li>
                <Link to={createPageUrl("SistemasAlarma")} className="text-white/40 hover:text-white/70 transition-colors text-sm">
                  Sistemas de Alarma
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Videovigilancia")} className="text-white/40 hover:text-white/70 transition-colors text-sm">
                  Videovigilancia 4K
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("ControlAccesos")} className="text-white/40 hover:text-white/70 transition-colors text-sm">
                  Control de Accesos
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("MantenimientoSoporte")} className="text-white/40 hover:text-white/70 transition-colors text-sm">
                  Mantenimiento 24/7
                </Link>
              </li>
            </ul>
          </div>

          {/* Zonas */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm tracking-widest uppercase">Zonas</h4>
            <ul className="space-y-3">
              <li>
                <Link to={createPageUrl("Home")} className="text-white/40 hover:text-white/70 transition-colors text-sm">
                  Barcelona
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Badalona")} className="text-white/40 hover:text-white/70 transition-colors text-sm">
                  Badalona
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Hospitalet")} className="text-white/40 hover:text-white/70 transition-colors text-sm">
                  Hospitalet
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Sabadell")} className="text-white/40 hover:text-white/70 transition-colors text-sm">
                  Sabadell
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm tracking-widest uppercase">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#E63946] mt-0.5 flex-shrink-0" />
                <a href="tel:+34638109947" className="text-white/60 hover:text-white text-sm transition-colors">
                  638 10 99 47
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#E63946] mt-0.5 flex-shrink-0" />
                <a href="mailto:tcnpremium@gmail.com" className="text-white/60 hover:text-white text-sm transition-colors">
                  tcnpremium@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E63946] mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  Carrer de Balmes, 150<br />08008 Barcelona
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#E63946] mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  Lun - Vie: 9:00 - 20:00<br />
                  Sáb: 10:00 - 14:00
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm tracking-widest uppercase">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to={createPageUrl("AvisoLegal")} className="text-white/40 hover:text-white/70 transition-colors text-sm">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Privacidad")} className="text-white/40 hover:text-white/70 transition-colors text-sm">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Cookies")} className="text-white/40 hover:text-white/70 transition-colors text-sm">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Blog")} className="text-white/40 hover:text-white/70 transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 py-8"></div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} PremiumTech Security. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-white/30 text-xs">
            <span>✓ Instalador homologado</span>
            <span>✓ Certificado profesional</span>
            <span>✓ Partner oficial</span>
          </div>
        </div>
      </div>
    </footer>
  );
}