import React from "react";
import { Check, X } from "lucide-react";

const ROWS = [
  { label: "Cuota Mensual", us: "0€/mes (Propiedad del equipo)", them: "45€ - 60€/mes (Alquiler eterno)" },
  { label: "Calidad de Vídeo", us: "Alta Definición 4K con IA", them: "Resolución estándar (verificación básica)" },
  { label: "Permanencia", us: "Sin permanencia", them: "24 a 36 meses obligatorios" },
  { label: "Garantía", us: "De por vida (Soporte local)", them: "Solo mientras pagues la cuota" },
];

export default function ComparisonTable() {
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

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-white/[0.03] text-slate-500 text-xs font-bold uppercase tracking-wider text-left py-4 px-5 w-1/3">
                  &nbsp;
                </th>
                <th className="bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider text-left py-4 px-5 border-x border-white/10">
                  Premium Tech Security
                </th>
                <th className="bg-white/[0.03] text-slate-500 text-xs font-bold uppercase tracking-wider text-left py-4 px-5">
                  Multinacionales Tradicionales
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-white/[0.015]" : ""}>
                  <td className="py-4 px-5 text-slate-300 font-bold border-t border-white/[0.06]">{row.label}</td>
                  <td className="py-4 px-5 border-t border-x border-white/[0.06] bg-red-500/[0.04]">
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-red-500 shrink-0 mt-0.5" strokeWidth={3} />
                      <span className="text-white font-semibold">{row.us}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 border-t border-white/[0.06]">
                    <div className="flex items-start gap-2">
                      <X size={16} className="text-slate-600 shrink-0 mt-0.5" strokeWidth={3} />
                      <span className="text-slate-500">{row.them}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Comparativa orientativa frente a modelos de alquiler de equipos habituales en el sector. Condiciones sujetas a presupuesto personalizado.
        </p>
      </div>
    </section>
  );
}
