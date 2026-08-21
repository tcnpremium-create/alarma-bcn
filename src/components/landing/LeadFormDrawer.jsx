import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import LeadCaptureForm from "./LeadCaptureForm";

export default function LeadFormDrawer({ open, service, onClose }) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, [open]);

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
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          />
          <motion.div
            data-testid="lead-drawer"
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.6 }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto"
            style={{ background: "#0A1120", border: "1px solid rgba(255,255,255,0.08)", paddingBottom: "calc(32px + env(safe-area-inset-bottom, 0px))" }}
          >
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div style={{ width: 40, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
            </div>

            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div style={{ padding: "20px 28px 0" }}>
              <h2 style={{ fontSize: "clamp(1.2rem, 3vw, 1.5rem)", fontWeight: 900, color: "#FFFFFF", margin: "0 0 8px", textAlign: "center" }}>
                Solicita tu presupuesto gratis
              </h2>
              <p style={{ fontSize: 13.5, color: "#94A3B8", margin: "0 0 24px", textAlign: "center" }}>
                Sin compromiso. Te contactamos en menos de 24h.
              </p>
              <LeadCaptureForm service={service} onSuccess={() => setTimeout(onClose, 2200)} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
