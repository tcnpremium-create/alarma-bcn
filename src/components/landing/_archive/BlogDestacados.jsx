import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { originalArticlesData } from '@/components/blog/originalArticlesData';
import { newArticlesData } from '@/components/blog/newArticlesData';

// Artículos destacados fijos por valor SEO y conversión
const FEATURED_SLUGS = [
  'precio-instalar-alarma-barcelona',
  'mejores-alarmas-casa-barcelona',
  'comparativa-ajax-hikvision',
  'alarmas-pisos-barcelona',
  'alarma-local-comercial',
  'comparativa-alarmas-espana-2026',
];

const allArticles = { ...originalArticlesData, ...newArticlesData };

export default function BlogDestacados() {
  const featured = FEATURED_SLUGS
    .map(slug => allArticles[slug] ? { slug, ...allArticles[slug] } : null)
    .filter(Boolean)
    .slice(0, 6);

  if (featured.length === 0) return null;

  const [main, ...rest] = featured;

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#E63946] font-semibold text-sm uppercase tracking-wide mb-2">
              <TrendingUp className="w-4 h-4" />
              Artículos más leídos
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628]">
              Guías de seguridad en Barcelona
            </h2>
          </div>
          <Link
            to="/Blog"
            className="hidden sm:flex items-center gap-2 text-[#E63946] font-semibold hover:gap-3 transition-all"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main featured article */}
          <Link
            to={`/BlogArticle/${main.slug}`}
            className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-72 sm:h-80">
              <img
                src={main.image}
                alt={main.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ objectPosition: "center top" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/30 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="inline-block bg-[#E63946] text-white text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">
                  {main.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-2 group-hover:text-white/90">
                  {main.title}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2 mb-3">{main.excerpt}</p>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{main.readTime} de lectura</span>
                  <span>·</span>
                  <span>{main.date}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Secondary articles */}
          <div className="grid sm:grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-3">
            {rest.slice(0, 5).map(article => (
              <Link
                key={article.slug}
                to={`/BlogArticle/${article.slug}`}
                className="group flex gap-3 bg-gray-50 hover:bg-[#0A1628]/5 rounded-xl p-3.5 transition-colors"
              >
                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ objectPosition: "center top" }}
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[#E63946] text-xs font-semibold">{article.category}</span>
                  <h4 className="text-sm font-bold text-[#0A1628] leading-snug mt-0.5 group-hover:text-[#E63946] transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mt-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile ver todos */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/Blog"
            className="inline-flex items-center gap-2 bg-[#0A1628] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1a2f4a] transition-colors"
          >
            Ver todos los artículos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}