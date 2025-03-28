import { useState } from "react";
import { Search, Trash2, FileText, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const users = [
  { name: "Armando Sierra Sánchez", role: "Entrenador", file: true },
  { name: "Camilo Salazar", role: "Jugador", file: false },
  { name: "Alexander Ortega", role: "Entrenador", file: true },
  { name: "Carlos Villamarín", role: "Entrenador", file: true },
  { name: "Santiago Ortiz", role: "Jugador", file: false },
  { name: "Mario García Marquéz", role: "Jugador", file: false },
  { name: "Mario García", role: "Entrenador", file: true },
];

export default function UserTable() {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4 space-x-3">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
            Registrar Usuario
          </Button>
        </div>
        <div className="overflow-hidden border rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Usuario</th>
                <th className="p-3">Rol</th>
                <th className="p-3">Archivo</th>
                <th className="p-3">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) =>
                  user.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((user, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="p-3 font-medium">{user.name}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">
                      {user.file ? (
                        <FileText className="text-blue-600" />
                      ) : (
                        <XCircle className="text-gray-400" />
                      )}
                    </td>
                    <td className="p-3">
                      <Trash2 className="text-red-600 cursor-pointer hover:text-red-800" />
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
