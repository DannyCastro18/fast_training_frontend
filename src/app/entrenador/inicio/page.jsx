"use client";

import { useState } from "react";
import CompletarPerfilModal from "@/components/CompletarPerfilModal";
import Calendario from "@/components/Calendario";
import Estadisticas from "@/components/Estadisticas";
import FeaturedPlayers from "@/components/Destacados";

export default function InicioEntrenador() {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="flex flex-col p-4">
      {showContent ? (
        <div>
          <div className="flex justify-between mb-4 ">
            <div className="w-1/2 pr-2">
              <Estadisticas />
            </div>
            <div className="w-1/2 pl-2">
              <Calendario />
            </div>
          </div>

          <div className="flex ">
            <div className="">
              <FeaturedPlayers />
            </div>
            <div className="bg-white rounded-lg ml-20 shadow p-4 w-2/5 flex items-center justify-center text-gray-400">
            Espacio disponible para eventos ⚽
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center flex-1">
          <h1 className="text-2xl font-bold mb-4">Cargando tu perfil...</h1>
          <p>Por favor espera mientras verificamos tu información.</p>
        </div>
      )}

      <CompletarPerfilModal
        role="entrenador"
        onClose={() => setShowContent(true)}
      />
    </div>
  );
}
