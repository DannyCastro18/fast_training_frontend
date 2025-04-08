



// 'use client';

// import { useEffect, useState } from "react";
// import { AlertTriangle, Plus, Users, User } from "lucide-react";
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// export default function Equipos() {
//   const [equipos, setEquipos] = useState([]);
//   const [selectedEquipo, setSelectedEquipo] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/mostrarequipos")
//       .then((response) => {
//         setEquipos(response.data);
//       })
//       .catch((error) => {
//         console.error("Error al obtener equipos:", error);
//       });
//   }, []);

//   const handleCardClick = (equipo) => {
//     setSelectedEquipo(equipo);
//   };

//   const handleBack = () => {
//     setSelectedEquipo(null);
//   };

//   const Button = ({ children, className = '', ...props }) => (
//     <button className={`px-4 py-2 rounded font-semibold transition-all ${className}`} {...props}>
//       {children}
//     </button>
//   );

//   const Card = ({ children, className = '', ...props }) => (
//     <div className={`bg-white rounded-xl shadow border ${className}`} {...props}>
//       {children}
//     </div>
//   );

//   const CardContent = ({ children, className = '' }) => (
//     <div className={`p-4 ${className}`}>{children}</div>
//   );

//   const Alert = ({ children, className = '' }) => (
//     <div className={`flex items-start gap-3 p-4 border rounded-lg ${className}`}>
//       {children}
//     </div>
//   );

//   const AlertTitle = ({ children }) => (
//     <h3 className="font-bold text-lg">{children}</h3>
//   );

//   const AlertDescription = ({ children }) => (
//     <p className="text-sm text-gray-600">{children}</p>
//   );

//   return (
//     <div className="p-8 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-4xl font-bold text-gray-800">Equipos</h1>
//         <Button
//           className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-full shadow-lg"
//           onClick={() => router.push("/admin/creacionEquipo")}
//         >
//           <Plus className="inline-block mr-2 h-5 w-5" /> Crear Equipo
//         </Button>
//       </div>

//       {selectedEquipo ? (
//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-bold">{selectedEquipo.nombre}</h2>
//             <div className="space-x-2">
//               <Button className="bg-gray-200 text-gray-900" onClick={handleBack}>Volver</Button>
//               <Button className="bg-blue-600 text-white">Editar</Button>
//               <Button className="bg-red-500 text-white">Eliminar</Button>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-6 text-black">
//             <Card>
//               <CardContent className="space-y-2">
//                 <p><strong>Categoría:</strong> {selectedEquipo.categoria || "Sin categoría"}</p>
//                 <p><strong>Fecha de creación:</strong> {new Date(selectedEquipo.createdAt).toLocaleDateString()}</p>
//                 <p><strong>Entrenador:</strong> 
//                   {selectedEquipo.entrenadores?.[0]?.usuario?.nombre || "Sin entrenador asignado"}
//                 </p>
//                 <p><strong>Jugadores:</strong></p>
//                 {selectedEquipo.jugadores?.length > 0 ? (
//                   <ul className="list-disc list-inside">
//                     {selectedEquipo.jugadores.map((jugador, i) => (
//                       <li key={i}>
//                         {jugador.usuario?.nombre || "Sin nombre"} - {jugador.posicion} ({jugador.edad} años)
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-sm text-gray-500 italic">Sin jugadores asignados</p>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       ) : (
//         equipos.length === 0 ? (
//           <Alert className="bg-yellow-50 border-yellow-300 text-yellow-800">
//             <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
//             <div>
//               <AlertTitle>No hay equipos registrados aún.</AlertTitle>
//               <AlertDescription>Empieza creando un nuevo equipo.</AlertDescription>
//             </div>
//           </Alert>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {equipos.map((equipo) => (
//               <Card
//                 key={equipo.id}
//                 onClick={() => handleCardClick(equipo)}
//                 className="cursor-pointer hover:shadow-2xl transition duration-300 border-green-100"
//               >
//                 <CardContent className="space-y-2">
//                   <h3 className="text-xl font-bold text-gray-800">{equipo.nombre}</h3>
//                   <p className="text-sm text-gray-500">Categoría: {equipo.categoria || "No especificada"}</p>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Users className="w-4 h-4" /> {equipo.jugadores?.length || 0} jugadores
//                     <User className="w-4 h-4 ml-4" /> 
//                     {equipo.entrenadores?.[0]?.usuario?.nombre || "Sin entrenador"}
//                   </div>
//                   {(!equipo.jugadores?.length || !equipo.entrenadores?.length) && (
//                     <div className="flex items-center text-yellow-600 text-xs mt-2">
//                       <AlertTriangle className="w-4 h-4 mr-1" /> Equipo incompleto
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )
//       )}
//     </div>
//   );
// }







'use client';

