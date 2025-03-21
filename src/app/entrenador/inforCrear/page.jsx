"use client";

import { useState } from "react";

export default function ScheduleForm() {
  const [selectedDay, setSelectedDay] = useState("Miércoles");
  const [data, setData] = useState({
    Lunes: { objetivo: "", fecha: "", posicion: "", duracion: "" },
    Martes: { objetivo: "", fecha: "", posicion: "", duracion: "" },
    Miércoles: { objetivo: "Mejorar la velocidad", fecha: "03/04/2024", posicion: "Delanteros", duracion: "65 min" },
    Jueves: { objetivo: "", fecha: "", posicion: "", duracion: "" },
    Viernes: { objetivo: "", fecha: "", posicion: "", duracion: "" },
  });

  const handleChange = (e, field) => {
    setData({
      ...data,
      [selectedDay]: { ...data[selectedDay], [field]: e.target.value },
    });
  };

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-xl font-semibold text-black mb-4">
        &lt; Posición / delanteros &gt;
      </h2>
      <div className="bg-gray-300 p-6 rounded-3xl w-full max-w-4xl flex justify-between items-center">
        {days.map((day) => (
          <div
            key={day}
            className={`flex flex-col items-center w-1/5 p-4 h-80 bg-gray-400 cursor-pointer
                        rounded-b-full transition-all ${
                          selectedDay === day ? "bg-gray-500" : ""
                        }`}
            onClick={() => setSelectedDay(day)}
          >
            <span className="text-black font-semibold">{day}</span>
            {selectedDay === day && (
              <form className="mt-2 text-sm text-white text-center w-full px-2">
                <label className="block text-left">
                  <span className="font-bold">Objetivo:</span>
                  <input
                    type="text"
                    value={data[day].objetivo}
                    onChange={(e) => handleChange(e, "objetivo")}
                    className="w-full text-black p-1 rounded"
                  />
                </label>
                <label className="block text-left">
                  <span className="font-bold">Fecha:</span>
                  <input
                    type="date"
                    value={data[day].fecha}
                    onChange={(e) => handleChange(e, "fecha")}
                    className="w-full text-black p-1 rounded"
                  />
                </label>
                <label className="block text-left">
                  <span className="font-bold">Posición:</span>
                  <input
                    type="text"
                    value={data[day].posicion}
                    onChange={(e) => handleChange(e, "posicion")}
                    className="w-full text-black p-1 rounded"
                  />
                </label>
                <label className="block text-left">
                  <span className="font-bold">Duración:</span>
                  <input
                    type="text"
                    value={data[day].duracion}
                    onChange={(e) => handleChange(e, "duracion")}
                    className="w-full text-black p-1 rounded"
                  />
                </label>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
