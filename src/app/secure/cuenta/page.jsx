import Image from "next/image";
import { Home, Users, Folder, Settings, Bell, Moon, HelpCircle, LogOut, FileText, Trash2, Search } from "lucide-react";

export default function Page() {
  return (
    <div className="flex h-screen bg-gray-100">
    {/* Barra lateral */}

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        {/* Logo y barra de búsqueda */}
        <div className="flex items-center gap-28  mb-6">
          <Image src="/Fast_largo.png" alt="Fast Training" width={180} height={100} />
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 text-black" />
            <input
              type="text"
              placeholder="Buscar"
              className=" w-full pl-10 pr-4 py-2 placeholder:text-black border rounded-lg text-black focus:outline-none  bg-blue-100"
            />
          </div>
        </div>

        {/* Botón de registrar usuario */}
        <button className="bg-azul-principal text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mb-4">
          Registrar Usuario
        </button>

         {/* Tabla de usuarios */}
         <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-full h- border border-gray-300">
          <table className="w-full text-left border-collapse text-lg">
            <thead>
              <tr className="bg-azul-principal text-white text-xl">
                <th className="p-6">Usuario</th>
                <th className="p-6">Rol</th>
                <th className="p-6 text-center">Archivo</th>
                <th className="p-6 text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {[
                { nombre: "Armando Sierra Sánchez", rol: "Entrenador", archivo: true },
                { nombre: "Camilo Salazar", rol: "Jugador", archivo: false },
                { nombre: "Alexander Ortega", rol: "Entrenador", archivo: true },
                { nombre: "Carlos Villamarín", rol: "Entrenador", archivo: true },
                { nombre: "Santiago Ortiz", rol: "Jugador", archivo: false },
                { nombre: "Mario García Marquéz", rol: "Jugador", archivo: false },
                { nombre: "Mario García", rol: "Entrenador", archivo: true },
              ].map((usuario, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-gray-200">
                  <td className="p-6 font-medium">{usuario.nombre}</td>
                  <td className="p-6 font-medium">{usuario.rol}</td>
                  <td className="p-6 text-center">
                    {usuario.archivo ? <FileText className="text-azul-principal text-3xl" /> : <span className="text-gray-400 text-2xl">🚫</span>}
                  </td>
                  <td className="p-6 text-center">
                    <Trash2 className="text-blue-800 text-3xl cursor-pointer hover:text-red-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Componente de icono de la barra lateral
const SidebarIcon = ({ icon }) => (
  <div className="text-blue-800 text-2xl hover:text-blue-600 cursor-pointer">{icon}</div>
);