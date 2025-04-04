'use client'
import { useState } from 'react';
import CardEstadisticas from './CardEstadisticas';

const METRICAS_CARDS = [
  { title: 'Velocidad', key: 'velocidad_max', color: 'blue', value: 'km/h' },
  { title: 'Resistencia Aeróbica', key: 'resistencia_aerobica', color: 'green', value: 'ml/kg/min' },
  { title: 'Resistencia Anaeróbica', key: 'resistencia_anaerobica', color: 'yellow', value: 'seg' },
  { title: 'Flexibilidad', key: 'flexibilidad', color: 'purple', value: 'cm' },
  { title: 'Potencia Muscular', key: 'potencia_muscular_piernas', color: 'red', value: 'm' },
  { title: 'Grasa Corporal', key: 'porcentaje_grasa_corporal', color: 'pink', value: '%' },
  { title: 'Masa Muscular', key: 'porcentaje_masa_muscular', color: 'indigo', value: '%' },
];

export default function MetricasCards({ onMetricaSelect, metricaSeleccionada }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {METRICAS_CARDS.map((metrica) => (
        <div 
          key={metrica.key}
          onClick={() => onMetricaSelect(metrica.key)}
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
  );
} 