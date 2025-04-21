"use client";
import { useState } from "react";
import LandingHeader from "@/components/landingPage/LandingHeader";
import HeroSection from "@/components/landingPage/HeroSection";
import BenefitsSection from "@/components/landingPage/BenefitsSection";
import FeatureSection from "@/components/landingPage/FeatureSection";
import DownloadSection from "@/components/landingPage/DownloadSection";
import TeamSection from "@/components/landingPage/TeamSection";
import LoginForm from "@/components/auth/LoginForm";
import RecuperarForm from "@/components/auth/RecuperarForm";
import RestablecerForm from "@/components/auth/RestablecerForm";
import LandingFooter from "@/components/landingPage/LandingFooter";

export default function Home() {
  // Estado unificado para controlar modales
  const [activeModal, setActiveModal] = useState(null);

  // Funciones para manejar modales
  const showModal = (modalName) => setActiveModal(modalName);
  const hideModal = () => setActiveModal(null);

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <LandingHeader onLoginClick={() => showModal("login")} />

      {/* Contenido principal */}
      <main className="flex-grow">
        <HeroSection onLoginClick={() => showModal("login")} />
        <BenefitsSection />
        <FeatureSection />
        <DownloadSection />
        <TeamSection />
      </main>

      {/* Footer */}
      <LandingFooter />

      {/* Sistema de Modales */}
      <LoginForm
        isOpen={activeModal === "login"}
        onClose={hideModal}
        onRecuperarClick={() => showModal("recuperar")}
      />

      <RecuperarForm
        isOpen={activeModal === "recuperar"}
        onClose={hideModal}
        onRestablecerClick={() => showModal("restablecer")}
      />

      <RestablecerForm
        isOpen={activeModal === "restablecer"}
        onClose={hideModal}
      />
    </div>
  );
}
