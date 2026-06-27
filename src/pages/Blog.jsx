import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Home, Building2, Cpu, Scale, Camera, Newspaper } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import { Helmet } from "react-helmet";
import { base44 } from "@/api/api";
import { newArticlesData } from "../components/blog/newArticlesData";
import BlogHighlights from "../components/landing/BlogHighlights";

const categories = [
  { id: "seguridad-hogar", name: "Seguridad Hogar", icon: Home },
  { id: "seguridad-negocio", name: "Seguridad Negocio", icon: Building2 },
  { id: "tecnologia", name: "Tecnología", icon: Cpu },
  { id: "comparativas", name: "Comparativas", icon: Scale },
  { id: "videovigilancia", name: "Videovigilancia", icon: Camera },
  { id: "noticias", name: "Noticias", icon: Newspaper }
];

// Map SecurityTip category to display category
const CATEGORY_MAP = {
  hogar: "Seguridad Hogar",
  negocio: "Seguridad Negocio",
  comunidad: "Seguridad Hogar",
  tecnologia: "Tecnología",
  normativa: "Noticias",
};

const allArticles = [
  {
    title: "Guía Completa: Cómo Elegir la Alarma Perfecta para tu Hogar en Barcelona",
    excerpt: "Descubre los factores clave para seleccionar el sistema de seguridad ideal según el tamaño de tu vivienda, ubicación y presupuesto.",
    category: "Seguridad Hogar",
    date: "15 Feb 2026",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/809d1e8d7_IMG_8315.jpeg",
    alt: "Instalación de alarma profesional en hogar de Barcelona",
    slug: "elegir-alarma-hogar-barcelona"
  },
  {
    title: "Alarmas para Negocios: Protege tu Comercio 24/7",
    excerpt: "Las mejores soluciones de seguridad profesional para comercios, oficinas y naves industriales con control de accesos avanzado.",
    category: "Seguridad Negocio",
    date: "12 Feb 2026",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/38f56c395_IMG_8316.jpeg",
    alt: "Sistema de seguridad para negocio",
    slug: "alarmas-negocios-barcelona"
  },
  {
    title: "Ajax vs Hikvision: Comparativa de Sistemas de Alarma 2026",
    excerpt: "Análisis detallado de las dos marcas líderes en seguridad. Características, precios y cuál se adapta mejor a tus necesidades.",
    category: "Comparativas",
    date: "10 Feb 2026",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/e190957e0_IMG_8291.png",
    alt: "Comparativa Ajax vs Hikvision",
    slug: "comparativa-ajax-hikvision"
  },
  {
    title: "Cámaras IP: Todo lo que Necesitas Saber en 2026",
    excerpt: "Guía completa sobre cámaras de videovigilancia IP, resolución 4K, visión nocturna, almacenamiento en la nube y más.",
    category: "Videovigilancia",
    date: "8 Feb 2026",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/2501f362b_IMG_8282.png",
    alt: "Cámara IP 4K",
    slug: "camaras-ip-barcelona-2026"
  },
  {
    title: "Nueva Normativa de Videovigilancia y RGPD en Catalunya",
    excerpt: "Actualizaciones legales 2026: qué debes saber sobre videovigilancia, carteles informativos y protección de datos.",
    category: "Noticias",
    date: "5 Feb 2026",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/a23233802_IMG_8321.jpeg",
    alt: "Normativa RGPD videovigilancia",
    slug: "normativa-videovigilancia-rgpd-catalunya"
  },
  {
    title: "Domótica y Seguridad: Cómo Integrar tu Alarma con tu Smart Home",
    excerpt: "Conecta tu sistema de alarma con Alexa, Google Home y controla todo desde una sola app. Guía práctica de integración.",
    category: "Tecnología",
    date: "2 Feb 2026",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/db886e567_IMG_8320.png",
    alt: "Domótica y seguridad smart home",
    slug: "domotica-seguridad-smart-home"
  },
  {
    title: "¿Cuánto Cuesta Instalar una Alarma en Barcelona? Precios 2026",
    excerpt: "Análisis de precios reales: coste de instalación, cuotas mensuales, diferencias entre empresas y qué incluye cada tarifa.",
    category: "Seguridad Hogar",
    date: "20 Feb 2026",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/809d1e8d7_IMG_8315.jpeg",
    alt: "Precios alarma Barcelona",
    slug: "precio-instalar-alarma-barcelona"
  },
  {
    title: "Control de Accesos Biométrico para Empresas: Guía Completa",
    excerpt: "Huella dactilar, reconocimiento facial y tarjetas RFID. Descubre qué sistema de control de accesos es el más adecuado.",
    category: "Seguridad Negocio",
    date: "18 Feb 2026",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/1d629183e_IMG_8285.png",
    alt: "Control de accesos biométrico",
    slug: "control-accesos-biometrico-empresas"
  },
  {
    title: "Las 7 Zonas de Barcelona con Mayor Riesgo de Robo en 2026",
    excerpt: "Estadísticas oficiales de robos en Barcelona y cómo proteger tu hogar o negocio en las zonas más afectadas.",
    category: "Noticias",
    date: "25 Feb 2026",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/185a69b5e_IMG_8319.jpeg",
    alt: "Zonas riesgo robo Barcelona",
    slug: "zonas-riesgo-robo-barcelona-2026"
  },
  {
    title: "Consejos para Elegir tu Alarma Perfecta: Guía Definitiva 2026",
    excerpt: "Tamaño del inmueble, tipo de tecnología, cuota mensual o sin cuota... Te explicamos paso a paso cómo elegir.",
    category: "Seguridad Hogar",
    date: "28 Feb 2026",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/e190957e0_IMG_8291.png",
    alt: "Consejos elegir alarma",
    slug: "consejos-elegir-alarma-perfecta"
  },
  {
    title: "Últimas Tecnologías en Videovigilancia: IA, 4K y Detección Inteligente",
    excerpt: "Las cámaras modernas ya no solo graban: detectan personas, reconocen matrículas y envían alertas en tiempo real.",
    category: "Videovigilancia",
    date: "1 Mar 2026",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/2501f362b_IMG_8282.png",
    alt: "Videovigilancia IA 4K",
    slug: "videovigilancia-ia-barcelona-2026"
  },
  {
    title: "Cómo Proteger tu Negocio de Robos: Plan de Seguridad Completo",
    excerpt: "Robos, actos vandálicos, accesos no autorizados... El plan de seguridad integral que necesita tu negocio.",
    category: "Seguridad Negocio",
    date: "1 Mar 2026",
    image: "https://media.base44.com/images/public/6995a701232755a2d5e24b39/38f56c395_IMG_8316.jpeg",
    alt: "Plan seguridad negocio",
    slug: "proteger-negocio-robos-barcelona"
  }
];

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Blog de Seguridad y Alarmas - Premium Tech Security",
  "description": "Guías, consejos y últimas novedades en sistemas de seguridad, alarmas y videovigilancia para hogares y negocios en Barcelona y Catalunya.",
  "url": "https://www.premiumtechsecurity.es/Blog",
  "publisher": {
    "@type": "Organization",
    "name": "Premium Tech Security",
    "logo": { "@type": "ImageObject", "url": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/c939af4e3_logonegro.png" }
  },
  "blogPost": allArticles.map(a => ({
    "@type": "BlogPosting",
    "headline": a.title,
    "description": a.excerpt,
    "datePublished": a.date,
    "image": a.image,
    "url": `https://www.premiumtechsecurity.es/BlogArticle/${a.slug}`,
    "author": { "@type": "Organization", "name": "Premium Tech Security" }
  }))
};

