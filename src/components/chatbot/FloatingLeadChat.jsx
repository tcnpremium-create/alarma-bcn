import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { base44 } from "@/api/api";

const SERVICES = [
  { label: "📹 Cámaras de seguridad", value: "Cámaras de seguridad" },
  { label: "🔔 Sistema de alarma", value: "Sistema de alarma" },
  { label: "🚪 Control de accesos", value: "Control de accesos" },
  { label: "🏘️ Videovigilancia comunidad", value: "Videovigilancia comunidad" },
  { label: "📦 Pack completo seguridad", value: "Pack completo seguridad" },
];

const OPENING_MSG = "👋 Hola, soy el asistente de Premium Tech Security. ¿Tu hogar o negocio en Barcelona está realmente protegido? Cuéntame qué necesitas y te preparo un presupuesto personalizado ahora mismo.";

export default function FloatingLeadChat() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  const utmSource = new URLSearchParams(window.location.search).get("utm_source") || "";

  useEffect(() => {
    if (utmSource === "instagram" || utmSource === "ig") {
      const t = setTimeout(() => setOpen(true), 3000);
      return () => clearTimeout(t);
    }
  }, [utmSource]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "bot", text: OPENING_MSG }]);
      setStep(1);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, step, done]);

  const selectService = (svc) => {
    setSelectedService(svc.value);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: svc.label },
      { role: "bot", text: `Perfecto, te preparo un presupuesto de ${svc.value} en Barcelona. ¿Cuál es tu nombre y teléfono para contactarte?` },
    ]);
    setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim()) return;
    setSending(true);
    try {
      await base44.entities.LeadChat.create({
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        servicio_interes: selectedService,
        utm_source: utmSource,
        fecha_contacto: new Date().toISOString(),
        procesado: false,
      });
    } catch (err) {
      setSending(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Ha ocurrido un error. Por favor, inténtalo de nuevo." },
      ]);
      return;
    }
    setMessages((prev) => [
      ...prev,
      { role: "user", text: `${nombre} — ${telefono}` },
    ]);
    setSending(false);
    setDone(true);
  };

  const waLink = `https://wa.me/34638109947?text=Hola,%20quiero%20información%20sobre%20${encodeURIComponent(selectedService)}%20en%20Barcelona`;

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 lg:bottom-6 right-4 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          style={{ backgroundColor: "#E63946" }}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">¿Necesitas protección?</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 lg:bottom-6 right-4 z-50 flex flex-col"
          style={{
            width: "min(340px, calc(100vw - 32px))",
            maxHeight: "min(520px, calc(100vh - 100px))",
            borderRadius: 16,
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ backgroundColor: "#1B3A5C" }}
          >
            <span className="text-white font-bold text-sm">Premium Tech Security</span>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto bg-white px-4 py-3 space-y-3" style={{ minHeight: 200 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                  style={
                    m.role === "user"
                      ? { backgroundColor: "#E63946", color: "#fff" }
                      : { backgroundColor: "#f1f1f1", color: "#1a1a1a" }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Step 1: service buttons */}
            {step === 1 && !done && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SERVICES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => selectService(s)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border-2 transition-colors"
                    style={{
                      borderColor: "#E63946",
                      color: "#E63946",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#E63946"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#E63946"; }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: form */}
            {step === 3 && !done && (
              <form onSubmit={handleSubmit} className="space-y-2 pt-1">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/40"
                  required
                />
                <input
                  type="tel"
                  placeholder="Tu teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]/40"
                  required
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white text-sm font-bold transition-opacity disabled:opacity-60"
                  style={{ backgroundColor: "#E63946" }}
                >
                  <Send className="w-4 h-4" />
                  {sending ? "Enviando…" : "Enviar y recibir presupuesto"}
                </button>
              </form>
            )}

            {/* Done */}
            {done && (
              <div className="space-y-3 pt-1">
                <div className="px-3 py-2 rounded-xl text-sm leading-relaxed" style={{ backgroundColor: "#f1f1f1", color: "#1a1a1a" }}>
                  ✅ ¡Gracias! Te llamamos en menos de 24h. También puedes escribirnos directamente:
                </div>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-white font-bold text-sm"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      )}
    </>
  );
}