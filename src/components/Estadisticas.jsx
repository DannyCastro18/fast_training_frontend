"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Colores para las líneas
const colors = {
  accent: "#00ADB5",
  arqueros: "#FFA500",
  defensas: "#00FF7F",
  mediocampistas: "#FFD700",
  delanteros: "#FF69B4",
};

// Objetivos disponibles ajustados según el formato real de la API
const objetivos = [
  { nombre: "Velocidad Máxima", unidad: "Km/h", key: "velocidad_max" },
  { nombre: "Porcentaje de Grasa Corporal", unidad: "%", key: "porcentaje_grasa_corporal" },
  { nombre: "Porcentaje de Masa Muscular", unidad: "%", key: "porcentaje_masa_muscular" },
  { nombre: "Potencia Muscular", unidad: "m", key: "potencia_muscular_piernas" },
  { nombre: "Resistencia Aeróbica", unidad: "ml/kg/min", key: "resistencia_aerobica" },
  { nombre: "Resistencia Anaeróbica", unidad: "seg", key: "resistencia_anaerobica" },
  { nombre: "Flexibilidad", unidad: "cm", key: "flexibilidad" },
];

// Mapeo de nombres de posiciones
const posicionesMap = {
  "arquero": "arqueros",
  "defensa": "defensas",
  "mediocampista": "mediocampistas",
  "delantero": "delanteros"
};

// Filtros de tiempo
const filtrosTiempo = [
  { nombre: "3M", meses: 3 },
  { nombre: "6M", meses: 6 },
  { nombre: "1A", meses: 12 },
  { nombre: "Máx", meses: "max" },
];

const Estadisticas = () => {
  const [datosGrafico, setDatosGrafico] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rolUsuario] = useState("entrenador");
  const [objetivoSeleccionado, setObjetivoSeleccionado] = useState(objetivos[0]);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(filtrosTiempo[3]); // Máx

  useEffect(() => {
    let cancelado = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (rolUsuario !== "entrenador") {
        setError("Acceso denegado");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/promedios/estadisticas/posiciones", {
          headers: { "Usuario-Rol": rolUsuario },
        });

        if (!response.data || !response.data.data || !response.data.data.labels || !response.data.data.por_posicion) {
          setError("Formato de respuesta inválido");
          setLoading(false);
          return;
        }

        const fechas = response.data.data.labels;
        const posicionesData = response.data.data.por_posicion;
        const metricaKey = objetivoSeleccionado.key;
        
        // Verificar si la métrica seleccionada existe en los datos
        const existeMetrica = Object.values(posicionesData).some(pos => pos[metricaKey]);
        
        if (!existeMetrica) {
          setError("No hay datos disponibles para esta métrica.");
          setLoading(false);
          return;
        }

        // Construir los datos para el gráfico
        const datosProcesados = fechas.map((fecha, index) => {
          const datoPunto = { fecha };
          
          // Extraer datos para cada posición
          Object.entries(posicionesData).forEach(([posicion, metricas]) => {
            if (posicion !== "null" && metricas[metricaKey]) {
              // Usar el mapeo para convertir nombres de posiciones
              const nombrePosicion = posicionesMap[posicion] || posicion;
              datoPunto[nombrePosicion] = metricas[metricaKey][index];
            }
          });
          
          return datoPunto;
        });

        // Aplicar filtro de tiempo
        const ahora = new Date();
        const fechaLimite = filtroSeleccionado.meses === "max" 
          ? null 
          : new Date(new Date().setMonth(ahora.getMonth() - filtroSeleccionado.meses));
        
        // Suponemos que las fechas en labels están en orden cronológico
        // Calculamos cuántos meses filtrar según la selección
        const datosFiltrados = fechaLimite 
          ? datosProcesados.slice(-filtroSeleccionado.meses) 
          : datosProcesados;

        if (!cancelado) {
          if (datosFiltrados.length === 0) {
            setError("No hay datos en este rango de tiempo.");
          } else {
            setDatosGrafico(datosFiltrados);
          }
          setLoading(false);
        }
      } catch (err) {
        if (!cancelado) {
          console.error("❌ Error en la API:", err && err.response ? err.response.data : err.message || err);
          setError(`Error al cargar datos: ${err.message || 'Error desconocido'}`);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelado = true;
    };
  }, [rolUsuario, objetivoSeleccionado, filtroSeleccionado]);

  // Obtener la unidad actual del objetivo seleccionado
  const getUnidad = () => {
    if (objetivoSeleccionado) {
      return objetivoSeleccionado.unidad;
    }
    return "";
  };

  if (loading) return <p className="text-white">Cargando datos...</p>;
  if (error) return <p className="text-white">{error}</p>;

  return (
    <div className="w-full h-[500px] bg-[#131619] p-5 rounded-xl text-white font-sans">
      {/* Filtros y selector */}
      <div className="flex justify-between mb-4 flex-wrap gap-4">
        {/* Filtros de tiempo */}
        <div className="flex gap-3">
          {filtrosTiempo.map((filtro) => (
            <button
              key={filtro.nombre}
              onClick={() => setFiltroSeleccionado(filtro)}
              className={`px-4 py-2 rounded-full font-bold text-white transition-all
                ${filtroSeleccionado.nombre === filtro.nombre
                  ? "bg-[#00ADB5]"
                  : "bg-[#222831] hover:bg-[#333]"}
              `}
            >
              {filtro.nombre}
            </button>
          ))}
        </div>

        {/* Selector de objetivo */}
        <select
          value={objetivoSeleccionado.key}
          onChange={(e) => {
            const objSeleccionado = objetivos.find((obj) => obj.key === e.target.value);
            if (objSeleccionado) {
              setObjetivoSeleccionado(objSeleccionado);
            }
          }}
          className="px-4 py-2 rounded-lg bg-[#222831] text-white font-bold border-2 border-[#00ADB5] focus:outline-none"
        >
          {objetivos.map((obj) => (
            <option key={obj.key} value={obj.key}>
              {obj.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Título */}
      <h2 className="text-lg font-semibold mb-4">
        {objetivoSeleccionado.nombre} ({getUnidad()})
      </h2>

      {/* Gráfico */}
      <div className="w-full h-[85%]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={datosGrafico}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="fecha" stroke="#bbb" />
            <YAxis stroke="#bbb" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="arqueros" stroke={colors.arqueros} strokeWidth={2} />
            <Line type="monotone" dataKey="defensas" stroke={colors.defensas} strokeWidth={2} />
            <Line type="monotone" dataKey="mediocampistas" stroke={colors.mediocampistas} strokeWidth={2} />
            <Line type="monotone" dataKey="delanteros" stroke={colors.delanteros} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Estadisticas;