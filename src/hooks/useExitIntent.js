import { useEffect, useRef } from "react";
import { canShowExitIntent } from "@/lib/exitIntent";

// No se dispara en los primeros segundos de visita — evita mostrarlo
// "inmediatamente al entrar" tal y como se pidió explícitamente.
const MIN_ENGAGED_MS = 12000;
// Señal de respaldo en móvil: inactividad prolongada tras haber
// interactuado con la página al menos una vez (scroll o toque). No se
// intercepta el botón "atrás" del navegador — replicaría el patrón
// intrusivo de bloquear la navegación nativa que se pidió evitar.
const MOBILE_INACTIVITY_MS = 45000;

/**
 * useExitIntent(onTrigger)
 *
 * Detecta una intención real de abandono y llama a onTrigger() como
 * máximo una vez por sesión (el resto de control de "ya se mostró /
 * cerró / convirtió" vive en src/lib/exitIntent.js, no aquí — este hook
 * solo decide CUÁNDO hay una señal real de abandono).
 *
 * Desktop: el cursor sale del viewport por la zona superior (hacia la
 * barra del navegador) — la técnica estándar de exit-intent, la única
 * fiable sin cursor en juego.
 *
 * Móvil/tablet (sin cursor): no se replica el comportamiento de
 * escritorio. Señales usadas:
 *  - la pestaña/app pasa a segundo plano (visibilitychange → hidden)
 *    después de que la persona ya haya interactuado con la página.
 *  - inactividad prolongada tras una interacción real (scroll o toque),
 *    nunca en una página que se acaba de abrir y no se ha tocado.
 */
export function useExitIntent(onTrigger) {
  const firedRef = useRef(false);
  const mountedAtRef = useRef(Date.now());
  const engagedRef = useRef(false);
  const inactivityTimerRef = useRef(null);
  const onTriggerRef = useRef(onTrigger);
  onTriggerRef.current = onTrigger;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const isCoarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;

    function tryTrigger() {
      if (firedRef.current) return;
      if (Date.now() - mountedAtRef.current < MIN_ENGAGED_MS) return;
      if (!canShowExitIntent()) return;
      firedRef.current = true;
      onTriggerRef.current?.();
    }

    // Desktop: mouseout con clientY <= 0 y sin relatedTarget = el cursor
    // sale del documento por arriba (hacia pestañas/barra de dirección).
    function handleMouseOut(e) {
      if (isCoarsePointer) return;
      if (e.clientY <= 0 && !e.relatedTarget) tryTrigger();
    }

    function markEngaged() {
      engagedRef.current = true;
      resetInactivityTimer();
    }

    function resetInactivityTimer() {
      if (!isCoarsePointer) return;
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        if (engagedRef.current) tryTrigger();
      }, MOBILE_INACTIVITY_MS);
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden" && engagedRef.current) tryTrigger();
    }

    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (isCoarsePointer) {
      window.addEventListener("scroll", markEngaged, { passive: true });
      window.addEventListener("touchstart", markEngaged, { passive: true });
    }

    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", markEngaged);
      window.removeEventListener("touchstart", markEngaged);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);
}
