import React from "react";
import { Phone } from "lucide-react";

export default function MobileFloatingCTA({ onOpenModal }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] flex"
      style={{ boxShadow: "0 -2px 16px rgba(0,0,0,0.25)", height: 56 }}
    >
      <button
        onClick={() => onOpenModal && onOpenModal()}
        style={{
          flex: 1,
          backgroundColor: "#E53E3E",
          color: "#fff",
          fontWeight: 800,
          fontSize: 15,
          border: "none",
          cursor: "pointer",
          borderRight: "1px solid rgba(255,255,255,0.15)"
        }}
      >
        Presupuesto →
      </button>
      <a
        href="tel:+34638109947"
        style={{
          flex: 1,
          backgroundColor: "#0A0A1A",
          color: "#fff",
          fontWeight: 700,
          fontSize: 15,
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8
        }}
      >
        <Phone style={{ width: 16, height: 16 }} />
        Llamar
      </a>
    </div>
  );
}
