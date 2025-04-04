'use client';
import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm'; // Asegúrate de que la ruta sea correcta

export default function HeroSection() {
  const [showLoginModal, setShowLoginModal] = useState(false);

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

      {/* Usamos el LoginModal existente */}
      <LoginForm 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onRecuperarClick={() => {
          setShowLoginModal(false);
          // Aquí deberías manejar el estado para mostrar el modal de recuperación si es necesario
        }}
      />
    </>
  );
}