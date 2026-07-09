import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useHubSpotTracking } from "@/components/tracking/useHubSpotTracking";
import MobileFloatingCTA from "@/components/landing/MobileFloatingCTA";
import LeadFormDrawer from "@/components/landing/LeadFormDrawer";
import { LeadDrawerProvider, useLeadDrawer } from "@/context/LeadDrawerContext";

function LayoutInner({ children }) {
  const location = useLocation();
  const { open, closeDrawer } = useLeadDrawer();
  useHubSpotTracking();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const hiddenPaths = ["/AdminLeads", "/AreaClientes"];
  const showFloatingCTA = !hiddenPaths.includes(location.pathname) && !open;

  return (
    <div className="min-h-screen">
      <Helmet>
        <meta name="trustpilot-one-time-domain-verification-id" content="3d8fb58e-64e5-4be5-b46c-6a6f60c20bc4"/>
        <meta name="google-adsense-account" content="ca-pub-9051549124466549"/>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9051549124466549" crossorigin="anonymous"></script>
      </Helmet>
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
      <LeadFormDrawer open={open} onClose={closeDrawer} />
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
