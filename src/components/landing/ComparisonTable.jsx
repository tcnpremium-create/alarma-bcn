import React from "react";
import { Check, X } from "lucide-react";

const ROWS = [
  { label: "Cuota mensual", us: "Equipo en propiedad, sin cuota de alquiler*", them: "Puede incluir cuotas según el servicio contratado" },
  { label: "Sistema de vídeo", us: "Opciones 4K e IA según el sistema elegido", them: "Prestaciones según el equipo contratado" },
  { label: "Permanencia", us: "Sin permanencia*", them: "Condiciones según contrato" },
  { label: "Garantía", us: "3 años en los productos indicados*", them: "Condiciones según producto y contrato" },
];

export default function ComparisonTable() {
  const totalRows = ROWS.length + 1; // + header row

  return (
    <section className="bg-[#060B14] py-16 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-red-500/10 border border-red-500/30 text-red-500 text-[11px] font-bold tracking-widest uppercase rounded-full px-4 py-1.5 mb-4">
            Premium Tech Security vs. modelos tradicionales
          </span>
          <h2 className="text-white text-2xl sm:text-3xl font-black tracking-tight mb-3">
            Elige el sistema y las condiciones que encajan contigo.
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Compara propiedad del equipo, prestaciones y condiciones antes de contratar. Cada oferta depende del proveedor y del sistema elegido.
          </p>
        </div>

        <div className="hidden overflow-x-auto sm:block">
          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-3 text-sm" style={{ gridTemplateRows: `repeat(${totalRows}, auto)` }}>
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
          </div>
        </div>

        <div className="space-y-4 sm:hidden">
          {ROWS.map((row) => (
            <article key={row.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <h3 className="mb-3 text-sm font-bold text-white">{row.label}</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2 rounded-xl border border-red-400/20 bg-red-500/[0.08] p-3">
                  <Check size={17} className="mt-0.5 shrink-0 text-red-400" strokeWidth={3} aria-hidden="true" />
                  <div><p className="text-[11px] font-bold uppercase tracking-wide text-red-300">Premium Tech Security</p><p className="mt-1 text-sm font-medium leading-snug text-white">{row.us}</p></div>
                </div>
                <div className="flex items-start gap-2 rounded-xl bg-white/[0.03] p-3">
                  <X size={17} className="mt-0.5 shrink-0 text-slate-500" strokeWidth={3} aria-hidden="true" />
                  <div><p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Modelos tradicionales</p><p className="mt-1 text-sm leading-snug text-slate-400">{row.them}</p></div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          * Condiciones sujetas al equipo, producto y presupuesto contratados. Comprueba el detalle en cada propuesta.
        </p>
      </div>
    </section>
  );
}
