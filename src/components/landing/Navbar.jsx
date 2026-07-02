import React, { useState, useEffect, useRef } from "react";
import { Phone, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Cámaras", href: "/camaras-barcelona" },
  { label: "Alarmas", href: "/alarmas-barcelona" },
  { label: "Control Accesos", href: "/control-accesos" },
  { label: "Videoporteros", href: "/videoporteros" },
  { label: "Tecnología", href: "/tecnologia" },
  { label: "Blog", href: "/Blog" },
  { label: "Contacto", href: "/Contact" },
];

const LOGO_BLANCO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/1bda847fb_logoblanco.png";
const LOGO_NEGRO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/c939af4e3_logonegro.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onClick = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) setMobileOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [mobileOpen]);

  const linkClass = `text-[13px] xl:text-sm font-medium transition-colors duration-300 hover:text-[#E63946] px-2 xl:px-3 py-1 whitespace-nowrap ${scrolled ? "text-gray-700" : "text-white/90"}`;

  return (
    <>
      <link rel="preload" as="image" href={LOGO_BLANCO} />
      <link rel="preload" as="image" href={LOGO_NEGRO} />

      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-100" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between" style={{ height: scrolled ? 64 : 80, transition: "height 0.5s ease" }}>
            {/* Logo */}
            <a href="/" aria-label="Premium Tech Security – Volver al inicio" className="flex-shrink-0" style={{ display: "block", width: "clamp(130px, 22vw, 260px)", height: scrolled ? 64 : 80, transition: "height 0.5s ease", position: "relative" }}>
              <img src={LOGO_BLANCO} alt="Premium Tech Security" width={1240} height={744} fetchpriority="high" decoding="async" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "left center", opacity: scrolled ? 0 : 1, transition: "opacity 0.4s ease", pointerEvents: "none" }} />
              <img src={LOGO_NEGRO} alt="" aria-hidden="true" width={440} height={144} decoding="async" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "left center", opacity: scrolled ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none" }} />
            </a>

            {/* Desktop Nav */}
            <nav aria-label="Menú principal" className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-0.5 xl:gap-1" role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}><Link to={link.href} className={linkClass}>{link.label}</Link></li>
                ))}
              </ul>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <a href="tel:+34615774532" aria-label="Llamar" className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${scrolled ? "text-[#0A1628]" : "text-white"}`}>
                <Phone className="w-4 h-4 text-[#E63946]" />
                Llamar
              </a>
              <Link to="/Contact" className="bg-[#E63946] hover:bg-[#d32f3c] text-white rounded-full px-5 py-2.5 text-sm font-bold shadow-md transition-all duration-200 whitespace-nowrap">
                Presupuesto →
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-[#0A1628] hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[64px] z-[999] bg-white border-b border-gray-100 shadow-2xl lg:hidden max-h-[calc(100vh-64px)] overflow-y-auto"
          >
            <nav>
              <ul className="px-4 py-5 space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} onClick={() => setMobileOpen(false)} className="block text-[#0A1628] font-medium py-3 px-2 rounded-lg hover:bg-gray-50 hover:text-[#E63946] transition-colors text-base">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4 border-t border-gray-100 mt-2">
                  <a href="tel:+34615774532" className="flex items-center gap-2 text-[#0A1628] font-semibold py-3 px-2">
                    <Phone className="w-4 h-4 text-[#E63946]" />
                    Llamar
                  </a>
                </li>
                <li>
                  <Link to="/Contact" onClick={() => setMobileOpen(false)} className="block w-full bg-[#E63946] hover:bg-[#d32f3c] text-white rounded-full font-bold py-3 text-base transition-colors text-center">
                    Presupuesto →
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}