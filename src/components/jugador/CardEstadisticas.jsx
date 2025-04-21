"use client";
import { useJugadorData } from '@/context/JugadorDataContext';

const CardEstadisticas1 = ({ jugador, estadistca }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{jugador.nombre}</h5>
        <p className="card-text">
          <strong>{estadistica}</strong>: {jugador[estadistica]}
        </p>
      </div>
    </div>
  );
};

export default function CardEstadisticas({ title, value, color, isSelected }) {
  const { jugadorData } = useJugadorData();

  const getMetricValue = () => {
    if (!jugadorData?.perfil) return 'N/A';
    const metricas = {
      'Velocidad': jugadorData.perfil.velocidad_max,
      'Fuerza': jugadorData.perfil.fuerza,
      'Resistencia Aeróbica': jugadorData.perfil.resistencia_aerobica,
      'Resistencia Anaeróbica': jugadorData.perfil.resistencia_anaerobica,
      'Flexibilidad': jugadorData.perfil.flexibilidad,
      'Potencia Muscular': jugadorData.perfil.potencia_muscular_piernas,
      'Grasa Corporal': jugadorData.perfil.porcentaje_grasa_corporal,
      'Masa Muscular': jugadorData.perfil.porcentaje_masa_muscular,
    };
    return metricas[title] || 'N/A';
  };

  const cardClass = isSelected 
    ? `min-w-[200px] p-4 rounded-lg shadow-md bg-${color}-600 text-white border-2 border-${color}-700`
    : `min-w-[200px] p-4 rounded-lg shadow-md bg-white border border-${color}-200 hover:border-${color}-300`;

  const titleClass = isSelected ? 'text-white' : `text-${color}-700`;
  const valueClass = isSelected ? 'text-white' : `text-${color}-600`;
  const unitClass = isSelected ? 'text-white/80' : 'text-gray-500';

  return (
    <div className={cardClass}>
      <h3 className={`text-sm font-medium ${titleClass}`}>{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className={`text-2xl font-semibold ${valueClass}`}>{getMetricValue()}</p>
        <p className={`ml-1 text-sm ${unitClass}`}>{value}</p>
      </div>
    </div>
  );
}
