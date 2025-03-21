"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [entrenamiento, setEntrenamiento] = useState({
    posicion: "Delanteros",
    fecha: "2024-03-20",
    objetivo: "Mejorar resistencia",
    fases: [
      { nombre: "Calentamiento", ejercicios: "Juego predeportivo con pelota.", duracion: "15 min" },
      { nombre: "Parte Central", ejercicios: "Circuito con jumping jacks, burpees, sentadillas, flexiones y planchas.", duracion: "15 min" },
      { nombre: "Enfriamiento", ejercicios: "Estiramientos en diferentes posiciones.", duracion: "5 min" },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para cargar los datos del entrenamiento desde la API
  const fetchEntrenamiento = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.ejemplo.com/entrenamientos/actual');
      setEntrenamiento(response.data);
    } catch (err) {
      console.error("Error al cargar los datos:", err);
      setError("No se pudo cargar el entrenamiento. Usando datos por defecto.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchEntrenamiento();
  }, []);

  // Función para guardar cambios en la API
  const guardarEntrenamiento = async () => {
    setLoading(true);
    try {
      await axios.put('https://api.ejemplo.com/entrenamientos/actual', entrenamiento);
      alert("Entrenamiento actualizado correctamente");
    } catch (err) {
      console.error("Error al guardar los datos:", err);
      alert("Error al guardar el entrenamiento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-3xl p-10">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-6">📋 Plan de Entrenamiento</h2>
        
        {loading && <p className="text-center text-blue-600 my-2">Cargando datos...</p>}
        {error && <p className="text-center text-red-600 my-2">{error}</p>}

        {/* Sección de Datos */}
        <div className="bg-gray-200 p-6 rounded-xl shadow-md mb-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="text-xl font-semibold block">⚽ Posición:</label>
              <input
                type="text"
                value={entrenamiento.posicion}
                onChange={(e) => setEntrenamiento({ ...entrenamiento, posicion: e.target.value })}
                className="border border-gray-400 px-4 py-3 rounded-lg w-full text-lg"
              />
            </div>
            <div>
              <label className="text-xl font-semibold block">📅 Fecha:</label>
              <input
                type="date"
                value={entrenamiento.fecha}
                onChange={(e) => setEntrenamiento({ ...entrenamiento, fecha: e.target.value })}
                className="border border-gray-400 px-4 py-3 rounded-lg w-full text-lg"
              />
            </div>
            <div>
              <label className="text-xl font-semibold block">🎯 Objetivo:</label>
              <input
                type="text"
                value={entrenamiento.objetivo}
                onChange={(e) => setEntrenamiento({ ...entrenamiento, objetivo: e.target.value })}
                className="border border-gray-400 px-4 py-3 rounded-lg w-full text-lg"
              />
            </div>
          </div>
        </div>

        {/* Tabla de Fases */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-300 bg-white rounded-2xl shadow-lg text-xl">
            <thead className="bg-gray-900 text-white uppercase">
              <tr>
                <th className="py-4 px-6">Fase</th>
                <th className="py-4 px-6">Ejercicios</th>
                <th className="py-4 px-6">Duración</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {entrenamiento.fases.map((fase, index) => (
                <tr key={index} className="border-t border-gray-300 hover:bg-gray-100">
                  <td className="py-5 px-6 font-semibold">{fase.nombre}</td>
                  <td className="py-5 px-6">{fase.ejercicios}</td>
                  <td className="py-5 px-6">{fase.duracion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botón para guardar cambios */}
        <div className="mt-6 text-center">
          <button 
            onClick={guardarEntrenamiento}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg text-xl disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}