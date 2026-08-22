import React from "react";
import Navbar from "../components/landing/Navbar";
import HeroProf from "../components/landing/HeroProf";
import FooterSection from "../components/landing/FooterSection";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import HomeCamerasBlock from "../components/landing/HomeCamerasBlock";
import HomeAlarmsBlock from "../components/landing/HomeAlarmsBlock";
import HomeSeoLocal from "../components/landing/HomeSeoLocal";
import MarqueeSocial from "../components/landing/MarqueeSocial";
import HomeMoreServices from "../components/landing/HomeMoreServices";
import HomeTrustSection from "../components/landing/HomeTrustSection";
import AnimatedSecurityBeam from "../components/landing/AnimatedSecurityBeam";
import ComparisonTable from "../components/landing/ComparisonTable";
import ProcessSection from "../components/landing/ProcessSection";
import FinalCTA from "../components/landing/FinalCTA";
import { useLeadDrawer } from "@/context/LeadDrawerContext";

export default function Home() {
  const { openDrawer } = useLeadDrawer();

  return (
    <div className="min-h-screen bg-white pb-32">
      <AdvancedSEO
        title="Cámaras de Seguridad y Alarmas en Barcelona | Premium Tech Security"
        description="Especialistas en cámaras de seguridad y alarmas en Barcelona y toda Catalunya. Cámaras Hikvision y Dahua 4K, sistemas de alarma AJAX. Sin cuotas. Presupuesto gratis 638 10 99 47."
        keywords="cámaras de seguridad Barcelona, videovigilancia Barcelona, instalación de cámaras Barcelona, alarmas Barcelona, alarmas AJAX Barcelona, sistemas CCTV Barcelona"
        canonicalUrl="https://alarmasenbarcelona.com"
      />
      <Navbar />
      <main>
        {/* HERO */}
        <HeroProf />

        {/* CÁMARAS — protagonista #1 */}
        <HomeCamerasBlock onOpenModal={openDrawer} />

        {/* ALARMAS — protagonista #2 */}
        <HomeAlarmsBlock onOpenModal={openDrawer} />

        {/* CÓMO FUNCIONA — pertenece a ambos protagonistas por igual, no
            solo a Alarmas, así que va después de los dos en vez de partirlos */}
        <AnimatedSecurityBeam />

        {/* MÁS SOLUCIONES */}
        <HomeMoreServices />

        {/* CONFIANZA */}
        <HomeTrustSection />
        <MarqueeSocial />
        <ComparisonTable />

        {/* PROCESO */}
        <ProcessSection />

        {/* COBERTURA LOCAL */}
        <HomeSeoLocal />

        {/* CTA FINAL */}
        <FinalCTA onOpenModal={openDrawer} />
      </main>
      <FooterSection />
    </div>
  );
}