import { useEffect, useState } from "react";
import { AlertTriangle, Plus, Users, User, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Equipos() {
  const [equipos, setEquipos] = useState([]);
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get("http://localhost:5000/api/mostrarequipos")
      .then((response) => {
        setEquipos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener equipos:", error);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (equipo) => setSelectedEquipo(equipo);
  const handleBack = () => setSelectedEquipo(null);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/equipos/${selectedEquipo.id}`)
      .then(() => {
        setEquipos(equipos.filter(e => e.id !== selectedEquipo.id));
        setSelectedEquipo(null);
        setShowDeleteConfirm(false);
      })
      .catch(err => console.error("Error eliminando equipo:", err));
  };

  const Button = ({ children, className = '', ...props }) => (
    <button className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 ${className}`} {...props}>
      {children}
    </button>
  );

  const Card = ({ children, className = '', ...props }) => (
    <div className={`bg-white rounded-3xl shadow-xl border border-gray-200 p-4 transform transition-all hover:scale-[1.02] hover:shadow-2xl ${className}`} {...props}>
      {children}
    </div>
  );

  const CardContent = ({ children, className = '' }) => (
    <div className={`space-y-3 ${className}`}>{children}</div>
  );

  const Alert = ({ children, className = '' }) => (
    <div className={`flex items-start gap-3 p-4 border rounded-2xl shadow-md ${className}`}>
      {children}
    </div>
  );

  const AlertTitle = ({ children }) => <h3 className="font-bold text-lg">{children}</h3>;
  const AlertDescription = ({ children }) => <p className="text-sm text-gray-600">{children}</p>;

  return (
    <div className="p-6 md:p-12 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-extrabold text-slate-800">Equipos</h1>
        <Button
          className="bg-black text-white hover:bg-slate-800"
          onClick={() => router.push("/admin/creacionEquipo")}
        >
          <Plus className="inline-block mr-2 h-5 w-5" /> Crear Equipo
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-slate-500 text-lg animate-pulse">Cargando equipos...</div>
      ) : selectedEquipo ? (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-3xl font-semibold text-slate-800">{selectedEquipo.nombre}</h2>
            <div className="flex gap-2">
              <Button className="bg-slate-200 text-slate-800 flex items-center gap-1" onClick={handleBack}>
                <ArrowLeft size={16} /> 
              </Button>
              <Button
  className="bg-blue-600 text-white flex items-center gap-1"
  onClick={() => router.push(`/admin/editarEquipo/${selectedEquipo.id}`)}
>
  <Pencil size={16} /> 
</Button>
              <Button className="bg-red-500 text-white flex items-center gap-1" onClick={() => setShowDeleteConfirm(true)}>
                <Trash2 size={16} /> 
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <Card className="rounded-3xl p-6 shadow-xl border border-gray-200 bg-white dark:bg-[#111827] dark:border-[#1f2937] transition-transform hover:scale-[1.01] hover:shadow-2xl">
    <CardContent className="space-y-4 text-gray-700 dark:text-gray-200">
      <div className="text-xl font-semibold tracking-tight text-[#205088] dark:text-blue-400">
        Información del equipo
      </div>
      <div className="text-base">
        <p className="mb-2">
          <strong className="text-gray-800 dark:text-white">Categoría:</strong>
          <span className="ml-2">{selectedEquipo.categoria || "Sin categoría"}</span>
        </p>
        <p className="mb-2">
          <strong className="text-gray-800 dark:text-white">Fecha de creación:</strong>
          <span className="ml-2">{new Date(selectedEquipo.createdAt).toLocaleDateString()}</span>
        </p>
        <p className="mb-4">
          <strong className="text-gray-800 dark:text-white">Entrenador:</strong>
          <span className="ml-2">{selectedEquipo.entrenadores?.[0]?.usuario?.nombre || "Sin entrenador asignado"}</span>
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
          <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">Jugadores:</p>
          {selectedEquipo.jugadores?.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {selectedEquipo.jugadores.map((jugador, i) => (
                <li key={i} className="text-sm">
                  {jugador.usuario?.nombre || "Sin nombre"} - {jugador.posicion} ({jugador.edad} años)
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">Sin jugadores asignados</p>
          )}
        </div>
      </div>
   
    </CardContent>
  </Card>
</div>

          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full">
                <h3 className="text-xl font-bold text-red-600 mb-2">¿Estás seguro?</h3>
                <p className="text-gray-700 mb-4">Esta acción eliminará el equipo <strong>{selectedEquipo.nombre}</strong>.</p>
                <div className="flex justify-end gap-3">
                  <Button className="bg-slate-200 text-gray-800" onClick={() => setShowDeleteConfirm(false)}>Cancelar</Button>
                  <Button className="bg-red-500 text-white" onClick={handleDelete}>Eliminar</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : equipos.length === 0 ? (
        <Alert className="bg-yellow-50 border-yellow-300 text-yellow-800">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
          <div>
            <AlertTitle>No hay equipos registrados aún.</AlertTitle>
            <AlertDescription>Empieza creando un nuevo equipo.</AlertDescription>
          </div>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {equipos.map((equipo) => (
            <Card
              key={equipo.id}
              onClick={() => handleCardClick(equipo)}
              className="cursor-pointer"
            >
              <CardContent>
                <h3 className="text-xl font-bold text-gray-800">{equipo.nombre}</h3>
                <p className="text-sm text-gray-500">Categoría: {equipo.categoria || "No especificada"}</p>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Users className="w-4 h-4" /> {equipo.jugadores?.length || 0} jugadores
                  <User className="w-4 h-4 ml-2" /> {equipo.entrenadores?.[0]?.usuario?.nombre || "Sin entrenador"}
                </div>
                {(!equipo.jugadores?.length || !equipo.entrenadores?.length) && (
                  <div className="flex items-center text-yellow-600 text-xs mt-2">
                    <AlertTriangle className="w-4 h-4 mr-1" /> Equipo incompleto
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
