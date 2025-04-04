"use client";

import { useState, useEffect } from "react";

const EntrenamientoForm = () => {
  const [jugadores, setJugadores] = useState([]);
  const [objetivos, setObjetivos] = useState([
    "Velocidad y resistencia",
    "Fuerza y potencia",
    "Técnica y precisión",
    "Recuperación activa",
  ]);
  const [selectedJugador, setSelectedJugador] = useState("");
  const [selectedObjetivo, setSelectedObjetivo] = useState("Velocidad y resistencia");
  const [entrenamiento, setEntrenamiento] = useState(null);



  // useEffect(() => {
  //   fetch("http//:localhost:5000/api/jugadores/ver")
  //     .then((res) => res.json())
  //     .then((data) => setJugadores(data))
  //     .catch((error) => console.error("Error cargando jugadores:", error));
  // }, []);
  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jugadores/ver");
        const data = await response.json();
        setJugadores(data);
      } catch (error) {
        console.error("Error al obtener jugadores:", error);
      }
    };

    fetchJugadores();
  }, []);

  const crearEntrenamiento = async (nuevoEntrenamiento) => {
    try {
      const response = await fetch("http://localhost:5000/api/entrenamientos/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoEntrenamiento),
      });

      if (!response.ok) {
        throw new Error("No se pudo crear el entrenamiento");
      }

      return await response.json();
    } catch (error) {
      console.error("Error al crear el entrenamiento:", error);
      return null;
    }
  };

  const crearcionEntrenamiento = async () => {
    if (!selectedJugador) {
      alert("Selecciona un jugador");
      return;
    }

    const nuevoEntrenamiento = {
      jugadorId: Number(selectedJugador),
      objetivo: selectedObjetivo,
      duracion: "60 min",
    };

    const data = await crearEntrenamiento(nuevoEntrenamiento);
    if (data) {
      setEntrenamiento({
        jugador: jugadores.find((j) => j.id === Number(selectedJugador))?.nombre,
        plan: selectedObjetivo,
        duracion: "60 min",
      });
      alert("Entrenamiento registrado correctamente");
    } else {
      alert("Hubo un error al registrar el entrenamiento");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 w-full">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Crear sesión de entrenamiento
        </h2>

        {/* Selección de jugador */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">
            Selecciona un jugador
          </label>
          <select
            className="border p-2 w-full rounded-md text-black"
            value={selectedJugador}
            onChange={(e) => setSelectedJugador(e.target.value)}
          >
            <option value="">Selecciona</option>
            {jugadores.map((jugador) => (
              <option key={jugador.id} value={jugador.id}>
                {jugador.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">
            Selecciona un objetivo
          </label>
          <select
            className="border p-2 w-full rounded-md text-black"
            value={selectedObjetivo}
            onChange={(e) => setSelectedObjetivo(e.target.value)}
          >
            {objetivos.map((objetivo, index) => (
              <option key={index} value={objetivo}>
                {objetivo}
              </option>
            ))}
          </select>
        </div>


        <button
          onClick={crearcionEntrenamiento}
          className="w-full bg-blue-900 text-white p-3 rounded-md font-bold"
        >
          Crear entrenamiento
        </button>

        {/* Mostrar entrenamiento generado */}
        {entrenamiento && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-bold text-gray-800"> Entrenamiento registrado</h3>
            <p className="mt-2 text-black">
              <strong>Jugador:</strong> {entrenamiento.jugador}
            </p>
            <p className="text-black">
              <strong>Objetivo:</strong> {entrenamiento.plan}
            </p>
            <p className="text-black">
              <strong>Duración:</strong> {entrenamiento.duracion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntrenamientoForm;
