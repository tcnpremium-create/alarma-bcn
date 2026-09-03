import React from "react";
import { Link } from "react-router-dom";

/**
 * Enlaces contextuales de cada artículo a las páginas de servicio.
 *
 * El blog enlazaba a /Calculadora desde los 30 artículos y casi nunca a
 * las páginas comerciales, así que las landings no recibían autoridad
 * interna desde el contenido que sí posiciona.
 *
 * El mapa es editorial: cada artículo enlaza solo a los servicios que
 * trata de verdad (2–3, nunca todos), y el anchor se elige entre varias
 * redacciones por servicio para no repetir el mismo texto en 30 páginas.
 * Un artículo sin relación clara con ningún servicio no lleva bloque.
 */

const SERVICES = {
  alarmas: {
    href: "/alarmas-barcelona",
    anchors: [
      "instalación de alarmas en Barcelona",
      "sistemas de alarma Ajax en Barcelona",
      "alarmas para vivienda y negocio",
    ],
  },
  camaras: {
    href: "/camaras-barcelona",
    anchors: [
      "cámaras de seguridad en Barcelona",
      "instalación de videovigilancia",
      "cámaras Hikvision y Dahua",
    ],
  },
  videoporteros: {
    href: "/videoporteros",
    anchors: ["videoporteros IP", "instalación de videoporteros", "videoporteros para comunidades"],
  },
  accesos: {
    href: "/control-accesos",
    anchors: ["control de accesos", "control de accesos biométrico", "sistemas de acceso para empresas"],
  },
  mantenimiento: {
    href: "/MantenimientoSoporte",
    anchors: ["mantenimiento y soporte técnico", "servicio de mantenimiento", "revisiones y soporte"],
  },
  kits: {
    href: "/Promociones",
    anchors: ["kits con precio cerrado", "kits de alarma y cámaras", "nuestros kits e instalación incluida"],
  },
  guia: {
    // /GuiaSeguridadBarcelona tenía UN solo enlace entrante en todo el sitio
    // (desde /Blog) pese a ser una guía completa. Se enlaza solo desde los
    // artículos centrados en Barcelona, donde de verdad continúa la lectura.
    href: "/GuiaSeguridadBarcelona",
    anchors: [
      "guía de seguridad de Barcelona",
      "nuestra guía de seguridad para Barcelona",
      "cómo protegerse en Barcelona",
    ],
  },
  comparativa: {
    href: "/ComparativaAlarmas",
    anchors: ["comparativa de alarmas", "comparativa entre marcas", "qué alarma elegir"],
  },
};

/** slug del artículo -> servicios realmente relacionados */
const ARTICLE_SERVICES = {
  "precio-instalar-alarma-barcelona": ["alarmas", "kits"],
  "mejores-alarmas-casa-barcelona": ["alarmas", "comparativa"],
  "alarmas-sin-cuota-mensual": ["alarmas", "kits"],
  "empresas-alarmas-barcelona": ["alarmas", "comparativa", "guia"],
  "alarma-local-comercial": ["alarmas", "camaras"],
  "seguridad-negocios-barcelona": ["alarmas", "camaras", "accesos"],
  "videovigilancia-empresas-barcelona": ["camaras", "accesos"],
  "sensores-movimiento-alarma": ["alarmas", "mantenimiento"],
  "precio-alarma-negocio-barcelona": ["alarmas", "kits"],
  "comparativa-alarmas-espana-2026": ["comparativa", "alarmas"],
  "alarmas-pisos-barcelona": ["alarmas", "videoporteros"],
  "alarmas-aviso-policia": ["alarmas", "mantenimiento"],
  "alarmas-chalets": ["alarmas", "camaras"],
  "alarmas-garajes": ["alarmas", "camaras", "accesos"],
  "alarmas-comunidades-vecinos": ["videoporteros", "accesos", "camaras"],
  "zonas-riesgo-robo-barcelona-2026": ["alarmas", "camaras", "guia"],
  "control-accesos-biometrico-empresas": ["accesos", "videoporteros"],
  "alarmas-camara-vs-sin-camara": ["alarmas", "camaras"],
  "cuanto-tarda-instalar-alarma": ["alarmas", "kits"],
  "mantenimiento-alarma": ["mantenimiento", "alarmas"],
  "alarmas-app-movil": ["alarmas", "mantenimiento"],
  "elegir-alarma-hogar-barcelona": ["alarmas", "comparativa", "guia"],
  "alarmas-negocios-barcelona": ["alarmas", "camaras"],
  "comparativa-ajax-hikvision": ["comparativa", "alarmas", "camaras"],
  "camaras-ip-barcelona-2026": ["camaras", "kits"],
  "domotica-seguridad-smart-home": ["alarmas", "videoporteros"],
  "consejos-elegir-alarma-perfecta": ["alarmas", "comparativa"],
  "videovigilancia-ia-barcelona-2026": ["camaras", "kits"],
  "proteger-negocio-robos-barcelona": ["alarmas", "camaras", "accesos"],
  "normativa-videovigilancia-rgpd-catalunya": ["camaras", "accesos"],
};

/** Reparte las variantes de anchor de forma estable por slug. */
function pickAnchor(anchors, slug, index) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 997;
  return anchors[(h + index) % anchors.length];
}

export default function ArticleServiceLinks({ slug }) {
  const keys = ARTICLE_SERVICES[slug];
  if (!keys || keys.length === 0) return null;

  return (
    <aside className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-lg font-bold text-[#0A1628] mb-3">Servicios relacionados</h2>
      <ul className="space-y-2">
        {keys.map((k, i) => {
          const s = SERVICES[k];
          if (!s) return null;
          return (
            <li key={k}>
              <Link to={s.href} className="text-[#E63946] hover:underline font-medium">
                {pickAnchor(s.anchors, slug, i)}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
