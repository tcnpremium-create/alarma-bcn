import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/api';
import { FileText, Filter, Phone, Mail, MapPin, Clock, CheckCircle, XCircle, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';

export default function AdminLeads() {
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [filters, setFilters] = useState({
    estado: 'todos',
    tipo_cliente: 'todos',
    zona: '',
    fecha_desde: '',
    urgencia: 'todos'
  });

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [leads, filters]);

  const checkAuthAndLoad = async () => {
    try {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) {
        base44.auth.redirectToLogin(window.location.href);
        return;
      }
      const userData = await base44.auth.me();
      
      // Solo admins pueden acceder
      if (userData.role !== 'admin') {
        alert('Acceso denegado. Solo administradores.');
        window.location.href = '/';
        return;
      }
      
      setUser(userData);
      await loadLeads();
    } catch (error) {
      console.error('Error:', error);
      base44.auth.redirectToLogin(window.location.href);
    }
  };

  const loadLeads = async () => {
    try {
      const allLeads = await base44.entities.Lead.list('-created_date', 500);
      setLeads(allLeads);
    } catch (error) {
      console.error('Error cargando leads:', error);
      alert('Error al cargar leads');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...leads];

    if (filters.estado !== 'todos') {
      filtered = filtered.filter(l => l.estado === filters.estado);
    }
    if (filters.tipo_cliente !== 'todos') {
      filtered = filtered.filter(l => l.tipo_cliente === filters.tipo_cliente);
    }
    if (filters.urgencia !== 'todos') {
      filtered = filtered.filter(l => l.urgencia === filters.urgencia);
    }
    if (filters.zona) {
      filtered = filtered.filter(l => 
        l.zona?.toLowerCase().includes(filters.zona.toLowerCase())
      );
    }
    if (filters.fecha_desde) {
      filtered = filtered.filter(l => 
        new Date(l.created_date) >= new Date(filters.fecha_desde)
      );
    }

    setFilteredLeads(filtered);
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      await base44.entities.Lead.update(leadId, { estado: newStatus });
      setLeads(prev => prev.map(l => 
        l.id === leadId ? { ...l, estado: newStatus } : l
      ));
      if (selectedLead?.id === leadId) {
        setSelectedLead(prev => ({ ...prev, estado: newStatus }));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar');
    }
  };

  const updateLeadNotes = async (leadId, notes) => {
    try {
      await base44.entities.Lead.update(leadId, { notas: notes });
      setLeads(prev => prev.map(l => 
        l.id === leadId ? { ...l, notas: notes } : l
      ));
      if (selectedLead?.id === leadId) {
        setSelectedLead(prev => ({ ...prev, notas: notes }));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar notas');
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'nuevo': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'contactado': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'presupuesto_enviado': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'cerrado': return 'bg-green-100 text-green-800 border-green-300';
      case 'perdido': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#E63946] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0A1628] mb-2">
              Gestión de Leads
            </h1>
            <p className="text-gray-600">
              Total: {filteredLeads.length} leads {filters.estado !== 'todos' || filters.tipo_cliente !== 'todos' || filters.zona ? '(filtrado)' : ''}
            </p>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <h2 className="font-semibold text-gray-900">Filtros</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Select value={filters.estado} onValueChange={(v) => setFilters({...filters, estado: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="nuevo">Nuevo</SelectItem>
                  <SelectItem value="contactado">Contactado</SelectItem>
                  <SelectItem value="presupuesto_enviado">Presupuesto Enviado</SelectItem>
                  <SelectItem value="cerrado">Cerrado</SelectItem>
                  <SelectItem value="perdido">Perdido</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.tipo_cliente} onValueChange={(v) => setFilters({...filters, tipo_cliente: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  <SelectItem value="hogar">Hogar</SelectItem>
                  <SelectItem value="negocio">Negocio</SelectItem>
                  <SelectItem value="comunidad">Comunidad</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.urgencia} onValueChange={(v) => setFilters({...filters, urgencia: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Urgencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas las urgencias</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Buscar por zona..."
                value={filters.zona}
                onChange={(e) => setFilters({...filters, zona: e.target.value})}
              />

              <Input
                type="date"
                value={filters.fecha_desde}
                onChange={(e) => setFilters({...filters, fecha_desde: e.target.value})}
                placeholder="Desde fecha"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lista de leads */}
            <div className="space-y-3">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`bg-white border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedLead?.id === lead.id ? 'border-[#E63946]' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-[#0A1628] text-lg">{lead.nombre}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(lead.created_date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getEstadoColor(lead.estado)}`}>
                        {lead.estado}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getUrgenciaColor(lead.urgencia)}`}>
                        {lead.urgencia}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a href={`tel:${lead.telefono}`} className="hover:text-[#E63946]">{lead.telefono}</a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${lead.email}`} className="hover:text-[#E63946] truncate">{lead.email}</a>
                    </div>
                    {lead.zona && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{lead.zona}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold">Tipo:</span> {lead.tipo_cliente} • 
                      <span className="font-semibold ml-2">Servicio:</span> {lead.servicio_interes || 'No especificado'}
                    </p>
                  </div>
                </div>
              ))}

              {filteredLeads.length === 0 && (
                <div className="bg-white rounded-xl p-12 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No hay leads con estos filtros</p>
                </div>
              )}
            </div>

            {/* Detalle del lead */}
            <div className="sticky top-24">
              {selectedLead ? (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#0A1628] mb-1">{selectedLead.nombre}</h2>
                      <p className="text-sm text-gray-500">ID: {selectedLead.id.slice(0, 8)}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getEstadoColor(selectedLead.estado)}`}>
                        {selectedLead.estado}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getUrgenciaColor(selectedLead.urgencia)}`}>
                        {selectedLead.urgencia}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 mb-1 block">Cambiar Estado</label>
                      <Select
                        value={selectedLead.estado}
                        onValueChange={(v) => updateLeadStatus(selectedLead.id, v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nuevo">Nuevo</SelectItem>
                          <SelectItem value="contactado">Contactado</SelectItem>
                          <SelectItem value="presupuesto_enviado">Presupuesto Enviado</SelectItem>
                          <SelectItem value="cerrado">Cerrado</SelectItem>
                          <SelectItem value="perdido">Perdido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <a href={`tel:${selectedLead.telefono}`} className="font-semibold text-[#E63946] hover:underline">
                          {selectedLead.telefono}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <a href={`mailto:${selectedLead.email}`} className="text-sm text-gray-700 hover:text-[#E63946] truncate">
                          {selectedLead.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 capitalize">{selectedLead.tipo_cliente}</span>
                      </div>
                      {selectedLead.zona && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{selectedLead.zona}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {new Date(selectedLead.created_date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>

                    {selectedLead.servicio_interes && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 mb-1 block">Servicio de Interés</label>
                        <p className="text-sm bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-blue-900">
                          {selectedLead.servicio_interes}
                        </p>
                      </div>
                    )}

                    {selectedLead.mensaje && (
                      <div>
                        <label className="text-xs font-semibold text-gray-500 mb-1 block">Mensaje del Cliente</label>
                        <p className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 whitespace-pre-wrap">
                          {selectedLead.mensaje}
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-semibold text-gray-500 mb-1 block">Notas Internas</label>
                      <Textarea
                        value={selectedLead.notas || ''}
                        onChange={(e) => setSelectedLead({...selectedLead, notas: e.target.value})}
                        onBlur={(e) => updateLeadNotes(selectedLead.id, e.target.value)}
                        placeholder="Añade notas sobre este lead..."
                        rows={4}
                        className="text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">Las notas se guardan automáticamente</p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-xs text-amber-800">
                        <strong>Origen:</strong> {selectedLead.origen || 'formulario_web'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Selecciona un lead para ver los detalles</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
}