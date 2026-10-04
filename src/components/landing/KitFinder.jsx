import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, animate, useReducedMotion } from "framer-motion";
import { ArrowLeft, CheckCircle2, MessageCircle, RotateCcw } from "lucide-react";

const fmt = new Intl.NumberFormat("es-ES", { useGrouping: "always" });
const toNumber = (price) => Number(String(price).replace(/\./g, ""));

// El precio "sube" desde 0 hasta su valor al aparecer el resultado. Con
// "reducir movimiento" activado en el sistema se muestra directamente.
function AnimatedPrice({ value }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (reduce) { setN(value); return undefined; }
    const controls = animate(0, value, { duration: 0.8, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [value, reduce]);
  return <>{fmt.format(n)}</>;
}

/**
 * Buscador interactivo de kit: hace 3 preguntas rápidas y recomienda el kit
 * adecuado con su precio real (los datos vienen de cameraKits.js /
 * alarmKits.js, nunca se calcula un precio nuevo).
 *
 * Props:
 * - title / subtitle: cabecera de la tarjeta
 * - steps: [{ id, question, options: [{ value, label, hint }] }]
 * - recommend(answers): { kit, reasons: string[], notes?: string[] }
 * - kitSubtitle(kit): texto corto bajo el nombre del kit
 * - onRecommend(kitId): para resaltar la tarjeta del kit en la cuadrícula
 * - onRequestQuote(kit): abre el formulario de presupuesto
 * - whatsappMessage(kit, answers): mensaje precargado para WhatsApp
 * - disclaimer: aviso de precio orientativo
 */
export default function KitFinder({ title, subtitle, steps, recommend, kitSubtitle, onRecommend, onRequestQuote, whatsappMessage, disclaimer }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const choose = (stepId, value) => {
    const next = { ...answers, [stepId]: value };
    setAnswers(next);
    if (step === steps.length - 1) {
      const r = recommend(next);
      setResult(r);
      onRecommend?.(r.kit.id);
    } else {
      setStep(step + 1);
    }
  };

  const back = () => {
    if (result) { setResult(null); onRecommend?.(null); return; }
    if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setStep(0); setAnswers({}); setResult(null); onRecommend?.(null);
  };

  const slide = reduce
    ? { initial: false, animate: {}, exit: {} }
    : { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 }, transition: { duration: 0.22 } };

  const current = steps[step];
  const waLink = result
    ? `https://wa.me/34638109947?text=${encodeURIComponent(whatsappMessage(result.kit, answers))}`
    : null;

  return (
    <div
      style={{
        maxWidth: 720, margin: "0 auto 40px",
        background: "linear-gradient(160deg, rgba(229,62,62,0.10), rgba(255,255,255,0.03))",
        border: "1px solid rgba(229,62,62,0.35)", borderRadius: 20, padding: "26px 22px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <h3 style={{ color: "#F1F5F9", fontSize: 20, fontWeight: 900, margin: "0 0 4px" }}>{title}</h3>
        <p style={{ color: "#94A3B8", fontSize: 13, margin: 0 }}>{subtitle}</p>
      </div>

      {!result && (
        <div aria-hidden="true" style={{ display: "flex", gap: 6, marginBottom: 18 }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? "#E53E3E" : "rgba(255,255,255,0.12)", transition: "background 0.3s ease" }} />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {!result ? (
          <motion.div key={`q-${step}`} {...slide}>
            <p style={{ color: "#fff", fontSize: 16, fontWeight: 800, margin: "0 0 12px" }}>
              <span style={{ color: "#E53E3E" }}>{step + 1}/{steps.length}</span> · {current.question}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {current.options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => choose(current.id, o.value)}
                  style={{
                    textAlign: "left", background: answers[current.id] === o.value ? "rgba(229,62,62,0.18)" : "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12, padding: "14px 16px",
                    color: "#F1F5F9", cursor: "pointer", transition: "border-color 0.2s ease, background 0.2s ease",
                  }}
                  className="kitfinder-option"
                >
                  <span style={{ display: "block", fontSize: 15, fontWeight: 800 }}>{o.label}</span>
                  {o.hint && <span style={{ display: "block", fontSize: 12.5, color: "#94A3B8", marginTop: 2 }}>{o.hint}</span>}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button type="button" onClick={back} style={{ marginTop: 14, background: "none", border: "none", color: "#94A3B8", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <ArrowLeft size={14} /> Volver
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div key="result" {...slide} aria-live="polite">
            <p style={{ color: "#E53E3E", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 6px" }}>
              Te recomendamos
            </p>
            <h4 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 2px" }}>{result.kit.title}</h4>
            <p style={{ color: "#94A3B8", fontSize: 13, margin: "0 0 14px" }}>{kitSubtitle(result.kit)}</p>

            <div style={{ marginBottom: 14 }}>
              <span style={{ color: "#94A3B8", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginRight: 8 }}>
                {result.kit.isFrom ? "Desde" : "Precio"}
              </span>
              <span style={{ color: "#E53E3E", fontSize: 40, fontWeight: 900, letterSpacing: "-0.02em" }}>
                <AnimatedPrice value={toNumber(result.kit.price)} /> €
              </span>
              <span style={{ color: "#64748B", fontSize: 12, marginLeft: 6 }}>+ IVA</span>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 14px", display: "flex", flexDirection: "column", gap: 8 }}>
              {result.reasons.map((r) => (
                <li key={r} style={{ display: "flex", gap: 8, color: "#CBD5E0", fontSize: 13.5, lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#22C55E" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            {(result.notes || []).map((n) => (
              <p key={n} style={{ color: "#94A3B8", fontSize: 12.5, lineHeight: 1.5, margin: "0 0 8px" }}>{n}</p>
            ))}

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              <button
                type="button"
                onClick={() => onRequestQuote(result.kit)}
                style={{ backgroundColor: "#E53E3E", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: 15, border: "none", cursor: "pointer" }}
              >
                Pedir presupuesto de este kit →
              </button>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ border: "2px solid rgba(255,255,255,0.3)", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: 50, padding: 13, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                <MessageCircle size={17} /> Consultarlo por WhatsApp
              </a>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
              <button type="button" onClick={back} style={{ background: "none", border: "none", color: "#94A3B8", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <ArrowLeft size={14} /> Cambiar respuesta
              </button>
              <button type="button" onClick={reset} style={{ background: "none", border: "none", color: "#94A3B8", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <RotateCcw size={14} /> Empezar de nuevo
              </button>
            </div>
            {disclaimer && <p style={{ color: "#64748B", fontSize: 11, lineHeight: 1.5, margin: "12px 0 0" }}>{disclaimer}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`.kitfinder-option:hover { border-color: rgba(229,62,62,0.7) !important; background: rgba(229,62,62,0.12) !important; }`}</style>
    </div>
  );
}
