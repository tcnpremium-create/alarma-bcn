import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function BlogPreview() {
  const articles = [
    {
      id: "ciberseguridad-hogar",
      title: "Guía completa de ciberseguridad para el hogar en 2024",
      excerpt: "Descubre las mejores prácticas para proteger tu vivienda contra ataques cibernéticos, hackeos de dispositivos IoT y robo de datos personales.",
      date: "20 Feb 2024",
      author: "Premium Tech Security",
      image: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600&q=80",
      category: "Seguridad"
    },
    {
      id: "nuevo-norme-2024",
      title: "Las nuevas normativas de seguridad 2024: Todo lo que debes saber",
      excerpt: "Cambios importantes en las regulaciones de sistemas de alarma y videovigilancia en Catalunya. Cómo afectan a tu hogar o negocio.",
      date: "15 Feb 2024",
      author: "Premium Tech Security",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
      category: "Normativa"
    },
    {
      id: "casos-exito-seguridad",
      title: "Casos de éxito: Cómo hemos protegido negocios en Barcelona",
      excerpt: "Historias reales de cómo nuestros sistemas han prevenido robos y han dado tranquilidad a cientos de comercios y residencias.",
      date: "10 Feb 2024",
      author: "Premium Tech Security",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
      category: "Casos de éxito"
    }
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">
            Blog de seguridad
          </h2>
          <p className="text-xl text-slate-600">
            Consejos, novedades tecnológicas y casos de éxito en seguridad profesional.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {articles.map((article, idx) => (
            <Link
              key={idx}
              to={createPageUrl("BlogArticle")}
              state={{ article }}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {article.author}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center">
          <Link
            to={createPageUrl("Blog")}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold transition-all"
          >
            Ver todas los artículos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}