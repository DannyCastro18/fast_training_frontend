"use client";

import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import { useState, useEffect } from "react";
import "@/app/globals.css";
import CloseRounded from "@mui/icons-material/CloseRounded";

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

// Función para obtener entrenamientos desde la API
const ObtenerEntrenamiento = async () => {
  try {
    const response = await fetch(`/api/entrenamiento/verUno/${id}`);
    if (!response.ok) {
      throw new Error("No se pudieron obtener los entrenamientos");
    }
    const data = await response.json();
    return data.entrenamientos;
  } catch (error) {
    console.error("Error al obtener los entrenamientos:", error);
    return [];
  }
};

const ObtenerEntrenamientos = async () => {
  try {
    const response = await fetch(`/api/entrenamiento`);
    if (!response.ok) {
      throw new Error("No se pudieron obtener los entrenamientos");
    }
    const data = await response.json();
    return data.entrenamientos;
  } catch (error) {
    console.error("Error al obtener los entrenamientos:", error);
    return [];
  }
};

export default function Calendario() {
  const [eventos, setEventos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  // Cargar sesiones en el calendario desde la API
  useEffect(() => {
    const cargarEntrenamientos = async () => {
      const entrenamientos = await ObtenerEntrenamientos();

      const eventosTransformados = entrenamientos.map((entrenamientos) => ({
        ...entrenamientos,
        title: `Entrenamiento - ${entrenamientos.posicion}`,
        title: `Entrenamiento - ${entrenamientos.posicion}`,
        start: new Date(entrenamientos.fecha),
        end: new Date(entrenamientos.fecha),
        allDay: true,
      }));

      setEventos(eventosTransformados);
    };

    cargarEntrenamientos();
  }, []);

  const handleSelectEvent = (evento) => {
    setPlanSeleccionado(evento);
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

      {/* Modal */}
      {modalOpen && planSeleccionado && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Sesión de {planSeleccionado.posicion}
              </h2>
              <button onClick={() => setModalOpen(false)}>
                <CloseRounded />
              </button>
            </div>

            <p className="text-gray-700 mt-2">
              <strong>Objetivo:</strong> {planSeleccionado.objetivo}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              📅 {planSeleccionado.start.toLocaleDateString()}
            </p>

            {/* Tabla de fases */}
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
                <tr>
                  <td className="border border-gray-300 px-2 py-1 font-semibold">
                    Fase Inicial
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <ul className="list-disc pl-5">
                      {Object.values(
                        planSeleccionado.faseInicial?.calentamientos || {},
                      ).map((ej, i) => (
                        <li key={i}>{ej}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 font-semibold">
                    Fase Central
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <ul className="list-disc pl-5">
                      {Object.values(
                        planSeleccionado.faseCentral?.ejercicios || {},
                      ).map((ej, i) => (
                        <li key={i}>{ej}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1 font-semibold">
                    Fase Final
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <ul className="list-disc pl-5">
                      {Object.values(
                        planSeleccionado.faseFinal?.estiramientos || {},
                      ).map((ej, i) => (
                        <li key={i}>{ej}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
