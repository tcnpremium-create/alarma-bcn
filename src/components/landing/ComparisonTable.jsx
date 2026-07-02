import React from "react";
import { Check, X } from "lucide-react";
import { BorderBeam } from "../magicui/border-beam";

const ROWS = [
  { label: "Cuota Mensual", us: "0€/mes (Propiedad del equipo)*", them: "45€ - 60€/mes (Alquiler eterno)*" },
  { label: "Calidad de Vídeo", us: "Alta Definición 4K con IA", them: "Resolución estándar (verificación básica)" },
  { label: "Permanencia", us: "Sin permanencia", them: "24 a 36 meses obligatorios" },
  { label: "Garantía", us: "3 años en todos los productos", them: "Solo mientras pagues la cuota" },
];

export default function ComparisonTable() {
  const totalRows = ROWS.length + 1; // + header row

  return (
    <section className="bg-[#060B14] py-16 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-red-500/10 border border-red-500/30 text-red-500 text-[11px] font-bold tracking-widest uppercase rounded-full px-4 py-1.5 mb-4">
            Premium Tech Security vs. Multinacionales
          </span>
          <h2 className="text-white text-2xl sm:text-3xl font-black tracking-tight mb-3">
            El equipo es tuyo. No lo alquilas de por vida.
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Así de claro es comparar un instalador local sin cuotas frente a las grandes cadenas con permanencia.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 min-w-[560px]">
            <div
              className="grid grid-cols-3 text-sm"
              style={{ gridTemplateRows: `repeat(${totalRows}, auto)` }}
            >
              {/* Header row */}
              <div className="bg-white/[0.03] text-slate-500 text-xs font-bold uppercase tracking-wider py-4 px-5">&nbsp;</div>
              <div className="bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider py-4 px-5 border-x border-white/10">
                Premium Tech Security
              </div>
              <div className="bg-white/[0.03] text-slate-500 text-xs font-bold uppercase tracking-wider py-4 px-5">
                Multinacionales Tradicionales
              </div>

              {/* Data rows */}
              {ROWS.map((row, i) => (
                <React.Fragment key={row.label}>
                  <div className={`py-4 px-5 text-slate-300 font-bold border-t border-white/[0.06] ${i % 2 === 0 ? "bg-white/[0.015]" : ""}`}>
                    {row.label}
                  </div>
                  <div className={`py-4 px-5 border-t border-x border-white/[0.06] bg-red-500/[0.04] ${i % 2 === 0 ? "bg-red-500/[0.06]" : ""}`}>
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-red-500 shrink-0 mt-0.5" strokeWidth={3} />
                      <span className="text-white font-semibold">{row.us}</span>
                    </div>
                  </div>
                  <div className={`py-4 px-5 border-t border-white/[0.06] ${i % 2 === 0 ? "bg-white/[0.015]" : ""}`}>
                    <div className="flex items-start gap-2">
                      <X size={16} className="text-slate-600 shrink-0 mt-0.5" strokeWidth={3} />
                      <span className="text-slate-500">{row.them}</span>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Animated border beam highlighting the whole Premium column — positioned independently of the grid */}
            <div
              aria-hidden="true"
              style={{ position: "absolute", top: 0, bottom: 0, left: "33.3333%", width: "33.3333%", pointerEvents: "none", zIndex: 5 }}
            >
              <BorderBeam colorFrom="#E53E3E" colorTo="#FF8A65" duration={6} borderWidth={2} />
            </div>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          * Precios sin IVA. Comparativa orientativa frente a modelos de alquiler de equipos habituales en el sector. Condiciones sujetas a presupuesto personalizado.
        </p>
      </div>
    </section>
  );
}
