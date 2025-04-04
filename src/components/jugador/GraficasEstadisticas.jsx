'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useState, useEffect } from 'react';

const COLORES = {
  porcentaje_grasa_corporal: "#FF8042",
  porcentaje_masa_muscular: "#00C49F",
  potencia_muscular_piernas: "#FFBB28",
  velocidad_max: "#0088FE",
  resistencia_aerobica: "#FF0000",
  resistencia_anaerobica: "#8884d8",
  flexibilidad: "#82ca9d"
};

const NOMBRES_METRICAS = {
  porcentaje_grasa_corporal: "Grasa Corporal",
  porcentaje_masa_muscular: "Masa Muscular",
  potencia_muscular_piernas: "Potencia Muscular",
  velocidad_max: "Velocidad Máxima",
  resistencia_aerobica: "Resistencia Aeróbica",
  resistencia_anaerobica: "Resistencia Anaeróbica",
  flexibilidad: "Flexibilidad"
};

export default function GraficasEstadisticas({ estadisticas, metricaInicial = 'todas' }) {
  const [metricaSeleccionada, setMetricaSeleccionada] = useState(metricaInicial);

  // Efecto para actualizar la métrica cuando cambie la prop
  useEffect(() => {
    setMetricaSeleccionada(metricaInicial);
  }, [metricaInicial]);

  // Transformar los datos para Recharts
  const datosGrafica = estadisticas.labels.map((label, index) => {
    const dato = {
      fecha: label,
    };
    
    Object.keys(estadisticas.datasets).forEach((metrica) => {
      dato[metrica] = estadisticas.datasets[metrica][index];
    });
    
    return dato;
  });

  // Función para renderizar las líneas según la métrica seleccionada
  const renderLineas = () => {
    if (metricaSeleccionada === 'todas') {
      return Object.keys(estadisticas.datasets).map((metrica) => (
        <Line
          key={metrica}
          type="monotone"
          dataKey={metrica}
          name={NOMBRES_METRICAS[metrica]}
          stroke={COLORES[metrica]}
          dot={false}
        />
      ));
    }
    
    return (
      <Line
        type="monotone"
        dataKey={metricaSeleccionada}
        name={NOMBRES_METRICAS[metricaSeleccionada]}
        stroke={COLORES[metricaSeleccionada]}
        strokeWidth={2}
        dot
      />
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
          <p className="text-gray-300 mb-2">{label}</p>
          {payload.map((entry) => (
            <p
              key={entry.name}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.name}: {entry.value} {estadisticas.unidades[entry.dataKey]}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setMetricaSeleccionada('todas')}
          className={`px-3 py-1 rounded-full text-sm ${
            metricaSeleccionada === 'todas'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          Todas
        </button>
        {Object.keys(estadisticas.datasets).map((metrica) => (
          <button
            key={metrica}
            onClick={() => setMetricaSeleccionada(metrica)}
            className={`px-3 py-1 rounded-full text-sm ${
              metricaSeleccionada === metrica
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            {NOMBRES_METRICAS[metrica]}
          </button>
        ))}
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer>
          <LineChart data={datosGrafica}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="fecha"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {renderLineas()}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 