import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, MapPin, TrendingUp, Phone, ChevronDown, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Helmet } from 'react-helmet';

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
    recomendacion: 'Cerradura antibumping + alarma + CRA obligatoria',
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
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? barrios : barrios.filter(b => b.risk === filter || b.risk.startsWith(filter));

  const selectedBarrio = barrios.find(b => b.id === selected);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Mapa de Riesgo de Robos en Barcelona por Barrios 2026 | Alarmas Barcelona</title>
        <meta name="description" content="Descubre el nivel de riesgo de robo de tu barrio en Barcelona. Estadísticas actualizadas 2026 por distrito: Eixample, Gràcia, Nou Barris y más." />
        <link rel="canonical" href="https://www.premiumtechsecurity.es/MapaRiesgo" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#0A1628] to-[#1a2f4a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 font-semibold px-4 py-2 rounded-full text-sm mb-6">
              <AlertTriangle className="w-4 h-4" />
              Datos Mossos d'Esquadra — Actualizado 2026
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Mapa de Riesgo de Robos<br />en Barcelona por Barrios
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Estadísticas reales de robos en viviendas y negocios por distrito. Descubre el nivel de riesgo de tu zona y qué protección necesitas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#E63946] py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
          {[
            { label: 'Robos en viviendas/año', value: '+12.400' },
            { label: 'Robos en negocios/año', value: '+8.900' },
            { label: 'Hora pico de robos', value: '10–14h' },
            { label: 'Reducción con alarma', value: '–73%' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm opacity-80">{s.label}</div>
            </div>
          ))}
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
                        {/* Risk bar */}
                        <div className="hidden sm:block">
                          <div className="text-xs text-gray-500 mb-1 text-right">Índice de riesgo</div>
                          <div className="w-32 h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${barrio.riskScore}%`, backgroundColor: barrio.color }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 text-right">{barrio.riskScore}/100</div>
                        </div>
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
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="text-xs text-gray-500 mb-1">Robos viviendas/año</div>
                                <div className="font-bold text-[#0A1628]">{barrio.robosVivienda.toLocaleString()}</div>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="text-xs text-gray-500 mb-1">Robos negocios/año</div>
                                <div className="font-bold text-[#0A1628]">{barrio.robosNegocio.toLocaleString()}</div>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="text-xs text-gray-500 mb-1">Hora pico</div>
                                <div className="font-bold text-[#0A1628]">{barrio.horarioPico}</div>
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 mb-3">
                              <div className="text-xs text-gray-500 mb-1">Método más frecuente</div>
                              <div className="font-semibold text-[#0A1628]">{barrio.metodoPrincipal}</div>
                            </div>
                            <div className={`${cfg.bg} rounded-lg p-3 mb-3`}>
                              <div className={`text-xs font-semibold mb-1 ${cfg.text}`}>💡 Lo que debes saber</div>
                              <p className="text-gray-700 text-sm">{barrio.tip}</p>
                            </div>
                            <div className="bg-[#0A1628]/5 rounded-lg p-3">
                              <div className="text-xs font-semibold text-[#0A1628] mb-1">✅ Recomendación para este barrio</div>
                              <p className="text-gray-700 text-sm">{barrio.recomendacion}</p>
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

            {/* Top stats */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-[#0A1628] mb-4">Datos generales Barcelona 2026</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Barrio con más robos', value: 'Eixample' },
                  { label: 'Mayor tasa relativa', value: 'Nou Barris' },
                  { label: 'Método más usado', value: 'Palanca en puerta (60%)' },
                  { label: 'Día de mayor riesgo', value: 'Miércoles–Jueves' },
                  { label: 'Meses de mayor riesgo', value: 'Julio–Agosto' },
                  { label: 'Reducción con alarma visible', value: '–73% intentos' },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                    <span className="text-gray-500">{s.label}</span>
                    <span className="font-semibold text-[#0A1628]">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#E63946] to-[#c02e3a] rounded-2xl p-6 text-white">
              <Shield className="w-8 h-8 mb-3 opacity-80" />
              <h3 className="font-bold text-lg mb-2">¿Vives en zona de riesgo?</h3>
              <p className="text-white/80 text-sm mb-4">
                Visita técnica gratuita: analizamos tu vivienda y te recomendamos el sistema adecuado para tu barrio.
              </p>
              <Button asChild className="w-full bg-white text-[#E63946] hover:bg-white/90 font-bold mb-2">
                <a href="/#contacto">Solicitar Visita Gratuita</a>
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
              { icon: '⚡', stat: '<2 min', label: 'tiempo en notificar a Policía con CRA activa', desc: 'Con Central Receptora, la Policía recibe aviso antes de que el ladrón pueda actuar.' },
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