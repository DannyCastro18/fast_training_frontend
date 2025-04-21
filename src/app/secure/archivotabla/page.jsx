// import Image from "next/image";
// import { Search, Trash, FileText, Slash } from "lucide-react";

// export default function Dashboard() {
//   const users = [
//     { name: "Armando Sierra Sánchez", role: "Entrenador", hasFile: true },
//     { name: "Camilo Salazar", role: "Jugador", hasFile: false },
//     { name: "Alexander Ortega", role: "Entrenador", hasFile: true },
//     { name: "Carlos Villamarín", role: "Entrenador", hasFile: true },
//     { name: "Santiago Ortiz", role: "Jugador", hasFile: false },
//     { name: "Mario García Marquéz", role: "Jugador", hasFile: true },
//     { name: "Mario García", role: "Entrenador", hasFile: false },
//   ];

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
//       <div className="w-full max-w-7xl bg-white p-10 rounded-lg shadow-xl">
//         {/* Logo y barra de búsqueda */}
//         <div className="flex items-center justify-between mb-6">
//           <Image src="/Fast_largo.png" alt="Fast Training" width={200} height={120} />
//           <div className="relative w-1/2">
//             <Search className="absolute left-3 top-3 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Buscar"
//               className="w-full pl-10 pr-4 py-3  rounded-lg text-gray-700 focus:outline-none bg-blue-100 text-lg"
//             />
//           </div>
//         </div>
        
//         {/* Botón Registrar Usuario */}
//         <button className="azul-principal text-white px-6 py-3 rounded-lg mb-6 text-lg hover:bg-blue-700">
//           Registrar Usuario
//         </button>
        
//         {/* Tabla de Usuarios */}
//         <div className="azul-principal text-white rounded-lg overflow-hidden text-xl">
//           <div className="grid grid-cols-4 p-4 font-semibold border-b border-white">
//             <div>Usuario</div>
//             <div>Rol</div>
//             <div className="text-center">Archivo</div>
//             <div className="text-center">Eliminar</div>
//           </div>
//           {users.map((user, index) => (
//             <div key={index} className="grid grid-cols-4 p-4 border-b last:border-none border-gray-300 text-gray-900 items-center bg-white hover:bg-gray-100 text-lg">
//               <div>{user.name}</div>
//               <div>{user.role}</div>
//               <div className="flex justify-center">
//                 {user.hasFile ? <FileText className="text-blue-600 w-6 h-6" /> : <Slash className="text-gray-400 w-6 h-6" />}
//               </div>
//               <div className="flex justify-center">
//                 <Trash className="text-red-600 w-6 h-6 cursor-pointer hover:text-red-800" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import { useState } from "react";
import { Search, Trash, FileText, Slash } from "lucide-react";

export default function Dashboard() {
  const [users, setUsers] = useState([
    { name: "Armando Sierra Sánchez", role: "Entrenador", hasFile: true },
    { name: "Camilo Salazar", role: "Jugador", hasFile: false },
    { name: "Alexander Ortega", role: "Entrenador", hasFile: true },
    { name: "Carlos Villamarín", role: "Entrenador", hasFile: true },
    { name: "Santiago Ortiz", role: "Jugador", hasFile: false },
    { name: "Mario García Marquéz", role: "Jugador", hasFile: true },
    { name: "Mario García", role: "Entrenador", hasFile: false },
  ]);

  const deleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-screen-2xl bg-white p-10 rounded-lg shadow-xl">
        {/* Logo y barra de búsqueda */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <Image src="/Fast_largo.png" alt="Fast Training" width={250} height={150} />
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar"
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-700 focus:outline-none bg-blue-100 text-lg"
            />
          </div>
        </div>

        {/* Botón Registrar Usuario */}
        <button className="w-full md:w-auto azul-principal text-white px-6 py-3 rounded-lg mb-6 text-lg hover:bg-blue-700">
          Registrar Usuario
        </button>

        {/* Tabla de Usuarios */}
        <div className="azul-principal text-white rounded-lg overflow-hidden text-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 p-4 font-semibold border-b border-white text-center">
            <div>Usuario</div>
            <div>Rol</div>
            <div>Archivo</div>
            <div>Eliminar</div>
          </div>
          {users.map((user, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 p-4 border-b last:border-none border-gray-300 text-gray-900 items-center bg-white hover:bg-gray-100 text-lg text-center">
              <div>{user.name}</div>
              <div>{user.role}</div>
              <div className="flex justify-center">
                {user.hasFile ? <FileText className="text-blue-600 w-6 h-6" /> : <Slash className="text-gray-400 w-6 h-6" />}
              </div>
              <div className="flex justify-center">
                <Trash
                  className="text-red-600 w-6 h-6 cursor-pointer hover:text-red-800"
                  onClick={() => deleteUser(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

