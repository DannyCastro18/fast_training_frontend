
// // "use client";

// // import { useState } from "react";
// // import Image from "next/image";

// // export default function Page() {
// //   let [formData, setFormData] = useState({
// //     altura: "",
// //     peso: "",
// //     grasaCorporal: "",
// //     masaMuscular: "",
// //     fuerza: "",
// //     velocidadMaxima: "",
// //     resistenciaAerobica: "",
// //     resistenciaAnaerobica: "",
// //     flexibilidad: ""
// //   });

// //   let handleChange = (e) => {
// //     let { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   let handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       let res = await fetch("http://localhost:3001/estadisticas", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData)
// //       });

// //       let data = await res.json();
// //       console.log("Datos guardados:", data);
// //       alert("Estadísticas enviadas correctamente");
// //     } catch (error) {
// //       console.error("Error:", error);
// //       alert("Hubo un error al enviar los datos");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 text-black">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white w-full p-6 sm:p-10 2xl:px-32 2xl:py-20 rounded-xl shadow-xl border border-gray-200"
// //       >
// //         <h1 className="text-3xl font-bold text-center mb-8 text-azul-principal">
// //           Registrar Estadísticas Físicas
// //         </h1>

// //         <div className="flex flex-col lg:flex-row items-start gap-10 2xl:gap-20">
// //           {/* Imagen a la izquierda */}
// //           <div className="w-full lg:w-1/3 flex justify-center">
// //             <Image
// //               src="/juga.png"
// //               alt="jugador"
// //               width={300}
// //               height={500}
// //               className="object-contain"
// //             />
// //           </div>

// //           {/* Campos del formulario a la derecha */}
// //           <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
// //             {[
// //               { name: "altura", label: "Altura (m)" },
// //               { name: "peso", label: "Peso (kg)" },
// //               { name: "grasaCorporal", label: "Grasa Corporal (%)" },
// //               { name: "masaMuscular", label: "Masa Muscular (%)" },
// //               { name: "fuerza", label: "Fuerza" },
// //               { name: "velocidadMaxima", label: "Velocidad Máxima" },
// //               { name: "resistenciaAerobica", label: "Resistencia Aeróbica" },
// //               { name: "resistenciaAnaerobica", label: "Resistencia Anaeróbica" },
// //               { name: "flexibilidad", label: "Flexibilidad" }
// //             ].map((field) => (
// //               <div key={field.name}>
// //                 <label className="block text-sm font-medium mb-1">
// //                   {field.label}
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name={field.name}
// //                   value={formData[field.name]}
// //                   onChange={handleChange}
// //                   className="w-full px-3 py-2 border border-blue-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
// //                   required
// //                 />
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="flex justify-center mt-6">
// //           <button
// //             type="submit"
// //             className="azul-principal hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg text-lg"
// //           >
// //             Ingresar nuevos datos
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }


// "use client";

// import { useState } from "react";

// export default function Page() {
//   let [formData, setFormData] = useState({
//     altura: "",
//     peso: "",
//     grasaCorporal: "",
//     masaMuscular: "",
//     fuerza: "",
//     velocidadMaxima: "",
//     resistenciaAerobica: "",
//     resistenciaAnaerobica: "",
//     flexibilidad: ""
//   });

//   let handleChange = (e) => {
//     let { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   let handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let res = await fetch("http://localhost:3001/estadisticas", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       });

//       let data = await res.json();
//       console.log("Datos guardados:", data);
//       alert("Estadísticas enviadas correctamente");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Hubo un error al enviar los datos");
//     }
//   };

//   let handleCancelar = () => {
//     setFormData({
//       altura: "",
//       peso: "",
//       grasaCorporal: "",
//       masaMuscular: "",
//       fuerza: "",
//       velocidadMaxima: "",
//       resistenciaAerobica: "",
//       resistenciaAnaerobica: "",
//       flexibilidad: ""
//     });
//     alert("Formulario cancelado");
//   };

