import React, { useState } from "react";
import {
  Home, Building2, Store, Warehouse, DoorOpen, Trees, AppWindow, Package,
  ShieldCheck, Camera, Bell, Fingerprint, Rocket, CalendarClock, CalendarSearch,
  Loader2, X, ChevronLeft, Check, User, Phone, Mail, MapPin,
} from "lucide-react";
import { LeadAPI } from "@/api/api";

const STEP1_OPTIONS = [
  { id: "piso", label: "Piso / Ático", icon: Building2 },
  { id: "casa", label: "Casa unifamiliar / Chalet", icon: Home },
  { id: "local", label: "Local Comercial / Negocio", icon: Store },
  { id: "nave", label: "Nave Industrial / Oficina", icon: Warehouse },
];

const STEP2_OPTIONS = [
  { id: "acceso_calle", label: "Acceso directo desde la calle o portal", icon: DoorOpen },
  { id: "terrazas", label: "Terrazas, patios traseros o balcones", icon: Trees },
  { id: "ventanas", label: "Ventanas bajas o zonas colindantes", icon: AppWindow },
  { id: "stock", label: "Almacenamiento de stock o herramientas de valor", icon: Package },
];

const STEP3_OPTIONS = [
  { id: "alarma", label: "Sistema de Alarma Inteligente (Sin cuotas)", icon: ShieldCheck },
  { id: "camaras", label: "Cámaras de Videovigilancia 4K (Control móvil)", icon: Camera },
  { id: "integral", label: "Sistema Integral (Alarma + Cámaras)", icon: Bell },
  { id: "accesos", label: "Control de Accesos / Videoportero", icon: Fingerprint },
];

const STEP4_OPTIONS = [
  { id: "inmediato", label: "Inmediatamente (Problema actual / Entrega de llaves)", icon: Rocket },
  { id: "2semanas", label: "En las próximas 2 semanas", icon: CalendarClock },
  { id: "comparando", label: "Estoy comparando opciones / Obra futura", icon: CalendarSearch },
];

const MUNICIPIOS = [
  "Barcelona", "Badalona", "Hospitalet de Llobregat", "Sabadell", "Terrassa", "Mataró",
  "Sant Cugat del Vallès", "Cornellà de Llobregat", "El Prat de Llobregat", "Castelldefels",
  "Viladecans", "Girona", "Tarragona", "Lleida", "Otro municipio",
];

const TIPO_CLIENTE_MAP = { piso: "hogar", casa: "hogar", local: "negocio", nave: "nave" };
const URGENCIA_MAP = { inmediato: "urgente", "2semanas": "alta", comparando: "media" };
const SERVICIO_MAP = {
  alarma: "Sistema de Alarma Inteligente (Sin cuotas)",
  camaras: "Cámaras de Videovigilancia 4K (Control móvil)",
  integral: "Sistema Integral (Alarma + Cámaras)",
  accesos: "Control de Accesos / Videoportero",
};

const TOTAL_STEPS = 4;

