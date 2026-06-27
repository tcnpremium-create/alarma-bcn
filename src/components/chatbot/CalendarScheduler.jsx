import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Phone, Video, MapPin, CheckCircle, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/api";

const timeSlots = {
  morning: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"],
  afternoon: ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"],
  evening: ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30"]
};

export default function CalendarScheduler({ onSchedule, onClose }) {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [userData, setUserData] = useState({ nombre: "", telefono: "", direccion: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Generar próximos 14 días laborables
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let daysAdded = 0;
    let currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() + 1); // Empezar desde mañana

    while (daysAdded < 14) {
      const dayOfWeek = currentDate.getDay();
      // Excluir domingos (0)
      if (dayOfWeek !== 0) {
        dates.push(new Date(currentDate));
        daysAdded++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const formatDate = (date) => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const validatePhone = (phone) => /^\d{9,}$/.test(phone.replace(/\s/g, ''));
  const validateName = (name) => name.trim().length >= 2;

  const handleSchedule = async () => {
    // Validación
    const newErrors = {};
    if (!validateName(userData.nombre)) newErrors.nombre = "Ingresa un nombre válido";
    if (!validatePhone(userData.telefono)) newErrors.telefono = "Teléfono debe tener al menos 9 dígitos";
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const appointmentData = {
        serviceType,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        nombre: userData.nombre,
        telefono: userData.telefono,
        direccion: userData.direccion || '',
        email: userData.email || ''
      };

      // Añadir evento a Google Calendar (opcional, no bloquea el flujo)
      let calendarResult = { success: false, error: 'No intentado' };
      try {
        const calRes = await base44.functions.invoke('createGoogleCalendarEvent', { appointmentData });
        calendarResult = calRes.data || { success: false, error: 'Sin respuesta' };
        if (calendarResult.success) {
          console.log('✅ Evento añadido a Google Calendar:', calendarResult.eventId);
        } else {
          console.warn('⚠️ Google Calendar no disponible:', calendarResult.error);
        }
      } catch (calErr) {
        console.warn('⚠️ Error Google Calendar (no crítico):', calErr.message);
      }

      // Enviar email de notificación al equipo
      await base44.integrations.Core.SendEmail({
        to: "tcnpremium@gmail.com",
        subject: `📅 Nueva Cita Agendada - ${serviceType === 'llamada' ? 'Llamada' : 'Visita Técnica'}`,
        body: `
📅 NUEVA CITA AGENDADA DESDE CHATBOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 DETALLES DE LA CITA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fecha: ${formatDate(selectedDate)}
Hora: ${selectedTime}
Tipo: ${serviceType === 'llamada' ? 'Llamada informativa' : 'Visita técnica presencial'}

👤 DATOS DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre: ${userData.nombre}
Teléfono: ${userData.telefono}
${userData.direccion ? `Dirección: ${userData.direccion}` : ''}

${calendarResult.success ? `✅ Evento añadido a Google Calendar` : `⚠️ No se pudo añadir a Google Calendar: ${calendarResult.error}`}

⚡ ACCIÓN REQUERIDA: Confirmar la cita llamando al cliente
        `
      });

      // Sync to HubSpot CRM
      const hubspotLead = {
        nombre: userData.nombre,
        telefono: userData.telefono,
        email: userData.email || '',
        zona: '',
        urgencia: 'alta',
        servicio_interes: serviceType === 'llamada' ? 'Llamada informativa' : 'Visita técnica',
        origen: 'chatbot',
      };
      base44.functions.invoke('syncToHubspot', { leadData: hubspotLead, dealStage: 'cita_agendada' }).catch(e => console.warn('HubSpot sync error:', e));

      base44.analytics.track({
        eventName: "chatbot_appointment_scheduled",
        properties: {
          service_type: serviceType,
          date: appointmentData.date,
          time: selectedTime,
          calendar_added: calendarResult.success
        }
      });

      setStep(5);
      setTimeout(() => {
        onSchedule?.({
          message: `Cita agendada: ${serviceType === 'llamada' ? 'Llamada' : 'Visita'} el ${formatDate(selectedDate)} a las ${selectedTime}${calendarResult.success ? ' ✅ Añadida a Google Calendar' : ''}`
        });
      }, 2000);
      
    } catch (error) {
      console.error("Error al agendar:", error);
      setErrors({ submit: "Error al agendar. Intenta de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-4 sm:p-6 max-w-md mx-auto text-sm sm:text-base"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-[#0A1628]">Agendar Cita</h3>
          {onClose && (
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full active:scale-90 transition-transform">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mb-5">Selecciona el tipo de servicio:</p>
        <div className="space-y-3">
          {[
            { icon: Phone, label: "Llamada informativa", value: "llamada" },
            { icon: MapPin, label: "Visita técnica presencial", value: "visita" },
          ].map((option) => {
            const Icon = option.icon;
            return (
              <motion.button
                key={option.value}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setServiceType(option.value);
                  setStep(2);
                }}
                className="w-full flex items-center gap-4 p-3 sm:p-4 border-2 border-gray-200 rounded-xl hover:border-[#E63946] hover:bg-[#E63946]/5 active:scale-95 transition-all group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-100 group-hover:bg-[#E63946]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600 group-hover:text-[#E63946]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-[#E63946] text-left">{option.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    );
  }

  if (step === 2) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl p-4 sm:p-6 max-w-md mx-auto"
      >
        <button onClick={() => setStep(1)} className="text-xs sm:text-sm text-gray-500 mb-4 hover:text-[#E63946] transition-colors">
          ← Volver
        </button>
        <h3 className="text-base sm:text-lg font-bold text-[#0A1628] mb-2">Selecciona una fecha</h3>
        <p className="text-xs text-gray-500 mb-4">Horario: Lun-Sáb 9:00-19:30</p>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 max-h-96 overflow-y-auto">
          {availableDates.map((date) => (
            <motion.button
              key={date.toISOString()}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedDate(date);
                setStep(3);
              }}
              className="p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl hover:border-[#E63946] hover:bg-[#E63946]/5 active:scale-95 transition-all text-center"
            >
              <div className="text-xs font-semibold text-[#E63946] mb-1">
                {formatDate(date).split(' ')[0]}
              </div>
              <div className="text-lg sm:text-xl font-bold text-gray-800">
                {date.getDate()}
              </div>
              <div className="text-xs text-gray-500">
                {formatDate(date).split(' ').slice(2).join(' ')}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  if (step === 3) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl p-4 sm:p-6 max-w-md mx-auto"
      >
        <button onClick={() => setStep(2)} className="text-xs sm:text-sm text-gray-500 mb-4 hover:text-[#E63946] transition-colors">
          ← Volver
        </button>
        <h3 className="text-base sm:text-lg font-bold text-[#0A1628] mb-2">Selecciona la hora</h3>
        <p className="text-xs text-gray-500 mb-4">{formatDate(selectedDate)}</p>
        
        {Object.entries(timeSlots).map(([period, slots]) => (
          <div key={period} className="mb-4">
            <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">
              {period === 'morning' ? '🌅 Mañana' : period === 'afternoon' ? '☀️ Tarde' : '🌆 Tarde-Noche'}
            </p>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {slots.map((time) => (
                <motion.button
                  key={time}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedTime(time);
                    setStep(4);
                  }}
                  className="py-2 px-2 sm:px-3 border-2 border-gray-200 rounded-lg hover:border-[#E63946] hover:bg-[#E63946]/5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#E63946] active:scale-95 transition-all"
                >
                  {time}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    );
  }

  if (step === 4) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl p-4 sm:p-6 max-w-md mx-auto"
      >
        <button onClick={() => setStep(3)} className="text-xs sm:text-sm text-gray-500 mb-4 hover:text-[#E63946] transition-colors">
          ← Volver
        </button>
        <h3 className="text-base sm:text-lg font-bold text-[#0A1628] mb-2">Confirma tus datos</h3>
        <p className="text-xs text-gray-500 mb-5">
          📅 {formatDate(selectedDate)} a las {selectedTime}
        </p>
        
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-xs text-red-700">
            {errors.submit}
          </div>
        )}
        
        <div className="space-y-3 mb-5">
          <div>
            <input
              type="text"
              placeholder="Nombre completo *"
              value={userData.nombre}
              onChange={(e) => {
                setUserData({ ...userData, nombre: e.target.value });
                if (errors.nombre) setErrors({ ...errors, nombre: "" });
              }}
              className={`w-full px-4 py-2.5 sm:py-3 border-2 rounded-lg outline-none text-sm transition-colors ${
                errors.nombre ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#E63946]'
              }`}
            />
            {errors.nombre && <p className="text-xs text-red-600 mt-1">{errors.nombre}</p>}
          </div>
          <div>
            <input
              type="tel"
              placeholder="Teléfono * (9 dígitos)"
              value={userData.telefono}
              onChange={(e) => {
                setUserData({ ...userData, telefono: e.target.value });
                if (errors.telefono) setErrors({ ...errors, telefono: "" });
              }}
              className={`w-full px-4 py-2.5 sm:py-3 border-2 rounded-lg outline-none text-sm transition-colors ${
                errors.telefono ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#E63946]'
              }`}
            />
            {errors.telefono && <p className="text-xs text-red-600 mt-1">{errors.telefono}</p>}
          </div>
          <input
            type="text"
            placeholder="Dirección (opcional)"
            value={userData.direccion}
            onChange={(e) => setUserData({ ...userData, direccion: e.target.value })}
            className="w-full px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-[#E63946] outline-none transition-colors text-sm"
          />
        </div>

        <Button
          onClick={handleSchedule}
          disabled={loading}
          className={`w-full rounded-lg py-3 font-semibold text-sm transition-all active:scale-95 ${
            loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#E63946] hover:bg-[#d32f3c] text-white'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Agendando...
            </span>
          ) : (
            "Confirmar Cita"
          )}
        </Button>
      </motion.div>
    );
  }

  // PASO 5: Confirmación
  if (step === 5) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md mx-auto text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[#0A1628] mb-2">¡Cita Agendada!</h3>
        <p className="text-gray-600 mb-6">
          Te llamaremos al <strong>{userData.telefono}</strong> el día <strong>{formatDate(selectedDate)}</strong> a las <strong>{selectedTime}</strong>
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
          <p className="text-sm text-blue-900">
            <strong>Importante:</strong> Recibirás una llamada de confirmación en las próximas horas. Si necesitas modificar la cita, llámanos al <strong>638 10 99 47</strong>
          </p>
        </div>
        {onClose && (
          <Button onClick={onClose} variant="outline" className="w-full">
            Cerrar
          </Button>
        )}
      </motion.div>
    );
  }

  return null;
}