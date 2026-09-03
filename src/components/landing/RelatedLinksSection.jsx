import React from "react";
import { Link } from "react-router-dom";

/**
 * Bloque de enlaces internos relacionados, agrupados por intención.
 *
 * Existe porque las páginas comerciales del sitio estaban prácticamente
 * aisladas: /alarmas-barcelona, /camaras-barcelona, /Promociones o
 * /MantenimientoSoporte no tenían NI UN enlace contextual entrante ni
 * saliente — solo los del header y el footer, que son plantilla y valen poco
 * como señal de relevancia. Nueve landings de municipio (Sant Cugat, El Prat,
 * Castelldefels, Viladecans, Badalona, Terrassa, Mataró, Cornellà, Eixample)
 * eran directamente huérfanas: solo se llegaba a ellas por el sitemap.
 *
 * Se agrupa por intención (otros servicios / precios y soporte / guías) en vez
 * de volcar una lista larga, para que el bloque siga siendo navegable y no un
 * amasijo de enlaces. Cada grupo lleva pocos enlaces y el texto del enlace
 * describe el destino: nada de repetir el mismo anchor comercial una y otra
 * vez.
 */
export default function RelatedLinksSection({ heading, groups, dark = false }) {
  const visible = groups.filter((g) => g.links && g.links.length > 0);
  if (visible.length === 0) return null;
  const single = visible.length === 1;

  const bg = dark ? "#0A0A1A" : "#F8F9FA";
  const titleColor = dark ? "#fff" : "#0A0A1A";
  const groupColor = dark ? "#94A3B8" : "#6B7280";
  const linkColor = dark ? "#E2E8F0" : "#1F2937";

  return (
    <section style={{ backgroundColor: bg, padding: "56px 24px" }}>
      <div className="max-w-5xl mx-auto">
        <h2 style={{ fontWeight: 900, fontSize: 22, color: titleColor, margin: "0 0 28px" }}>
          {heading}
        </h2>
        <div className={single ? "" : "grid gap-8 md:grid-cols-3"}>
          {visible.map((group) => (
            <div key={group.title}>
              <h3
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: groupColor,
                  margin: "0 0 12px",
                }}
              >
                {group.title}
              </h3>
              {/* Con un solo grupo (las zonas de la provincia, que son diez)
                  una única columna deja la banda medio vacía y muy alta: se
                  reparten en varias columnas. */}
              <ul
                className={single ? "grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4" : undefined}
                style={{ listStyle: "none", margin: 0, padding: 0 }}
              >
                {group.links.map((link) => (
                  <li key={link.to} style={{ marginBottom: 8 }}>
                    <Link
                      to={link.to}
                      style={{
                        color: linkColor,
                        fontSize: 14,
                        lineHeight: 1.5,
                        textDecoration: "none",
                        borderBottom: "1px solid rgba(229,62,62,0.35)",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
