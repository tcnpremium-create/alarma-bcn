import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Gift, ShieldCheck, TicketPercent } from "lucide-react";
import { useLeadDrawer } from "@/context/LeadDrawerContext";
import { trackEvent } from "@/lib/analytics";

const START = Date.parse("2026-11-23T00:00:00+01:00");
const END = Date.parse("2026-11-30T00:00:00+01:00");
const CENTERS = [4.5, 94.5, 184.5, 274.5];
const isCampaignActive = () => Date.now() >= START && Date.now() < END;

const fieldStyle = {
  width: "100%", minHeight: 45, padding: "11px 13px", borderRadius: 10,
  background: "#0a1427", border: "1px solid #45536c", color: "#fff", fontSize: 16,
  boxSizing: "border-box",
};
const labelStyle = { display: "block", marginBottom: 5, color: "#e2e8f0", fontSize: 13, fontWeight: 700 };

function Roulette({ rotation, spinning }) {
  return (
    <div style={{ position: "relative", width: "min(310px, 80vw)", margin: "18px auto 12px" }}
      aria-label="Ruleta de cuatro sectores: dos sectores pequeños del 10 % de descuento, y dos sectores grandes sin premio."
      role="img">
      <div style={{
        position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", zIndex: 2,
        width: 0, height: 0, borderLeft: "14px solid transparent",
        borderRight: "14px solid transparent", borderTop: "29px solid #fff",
        filter: "drop-shadow(0 2px 3px rgba(0,0,0,.6))",
      }} />
      <div style={{
        width: "100%", aspectRatio: "1", borderRadius: "50%",
        border: "8px solid #f8fafc", boxSizing: "border-box",
        boxShadow: "0 10px 42px rgba(0,0,0,.35), 0 0 0 4px #d97706",
        background: "conic-gradient(#f59e0b 0deg 9deg, #1d3558 9deg 180deg, #f59e0b 180deg 189deg, #334155 189deg 360deg)",
        position: "relative",
        transform: `rotate(${rotation}deg)`,
        transition: spinning ? "transform 4.4s cubic-bezier(.15,.7,.12,1)" : "none",
      }}>
        <span style={{ position: "absolute", top: "3%", left: "52%", fontSize: 10, fontWeight: 900, color: "#0f172a", transform: "rotate(5deg)" }}>10%</span>
        <span style={{ position: "absolute", bottom: "3%", left: "44%", fontSize: 10, fontWeight: 900, color: "#0f172a", transform: "rotate(5deg)" }}>10%</span>
        <span style={{ position: "absolute", top: "47%", left: "62%", fontSize: 13, fontWeight: 800, color: "#fff", textAlign: "center" }}>Sin suerte</span>
        <span style={{ position: "absolute", top: "47%", right: "62%", fontSize: 13, fontWeight: 800, color: "#fff", textAlign: "center" }}>Sin suerte</span>
        <div style={{
          position: "absolute", width: 41, height: 41, borderRadius: "50%", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", background: "#f8fafc", border: "6px solid #d97706",
          boxShadow: "0 2px 12px #101b35",
        }} />
      </div>
    </div>
  );
}

