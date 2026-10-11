import { useEffect, useRef } from "react";
import { trackEvent } from "./analytics";

/**
 * Eventos de un formulario: form_open, form_start, form_submit, form_success, form_error.
 *  - open: "mount" (modales/cajones: se abren al montarse) o "visible" (formularios en página:
 *    cuando se ve al menos el 40% del formulario). Usar `ref` en el elemento del formulario.
 *  - start: se llama la primera vez que el usuario toca un campo.
 */
export function useFormTracking(formName, { open = "mount", context = {} } = {}) {
  const ref = useRef(null);
  const opened = useRef(false);
  const started = useRef(false);
  const base = useRef({ form_name: formName, ...context });
  base.current = { form_name: formName, ...context };

  useEffect(() => {
    const fire = () => {
      if (opened.current) return;
      opened.current = true;
      trackEvent("form_open", base.current);
    };
    if (open === "mount") { fire(); return undefined; }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { fire(); return undefined; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { fire(); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [open]);

  return {
    ref,
    onStart: () => {
      if (started.current) return;
      started.current = true;
      trackEvent("form_start", base.current);
    },
    onSubmit: () => trackEvent("form_submit", base.current),
    onSuccess: (result) => trackEvent("form_success", { ...base.current, notification: result?.notification, duplicate: result?.duplicate }),
    onError: (err) => trackEvent("form_error", { ...base.current, error_kind: err?.kind || "unknown" }),
  };
}
