import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, ChevronDown, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import { useLeadDrawer } from '@/context/LeadDrawerContext';

const barrios = [
  {
    id: 'eixample',
    name: 'Eixample',
    risk: 'alto',
    riskScore: 88,
    robosVivienda: 1240,
    robosNegocio: 890,
    metodoPrincipal: 'Palanca en puerta (62%)',
    horarioPico: '10:00–14:00h',
    tendencia: 'estable',
    recomendacion: 'Alarma + CRA + sensores en ventanas patio interior',
    color: '#dc2626',
    tip: 'Los pisos bajos y de patio interior son los más vulnerables. Los ladrones actúan durante el día.',
  },
  {
    id: 'gracia',
    name: 'Gràcia',
    risk: 'alto',
    riskScore: 82,
    robosVivienda: 870,
    robosNegocio: 640,
    metodoPrincipal: 'Rotura de cristal (34%)',
    horarioPico: '12:00–16:00h',
    tendencia: 'subiendo',
    recomendacion: 'Alarma visible + sensor rotura cristal + CRA',
    color: '#dc2626',
    tip: 'Barrio turístico con mucho movimiento. Los robos ocurren a plena luz del día con turistas de cobertura.',
  },
  {
    id: 'nou-barris',
    name: 'Nou Barris',
    risk: 'alto',
    riskScore: 85,
    robosVivienda: 960,
    robosNegocio: 420,
    metodoPrincipal: 'Llave maestra (28%)',
    horarioPico: '20:00–22:00h',
    tendencia: 'subiendo',
    recomendacion: 'Cerradura antibumping + alarma (con CRA opcional)',
    color: '#dc2626',
    tip: 'Mayor tasa de robo relativa. Edificios más antiguos con cerraduras básicas. Escaleras sin control de acceso.',
  },
  {
    id: 'sant-marti',
    name: 'Sant Martí',
    risk: 'medio-alto',
    riskScore: 71,
    robosVivienda: 720,
    robosNegocio: 580,
    metodoPrincipal: 'Palanca en puerta (58%)',
    horarioPico: '18:00–21:00h',
    tendencia: 'estable',
    recomendacion: 'Alarma + cámara exterior + sensores acceso',
    color: '#ea580c',
    tip: 'Alta incidencia en locales comerciales y nave industrial del Poblenou. Transformación urbana atrajo nuevos riesgos.',
  },
  {
    id: 'sants',
    name: 'Sants-Montjuïc',
    risk: 'medio-alto',
    riskScore: 68,
    robosVivienda: 680,
    robosNegocio: 510,
    metodoPrincipal: 'Acceso terrazas (22%)',
    horarioPico: '14:00–18:00h',
    tendencia: 'bajando',
    recomendacion: 'Sensor movimiento exterior + cámara + alarma',
    color: '#ea580c',
    tip: 'Robos concentrados en accesos traseros y terrazas. Los almacenes tienen alta incidencia nocturna.',
  },
  {
    id: 'sant-andreu',
    name: 'Sant Andreu',
    risk: 'medio',
    riskScore: 54,
    robosVivienda: 490,
    robosNegocio: 320,
    metodoPrincipal: 'Garaje y trastero (38%)',
    horarioPico: '22:00–02:00h',
    tendencia: 'estable',
    recomendacion: 'Cámara garaje + alarma hogar + sensor trastero',
    color: '#d97706',
    tip: 'Alta incidencia en garajes comunitarios y trasteros. Las viviendas unifamiliares también son objetivo.',
  },
  {
    id: 'les-corts',
    name: 'Les Corts',
    risk: 'medio',
    riskScore: 52,
    robosVivienda: 430,
    robosNegocio: 280,
    metodoPrincipal: 'Aprovechamiento vacaciones (45%)',
    horarioPico: 'Julio-Agosto',
    tendencia: 'bajando',
    recomendacion: 'Alarma con CRA + simulador presencia en verano',
    color: '#d97706',
    tip: 'Zona universitaria: muchos pisos vacíos en verano. La temporada de robos se concentra en julio-agosto.',
  },
  {
    id: 'horta',
    name: 'Horta-Guinardó',
    risk: 'bajo-medio',
    riskScore: 41,
    robosVivienda: 310,
    robosNegocio: 180,
    metodoPrincipal: 'Viviendas unifamiliares (44%)',
    horarioPico: '16:00–20:00h',
    tendencia: 'estable',
    recomendacion: 'Alarma básica + sensor acceso principal',
    color: '#ca8a04',
    tip: 'Menor densidad y vigilancia vecinal activa. Las viviendas unifamiliares son más vulnerables que los pisos.',
  },
  {
    id: 'sarria',
    name: 'Sarrià-Sant Gervasi',
    risk: 'bajo',
    riskScore: 28,
    robosVivienda: 180,
    robosNegocio: 120,
    metodoPrincipal: 'Robo con fuerza (40%)',
    horarioPico: 'Fines de semana',
    tendencia: 'estable',
    recomendacion: 'Sistema completo por alto valor de contenido',
    color: '#16a34a',
    tip: 'Zona de alta renta con mucha seguridad privada. Aunque hay pocos robos, el valor de lo robado es alto.',
  },
  {
    id: 'pedralbes',
    name: 'Pedralbes',
    risk: 'bajo',
    riskScore: 18,
    robosVivienda: 90,
    robosNegocio: 45,
    metodoPrincipal: 'Robo en ausencia larga (55%)',
    horarioPico: 'Vacaciones',
    tendencia: 'bajando',
    recomendacion: 'Sistema premium + CRA + servicio acuda',
    color: '#16a34a',
    tip: 'Urbanizaciones cerradas con seguridad 24/7. El riesgo bajo no significa riesgo cero: el alto valor justifica protección máxima.',
  },
];

