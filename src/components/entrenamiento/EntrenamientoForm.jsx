"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const EntrenamientoForm = () => {
  const [posiciones, setPosiciones] = useState(["delantero", "mediocampista", "defensa", "portero"]);
  const [objetivos, setObjetivos] = useState([
    "velocidad",
    "resistencia",
    "Técnica",
    "Fuerza",
    "Flexibilidad",
  ]);
  const [nombre, setNombre]=useState("");
  const [fecha, setFecha] = useState("");
  const [selectedPosicion, setSelectedPosicion] = useState("");
  const [selectedObjetivo, setSelectedObjetivo] = useState("");

  const [equipoId, setEquipoId] = useState(null);
  const router = useRouter();

const obtenerEquipoId = async (user) => {
  try {
    const id = user;
    console.log(`Usuario: ${id}`);
    const respuesta = await axios.get(
      `http://localhost:5000/api/entrenador/usuario/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = respuesta.data;
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

  const generarEntrenamiento = async () => {
    if (!selectedPosicion || ! selectedObjetivo || !fecha || !nombre) {
      alert("Datos incompletos ");
      return;
    } 
    try {
      console.log(`Equipo_id: ${equipoId}`)
      const response = await axios.post(`http://localhost:5000/api/sesion/crear/${equipoId}`, {
        fecha: fecha || new Date().toISOString().split("T")[0],
        objetivo: selectedObjetivo,
        posicion: selectedPosicion,
        nombre_sesion: nombre,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      console.log("Datos de posición registrados correctamente");
     
      const id = data.id;
      const respuesta = await axios.post(`http://localhost:5000/api/entrenamiento/crear/${id}`, {

        headers: { "Content-Type": "application/json" },
      });

      alert("Entrenamiento generado correctamente");
      router.push("/entrenador/inicio");
      
    } catch (error) {
      console.error("Error al generar entrenamiento:", error);
      alert("Hubo un error al generar el entrenamiento");
    }
  };


  return (
    <div className="flex justify-center items-center bg-gray-100 w-full">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Crear sesión de entrenamiento</h2>
        
        {/* Nombre de la sesion de entrenamiento  */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">Agregue un nombre a la sesion de entrenamiento</label>
          <input className="border p-2 w-full rounded-md text-black" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
        </div>
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
          <label className="block text-sm font-medium mb-2 text-black">Selecciona la posición</label>
          <select className="border p-2 w-full rounded-md text-black" value={selectedPosicion} onChange={(e) => setSelectedPosicion(e.target.value)}>
            <option value="">Seleccionar</option>
            {posiciones.map((pos, index) => (
              <option key={index} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de objetivo */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-black">Selecciona un objetivo</label>
          <select className="border p-2 w-full rounded-md text-black" value={selectedObjetivo} onChange={(e) => setSelectedObjetivo(e.target.value)}>
          <option value="">Seleccionar</option>
            {objetivos.map((objetivo, index) => (
              <option key={index} value={objetivo}>
                {objetivo}
              </option>
            ))}
          </select>
        </div>
        {/* Hola */}
        {/* Botón para generar entrenamiento */}
        <button onClick={generarEntrenamiento} className="w-full bg-white border border-blue-500 text-blue-500 p-3 rounded-md font-bold">Generar entrenamiento</button>
      </div>
    </div>
  );
};

export default EntrenamientoForm;