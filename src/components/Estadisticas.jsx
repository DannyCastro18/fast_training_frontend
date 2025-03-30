// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// // Colores y estilos
// const colors = {
//   background: "#131619", // Fondo oscuro elegante
//   text: "#FFFFFF", // Texto blanco
//   accent: "#00ADB5", // Azul neón principal
//   inactiveButton: "#222831", // Botón inactivo gris oscuro
//   arqueros: "#FFA500", // Naranja
//   defensas: "#00FF7F", // Verde neón
//   mediocampistas: "#FFD700", // Amarillo
//   delanteros: "#FF69B4", // Rosa
// };

// const objetivos = [
//   { nombre: "Velocidad", unidad: "Km/h", key: "velocidad" },
//   { nombre: "Porcentaje de Grasa Corporal", unidad: "%", key: "grasa" },
//   { nombre: "Porcentaje de Masa Muscular", unidad: "%", key: "musculo" },
//   { nombre: "Fuerza", unidad: "Kg", key: "fuerza" },
//   { nombre: "Resistencia Aeróbica", unidad: "Min", key: "resistencia_aerobica" },
//   { nombre: "Resistencia Anaeróbica", unidad: "Seg", key: "resistencia_anaerobica" },
//   { nombre: "Flexibilidad", unidad: "cm", key: "flexibilidad" },
// ];

// const filtrosTiempo = [
//   { nombre: "3M", meses: 3 },
//   { nombre: "6M", meses: 6 },
//   { nombre: "1A", meses: 12 },
//   { nombre: "Máx", meses: "max" },
// ];

// const Estadisticas = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [rolUsuario] = useState("entrenador");
//   const [objetivoSeleccionado, setObjetivoSeleccionado] = useState(objetivos[0]);
//   const [filtroSeleccionado, setFiltroSeleccionado] = useState(filtrosTiempo[3]); // Máx por defecto

//   useEffect(() => {
//     if (rolUsuario !== "entrenador") {
//       setError("Acceso denegado");
//       setLoading(false);
//       return;
//     }

//     axios
//       .get("http://localhost:5000/estadisticas/equipo/1", {
//         headers: { "Usuario-Rol": rolUsuario },
//       })
//       .then((response) => {
//         console.log("✅ Datos recibidos:", response.data);

//         const estadisticaActual = response.data[objetivoSeleccionado.key];

//         if (!estadisticaActual) {
//           console.error("⚠️ No hay datos para:", objetivoSeleccionado.key);
//           setError("No hay datos disponibles para esta métrica.");
//           setLoading(false);
//           return;
//         }

//         const formattedData = estadisticaActual.arqueros.map((_, index) => ({
//           fecha: 2020 + index,
//           arqueros: estadisticaActual.arqueros[index] || 0,
//           defensas: estadisticaActual.defensas[index] || 0,
//           mediocampistas: estadisticaActual.mediocampistas[index] || 0,
//           delanteros: estadisticaActual.delanteros[index] || 0,
//         }));

//         setData(filtroSeleccionado.meses === "max" ? formattedData : formattedData.slice(-filtroSeleccionado.meses));
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("❌ Error en la API:", err.response?.data || err);
//         setError("Error al cargar datos");
//         setLoading(false);
//       });
//   }, [rolUsuario, objetivoSeleccionado, filtroSeleccionado]);

