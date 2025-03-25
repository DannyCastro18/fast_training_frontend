"use client";

import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import { useState, useEffect } from "react";
import axios from "axios";
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
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Carga de eventos desde API
  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const respuesta = await fetch("https://api.ejemplo.com/eventos");
        const datos = await respuesta.json();

        const eventosTransformados = datos.map((evento) => ({
          ...evento,
          start: new Date(evento.start),
          end: evento.end ? new Date(evento.end) : new Date(evento.start),
          allDay: !evento.end,
        }));

        setEventos(eventosTransformados);
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    };

    obtenerEventos();
  }, []);

  // Buscar entrenamientos si no hay eventos en la fecha seleccionada
  useEffect(() => {
    const fetchTrainings = async () => {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      try {
        const response = await axios.get(`https://api.example.com/trainings?date=${formattedDate}`);
        if (response.data.length > 0) {
          setEventos(response.data.map(training => ({
            title: training.title,
            descripcion: training.description,
            start: new Date(training.date + 'T' + training.time),
            end: new Date(training.date + 'T' + training.time),
            allDay: false,
          })));
        } else {
          setEventos(getSampleTrainings(selectedDate));
        }
      } catch (error) {
        console.error("Error fetching trainings:", error);
        setEventos(getSampleTrainings(selectedDate));
      }
    };
    
    fetchTrainings();
  }, [selectedDate]);

  const handleSelectEvent = (evento) => {
    setPlanSeleccionado(evento);
    setModalOpen(true);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
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
        onSelectSlot={handleSelectSlot}
        selectable
      />

      {/* Modal */}
      {modalOpen && planSeleccionado && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold">{planSeleccionado.title}</h2>
            <p className="text-gray-700 mt-2">{planSeleccionado.descripcion}</p>
            <p className="text-gray-500 text-sm mt-1">
              📅 {planSeleccionado.start.toLocaleDateString()} - {planSeleccionado.end.toLocaleDateString()}
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

function getSampleTrainings(date) {
  return [
    {
      title: "Entrenamiento General",
      descripcion: "Sesión de acondicionamiento físico y táctica.",
      start: date,
      end: date,
      allDay: false,
    },
    {
      title: "Ejercicios de Velocidad",
      descripcion: "Enfoque en la aceleración y cambios de dirección.",
      start: date,
      end: date,
      allDay: false,
    },
  ];
}
