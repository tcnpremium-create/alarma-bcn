import React from "react";

let injected = false;

export function BorderBeam({ size = 240, duration = 7, colorFrom = "#E53E3E", colorTo = "#FF8A65", borderWidth = 1.5 }) {
  if (!injected) {
    injected = true;
  }
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: borderWidth,
          background: `conic-gradient(from 0deg, transparent 0%, ${colorFrom} 12%, ${colorTo} 22%, transparent 38%, transparent 100%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: `border-beam-spin ${duration}s linear infinite`,
          pointerEvents: "none",
        }}
      />
      <style>{`@keyframes border-beam-spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}

export default BorderBeam;