//   if (loading) return <p style={{ color: colors.text }}>Cargando datos...</p>;
//   if (error) return <p style={{ color: colors.text }}>{error}</p>;

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: 500,
//         backgroundColor: colors.background,
//         padding: "20px",
//         borderRadius: "10px",
//         color: colors.text,
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       {/* Contenedor de filtros de tiempo y selector de objetivo */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "15px",
//         }}
//       >
//         {/* Filtros de tiempo */}
//         <div style={{ display: "flex", gap: "10px" }}>
//           {filtrosTiempo.map((filtro) => (
//             <button
//               key={filtro.nombre}
//               onClick={() => setFiltroSeleccionado(filtro)}
//               style={{
//                 padding: "8px 15px",
//                 borderRadius: "20px",
//                 border: "none",
//                 backgroundColor:
//                   filtroSeleccionado.nombre === filtro.nombre ? colors.accent : colors.inactiveButton,
//                 color: "white",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//               }}
//             >
//               {filtro.nombre}
//             </button>
//           ))}
//         </div>

//         {/* Selector de objetivo (Posicionado en la derecha) */}
//         <div style={{ position: "relative" }}>
//           <select
//             value={objetivoSeleccionado.key}
//             onChange={(e) => {
//               const nuevoObjetivo = objetivos.find((obj) => obj.key === e.target.value);
//               setObjetivoSeleccionado(nuevoObjetivo);
//             }}
//             style={{
//               padding: "10px 1px 12px 1px",
//               borderRadius: "15px",
//               backgroundColor: colors.inactiveButton,
//               color: "white",
//               border: `2px solid ${colors.accent}`,
//               fontWeight: "bold",
//               cursor: "pointer",
//               textAlign: "center",
//               margin: "auto",
//             }}
//           >
//             {objetivos.map((obj) => (
//               <option key={obj.key} value={obj.key}>
//                 {obj.nombre}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Título con unidad de medida */}
//       <h2 style={{ textAlign: "left", fontSize: "20px", marginBottom: "15px" }}>
//         {objetivoSeleccionado.nombre} ({objetivoSeleccionado.unidad})
//       </h2>

//       {/* Gráfico */}
//       <ResponsiveContainer width="100%" height="80%">
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//           <XAxis dataKey="fecha" stroke="#bbb" />
//           <YAxis stroke="#bbb" />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="arqueros" stroke={colors.arqueros} strokeWidth={2} />
//           <Line type="monotone" dataKey="defensas" stroke={colors.defensas} strokeWidth={2} />
//           <Line type="monotone" dataKey="mediocampistas" stroke={colors.mediocampistas} strokeWidth={2} />
//           <Line type="monotone" dataKey="delanteros" stroke={colors.delanteros} strokeWidth={2} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Estadisticas;

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

// Colores y estilos
const colors = {
  background: "#131619",
  text: "#FFFFFF",
  accent: "#00ADB5",
  inactiveButton: "#222831",
  arqueros: "#FFA500",
  defensas: "#00FF7F",
  mediocampistas: "#FFD700",
  delanteros: "#FF69B4",
};

// Objetivos disponibles
const objetivos = [
  { nombre: "Velocidad", unidad: "Km/h", key: "velocidad" },
  { nombre: "Porcentaje de Grasa Corporal", unidad: "%", key: "grasa" },
  { nombre: "Porcentaje de Masa Muscular", unidad: "%", key: "musculo" },
  { nombre: "Fuerza", unidad: "Kg", key: "fuerza" },
  {
    nombre: "Resistencia Aeróbica",
    unidad: "Min",
    key: "resistencia_aerobica",
  },
  {
    nombre: "Resistencia Anaeróbica",
    unidad: "Seg",
    key: "resistencia_anaerobica",
  },
  { nombre: "Flexibilidad", unidad: "cm", key: "flexibilidad" },
];

// Filtros de tiempo
const filtrosTiempo = [
  { nombre: "3M", meses: 3 },
  { nombre: "6M", meses: 6 },
  { nombre: "1A", meses: 12 },
  { nombre: "Máx", meses: "max" },
];

const Estadisticas = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rolUsuario] = useState("entrenador");
  const [objetivoSeleccionado, setObjetivoSeleccionado] = useState(
    objetivos[0],
  );
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(
    filtrosTiempo[3],
  ); // Máx por defecto

  useEffect(() => {
    if (rolUsuario !== "entrenador") {
      setError("Acceso denegado");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/estadisticas/equipo/1", {
        headers: { "Usuario-Rol": rolUsuario },
      })
      .then((response) => {
        console.log("✅ Datos recibidos:", response.data);

        const estadisticaActual = response.data[objetivoSeleccionado.key];

        if (!estadisticaActual) {
          console.error("⚠️ No hay datos para:", objetivoSeleccionado.key);
          setError("No hay datos disponibles para esta métrica.");
          setLoading(false);
          return;
        }

        // Obtener fecha actual y meses en español
        const today = new Date();
        const months = [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ];

        // Formatear datos con meses y años
        const formattedData = estadisticaActual.arqueros.map((_, index) => {
          const date = new Date(today);
          date.setMonth(
            today.getMonth() - (estadisticaActual.arqueros.length - index),
          );
          const label = `${months[date.getMonth()]} ${date.getFullYear()}`;

          return {
            fecha: label,
            arqueros: estadisticaActual.arqueros[index] || 0,
            defensas: estadisticaActual.defensas[index] || 0,
            mediocampistas: estadisticaActual.mediocampistas[index] || 0,
            delanteros: estadisticaActual.delanteros[index] || 0,
          };
        });

        // Aplicar filtro de tiempo
        const filteredData =
          filtroSeleccionado.meses === "max"
            ? formattedData
            : formattedData.slice(-filtroSeleccionado.meses);

        setData(filteredData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error en la API:", err.response?.data || err);
        setError("Error al cargar datos");
        setLoading(false);
      });
  }, [rolUsuario, objetivoSeleccionado, filtroSeleccionado]);

  if (loading) return <p style={{ color: colors.text }}>Cargando datos...</p>;
  if (error) return <p style={{ color: colors.text }}>{error}</p>;

  return (
    <div
      style={{
        width: "100%",
        height: 500,
        backgroundColor: colors.background,
        padding: "20px",
        borderRadius: "10px",
        color: colors.text,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Contenedor de filtros de tiempo y selector de objetivo */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        {/* Filtros de tiempo */}
        <div style={{ display: "flex", gap: "10px" }}>
          {filtrosTiempo.map((filtro) => (
            <button
              key={filtro.nombre}
              onClick={() => setFiltroSeleccionado(filtro)}
              style={{
                padding: "8px 15px",
                borderRadius: "20px",
                border: "none",
                backgroundColor:
                  filtroSeleccionado.nombre === filtro.nombre
                    ? colors.accent
                    : colors.inactiveButton,
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {filtro.nombre}
            </button>
          ))}
        </div>

        {/* Selector de objetivo */}
        <div style={{ position: "relative" }}>
          <select
            value={objetivoSeleccionado.key}
            onChange={(e) => {
              const nuevoObjetivo = objetivos.find(
                (obj) => obj.key === e.target.value,
              );
              setObjetivoSeleccionado(nuevoObjetivo);
            }}
            style={{
              padding: "10px 1px 12px 1px",
              borderRadius: "15px",
              backgroundColor: colors.inactiveButton,
              color: "white",
              border: `2px solid ${colors.accent}`,
              fontWeight: "bold",
              cursor: "pointer",
              textAlign: "center",
              margin: "auto",
            }}
          >
            {objetivos.map((obj) => (
              <option key={obj.key} value={obj.key}>
                {obj.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Título con unidad de medida */}
      <h2 style={{ textAlign: "left", fontSize: "20px", marginBottom: "15px" }}>
        {objetivoSeleccionado.nombre} ({objetivoSeleccionado.unidad})
      </h2>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="fecha" stroke="#bbb" />
          <YAxis stroke="#bbb" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="arqueros"
            stroke={colors.arqueros}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="defensas"
            stroke={colors.defensas}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="mediocampistas"
            stroke={colors.mediocampistas}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="delanteros"
            stroke={colors.delanteros}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Estadisticas;
