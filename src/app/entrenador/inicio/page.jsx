// En entrenador/inicio/page.jsx
"use client";
<<<<<<< HEAD
import { useState } from "react";
import CompletarPerfilModal from "@/components/CompletarPerfilModal";
import Header from "@/components/shared/Header";
import Calendario from "@/components/Calendario";
// import Estadisticas from "@/components/Estadisticas";
=======
import { useState } from 'react';
import CompletarPerfilModal from "@/components/CompletarPerfilModal";
import Calendario from "@/components/Calendario";
import Estadisticas from "@/components/Estadisticas";
import FeaturedPlayers from "@/components/Destacados";
>>>>>>> edu

export default function InicioEntrenador() {
  const [showContent, setShowContent] = useState(false);

  return (
<<<<<<< HEAD
    <div className="flex flex-col items-center justify-center">
      <Calendario />
      {/* <Estadisticas /> */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        {showContent ? (
          <div>Contenido principal del entrenador</div>
        ) : (
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Cargando tu perfil...</h1>
            <p>Por favor espera mientras verificamos tu información.</p>
          </div>
        )}

        <CompletarPerfilModal
          role="entrenador"
          onClose={() => setShowContent(true)}
        />
      </div>
=======
    <div className="flex flex-col items-center justify-center min-h-screen">
      {showContent ? (
        <Calendario />
      ) : (
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Cargando tu perfil...</h1>
          <p>Por favor espera mientras verificamos tu información.</p>
        </div>
      )}
      
      <CompletarPerfilModal 
        role="entrenador"
        onClose={() => setShowContent(true)}
      />
    <div className="flex flex-col items-center justify-center">
      <Calendario />
      <Estadisticas />
      <FeaturedPlayers />
    </div>
>>>>>>> edu
    </div>
  );
}
