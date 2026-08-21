// Única fuente de verdad para "en qué página/servicio está el usuario",
// usada tanto para preseleccionar el servicio en el formulario único de
// presupuesto como para el mensaje contextual de WhatsApp — así ambos
// canales de contacto coinciden siempre.
export function getServiceForPath(pathname) {
  const path = pathname.toLowerCase();
  if (path.startsWith("/camaras-")) return "Cámaras de seguridad";
  if (path.startsWith("/alarmas-")) return "Alarma";
  if (path.startsWith("/sonorizacion")) return "Sonorización";
  if (path.startsWith("/redes-informaticas")) return "Redes informáticas";
  if (path.startsWith("/cerraduras")) return "Cerradura inteligente";
  if (path.startsWith("/videoporteros")) return "Videoportero";
  if (path.startsWith("/control-accesos")) return "Control de accesos";
  return "";
}

export function getWhatsappMessage(pathname) {
  const service = getServiceForPath(pathname);
  const byService = {
    "Cámaras de seguridad": "Hola, estoy interesado en instalar cámaras de seguridad.",
    "Alarma": "Hola, estoy interesado en instalar una alarma.",
    "Sonorización": "Hola, necesito un presupuesto de sonorización.",
    "Redes informáticas": "Hola, necesito una instalación de red.",
    "Cerradura inteligente": "Hola, estoy interesado en una cerradura inteligente.",
    "Videoportero": "Hola, estoy interesado en un videoportero.",
    "Control de accesos": "Hola, estoy interesado en un sistema de control de accesos.",
  };
  return byService[service] || "Hola, me gustaría recibir información sobre vuestros servicios.";
}
