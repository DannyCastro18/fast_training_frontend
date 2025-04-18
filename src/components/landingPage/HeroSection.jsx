'use client';
import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RecuperarForm from '@/components/auth/RecuperarForm'; // Importamos el componente de recuperación

export default function HeroSection() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRecuperarModal, setShowRecuperarModal] = useState(false);

  const handleRecuperarClick = () => {
    setShowLoginModal(false);
    setShowRecuperarModal(true);
  };

  const handleBackToLogin = () => {
    setShowRecuperarModal(false);
    setShowLoginModal(true);
  };

  return (
    <>
      <header
        className="relative text-center py-20 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/futbol.jpg')" }}
      >
        {/* Overlay para mejor contraste del texto */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-bold">
            Revoluciona tus entrenamientos de fútbol
          </h2>
          <p className="mt-4 text-lg">
            Planifica, administra y visualiza el progreso de tu equipo con
            estadísticas detalladas, todo desde una sola aplicación.
          </p>
          <button 
            onClick={() => setShowLoginModal(true)}
            className="mt-6 bg-[#205088] hover:bg-[#1a4370] text-white px-6 py-3 rounded text-lg transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
      </header>

      {/* Modal de Login */}
      <LoginForm 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onRecuperarClick={handleRecuperarClick} // Pasamos la función de recuperación
      />
      
      {/* Modal de Recuperación */}
      <RecuperarForm 
        isOpen={showRecuperarModal}
        onClose={() => setShowRecuperarModal(false)}
        onBackToLogin={handleBackToLogin} // Pasamos la función para volver al login
      />
    </>
  );
}