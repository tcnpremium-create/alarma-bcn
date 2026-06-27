import React from "react";
import Navbar from "../components/landing/Navbar";
import FooterSection from "../components/landing/FooterSection";
import TecnologiaSection from "../components/landing/TecnologiaSection";
import MarcasSection from "../components/landing/MarcasSection";
import LegalRGPDSection from "../components/landing/LegalRGPDSection";
import TestimoniosSection from "../components/landing/TestimoniosSection";
import SectoresSection from "../components/landing/SectoresSection";
import FinalCTABanner from "../components/landing/FinalCTABanner";
import AdvancedSEO from "../components/seo/AdvancedSEO";

export default function TecnologiaGuia() {
  return (
    <div className="min-h-screen bg-white">
      <AdvancedSEO
        title="Tecnología de Cámaras de Seguridad | IA, 4K, Visión Nocturna | Premium Tech Security"
        description="Descubre la tecnología de nuestras cámaras de seguridad: Inteligencia Artificial, resolución 4K, visión nocturna en color y control 24/7 desde el móvil. Marcas líderes: Hikvision, Dahua, Ajax Systems, Axis."
        keywords="tecnología cámaras seguridad, cámaras IA Barcelona, cámaras 4K, visión nocturna color, Hikvision, Dahua, Ajax Systems, RGPD cámaras"
        canonicalUrl="https://alarmasenbarcelona.com/tecnologia"
      />
      <Navbar />
      <main className="pt-24">
        <TecnologiaSection />
        <MarcasSection />
        <LegalRGPDSection />
        <TestimoniosSection />
        <SectoresSection />
        <FinalCTABanner />
      </main>
      <FooterSection />
    </div>
  );
}