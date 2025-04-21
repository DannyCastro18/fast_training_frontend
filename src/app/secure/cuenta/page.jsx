import Image from 'next/image';
import { Search, Moon, Bell, Folder, Users, Home, Settings, AlertCircle, LogOut } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      {/* Barra lateral */}
      <aside className="w-64 bg-blue-900 text-white p-5 flex flex-col">
        <div className="mb-6 flex items-center">
          <Image src="/Fast_largo.png" alt="Fast Training" width={180} height={100} />
        </div>
        <nav className="flex-1 space-y-4">
          <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700"><Home /> Inicio</a>
          <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700"><Users /> Equipos</a>
          <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700"><Settings /> Configuración</a>
          <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700"><Bell /> Notificaciones</a>
          <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700"><AlertCircle /> Incidentes</a>
          <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700"><Folder /> Archivos</a>
        </nav>
        <div className="mt-auto space-y-4">
          <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700"><Moon /> Modo oscuro</a>
          <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700"><AlertCircle /> Soporte</a>
          <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-700"><LogOut /> Cerrar sesión</a>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        {/* Logo y barra de búsqueda */}
        <div className="flex items-center gap-28 mb-6">
          <Image src="/Fast_largo.png" alt="Fast Training" width={180} height={100} />
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 text-black" />
            <input
              type="text"
              placeholder="Buscar"
              className="w-full pl-10 pr-4 py-2 placeholder:text-black border rounded-lg text-black focus:outline-none bg-blue-100"
            />
          </div>
        </div>
        {/* Lista de jugadores */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Equipo Real Madrid</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <Image src="/jugador1.png" alt="Juan Gonzales" width={100} height={100} className="mx-auto" />
              <p className="font-bold">Juan Gonzales</p>
              <p className="text-sm">Portero</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <Image src="/jugador1.png" alt="Juan Gonzales" width={100} height={100} className="mx-auto" />
              <p className="font-bold">Juan Gonzales</p>
              <p className="text-sm">Portero</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <Image src="/jugador2.png" alt="Manuel Carvajal" width={100} height={100} className="mx-auto" />
              <p className="font-bold">Manuel Carvajal</p>
              <p className="text-sm">Defensa</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <Image src="/jugador2.png" alt="Manuel Carvajal" width={100} height={100} className="mx-auto" />
              <p className="font-bold">Manuel Carvajal</p>
              <p className="text-sm">Defensa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}