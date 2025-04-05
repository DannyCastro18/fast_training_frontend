"use client";

import { LineChart, Line, ResponsiveContainer } from "recharts";

const dataSets = {
  Altura: { unit: "cm", color: "#22c55e", data: [{ value: 145 }, { value: 148 }, { value: 150 }, { value: 152 }, { value: 155 }] },
  Peso: { unit: "kg", color: "#f97316", data: [{ value: 40 }, { value: 42 }, { value: 41 }, { value: 43 }, { value: 45 }] },
  "Porcentaje Grasa Corporal": { unit: "%", color: "#c026d3", data: [{ value: 15 }, { value: 14 }, { value: 16 }, { value: 15 }, { value: 14 }] },
  "Porcentaje Masa Muscular": { unit: "%", color: "#ef4444", data: [{ value: 50 }, { value: 52 }, { value: 51 }, { value: 53 }, { value: 54 }] },
  Fuerza: { unit: "kg", color: "#4f46e5", data: [{ value: 55 }, { value: 58 }, { value: 60 }, { value: 62 }, { value: 65 }] },
  "Velocidad Máxima": { unit: "km/h", color: "#059669", data: [{ value: 18 }, { value: 19 }, { value: 20 }, { value: 21 }, { value: 22 }] },
  "Resistencia Aeróbica": { unit: "min/km/ppm", color: "#a21caf", data: [{ value: 10 }, { value: 9 }, { value: 11 }, { value: 10 }, { value: 9 }] },
  "Resistencia Anaeróbica": { unit: "s/reps/km", color: "#dc2626", data: [{ value: 6 }, { value: 5 }, { value: 7 }, { value: 6 }, { value: 8 }] },
  Flexibilidad: { unit: "cm", color: "#2563eb", data: [{ value: 25 }, { value: 27 }, { value: 26 }, { value: 28 }, { value: 30 }] }
};

const StatsCard = ({ title, unit, data, color }) => {
  return (
    <div className="bg-[#161b22] p-4 rounded-2xl w-full h-20 flex items-center justify-between shadow-md">
      <div className="text-left">
        <h3 className="text-white font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm">{unit}</p>
      </div>
      <div className="w-24 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="linear" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default function TargetMetrica() {
  return (
    <div className="w-screen flex justify-center">
      {/* Contenedor con margen izquierdo para el navbar */}
      <div className="stats-container w-full max-w-screen-xl overflow-x-auto p-4 flex space-x-4 hide-scrollbar ml-38">
        {Object.entries(dataSets).map(([title, { unit, color, data }]) => (
          <div key={title} className="w-[220px] flex-shrink-0">
            <StatsCard title={title} unit={unit} data={data} color={color} />
          </div>
        ))}
      </div>
    </div>
  );
}
