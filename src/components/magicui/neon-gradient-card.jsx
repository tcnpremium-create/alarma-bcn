import React from "react";
import { motion } from "framer-motion";

export function NeonGradientCard({ children, className = "", style, contentStyle, colors = ["#E53E3E", "#7C3AED"] }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`magic-neon-card ${className}`}
      style={{
        position: "relative",
        borderRadius: 18,
        padding: 1.5,
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: 16.5,
          background: "#0A1120",
          height: "100%",
          ...contentStyle,
        }}
      >
        {children}
      </div>
      <style>{`
        .magic-neon-card { transition: filter 0.25s ease; filter: drop-shadow(0 0 0 rgba(229,62,62,0)); }
        .magic-neon-card:hover { filter: drop-shadow(0 8px 24px rgba(229,62,62,0.35)); }
      `}</style>
    </motion.div>
  );
}

export default NeonGradientCard;
