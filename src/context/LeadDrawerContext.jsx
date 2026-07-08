import React, { createContext, useContext, useState, useCallback } from "react";

const LeadDrawerContext = createContext(null);

export function LeadDrawerProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  return (
    <LeadDrawerContext.Provider value={{ open, openDrawer, closeDrawer }}>
      {children}
    </LeadDrawerContext.Provider>
  );
}

export function useLeadDrawer() {
  const ctx = useContext(LeadDrawerContext);
  if (!ctx) throw new Error("useLeadDrawer must be used within a LeadDrawerProvider");
  return ctx;
}
