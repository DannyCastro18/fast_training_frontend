"use client";
import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RecuperarForm from "@/components/auth/RecuperarForm"; // Importamos el componente de recuperación

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
      <section
        id="inicio"
        className="text-center py-20 bg-[url('/images/player-in-jogo02.png')] text-white bg-cover h-screen bg-bottom"
      >
        <div
          style={{
            clipPath: "polygon(100% 0%, 80% 40%, 100% 100%, 0 100%, 0 0)",
          }}
          className="absolute top-0 left-0 w-2/3 h-full bg-black/50 z-0 backdrop-blur-xs"
        />
        {/* Línea decorativa en forma de paralelogramo en el borde derecho */}
        <div
          style={{
            clipPath: "polygon(0 20%, 120% 15%, 100% 97%, 0 100%)",
          }}
          className="absolute bottom-[-10] left-185 w-7 h-140 bg-cyan-500 z-10 rotate-[335deg]"
        ></div>

        <div
          style={{
            clipPath: "polygon(0 2%, 100% 0%, 100% 93%, 0 90%)",
          }}
          className="absolute top-60 left-3/5 w-3 h-100 bg-cyan-500 opacity-70 z-10 rotate-[335deg]"
        ></div>

        <div
          style={{
            clipPath: "polygon(0 37%, 100% 30%, 100% 100%, 0 90%)",
          }}
          className="absolute top-0 left-3/5 w-5 h-48 bg-cyan-500 opacity-50 z-10 rotate-[35deg]"
        ></div>

        <div className="flex justify-left items-center h-full">
          <div className="w-1/2 flex flex-col items-start justify-center p-20 z-10">
            {/* <h1 className="text-xl font-black italic mb-4">Fast Training</h1> */}
            <h2 className="text-5xl font-bold italic mb-4 text-start">
              Entrenamiento inteligente, rendimiento extraordinario
            </h2>
            <h2 className="text-start">
              Automatiza la planificación, personaliza los entrenamientos y
              lleva el control de tu equipo fácilmente.
            </h2>
            <button
              onClick={() => setShowLoginModal(true)}
              className="mt-6 hover:scale-110 bg-black/0 font-bold border-2 hover:bg-cyan-500/50  hover:border-cyan-500/50 text-white px-6 py-3 rounded-4xl text-lg transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </section>

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
