'use client';
import { useState } from 'react';
import RecuperarForm from "@/components/auth/RecuperarForm";
import LandingHeader from "@/components/landingPage/LandingHeader";
import HeroSection from "@/components/landingPage/HeroSection";
import BeneficiosSection from "@/components/landingPage/BeneficiosSection";
import AppDescargar from "@/components/landingPage/AppDescargar";
import MisionVision from "@/components/landingPage/MisionVision";
import LandingFooter from "@/components/landingPage/LandingFooter";

export default function RecuperarPage() {
    const [showModal, setShowModal] = useState(true);

    return (
        <div className="min-h-screen flex flex-col">
            <LandingHeader onLoginClick={() => setShowModal(true)} />
            
            <main className="flex-grow">
                <RecuperarForm 
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onBackToLogin={() => {
                        setShowModal(false);
                    }}
                />

                <HeroSection />
                <BeneficiosSection />
                <AppDescargar />
                <MisionVision />
            </main>

            <LandingFooter />
        </div>
    );
}