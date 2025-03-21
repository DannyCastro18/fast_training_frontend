"use client"; // Necesario para componentes interactivos en Next.js

import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es"; // Para idioma español
import { useState, useEffect } from "react";
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

export default function Calendario() {
  const [eventos, setEventos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  // Carga de eventos
  useEffect(() => {
    const obtenerEventos = async () => {
      const eventosDesdeAPI = [
        {
          id: 1,
          title: "Entrenamiento",
          start: new Date(),
          end: new Date(),
          descripcion: "Sesión intensa de entrenamiento",
        },
        {
          id: 2,
          title: "Partido de fútbol",
          start: new Date(2024, 2, 25, 15, 0),
          end: new Date(2024, 2, 25, 17, 0),
          descripcion: "Partido contra el equipo rival",
        },
      ];
      setEventos(eventosDesdeAPI);
    };

    obtenerEventos();
  }, []);

  const handleSelectEvent = (evento) => {
    setEventoSeleccionado(evento);
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
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        messages={messages}
        onSelectEvent={handleSelectEvent}
      />

      {/* Modal */}
      {modalOpen && eventoSeleccionado && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold">{eventoSeleccionado.title}</h2>
            <p className="text-gray-700 mt-2">
              {eventoSeleccionado.descripcion}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              📅 {eventoSeleccionado.start.toLocaleDateString()} -{" "}
              {eventoSeleccionado.end.toLocaleDateString()}
            </p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
