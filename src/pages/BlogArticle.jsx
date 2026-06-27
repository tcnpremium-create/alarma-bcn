import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Share2, Phone, ChevronRight, CheckCircle, HelpCircle, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Helmet } from 'react-helmet';
import { newArticlesData } from '@/components/blog/newArticlesData';
import { originalArticlesData } from '@/components/blog/originalArticlesData';
import { articleSEOData } from '@/components/blog/articleSEOData';
import AdSenseInArticle from '@/components/ads/AdSenseInArticle';
import AdSenseDisplay from '@/components/ads/AdSenseDisplay';

const allArticles = { ...originalArticlesData, ...newArticlesData };

const SITE_URL = 'https://www.alarmasenbarcelona.com';
const LOGO_URL = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/b61d56d39_UNETEALIMPERIO.png';

function buildSchema(slug, article, seoData) {
  const url = `${SITE_URL}/BlogArticle/${slug}`;
  const faqs = seoData?.faqs || [];
  const images = seoData?.inContentImages || [];

  const graph = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Inicio', 'item': SITE_URL },
        { '@type': 'ListItem', 'position': 2, 'name': 'Blog Alarmas Barcelona', 'item': `${SITE_URL}/Blog` },
        { '@type': 'ListItem', 'position': 3, 'name': article.title, 'item': url },
      ],
    },
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      'headline': seoData?.seoTitle || article.title,
      'description': seoData?.metaDescription || article.excerpt,
      'keywords': (seoData?.keywords || []).join(', '),
      'url': url,
      'datePublished': article.date,
      'dateModified': article.date,
      'inLanguage': 'es-ES',
      'image': [article.image, ...images.map(i => i.src)],
      'author': {
        '@type': 'Organization',
        '@id': `${SITE_URL}#organization`,
        'name': 'Premium Tech Security Barcelona',
      },
      'publisher': {
        '@type': 'Organization',
        '@id': `${SITE_URL}#organization`,
        'name': 'Premium Tech Security Barcelona',
        'logo': { '@type': 'ImageObject', 'url': LOGO_URL },
      },
      'mainEntityOfPage': { '@type': 'WebPage', '@id': url },
      'articleSection': article.category,
      'about': { '@type': 'Thing', 'name': 'Alarmas de seguridad Barcelona' },
      'mentions': [
        { '@type': 'City', 'name': 'Barcelona' },
        { '@type': 'AdministrativeArea', 'name': 'Cataluña' },
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}#localbusiness`,
      'name': 'Premium Tech Security Barcelona',
      'description': 'Empresa instaladora de alarmas, videovigilancia y control de accesos en Barcelona. +800 instalaciones. Técnicos certificados AJAX e Hikvision.',
      'url': SITE_URL,
      'telephone': '+34638109947',
      'email': 'tcnpremium@gmail.com',
      'logo': LOGO_URL,
      'priceRange': '€€',
      'areaServed': ['Barcelona', 'Badalona', 'Hospitalet de Llobregat', 'Sabadell', 'Terrassa', 'Mataró', 'Sant Cugat del Vallès'],
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Barcelona',
        'addressRegion': 'Cataluña',
        'addressCountry': 'ES',
      },
      'geo': { '@type': 'GeoCoordinates', 'latitude': 41.3851, 'longitude': 2.1734 },
      'openingHoursSpecification': [
        { '@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Monday','Tuesday','Wednesday','Thursday','Friday'], 'opens': '08:00', 'closes': '20:00' },
        { '@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Saturday'], 'opens': '09:00', 'closes': '14:00' },
      ],
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '127',
        'bestRating': '5',
      },
    },
  ];

  if (faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      'mainEntity': faqs.map(f => ({
        '@type': 'Question',
        'name': f.q,
        'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

function extractH2s(html) {
  const matches = [];
  const regex = /<h2[^>]*>(.*?)<\/h2>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '');
    const id = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').slice(0, 60);
    matches.push({ text, id });
  }
  return matches;
}

function injectH2Ids(html) {
  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, content) => {
    const text = content.replace(/<[^>]+>/g, '');
    const id = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').slice(0, 60);
    return `<h2${attrs} id="${id}">${content}</h2>`;
  });
}

const PROSE_CLASS = "article-content";

function ArticleContentWithImages({ html, inContentImages }) {
  if (!inContentImages || inContentImages.length === 0) {
    return <div className={PROSE_CLASS} dangerouslySetInnerHTML={{ __html: html }} />;
  }

  const parts = html.split(/(?=<h2)/gi);
  const insertAfterSection = [1, 3];

  return (
    <>
      {parts.map((part, i) => {
        const imgIdx = insertAfterSection.indexOf(i);
        return (
          <React.Fragment key={i}>
            <div className={PROSE_CLASS} dangerouslySetInnerHTML={{ __html: part }} />
            {imgIdx !== -1 && inContentImages[imgIdx] && (
              <figure className="my-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={inContentImages[imgIdx].src}
                  alt={inContentImages[imgIdx].alt}
                  className="w-full h-64 sm:h-80 object-cover"
                  loading="lazy"
                  width="1200"
                  height="630"
                />
                {inContentImages[imgIdx].caption && (
                  <figcaption className="bg-gray-50 px-5 py-3 text-sm text-gray-500 italic border-t border-gray-100">
                    {inContentImages[imgIdx].caption}
                  </figcaption>
                )}
              </figure>
            )}
            {i === 1 && <AdSenseInArticle />}
            {i === 3 && <AdSenseDisplay />}
          </React.Fragment>
        );
      })}
    </>
  );
}

