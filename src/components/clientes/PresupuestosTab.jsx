import React, { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, XCircle, Phone } from 'lucide-react';
import { base44 } from '@/api/api';
import { Button } from '@/components/ui/button';

export default function PresupuestosTab({ userEmail }) {
  const [presupuestos, setPresupuestos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPresupuestos();
  }, [userEmail]);

  const loadPresupuestos = async () => {
    try {
      const leads = await base44.entities.Lead.filter(
        { created_by: userEmail },
        '-created_date',
        50
      );
      setPresupuestos(leads);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'nuevo': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'contactado': return <Phone className="w-5 h-5 text-yellow-500" />;
      case 'presupuesto_enviado': return <FileText className="w-5 h-5 text-purple-500" />;
      case 'cerrado': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'perdido': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getEstadoText = (estado) => {
    switch (estado) {
      case 'nuevo': return 'Pendiente';
      case 'contactado': return 'Contactado';
      case 'presupuesto_enviado': return 'Presupuesto Enviado';
      case 'cerrado': return 'Cerrado';
      case 'perdido': return 'Cancelado';
      default: return estado;
    }
  };

  const getUrgenciaColor = (urgencia) => {
    switch (urgencia) {
      case 'urgente': return 'bg-red-100 text-red-700 border-red-300';
      case 'alta': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'media': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'baja': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-[#E63946] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (presupuestos.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">
          Todavía no has solicitado presupuestos
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Solicita tu primer presupuesto desde nuestra página principal
        </p>
        <Button 
          className="bg-[#E63946] hover:bg-[#d32f3c] text-white"
          onClick={() => window.location.href = '/#contacto'}
        >
          Solicitar Presupuesto
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {presupuestos.map((presupuesto) => (
        <div
          key={presupuesto.id}
          className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-[#E63946] transition-all"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {getEstadoIcon(presupuesto.estado)}
              <div>
                <h3 className="font-bold text-[#0A1628] text-base">
                  {presupuesto.servicio_interes || 'Presupuesto General'}
                </h3>
                <p className="text-xs text-gray-500">
                  {new Date(presupuesto.created_date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getUrgenciaColor(presupuesto.urgencia)}`}>
              {presupuesto.urgencia || 'Media'}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Estado:</span>
              <span className="font-semibold text-[#0A1628]">{getEstadoText(presupuesto.estado)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tipo:</span>
              <span className="font-semibold text-[#0A1628] capitalize">{presupuesto.tipo_cliente}</span>
            </div>
            {presupuesto.zona && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Zona:</span>
                <span className="font-semibold text-[#0A1628]">{presupuesto.zona}</span>
              </div>
            )}
          </div>

          {presupuesto.mensaje && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-600 line-clamp-2">{presupuesto.mensaje}</p>
            </div>
          )}

          {presupuesto.notas && (
            <div className="mt-3 bg-blue-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-900 mb-1">Notas del equipo:</p>
              <p className="text-xs text-blue-700">{presupuesto.notas}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}