import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { base44, needsDelayedNotice, NOTIFICATION_DELAYED_NOTICE } from '@/api/api';
import { trackEvent } from '@/lib/analytics';
import { ChevronRight, Loader2 } from 'lucide-react';
import { registerPhoneForTracking } from '@/components/tracking/useHubSpotTracking';

export default function LeadQualification({ onComplete }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    servicio_interes: '',
    tipo_cliente: '',
    zona: '',
    urgencia: 'media',
    detalles: '',
    num_estancias: '',
    num_camaras: ''
  });

  const handleNextStep = () => {
    if (step === 1 && (!formData.nombre || !formData.telefono)) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }
    if (step === 2 && (!formData.servicio_interes || !formData.tipo_cliente)) {
      alert('Por favor selecciona el servicio y tipo de propiedad');
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    console.log("LeadQualification → handleSubmit ejecutado:", formData);
    setLoading(true);
    trackEvent('form_submit', { form_name: 'chatbot_cualificacion', service: formData.servicio_interes });

    try {
      const leadData = {
        nombre: formData.nombre,
        email: formData.email || '',
        telefono: formData.telefono,
        tipo_cliente: formData.tipo_cliente,
        zona: formData.zona || '',
        servicio_interes: formData.servicio_interes,
        mensaje: `${formData.detalles}\n\nDetalles adicionales:\n- Urgencia: ${formData.urgencia}\n- Estancias: ${formData.num_estancias || 'No especificado'}\n- Cámaras: ${formData.num_camaras || 'No especificado'}`,
        origen: 'chatbot',
        urgencia: formData.urgencia,
        estado: 'nuevo'
      };

      const lead = await base44.entities.Lead.create(leadData);
      trackEvent('form_success', { form_name: 'chatbot_cualificacion', service: formData.servicio_interes, notification: lead?.notification, duplicate: lead?.duplicate });
      registerPhoneForTracking(formData.telefono);

      // Sync to HubSpot CRM
      base44.functions.invoke('syncToHubspot', { leadData, dealStage: 'nuevo' }).catch(e => console.warn('HubSpot sync error:', e));

      // El aviso por correo lo envía y registra el servidor (/api/lead): antes aquí se llamaba a
      // base44.integrations.Core.SendEmail, que no existe, y el error hacía creer que la solicitud
      // había fallado aunque ya estuviera guardada.

      base44.analytics.track({
        eventName: 'chatbot_lead_qualified',
        properties: {
          servicio: formData.servicio_interes,
          urgencia: formData.urgencia
        }
      });

      onComplete({
        success: true,
        message: `¡Perfecto ${formData.nombre}! Hemos recibido tu solicitud.\n\n${needsDelayedNotice(lead) ? NOTIFICATION_DELAYED_NOTICE : `Te contactaremos al ${formData.telefono} en menos de 24 horas para ofrecerte un presupuesto personalizado.`}\n\n¿Necesitas algo más?`
      });
    } catch (error) {
      console.error('Error:', error);
      trackEvent('form_error', { form_name: 'chatbot_cualificacion', error_kind: error?.kind || 'unknown' });
      alert(error?.kind === 'validation' ? error.message : 'No hemos podido registrar tu solicitud. Por favor llámanos al 638 10 99 47 o inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200">
      <div className="mb-4">
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s <= step ? 'bg-[#C53030] w-12' : 'bg-gray-200 w-8'
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <h3 className="font-bold text-[#0A1628] text-sm mb-3">Datos de contacto</h3>
              <Input
                placeholder="Nombre completo *"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="h-10 text-sm"
                required
              />
              <Input
                type="tel"
                placeholder="Teléfono (9 dígitos) *"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="h-10 text-sm"
                required
                maxLength={9}
              />
              <Input
                type="email"
                placeholder="Email (opcional)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-10 text-sm"
              />
              <Button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-[#C53030] hover:bg-[#9B2C2C] text-white h-10 text-sm"
              >
                Continuar
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <h3 className="font-bold text-[#0A1628] text-sm mb-3">¿Qué necesitas?</h3>
              <Select
                value={formData.servicio_interes}
                onValueChange={(v) => setFormData({ ...formData, servicio_interes: v })}
              >
                <SelectTrigger className="h-10 text-sm">
                  <SelectValue placeholder="Servicio de interés *" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alarmas">Alarmas</SelectItem>
                  <SelectItem value="Cámaras">Cámaras de Seguridad</SelectItem>
                  <SelectItem value="Videoporteros">Videoporteros</SelectItem>
                  <SelectItem value="Control de Accesos">Control de Accesos</SelectItem>
                  <SelectItem value="Solución Completa">Solución Completa</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={formData.tipo_cliente}
                onValueChange={(v) => setFormData({ ...formData, tipo_cliente: v })}
              >
                <SelectTrigger className="h-10 text-sm">
                  <SelectValue placeholder="Tipo de propiedad *" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hogar">Hogar / Vivienda</SelectItem>
                  <SelectItem value="negocio">Negocio / Comercio</SelectItem>
                  <SelectItem value="comunidad">Comunidad</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Zona / Barrio (ej: Eixample)"
                value={formData.zona}
                onChange={(e) => setFormData({ ...formData, zona: e.target.value })}
                className="h-10 text-sm"
              />

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 h-10 text-sm"
                >
                  Atrás
                </Button>
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 bg-[#C53030] hover:bg-[#9B2C2C] text-white h-10 text-sm"
                >
                  Continuar
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <h3 className="font-bold text-[#0A1628] text-sm mb-3">Detalles adicionales</h3>
              
              <Select
                value={formData.urgencia}
                onValueChange={(v) => setFormData({ ...formData, urgencia: v })}
              >
                <SelectTrigger className="h-10 text-sm">
                  <SelectValue placeholder="Urgencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baja">No urgente</SelectItem>
                  <SelectItem value="media">Normal</SelectItem>
                  <SelectItem value="alta">Urgente</SelectItem>
                  <SelectItem value="urgente">Muy urgente</SelectItem>
                </SelectContent>
              </Select>

              {(formData.servicio_interes === 'Alarmas' || formData.servicio_interes === 'Solución Completa') && (
                <Input
                  placeholder="Número de estancias (opcional)"
                  value={formData.num_estancias}
                  onChange={(e) => setFormData({ ...formData, num_estancias: e.target.value })}
                  className="h-10 text-sm"
                  type="number"
                />
              )}

              {(formData.servicio_interes === 'Cámaras' || formData.servicio_interes === 'Solución Completa') && (
                <Input
                  placeholder="Número de cámaras (opcional)"
                  value={formData.num_camaras}
                  onChange={(e) => setFormData({ ...formData, num_camaras: e.target.value })}
                  className="h-10 text-sm"
                  type="number"
                />
              )}

              <Textarea
                placeholder="Detalles adicionales (opcional)"
                value={formData.detalles}
                onChange={(e) => setFormData({ ...formData, detalles: e.target.value })}
                rows={3}
                className="resize-none text-sm"
              />

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 h-10 text-sm"
                >
                  Atrás
                </Button>
                <Button
                   type="button"
                   onClick={handleSubmit}
                   disabled={loading}
                   className="flex-1 bg-[#C53030] hover:bg-[#9B2C2C] text-white h-10 text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <p className="text-xs text-gray-500 text-center mt-3">
        🔒 Tus datos están protegidos
      </p>
    </div>
  );
}