// 'use client';
// import { useState } from 'react';
// import { Search, Calendar, Bell, Sun, UserCircle } from 'lucide-react';

// export default function TrainingSessions() {
//   const [position, setPosition] = useState('');
//   const [date, setDate] = useState('');
//   const files = [
//     { id: 1, name: 'Sesión de entrenamiento Arqueros 3 abril 2025', icon: '📄' },
//     { id: 2, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
//     { id: 3, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
//     { id: 4, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
//     { id: 5, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
//     { id: 6, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
//     { id: 7, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
//     { id: 8, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
//     { id: 9, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
//   ];

//   return (
//     <div className="min-h-screen w-full bg-white text-black p-6 flex flex-col">
//       <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
//         <div className="relative w-full max-w-lg">
//           <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
//           <input
//             type="text"
//             placeholder="Buscar"
//             className="pl-10 pr-4 py-2 bg-blue-50 rounded-md w-full focus:outline-none"
//           />
//         </div>
//         <div className="flex space-x-4">
//           <Sun className="text-gray-500 cursor-pointer" size={24} />
//           <Bell className="text-gray-500 cursor-pointer" size={24} />
//           <UserCircle className="text-gray-500 cursor-pointer" size={24} />
//         </div>
//       </div>

//       <div className="bg-gray-100 p-4 rounded-lg flex-grow w-full flex flex-col">
//         <div className="flex space-x-4 mb-4">
//           <select
//             className="bg-blue-100 text-black p-2 rounded-md"
//             value={position}
//             onChange={(e) => setPosition(e.target.value)}
//           >
//             <option value="">Seleccionar Posición</option>
//             <option value="Arqueros">Arqueros</option>
//             <option value="Defensas">Defensas</option>
//             <option value="Mediocampistas">Mediocampistas</option>
//             <option value="Delanteros">Delanteros</option>
//           </select>
//           <input
//             type="date"
//             className="bg-blue-100 text-black p-2 rounded-md"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>

//         <div className="grid grid-cols-3 gap-4 w-full h-full flex-grow overflow-y-auto scroll-smooth">
//           {files.map((file) => (
//             <div
//               key={file.id}
//               className="bg-gray-200 p-4 rounded-lg flex flex-col items-center text-center w-full h-full flex-grow"
//             >
//               <span className="text-4xl">{file.icon}</span>
//               <p className="mt-2 text-sm">{file.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useState } from 'react';
import { Search, Calendar, Bell, Sun, UserCircle } from 'lucide-react';

export default function TrainingSessions() {
  const [position, setPosition] = useState('');
  const [date, setDate] = useState('');
  const files = [
    { id: 1, name: 'Sesión de entrenamiento Arqueros 3 abril 2025', icon: '📄' },
    { id: 2, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
    { id: 3, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
    { id: 4, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
    { id: 5, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
    { id: 6, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
    { id: 7, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
    { id: 8, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
    { id: 9, name: 'Sesión de entrenamiento Delanteros 3 abril 2025', icon: '📄' },
  ];

  return (
    <div className="min-h-screen w-full bg-white text-gray-600 p-6 flex flex-col">
      <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Buscar"
            className="pl-10 pr-4 py-2 bg-blue-50 rounded-md w-full focus:outline-none"
          />
        </div>
        <div className="flex space-x-4">
          <Sun className="text-gray-500 cursor-pointer" size={24} />
          <Bell className="text-gray-500 cursor-pointer" size={24} />
          <UserCircle className="text-gray-500 cursor-pointer" size={24} />
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg flex-grow w-full flex flex-col">
        <div className="flex space-x-4 mb-4">
          <select
            className="bg-blue-100 text-black p-2 rounded-md border-none focus:outline-none"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="">Seleccionar Posición</option>
            <option value="Arqueros">Arqueros</option>
            <option value="Defensas">Defensas</option>
            <option value="Mediocampistas">Mediocampistas</option>
            <option value="Delanteros">Delanteros</option>
          </select>
          <input
            type="date"
            className="bg-blue-100 text-black p-2 rounded-md border-none focus:outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 w-full h-full flex-grow overflow-y-auto scroll-smooth">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-gray-200 p-6 rounded-lg flex flex-col items-center text-center w-full h-full flex-grow"
            >
              <span className="text-6xl">{file.icon}</span>
              <p className="mt-4 text-lg font-semibold">{file.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
