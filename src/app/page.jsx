'use client';
import { useState } from 'react';
import LandingHeader from "@/components/landingPage/LandingHeader";
import LandingFooter from "@/components/landingPage/LandingFooter";
import HeroSection from "@/components/landingPage/HeroSection";
import BeneficiosSection from "@/components/landingPage/BeneficiosSection";
import AppDescargar from "@/components/landingPage/AppDescargar";
import MisionVision from "@/components/landingPage/MisionVision";
import LoginForm from "@/components/auth/LoginForm";
import RecuperarForm from "@/components/auth/RecuperarForm";
import RestablecerForm from '@/components/auth/RestablecerForm';

export default function Home() {
  // Estado unificado para controlar modales
  const [activeModal, setActiveModal] = useState(null);

  // Funciones para manejar modales
  const showModal = (modalName) => setActiveModal(modalName);
  const hideModal = () => setActiveModal(null);

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <LandingHeader onLoginClick={() => showModal('login')} />
      
      {/* Contenido principal */}
      <main className="flex-grow">
        <HeroSection onLoginClick={() => showModal('login')} />
        <BeneficiosSection />
        <AppDescargar />
        <MisionVision />
      </main>

      {/* Footer */}
      <LandingFooter />

      {/* Sistema de Modales */}
      <LoginForm
        isOpen={activeModal === 'login'}
        onClose={hideModal}
        onRecuperarClick={() => showModal('recuperar')}
      />
      
      <RecuperarForm
        isOpen={activeModal === 'recuperar'}
        onClose={hideModal}
        onRestablecerClick={() => showModal('restablecer')}
      />

      <RestablecerForm
        isOpen={activeModal === 'restablecer'}
        onClose={hideModal}
      />
    </div>
  );
}

// import Target from "@/components/TargetMetrica";
// import Calendario from "@/components/Calendario";
// import NavbarJugador from "@/components/NavbarJugador";
// import Eventos from "@/components/Eventos";

// export default function TargetMetrica() {
//   return (
//     <div className="bg-gray-100 text-gray-900 min-h-screen flex flex-col items-center relative justify-center">
//       <div className="absolute w-full h-16 flex items-center justify-between p-2">
//         <NavbarJugador />
//       </div>

//       {/* Ajuste para alinear el texto a la izquierda */}
//       <div className="ml-64 mt-16 text-left">
//         <h1 className="font-bold">¡Hola Cris!</h1>
//         <h3>Tu resumen mensual</h3>
//       </div>

//       <h1 className="text-3xl font-bold mb-6 overflow-hidden max-w-full"></h1>
//       <Target />
//       <div className="self-end mt-4 flex flex-col">
//         <Calendario />
//       </div>
//     </div>
//   );
// }
