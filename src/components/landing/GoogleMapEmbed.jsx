import React from "react";
import { MapPin } from "lucide-react";

export default function GoogleMapEmbed({ city, query, height = "400px" }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed&hl=es&z=13`;

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      <div className="flex items-center gap-2 bg-[#0A1628] px-4 py-3">
        <MapPin className="w-4 h-4 text-[#E63946]" />
        <span className="text-white text-sm font-semibold">Zona de servicio: {city}</span>
      </div>
      <iframe
        title={`Mapa de cobertura - ${city}`}
        src={src}
        width="100%"
        height={height}
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}