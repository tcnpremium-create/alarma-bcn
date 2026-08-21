import React, { createContext, useContext, useState, useCallback } from "react";

const LeadDrawerContext = createContext(null);

export function LeadDrawerProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");

  // openDrawer(service?) — service es opcional. Cuando se pasa (p.ej. desde
  // el hero de una página de servicio), el formulario lo preselecciona en
  // vez de pedírselo de nuevo al usuario.
  const openDrawer = useCallback((svc) => {
    setService(svc || "");
    setOpen(true);
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
