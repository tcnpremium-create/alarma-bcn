import React, { useState, useEffect } from "react";
import { getConsent, setConsent } from "@/lib/consent";

// Evento global para que cualquier parte de la web (p.ej. el enlace del
// footer) pueda reabrir el panel de preferencias de cookies sin tener
// que levantar estado hasta la raíz de la app.
const REOPEN_EVENT = "ptsec:reopen-cookie-preferences";
export function openCookiePreferences() {
  window.dispatchEvent(new Event(REOPEN_EVENT));
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const stored = getConsent();
    if (!stored) {
      setVisible(true);
    } else {
      setAnalytics(stored.analytics);
      setAdvertising(stored.advertising);
    }

    const onReopen = () => {
      const current = getConsent();
      if (current) {
        setAnalytics(current.analytics);
        setAdvertising(current.advertising);
      }
      setShowDetails(true);
      setVisible(true);
    };
    window.addEventListener(REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(REOPEN_EVENT, onReopen);
  }, []);

  const acceptAll = () => {
    setConsent({ analytics: true, advertising: true });
    setVisible(false);
    setShowDetails(false);
  };

  const rejectAll = () => {
    setConsent({ analytics: false, advertising: false });
    setVisible(false);
    setShowDetails(false);
  };

  const saveConfigured = () => {
    setConsent({ analytics, advertising });
    setVisible(false);
    setShowDetails(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Preferencias de cookies"
      className="fixed bottom-0 left-0 right-0 z-[10000] px-4 py-4 sm:px-6 border-t border-slate-800"
      style={{ backdropFilter: "blur(12px)", background: "rgba(15, 23, 42, 0.96)" }}
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-slate-300 mb-3">
          Utilizamos cookies necesarias para el funcionamiento de la web y, si lo aceptas, cookies de analítica y publicidad para mejorar tu experiencia. Puedes aceptarlas todas, rechazarlas o configurar tus preferencias.
        </p>

        {showDetails && (
          <div className="mb-4 space-y-3 border-t border-slate-800 pt-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">Necesarias</p>
                <p className="text-xs text-slate-400">Imprescindibles para el funcionamiento del sitio. Siempre activas.</p>
              </div>
              <span className="shrink-0 text-xs font-semibold text-slate-500 px-3 py-1 rounded-full border border-slate-700">Siempre activas</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">Analítica</p>
                <p className="text-xs text-slate-400">Google Analytics y HubSpot, para entender cómo se usa la web.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics((v) => !v)}
                className="shrink-0 w-12 h-7 rounded-full transition-colors duration-200 relative"
                style={{ background: analytics ? "#E53E3E" : "#334155" }}
              >
                <span
                  className="absolute top-1 w-5 h-5 rounded-full bg-white transition-transform duration-200"
                  style={{ transform: analytics ? "translateX(22px)" : "translateX(4px)" }}
                />
              </button>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">Publicidad</p>
                <p className="text-xs text-slate-400">Google AdSense, para mostrar anuncios relevantes.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={advertising}
                onClick={() => setAdvertising((v) => !v)}
                className="shrink-0 w-12 h-7 rounded-full transition-colors duration-200 relative"
                style={{ background: advertising ? "#E53E3E" : "#334155" }}
              >
                <span
                  className="absolute top-1 w-5 h-5 rounded-full bg-white transition-transform duration-200"
                  style={{ transform: advertising ? "translateX(22px)" : "translateX(4px)" }}
                />
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2.5">
          {!showDetails && (
            <button
              onClick={() => setShowDetails(true)}
              className="text-sm text-slate-300 underline underline-offset-2 hover:text-white transition-colors px-1 py-2"
            >
              Configurar
            </button>
          )}
          <div className="flex-1" />
          <button
            onClick={rejectAll}
            className="shrink-0 bg-transparent border border-slate-600 hover:border-slate-400 text-slate-200 text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200"
          >
            Rechazar
          </button>
          {showDetails ? (
            <button
              onClick={saveConfigured}
              className="shrink-0 bg-[#E53E3E] hover:bg-[#C53030] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200"
            >
              Guardar preferencias
            </button>
          ) : (
            <button
              onClick={acceptAll}
              className="shrink-0 bg-[#E53E3E] hover:bg-[#C53030] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200"
            >
              Aceptar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