const iconInsideStyle = { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#64748B", pointerEvents: "none" };
const inputStyle = { width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "13px 16px 13px 40px", fontSize: 14, color: "#F1F5F9", outline: "none" };
const backBtnStyle = { display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "10px 18px", color: "#94A3B8", fontSize: 13, fontWeight: 600, cursor: "pointer" };
const nextBtnStyle = { flex: 1, background: "#E53E3E", border: "none", borderRadius: 50, padding: "12px 18px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" };
const submitBtnStyle = { width: "100%", background: "#E53E3E", color: "#fff", fontWeight: 700, fontSize: 14.5, borderRadius: 50, padding: "16px 0", border: "none", cursor: "pointer", boxShadow: "0 0 32px rgba(229,62,62,0.3)" };

function QuizStep({ title, subtitle, options, selected, onSelect, multi }) {
  return (
    <div>
      <h3 style={{ color: "#fff", fontSize: 19, fontWeight: 900, margin: "0 0 6px", lineHeight: 1.35 }}>{title}</h3>
      <p style={{ color: "#E53E3E", fontSize: 12.5, fontWeight: 700, margin: "0 0 18px", minHeight: 16 }}>{subtitle || ""}</p>
      <div className="quiz-options-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {options.map((opt) => {
          const isSelected = selected.includes(opt.id);
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10,
                textAlign: "left", padding: "18px 16px", borderRadius: 14,
                border: isSelected ? "2px solid #E53E3E" : "1px solid rgba(255,255,255,0.1)",
                background: isSelected ? "rgba(229,62,62,0.1)" : "rgba(255,255,255,0.03)",
                cursor: "pointer", transition: "all 0.2s ease", position: "relative",
              }}
            >
              {multi && (
                <div style={{
                  position: "absolute", top: 12, right: 12, width: 18, height: 18, borderRadius: 5,
                  border: isSelected ? "none" : "1.5px solid rgba(255,255,255,0.25)",
                  background: isSelected ? "#E53E3E" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {isSelected && <Check size={12} color="#fff" strokeWidth={3} />}
                </div>
              )}
              <Icon size={22} color={isSelected ? "#E53E3E" : "#94A3B8"} />
              <span style={{ color: isSelected ? "#fff" : "#CBD5E0", fontSize: 13.5, fontWeight: 700, lineHeight: 1.4 }}>{opt.label}</span>
            </button>
          );
        })}
      </div>
      <style>{`
        @media (max-width: 520px) {
          .quiz-options-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function FieldWithIcon({ icon: Icon, value, onChange, ...rest }) {
  return (
    <div style={{ position: "relative" }}>
      <Icon size={16} style={iconInsideStyle} />
      <input value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} {...rest} />
    </div>
  );
}

export default function SecurityQuizModal({ open, onClose }) {
  const [step, setStep] = useState(1); // 1-4 preguntas, 5 loading, 6 formulario, 7 éxito
  const [answers, setAnswers] = useState({ propiedad: null, vulnerabilidades: [], tecnologia: null, urgencia: null });
  const [form, setForm] = useState({ nombre: "", municipio: "", telefono: "", email: "" });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const reset = () => {
    setStep(1);
    setAnswers({ propiedad: null, vulnerabilidades: [], tecnologia: null, urgencia: null });
    setForm({ nombre: "", municipio: "", telefono: "", email: "" });
    setFormError("");
    setSubmitting(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const selectSingle = (field, value, nextStep) => {
    setAnswers((a) => ({ ...a, [field]: value }));
    setStep(nextStep);
  };

  const toggleMulti = (value) => {
    setAnswers((a) => ({
      ...a,
      vulnerabilidades: a.vulnerabilidades.includes(value)
        ? a.vulnerabilidades.filter((v) => v !== value)
        : [...a.vulnerabilidades, value],
    }));
  };

  const goToLoading = () => {
    setStep(5);
    setTimeout(() => setStep(6), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) { setFormError("Indica tu nombre completo."); return; }
    if (!form.municipio) { setFormError("Selecciona el municipio de la instalación."); return; }
    const phoneClean = form.telefono.replace(/\s/g, "");
    if (!/^(\+?34)?[6789]\d{8}$/.test(phoneClean)) { setFormError("Introduce un teléfono válido (9 dígitos)."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) { setFormError("Introduce un email válido."); return; }

    setFormError("");
    setSubmitting(true);
    try {
      const vulnLabels = STEP2_OPTIONS.filter((o) => answers.vulnerabilidades.includes(o.id)).map((o) => o.label);
      const propiedadLabel = STEP1_OPTIONS.find((o) => o.id === answers.propiedad)?.label || "";
      const urgenciaLabel = STEP4_OPTIONS.find((o) => o.id === answers.urgencia)?.label || "";

      await LeadAPI.create({
        nombre: form.nombre.trim(),
        telefono: phoneClean,
        email: form.email.trim(),
        zona: form.municipio,
        tipo_cliente: TIPO_CLIENTE_MAP[answers.propiedad] || "hogar",
        servicio_interes: SERVICIO_MAP[answers.tecnologia] || "",
        urgencia: URGENCIA_MAP[answers.urgencia] || "media",
        mensaje: `[Cuestionario web] Propiedad: ${propiedadLabel}. Vulnerabilidades: ${vulnLabels.join(", ") || "no especificadas"}. Urgencia: ${urgenciaLabel}.`,
        origen: "formulario_web",
      });
      setStep(7);
    } catch (err) {
      setFormError("No se ha podido enviar. Inténtalo de nuevo o llama al 638 10 99 47.");
    } finally {
      setSubmitting(false);
    }
  };

  const progress = step <= TOTAL_STEPS ? (step / TOTAL_STEPS) * 100 : 100;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(2,6,9,0.85)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#0A1120", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, maxWidth: 620, width: "100%", maxHeight: "92vh", overflowY: "auto", position: "relative", boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}
      >
        <button onClick={handleClose} aria-label="Cerrar" style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 5 }}>
          <X size={18} color="#94A3B8" />
        </button>

        {step <= TOTAL_STEPS && (
          <div style={{ padding: "28px 28px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#E53E3E", letterSpacing: "0.08em", textTransform: "uppercase" }}>Paso {step} de {TOTAL_STEPS}</span>
              <span style={{ fontSize: 11, color: "#64748B" }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 100, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #E53E3E, #FF6B6B)", borderRadius: 100, transition: "width 0.4s ease" }} />
            </div>
          </div>
        )}

        <div style={{ padding: 28 }}>
          {step === 1 && (
            <QuizStep
              title="¿Qué tipo de propiedad deseas proteger en Barcelona o provincia?"
              options={STEP1_OPTIONS}
              selected={answers.propiedad ? [answers.propiedad] : []}
              onSelect={(id) => selectSingle("propiedad", id, 2)}
            />
          )}

          {step === 2 && (
            <>
              <QuizStep
                title="¿Cuál es la mayor vulnerabilidad de la propiedad?"
                subtitle="Selección múltiple — elige todas las que apliquen"
                options={STEP2_OPTIONS}
                selected={answers.vulnerabilidades}
                multi
                onSelect={toggleMulti}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button type="button" onClick={() => setStep(1)} style={backBtnStyle}><ChevronLeft size={16} /> Atrás</button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={answers.vulnerabilidades.length === 0}
                  style={{ ...nextBtnStyle, opacity: answers.vulnerabilidades.length === 0 ? 0.4 : 1, cursor: answers.vulnerabilidades.length === 0 ? "not-allowed" : "pointer" }}
                >
                  Continuar
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <QuizStep
                title="¿Qué tipo de seguridad estás buscando prioritariamente?"
                options={STEP3_OPTIONS}
                selected={answers.tecnologia ? [answers.tecnologia] : []}
                onSelect={(id) => selectSingle("tecnologia", id, 4)}
              />
              <button type="button" onClick={() => setStep(2)} style={{ ...backBtnStyle, marginTop: 20 }}><ChevronLeft size={16} /> Atrás</button>
            </>
          )}

          {step === 4 && (
            <>
              <QuizStep
                title="¿Cuándo necesitas tener el sistema instalado y operativo?"
                options={STEP4_OPTIONS}
                selected={answers.urgencia ? [answers.urgencia] : []}
                onSelect={(id) => { setAnswers((a) => ({ ...a, urgencia: id })); goToLoading(); }}
              />
              <button type="button" onClick={() => setStep(3)} style={{ ...backBtnStyle, marginTop: 20 }}><ChevronLeft size={16} /> Atrás</button>
            </>
          )}

          {step === 5 && (
            <div style={{ textAlign: "center", padding: "48px 12px" }}>
              <Loader2 size={40} color="#E53E3E" style={{ animation: "quiz-spin 1s linear infinite" }} />
              <style>{`@keyframes quiz-spin { to { transform: rotate(360deg); } }`}</style>
              <p style={{ color: "#F1F5F9", fontSize: 16, fontWeight: 700, marginTop: 24, lineHeight: 1.6 }}>
                Analizando vulnerabilidades y calculando propuesta personalizada para Barcelona...
              </p>
            </div>
          )}

          {step === 6 && (
            <form onSubmit={handleSubmit}>
              <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 900, margin: "0 0 6px" }}>¡Ya casi está! Últimos datos</h3>
              <p style={{ color: "#94A3B8", fontSize: 13, margin: "0 0 24px" }}>Un técnico local te llamará con tu propuesta personalizada sin cuotas.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <FieldWithIcon icon={User} placeholder="Nombre completo" value={form.nombre} onChange={(v) => setForm((f) => ({ ...f, nombre: v }))} />
                <div style={{ position: "relative" }}>
                  <MapPin size={16} style={iconInsideStyle} />
                  <select
                    value={form.municipio}
                    onChange={(e) => setForm((f) => ({ ...f, municipio: e.target.value }))}
                    style={{ ...inputStyle, appearance: "none", color: form.municipio ? "#F1F5F9" : "#64748B" }}
                  >
                    <option value="" disabled>Municipio de la instalación</option>
                    {MUNICIPIOS.map((m) => <option key={m} value={m} style={{ color: "#000" }}>{m}</option>)}
                  </select>
                </div>
                <FieldWithIcon icon={Phone} type="tel" placeholder="Teléfono de contacto" value={form.telefono} onChange={(v) => setForm((f) => ({ ...f, telefono: v }))} />
                <FieldWithIcon icon={Mail} type="email" placeholder="Email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
              </div>

              {formError && <p style={{ color: "#FCA5A5", fontSize: 13, marginTop: 14 }}>{formError}</p>}

              <button type="submit" disabled={submitting} style={{ ...submitBtnStyle, opacity: submitting ? 0.7 : 1, marginTop: 22 }}>
                {submitting ? "Enviando..." : "Obtener mi Presupuesto Sin Cuotas y Reservar Estudio Gratis"}
              </button>
            </form>
          )}

          {step === 7 && (
            <div style={{ textAlign: "center", padding: "32px 12px" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.35)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <Check size={28} color="#22C55E" />
              </div>
              <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 900, margin: "0 0 10px" }}>¡Estudio de seguridad reservado!</h3>
              <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.7, margin: "0 0 24px" }}>
                Un técnico local te llamará en menos de 24h con tu propuesta sin cuotas para {form.municipio || "tu zona"}.
              </p>
              <button type="button" onClick={handleClose} style={submitBtnStyle}>Cerrar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
