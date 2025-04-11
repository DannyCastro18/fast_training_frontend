"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [player, setPlayer] = useState("");
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    altura: "",
    peso: "",
    posicion: "",
    porcentaje_de_grasa_corporal: "",
    porcentaje_de_masa_muscular: "",
    tipo_de_cuerpo: "",
    potencia_muscular_piernas: "",
    velocidad_maxima: "",
    resistencia_aerobica: "",
    resistencia_anaerobica: "",
    flexibilidad: "",
  });

  const posiciones = ["delantero", "mediocampista", "defensa", "arquero"];

  const unidades = {
    altura: "(cm)",
    peso: "(kg)",
    porcentaje_de_grasa_corporal: "(%)",
    porcentaje_de_masa_muscular: "(%)",
    potencia_muscular_piernas: "(metros)", // Salto horizontal metros
    velocidad_maxima: "(km/h)", // Test de 30m
    resistencia_aerobica: "(min/km/ppm)", // VO₂ máx, gráfico con  ml/kg/min
    resistencia_anaerobica: "(s/reps/km)", // Test de 10x40m tiempo promedio de los sprints
    flexibilidad: "(cm)", // Test de sit and reach. distancia alcanzada en cm
  }; 

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jugadores/ver");
        console.log(response)
        const data = await response.json();
        console.log(data)
        setPlayers(data.data);
      } catch (error) {
        console.error("Error al obtener jugadores:", error);
      }
    };

    fetchPlayers();
  }, []);

  const handleSave = async () => {
    if (!player) {
      alert("Por favor selecciona un jugador.");
      return;
    }

    for (const key in formData) {
      if (!formData[key]) {
        alert(`El campo ${key.replace(/_/g, " ")} es obligatorio.`);
        return;
      }
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/jugadores/${player}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const result = await response.json();
        alert("Jugador actualizado con éxito");
        console.log("Respuesta del servidor:", result);
      } else {
        alert("Error al actualizar el jugador");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="flex flex-col text-black p-6 bg-gray-100 shadow-lg rounded-lg w-3/4 overflow-y-auto">
      <h2 className="text-4xl font-bold text-left mb-4">
        Ingreso de datos de jugador
      </h2>
      <select
        className="w-1/2 p-2 border border-blue-900 rounded text-left bg-white shadow-md"
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
      >
        <option value="">Seleccionar Jugador</option>
        {players.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-6 w-full mt-6 ">
        {Object.keys(formData).map((key) =>
          key === "posicion" ? (
            <div key={key} className="flex flex-col ">
              <label className="font-medium">Posición:</label>
              <select
                className=" rounded p-2 bg-white shadow-md border border-blue-900"
                value={formData[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
              >
                <option value="">Seleccionar posición</option>
                {posiciones.map((pos, index) => (
                  <option key={index} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div key={key} className="flex flex-col  ">
              <label className="font-medium capitalize ">
                {key.replace(/_/g, " ")}{" "}
                {unidades[key] && (
                  <span className="text-gray-600">{unidades[key]}</span>
                )}
                :
              </label>
              <input
                className=" rounded p-2 shadow-md border border-blue-900"
                type="text"
                value={formData[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
              />
            </div>
          ),
        )}
      </div>

      <div className="flex justify-start mt-8 space-x-8">
        <button className="bg-gray-300 text-gray-600 p-2 rounded cursor-not-allowed ">
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-900 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
