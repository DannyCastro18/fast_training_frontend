'use client';
import { useState, useEffect } from 'react';
import CompletarPerfilModal from "@/components/CompletarPerfilModal";
import { useJugadorData } from '@/context/JugadorDataContext';
import { useUser } from '@/context/UserContext';
import MetricasCards from '@/components/jugador/MetricasCards';
import EstadisticasDetalladas from '@/components/jugador/EstadisticasDetalladas';
import Calendario from "@/components/Calendario";
import Loading from "@/components/shared/Loading";

export default function InicioJugador() {
  const { jugadorData, loading: loadingJugadorData } = useJugadorData();
  const { user, loading: loadingUser, refetchUser } = useUser();
  const [metricaSeleccionada, setMetricaSeleccionada] = useState('todas');
  
  // Sincronización automática al cargar
  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  // Verificación robusta del perfil completo
  const isProfileComplete = jugadorData?.perfilCompleto?.profileComplete ?? false;

  if (loadingJugadorData || loadingUser) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {isProfileComplete ? (
        <div className="space-y-8">
          {/* Encabezado con nombre actualizado */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              ¡Hola {user?.nombre || "Jugador"}!
            </h1>
            <button 
              onClick={refetchUser}
              className="text-sm text-blue-600 hover:text-blue-800"
              aria-label="Actualizar datos"
            >
              Actualizar
            </button>
          </div>
          
          {/* Sección de métricas */}
          <MetricasCards 
            onMetricaSelect={setMetricaSeleccionada}
            metricaSeleccionada={metricaSeleccionada}
          />

          {/* Estadísticas */}
          <EstadisticasDetalladas 
            metricaSeleccionada={metricaSeleccionada} 
            userId={user?.id} 
            key={user?.id} // Forzar recarga al cambiar usuario
          />
          
          {/* Calendario */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Próximos entrenamientos</h2>
            <Calendario jugadorId={user?.id} />
          </div>
        </div>
      ) : (
        <CompletarPerfilModal 
          role="jugador" 
          onComplete={refetchUser} // Actualizar datos después de completar perfil
        />
      )}
    </div>
  );
}