const extraArticles = Object.entries(newArticlesData).map(([slug, a]) => ({
  title: a.title,
  excerpt: a.excerpt,
  category: a.category,
  date: a.date,
  image: a.image,
  alt: a.title,
  slug
}));

const combinedStaticArticles = [...allArticles, ...extraArticles];

// Entity category filter labels
const ENTITY_FILTERS = [
  { id: "all", name: "Todos" },
  { id: "hogar", name: "Hogar" },
  { id: "negocio", name: "Negocio" },
  { id: "comunidad", name: "Comunidad" },
  { id: "tecnologia", name: "Tecnología" },
  { id: "normativa", name: "Normativa" },
];

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [securityTips, setSecurityTips] = useState([]);
  const [loadingTips, setLoadingTips] = useState(true);
  const articlesPerPage = 9;

  useEffect(() => {
    base44.entities.SecurityTip.list()
      .then(setSecurityTips)
      .catch(() => setSecurityTips([]))
      .finally(() => setLoadingTips(false));
  }, []);

  const filtered = activeCategory === "all"
    ? combinedStaticArticles
    : combinedStaticArticles.filter(a => a.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filtered.slice(startIndex, startIndex + articlesPerPage);

  // Filter security tips by entity category
  const [tipFilter, setTipFilter] = useState("all");
  const filteredTips = tipFilter === "all"
    ? securityTips
    : securityTips.filter(t => t.category === tipFilter);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Blog de Seguridad y Alarmas en Barcelona | Premium Tech Security</title>
        <meta name="description" content="Blog de seguridad — Guías sobre cámaras, alarmas, videoporteros y control de accesos en Barcelona. Consejos de expertos de Premium Tech Security." />
        <meta property="og:title" content="Blog de Seguridad y Alarmas en Barcelona | Premium Tech Security" />
        <meta property="og:description" content="Guías, comparativas y consejos expertos sobre sistemas de alarma, videovigilancia y seguridad para hogares y negocios en Barcelona." />
        <link rel="canonical" href="https://www.premiumtechsecurity.es/Blog" />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#0A1628] to-[#1a2f4a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Blog de Seguridad y Alarmas en Barcelona</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Guías expertas, comparativas y las últimas novedades en sistemas de seguridad para hogares y negocios en Barcelona y Catalunya.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 sm:py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <button
              onClick={() => { setActiveCategory("all"); setCurrentPage(1); }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all ${activeCategory === "all" ? "border-[#E63946] bg-[#E63946] text-white" : "border-gray-200 hover:border-[#E63946] hover:bg-[#E63946]/5"}`}
            >
              <span className="text-xs sm:text-sm font-medium">Todos ({combinedStaticArticles.length})</span>
            </button>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const count = combinedStaticArticles.filter(a => a.category === cat.name).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.name); setCurrentPage(1); }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all ${activeCategory === cat.name ? "border-[#E63946] bg-[#E63946] text-white" : "border-gray-200 hover:border-[#E63946] hover:bg-[#E63946]/5"}`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${activeCategory === cat.name ? "text-white" : "text-[#E63946]"}`} />
                  <span className="text-xs sm:text-sm font-medium">{cat.name} ({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentArticles.map((article, index) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                style={{ touchAction: 'manipulation' }}
                onClick={() => window.location.href = `/BlogArticle/${article.slug}`}
                role="link"
                tabIndex={0}
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img src={article.image} alt={article.alt || article.title} loading="lazy" width="800" height="450"
                    className="w-full h-52 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#E63946] text-white text-xs font-semibold px-3 py-1.5 rounded-full">{article.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <h2 className="text-xl font-bold text-[#0A1628] mb-3 group-hover:text-[#E63946] transition-colors">{article.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                <button className="flex items-center gap-2 text-[#E63946] font-semibold text-sm group-hover:gap-3 transition-all">
                  Leer más <ArrowRight className="w-4 h-4" />
                </button>
              </motion.article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`w-10 h-10 rounded-full font-semibold text-sm transition-all ${currentPage === page ? "bg-[#E63946] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Security Tips or Highlighted Articles */}
      {securityTips.length > 0 ? (
        <section className="py-20 bg-[#F8F9FA]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-2 text-center">Consejos de Seguridad</h2>
            <p className="text-gray-500 text-center mb-8">Tips prácticos para proteger tu hogar, negocio y comunidad</p>
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {ENTITY_FILTERS.map((f) => (
                <button key={f.id} onClick={() => setTipFilter(f.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${tipFilter === f.id ? "bg-[#E63946] border-[#E63946] text-white" : "border-gray-200 text-gray-600 hover:border-[#E63946]"}`}>
                  {f.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTips.map((tip) => (
                <div key={tip.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#E63946]/10 text-[#E63946] text-xs font-bold px-3 py-1 rounded-full uppercase">{tip.category}</span>
                    {tip.difficulty && <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-1 rounded-full">{tip.difficulty}</span>}
                  </div>
                  <h3 className="font-bold text-[#0A1628] text-lg mb-2">{tip.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tip.description && tip.description.length > 150 ? tip.description.slice(0, 150) + "..." : tip.description}
                  </p>
                  {tip.estimated_cost && <p className="mt-3 text-xs text-gray-400">💰 Coste estimado: {tip.estimated_cost}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : !loadingTips && (
        <BlogHighlights />
      )}

      <FooterSection />
    </div>
  );
}