'use client'

import { useJugadorData } from '@/context/JugadorDataContext';
import GraficasEstadisticas from './GraficasEstadisticas';
import CardEstadisticas from './CardEstadisticas';
import { useState } from 'react';

const METRICAS_CARDS = [
  { title: 'Velocidad', key: 'velocidad_max', color: 'blue-500', value: 'km/h' },
  { title: 'Resistencia Aeróbica', key: 'resistencia_aerobica', color: 'green-500', value: 'ml/kg/min' },
  { title: 'Resistencia Anaeróbica', key: 'resistencia_anaerobica', color: 'yellow-500', value: 'seg' },
  { title: 'Flexibilidad', key: 'flexibilidad', color: 'purple-500', value: 'cm' },
  { title: 'Potencia Muscular', key: 'potencia_muscular_piernas', color: 'red-500', value: 'm' },
  { title: 'Grasa Corporal', key: 'porcentaje_grasa_corporal', color: 'pink-500', value: '%' },
  { title: 'Masa Muscular', key: 'porcentaje_masa_muscular', color: 'indigo-500', value: '%' },
];

export default function EstadisticasJugador() {

  const { jugadorData, loading } = useJugadorData();
  const [metricaSeleccionada, setMetricaSeleccionada] = useState('todas');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!jugadorData?.estadisticas) {
    return (
      <div className="text-center py-10 text-gray-400">
        No hay estadísticas disponibles
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {METRICAS_CARDS.map((metrica) => (
          <div 
            key={metrica.key}
            onClick={() => setMetricaSeleccionada(metrica.key)}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <CardEstadisticas
              title={metrica.title}
              value={metrica.value}
              color={metrica.color}
              isSelected={metricaSeleccionada === metrica.key}
            />
          </div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <GraficasEstadisticas 
          estadisticas={jugadorData.estadisticas} 
          metricaInicial={metricaSeleccionada}
        />
      </div>
    </div>
  );
} 