'use client';
import { useState } from 'react';
import RestablecerForm from "@/components/auth/RestablecerForm";
import LandingHeader from "@/components/landingPage/LandingHeader";
import HeroSection from "@/components/landingPage/HeroSection";
import BeneficiosSection from "@/components/landingPage/BeneficiosSection";
import AppDescargar from "@/components/landingPage/AppDescargar";
import MisionVision from "@/components/landingPage/MisionVision";
import LandingFooter from "@/components/landingPage/LandingFooter";

export default function RestablecerPage() {
    const [showModal, setShowModal] = useState(true);

    return (
        <div>
            {/* Header */}
            <LandingHeader onLoginClick={() => {}} />
            <main>
                {/* Contenedor del formulario centrado */}
                <div>
                    <RestablecerForm 
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