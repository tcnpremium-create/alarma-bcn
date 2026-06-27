import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/api";

const QUICK_BUTTONS = [
  { emoji: "📹", label: "Quiero cámaras", id: "camaras" },
  { emoji: "🔔", label: "Quiero alarma", id: "alarma" },
  { emoji: "💰", label: "Ver precios", id: "precios" },
  { emoji: "📞", label: "Hablar con un técnico", id: "tecnico" },
];

const SPACE_BUTTONS = [
  { emoji: "🏠", label: "Hogar", id: "hogar" },
  { emoji: "🏢", label: "Negocio", id: "negocio" },
  { emoji: "🏘️", label: "Comunidad", id: "comunidad" },
];

export default function AIChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState("initial"); // initial, camaras_space, alarma_input, done
  const endRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const addBot = (text) => setMessages((prev) => [...prev, { role: "bot", content: text }]);
  const addUser = (text) => setMessages((prev) => [...prev, { role: "user", content: text }]);

  const handleQuick = (id) => {
    if (id === "precios") {
      navigate("/Promociones");
      setOpen(false);
      return;
    }
    if (id === "tecnico") {
      window.location.href = "tel:+34638109947";
      return;
    }
    if (id === "camaras") {
      addUser("📹 Quiero cámaras");
      setTimeout(() => {
        addBot("¡Perfecto! Tenemos kits desde 449€ con instalación incluida. ¿Para qué tipo de espacio?");
        setStep("camaras_space");
      }, 400);
    }
    if (id === "alarma") {
      addUser("🔔 Quiero alarma");
      setTimeout(() => {
        addBot("Nuestras alarmas Ajax parten desde 349€ con instalación incluida y sin cuotas. ¿Cuántos m² tiene tu propiedad aproximadamente?");
        setStep("alarma_input");
      }, 400);
    }
  };

  const handleSpace = (item) => {
    addUser(`${item.emoji} ${item.label}`);
    setTimeout(() => {
      addBot(`Genial, para ${item.label.toLowerCase()} tenemos soluciones desde 449€. Déjanos tu teléfono y un técnico te llamará en menos de 24h con un presupuesto personalizado.`);
      setStep("collect_phone");
    }, 400);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    addUser(text);

    if (step === "alarma_input") {
      setTimeout(() => {
        addBot(`Perfecto, ${text} m² es una propiedad que cubrimos sin problema. Déjanos tu teléfono y un técnico te contactará en menos de 24h.`);
        setStep("collect_phone");
      }, 400);
      return;
    }

    if (step === "collect_phone") {
      try {
        await base44.entities.LeadChat.create({
          nombre: "Chat AI",
          telefono: text,
          servicio_interes: "Consulta desde chatbot AI",
          fecha_contacto: new Date().toISOString(),
        });
      } catch (e) { /* silent */ }
      setTimeout(() => {
        addBot("¡Gracias! Un técnico te contactará en menos de 24h. También puedes llamarnos al 638 10 99 47");
        setStep("done");
        setSubmitted(true);
      }, 400);
      return;
    }

    // Generic text → save as lead
    try {
      await base44.entities.LeadChat.create({
        nombre: "Chat AI",
        telefono: "-",
        servicio_interes: text,
        fecha_contacto: new Date().toISOString(),
      });
    } catch (e) { /* silent */ }
    setTimeout(() => {
      addBot("¡Gracias! Un técnico te contactará en menos de 24h. También puedes llamarnos al 638 10 99 47");
      setStep("done");
      setSubmitted(true);
    }, 400);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed z-[9998] flex items-center justify-center"
          style={{ bottom: 70, right: 20, width: 56, height: 56, borderRadius: "50%", backgroundColor: "#E53E3E", boxShadow: "0 4px 20px rgba(229,62,62,0.4)" }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/><path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>
        </button>
      )}

      {/* Chat modal */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-end justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="relative w-full sm:w-[400px] sm:mr-5 sm:mb-5 bg-white flex flex-col" style={{ borderRadius: "24px 24px 0 0", maxHeight: "70vh", overflow: "hidden" }}>
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between flex-shrink-0">
              <div>
                <h3 className="font-bold text-base text-gray-900">💬 Asistente Premium Tech</h3>
                <p className="text-xs text-gray-400 mt-0.5">Respondo al instante · Presupuesto en 2 min</p>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.length === 0 && (
                <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-600">
                  ¡Hola! 👋 Soy el asistente virtual de Premium Tech Security. ¿En qué puedo ayudarte?
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-[#0A0A1A] text-white" : "bg-gray-100 text-gray-700"}`}>
                    {m.content}
                  </div>
                </div>
              ))}

              {/* Quick buttons */}
              {step === "initial" && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_BUTTONS.map((b) => (
                    <button key={b.id} onClick={() => handleQuick(b.id)} className="px-3 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-[#E53E3E] hover:text-[#E53E3E] transition-colors">
                      {b.emoji} {b.label}
                    </button>
                  ))}
                </div>
              )}

              {step === "camaras_space" && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SPACE_BUTTONS.map((b) => (
                    <button key={b.id} onClick={() => handleSpace(b)} className="px-3 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-[#E53E3E] hover:text-[#E53E3E] transition-colors">
                      {b.emoji} {b.label}
                    </button>
                  ))}
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Input */}
            {!submitted && (
              <div className="px-4 py-3 border-t border-gray-100 flex gap-2 flex-shrink-0">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder={step === "collect_phone" ? "Tu número de teléfono..." : "Escribe tu pregunta..."}
                  className="flex-1 px-4 py-2.5 bg-gray-50 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#E53E3E]/30"
                />
                <button onClick={handleSubmit} className="px-4 py-2.5 bg-[#E53E3E] text-white rounded-full text-sm font-bold hover:bg-[#d32f3c] transition-colors">
                  Enviar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}