export default function BlackFridayWheel() {
  const { openDrawer } = useLeadDrawer();
  const [active] = useState(isCampaignActive);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", privacyAccepted: false, marketingOptIn: false, website: "" });
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [shown, setShown] = useState(null);
  const [error, setError] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);
  const set = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting || spinning || shown || !active) return;
    setSubmitting(true);
    setError("");
    trackEvent("form_submit", { form_name: "ruleta_black_friday", service: "seguridad" });
    try {
      const response = await fetch("/api/black-friday", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.success) throw new Error(payload.error || "No ha sido posible registrar tu participación.");
      if (!Number.isInteger(payload.sector) || payload.sector < 0 || payload.sector > 3) {
        throw new Error("Respuesta de participación no válida.");
      }
      setResult(payload);
      trackEvent("form_success", { form_name: "ruleta_black_friday", service: "seguridad", duplicate: !!payload.alreadyPlayed });
      if (payload.alreadyPlayed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setRotation(360 - CENTERS[payload.sector]);
        setShown(payload);
      } else {
        setSpinning(true);
        setRotation(360 * 6 + (360 - CENTERS[payload.sector]));
        timeoutRef.current = setTimeout(() => {
          setSpinning(false);
          setShown(payload);
        }, 4500);
      }
    } catch (err) {
      setError(err.message || "No se ha podido conectar. Inténtalo más tarde.");
      trackEvent("form_error", { form_name: "ruleta_black_friday", error_kind: "request" });
    } finally {
      setSubmitting(false);
    }
  }

  const isBlocked = submitting || spinning || Boolean(shown);
  return (
    <section id="black-friday" style={{
      maxWidth: 1130, margin: "0 auto", padding: "35px 20px 50px",
      scrollMarginTop: 100,
    }}>
      <div style={{
        background: "linear-gradient(130deg,#101b2e,#172746 65%,#422c0b)",
        border: "1px solid rgba(245,158,11,.55)", borderRadius: 22,
        padding: "clamp(20px,4vw,38px)", boxShadow: "0 15px 40px rgba(0,0,0,.18)",
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#fbbf24", textTransform: "uppercase", fontWeight: 900, letterSpacing: ".12em", margin: "0 0 10px", fontSize: 12 }}>
            Premium Tech Security · Tablón de anuncios
          </p>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(25px,4vw,38px)", margin: "0 0 10px" }}>
            <Gift size={28} style={{ display: "inline", verticalAlign: "middle", marginRight: 9, color: "#fbbf24" }} />
            Black Friday: gira y gana
          </h2>
          <p style={{ color: "#cbd5e1", lineHeight: 1.6, maxWidth: 700, margin: "0 auto" }}>
            Regístrate en nuestro tablón de promociones y prueba suerte. Solo los ganadores de la ruleta
            podrán obtener un descuento del 10 % en nuestros kits de alarmas y cámaras.
          </p>
          <p style={{ color: "#fde68a", fontWeight: 700, fontSize: 13, margin: "12px auto 0" }}>
            Del 23 al 29 de noviembre de 2026 · 1 intento por teléfono · 5 % de probabilidad de premio
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,290px),1fr))", gap: 30, marginTop: 26, alignItems: "center" }}>
          <div style={{ textAlign: "center", minWidth: 0 }}>
            <Roulette rotation={rotation} spinning={spinning} />
            <p style={{ fontSize: 12, color: "#cbd5e1", margin: "20px 0 0" }}>
              <span style={{ color: "#fbbf24", fontWeight: 800 }}>Amarillo:</span> 2 sectores de 2,5 % (premio 10 %)
              {" · "}<span style={{ fontWeight: 800 }}>Azul:</span> 2 sectores de 47,5 % (sin premio)
            </p>
          </div>
          <div style={{ minWidth: 0 }}>
            {!active ? (
              <div style={{ background: "#0b1628", borderRadius: 14, padding: 22, color: "#e2e8f0" }}>
                <h3 style={{ margin: "0 0 10px", color: "#fff" }}>Promoción finalizada</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6 }}>El plazo para participar ha terminado. Consulta nuestras ofertas actuales.</p>
                <a href="tel:+34638109947" style={{ color: "#fbbf24", fontWeight: 800 }}>Llámanos para pedir presupuesto</a>
              </div>
            ) : shown ? (
              <div style={{ background: "#0b1628", borderRadius: 14, padding: 23, border: "1px solid #475569" }} role="status" aria-live="polite">
                <ShieldCheck size={32} color="#fbbf24" />
                <h3 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "10px 0" }}>
                  {shown.won ? "¡Enhorabuena! Tienes un 10 % de descuento" : "Lo sentimos, no has tenido suerte"}
                </h3>
                <p style={{ color: "#cbd5e1", lineHeight: 1.6, fontSize: 14 }}>
                  {shown.alreadyPlayed ? "Este teléfono ya ha participado y este es su resultado registrado. " : "Tu participación ha quedado registrada. "}
                  {shown.won
                    ? "Para canjear el premio, indica tu código al solicitar presupuesto."
                    : "Gracias por participar. También podemos prepararte un presupuesto ajustado a tus necesidades."}
                </p>
                {shown.won && <div style={{ padding: 14, borderRadius: 12, background: "#422006", color: "#fef3c7", fontWeight: 900, fontSize: 20, marginBottom: 16, letterSpacing: ".05em" }}>{shown.code}</div>}
                <button type="button" onClick={() => openDrawer(shown.won ? `Black Friday · Código ${shown.code}` : "Presupuesto de alarma o cámaras")} style={{
                  border: 0, padding: "13px 16px", borderRadius: 10, width: "100%",
                  background: "#d97706", color: "#fff", fontWeight: 850, cursor: "pointer",
                }}>Solicitar presupuesto</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: "#0b1628", borderRadius: 15, padding: "clamp(18px,3vw,26px)", border: "1px solid #41516e" }}>
                <h3 style={{ color: "#fff", fontWeight: 900, fontSize: 19, margin: "0 0 17px" }}>Regístrate para girar la ruleta</h3>
                <div style={{ marginBottom: 13 }}>
                  <label htmlFor="bf-nombre" style={labelStyle}>Nombre y apellidos</label>
                  <input id="bf-nombre" required minLength={2} maxLength={120} autoComplete="name" style={fieldStyle} value={form.nombre} onChange={e => set("nombre", e.target.value)} />
                </div>
                <div style={{ marginBottom: 13 }}>
                  <label htmlFor="bf-telefono" style={labelStyle}>Teléfono</label>
                  <input id="bf-telefono" required type="tel" inputMode="tel" maxLength={40} autoComplete="tel" style={fieldStyle} value={form.telefono} onChange={e => set("telefono", e.target.value)} placeholder="6XX XXX XXX" />
                </div>
                <div style={{ marginBottom: 13 }}>
                  <label htmlFor="bf-email" style={labelStyle}>Correo electrónico</label>
                  <input id="bf-email" required type="email" maxLength={200} autoComplete="email" style={fieldStyle} value={form.email} onChange={e => set("email", e.target.value)} />
                </div>
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
                  <label htmlFor="bf-web">Página web (dejar en blanco)</label>
                  <input id="bf-web" tabIndex={-1} autoComplete="off" value={form.website} onChange={e => set("website", e.target.value)} />
                </div>
                <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 17, cursor: "pointer", color: "#e2e8f0", fontSize: 12.5, lineHeight: 1.5 }}>
                  <input type="checkbox" checked={form.privacyAccepted} onChange={e => set("privacyAccepted", e.target.checked)} required style={{ marginTop: 3 }} />
                  <span>He leído las <a href="#bf-condiciones" style={{ color: "#fbbf24" }}>condiciones</a> y la <Link to="/Privacidad" style={{ color: "#fbbf24" }}>política de privacidad</Link>.</span>
                </label>
                <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 12, cursor: "pointer", color: "#e2e8f0", fontSize: 12.5, lineHeight: 1.5 }}>
                  <input type="checkbox" checked={form.marketingOptIn} onChange={e => set("marketingOptIn", e.target.checked)} style={{ marginTop: 3 }} />
                  <span>Quiero recibir avisos de nuevas ofertas por correo electrónico (opcional; puedo solicitar la baja cuando quiera).</span>
                </label>
                {error && <p role="alert" style={{ color: "#fecaca", fontSize: 13, marginTop: 12 }}>{error}</p>}
                <button type="submit" disabled={isBlocked} style={{
                  width: "100%", borderRadius: 11, border: 0, marginTop: 19,
                  padding: "14px 18px", fontSize: 16, fontWeight: 900,
                  background: "#d97706", color: "#fff", cursor: isBlocked ? "wait" : "pointer", opacity: isBlocked ? .6 : 1,
                }}>
                  {submitting ? "Guardando participación…" : spinning ? "Girando…" : "Registrarme y girar"}
                </button>
                {spinning && result && <p aria-live="polite" style={{ color: "#e2e8f0", fontSize: 13 }}>La ruleta está girando. Tu resultado ya está registrado.</p>}
              </form>
            )}
          </div>
        </div>
        <div id="bf-condiciones" style={{ borderTop: "1px solid #475569", paddingTop: 18, marginTop: 24, fontSize: 12.5, color: "#cbd5e1", lineHeight: 1.7 }}>
          <strong style={{ color: "#fff" }}>Condiciones:</strong> participación gratuita, sin compra obligatoria, del 23 al 29/11/2026 (hora peninsular).
          Una tirada por número de teléfono, resultado aleatorio decidido y guardado en el servidor. Probabilidad real de ganar: 5 %.
          El código premiado es personal, no acumulable y válido para solicitar un presupuesto de los kits anunciados hasta el 29/11/2026.
          El descuento se calculará sobre el precio de referencia legal del kit (el más bajo aplicado en los 30 días previos a la promoción),
          sin incluir IVA, servicios extra, obra, desplazamientos especiales ni CRA. Su aplicación se verificará al preparar el presupuesto.
          Los datos se utilizan para gestionar la participación y la solicitud; los avisos comerciales solo se enviarán si se marca la casilla opcional.
          Para consultas o derechos de privacidad: <a href="mailto:tcnpremium@gmail.com" style={{ color: "#fbbf24" }}>tcnpremium@gmail.com</a>.
        </div>
      </div>
    </section>
  );
}
