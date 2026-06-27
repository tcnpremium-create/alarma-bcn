import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { base44 } from "@/api/api";

const PAGE_NAMES = {
  "/": "Inicio",
  "/Servicios": "Servicios",
  "/Promociones": "Promociones",
  "/SobreNosotros": "Sobre Nosotros",
  "/Blog": "Blog",
  "/Calculadora": "Calculadora de Precio",
  "/AreaClientes": "Área Clientes",
  "/AdminLeads": "Admin Leads",
  "/Badalona": "Servicios Badalona",
  "/Hospitalet": "Servicios Hospitalet",
  "/Sabadell": "Servicios Sabadell",
  "/Terrassa": "Servicios Terrassa",
  "/SantCugat": "Servicios Sant Cugat",
  "/Mataro": "Servicios Mataró",
  "/Cornella": "Servicios Cornellà",
  "/Castelldefels": "Servicios Castelldefels",
  "/Girona": "Servicios Girona",
  "/Tarragona": "Servicios Tarragona",
  "/Lleida": "Servicios Lleida",
  "/ElPrat": "Servicios El Prat",
  "/Viladecans": "Servicios Viladecans",
  "/ControlAccesos": "Control de Accesos",
  "/Videovigilancia": "Videovigilancia",
  "/MantenimientoSoporte": "Mantenimiento y Soporte",
  "/SistemasAlarma": "Sistemas de Alarma",
};

const STORAGE_KEY = "pts_tracked_phone";
const MIN_TIME_SECONDS = 5; // Only track if user stayed at least 5 seconds

export function useHubSpotTracking() {
  const location = useLocation();
  const entryTimeRef = useRef(Date.now());
  const lastPathRef = useRef(null);

  const getPhone = () => {
    try { return sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY); }
    catch { return null; }
  };

  // Track time on page when navigating away
  useEffect(() => {
    const prevPath = lastPathRef.current;
    const prevEntry = entryTimeRef.current;

    entryTimeRef.current = Date.now();
    lastPathRef.current = location.pathname;

    if (!prevPath) return; // First render, nothing to track yet

    const phone = getPhone();
    if (!phone) return;

    const timeSpentSeconds = Math.round((Date.now() - prevEntry) / 1000);
    if (timeSpentSeconds < MIN_TIME_SECONDS) return;

    // Resolve page name — check for blog articles
    let pageName = PAGE_NAMES[prevPath];
    if (!pageName && prevPath.startsWith("/Blog/")) {
      const slug = prevPath.replace("/Blog/", "").replace(/-/g, " ");
      pageName = `Artículo Blog: ${slug}`;
    }
    if (!pageName) pageName = prevPath;

    base44.functions.invoke("trackPageVisit", {
      phone,
      pageName,
      timeSpentSeconds,
      pageUrl: `https://www.premiumtechsecurity.es${prevPath}`
    }).catch(() => {}); // Silent fail — never block UX

  }, [location.pathname]);

  // Also track on page unload (tab close / refresh)
  useEffect(() => {
    const handleUnload = () => {
      const phone = getPhone();
      if (!phone) return;

      const timeSpentSeconds = Math.round((Date.now() - entryTimeRef.current) / 1000);
      if (timeSpentSeconds < MIN_TIME_SECONDS) return;

      const path = lastPathRef.current || location.pathname;
      let pageName = PAGE_NAMES[path];
      if (!pageName && path.startsWith("/Blog/")) {
        pageName = `Artículo Blog: ${path.replace("/Blog/", "").replace(/-/g, " ")}`;
      }
      if (!pageName) pageName = path;

      // Use sendBeacon for reliable delivery on unload
      const payload = JSON.stringify({ phone, pageName, timeSpentSeconds, pageUrl: `https://www.premiumtechsecurity.es${path}` });
      navigator.sendBeacon?.(`/api/functions/trackPageVisit`, payload);
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);
}

/**
 * Call this after a lead is created (form or chatbot) to register their phone
 * so future page visits are tracked in HubSpot.
 */
export function registerPhoneForTracking(phone) {
  if (!phone) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, phone);
    localStorage.setItem(STORAGE_KEY, phone);
  } catch {}
}