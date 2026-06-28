import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogArticle from './pages/BlogArticle';
import ComparativaAlarmas from './pages/ComparativaAlarmas';
import MapaRiesgo from './pages/MapaRiesgo';
import About from './pages/About';
import Contact from './pages/Contact';
import GuiaSeguridadBarcelona from './pages/GuiaSeguridadBarcelona';
import AlarmasBarcelona from './pages/AlarmasBarcelona';
import AlarmasGirona from './pages/AlarmasGirona';
import AlarmasTarragona from './pages/AlarmasTarragona';
import AlarmasLleida from './pages/AlarmasLleida';
import AlarmasSabadell from './pages/AlarmasSabadell';
import TecnologiaGuia from './pages/TecnologiaGuia';
import CamarasBarcelona from './pages/CamarasBarcelona';
import CamarasSabadell from './pages/CamarasSabadell';
import CamarasGirona from './pages/CamarasGirona';
import CamarasTarragona from './pages/CamarasTarragona';
import CamarasLleida from './pages/CamarasLleida';
import Videoporteros from './pages/Videoporteros';
import SistemasAlarma from './pages/SistemasAlarma';
import Videovigilancia from './pages/Videovigilancia';
import ControlAccesos from './pages/ControlAccesos';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

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
      <Route path="/videovigilancia" element={<LayoutWrapper currentPageName="Videovigilancia"><Videovigilancia /></LayoutWrapper>} />
      <Route path="/control-accesos" element={<LayoutWrapper currentPageName="ControlAccesos"><ControlAccesos /></LayoutWrapper>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
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
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App