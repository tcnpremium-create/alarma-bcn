import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/api';

export default function ContactoTab({ user }) {
  const [form, setForm] = useState({ asunto: '', mensaje: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.asunto || !form.mensaje) {
      alert('Por favor completa todos los campos');
      return;
    }

    setSending(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: 'tcnpremium@gmail.com',
        subject: `📧 Consulta Cliente: ${form.asunto} | ${user.email}`,
        body: `
CONSULTA DESDE ÁREA DE CLIENTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre: ${user.full_name}
Email: ${user.email}

📋 ASUNTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${form.asunto}

💬 MENSAJE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${form.mensaje}

⏰ Fecha: ${new Date().toLocaleString('es-ES')}
        `
      });

      setSuccess(true);
      setForm({ asunto: '', mensaje: '' });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar mensaje. Intenta de nuevo o llámanos al 638 10 99 47');
    } finally {
      setSending(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border-2 border-green-300 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-900 mb-2">¡Mensaje Enviado!</h3>
        <p className="text-green-700 mb-4">
          Hemos recibido tu consulta correctamente
        </p>
        <p className="text-sm text-green-600">
          Te responderemos lo antes posible
        </p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Asunto <span className="text-red-600">*</span>
          </label>
          <Input
            placeholder="Ej: Consulta sobre mi instalación"
            value={form.asunto}
            onChange={(e) => setForm({ ...form, asunto: e.target.value })}
            className="h-12 text-base"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Mensaje <span className="text-red-600">*</span>
          </label>
          <Textarea
            placeholder="Describe tu consulta con el máximo detalle posible..."
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            rows={6}
            className="resize-none text-base"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={sending}
          className="w-full bg-[#E63946] hover:bg-[#d32f3c] text-white h-12 text-base font-semibold"
        >
          {sending ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Enviar Mensaje
            </>
          )}
        </Button>
      </form>

      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-bold text-[#0A1628] mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-[#E63946]" />
          Otros medios de contacto
        </h3>
        <div className="space-y-3">
          <a 
            href="tel:+34638109947"
            className="flex items-center gap-3 p-3 bg-white rounded-lg hover:border-[#E63946] border border-transparent transition-all"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-[#0A1628] text-sm">Teléfono</p>
              <p className="text-[#E63946] font-bold">638 10 99 47</p>
            </div>
          </a>

          <a 
            href="mailto:tcnpremium@gmail.com"
            className="flex items-center gap-3 p-3 bg-white rounded-lg hover:border-[#E63946] border border-transparent transition-all"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-[#0A1628] text-sm">Email</p>
              <p className="text-gray-600 text-sm">tcnpremium@gmail.com</p>
            </div>
          </a>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-[#0A1628] text-sm mb-1">Horario de atención</p>
              <p className="text-gray-600 text-xs leading-relaxed">
                Lunes a Viernes: 9:00 - 20:00h<br/>
                Sábados: 10:00 - 14:00h
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}