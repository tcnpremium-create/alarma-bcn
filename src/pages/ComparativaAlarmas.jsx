import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star, Phone, ArrowRight, Shield, Wifi, Battery, Smartphone, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';

const brands = [
  {
    id: 'ajax',
    name: 'AJAX Systems',
    subtitle: 'La mejor del mercado',
    highlight: true,
    badge: '⭐ Recomendado',
    price: '900–1.200€',
    monthly: '0€ (CRA opcional 30€)',
    rating: 4.9,
    technology: 'Inalámbrico 868MHz',
    app: 4.8,
    installTime: '2–3 horas',
    warranty: '3 años',
    ownership: true,
    contract: 'Sin permanencia',
    features: {
      'App móvil': true,
      'Sin obras': true,
      'Batería 7 años': true,
      'Anti-jamming': true,
      'Inmunidad mascotas': true,
      'CRA opcional': true,
      'Doble comunicación (4G + Ethernet)': true,
      'Verificación visual (MotionCam)': true,
      'Control multi-propiedad': true,
      'Integración con cámaras': true,
    },
    pros: [
      'App valorada 4.8/5 — la más intuitiva',
      'Detección de hackeo y jamming',
      'Sensores con batería de 7 años',
      'El equipo es tuyo desde día 1',
      'Sin permanencias ni contratos',
    ],
    cons: [
      'Precio ligeramente superior a Hikvision',
      'Solo inalámbrico (no ideal para obra nueva)',
    ],
    color: '#E63946',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
  },
  {
    id: 'hikvision',
    name: 'Hikvision AX Pro',
    subtitle: 'Mejor relación calidad-precio',
    highlight: false,
    badge: '💰 Mejor precio',
    price: '700–950€',
    monthly: '0€ (CRA opcional 28€)',
    rating: 4.5,
    technology: 'Inalámbrico + IP',
    app: 4.2,
    installTime: '2–4 horas',
    warranty: '2 años',
    ownership: true,
    contract: 'Sin permanencia',
    features: {
      'App móvil': true,
      'Sin obras': true,
      'Batería 7 años': false,
      'Anti-jamming': true,
      'Inmunidad mascotas': true,
      'CRA opcional': true,
      'Doble comunicación (4G + Ethernet)': true,
      'Verificación visual (MotionCam)': false,
      'Control multi-propiedad': true,
      'Integración con cámaras': true,
    },
    pros: [
      '15–20% más económico que AJAX',
      'Integración nativa con cámaras Hikvision',
      'Soporte híbrido cableado + inalámbrico',
      'Excelente para instalaciones con CCTV',
    ],
    cons: [
      'App algo menos intuitiva que AJAX',
      'No incluye verificación fotográfica nativa',
    ],
    color: '#2563eb',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80',
  },
  {
    id: 'verisure',
    name: 'Verisure',
    subtitle: 'Grande cadena con contrato',
    highlight: false,
    badge: '⚠️ Contrato largo',
    price: '0–300€',
    monthly: '40–60€/mes obligatorio',
    rating: 3.2,
    technology: 'Inalámbrico propietario',
    app: 4.1,
    installTime: '3–5 horas',
    warranty: 'Mientras pagues cuota',
    ownership: false,
    contract: '36 meses permanencia',
    features: {
      'App móvil': true,
      'Sin obras': true,
      'Batería 7 años': false,
      'Anti-jamming': true,
      'Inmunidad mascotas': true,
      'CRA opcional': false,
      'Doble comunicación (4G + Ethernet)': true,
      'Verificación visual (MotionCam)': true,
      'Control multi-propiedad': false,
      'Integración con cámaras': true,
    },
    pros: [
      'CRA propia muy reconocida',
      'Instalación con coste inicial bajo',
      'Verificación visual avanzada',
    ],
    cons: [
      '⚠️ El equipo NO es tuyo',
      '⚠️ Permanencia de 36 meses',
      '⚠️ Penalización alta por baja anticipada',
      'Cuota mensual obligatoria siempre',
      'Precio total a 3 años: 1.440–2.160€ sin equipo',
    ],
    color: '#6b7280',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  },
  {
    id: 'paradox',
    name: 'Paradox',
    subtitle: 'Fiabilidad profesional',
    highlight: false,
    badge: '🔧 Para obra nueva',
    price: '600–900€',
    monthly: '0€ (CRA opcional)',
    rating: 4.3,
    technology: 'Híbrido cable + inalámbrico',
    app: 3.8,
    installTime: '4–8 horas',
    warranty: '2 años',
    ownership: true,
    contract: 'Sin permanencia',
    features: {
      'App móvil': true,
      'Sin obras': false,
      'Batería 7 años': false,
      'Anti-jamming': true,
      'Inmunidad mascotas': true,
      'CRA opcional': true,
      'Doble comunicación (4G + Ethernet)': true,
      'Verificación visual (MotionCam)': false,
      'Control multi-propiedad': false,
      'Integración con cámaras': true,
    },
    pros: [
      'Marca canadiense con 40 años de trayectoria',
      'Muy fiable en instalaciones cableadas',
      'Ideal para obra nueva o gran reforma',
      'Instaladores muy experimentados',
    ],
    cons: [
      'Requiere obras para instalación óptima',
      'App básica comparada con AJAX',
      'Configuración más técnica',
    ],
    color: '#0A1628',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
  },
];

