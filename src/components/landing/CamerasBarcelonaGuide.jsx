import React from "react";
import { Link } from "react-router-dom";
import { Building2, Store, Users, Wrench, Network, ArrowRight } from "lucide-react";
import { businessStats } from "@/lib/businessStats";

// Contenido propio de /camaras-barcelona, la página central de cámaras.
// La auditoría de Search Console (oct. 2026) mostró que Google llevaba a la
// home las búsquedas de cámaras: esta página necesitaba cubrir por sí sola
// los segmentos que sí se buscan (empresas, comunidades, CCTV/IP,
// mantenimiento) y responder a las preguntas reales del bloque "Otras
// preguntas de los usuarios". Solo datos verificables: nada de cifras de
// clientes, años ni homologaciones que no estén confirmadas.

const SEGMENTS = [
  {
    id: "empresas",
    Icon: Store,
    title: "Videovigilancia para negocios y empresas",
    text: "Tiendas, oficinas, restaurantes, almacenes, naves y despachos. Planificamos qué zonas cubrir (accesos, caja, almacén, exterior), dimensionamos el grabador para grabación continua y dejamos el acceso desde el móvil para cada responsable, con sus propios permisos.",
    points: ["Cámaras con detección de personas y vehículos", "Grabador NVR dimensionado para grabación 24/7", "Usuarios con permisos distintos (gerencia, encargados)", "Cartel informativo de zona videovigilada"],
    link: { to: "/BlogArticle/videovigilancia-empresas-barcelona", label: "Guía de videovigilancia para empresas" },
  },
  {
    id: "comunidades",
    Icon: Users,
    title: "Cámaras de seguridad para comunidades de vecinos",
    text: "Accesos, portales, garajes, ascensores, trasteros y zonas comunes. Antes de instalar, la comunidad debe aprobar la instalación en junta de propietarios. Nosotros preparamos el presupuesto y la propuesta técnica para presentarla, y dejamos el sistema con el acceso limitado a las personas que la comunidad designe.",
    points: ["Propuesta técnica y presupuesto para la junta", "Cámaras domo antivandálicas para interiores y garaje", "Encuadre limitado a zonas comunes", "Cartel informativo y acceso restringido a las grabaciones"],
    link: { to: "/BlogArticle/alarmas-comunidades-vecinos", label: "Seguridad en comunidades de vecinos" },
  },
  {
    id: "viviendas",
    Icon: Building2,
    title: "Cámaras para viviendas, pisos y casas",
    text: "Entrada, terraza, jardín, garaje o la puerta del piso. Elegimos cámaras discretas, con visión nocturna, y las configuramos para que solo graben tu propiedad. Ves las imágenes en directo desde el móvil y recibes avisos cuando detectan a una persona.",
    points: ["Visión nocturna y detección de personas", "Grabación en disco local, sin cuota mensual", "Avisos al móvil", "Compatible con alarma Ajax"],
    link: { to: "/alarmas-barcelona", label: "Combínalas con una alarma Ajax" },
  },
];

const TECH = [
  {
    title: "Cámaras IP",
    text: "Cada cámara envía la imagen digital por cable de red, que también la alimenta (PoE). Ofrecen más resolución, analítica inteligente y un cableado más sencillo en instalaciones nuevas. Es la opción que recomendamos en la mayoría de proyectos.",
  },
  {
    title: "CCTV analógico HD",
    text: "Funciona con cable coaxial y un grabador DVR. Tiene sentido cuando ya existe una instalación de coaxial que se puede aprovechar, porque permite renovar las cámaras sin volver a cablear.",
  },
  {
    title: "Grabador NVR / DVR",
    text: "Guarda las grabaciones en un disco duro en tu casa o negocio. Los días que se conservan dependen del número de cámaras, la resolución y el tamaño del disco; los calculamos en el presupuesto.",
  },
  {
    title: "Acceso remoto desde el móvil",
    text: "Configuramos la app compatible: Hik-Connect para Hikvision y DMSS para Dahua. Con conexión, podrás ver las cámaras y, cuando el equipo lo permita, consultar grabaciones y recibir avisos.",
  },
];

const LEGAL = [
  "Colocar un cartel informativo visible en los accesos a la zona videovigilada, indicando quién es el responsable y cómo ejercer los derechos de protección de datos.",
  "Grabar solo el propio espacio. La vía pública solo puede captarse en la medida imprescindible para vigilar el acceso.",
  "Borrar las grabaciones en un plazo máximo de un mes, salvo que deban conservarse para acreditar un hecho ante la policía o un juzgado.",
  "Limitar quién puede ver las imágenes y no publicarlas ni difundirlas.",
];

