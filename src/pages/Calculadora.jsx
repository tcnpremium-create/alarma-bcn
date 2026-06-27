import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import { Helmet } from "react-helmet";

const SPACE_OPTIONS = [
  { id: "hogar", emoji: "🏠", label: "Mi hogar" },
  { id: "negocio", emoji: "🏢", label: "Mi negocio" },
  { id: "comunidad", emoji: "🏘️", label: "Mi comunidad" },
  { id: "nave", emoji: "🏭", label: "Mi nave industrial" },
];

const SERVICE_OPTIONS = [
  { id: "camaras", emoji: "📹", label: "Cámaras de seguridad" },
  { id: "alarma", emoji: "🔔", label: "Sistema de alarma" },
  { id: "accesos", emoji: "🚪", label: "Control de accesos" },
];

const CITY_OPTIONS = ["Barcelona", "Sabadell", "Girona", "Tarragona", "Lleida", "Otra"];

function getEstimate(services, cameraCount) {
  const hasCam = services.includes("camaras");
  const hasAlarm = services.includes("alarma");
  const hasAccess = services.includes("accesos");

  if (hasCam && hasAlarm && hasAccess) return "999€";
  if (hasCam && hasAlarm) return "699€";
  if (hasAlarm && !hasCam) return "349€";
  if (hasCam) {
    if (cameraCount <= 2) return "449€";
    if (cameraCount <= 4) return "699€";
    return "1.199€";
  }
  if (hasAccess) return "499€";
  return "349€";
}

