import React, { createContext, useContext, useState, useCallback } from "react";
import { markConverted as markExitIntentConverted } from "@/lib/exitIntent";

const LeadDrawerContext = createContext(null);

export function LeadDrawerProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");

  // openDrawer(service?) — service es opcional. Cuando se pasa (p.ej. desde
  // el hero de una página de servicio), el formulario lo preselecciona en
  // vez de pedírselo de nuevo al usuario.
  //
  // Guarda defensiva: si openDrawer se pasa directamente como onClick (en
  // vez de onClick={() => openDrawer()}), React invoca la función con el
  // SyntheticEvent del click como primer argumento. Sin esta comprobación
  // ese evento se guardaba como "service" y LeadCaptureForm intentaba
  // renderizarlo como texto, lo que hacía crashear todo el árbol de React
  // (pantalla en blanco) en cuanto se abría el formulario. Solo se acepta
  // un string; cualquier otra cosa se descarta igual que si no se hubiera
  // pasado nada.
  const openDrawer = useCallback((svc) => {
    setService(typeof svc === "string" ? svc : "");
    setOpen(true);
    // La persona ya entró en el flujo de presupuesto — el modal de
    // "antes de irte" no debe competir con un formulario que ya está en
    // marcha (ni volver a aparecer más tarde en la misma sesión).
    markExitIntentConverted();
  }, []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  return (
    <LeadDrawerContext.Provider value={{ open, service, openDrawer, closeDrawer }}>
      {children}
    </LeadDrawerContext.Provider>
  );
}

export function useLeadDrawer() {
  const ctx = useContext(LeadDrawerContext);
  if (!ctx) throw new Error("useLeadDrawer must be used within a LeadDrawerProvider");
  return ctx;
}
