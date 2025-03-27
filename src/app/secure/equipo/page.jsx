// 'use client';

// import Image from 'next/image';
// import { useState } from 'react';
// import { Search, Home, Users, Settings, Moon } from 'lucide-react';

// const jugadores = [
//   { id: 1, nombre: 'Juan Gonzales', posicion: 'Portero', numero: 1, imagen: '/juan1.png' },
//   { id: 2, nombre: 'Juan Gonzales', posicion: 'Portero', numero: 13, imagen: '/juan2.png' },
//   { id: 3, nombre: 'Manuel Carvajal', posicion: 'Defensa', numero: 2, imagen: '/manuel1.png' },
//   { id: 4, nombre: 'Manuel Lopez', posicion: 'Defensa', numero: 3, imagen: '/manuel2.png' },
//   { id: 5, nombre: 'Manuel Lopez', posicion: 'Defensa', numero: 4, imagen: '/manuel3.png' },
// ];

// export default function EquipoPage() {
//   const [search, setSearch] = useState('');

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-20 bg-white shadow-lg flex flex-col items-center py-5 space-y-6">
//         <Home className="w-6 h-6 text-gray-600 cursor-pointer" />
//         <Users className="w-6 h-6 text-gray-600 cursor-pointer" />
//         <Settings className="w-6 h-6 text-gray-600 cursor-pointer" />
//         <Moon className="w-6 h-6 text-gray-600 cursor-pointer" />
//       </div>

//       {/* Contenedor principal */}
//       <div className="flex-1 p-6">
//         {/* Logo y barra de búsqueda */}
//         <div className="flex items-center justify-between mb-4">
//           <Image src="/Fast_largo.png" alt="Fast Training" width={150} height={50} />
//           <div className="flex items-center bg-white rounded-lg shadow p-3 w-1/3">
//             <Search className="w-5 h-5 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Buscar"
//               className="ml-2 w-full outline-none"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Sección del equipo */}
//         <div className="flex space-x-4">
//           <div className="bg-blue-800 text-white p-4 rounded-lg w-1/4 shadow-md">
//             <Image src="/guangzhou_logo.png" alt="Guangzhou" width={50} height={50} />
//             <h2 className="text-xl font-bold">Equipo: Guangzhou</h2>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow-md flex-1">
//             <h3 className="text-lg font-bold mb-2">Formación</h3>
//             <Image src="/formacion.png" alt="Formación" width={250} height={150} />
//           </div>
//         </div>

//         {/* Lista de jugadores */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
//           {jugadores
//             .filter((j) => j.nombre.toLowerCase().includes(search.toLowerCase()))
//             .map((jugador) => (
//               <div key={jugador.id} className="bg-white p-4 rounded-lg shadow-md text-center">
//                 <Image
//                   src={jugador.imagen}
//                   alt={jugador.nombre}
//                   width={120}
//                   height={120}
//                   className="mx-auto rounded-full"
//                 />
//                 <h3 className="font-semibold mt-2">{jugador.nombre}</h3>
//                 <p className="text-gray-500">{jugador.posicion}</p>
//                 <span className="text-blue-800 font-bold">#{jugador.numero}</span>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useState } from "react";
import { Search } from "lucide-react";

export default function TeamPage() {
  const [search, setSearch] = useState("");

  const players = [
    { id: 1, name: "Juan Gonzales", number: 1, position: "Portero", img: "/player1.png" },
    { id: 2, name: "Juan Gonzales", number: 13, position: "Portero", img: "/player1.png" },
    { id: 3, name: "Manuel Carvajal", number: 2, position: "Defensa", img: "/player2.png" },
    { id: 4, name: "Manuel Lopez", number: 3, position: "Defensa", img: "/player3.png" },
    { id: 5, name: "Manuel Lopez", number: 4, position: "Defensa", img: "/player3.png" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center p-4  ">
        <Image src="/Fast_largo.png" alt="Fast Training" width={150} height={50} />
        <div className="flex-1 flex justify-center">
          <div className="flex items-center bg-white rounded-lg shadow p-3 w-1/3">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar"
              className="ml-2 w-full outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="mt-6 flex gap-4">
        <main className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-3 gap-4">
            {players.map((player) => (
              <div
                key={player.id}
                className="bg-gray-100 p-4 rounded-lg text-center shadow-md"
              >
                <Image
                  src={player.img}
                  alt={player.name}
                  width={100}
                  height={100}
                  className="mx-auto rounded-full"
                />
                <p className="mt-2 font-semibold text-lg">{player.number} {player.name}</p>
                <p className="text-gray-600">{player.position}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
