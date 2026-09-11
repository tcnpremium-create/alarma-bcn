import { useEffect, useState } from "react";

/**
 * Lee prefers-reduced-motion y se mantiene sincronizado si el usuario lo
 * cambia en caliente. Patrón único reutilizado por cualquier componente
 * con motion no funcional — ver auditoría de diseño, Fase 7. Antes cada
 * componente (o ninguno) decidía esto por su cuenta; ahora todos comparten
 * la misma fuente de verdad.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
