import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import LeadCaptureForm from "./LeadCaptureForm";

// Drawer de presupuesto — único modal de captación del sitio.
//
// El bug que se corrige aquí: antes el botón de cerrar vivía DENTRO del
// mismo contenedor con scroll que el formulario, así que en cuanto el
// usuario bajaba (formularios largos como el de Sonorización, con campos
// extra) el aspa se iba con el scroll y no había forma visible de salir.
// Ahora la cabecera (título + cerrar) es una franja "sticky" que se queda
// fija arriba del propio drawer mientras SOLO el contenido de debajo hace
// scroll — igual que el patrón de bottom-sheet nativo de iOS/Android.
export default function LeadFormDrawer({ open, service, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Cierre con ESC en desktop, y foco inicial en el botón de cerrar para
    // que el teclado/lector de pantalla entre directamente en un modal con
    // una salida clara.
    const onKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    const focusTimer = setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          />
          <motion.div
            data-testid="lead-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-drawer-title"
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.6 }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col"
            style={{ background: "#0A1120", border: "1px solid rgba(255,255,255,0.08)", maxHeight: "88vh" }}
          >
            {/* Cabecera sticky: nunca se va con el scroll del formulario */}
            <div
              className="flex-shrink-0"
              style={{
                position: "sticky", top: 0, zIndex: 2,
                background: "rgba(10,17,32,0.97)", backdropFilter: "blur(8px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="sm:hidden flex justify-center pt-2.5 pb-0.5">
                <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "14px 16px 14px 24px" }}>
                <div>
                  <h2 id="lead-drawer-title" style={{ fontSize: "clamp(1.1rem, 3vw, 1.35rem)", fontWeight: 900, color: "#FFFFFF", margin: 0 }}>
                    Solicita tu presupuesto
                  </h2>
                  <p style={{ fontSize: 12.5, color: "#94A3B8", margin: "2px 0 0" }}>
                    Sin compromiso. Te contactamos en menos de 24h.
                  </p>
                </div>
                <button
                  ref={closeBtnRef}
                  onClick={onClose}
                  aria-label="Cerrar formulario"
                  style={{
                    flexShrink: 0, width: 40, height: 40, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#CBD5E0", cursor: "pointer",
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Cuerpo: único elemento que hace scroll */}
            <div
              className="overflow-y-auto"
              style={{ padding: "20px 28px", paddingBottom: "calc(28px + env(safe-area-inset-bottom, 0px))" }}
            >
              <LeadCaptureForm service={service} onSuccess={() => setTimeout(onClose, 2200)} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
