import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import CookieBanner from '@/components/CookieBanner';

// Code-split: each route ships only its own JS instead of one bundle with
// every page. Same <Suspense> fallback spinner already used below for the
// auth-loading state, so there's no new visual element.
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const ComparativaAlarmas = lazy(() => import('./pages/ComparativaAlarmas'));
const MapaRiesgo = lazy(() => import('./pages/MapaRiesgo'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const GuiaSeguridadBarcelona = lazy(() => import('./pages/GuiaSeguridadBarcelona'));
const AlarmasBarcelona = lazy(() => import('./pages/AlarmasBarcelona'));
const AlarmasGirona = lazy(() => import('./pages/AlarmasGirona'));
const AlarmasTarragona = lazy(() => import('./pages/AlarmasTarragona'));
const AlarmasLleida = lazy(() => import('./pages/AlarmasLleida'));
const AlarmasSabadell = lazy(() => import('./pages/AlarmasSabadell'));
const TecnologiaGuia = lazy(() => import('./pages/TecnologiaGuia'));
const CamarasBarcelona = lazy(() => import('./pages/CamarasBarcelona'));
const CamarasSabadell = lazy(() => import('./pages/CamarasSabadell'));
const CamarasGirona = lazy(() => import('./pages/CamarasGirona'));
const CamarasTarragona = lazy(() => import('./pages/CamarasTarragona'));
const CamarasLleida = lazy(() => import('./pages/CamarasLleida'));
const Videoporteros = lazy(() => import('./pages/Videoporteros'));
const SistemasAlarma = lazy(() => import('./pages/SistemasAlarma'));
const ControlAccesos = lazy(() => import('./pages/ControlAccesos'));
const Sonorizacion = lazy(() => import('./pages/Sonorizacion'));
const RedesInformaticas = lazy(() => import('./pages/RedesInformaticas'));
const Cerraduras = lazy(() => import('./pages/Cerraduras'));

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Suspense fallback={
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    }>
      <Routes>
        <Route path="/" element={
          <LayoutWrapper currentPageName={mainPageKey}>
            <MainPage />
          </LayoutWrapper>
        } />
        {Object.entries(Pages).map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <LayoutWrapper currentPageName={path}>
                <Page />
              </LayoutWrapper>
            }
          />
        ))}
        <Route path="/BlogArticle/:slug" element={<LayoutWrapper currentPageName="BlogArticle"><BlogArticle /></LayoutWrapper>} />
        <Route path="/ComparativaAlarmas" element={<LayoutWrapper currentPageName="ComparativaAlarmas"><ComparativaAlarmas /></LayoutWrapper>} />
        <Route path="/MapaRiesgo" element={<LayoutWrapper currentPageName="MapaRiesgo"><MapaRiesgo /></LayoutWrapper>} />
        <Route path="/About" element={<LayoutWrapper currentPageName="About"><About /></LayoutWrapper>} />
        <Route path="/Contact" element={<LayoutWrapper currentPageName="Contact"><Contact /></LayoutWrapper>} />
        <Route path="/GuiaSeguridadBarcelona" element={<LayoutWrapper currentPageName="GuiaSeguridadBarcelona"><GuiaSeguridadBarcelona /></LayoutWrapper>} />
        <Route path="/alarmas-barcelona" element={<LayoutWrapper currentPageName="AlarmasBarcelona"><AlarmasBarcelona /></LayoutWrapper>} />
        <Route path="/alarmas-girona" element={<LayoutWrapper currentPageName="AlarmasGirona"><AlarmasGirona /></LayoutWrapper>} />
        <Route path="/alarmas-tarragona" element={<LayoutWrapper currentPageName="AlarmasTarragona"><AlarmasTarragona /></LayoutWrapper>} />
        <Route path="/alarmas-lleida" element={<LayoutWrapper currentPageName="AlarmasLleida"><AlarmasLleida /></LayoutWrapper>} />
        <Route path="/alarmas-sabadell" element={<LayoutWrapper currentPageName="AlarmasSabadell"><AlarmasSabadell /></LayoutWrapper>} />
        <Route path="/tecnologia" element={<LayoutWrapper currentPageName="TecnologiaGuia"><TecnologiaGuia /></LayoutWrapper>} />
        <Route path="/camaras-barcelona" element={<LayoutWrapper currentPageName="CamarasBarcelona"><CamarasBarcelona /></LayoutWrapper>} />
        <Route path="/camaras-sabadell" element={<LayoutWrapper currentPageName="CamarasSabadell"><CamarasSabadell /></LayoutWrapper>} />
        <Route path="/camaras-girona" element={<LayoutWrapper currentPageName="CamarasGirona"><CamarasGirona /></LayoutWrapper>} />
        <Route path="/camaras-tarragona" element={<LayoutWrapper currentPageName="CamarasTarragona"><CamarasTarragona /></LayoutWrapper>} />
        <Route path="/camaras-lleida" element={<LayoutWrapper currentPageName="CamarasLleida"><CamarasLleida /></LayoutWrapper>} />
        <Route path="/videoporteros" element={<LayoutWrapper currentPageName="Videoporteros"><Videoporteros /></LayoutWrapper>} />
        {/* Kebab-case aliases — misma página, canónica en la URL PascalCase hasta migración completa */}
        <Route path="/sistemas-alarma" element={<LayoutWrapper currentPageName="SistemasAlarma"><SistemasAlarma /></LayoutWrapper>} />
        <Route path="/control-accesos" element={<LayoutWrapper currentPageName="ControlAccesos"><ControlAccesos /></LayoutWrapper>} />
        <Route path="/sonorizacion" element={<LayoutWrapper currentPageName="Sonorizacion"><Sonorizacion /></LayoutWrapper>} />
        <Route path="/redes-informaticas" element={<LayoutWrapper currentPageName="RedesInformaticas"><RedesInformaticas /></LayoutWrapper>} />
        <Route path="/cerraduras" element={<LayoutWrapper currentPageName="Cerraduras"><Cerraduras /></LayoutWrapper>} />
        {/* Redirects: rutas descontinuadas de SEO/campañas que apuntaban a la página de mantenimiento */}
        <Route path="/sin-cuotas-mensuales" element={<Navigate to="/alarmas-barcelona" replace />} />
        <Route path="/comparativa-verisure" element={<Navigate to="/alarmas-barcelona" replace />} />
        <Route path="/alarmas-sin-permanencia" element={<Navigate to="/alarmas-barcelona" replace />} />
        {/* Redirect: Videovigilancia se fusionó con Cámaras de Seguridad para evitar contenido duplicado (misma intención de búsqueda) */}
        <Route path="/videovigilancia" element={<Navigate to="/camaras-barcelona" replace />} />
        <Route path="/Videovigilancia" element={<Navigate to="/camaras-barcelona" replace />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
        <CookieBanner />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App