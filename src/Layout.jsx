import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useHubSpotTracking } from "@/components/tracking/useHubSpotTracking";
import MobileFloatingCTA from "@/components/landing/MobileFloatingCTA";
import LeadFormDrawer from "@/components/landing/LeadFormDrawer";
import ExitIntentModal from "@/components/landing/ExitIntentModal";
import { LeadDrawerProvider, useLeadDrawer } from "@/context/LeadDrawerContext";

function LayoutInner({ children }) {
  const location = useLocation();
  const { open, service, closeDrawer } = useLeadDrawer();
  const [exitIntentVisible, setExitIntentVisible] = useState(false);
  useHubSpotTracking();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const hiddenPaths = ["/AdminLeads", "/AreaClientes"];
  // Se oculta también mientras el modal de recuperación de abandono está
  // visible — dos elementos flotantes compitiendo por atención a la vez
  // no es "elegante y sutil".
  const showFloatingCTA = !hiddenPaths.includes(location.pathname) && !open && !exitIntentVisible;

  return (
    <div className="min-h-screen">
      {/* El script de AdSense se cargaba aquí sin condición alguna, en cada
          página, sin esperar consentimiento — duplicaba además el mismo
          script que había en index.html. Ahora AdSense solo se carga desde
          src/lib/consent.js cuando el usuario acepta la categoría
          "publicidad" (ver CookieBanner). El meta de verificación de
          propiedad se queda de forma estática en index.html (no ejecuta
          nada ni instala cookies por sí solo). */}
      <Helmet>
        <meta name="trustpilot-one-time-domain-verification-id" content="3d8fb58e-64e5-4be5-b46c-6a6f60c20bc4"/>
      </Helmet>
      {/* La fuente Inter se carga con preconnect + <link rel="stylesheet"> en
          el <head> de index.html. Antes se importaba aquí con @import dentro
          de un <style> que React renderiza en el <body>: el navegador solo
          descubría la petición de la fuente después de ejecutar el JS y
          montar este componente, retrasando el render del texto (LCP). */}
      <style>{`
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #a1a1a1; }
      `}</style>
      {children}
      {showFloatingCTA && <MobileFloatingCTA />}
      <LeadFormDrawer open={open} service={service} onClose={closeDrawer} />
      <ExitIntentModal onVisibleChange={setExitIntentVisible} />
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <LeadDrawerProvider>
      <LayoutInner>{children}</LayoutInner>
    </LeadDrawerProvider>
  );
}
