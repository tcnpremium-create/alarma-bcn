import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Tag } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLeadDrawer } from "@/context/LeadDrawerContext";
import { useExitIntent } from "@/hooks/useExitIntent";
import { markDismissed, markConverted } from "@/lib/exitIntent";
import { CAMERA_KITS } from "@/data/cameraKits";

// Contextualidad: el popup solo promociona cámaras donde tiene sentido
// comercial hacerlo. Se usa una lista blanca (en vez de ir excluyendo
// página a página) porque es más fácil de auditar y evita mostrar la
// promoción de forma indiscriminada en páginas ajenas (Sonorización,
// Cerraduras, páginas legales, etc.) por simple omisión.
const ALLOWED_EXACT_PATHS = ["/", "/Promociones", "/Servicios"];
const ALLOWED_PATH_PREFIXES = ["/camaras-"]; // camaras-barcelona, camaras-sabadell...

function isContextuallyRelevant(pathname) {
  if (ALLOWED_EXACT_PATHS.includes(pathname)) return true;
  return ALLOWED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

const ENTRY_KIT = CAMERA_KITS.find((k) => k.id === "basico") || CAMERA_KITS[0];

/**
 * Modal de recuperación de abandono ("antes de irte…").
 *
 * Se muestra como máximo una vez por sesión (ver src/lib/exitIntent.js),
 * nunca en los primeros segundos de visita, nunca si ya hay un
 * formulario abierto, nunca si la persona ya convirtió (formulario
 * iniciado/enviado, clic en WhatsApp, o ya cerró/usó este mismo popup
 * antes en la sesión), y solo en páginas donde promocionar cámaras es
 * contextualmente relevante (ver isContextuallyRelevant).
 *
 * onVisibleChange(bool) permite a Layout.jsx ocultar el CTA flotante de
 * WhatsApp mientras este modal está abierto, para no competir por
 * atención con dos elementos flotantes en pantalla a la vez.
 */
export default function ExitIntentModal({ onVisibleChange }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { open: drawerOpen, openDrawer } = useLeadDrawer();
  const shouldReduceMotion = useReducedMotion();
  const closeBtnRef = useRef(null);

  const trigger = useCallback(() => {
    if (drawerOpen) return; // nunca compite con el formulario real
    if (!isContextuallyRelevant(location.pathname)) return;
    setVisible(true);
    onVisibleChange?.(true);
  }, [drawerOpen, location.pathname, onVisibleChange]);

  useExitIntent(trigger);

  const close = useCallback(() => {
    markDismissed();
    setVisible(false);
    onVisibleChange?.(false);
  }, [onVisibleChange]);

  // Mismo patrón de accesibilidad que LeadFormDrawer: cierre con ESC,
  // bloqueo de scroll de fondo, y foco inicial en el botón de cerrar.
  useEffect(() => {
    if (!visible) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKeyDown);
    const focusTimer = setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(focusTimer);
    };
  }, [visible, close]);

  // "Ver kits y precios" debe llevar directamente a la sección de kits,
  // no a un sitio genérico. Si la página actual ya tiene la sección de
  // kits embebida (Home, páginas de ciudad de cámaras), se hace scroll
  // ahí mismo en vez de navegar fuera — mantiene el contexto (p.ej. la
  // ciudad) en el que ya estaba la persona. Solo si no existe esa
  // sección en la página actual (p.ej. /Servicios) se navega a
  // Promociones con la pestaña de cámaras ya seleccionada.
  const goToKits = () => {
    markConverted();
    setVisible(false);
    onVisibleChange?.(false);
    const kitsSection = document.getElementById("camaras-kits");
    if (kitsSection) {
      kitsSection.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", block: "start" });
    } else {
      navigate("/Promociones?tab=camaras");
    }
  };

  const openForm = () => {
    markConverted();
    setVisible(false);
    onVisibleChange?.(false);
    openDrawer(ENTRY_KIT.title);
  };

  if (drawerOpen) return null;

  const cardTransition = shouldReduceMotion
    ? { duration: 0.15 }
    : { type: "spring", damping: 30, stiffness: 320 };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[9997] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.25 }}
            onClick={close}
            aria-hidden="true"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={cardTransition}
            className="relative w-full sm:max-w-sm rounded-3xl overflow-hidden"
            style={{
              background: "#0A1120",
              border: "1px solid rgba(229,62,62,0.28)",
              boxShadow: "0 0 0 1px rgba(229,62,62,0.12), 0 24px 64px rgba(0,0,0,0.55), 0 0 48px rgba(229,62,62,0.14)",
            }}
          >
            <button
              ref={closeBtnRef}
              onClick={close}
              aria-label="Cerrar"
              style={{
                position: "absolute", top: 14, right: 14, zIndex: 2,
                width: 34, height: 34, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#CBD5E0", cursor: "pointer",
              }}
            >
              <X size={16} />
            </button>

            <div style={{ padding: "32px 26px 26px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "rgba(229,62,62,0.12)", border: "1px solid rgba(229,62,62,0.3)",
                borderRadius: 9999, padding: "5px 14px", marginBottom: 16,
              }}>
                <Tag size={13} color="#F87171" />
                <span style={{ color: "#F87171", fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Promoción online
                </span>
              </div>

              <h2 id="exit-intent-title" style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 10px", letterSpacing: "-0.01em" }}>
                Antes de irte…
              </h2>
              <p style={{ color: "#F1F5F9", fontSize: 18, fontWeight: 800, margin: "0 0 8px", lineHeight: 1.3 }}>
                Protege tu casa o negocio desde {ENTRY_KIT.price} €
              </p>
              <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.5, margin: "0 0 18px" }}>
                Kit de {ENTRY_KIT.cameras} + grabador + instalación profesional.
              </p>
              <p style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: "0 0 24px" }}>
                Desde <strong style={{ color: "#F87171" }}>{ENTRY_KIT.price} € + IVA</strong>
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  onClick={goToKits}
                  style={{
                    background: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15,
                    borderRadius: 50, padding: "14px 0", border: "none", cursor: "pointer",
                    boxShadow: "0 0 24px rgba(229,62,62,0.35)",
                  }}
                >
                  Ver kits y precios
                </button>
                <button
                  onClick={openForm}
                  style={{
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)",
                    color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 50, padding: "13px 0",
                    cursor: "pointer",
                  }}
                >
                  Solicitar presupuesto
                </button>
                <button
                  onClick={close}
                  style={{
                    background: "transparent", border: "none",
                    color: "#64748B", fontWeight: 600, fontSize: 13, padding: "4px 0",
                    cursor: "pointer",
                  }}
                >
                  Ahora no
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