export default function BlogArticle() {
  const { slug } = useParams();
  const article = allArticles[slug];
  const seoData = articleSEOData[slug] || {};

  const schema = useMemo(() => article ? buildSchema(slug, article, seoData) : null, [slug, article]);
  const tocItems = useMemo(() => article ? extractH2s(article.content) : [], [article]);
  const processedContent = useMemo(() => article ? injectH2Ids(article.content) : '', [article]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
          <Link to="/Blog" className="text-[#E63946] hover:underline">Volver al blog</Link>
        </div>
      </div>
    );
  }

  const seoTitle = seoData.seoTitle || `${article.title} | Alarmas Barcelona`;
  const metaDesc = seoData.metaDescription || article.excerpt;
  const keywords = (seoData.keywords || [article.category, 'alarmas Barcelona', 'instalación alarma Barcelona']).join(', ');
  const canonicalUrl = `${SITE_URL}/BlogArticle/${slug}`;

  const relatedArticles = Object.entries(allArticles)
    .filter(([s, a]) => s !== slug && a.category === article.category)
    .slice(0, 3)
    .map(([s, a]) => ({ slug: s, title: a.title, image: a.image, date: a.date }));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={article.image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:site_name" content="Alarmas Barcelona | Premium Tech Security" />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:section" content={article.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={article.image} />
        {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
      </Helmet>

      <Navbar />

      <article className="min-h-screen bg-white" itemScope itemType="https://schema.org/BlogPosting">
        <meta itemProp="headline" content={seoTitle} />
        <meta itemProp="description" content={metaDesc} />
        <meta itemProp="datePublished" content={article.date} />
        <meta itemProp="image" content={article.image} />

        {/* Hero */}
        <div className="relative h-[55vh] sm:h-[65vh] overflow-hidden">
          <img
            src={article.image}
            alt={`${article.title} — Alarmas Barcelona Premium Tech Security`}
            className="w-full h-full object-cover"
            width="1200" height="630"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/50 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 w-full">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-white/60 text-xs mb-4">
                <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
                <ChevronRight className="w-3 h-3" />
                <Link to="/Blog" className="hover:text-white transition-colors">Blog Alarmas</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/80 truncate max-w-[200px]">{article.title}</span>
              </nav>
              <span className="inline-block bg-[#E63946] text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wide">
                {article.category}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4" itemProp="name">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span itemProp="author">Albert Roca</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <time itemProp="datePublished" dateTime={article.date}>{article.date}</time>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} de lectura</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>Barcelona, Cataluña</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main layout: article + sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">

            {/* Article body */}
            <div className="min-w-0">
              {/* Lead intro box */}
              <div className="bg-blue-50 border-l-4 border-[#E63946] rounded-r-xl p-5 mb-10">
                <p className="text-gray-700 text-lg leading-relaxed font-medium">{article.excerpt}</p>
              </div>

              {/* Content with in-content images */}
              <ArticleContentWithImages
                html={processedContent}
                inContentImages={seoData.inContentImages || []}
              />

              {/* Mid-article CTA */}
              <div className="my-12 bg-gradient-to-r from-[#E63946] to-[#c02e3a] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-white font-bold text-xl mb-1">¿Listo para instalar tu alarma en Barcelona?</p>
                  <p className="text-white/80 text-sm">Visita técnica gratuita · Sin compromiso · Respuesta en 24h</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <a href="tel:+34638109947" className="inline-flex items-center justify-center gap-2 bg-white text-[#E63946] font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors whitespace-nowrap">
                    <Phone className="w-4 h-4" />
                    638 10 99 47
                  </a>
                  <a href="/#contacto" className="inline-flex items-center justify-center gap-2 bg-white/20 border border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/30 transition-colors whitespace-nowrap">
                    Presupuesto gratis
                  </a>
                </div>
              </div>

              {/* Ad before FAQ */}
              <AdSenseDisplay />

              {/* FAQ Section */}
              {seoData.faqs && seoData.faqs.length > 0 && (
                <section className="mt-12 pt-10 border-t-2 border-gray-100" aria-label="Preguntas frecuentes">
                  <h2 className="text-2xl font-bold text-[#0A1628] mb-6 flex items-center gap-3">
                    <HelpCircle className="w-6 h-6 text-[#E63946]" />
                    Preguntas frecuentes
                  </h2>
                  <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
                    {seoData.faqs.map((faq, i) => (
                      <details key={i} className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-200" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                        <summary className="flex items-start justify-between gap-3 p-5 cursor-pointer list-none font-semibold text-[#0A1628] hover:bg-gray-100 transition-colors">
                          <span itemProp="name">{faq.q}</span>
                          <ChevronRight className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5 text-gray-700 leading-relaxed border-t border-gray-200 pt-4" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                          <p itemProp="text">{faq.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
                <p className="text-gray-600 font-semibold text-sm">¿Te ha sido útil? Comparte:</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' — ' + window.location.href)}`, '_blank')}
                    className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Copiar link
                  </button>
                </div>
              </div>

              {/* Final CTA */}
              <div className="mt-12 bg-gradient-to-br from-[#0A1628] to-[#1a2f4a] rounded-2xl p-8 sm:p-12 text-center">
                <div className="inline-flex items-center gap-2 bg-[#E63946]/20 text-[#E63946] font-semibold px-4 py-2 rounded-full text-sm mb-4">
                  <CheckCircle className="w-4 h-4" />
                  +800 instalaciones en Barcelona · 4.9/5 valoración
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Instala tu alarma en Barcelona con nosotros
                </h2>
                <p className="text-white/70 mb-2">Visita técnica gratuita · Sin compromiso · Instalación en 24–48h</p>
                <p className="text-white/50 text-sm mb-8">Técnicos certificados AJAX · Sin permanencias · El equipo es tuyo desde el día 1</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-[#E63946] hover:bg-[#d32f3c] text-white px-8 py-4 text-base font-bold">
                    <a href="/#contacto">Solicitar Presupuesto Gratis</a>
                  </Button>
                  <Button asChild variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#0A1628] px-8 py-4 text-base font-bold">
                    <a href="tel:+34638109947">
                      <Phone className="w-4 h-4 mr-2" />
                      638 10 99 47
                    </a>
                  </Button>
                </div>
              </div>

              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <div className="mt-14 pt-12 border-t border-gray-200">
                  <h2 className="text-xl font-bold text-[#0A1628] mb-6">Artículos relacionados: {article.category}</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {relatedArticles.map(r => (
                      <Link key={r.slug} to={`/BlogArticle/${r.slug}`} className="group block">
                        <div className="overflow-hidden rounded-xl mb-2">
                          <img src={r.image} alt={r.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="225" />
                        </div>
                        <p className="font-semibold text-[#0A1628] text-sm group-hover:text-[#E63946] transition-colors leading-snug">{r.title}</p>
                        <p className="text-gray-400 text-xs mt-1">{r.date}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-5">

                {/* Table of Contents */}
                {tocItems.length > 2 && (
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                    <h3 className="font-bold text-[#0A1628] text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                      📋 Índice del artículo
                    </h3>
                    <nav aria-label="Tabla de contenidos">
                      <ol className="space-y-2">
                        {tocItems.map((item, i) => (
                          <li key={i}>
                            <a
                              href={`#${item.id}`}
                              className="flex items-start gap-2 text-sm text-gray-600 hover:text-[#E63946] transition-colors leading-snug"
                            >
                              <span className="flex-shrink-0 w-5 h-5 bg-[#E63946]/10 text-[#E63946] rounded-full text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  </div>
                )}

                {/* Sidebar CTA */}
                <div className="bg-gradient-to-br from-[#E63946] to-[#c02e3a] rounded-2xl p-5 text-white">
                  <div className="text-2xl mb-2">🛡️</div>
                  <h3 className="font-bold text-lg mb-2">Presupuesto gratis</h3>
                  <p className="text-white/80 text-sm mb-4">Visita técnica gratuita en Barcelona y área metropolitana. Sin compromiso.</p>
                  <a href="tel:+34638109947" className="block w-full bg-white text-[#E63946] text-center font-bold py-3 rounded-xl hover:bg-white/90 transition-colors mb-2 text-sm">
                    📞 638 10 99 47
                  </a>
                  <a href="/#contacto" className="block w-full border border-white/50 text-white text-center font-semibold py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
                    Enviar mensaje
                  </a>
                </div>

                {/* Trust signals */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <h3 className="font-bold text-[#0A1628] text-sm mb-4">¿Por qué elegirnos?</h3>
                  <ul className="space-y-2.5">
                    {[
                      '+800 instalaciones en Barcelona',
                      'Técnicos certificados AJAX',
                      'Sin permanencias ni contratos',
                      'El equipo es tuyo desde día 1',
                      'Garantía 3 años en equipos',
                      'Servicio técnico en 24h',
                    ].map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools */}
                <div className="bg-[#0A1628]/5 rounded-2xl p-5">
                  <h3 className="font-bold text-[#0A1628] text-sm mb-3">Herramientas gratuitas</h3>
                  <div className="space-y-2">
                    {[
                      { to: '/Calculadora', label: '🧮 Calculadora de presupuesto' },
                      { to: '/MapaRiesgo', label: '🗺️ Mapa de riesgo por barrios' },
                      { to: '/ComparativaAlarmas', label: '📊 Comparativa de alarmas' },
                    ].map(l => (
                      <Link key={l.to} to={l.to} className="block text-sm text-[#E63946] font-semibold hover:underline py-1">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <FooterSection />
    </>
  );
}