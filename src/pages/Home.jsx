import React from "react";
import Navbar from "../components/landing/Navbar";
import HeroProf from "../components/landing/HeroProf";
import FooterSection from "../components/landing/FooterSection";
import AdvancedSEO from "../components/seo/AdvancedSEO";
import BentoServiciosGrid from "../components/landing/BentoServiciosGrid";
import HomeCamerasBlock from "../components/landing/HomeCamerasBlock";
import HomeAlarmsBlock from "../components/landing/HomeAlarmsBlock";
import HomeSeoLocal from "../components/landing/HomeSeoLocal";
import MarqueeSocial from "../components/landing/MarqueeSocial";
import HomeVideoporterosTeaser from "../components/landing/HomeVideoporterosTeaser";
import HomeTrustSection from "../components/landing/HomeTrustSection";
import AnimatedSecurityBeam from "../components/landing/AnimatedSecurityBeam";
import ComparisonTable from "../components/landing/ComparisonTable";
import { useLeadDrawer } from "@/context/LeadDrawerContext";

export default function Home() {
  const { openDrawer } = useLeadDrawer();

  return (
    <div className="min-h-screen bg-white pb-32">
      <AdvancedSEO
        title="Alarmas en Barcelona | Instalación AJAX | Premium Tech Security"
        description="Especialistas en alarmas en Barcelona y toda Catalunya. Sistemas AJAX, cámaras Hikvision y Dahua 4K. Sin cuotas. Presupuesto gratis 638 10 99 47."
        keywords="alarmas Barcelona, instalación alarmas Barcelona, alarmas AJAX Barcelona, sistemas de alarma Barcelona, cámaras de seguridad Barcelona, videovigilancia Barcelona"
        canonicalUrl="https://alarmasenbarcelona.com"
      />
      <Navbar />
      <main>
        <HeroProf />

        <HomeCamerasBlock onOpenModal={openDrawer} />

        <AnimatedSecurityBeam />

        <BentoServiciosGrid />

        <ComparisonTable />

        <MarqueeSocial />

        <HomeAlarmsBlock onOpenModal={openDrawer} />

        <HomeTrustSection />

        <HomeVideoporterosTeaser />
        <HomeSeoLocal />
      </main>
      <FooterSection />
    </div>
  );
}
