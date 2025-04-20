'use client';
import { useState } from 'react';
import CompletarPerfilModal from "@/components/CompletarPerfilModal";
import { useJugadorData } from '@/context/JugadorDataContext';
import MetricasCards from '@/components/jugador/MetricasCards';
import EstadisticasDetalladas from '@/components/jugador/EstadisticasDetalladas';
import Calendario from "@/components/Calendario";

export default function InicioJugador() {
  const { jugadorData, loading } = useJugadorData();
  const [metricaSeleccionada, setMetricaSeleccionada] = useState('todas');
  
  // Verificación más robusta del perfil completo
  const profileComplete = jugadorData?.perfilCompleto?.profileComplete ?? false;

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {profileComplete ? (
        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-gray-800">
            ¡Hola {jugadorData?.perfil?.nombre || "Jugador"}!
          </h1>
          
          <MetricasCards 
            onMetricaSelect={setMetricaSeleccionada}
            metricaSeleccionada={metricaSeleccionada}
          />

          <EstadisticasDetalladas metricaSeleccionada={metricaSeleccionada} />
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Próximos entrenamientos</h2>
            <Calendario />
          </div>
        </div>
      ) : (
        <CompletarPerfilModal role="jugador" />
      )}
    </div>
  );
}