const h2 = { fontWeight: 900, fontSize: 24, color: "#0A0A1A", margin: "0 0 8px" };
const lead = { color: "#4B5563", fontSize: 15, lineHeight: 1.7, margin: "0 0 28px", maxWidth: 720 };

export const BARCELONA_EXTRA_FAQS = [
  {
    q: "¿Dónde es legal poner cámaras de seguridad?",
    a: "En tu vivienda, negocio o en las zonas comunes de una comunidad que lo haya aprobado, siempre que las cámaras graben tu propio espacio. La vía pública solo puede captarse en lo imprescindible para vigilar el acceso, y es obligatorio un cartel informativo visible. Configuramos el encuadre para cumplirlo.",
  },
  {
    q: "¿Cuánto tiempo se pueden guardar las grabaciones?",
    a: "Como máximo un mes. Pasado ese plazo deben borrarse, salvo que sean necesarias para acreditar un hecho ante la policía o un juzgado. Dejamos el grabador configurado para que sobrescriba las grabaciones antiguas automáticamente.",
  },
  {
    q: "¿Quién puede ver las grabaciones de las cámaras de un negocio o comunidad?",
    a: "Solo las personas autorizadas por el responsable: el titular del negocio o las personas que designe la comunidad. Las grabaciones pueden entregarse a la policía o a un juzgado cuando lo requieran. Creamos usuarios separados para que cada persona tenga solo los permisos que necesita.",
  },
  {
    q: "¿Qué diferencia hay entre cámaras IP y CCTV analógico?",
    a: "Las cámaras IP envían la imagen digital por cable de red y suelen ofrecer más resolución y funciones inteligentes. El CCTV analógico HD usa cable coaxial y es útil para renovar instalaciones antiguas sin volver a cablear. Te recomendamos una u otra según el lugar y la instalación existente.",
  },
  {
    q: "¿Hacéis mantenimiento de cámaras ya instaladas?",
    a: "Sí. Revisamos cámaras, grabador y disco duro, actualizamos el firmware, ajustamos el encuadre y comprobamos el acceso desde el móvil, también en sistemas Hikvision y Dahua que no instalamos nosotros.",
  },
];

