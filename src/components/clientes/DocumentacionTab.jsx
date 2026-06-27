import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const documentos = [
  {
    categoria: 'Manuales de Usuario',
    items: [
      { name: 'Manual Usuario AJAX Hub 2 Plus', size: '2.4 MB', type: 'PDF', url: '#' },
      { name: 'Guía Rápida App AJAX Security', size: '1.1 MB', type: 'PDF', url: '#' },
      { name: 'Manual Cámaras Hikvision ColorVu', size: '1.8 MB', type: 'PDF', url: '#' },
      { name: 'Manual Videoportero Fermax LYNX', size: '1.2 MB', type: 'PDF', url: '#' }
    ]
  },
  {
    categoria: 'Garantías y Certificados',
    items: [
      { name: 'Certificado de Garantía 3 Años', size: '320 KB', type: 'PDF', url: '#' },
      { name: 'Certificado Instalación Conforme', size: '450 KB', type: 'PDF', url: '#' },
      { name: 'Póliza de Mantenimiento', size: '280 KB', type: 'PDF', url: '#' }
    ]
  },
  {
    categoria: 'Guías Técnicas',
    items: [
      { name: 'Guía Configuración Zonas de Alarma', size: '890 KB', type: 'PDF', url: '#' },
      { name: 'Guía Configuración Notificaciones', size: '650 KB', type: 'PDF', url: '#' },
      { name: 'Solución Problemas Comunes', size: '1.5 MB', type: 'PDF', url: '#' }
    ]
  }
];

export default function DocumentacionTab() {
  return (
    <div className="space-y-6">
      {documentos.map((seccion) => (
        <div key={seccion.categoria}>
          <h3 className="font-bold text-[#0A1628] mb-3 text-base">{seccion.categoria}</h3>
          <div className="space-y-2">
            {seccion.items.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-[#E63946] transition-all"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#0A1628] text-sm truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-shrink-0 ml-2"
                  onClick={() => alert('Función de descarga próximamente')}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-blue-50 rounded-lg p-4 mt-6">
        <p className="text-sm text-blue-800">
          💡 <strong>Consejo:</strong> Guarda estos documentos en un lugar seguro para consultas futuras.
        </p>
      </div>
    </div>
  );
}