"use client";

import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import { useState, useEffect } from "react";
import CloseRounded from "@mui/icons-material/CloseRounded";
import "@/app/globals.css";

const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const messages = {
  today: "Hoy",
  previous: "Anterior",
  next: "Siguiente",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  showMore: (total) => `+ Ver ${total} más`,
};

const ObtenerEntrenamientos = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/entrenamiento/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("No se pudieron obtener los entrenamientos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los entrenamientos:", error);
    return [];
  }
};

export default function Calendario() {
  const [eventos, setEventos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  useEffect(() => {
    const cargarEntrenamientos = async () => {
      const entrenamientos = await ObtenerEntrenamientos();
      const eventosTransformados = entrenamientos.map((sesion) => ({
        title: "Entrenamiento",
        start: new Date(sesion.fecha),
        end: new Date(sesion.fecha),
        allDay: true,
        ...sesion,
      }));
      setEventos(eventosTransformados);
    };

    cargarEntrenamientos();
  }, []);

  const handleSelectEvent = (evento) => {
    setPlanSeleccionado({
      ...evento,
      fase_inicial:
        typeof evento.fase_inicial === "string"
          ? JSON.parse(evento.fase_inicial)
          : evento.fase_inicial,
      fase_central:
        typeof evento.fase_central === "string"
          ? JSON.parse(evento.fase_central)
          : evento.fase_central,
      fase_final:
        typeof evento.fase_final === "string"
          ? JSON.parse(evento.fase_final)
          : evento.fase_final,
    });
    setModalOpen(true);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={[Views.MONTH, Views.WEEK]}
        messages={messages}
        onSelectEvent={handleSelectEvent}
      />

      {modalOpen && planSeleccionado && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 text-black">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Sesión de Entrenamiento</h2>
              <button onClick={() => setModalOpen(false)}>
                <CloseRounded />
              </button>
            </div>

            <p className="text-gray-700 mt-2">
              <strong>Objetivo:</strong> {planSeleccionado.objetivo}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              📅 {new Date(planSeleccionado.start).toLocaleDateString()}
            </p>

            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-2 py-1 text-left">
                    Fase
                  </th>
                  <th className="border border-gray-300 px-2 py-1 text-left">
                    Ejercicios
                  </th>
                </tr>
              </thead>
              <tbody>
                {["fase_inicial", "fase_central", "fase_final"].map((fase) => (
                  <tr key={fase}>
                    <td className="border border-gray-300 px-2 py-1 font-semibold">
                      {fase.replace("fase_", "Fase ")}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <ul className="list-disc pl-5">
                        {planSeleccionado[fase]?.map((ejercicio, i) => (
                          <li key={`${fase}-${i}`}>
                            {ejercicio.ejercicio} ({ejercicio.repeticiones}{" "}
                            repeticiones, {ejercicio.series} series)
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
