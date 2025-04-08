"use client";

import { useState } from "react";
import Image from "next/image";

export default function Page() {
  let [formData, setFormData] = useState({
    altura: "1.80",
    peso: "75",
    grasaCorporal: "15",
    masaMuscular: "40",
    fuerza: "Alta",
    velocidadMaxima: "30 km/h",
    resistenciaAerobica: "Buena",
    resistenciaAnaerobica: "Media",
    flexibilidad: "Buena"
  });

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("http://localhost:3001/estadisticas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      let data = await res.json();
      console.log("Datos guardados:", data);
      alert("Estadísticas enviadas correctamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al enviar los datos");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full p-6 sm:p-10 2xl:px-32 2xl:py-20 rounded-xl shadow-xl border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-azul-principal">
          Estadísticas Físicas del Jugador
        </h1>

        <div className="flex flex-col lg:flex-row items-start gap-10 2xl:gap-20">
          {/* Imagen a la izquierda */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <Image
              src="/juga.png"
              alt="jugador"
              width={300}
              height={500}
              className="object-contain"
            />
          </div>

          {/* Datos mostrados como texto */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
            {[
              { name: "altura", label: "Altura (m)" },
              { name: "peso", label: "Peso (kg)" },
              { name: "grasaCorporal", label: "Grasa Corporal (%)" },
              { name: "masaMuscular", label: "Masa Muscular (%)" },
              { name: "fuerza", label: "Fuerza" },
              { name: "velocidadMaxima", label: "Velocidad Máxima" },
              { name: "resistenciaAerobica", label: "Resistencia Aeróbica" },
              { name: "resistenciaAnaerobica", label: "Resistencia Anaeróbica" },
              { name: "flexibilidad", label: "Flexibilidad" }
            ].map((field) => (
              <div key={field.name} className="border border-blue-400 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-700">{field.label}</p>
                <p className="text-gray-900">{formData[field.name]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="azul-principal hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg text-lg"
          >
            Ingresar nuevos datos
          </button>
        </div>
      </form>
    </div>
  );
}
