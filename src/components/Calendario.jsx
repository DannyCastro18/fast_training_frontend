// "use client"; // Necesario para componentes interactivos en Next.js

// import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { format, parse, startOfWeek, getDay } from "date-fns";
// import es from "date-fns/locale/es"; // Para idioma español
// import { useState, useEffect } from "react";
// import "@/app/globals.css";

// const locales = { es };
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
//   getDay,
//   locales,
// });

// const messages = {
//   today: "Hoy",
//   previous: "Anterior",
//   next: "Siguiente",
//   month: "Mes",
//   week: "Semana",
//   day: "Día",
//   agenda: "Agenda",
//   showMore: (total) => `+ Ver ${total} más`,
// };

// export default function Calendario() {
//   const [eventos, setEventos] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

//   // Carga de eventos
//   useEffect(() => {
//     const obtenerEventos = async () => {
//       const eventosDesdeAPI = [
//         {
//           id: 1,
//           title: "Entrenamiento",
//           start: new Date(),
//           end: new Date(),
//           descripcion: "Sesión intensa de entrenamiento",
//         },
//         {
//           id: 2,
//           title: "Partido de fútbol",
//           start: new Date(2024, 2, 25, 15, 0),
//           end: new Date(2024, 2, 25, 17, 0),
//           descripcion: "Partido contra el equipo rival",
//         },
//       ];
//       setEventos(eventosDesdeAPI);
//     };

//     obtenerEventos();
//   }, []);

//   const handleSelectEvent = (evento) => {
//     setEventoSeleccionado(evento);
//     setModalOpen(true);
//   };

//   return (
//     <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//       <Calendar
//         localizer={localizer}
//         events={eventos}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//         views={[Views.MONTH, Views.WEEK, Views.DAY]}
//         messages={messages}
//         onSelectEvent={handleSelectEvent}
//       />

//       {/* Modal */}
//       {modalOpen && eventoSeleccionado && (
//         <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold">{eventoSeleccionado.title}</h2>
//             <p className="text-gray-700 mt-2">
//               {eventoSeleccionado.descripcion}
//             </p>
//             <p className="text-gray-500 text-sm mt-1">
//               📅 {eventoSeleccionado.start.toLocaleDateString()} -{" "}
//               {eventoSeleccionado.end.toLocaleDateString()}
//             </p>
//             <button
//               onClick={() => setModalOpen(false)}
//               className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";

const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const CalendarioEntrenamiento = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSesiones, setSelectedSesiones] = useState([]);

  useEffect(() => {
    // Obtener entrenamientos desde la API
    fetch("/api/entrenamientos")
      .then((res) => res.json())
      .then((data) => setEntrenamientos(data));
  }, []);

  const days = getDaysInMonth(currentYear, currentMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const changeMonth = (step) => {
    const newMonth = currentMonth + step;
    if (newMonth < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
    setSelectedDay(null); // Limpiar selección al cambiar de mes
  };

  const handleDayClick = (date) => {
    const dateString = date.toISOString().split("T")[0];
    const entrenamiento = entrenamientos.find((e) => e.fecha === dateString);
    if (entrenamiento) {
      setSelectedDay(dateString);
      setSelectedSesiones(entrenamiento.sesiones);
    } else {
      setSelectedDay(null);
      setSelectedSesiones([]);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg">
      {/* Encabezado del calendario */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          ◀
        </button>
        <h2 className="text-lg font-bold capitalize">
          {new Date(currentYear, currentMonth).toLocaleString("es-ES", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          ▶
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-700">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7 gap-1">
        {Array(firstDay)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className="p-2"></div>
          ))}

        {days.map((date) => {
          const dateString = date.toISOString().split("T")[0];
          const isEntrenamiento = entrenamientos.some(
            (e) => e.fecha === dateString,
          );
          const isSelected = selectedDay === dateString;

          return (
            <div
              key={date}
              className={`p-2 text-center rounded-md cursor-pointer transition ${
                isEntrenamiento
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-100 hover:bg-gray-300"
              } ${isSelected ? "ring-4 ring-orange-300" : ""}`}
              onClick={() => handleDayClick(date)}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      {/* Sesiones del día seleccionado */}
      {selectedDay && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
          <h3 className="text-lg font-bold text-orange-600">
            Sesiones para {selectedDay}
          </h3>
          <ul className="mt-2 space-y-2">
            {selectedSesiones.map((sesion, index) => (
              <li key={index} className="p-2 bg-white rounded-lg shadow">
                {sesion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarioEntrenamiento;
