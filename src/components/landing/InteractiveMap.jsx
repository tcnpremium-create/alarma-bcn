import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Phone, Mail, Navigation } from "lucide-react";
import L from "leaflet";

// Fix para iconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom red marker
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function InteractiveMap() {
  // Coordenadas aproximadas de Barcelona (centro)
  const position = [41.3851, 2.1734];
  
  const handleGetDirections = () => {
    window.open('https://www.google.com/maps/dir/?api=1&destination=Barcelona,Spain', '_blank');
  };

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
      <MapContainer
        center={position}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", minHeight: "400px" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={redIcon}>
          <Popup>
            <div className="text-center p-2">
              <div className="flex items-center justify-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-[#E63946]" />
                <strong className="text-base">Premium Tech Security</strong>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                📍 Barcelona y área metropolitana
              </p>
              <div className="space-y-2 text-sm">
                <a 
                  href="tel:+34638109947" 
                  className="flex items-center justify-center gap-2 text-[#E63946] hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  638 10 99 47
                </a>
                <a 
                  href="mailto:tcnpremium@gmail.com" 
                  className="flex items-center justify-center gap-2 text-[#E63946] hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  tcnpremium@gmail.com
                </a>
              </div>
              <button
                onClick={handleGetDirections}
                className="mt-3 w-full bg-[#E63946] hover:bg-[#d32f3c] text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-3 h-3" />
                Cómo llegar
              </button>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}