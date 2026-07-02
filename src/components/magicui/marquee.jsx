import React from "react";

export function Marquee({ children, reverse = false, speed = 30, gap = 40, className = "" }) {
  return (
    <>
      <div
        className={className}
        style={{
          overflow: "hidden",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <div
          className="magic-marquee-track"
          style={{
            display: "flex", width: "max-content", gap,
            animation: `magic-marquee-scroll ${speed}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          <div style={{ display: "flex", gap, flexShrink: 0 }}>{children}</div>
          <div style={{ display: "flex", gap, flexShrink: 0 }} aria-hidden="true">{children}</div>
        </div>
      </div>
      <style>{`
        @keyframes magic-marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .magic-marquee-track:hover { animation-play-state: paused; }
      `}</style>
    </>
  );
}

export default Marquee;
