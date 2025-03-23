"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [entrenamiento, setEntrenamiento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sesionId = 1; // ID de la sesión a consultar (puede venir de la URL o el contexto de usuario)

  // Cargar los datos de la sesión desde el backend
  const fetchEntrenamiento = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/sesiones/${sesionId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEntrenamiento(response.data);
    } catch (err) {
      console.error("Error al cargar los datos:", err);
      setError("No se pudo cargar la sesión de entrenamiento.");
    } finally {
      setLoading(false);
    }
  };

  // Guardar cambios en la sesión
  const guardarEntrenamiento = async () => {
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:5000/sesiones/${sesionId}`,
        entrenamiento,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Entrenamiento actualizado correctamente");
    } catch (err) {
      console.error("Error al guardar los datos:", err);
      alert("Error al guardar el entrenamiento");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntrenamiento();
  }, []);

  if (loading) return <p className="text-center text-blue-600 my-2">Cargando datos...</p>;
  if (error) return <p className="text-center text-red-600 my-2">{error}</p>;
  if (!entrenamiento) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-3xl p-10">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-6">📋 Plan de Entrenamiento</h2>

        <div className="bg-gray-200 p-6 rounded-xl shadow-md mb-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="text-xl font-semibold block text-black">⚽ Posición:</label>
              <input
                type="text"
                value={entrenamiento.posicion}
                readOnly
                className="border border-gray-400 px-4 py-3 rounded-lg w-full text-lg text-black"
              />
            </div>
            <div>
              <label className="text-xl font-semibold block text-black">📅 Fecha:</label>
              <input
                type="date"
                value={entrenamiento.fecha}
                onChange={(e) => setEntrenamiento({ ...entrenamiento, fecha: e.target.value })}
                className="border border-gray-400 px-4 py-3 rounded-lg w-full text-lg text-black"
              />
            </div>
            <div>
              <label className="text-xl font-semibold block text-black">🎯 Objetivo:</label>
              <input
                type="text"
                value={entrenamiento.objetivo}
                onChange={(e) => setEntrenamiento({ ...entrenamiento, objetivo: e.target.value })}
                className="border border-gray-400 px-4 py-3 rounded-lg w-full text-lg text-black"
              />
            </div>
          </div>
        </div>

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

        <div className="mt-6 text-center">
          <button onClick={guardarEntrenamiento} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl text-xl">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
