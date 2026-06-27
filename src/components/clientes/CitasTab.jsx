import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/api';
import { Button } from '@/components/ui/button';

export default function CitasTab({ userEmail }) {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCitas();
  }, [userEmail]);

  const loadCitas = async () => {
    try {
      // Por ahora simulamos con datos de ejemplo
      // En producción, esto consultaría una entidad Cita
      setCitas([]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-[#E63946] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (citas.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">
          No tienes citas agendadas
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Agenda tu primera cita técnica contactando con nuestro equipo
        </p>
        <div className="flex flex-col gap-3">
          <Button 
            className="bg-[#E63946] hover:bg-[#d32f3c] text-white"
            onClick={() => window.location.href = 'tel:+34638109947'}
          >
            <Phone className="w-4 h-4 mr-2" />
            Llamar: 638 10 99 47
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/#contacto'}
          >
            Solicitar Cita Online
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {citas.map((cita) => (
        <div
          key={cita.id}
          className="bg-white border-2 border-gray-200 rounded-xl p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#0A1628] text-base">
                  Instalación de Sistema
                </h3>
                <p className="text-xs text-gray-500">Ref: #{cita.id.slice(0, 8)}</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-300">
              Confirmada
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Fecha placeholder</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>Hora placeholder</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>Dirección placeholder</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Modificar
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700">
              Cancelar
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}