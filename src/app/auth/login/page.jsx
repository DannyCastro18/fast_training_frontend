'use client';
import { useState } from 'react';
import LoginForm from "@/components/auth/LoginForm";
import LandingHeader from "@/components/landingPage/LandingHeader";
import HeroSection from "@/components/landingPage/HeroSection";
import BeneficiosSection from "@/components/landingPage/BeneficiosSection";
import AppDescargar from "@/components/landingPage/AppDescargar";
import MisionVision from "@/components/landingPage/MisionVision";
import LandingFooter from "@/components/landingPage/LandingFooter";

export default function LoginPage() {
    const [showModal, setShowModal] = useState(true);

    return (
        <div>
            {/* Header */}
            <LandingHeader onLoginClick={() => {}} />
            <main>
                {/* Contenedor del formulario centrado */}
                <div>
                    <LoginForm 
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                    />
                </div>

                {/* Secciones adicionales */}
                <HeroSection />
                <BeneficiosSection />
                <AppDescargar />
                <MisionVision />
            </main>

            {/* Footer */}
            <LandingFooter />
        </div>
    );
}