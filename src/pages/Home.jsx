import React, { useState } from "react";
import Navbar from "../components/landing/Navbar";
import HeroProf from "../components/landing/HeroProf";
import HeroLeadForm from "../components/landing/HeroLeadForm";
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
import PresupuestoModal from "../components/landing/PresupuestoModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

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

        <HeroLeadForm />

        <HomeCamerasBlock onOpenModal={() => setModalOpen(true)} />

        <AnimatedSecurityBeam />

        <BentoServiciosGrid />

        <ComparisonTable />

        <MarqueeSocial />

        <HomeAlarmsBlock onOpenModal={() => setModalOpen(true)} />

        <HomeTrustSection />

        <HomeVideoporterosTeaser />
        <HomeSeoLocal />
      </main>
      <FooterSection />
      <PresupuestoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
