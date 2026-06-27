import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Calculator,
  CalendarDays,
  FileText,
  BookOpen,
} from "lucide-react";
import { base44 } from "@/api/api";
import { useLocation } from "react-router-dom";
import CalendarScheduler from "./CalendarScheduler";
import LeadQualification from "./LeadQualification";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !conversation) {
      initConversation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, conversation]);

  useEffect(() => {
    if (!conversation) return;

    const unsubscribe = base44.agents.subscribeToConversation(
      conversation.id,
      (data) => {
        setMessages(data.messages);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [conversation]);

  const initConversation = async () => {
    if (conversation) return conversation;

    try {
      let pageContext = "la web";
      const path = location.pathname;

      if (path.includes("Calculadora")) pageContext = "la calculadora";
      else if (path.includes("Promociones")) pageContext = "nuestras promociones";
      else if (path.includes("Blog")) pageContext = "el blog";
      else if (path.includes("Cornella")) pageContext = "la sección de Cornellà";
      else if (path.includes("SantCugat")) pageContext = "la sección de Sant Cugat";
      else if (path === "/") pageContext = "nuestra página principal";

      const conv = await base44.agents.createConversation({
        agent_name: "chatbot_alarmas",
        metadata: {
          name: "Chat Web",
          source: "website",
          page: path,
        },
      });

      setConversation(conv);

      const welcomeMsg = `¡Hola! 👋 Bienvenido desde ${pageContext}. Soy tu asistente de seguridad.\n\n✨ ¿En qué puedo ayudarte?\n• Calcular presupuesto personalizado\n• Información sobre alarmas y cámaras\n• Agendar llamada o visita técnica\n• Resolver dudas sobre instalación\n• Cobertura en tu zona`;

      setMessages([
        {
          role: "assistant",
          content: welcomeMsg,
          created_at: new Date().toISOString(),
        },
      ]);

      return conv;
    } catch (error) {
      console.error("Error al iniciar conversación:", error);
      return null;
    }
  };

  const sendMessage = async (customMessage = null) => {
    const messageToSend = customMessage || input.trim();
    if (!messageToSend) return;

    // Nos aseguramos de tener conversación antes de enviar
    let conv = conversation;
    if (!conv) {
      conv = await initConversation();
      if (!conv) {
        console.error(
          "No se pudo crear la conversación antes de enviar el mensaje"
        );
        return;
      }
    }

    // Feedback visual inmediato
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: messageToSend,
        created_at: new Date().toISOString(),
      },
    ]);

    setInput("");
    setLoading(true);
    setShowQuickActions(false);

    try {
      await base44.agents.addMessage(conv, {
        role: "user",
        content: messageToSend,
      });

      base44.analytics.track({
        eventName: "chatbot_message_sent",
        properties: { conversation_id: conv.id },
      });
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setLoading(false);
      setMessages((prev) =>
        prev.filter(
          (m) => !(m.role === "user" && m.content === messageToSend)
        )
      );
    }
  };

  const handleWhatsApp = () => {
    const phone = "34638109947";
    const message = encodeURIComponent(
      "Hola, vengo desde la web y me interesa información sobre sistemas de seguridad"
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const handleScheduleAppointment = (data) => {
    setShowCalendar(false);
    setShowQuickActions(false);
    if (data?.message) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `✅ ${data.message}\n\nTe confirmaremos la cita por teléfono. ¿Necesitas algo más?`,
          created_at: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleLeadComplete = (data) => {
    setShowLeadForm(false);
    setShowQuickActions(false);
    if (data?.success && data?.message) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          created_at: new Date().toISOString(),
        },
      ]);
    }
  };

  const quickActions = [
    {
      icon: FileText,
      label: "Solicitar presupuesto",
      action: () => setShowLeadForm(true),
      type: "action",
    },
    {
      icon: CalendarDays,
      label: "Agendar cita",
      action: () => setShowCalendar(true),
      type: "action",
    },
    {
      icon: Calculator,
      label: "Calcular precio",
      message: "Quiero calcular un presupuesto estimado. Por favor hazme las preguntas necesarias: ¿Es para hogar o negocio? ¿Cuántas estancias o m²? ¿Necesito cámaras también? ¿Qué zona de Barcelona?",
      type: "message",
    },
    {
      icon: BookOpen,
      label: "Ver Catálogo",
      action: () => { window.location.href = "/SistemasAlarma"; },
      type: "action",
    },
    {
      icon: WhatsAppIcon,
      label: "Escribir por WhatsApp",
      action: handleWhatsApp,
      type: "action",
    },
  ];

  const HEADER_BUTTON_SIZE = 64;

  return (
    <>
      {/* Botón flotante del chat */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ touchAction: "manipulation" }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 sm:w-14 sm:h-14 bg-[#E63946] hover:bg-[#d32f3c] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <X className="w-7 h-7 sm:w-6 sm:h-6" />
        ) : (
          <MessageCircle className="w-7 h-7 sm:w-6 sm:h-6" />
        )}
      </motion.button>

      {/* Ventana de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[90vw] max-w-md h-[calc(100vh-150px)] sm:h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
            style={{ maxHeight: `calc(100vh - ${HEADER_BUTTON_SIZE + 40}px)` }}
          >
            {/* Header */}
            <div className="bg-[#0A1628] text-white p-4 flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#E63946] flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Asistente Virtual</h3>
                <p className="text-xs text-white/60">Premium Tech Security</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="sm:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg.white/10"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {showLeadForm && (
                <div className="mb-4">
                  <LeadQualification onComplete={handleLeadComplete} />
                </div>
              )}

              {showCalendar && (
                <div className="mb-4">
                  <CalendarScheduler
                    onSchedule={handleScheduleAppointment}
                    onClose={() => setShowCalendar(false)}
                  />
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      msg.role === "user"
                        ? "bg-[#0A1628] text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}

              {showQuickActions && messages.length <= 1 && !loading && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs text-gray-500 text-center mb-3">
                    Acciones rápidas:
                  </p>
                  {quickActions.map((action, idx) => {
                    const Icon =
                      typeof action.icon === "function" &&
                      action.icon.name === "WhatsAppIcon"
                        ? action.icon
                        : action.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() =>
                          action.type === "action"
                            ? action.action()
                            : sendMessage(action.message)
                        }
                        style={{
                          WebkitTapHighlightColor: "transparent",
                          touchAction: "manipulation",
                        }}
                        className={`w-full flex items-center gap-3 bg-white border rounded-xl px-4 py-3 text.left transition-all group active:scale-95 ${
                          action.label === "Escribir por WhatsApp"
                            ? "border-[#25D366] bg-[#25D366]/5 hover:bg-[#25D366]/10"
                            : "border-gray-200 hover:border-[#E63946] hover:bg-[#E63946]/5"
                        }`}
                      >
                        {typeof Icon === "function" ? (
                          <Icon
                            className={`w-5 h-5 flex-shrink-0 ${
                              action.label === "Escribir por WhatsApp"
                                ? "text-[#25D366]"
                                : "text-gray-400 group-hover:text-[#E63946]"
                            }`}
                          />
                        ) : (
                          <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#E63946] flex-shrink-0" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            action.label === "Escribir por WhatsApp"
                              ? "text-[#25D366]"
                              : "text-gray-700 group-hover:text-[#E63946]"
                          }`}
                        >
                          {action.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!loading && input.trim()) sendMessage();
              }}
              className="p-3 sm:p-4 border-t border-gray-200 bg-white flex-shrink-0 flex gap-2 items-end"
            >
              <textarea
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (!loading && input.trim()) sendMessage();
                  }
                }}
                disabled={loading}
                rows={1}
                maxLength={500}
                autoComplete="off"
                autoCorrect="on"
                spellCheck="true"
                enterKeyHint="send"
                style={{
                  resize: "none",
                  minHeight: 48,
                  maxHeight: 120,
                  touchAction: "manipulation",
                  WebkitAppearance: "none",
                  fontSize: 16,
                  lineHeight: "1.5",
                }}
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => { if (!loading && input.trim()) sendMessage(); }}
                disabled={loading || !input.trim()}
                // si quieres que no deje enviar hasta tener conversación, añade: || !conversation
                aria-label="Enviar mensaje"
                style={{
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                  flexShrink: 0,
                  width: 48,
                  height: 48,
                }}
                className={`rounded-xl flex items-center justify-center transition-all active:scale-95 ${
                  loading || !input.trim()
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#E63946] hover:bg-[#d32f3c] text-white shadow-md"
                }`}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;