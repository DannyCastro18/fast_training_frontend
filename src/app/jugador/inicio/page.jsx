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
  const profileComplete = jugadorData?.perfilCompleto;
  console.log(profileComplete)

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {profileComplete ? (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">
            ¡Hola {jugadorData?.perfil?.nombre || "Jugador"}!
          </h1>
          
          {/* Métricas Cards */}
          <MetricasCards 
            onMetricaSelect={setMetricaSeleccionada}
            metricaSeleccionada={metricaSeleccionada}
          />

          {/* Estadísticas Detalladas */}
          <EstadisticasDetalladas metricaSeleccionada={metricaSeleccionada} />
        </div>
      ) : (
        <CompletarPerfilModal role="jugador" />
      )}
    </div>
  );
}