const riskConfig = {
  'alto': { label: 'Riesgo Alto', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  'medio-alto': { label: 'Riesgo Medio-Alto', bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500' },
  'medio': { label: 'Riesgo Medio', bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  'bajo-medio': { label: 'Riesgo Bajo-Medio', bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-500' },
  'bajo': { label: 'Riesgo Bajo', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Mapa de Riesgo de Robos por Barrios en Barcelona 2026',
  'description': 'Estadísticas de robos en viviendas y negocios por barrios de Barcelona. Descubre el nivel de riesgo de tu zona y qué sistema de seguridad necesitas.',
};

export default function MapaRiesgo() {
  const [selected, setSelected] = useState(null);
  const { openDrawer } = useLeadDrawer();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? barrios : barrios.filter(b => b.risk === filter || b.risk.startsWith(filter));

  const selectedBarrio = barrios.find(b => b.id === selected);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Mapa de Riesgo de Robos en Barcelona por Barrios 2026</title>
        <meta name="description" content="Guía orientativa de prevención de robos por barrios de Barcelona. Revisa accesos y medidas de seguridad y consulta el visor oficial de Mossos d Esquadra." />
        <link rel="canonical" href="https://alarmasenbarcelona.com/MapaRiesgo" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mapa de Riesgo de Robos en Barcelona por Barrios 2026" />
        <meta property="og:description" content="Guía de prevención por barrios. Las recomendaciones no son un ranking oficial de delitos: enlazamos las cifras abiertas de Mossos d Esquadra." />
        <meta property="og:url" content="https://alarmasenbarcelona.com/MapaRiesgo" />
        <meta property="og:image" content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/0a79ea220_UNETEALIMPERIO1.png" />
        <meta property="og:locale" content="es_ES" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#0A1628] to-[#1a2f4a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 font-semibold px-4 py-2 rounded-full text-sm mb-6">
              <AlertTriangle className="w-4 h-4" />
              Guía orientativa · No es una estadística oficial
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Mapa de Riesgo de Robos<br />en Barcelona por Barrios
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Consejos de prevención y seguridad para inmuebles de Barcelona. No presentamos estas orientaciones como cifras oficiales de robos ni predicciones por calle.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="bg-[#C53030] py-5">
        <div className="max-w-5xl mx-auto px-5 text-center text-white">
          <p className="text-sm sm:text-base leading-relaxed">
            Esta es una guía comercial ilustrativa, no un ranking policial de barrios.
            Para estadísticas delictivas con fuente y periodo, consulta el{" "}
            <a href="https://mossos.gencat.cat/ca/els_mossos_desquadra/indicadors_i_qualitat/dades_obertes/Visors_altres_dades/visor-de-dades/" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4">visor oficial de Mossos d'Esquadra</a>.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            { id: 'all', label: 'Todos los barrios' },
            { id: 'alto', label: '🔴 Riesgo Alto' },
            { id: 'medio', label: '🟡 Riesgo Medio' },
            { id: 'bajo', label: '🟢 Riesgo Bajo' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === f.id ? 'bg-[#0A1628] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Barrio list */}
          <div className="lg:col-span-2 space-y-3">
            {filtered.map((barrio, i) => {
              const cfg = riskConfig[barrio.risk];
              return (
                <motion.div
                  key={barrio.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(selected === barrio.id ? null : barrio.id)}
                  className={`rounded-xl border-2 cursor-pointer transition-all ${selected === barrio.id ? 'border-[#E63946] shadow-lg' : `${cfg.border} hover:border-[#E63946]/50`}`}
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${cfg.dot} flex-shrink-0`}></div>
                        <div>
                          <h2 className="font-bold text-[#0A1628] text-lg">{barrio.name}</h2>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                            {cfg.label}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="hidden sm:block text-xs text-gray-500">Orientación ilustrativa</span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${selected === barrio.id ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    <AnimatePresence>
                      {selected === barrio.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-600 mb-4">Los números de delitos, horarios y métodos no se muestran porque no están respaldados por una fuente verificable por barrio. La seguridad real requiere revisar el inmueble.</p>
                            <div className={`${cfg.bg} rounded-lg p-3 mb-3`}>
                              <div className={`text-xs font-semibold mb-1 ${cfg.text}`}>💡 Lo que debes saber</div>
                              <p className="text-gray-700 text-sm">La protección adecuada depende de los accesos, puertas y ventanas, usos del edificio y la evaluación técnica del lugar.</p>
                            </div>
                            <div className="bg-[#0A1628]/5 rounded-lg p-3">
                              <div className="text-xs font-semibold text-[#0A1628] mb-1">✅ Opción a valorar para el inmueble</div>
                              <p className="text-gray-700 text-sm">{barrio.recomendacion}</p>
                            </div>
                            <div className="mt-3 flex flex-col sm:flex-row gap-2">
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); openDrawer(`Seguridad en ${barrio.name}`); }}
                                className="flex-1 bg-[#C53030] hover:bg-[#9B2C2C] text-white font-bold text-sm rounded-lg px-4 py-3 transition-colors"
                              >
                                Presupuesto gratis para {barrio.name}
                              </button>
                              <Link
                                to="/camaras-barcelona"
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 text-center border border-[#0A1628]/20 text-[#0A1628] hover:bg-[#0A1628]/5 font-semibold text-sm rounded-lg px-4 py-3 transition-colors"
                              >
                                Ver cámaras de seguridad
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Risk legend */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-[#0A1628] mb-4 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-[#E63946]" />
                Leyenda de riesgo
              </h3>
              <div className="space-y-3">
                {Object.entries(riskConfig).map(([key, cfg]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${cfg.dot}`}></div>
                      <span className="text-sm text-gray-700">{cfg.label}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {barrios.filter(b => b.risk === key).length} barrios
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-[#0A1628] mb-3">Datos oficiales y asesoramiento</h3>
              <p className="text-sm text-gray-700 leading-relaxed">Consulta las estadísticas por territorio y periodo en el visor oficial. Estas categorías son solo ejemplos ilustrativos de prevención.</p>
              <a href="https://mossos.gencat.cat/ca/els_mossos_desquadra/indicadors_i_qualitat/dades_obertes/Visors_altres_dades/visor-de-dades/" target="_blank" rel="noopener noreferrer" className="mt-4 block font-semibold text-[#C53030] underline">Visor de Mossos d'Esquadra →</a>
              <Link to="/alarmas-barcelona" className="mt-4 block font-semibold text-[#0A1628] underline">Instalación de alarmas en Barcelona →</Link>
              <Link to="/camaras-barcelona" className="mt-3 block font-semibold text-[#0A1628] underline">Instalación de cámaras en Barcelona →</Link>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#E63946] to-[#c02e3a] rounded-2xl p-6 text-white">
              <Shield className="w-8 h-8 mb-3 opacity-80" />
              <h3 className="font-bold text-lg mb-2">¿Vives en zona de riesgo?</h3>
              <p className="text-white/80 text-sm mb-4">
                Presupuesto gratuito: analizamos tu vivienda o negocio y te recomendamos las cámaras o la alarma adecuadas para tu barrio.
              </p>
              <Button onClick={() => openDrawer("Seguridad en mi barrio")} className="w-full bg-white text-[#E63946] hover:bg-white/90 font-bold mb-2">
                Solicitar presupuesto gratis
              </Button>
              <a href="tel:+34638109947" className="block text-center text-white/80 hover:text-white text-sm font-semibold mt-2">
                📞 638 10 99 47
              </a>
            </div>
          </div>
        </div>

        {/* How alarms reduce theft */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#0A1628] rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">¿Cómo reduce una alarma el riesgo de robo?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🚨', stat: '73%', label: 'de ladrones desisten al ver cartel de alarma visible', desc: 'El efecto disuasorio es el mayor beneficio. Un ladrón elige siempre la casa más fácil.' },
              { icon: '⚡', stat: 'CRA', label: 'conexión opcional a central receptora', desc: 'Con una central receptora contratada, la alarma se vigila las 24 horas y se puede avisar a la Policía.' },
              { icon: '📱', stat: '3 seg', label: 'para recibir alerta en tu móvil', desc: 'Las alarmas modernas como AJAX notifican instantáneamente aunque estés al otro lado del mundo.' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-6">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-4xl font-bold text-[#E63946] mb-2">{item.stat}</div>
                <div className="text-white font-semibold mb-2 text-sm">{item.label}</div>
                <p className="text-white/60 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <FooterSection />
    </div>
  );
}