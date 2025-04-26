"use client";
import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RecuperarForm from "@/components/auth/RecuperarForm";
import LandingHeader from "@/components/landingPage/LandingHeader";
import HeroSection from "@/components/landingPage/HeroSection";
import BenefitsSection from "@/components/landingPage/BenefitsSection";
import FeatureSection from "@/components/landingPage/FeatureSection";
import DownloadSection from "@/components/landingPage/DownloadSection";
import TeamSection from "@/components/landingPage/TeamSection";
import RestablecerForm from "@/components/auth/RestablecerForm";
import LandingFooter from "@/components/landingPage/LandingFooter";

export default function LoginPage() {
  const [activeModal, setActiveModal] = useState("login"); // 'login', 'recuperar' o null

  const handleClose = () => {
    setActiveModal(null);
  };

  const handleRecuperarClick = () => {
    setActiveModal("recuperar");
  };

  const handleBackToLogin = () => {
    setActiveModal("login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader onLoginClick={() => setActiveModal("login")} />

      <main className="flex-grow">
        {/* Modal de Login */}
        <LoginForm
          isOpen={activeModal === "login"}
          onClose={handleClose}
          onRecuperarClick={handleRecuperarClick}
        />

        {/* Modal de Recuperación */}
        <RecuperarForm
          isOpen={activeModal === "recuperar"}
          onClose={handleClose}
          onBackToLogin={handleBackToLogin}
        />

        <HeroSection />
        <BenefitsSection />
        <DownloadSection />
      </main>

      <LandingFooter />
    </div>
  );
}