export default function CamerasBarcelonaGuide({ onRequestQuote }) {
  return (
    <>
      {/* ── SEGMENTOS ── */}
      <section id="segmentos" style={{ backgroundColor: "#fff", padding: "56px 20px" }}>
        <div className="max-w-5xl mx-auto">
          <h2 style={h2}>Instalación de cámaras de seguridad en Barcelona para cada tipo de cliente</h2>
          <p style={lead}>
            Cada instalación empieza por una visita o una conversación para entender qué quieres ver y grabar. Estos son los casos más habituales en Barcelona y su área metropolitana.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {SEGMENTS.map(({ id, Icon, title, text, points, link }) => (
              <article key={id} id={id} style={{ background: "#F8F9FA", border: "1px solid #E5E7EB", borderRadius: 18, padding: 24, display: "flex", flexDirection: "column" }}>
                <Icon size={26} color="#C53030" aria-hidden="true" />
                <h3 style={{ fontWeight: 800, fontSize: 17, color: "#0A0A1A", margin: "14px 0 8px", lineHeight: 1.3 }}>{title}</h3>
                <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.65, margin: "0 0 14px" }}>{text}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
                  {points.map((p) => (
                    <li key={p} style={{ fontSize: 13, color: "#374151", display: "flex", gap: 8 }}>
                      <span style={{ color: "#C53030", fontWeight: 700 }} aria-hidden="true">✓</span>{p}
                    </li>
                  ))}
                </ul>
                <Link to={link.to} style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 6, color: "#C53030", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                  {link.label} <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA PRESUPUESTO ── acceso directo a formulario, WhatsApp y teléfono
          justo después de los segmentos, que es donde se decide el tipo de instalación. */}
      <section id="presupuesto" style={{ backgroundColor: "#fff", padding: "0 20px 56px" }}>
        <div className="max-w-5xl mx-auto" style={{ background: "#0A0A1A", borderRadius: 20, padding: "28px 24px" }}>
          <h2 style={{ ...h2, color: "#fff", fontSize: 22 }}>Solicita presupuesto gratuito para instalar cámaras de seguridad</h2>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 15, lineHeight: 1.65, margin: "0 0 18px", maxWidth: 680 }}>
            Cuéntanos si es para un negocio, una comunidad o una vivienda y cuántas zonas quieres cubrir. Te respondemos con una propuesta y, si hace falta, una visita sin compromiso en Barcelona, L'Hospitalet, Sabadell y el resto del área metropolitana.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <button type="button" onClick={onRequestQuote} style={{ backgroundColor: "#C53030", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "13px 24px", border: "none", cursor: "pointer" }}>
              Pedir presupuesto gratis →
            </button>
            <a href={`https://wa.me/${businessStats.phone.replace("+", "")}?text=${encodeURIComponent("Hola, quiero presupuesto para instalar cámaras de seguridad.")}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "#25D366", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "13px 22px", textDecoration: "none" }}>
              WhatsApp
            </a>
            <a href={`tel:${businessStats.phone}`} style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#fff", fontWeight: 700, fontSize: 15, borderRadius: 50, padding: "12px 22px", textDecoration: "none" }}>
              Llamar al {businessStats.phoneDisplay}
            </a>
          </div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, margin: "16px 0 0" }}>
            También instalamos en <Link to="/Hospitalet" style={{ color: "#F87171" }}>L'Hospitalet</Link> y <Link to="/camaras-sabadell" style={{ color: "#F87171" }}>Sabadell</Link>.
          </p>
        </div>
      </section>

      {/* ── CCTV / IP / NVR ── */}
      <section id="cctv-ip" style={{ backgroundColor: "#0A0A1A", padding: "56px 20px" }}>
        <div className="max-w-5xl mx-auto">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <Network size={22} color="#F87171" aria-hidden="true" />
            <h2 style={{ ...h2, color: "#fff", margin: 0 }}>Cámaras IP, CCTV y grabadores: qué instalamos</h2>
          </div>
          <p style={{ ...lead, color: "rgba(255,255,255,0.8)" }}>
            Instalamos sistemas IP y CCTV analógico HD de Hikvision y Dahua. La elección depende del lugar, del cableado que ya exista y de lo que necesites grabar.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TECH.map((t) => (
              <div key={t.title} style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: 16, padding: 20, background: "rgba(255,255,255,0.04)" }}>
                <h3 style={{ fontWeight: 800, fontSize: 16, color: "#fff", margin: "0 0 6px" }}>{t.title}</h3>
                <p style={{ fontSize: 14, color: "#CBD5E1", lineHeight: 1.65, margin: 0 }}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NORMATIVA ── */}
      <section id="normativa" style={{ backgroundColor: "#F8F9FA", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto">
          <h2 style={h2}>Cámaras de seguridad y protección de datos</h2>
          <p style={lead}>
            Las cámaras que graban personas están sujetas a la normativa de protección de datos. Lo básico que hay que cumplir:
          </p>
          <ol style={{ margin: "0 0 20px", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {LEGAL.map((l) => (
              <li key={l} style={{ fontSize: 14, color: "#374151", lineHeight: 1.65 }}>{l}</li>
            ))}
          </ol>
          <Link to="/BlogArticle/normativa-videovigilancia-rgpd-catalunya" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#C53030", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
            Normativa de videovigilancia en Catalunya, explicada <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── MANTENIMIENTO ── */}
      <section id="mantenimiento" style={{ backgroundColor: "#fff", padding: "56px 20px" }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-[auto_1fr]" style={{ gap: 20, alignItems: "start" }}>
          <Wrench size={30} color="#C53030" aria-hidden="true" />
          <div>
            <h2 style={h2}>Mantenimiento de cámaras de seguridad en Barcelona</h2>
            <p style={{ ...lead, marginBottom: 18 }}>
              Un disco lleno, una cámara desenfocada o una app que ya no conecta dejan el sistema sin grabar justo cuando hace falta. Revisamos cámaras, grabador y disco duro, actualizamos el firmware y comprobamos el acceso desde el móvil, también en instalaciones Hikvision y Dahua que no hicimos nosotros.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <button type="button" onClick={onRequestQuote} style={{ backgroundColor: "#C53030", color: "#fff", fontWeight: 800, fontSize: 15, borderRadius: 50, padding: "13px 24px", border: "none", cursor: "pointer" }}>
                Pedir revisión o presupuesto →
              </button>
              <Link to="/MantenimientoSoporte" style={{ border: "2px solid #E5E7EB", color: "#0A0A1A", fontWeight: 700, fontSize: 15, borderRadius: 50, padding: "11px 22px", textDecoration: "none" }}>
                Ver servicio de mantenimiento
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
