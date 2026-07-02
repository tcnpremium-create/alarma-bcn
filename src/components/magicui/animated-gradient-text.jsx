import React from "react";

export function AnimatedGradientText({ children, as: Tag = "span", className = "", style, colors = ["#E53E3E", "#FF8A65", "#E53E3E"] }) {
  return (
    <>
      <Tag
        className={className}
        style={{
          backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "magic-gradient-text-shift 4s linear infinite",
          display: "inline-block",
          ...style,
        }}
      >
        {children}
      </Tag>
      <style>{`@keyframes magic-gradient-text-shift { to { background-position: 200% center; } }`}</style>
    </>
  );
}

export default AnimatedGradientText;
