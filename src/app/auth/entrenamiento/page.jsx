"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EntrenamientoForm = () => {
  const [jugadores, setJugadores] = useState([]);
  const [posiciones, setPosiciones] = useState([
    "Delantero",
    "Mediocampista",
    "Defensa",
    "Portero",
  ]);
  const [objetivos, setObjetivos] = useState([
    "Velocidad y resistencia",
    "Fuerza y potencia",
    "Técnica y precisión",
    "Recuperación activa",
  ]);
  const [selectedJugador, setSelectedJugador] = useState("");
  const [selectedPosicion, setSelectedPosicion] = useState("");
  const [selectedObjetivo, setSelectedObjetivo] = useState(
    "Velocidad y resistencia",
  );
  const [entrenamiento, setEntrenamiento] = useState(null);
  const router = useRouter();

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

  const registrarDatosPosicion = async () => {
    if (!selectedJugador || !selectedPosicion) {
      alert("Selecciona un jugador y su posición");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/datos-posicion/${selectedJugador}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fecha: new Date().toISOString().split("T")[0],
            objetivo: selectedObjetivo,
            posicion: selectedPosicion,
          }),
        },
      );

      if (!response.ok) throw new Error("Error registrando datos");

      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error("Error registrando datos de posición:", error);
      return null;
    }
  };

  const generarEntrenamiento = async () => {
    const sesionId = await registrarDatosPosicion();
    if (!sesionId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/entrenamientos/generar/${sesionId}`,
        {
          method: "POST",
        },
      );

      if (!response.ok) throw new Error("Error generando entrenamiento");

      const data = await response.json();
      setEntrenamiento(data);
      alert("Entrenamiento generado correctamente");
      router.push("/calendario");
    } catch (error) {
      console.error("Error al generar entrenamiento:", error);
      alert("Hubo un error al generar el entrenamiento");
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

        {/* Selección de posición */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">
            Selecciona la posición
          </label>
          <select
            className="border p-2 w-full rounded-md text-black"
            value={selectedPosicion}
            onChange={(e) => setSelectedPosicion(e.target.value)}
          >
            <option value="">Selecciona</option>
            {posiciones.map((pos, index) => (
              <option key={index} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de objetivo */}
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
          onClick={generarEntrenamiento}
          className="w-full bg-blue-900 text-white p-3 rounded-md font-bold"
        >
          Generar entrenamiento
        </button>

        {entrenamiento && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-bold text-gray-800">
              Entrenamiento generado
            </h3>
            <p className="mt-2 text-black">
              <strong>Fase Inicial:</strong> {entrenamiento.fase_inicial.length}{" "}
              ejercicios
            </p>
            <p className="text-black">
              <strong>Fase Central:</strong> {entrenamiento.fase_central.length}{" "}
              ejercicios
            </p>
            <p className="text-black">
              <strong>Fase Final:</strong> {entrenamiento.fase_final.length}{" "}
              ejercicios
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntrenamientoForm;