export default function Calculadora() {
  const [step, setStep] = useState(1);
  const [space, setSpace] = useState("");
  const [services, setServices] = useState([]);
  const [cameraCount, setCameraCount] = useState(4);
  const [city, setCity] = useState("");

  const toggleService = (id) => {
    setServices((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const totalSteps = services.includes("camaras") ? 4 : 3;
  const progress = Math.min((step / (totalSteps + 1)) * 100, 100);
  const showResult = step > totalSteps;

  const canNext = () => {
    if (step === 1) return !!space;
    if (step === 2) return services.length > 0;
    if (step === 3 && services.includes("camaras")) return true;
    if ((step === 3 && !services.includes("camaras")) || step === 4) return !!city;
    return false;
  };

  const nextStep = () => {
    if (!canNext()) return;
    if (step === 2 && !services.includes("camaras")) {
      // Skip camera slider, go to city
      setStep(3);
    } else if (step === 3 && services.includes("camaras")) {
      setStep(4);
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step === 3 && !services.includes("camaras")) {
      setStep(2);
    } else if (step === 4 && services.includes("camaras")) {
      setStep(3);
    } else {
      setStep(Math.max(1, step - 1));
    }
  };

  // Determine which "real step" we're on for city
  const isCityStep = (step === 3 && !services.includes("camaras")) || (step === 4 && services.includes("camaras"));

  const estimate = getEstimate(services, cameraCount);
  const waMsg = `Hola, he calculado un presupuesto en vuestra web. Espacio: ${space}, servicios: ${services.join(", ")}${services.includes("camaras") ? `, ${cameraCount} cámaras` : ""}, ciudad: ${city}. Estimación: desde ${estimate}. Me gustaría confirmar.`;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Calculadora de Presupuesto | Premium Tech Security</title>
        <meta name="description" content="Calcula el precio de tu sistema de seguridad en Barcelona. Presupuesto online gratuito para cámaras, alarmas y videoporteros. Sin compromiso." />
      </Helmet>
      <Navbar />

      <section className="pt-28 pb-20 px-4">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-center mb-2" style={{ color: "#0A0A1A" }}>
            Calculadora de Presupuesto
          </h1>
          <p className="text-center text-gray-500 mb-8 text-sm">Responde unas preguntas y obtén tu estimación al instante</p>

          {/* Progress bar */}
          <div className="h-2 bg-gray-100 rounded-full mb-10 overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: "#E53E3E" }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>

          {!showResult ? (
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              
              {/* Step 1 */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold mb-6" style={{ color: "#0A0A1A" }}>¿Qué quieres proteger?</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {SPACE_OPTIONS.map((o) => (
                      <button key={o.id} onClick={() => setSpace(o.id)}
                        className="p-5 rounded-2xl border-2 text-left transition-all"
                        style={{ borderColor: space === o.id ? "#E53E3E" : "#E5E7EB", backgroundColor: space === o.id ? "#FEF2F2" : "white" }}>
                        <span className="text-3xl block mb-2">{o.emoji}</span>
                        <span className="font-semibold text-sm" style={{ color: "#0A0A1A" }}>{o.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold mb-6" style={{ color: "#0A0A1A" }}>¿Qué servicio necesitas?</h2>
                  <div className="space-y-3">
                    {SERVICE_OPTIONS.map((o) => (
                      <button key={o.id} onClick={() => toggleService(o.id)}
                        className="w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all"
                        style={{ borderColor: services.includes(o.id) ? "#E53E3E" : "#E5E7EB", backgroundColor: services.includes(o.id) ? "#FEF2F2" : "white" }}>
                        <span className="text-2xl">{o.emoji}</span>
                        <span className="font-semibold text-sm" style={{ color: "#0A0A1A" }}>{o.label}</span>
                        <div className="ml-auto w-5 h-5 rounded border-2 flex items-center justify-center"
                          style={{ borderColor: services.includes(o.id) ? "#E53E3E" : "#D1D5DB", backgroundColor: services.includes(o.id) ? "#E53E3E" : "white" }}>
                          {services.includes(o.id) && <span className="text-white text-xs">✓</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 — Camera slider (only if cameras selected) */}
              {step === 3 && services.includes("camaras") && (
                <div>
                  <h2 className="text-xl font-bold mb-6" style={{ color: "#0A0A1A" }}>¿Cuántas cámaras necesitas?</h2>
                  <div className="text-center mb-6">
                    <span className="text-5xl font-black" style={{ color: "#E53E3E" }}>{cameraCount}</span>
                    <span className="text-gray-400 ml-2 text-lg">cámaras</span>
                  </div>
                  <input type="range" min={1} max={16} value={cameraCount} onChange={(e) => setCameraCount(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: "#E53E3E" }} />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>1</span><span>4</span><span>8</span><span>12</span><span>16</span>
                  </div>
                </div>
              )}

              {/* City step */}
              {isCityStep && (
                <div>
                  <h2 className="text-xl font-bold mb-6" style={{ color: "#0A0A1A" }}>¿En qué ciudad estás?</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {CITY_OPTIONS.map((c) => (
                      <button key={c} onClick={() => setCity(c)}
                        className="p-4 rounded-2xl border-2 font-semibold text-sm transition-all"
                        style={{ borderColor: city === c ? "#E53E3E" : "#E5E7EB", backgroundColor: city === c ? "#FEF2F2" : "white", color: "#0A0A1A" }}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Nav buttons */}
              <div className="flex gap-3 mt-10">
                {step > 1 && (
                  <button onClick={prevStep} className="flex items-center gap-1 px-5 py-3 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                    <ChevronLeft className="w-4 h-4" /> Atrás
                  </button>
                )}
                <button onClick={nextStep} disabled={!canNext()}
                  className="flex-1 flex items-center justify-center gap-1 px-5 py-3 rounded-full text-sm font-bold text-white transition-colors disabled:opacity-40"
                  style={{ backgroundColor: "#E53E3E" }}>
                  {isCityStep ? "Ver presupuesto" : "Siguiente"} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* Result */
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
              <div className="rounded-3xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E53E3E, #C53030)" }}>
                <p className="text-sm font-semibold opacity-80 mb-2">Tu presupuesto estimado</p>
                <p className="text-5xl font-black mb-1">DESDE {estimate}</p>
                <p className="text-sm opacity-80 mt-4">Instalación incluida · Sin cuotas · Garantía de por vida</p>
              </div>

              <div className="mt-6 space-y-3">
                <a href={`https://wa.me/34638109947?text=${encodeURIComponent(waMsg)}`} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center py-4 rounded-full font-bold text-white text-sm" style={{ backgroundColor: "#25D366" }}>
                  Confirmar presupuesto por WhatsApp
                </a>
                <a href="tel:+34638109947"
                  className="block w-full text-center py-4 rounded-full font-bold text-sm border-2" style={{ borderColor: "#E53E3E", color: "#E53E3E" }}>
                  📞 Solicitar llamada
                </a>
                <button onClick={() => { setStep(1); setSpace(""); setServices([]); setCameraCount(4); setCity(""); }}
                  className="w-full text-center py-3 text-sm text-gray-400 hover:text-gray-600">
                  Calcular otro presupuesto
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}