// NavigationTracker — tracking sin Base44
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { captureMarketingAttribution } from './leadSource';

export default function NavigationTracker() {
  const location = useLocation();

  useEffect(() => {
    // Guardar únicamente la primera campaña UTM de esta pestaña.
    // No modifica consentimientos, cookies ni conexiones existentes.
    try { captureMarketingAttribution(window.location.href, window.sessionStorage); } catch { /* optional */ }
    // Google Analytics 4 pageview
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}