const features = [
  'App móvil',
  'Sin obras',
  'Batería 7 años',
  'Anti-jamming',
  'Inmunidad mascotas',
  'CRA opcional',
  'Doble comunicación (4G + Ethernet)',
  'Verificación visual (MotionCam)',
  'Control multi-propiedad',
  'Integración con cámaras',
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Comparativa de Alarmas en Barcelona 2026',
  'description': 'Tabla comparativa completa de los mejores sistemas de alarma disponibles en Barcelona: AJAX, Hikvision, Verisure y Paradox.',
  'author': { '@type': 'Organization', 'name': 'Premium Tech Security' },
};

export default function ComparativaAlarmas() {
  const [view, setView] = useState('cards');

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Comparativa de Alarmas en Barcelona 2026 | Premium Tech Security</title>
        <meta name="description" content="Compara AJAX, Hikvision, Verisure y Paradox: precios, características, app y contratos. Elige la mejor alarma para tu hogar o negocio en Barcelona." />
        <link rel="canonical" href="https://www.premiumtechsecurity.es/ComparativaAlarmas" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#0A1628] to-[#1a2f4a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-[#E63946]/20 text-[#E63946] font-semibold px-4 py-2 rounded-full text-sm mb-6">
              Actualizado Marzo 2026
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Comparativa de Alarmas<br />en Barcelona 2026
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Comparamos las principales marcas con datos reales: precios, contratos, app, tecnología y qué incluye cada una.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setView('cards')}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${view === 'cards' ? 'bg-[#E63946] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                Vista por tarjetas
              </button>
              <button
                onClick={() => setView('table')}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${view === 'table' ? 'bg-[#E63946] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                Tabla comparativa
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Summary bar */}
      <div className="bg-amber-50 border-b border-amber-200 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap gap-4 items-center justify-center text-sm text-amber-800">
          <Shield className="w-4 h-4 flex-shrink-0" />
          <span><strong>Consejo clave:</strong> Con grandes cadenas (Verisure, Securitas) el equipo NO es tuyo. Al cancelar, se lo llevan. Con instaladores locales + AJAX, el equipo es tuyo para siempre sin permanencias.</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {view === 'cards' ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border-2 overflow-hidden ${brand.highlight ? 'border-[#E63946] shadow-xl shadow-[#E63946]/10' : 'border-gray-200'}`}
              >
                {brand.highlight && (
                  <div className="bg-[#E63946] text-white text-center py-2 text-sm font-bold">
                    ⭐ MEJOR OPCIÓN EN BARCELONA
                  </div>
                )}
                <div className="p-6">
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600 mb-4">
                    {brand.badge}
                  </span>
                  <h2 className="text-2xl font-bold text-[#0A1628] mb-1">{brand.name}</h2>
                  <p className="text-gray-500 text-sm mb-4">{brand.subtitle}</p>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < Math.floor(brand.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">{brand.rating}/5</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Instalación:</span>
                      <span className="font-bold text-[#0A1628]">{brand.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Mensual:</span>
                      <span className="font-bold text-[#0A1628]">{brand.monthly}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Permanencia:</span>
                      <span className={`font-bold ${brand.ownership ? 'text-green-600' : 'text-red-600'}`}>{brand.contract}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">¿Equipo tuyo?</span>
                      {brand.ownership ? (
                        <span className="font-bold text-green-600 flex items-center gap-1"><Check className="w-4 h-4" /> Sí</span>
                      ) : (
                        <span className="font-bold text-red-600 flex items-center gap-1"><X className="w-4 h-4" /> No</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Ventajas</p>
                    {brand.pros.slice(0, 3).map((p, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm">
                        <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{p}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Limitaciones</p>
                    {brand.cons.slice(0, 2).map((c, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm">
                        <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{c}</span>
                      </div>
                    ))}
                  </div>

                  {brand.highlight && (
                    <Button asChild className="w-full bg-[#E63946] hover:bg-[#d32f3c] text-white">
                      <a href="/#contacto">Pedir Presupuesto <ArrowRight className="w-4 h-4 ml-1" /></a>
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#0A1628] text-white">
                  <th className="p-4 text-left">Característica</th>
                  {brands.map(b => (
                    <th key={b.id} className={`p-4 text-center ${b.highlight ? 'bg-[#E63946]' : ''}`}>
                      {b.name}
                      {b.highlight && <div className="text-xs font-normal opacity-80">⭐ Recomendado</div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="p-4 font-semibold text-gray-700">Precio instalación</td>
                  {brands.map(b => <td key={b.id} className="p-4 text-center font-bold">{b.price}</td>)}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-700">Cuota mensual</td>
                  {brands.map(b => <td key={b.id} className="p-4 text-center">{b.monthly}</td>)}
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-semibold text-gray-700">Permanencia</td>
                  {brands.map(b => (
                    <td key={b.id} className={`p-4 text-center font-semibold ${b.ownership ? 'text-green-600' : 'text-red-600'}`}>
                      {b.contract}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-700">¿Equipo es tuyo?</td>
                  {brands.map(b => (
                    <td key={b.id} className="p-4 text-center">
                      {b.ownership ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-semibold text-gray-700">Valoración app</td>
                  {brands.map(b => (
                    <td key={b.id} className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{b.app}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                {features.map((feature, i) => (
                  <tr key={feature} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                    <td className="p-4 text-gray-700">{feature}</td>
                    {brands.map(b => (
                      <td key={b.id} className="p-4 text-center">
                        {b.features[feature] ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Cost calculator box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-[#0A1628] to-[#1a2f4a] rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Coste total a 5 años: la comparativa real</h2>
              <p className="text-white/70 mb-6">
                Muchas alarmas parecen baratas al inicio pero son caras a largo plazo. Aquí los números reales:
              </p>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-semibold">AJAX sin cuota (nuestro)</span>
                    <span className="text-green-400 font-bold">1.600€ total</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full">
                    <div className="h-2 bg-green-400 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <p className="text-white/50 text-xs mt-1">Instalación + mantenimiento 5 años. Equipo tuyo.</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-semibold">AJAX + CRA (nuestro)</span>
                    <span className="text-blue-400 font-bold">3.400€ total</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full">
                    <div className="h-2 bg-blue-400 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-white/50 text-xs mt-1">Instalación + CRA 5 años. Equipo tuyo.</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-semibold">Verisure (cuota 50€/mes)</span>
                    <span className="text-red-400 font-bold">3.000€ total</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full">
                    <div className="h-2 bg-red-400 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <p className="text-white/50 text-xs mt-1">Solo cuotas. El equipo NO es tuyo al finalizar.</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-[#E63946]/20 rounded-2xl p-8 border border-[#E63946]/30">
                <h3 className="text-2xl font-bold text-white mb-4">¿Aún tienes dudas?</h3>
                <p className="text-white/70 mb-6">Te ayudamos a elegir el sistema perfecto para tu caso en 5 minutos</p>
                <Button asChild className="w-full bg-[#E63946] hover:bg-[#d32f3c] text-white py-4 text-base font-bold mb-3">
                  <a href="/#contacto">Solicitar Asesoría Gratuita</a>
                </Button>
                <Button asChild variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 py-4">
                  <a href="tel:+34638109947">
                    <Phone className="w-4 h-4 mr-2" />
                    638 10 99 47
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#0A1628] mb-8 text-center">Preguntas Frecuentes sobre la Comparativa</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: '¿AJAX es mejor que Verisure?', a: 'Técnicamente, AJAX supera a Verisure en casi todos los parámetros. La ventaja de Verisure es su CRA propia muy reconocida. Pero con AJAX + instalador local + CRA contratada, obtienes lo mismo o mejor a menor coste y SIN permanencias.' },
              { q: '¿Por qué los grandes tienen contratos tan largos?', a: 'Porque el hardware lo instalan casi gratis (para enganchar) y recuperan la inversión con las cuotas. A 36 meses, cobran 1.440–2.160€ solo de cuotas sin que el equipo sea tuyo.' },
              { q: '¿Puedo cambiar de Verisure a AJAX?', a: 'Sí. Al terminar o cancelar (pagando penalización) te llevan el equipo. Instalamos AJAX desde cero. Los clientes que hacen el cambio ahorran 200–400€/año.' },
              { q: '¿Hikvision es fiable para viviendas?', a: 'Sí, es muy fiable especialmente si quieres cámaras + alarma integradas. Para viviendas sin cámaras, AJAX tiene mejor experiencia de usuario.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-[#0A1628] mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related articles */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Artículos relacionados</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { slug: 'precio-instalar-alarma-barcelona', title: '¿Cuánto cuesta instalar una alarma en Barcelona?' },
              { slug: 'mejores-alarmas-casa-barcelona', title: 'Las mejores alarmas para casa en Barcelona 2026' },
              { slug: 'empresas-alarmas-barcelona', title: 'Cómo elegir empresa de alarmas en Barcelona' },
            ].map(a => (
              <Link key={a.slug} to={`/BlogArticle/${a.slug}`} className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-colors">
                <p className="font-semibold text-[#0A1628] text-sm hover:text-[#E63946] transition-colors">{a.title} →</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}