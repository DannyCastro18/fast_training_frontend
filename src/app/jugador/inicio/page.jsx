'use client';
import { useState } from 'react';
import CompletarPerfilModal from "@/components/CompletarPerfilModal";
import Header from "@/components/shared/Header";
import Calendario from "@/components/Calendario";

export default function InicioJugador() {
  const [profileComplete, setProfileComplete] = useState(false);

  return (
    <div>
      <Header />
      
      <main className="flex-grow pt-20 px-4">
        {profileComplete ? (
          <Calendario />
        ) : (
          <div className="text-center py-10">
            <p>Por favor completa tu perfil primero</p>
          </div>
        )}
      </main>
      
      <CompletarPerfilModal 
        role="jugador"
        onClose={() => setProfileComplete(true)}
      />
    </div>
  );
}