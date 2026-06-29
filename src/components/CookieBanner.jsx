import React, { useState, useEffect } from "react";

const STORAGE_KEY = "alarma_bcn_cookies_accepted";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[10000] flex items-center justify-between gap-4 px-4 py-3 sm:px-6 border-t border-slate-800"
      style={{ backdropFilter: "blur(12px)", background: "rgba(15, 23, 42, 0.9)" }}
    >
      <p className="text-sm text-slate-300 flex-1">
        Utilizamos cookies para ofrecerte la mejor experiencia de seguridad en nuestra web.
      </p>
      <button
        onClick={accept}
        className="shrink-0 bg-[#E53E3E] hover:bg-[#C53030] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200"
      >
        Aceptar
      </button>
    </div>
  );
}
