/**
 * googleReviews.js — reseñas REALES de la ficha de Google Business Profile
 * de Barcelona (Coll i Vehí 141, cid 4037912173356516535), copiadas el
 * 22/10/2026. Textos literales: solo se corrigen tildes y puntuación, los
 * recortes van marcados con "[…]" y el apellido se abrevia a la inicial.
 *
 * La web mostraba antes testimonios inventados (nombres y textos que no
 * existen en Google). No añadir aquí nada que no esté publicado en la
 * ficha: actualizar este archivo cuando lleguen reseñas nuevas.
 *
 * `topics` sirve para elegir las reseñas que encajan con cada servicio.
 */
export const GOOGLE_REVIEWS = [
  {
    name: "Corin D.",
    date: "ago. 2026",
    stars: 5,
    topics: ["camaras", "negocios"],
    text: "Ha instalado las cámaras de seguridad en tres de mis espacios y, desde el principio, me asesoró muy bien sobre diferentes estrategias para mejorar la seguridad. […] Sin duda, volvería a contratar a Albert y lo recomiendo al 100 %.",
  },
  {
    name: "Yudith P.",
    date: "ago. 2026",
    stars: 5,
    topics: ["camaras", "alarmas", "negocios"],
    text: "Hemos instalado 4 cámaras en el negocio además de la alarma, y desde entonces nos sentimos más seguros. […] la profesionalidad y buena disposición de Albert cuando le llamamos ante cualquier incidencia que ocurra.",
  },
  {
    name: "Laia G.",
    date: "jul. 2026",
    stars: 5,
    topics: ["camaras", "comunidades"],
    text: "L'Albert ens ha instal·lat les càmeres a la comunitat i tothom satisfet. És un gran professional: atent, ràpid i sempre a punt per quan el necessites. 100% recomanable!",
  },
  {
    name: "Marta S.",
    date: "sept. 2026",
    stars: 5,
    topics: ["camaras"],
    text: "El material se ve perfecto, ha quedado muy bien la instalación, y rápida. Muy contenta con el trabajo y el resultado.",
  },
  {
    name: "Jaume O.",
    date: "jul. 2026",
    stars: 5,
    topics: ["general"],
    text: "Servicio excelente, muy eficiente y atento durante la instalación! El servicio postvenda de 10! Cualquier incidente te lo resuelve.",
  },
  {
    name: "José Luis T.",
    date: "feb. 2023",
    stars: 5,
    topics: ["camaras", "viviendas"],
    text: "Todo perfecto, me instaló 4 cámaras sin cableado con placas solares, todo un lujo y sin hacer obra. Veo las 24 h toda mi casa por el móvil […] lo recomiendo.",
  },
  {
    name: "Gema V.",
    date: "abr. 2024",
    stars: 5,
    topics: ["camaras", "viviendas"],
    text: "Muy contenta con las cámaras y la instalación súper rápida, cualquier duda que tengas está ahí para ayudarte. Lo recomiendo 100%.",
  },
  {
    name: "Edward P.",
    date: "jul. 2026",
    stars: 5,
    topics: ["general"],
    text: "Muy amable, muy eficaz, súper rápido, buenos consejos y más ágil imposible.",
  },
];

export const GOOGLE_REVIEWS_URL = "https://maps.google.com/?cid=4037912173356516535";

/** Reseñas que mencionan un tema; si no hay suficientes, completa con el resto. */
export function reviewsFor(topic, count = 3) {
  const match = GOOGLE_REVIEWS.filter((r) => r.topics.includes(topic));
  const rest = GOOGLE_REVIEWS.filter((r) => !r.topics.includes(topic));
  return [...match, ...rest].slice(0, count);
}
