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
      className="fixed bottom-[max(4.5rem,calc(env(safe-area-inset-bottom)+4rem))] left-3 right-3 z-[9998] max-h-[60dvh] overflow-y-auto rounded-2xl border border-slate-700 px-3 py-2 shadow-2xl sm:bottom-6 sm:left-1/2 sm:right-auto sm:w-[min(42rem,calc(100vw-3rem))] sm:-translate-x-1/2 sm:px-6 sm:py-4"
      style={{ backdropFilter: "blur(12px)", background: "rgba(15, 23, 42, 0.97)" }}
    >
      <div className="max-w-4xl mx-auto">
        <p className="mb-1 text-[11px] leading-tight text-slate-300 sm:mb-3 sm:text-sm sm:leading-relaxed">
          Cookies necesarias; analítica y publicidad, solo con permiso.
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

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
          {!showDetails && (
            <button
              onClick={() => setShowDetails(true)}
              className="min-h-9 rounded-lg px-2 py-1.5 text-[11px] text-slate-300 underline underline-offset-2 transition-colors hover:text-white sm:min-h-11 sm:px-2 sm:py-2 sm:text-sm"
            >
              Configurar
            </button>
          )}
          <div className="flex-1" />
          <button
            onClick={rejectAll}
            className="min-h-9 shrink-0 rounded-full border border-slate-600 bg-transparent px-3 py-1.5 text-[11px] font-semibold text-slate-200 transition-colors duration-200 hover:border-slate-400 sm:min-h-11 sm:px-5 sm:py-2 sm:text-sm"
          >
            Rechazar
          </button>
          {showDetails ? (
            <button
              onClick={saveConfigured}
              className="min-h-9 shrink-0 rounded-full bg-[#E53E3E] px-3 py-1.5 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-[#C53030] sm:min-h-11 sm:px-5 sm:py-2 sm:text-sm"
            >
              Guardar preferencias
            </button>
          ) : (
            <button
              onClick={acceptAll}
            className="min-h-9 shrink-0 rounded-full bg-[#E53E3E] px-3 py-1.5 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-[#C53030] sm:min-h-11 sm:px-5 sm:py-2 sm:text-sm"
            >
              Aceptar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