//   let seleccionarJugador = () => {
//     console.log("Seleccionar jugador");
//     alert("Seleccionar jugador");
//   };

//   return (
//     <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 text-black">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white w-full p-6 sm:p-10 2xl:px-32 2xl:py-20 rounded-xl shadow-xl border border-gray-200"
//       >
//         <h1 className="text-3xl font-bold text-center mb-4 text-azul-principal">
//           Ingreso de datos del jugador
//         </h1>

//         <div className="flex justify-center mb-6">
//           <button
//             type="button"
//             onClick={seleccionarJugador}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
//           >
//             Seleccionar jugador
//           </button>
//         </div>

//         <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {[
//             { name: "altura", label: "Altura (m)" },
//             { name: "peso", label: "Peso (kg)" },
//             { name: "grasaCorporal", label: "Grasa Corporal (%)" },
//             { name: "masaMuscular", label: "Masa Muscular (%)" },
//             { name: "fuerza", label: "Fuerza" },
//             { name: "velocidadMaxima", label: "Velocidad Máxima" },
//             { name: "resistenciaAerobica", label: "Resistencia Aeróbica" },
//             { name: "resistenciaAnaerobica", label: "Resistencia Anaeróbica" },
//             { name: "flexibilidad", label: "Flexibilidad" }
//           ].map((field) => (
//             <div key={field.name}>
//               <label className="block text-sm font-medium mb-1">
//                 {field.label}
//               </label>
//               <input
//                 type="text"
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-blue-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
//                 required
//               />
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center gap-4 mt-6">
//           <button
//             type="submit"
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg text-lg"
//           >
//             Guardar
//           </button>
//           <button
//             type="button"
//             onClick={handleCancelar}
//             className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg text-lg"
//           >
//             Cancelar
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Page() {
  let [formData, setFormData] = useState({
    altura: "",
    peso: "",
    grasaCorporal: "",
    masaMuscular: "",
    fuerza: "",
    velocidadMaxima: "",
    resistenciaAerobica: "",
    resistenciaAnaerobica: "",
    flexibilidad: ""
  });

  let [mostrarLista, setMostrarLista] = useState(false);
  let [jugadorSeleccionado, setJugadorSeleccionado] = useState("");

  let jugadores = ["Juan Perez", "Maria Lopez", "Carlos Torres"];

  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("http://localhost:3001/estadisticas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jugador: jugadorSeleccionado, ...formData })
      });

      let data = await res.json();
      console.log("Datos guardados:", data);
      alert("Estadísticas enviadas correctamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al enviar los datos");
    }
  };

  let handleCancel = () => {
    setFormData({
      altura: "",
      peso: "",
      grasaCorporal: "",
      masaMuscular: "",
      fuerza: "",
      velocidadMaxima: "",
      resistenciaAerobica: "",
      resistenciaAnaerobica: "",
      flexibilidad: ""
    });
    setJugadorSeleccionado("");
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full p-6 sm:p-10 2xl:px-32 2xl:py-20 rounded-xl shadow-xl border border-gray-200"
      >
        {/* Título y botón a la izquierda */}
        <div className="mb-6 flex flex-col items-start gap-3 relative">
          <h1 className="text-3xl font-bold text-azul-principal">
            Ingreso de datos del jugador
          </h1>

          <button
            type="button"
            onClick={() => setMostrarLista(!mostrarLista)}
            className="azul-principal hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-2"
          >
            {jugadorSeleccionado || "Seleccionar jugador"}
            <ChevronDown size={18} />
          </button>

          {mostrarLista && (
            <div className="absolute top-24 z-10 bg-white border border-gray-300 rounded-lg shadow-md w-60">
              {jugadores.map((jugador, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setJugadorSeleccionado(jugador);
                    setMostrarLista(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {jugador}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Campos del formulario */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
                required
              />
            </div>
          ))}
        </div>

        {/* Botones de acción */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            type="submit"
            className="azul-principal hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg text-lg"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="azul-principal hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg text-lg"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
