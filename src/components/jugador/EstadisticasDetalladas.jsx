'use client'
import { useJugadorData } from '@/context/JugadorDataContext';
import GraficasEstadisticas from './GraficasEstadisticas';

export default function EstadisticasDetalladas({ metricaSeleccionada }) {
  const { jugadorData, loading } = useJugadorData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!jugadorData?.estadisticas) {
    return (
      <div className="text-center py-10 text-gray-500">
        No hay estadísticas disponibles
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <GraficasEstadisticas 
        estadisticas={jugadorData.estadisticas} 
        metricaInicial={metricaSeleccionada}
      />
    </div>
  );
} 