import React from "react";
import { motion } from "framer-motion";

export function ShinyButton({ children, onClick, style, className = "", type = "button", disabled, ...rest }) {
  return (
    <>
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        whileHover={disabled ? {} : { scale: 1.03 }}
        whileTap={disabled ? {} : { scale: 0.97 }}
        className={`magic-shiny-button ${className}`}
        style={{
          position: "relative", overflow: "hidden", border: "none", cursor: disabled ? "not-allowed" : "pointer",
          background: "linear-gradient(135deg, #E53E3E 0%, #C53030 100%)",
          color: "#fff", fontWeight: 700, borderRadius: 50,
          opacity: disabled ? 0.6 : 1,
          ...style,
        }}
        {...rest}
      >
        <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {children}
        </span>
        <span aria-hidden="true" className="magic-shiny-sweep" />
      </motion.button>
      <style>{`
        .magic-shiny-sweep {
          position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          animation: magic-shiny-sweep 2.8s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes magic-shiny-sweep {
          0% { left: -60%; }
          60% { left: 130%; }
          100% { left: 130%; }
        }
      `}</style>
    </>
  );
}

export default ShinyButton;
