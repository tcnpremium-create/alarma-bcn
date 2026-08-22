import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from '@/App.jsx'
import '@/index.css'
import { initConsentOnLoad } from '@/lib/consent'

// Carga (o mantiene desactivados) los scripts de analítica/publicidad
// según la decisión de cookies guardada — ver src/lib/consent.js. Debe
// ejecutarse antes de renderizar para que la desactivación por defecto
// (window['ga-disable-...']) esté lista antes de cualquier otro script.
initConsentOnLoad();

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
)