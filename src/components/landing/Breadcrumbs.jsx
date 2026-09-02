import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

/**
 * Breadcrumbs — visible trail + BreadcrumbList JSON-LD schema.
 *
 * items: array of { label, href? } for every step after "Inicio".
 * The last item should normally omit `href` (current page, not a link).
 *
 * theme: "dark" (por defecto, para hero/fondos oscuros) | "light" (para
 * páginas con fondo blanco — mismos colores que usa el resto de la web
 * en texto secundario sobre blanco).
 *
 * Example:
 *   <Breadcrumbs items={[{ label: "Servicios" }, { label: "Sonorización" }]} />
 *   → Inicio → Servicios → Sonorización
 */
export default function Breadcrumbs({ items = [], theme = "dark" }) {
  const trail = [{ label: "Inicio", href: "/" }, ...items];
  const colors = theme === "light"
    ? { link: "#6B7280", current: "#374151", chevron: 0.5 }
    : { link: "#94A3B8", current: "#CBD5E0", chevron: 0.6 };

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": trail.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.label,
      ...(item.href ? { "item": `https://alarmasenbarcelona.com${item.href}` } : {}),
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb">
        <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, listStyle: "none", margin: 0, padding: 0, fontSize: 13, color: colors.link }}>
          {trail.map((item, idx) => {
            const isLast = idx === trail.length - 1;
            return (
              <li key={idx} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {idx > 0 && <ChevronRight style={{ width: 12, height: 12, opacity: colors.chevron }} />}
                {isLast || !item.href ? (
                  <span style={{ color: isLast ? colors.current : colors.link, fontWeight: isLast ? 600 : 400 }}>
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.href} style={{ color: colors.link, textDecoration: "none" }}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
