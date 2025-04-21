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

// Mapeo de nombres de posiciones para el gráfico
const posicionesMap = {
  "arquero": "arqueros",
  "defensa": "defensas",
  "mediocampista": "mediocampistas",
  "delantero": "delanteros",
  "null": "general"
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
  const [rawData, setRawData] = useState(null); // Para almacenar los datos crudos de la API

  useEffect(() => {
    let cancelado = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (rolUsuario !== "entrenador") {
          setError("Acceso denegado");
          setLoading(false);
          return;
        }

        console.log("⚽ Consultando estadísticas por posición...");
        
        const response = await axios.get("http://localhost:5000/api/promedios/estadisticas/posiciones", {
          headers: { "Usuario-Rol": rolUsuario },
        });
        
        // Guardar la respuesta completa para depuración
        setRawData(response);
        
        console.log("📊 Respuesta completa:", response);
        
        // ⚠️ IMPORTANTE: Modificación principal para manejo correcto de la estructura de datos
        // La estructura correcta es directamente response.data, sin un nivel adicional .data
        const apiData = response.data;
        
        console.log("📊 Datos de la API:", apiData);
        
        if (!apiData) {
          console.error("❌ No hay datos en la respuesta");
          setError("No se recibieron datos del servidor");
          setLoading(false);
          return;
        }

        // Verificar las propiedades específicas
        if (!apiData.labels || !Array.isArray(apiData.labels)) {
          console.error("❌ No hay labels en los datos", apiData);
          setError("Datos de fechas no disponibles");
          setLoading(false);
          return;
        }

        if (!apiData.por_posicion || typeof apiData.por_posicion !== 'object') {
          console.error("❌ No hay datos por posición", apiData);
          setError("Datos por posición no disponibles");
          setLoading(false);
          return;
        }

        const fechas = apiData.labels;
        const posicionesData = apiData.por_posicion;
        const metricaKey = objetivoSeleccionado.key;
        
        console.log("📆 Fechas:", fechas);
        console.log("👥 Datos por posición:", posicionesData);
        console.log("🔍 Métrica seleccionada:", metricaKey);
        
        // Verificar si existe al menos una posición con la métrica
        let existeMetrica = false;
        
        for (const [posicion, datos] of Object.entries(posicionesData)) {
          if (datos && datos[metricaKey] && Array.isArray(datos[metricaKey]) && datos[metricaKey].length > 0) {
            existeMetrica = true;
            break;
          }
        }
        
        console.log("✅ ¿Existe la métrica?", existeMetrica);
        
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
            if (metricas && metricas[metricaKey] && Array.isArray(metricas[metricaKey])) {
              // Usar el mapeo para convertir nombres de posiciones
              const nombrePosicion = posicionesMap[posicion] || posicion;
              if (index < metricas[metricaKey].length) {
                datoPunto[nombrePosicion] = metricas[metricaKey][index];
              }
            }
          });
          
          return datoPunto;
        });
        
        console.log("📊 Datos procesados:", datosProcesados);

        // Aplicar filtro de tiempo
        let datosFiltrados = datosProcesados;
        
        if (filtroSeleccionado.meses !== "max" && datosProcesados.length > filtroSeleccionado.meses) {
          datosFiltrados = datosProcesados.slice(-filtroSeleccionado.meses);
        }
        
        console.log("🔎 Datos filtrados:", datosFiltrados);

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
          console.error("❌ Error en la API:", err);
          // Mostrar detalles específicos del error para depuración
          if (err.response) {
            console.error("Respuesta del servidor:", err.response.data);
            console.error("Código de estado:", err.response.status);
          } else if (err.request) {
            console.error("No se recibió respuesta:", err.request);
          } else {
            console.error("Error de configuración:", err.message);
          }
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
    return objetivoSeleccionado?.unidad || "";
  };

  // Determinar qué posiciones mostrar basado en los datos disponibles
  const getPosicionesDisponibles = () => {
    if (!datosGrafico || datosGrafico.length === 0) return [];
    
    const primerPunto = datosGrafico[0];
    const posiciones = Object.keys(primerPunto).filter(key => key !== 'fecha');
    
    return posiciones;
  };

  // Pantalla de depuración
  const renderDebuggingInfo = () => {
    return (
      <div className="text-sm text-gray-400 mt-4 p-3 bg-[#1e2124] rounded-lg overflow-auto max-h-64">
        <h3 className="font-bold mb-2">Información de depuración:</h3>
        {rawData && (
          <div>
            <p>Status: {rawData.status}</p>
            <p>Status Text: {rawData.statusText}</p>
            <p>Content-Type: {rawData.headers?.['content-type']}</p>
            <p>Data Structure:</p>
            <ul className="list-disc pl-5 mt-1">
              {rawData.data && Object.keys(rawData.data).map((key) => (
                <li key={key}>{key}: {typeof rawData.data[key]}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Pantalla de carga
  if (loading) {
    return (
      <div className="w-full h-[500px] bg-[#131619] p-5 rounded-xl text-white font-sans flex items-center justify-center">
        <p className="text-white text-xl">Cargando datos...</p>
      </div>
    );
  }

  // Pantalla de error
  if (error) {
    return (
      <div className="w-full h-[500px] bg-[#131619] p-5 rounded-xl text-white font-sans flex flex-col items-center justify-center">
        <p className="text-white text-xl mb-4">{error}</p>
        {renderDebuggingInfo()}
      </div>
    );
  }

  // Lista de posiciones disponibles
  const posicionesDisponibles = getPosicionesDisponibles();

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
      {datosGrafico.length > 0 ? (
        <div className="w-full h-[65%]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={datosGrafico}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="fecha" stroke="#bbb" />
              <YAxis stroke="#bbb" />
              <Tooltip />
              <Legend />
              {posicionesDisponibles.includes('general') && (
                <Line 
                  type="monotone" 
                  dataKey="general" 
                  name="General" 
                  stroke={colors.accent} 
                  strokeWidth={2} 
                />
              )}
              {posicionesDisponibles.includes('arqueros') && (
                <Line 
                  type="monotone" 
                  dataKey="arqueros" 
                  name="Arqueros" 
                  stroke={colors.arqueros} 
                  strokeWidth={2} 
                />
              )}
              {posicionesDisponibles.includes('defensas') && (
                <Line 
                  type="monotone" 
                  dataKey="defensas" 
                  name="Defensas" 
                  stroke={colors.defensas} 
                  strokeWidth={2} 
                />
              )}
              {posicionesDisponibles.includes('mediocampistas') && (
                <Line 
                  type="monotone" 
                  dataKey="mediocampistas" 
                  name="Mediocampistas" 
                  stroke={colors.mediocampistas} 
                  strokeWidth={2} 
                />
              )}
              {posicionesDisponibles.includes('delanteros') && (
                <Line 
                  type="monotone" 
                  dataKey="delanteros" 
                  name="Delanteros" 
                  stroke={colors.delanteros} 
                  strokeWidth={2} 
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="w-full h-[85%] flex items-center justify-center">
          <p className="text-gray-400">No hay datos disponibles para mostrar</p>
        </div>
      )}
      
      {/* Información de depuración solo si hay pocos datos o está en desarrollo*/}
      {process.env.NODE_ENV === 'development' && datosGrafico.length < 3 && renderDebuggingInfo()}
    </div>
  );
};

export default Estadisticas;