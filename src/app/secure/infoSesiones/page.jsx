


// "use client";

// import { useState } from "react";
// import axios from "axios";

// export default function Page() {
//   let [fecha, setFecha] = useState("");
//   let [nombre, setNombre] = useState("");
//   let [posicion, setPosicion] = useState("");
//   let [objetivo, setObjetivo] = useState("");

//   let handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let res = await axios.post("http://localhost:3001/plan", {
//         fecha,
//         nombre,
//         posicion,
//         objetivo
//       });

//       console.log("Plan registrado:", res.data);
//       alert("Plan registrado correctamente");
//     } catch (error) {
//       console.error("Error al registrar el plan:", error);
//       alert("Hubo un error al registrar el plan");
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-white text-azul-principal flex items-center justify-center p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white w-full max-w-7xl p-10 md:p-16 min-h-[700px] rounded-xl shadow-2xl border border-gray-300 flex flex-col"
//       >
//         <h1 className="text-4xl font-bold text-left mb-12">
//           Llena la información para crear sesiones de entrenamiento
//         </h1>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-grow">
//           <div>
//             <label className="block text-lg font-semibold mb-2">Fecha</label>
//             <input
//               type="date"
//               value={fecha}
//               onChange={(e) => setFecha(e.target.value)}
//               className="w-full px-4 py-3 border border-black rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-lg font-semibold mb-2">Nombre del jugador</label>
//             <input
//               type="text"
//               placeholder="Ej: Juan Pérez"
//               value={nombre}
//               onChange={(e) => setNombre(e.target.value)}
//               className="w-full px-4 py-3 border border-black rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-lg font-semibold mb-2">Posición</label>
//             <input
//               type="text"
//               placeholder="Ej: Delantero"
//               value={posicion}
//               onChange={(e) => setPosicion(e.target.value)}
//               className="w-full px-4 py-3 border border-blue-950 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-lg font-semibold mb-2">Objetivo</label>
//             <input
//               type="text"
//               placeholder="Ej: Mejorar velocidad"
//               value={objetivo}
//               onChange={(e) => setObjetivo(e.target.value)}
//               className="w-full px-4 py-3 border border-blue-950 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//         </div>

//         <div className="flex justify-center gap-10 mt-auto">
//           <button
//             type="button"
//             onClick={() => {
//               setFecha("");
//               setNombre("");
//               setPosicion("");
//               setObjetivo("");
//             }}
//             className="px-6 py-3 azul-principal text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
//           >
//             Cancelar
//           </button>

//           <button
//             type="submit"
//             className="px-6 py-3 azul-principal text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
//           >
//             Guardar
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import axios from "axios";

export default function Page() {
  const [fecha, setFecha] = useState("");
  const [nombre, setNombre] = useState("");
  const [posicion, setPosicion] = useState("");
  const [objetivo, setObjetivo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/plan", {
        fecha,
        nombre,
        posicion,
        objetivo,
      });

      console.log("Plan registrado:", res.data);
      alert("Plan registrado correctamente");
    } catch (error) {
      console.error("Error al registrar el plan:", error);
      alert("Hubo un error al registrar el plan");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-azul-principal flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-7xl p-10 md:p-16 min-h-[700px] rounded-xl shadow-2xl border border-gray-300 flex flex-col"
      >
        <h1 className="text-4xl font-bold text-left mb-12">
          Llena la información para crear sesiones de entrenamiento
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-grow">
          <div>
            <label className="block text-lg font-semibold mb-2">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-4 py-3 border border-blue-900 rounded-lg text-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Nombre del jugador
            </label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-3 border border-blue-900 rounded-lg text-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Posición</label>
            <input
              type="text"
              placeholder="Ej: Delantero"
              value={posicion}
              onChange={(e) => setPosicion(e.target.value)}
              className="w-full px-4 py-3 border border-blue-900 rounded-lg text-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Objetivo</label>
            <input
              type="text"
              placeholder="Ej: Mejorar velocidad"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              className="w-full px-4 py-3 border border-blue-900 rounded-lg text-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex justify-center gap-10 mt-auto">
          <button
            type="button"
            onClick={() => {
              setFecha("");
              setNombre("");
              setPosicion("");
              setObjetivo("");
            }}
            className="px-6 py-3 azul-principal text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-6 py-3 azul-principal text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
