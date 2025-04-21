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
  const [fecha, setFecha] = useState("");
  const [selectedPosicion, setSelectedPosicion] = useState("");
  const [selectedObjetivo, setSelectedObjetivo] = useState("");

  const [user, setUser] = useState(0); //Id del usuario
  const [equipoId, setEquipoId] = useState(null);
  const [datoSesionId, setDatoSesionId] = useState(null);
  const router = useRouter();

  const obtenerEquipoId = async (user) => {
    // if (!usuarioId) {
    //   console.error("No se proporcionó un ID válido");
    //   throw new Error("ID de entrenador no válido");
    // };
    try {
      const usuarioId = user;
      console.log(`Usuarioo: ${usuarioId}`);
      const respuesta = await fetch(
        `http://localhost:5000/api/entrenador/usuario/${usuarioId}`,
      );
      if (!respuesta.ok) {
        throw new Error("No se pudo obtener el equipo");
      }
      const data = await respuesta.json();
      console.log("EquipoId: ", data.equipo_id);
      setEquipoId(data.equipo_id);
    } catch (error) {
      console.error("Error obteniendo el equipo:", error);
      return null;
    }
  };

  useEffect(() => {
    if (typeof window !== "unefined") {
      const usuarioId = localStorage.getItem("id");
      if (usuarioId) {
        console.log("Id del usuario:", usuarioId);
        /*           setUser(); */
        //ObtenerEquipoId
        obtenerEquipoId(Number(usuarioId));
      } else {
        console.error("No se encontró id");
      }
    }
  }, []);

  const registrarDatosPosicion = async () => {
    /*  if (!selectedPosicion ) {
      alert("Selecciona una posición ");
      return;
    } else if (!equipoId) {
      alert("Asegúrate de estar en un equipo");
      return;
    } else{
      alert("No está recibiendo ninguno")
    } */
    console.log(`Equipo_id: ${equipoId}`);

    try {
      console.log(`Equipo_id: ${equipoId}`);
      const response = await fetch(
        `http://localhost:5000/api/sesion/crear/${equipoId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fecha: fecha || new Date().toISOString().split("T")[0],
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
    console.log(datoSesionId);

    try {
      const id = datoSesionId;
      const response = await fetch(
        `http://localhost:5000/api/entrenamiento/crear/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) throw new Error("Error generando entrenamiento");

      alert("Entrenamiento generado correctamente");
      router.push("/inicio");
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

        {/* Seleccionar Fecha */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">
            Selecionar Fecha
          </label>
          <input
            type="date"
            className="border p-2 w-full rounded-md text-black"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
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

        {/* Botón para registrar datos de posición */}
        <button
          onClick={registrarDatosPosicion}
          className="w-full bg-white text-blue-500 p-3 border border-blue-500 rounded-md font-bold mb-2"
        >
          Registrar datos de posición
        </button>

        {/* Botón para generar entrenamiento */}
        <button
          onClick={generarEntrenamiento}
          className="w-full bg-white border border-blue-500 text-blue-500 p-3 rounded-md font-bold"
        >
          Generar entrenamiento
        </button>
      </div>
    </div>
  );
};

export default EntrenamientoForm;
