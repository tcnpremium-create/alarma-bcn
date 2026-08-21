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
 * Example:
 *   <Breadcrumbs items={[{ label: "Servicios" }, { label: "Sonorización" }]} />
 *   → Inicio → Servicios → Sonorización
 */
export default function Breadcrumbs({ items = [] }) {
  const trail = [{ label: "Inicio", href: "/" }, ...items];

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
        <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, listStyle: "none", margin: 0, padding: 0, fontSize: 13, color: "#94A3B8" }}>
          {trail.map((item, idx) => {
            const isLast = idx === trail.length - 1;
            return (
              <li key={idx} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {idx > 0 && <ChevronRight style={{ width: 12, height: 12, opacity: 0.6 }} />}
                {isLast || !item.href ? (
                  <span style={{ color: isLast ? "#CBD5E0" : "#94A3B8", fontWeight: isLast ? 600 : 400 }}>
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.href} style={{ color: "#94A3B8", textDecoration: "none" }}>
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
