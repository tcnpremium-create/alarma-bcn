import React from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import { Helmet } from "react-helmet";
import { Shield, Camera, Fingerprint, Home, Building2, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function GuiaSeguridadBarcelona() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Guía Completa de Seguridad para Hogares y Negocios en Barcelona 2026</title>
        <meta name="description" content="Todo lo que necesitas saber sobre sistemas de alarma, videovigilancia y control de accesos en Barcelona. Guía actualizada 2026 con precios, marcas y consejos de expertos." />
        <link rel="canonical" href="https://alarmasenbarcelona.com/GuiaSeguridadBarcelona" />
      </Helmet>
      <Navbar />

      <main className="pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0A1628] mb-6 leading-tight">
            Guía Completa de Seguridad para Hogares y Negocios en Barcelona (2026)
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Barcelona es una de las ciudades más vibrantes de Europa, pero también presenta desafíos en materia de seguridad. Esta guía te ayudará a elegir el sistema de protección adecuado para tu vivienda o negocio.
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">¿Por qué necesitas un sistema de seguridad en Barcelona?</h2>
            <p>
              Según datos del Ministerio del Interior, Barcelona registra miles de incidencias de robos en domicilios y comercios cada año. Las zonas más afectadas incluyen barrios como el Eixample, Ciutat Vella, Sants-Montjuïc y Nou Barris. Instalar un sistema de alarma profesional reduce significativamente el riesgo de intrusión, ya que los estudios demuestran que las viviendas sin alarma tienen hasta 3 veces más probabilidades de ser robadas que aquellas protegidas con un sistema certificado.
            </p>

            <h2 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">Tipos de sistemas de seguridad disponibles</h2>
            <p>
              El mercado actual ofrece diversas soluciones adaptadas a cada necesidad y presupuesto. Los sistemas de <strong>alarma inalámbrica AJAX</strong> son ideales para hogares y pisos, ya que no requieren cableado y se instalan en pocas horas. Para negocios y naves industriales, los sistemas de <strong>videovigilancia con cámaras IP Hikvision 4K</strong> proporcionan imágenes de alta resolución con detección inteligente mediante inteligencia artificial. El <strong>control de accesos biométrico</strong> con lectura de huella dactilar o reconocimiento facial es la opción preferida para empresas con múltiples empleados, mientras que los <strong>videoporteros IP</strong> permiten ver y comunicarse con visitantes desde el smartphone, estés donde estés.
            </p>

            <h2 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">¿Cuánto cuesta instalar una alarma en Barcelona?</h2>
            <p>
              Los precios varían según el tipo de sistema y la superficie a proteger. Un kit básico de alarma AJAX para un piso empieza desde los 400 euros con instalación incluida. Los kits de videovigilancia con 2 cámaras Full HD arrancan desde 680 euros, mientras que un sistema completo de seguridad para un negocio mediano puede oscilar entre 1.200 y 3.000 euros. Es fundamental elegir un instalador profesional que ofrezca garantía en equipos y mano de obra, sin permanencias ni contratos abusivos.
            </p>

            <h2 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">Cómo elegir al mejor instalador de alarmas</h2>
            <p>
              Al seleccionar una empresa instaladora de seguridad en Barcelona, deberías considerar los siguientes factores: experiencia demostrable con instalaciones previas verificables, certificación oficial de las marcas que instalan (AJAX, Hikvision, etc.), transparencia en precios sin costes ocultos, servicio postventa y mantenimiento incluido, y la posibilidad de realizar una visita técnica gratuita antes de comprometerte. Un buen instalador siempre te ofrecerá un presupuesto personalizado después de evaluar tu propiedad in situ.
            </p>

            <h2 className="text-2xl font-bold text-[#0A1628] mt-10 mb-4">Normativa legal en Catalunya</h2>
            <p>
              Si instalas cámaras de videovigilancia, debes cumplir con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos (LOPD). Esto incluye colocar carteles informativos visibles, registrar el sistema ante la Agencia Española de Protección de Datos si es necesario, y garantizar que las grabaciones se almacenen de forma segura durante un máximo de 30 días. Un instalador profesional te asesorará sobre todos estos requisitos legales.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-[#E63946] to-[#c02e3a] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">¿Necesitas asesoramiento personalizado?</h2>
            <p className="text-white/80 mb-6">Solicita una visita técnica gratuita y recibe un presupuesto sin compromiso</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/Contact" className="inline-flex items-center justify-center gap-2 bg-white text-[#E63946] font-bold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors">
                Contactar ahora
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+34638109947" className="inline-flex items-center justify-center gap-2 bg-white/20 border border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/30 transition-colors">
                638 10 99 47
              </a>
            </div>
          </div>
        </article>
      </main>

      <FooterSection />
    </div>
  );
}