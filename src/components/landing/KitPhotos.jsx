import React from "react";

/**
 * Fila de fotos de lo que lleva un kit de alarma (foto sin fondo, etiqueta
 * y, si hay más de una unidad, un "×2"). Los datos vienen de `photos` en
 * alarmKits.js, así que la fila siempre coincide con la lista de componentes.
 */
export default function KitPhotos({ photos, size = 78 }) {
  if (!photos?.length) return null;
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: 10 }} aria-label="Fotos de lo que incluye el kit">
      {photos.map((p) => (
        <li key={p.label} style={{ width: size + 8, textAlign: "center" }}>
          <div style={{ position: "relative", width: size, height: size, margin: "0 auto", overflow: "visible", borderRadius: 14, background: "radial-gradient(circle at 50% 45%, rgba(148,163,184,.26) 0%, rgba(148,163,184,.10) 55%, transparent 75%)" }}>
            <img src={p.img} alt={p.label} loading="lazy" decoding="async" width={size} height={size} style={{ width: "86%", height: "86%", margin: "7%", objectFit: "contain", display: "block", filter: "drop-shadow(0 4px 8px rgba(0,0,0,.45))" }} />
            {p.qty > 1 && (
              <span style={{ position: "absolute", right: 3, bottom: 3, background: "#E53E3E", color: "#fff", fontSize: 10, fontWeight: 800, borderRadius: 10, padding: "1px 6px" }}>×{p.qty}</span>
            )}
          </div>
          <span style={{ display: "block", marginTop: 5, fontSize: 10.5, lineHeight: 1.25, color: "#94A3B8", fontWeight: 600 }}>{p.label}</span>
        </li>
      ))}
    </ul>
  );
}
