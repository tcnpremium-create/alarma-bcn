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
 */
import AdminLeads from './pages/AdminLeads';
import AreaClientes from './pages/AreaClientes';
import AvisoLegal from './pages/AvisoLegal';
import Badalona from './pages/Badalona';
import BarrioEixample from './pages/BarrioEixample';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import Calculadora from './pages/Calculadora';
import Castelldefels from './pages/Castelldefels';
import ControlAccesos from './pages/ControlAccesos';
import Cookies from './pages/Cookies';
import Cornella from './pages/Cornella';
import ElPrat from './pages/ElPrat';
import Girona from './pages/Girona';
import Home from './pages/Home';
import Hospitalet from './pages/Hospitalet';
import Lleida from './pages/Lleida';
import MantenimientoSoporte from './pages/MantenimientoSoporte';
import Mataro from './pages/Mataro';
import Privacidad from './pages/Privacidad';
import Promociones from './pages/Promociones';
import Sabadell from './pages/Sabadell';
import SantCugat from './pages/SantCugat';
import Servicios from './pages/Servicios';
import SistemasAlarma from './pages/SistemasAlarma';
import SobreNosotros from './pages/SobreNosotros';
import Tarragona from './pages/Tarragona';
import Terrassa from './pages/Terrassa';
import Videovigilancia from './pages/Videovigilancia';
import Viladecans from './pages/Viladecans';
import __Layout from './Layout.jsx';


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