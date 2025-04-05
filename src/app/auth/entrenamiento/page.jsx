"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EntrenamientoForm = () => {
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
  const [selectedPosicion, setSelectedPosicion] = useState("");
  const [selectedObjetivo, setSelectedObjetivo] = useState(
    "Velocidad y resistencia",
  );
  const [equipoId, setEquipoId] = useState(null);
  const [datoSesionId, setDatoSesionId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Suponiendo que el equipoId se obtiene de la sesión del usuario
    const usuarioAutenticado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioAutenticado) {
      setEquipoId(usuarioAutenticado.equipoId);
    }
  }, []);

  const registrarDatosPosicion = async () => {
    if (!selectedPosicion || !equipoId) {
      alert("Selecciona una posición y asegúrate de estar en un equipo");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/posicion/registrar/${equipoId}`,
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

      if (!response.ok) throw new Error("Error registrando datos de posición");

      const data = await response.json();
      setDatoSesionId(data.id);
      alert("Datos de posición registrados correctamente");
    } catch (error) {
      console.error("Error al registrar datos de posición:", error);
      alert("Hubo un error al registrar los datos de posición");
    }
  };

  const generarEntrenamiento = async () => {
    if (!datoSesionId) {
      alert(
        "Primero registra los datos de posición antes de generar el entrenamiento",
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/entrenamientos/generar/${datoSesionId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) throw new Error("Error generando entrenamiento");

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

        {/* Botón para registrar datos de posición */}
        <button
          onClick={registrarDatosPosicion}
          className="w-full bg-green-600 text-white p-3 rounded-md font-bold mb-2"
        >
          Registrar datos de posición
        </button>

        {/* Botón para generar entrenamiento */}
        <button
          onClick={generarEntrenamiento}
          className="w-full bg-blue-900 text-white p-3 rounded-md font-bold"
        >
          Generar entrenamiento
        </button>
      </div>
    </div>
  );
};

export default EntrenamientoForm;
