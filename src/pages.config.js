/**
 * pages.config.js - Page routing configuration
 *
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 *
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 *
 * Example file structure:
 *
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 *
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 *
 * PERFORMANCE NOTE: every page below except "Home" (the landing page, kept
 * eager so the first paint has no extra network round-trip) is loaded with
 * React.lazy so each route ships only its own JS instead of one bundle with
 * all 30 pages. Requires the <Routes> that render these to be wrapped in a
 * <Suspense> boundary (already done in App.jsx).
 */
import { lazy } from 'react';
import Home from './pages/Home';
import __Layout from './Layout.jsx';

const AdminLeads = lazy(() => import('./pages/AdminLeads'));
const AreaClientes = lazy(() => import('./pages/AreaClientes'));
const AvisoLegal = lazy(() => import('./pages/AvisoLegal'));
const Badalona = lazy(() => import('./pages/Badalona'));
const BarrioEixample = lazy(() => import('./pages/BarrioEixample'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const Calculadora = lazy(() => import('./pages/Calculadora'));
const Castelldefels = lazy(() => import('./pages/Castelldefels'));
const ControlAccesos = lazy(() => import('./pages/ControlAccesos'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Cornella = lazy(() => import('./pages/Cornella'));
const ElPrat = lazy(() => import('./pages/ElPrat'));
const Girona = lazy(() => import('./pages/Girona'));
const Hospitalet = lazy(() => import('./pages/Hospitalet'));
const Lleida = lazy(() => import('./pages/Lleida'));
const MantenimientoSoporte = lazy(() => import('./pages/MantenimientoSoporte'));
const Mataro = lazy(() => import('./pages/Mataro'));
const Privacidad = lazy(() => import('./pages/Privacidad'));
const Promociones = lazy(() => import('./pages/Promociones'));
const Sabadell = lazy(() => import('./pages/Sabadell'));
const SantCugat = lazy(() => import('./pages/SantCugat'));
const Servicios = lazy(() => import('./pages/Servicios'));
const SistemasAlarma = lazy(() => import('./pages/SistemasAlarma'));
const SobreNosotros = lazy(() => import('./pages/SobreNosotros'));
const Tarragona = lazy(() => import('./pages/Tarragona'));
const Terrassa = lazy(() => import('./pages/Terrassa'));
const Videovigilancia = lazy(() => import('./pages/Videovigilancia'));
const Viladecans = lazy(() => import('./pages/Viladecans'));


export const PAGES = {
    "AdminLeads": AdminLeads,
    "AreaClientes": AreaClientes,
    "AvisoLegal": AvisoLegal,
    "Badalona": Badalona,
    "BarrioEixample": BarrioEixample,
    "Blog": Blog,
    "BlogArticle": BlogArticle,
    "Calculadora": Calculadora,
    "Castelldefels": Castelldefels,
    "ControlAccesos": ControlAccesos,
    "Cookies": Cookies,
    "Cornella": Cornella,
    "ElPrat": ElPrat,
    "Girona": Girona,
    "Home": Home,
    "Hospitalet": Hospitalet,
    "Lleida": Lleida,
    "MantenimientoSoporte": MantenimientoSoporte,
    "Mataro": Mataro,
    "Privacidad": Privacidad,
    "Promociones": Promociones,
    "Sabadell": Sabadell,
    "SantCugat": SantCugat,
    "Servicios": Servicios,
    "SistemasAlarma": SistemasAlarma,
    "SobreNosotros": SobreNosotros,
    "Tarragona": Tarragona,
    "Terrassa": Terrassa,
    "Videovigilancia": Videovigilancia,
    "Viladecans": Viladecans,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
