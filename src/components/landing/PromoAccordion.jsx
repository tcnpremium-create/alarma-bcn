import React, { useState } from "react";
import { ChevronDown, Flame } from "lucide-react";

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        marginBottom: 10,
        overflow: "hidden",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "18px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
          textAlign: "left",
          gap: 10,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {item.header}
          {item.badge && (
            <span
              style={{
                backgroundColor: "#E53E3E",
                color: "#fff",
                fontSize: 10,
                borderRadius: 10,
                padding: "2px 8px",
                fontWeight: 800,
              }}
            >
              {item.badge}
            </span>
          )}
        </span>
        <ChevronDown
          className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", color: "#9CA3AF" }}
        />
      </button>

      <div
        style={{
          maxHeight: isOpen ? 800 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <div style={{ padding: "0 20px 20px" }}>
          <p style={{ color: "#9CA3AF", fontSize: 14, textDecoration: "line-through" }}>Antes: {item.oldPrice}</p>
          <p style={{ color: "#E53E3E", fontWeight: 900, fontSize: 28, margin: "4px 0" }}>{item.price}</p>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(34,197,94,0.15)",
              color: "#22C55E",
              fontSize: 12,
              fontWeight: 800,
              borderRadius: 8,
              padding: "4px 10px",
              marginBottom: 12,
            }}
          >
            AHORRA {item.savings}
          </span>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {item.features.map((f, i) => (
              <li key={i} style={{ color: "#fff", fontSize: 14, lineHeight: 2 }}>
                ✓ {f}
              </li>
            ))}
          </ul>

          <p style={{ color: "#9CA3AF", fontSize: 11, marginTop: 10 }}>* IVA no incluido</p>

          <a
            href={item.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              width: "100%",
              backgroundColor: "#25D366",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              borderRadius: 50,
              padding: 14,
              border: "none",
              textAlign: "center",
              textDecoration: "none",
              marginTop: 10,
              boxSizing: "border-box",
            }}
          >
            {item.ctaText}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PromoAccordion({ title, urgencyLine1, urgencyLine2, items, footerText, bg }) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section style={{ background: bg, padding: "32px 20px" }}>
      <div className="max-w-2xl mx-auto">
        <div
          style={{
            backgroundColor: "#E53E3E",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 20,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Flame style={{ width: 22, height: 22, color: "#fff", flexShrink: 0 }} />
          <div>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: 14, margin: 0 }}>{urgencyLine1}</p>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, margin: 0 }}>{urgencyLine2}</p>
          </div>
        </div>

        <h2 style={{ color: "#fff", fontWeight: 900, fontSize: 22, marginBottom: 16 }}>{title}</h2>

        {items.map((item, i) => (
          <AccordionItem
            key={i}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}

        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center", marginTop: 16 }}>
          {footerText}
        </p>
      </div>
    </section>
  );
}
