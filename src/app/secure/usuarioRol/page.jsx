
// // 'use client';

// // import { useState } from 'react';
// // import Image from 'next/image';
// // import { Search, Trash2 } from 'lucide-react';

// // const incidentsData = [
// //   { name: 'Manuel Ortega', date: '01/06/2024', type: 'Queja', email: 'ortega10@gmail.com', status: 'Pendiente' },
// //   { name: 'Josué Pérez', date: '25/05/2024', type: 'Reclamo', email: 'josueperez@gmail.com', status: 'En proceso' },
// //   { name: 'Ricardo Peláez', date: '22/04/2024', type: 'Sugerencia', email: 'richard00@gmail.com', status: 'Pendiente' },
// //   { name: 'Juan González', date: '29/02/2024', type: 'Sugerencia', email: 'gonza2004@gmail.com', status: 'Resuelto' },
// //   { name: 'Erick Muñoz', date: '12/02/2024', type: 'Sugerencia', email: 'munozerick21@gmail.com', status: 'Resuelto' },
// //   { name: 'Antonio Salazar', date: '07/02/2024', type: 'Reclamo', email: 'antonislz@gmail.com', status: 'Pendiente' },
// //   { name: 'Camilo Guzman', date: '20/01/2024', type: 'Queja', email: 'crackmilo@gmail.com', status: 'En proceso' }
// // ];

// // export default function IncidentsPage() {
// //   const [search, setSearch] = useState('');
// //   const [incidents, setIncidents] = useState(incidentsData);

// //   const filteredIncidents = incidents.filter(incident =>
// //     incident.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   const deleteIncident = (index) => {
// //     setIncidents(incidents.filter((_, i) => i !== index));
// //   };

// //   const updateStatus = (index) => {
// //     const newIncidents = [...incidents];
// //     const statuses = ['Pendiente', 'En proceso', 'Resuelto'];
// //     const currentIndex = statuses.indexOf(newIncidents[index].status);
// //     newIncidents[index].status = statuses[(currentIndex + 1) % statuses.length];
// //     setIncidents(newIncidents);
// //   };

// //   return (
// //     <div className="h-screen w-screen  flex justify-center items-center p-4">
// //       <div className="w-full h-full bg-white p-12 rounded-lg shadow-xl overflow-x-auto">
// //         <div className="flex items-center justify-between mb-6 w-full">
// //           <Image src="/Fast_largo.png" alt="Fast Training" width={200} height={120} />
// //           <div className="relative w-1/3">
// //             <Search className="absolute left-3 top-3 text-gray-500" />
// //             <input
// //               type="text"
// //               placeholder="Buscar"
// //               className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-700 focus:outline-none bg-blue-100 text-lg"
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //             />
// //           </div>
// //         </div>

// //         <button className="mb-4 px-6 py-3 azul-principal text-white text-lg rounded-lg hover:bg-blue-700 transition w-75 max-w-md">
// //           Registrar Nuevo Incidente
// //         </button>

// //         <div className="overflow-x-auto w-full h-[75vh]">
// //           <table className="w-full border-collapse text-black text-lg h-full">
// //             <thead className="azul-principal text-white">
// //               <tr>
// //                 <th className="p-4 text-left">Nombre</th>
// //                 <th className="p-4 text-left">Fecha</th>
// //                 <th className="p-4 text-left">Descripción</th>
// //                 <th className="p-4 text-left">Correo</th>
// //                 <th className="p-4 text-left">Estado</th>
// //                 <th className="p-4 text-left">Eliminar</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredIncidents.map((incident, index) => (
// //                 <tr key={index} className="border-b border-gray-300 h-16">
// //                   <td className="p-4 text-black">{incident.name}</td>
// //                   <td className="p-4 text-black">{incident.date}</td>
// //                   <td className="p-4 text-black">{incident.type}</td>
// //                   <td className="p-4 text-black">{incident.email}</td>
// //                   <td
// //                     className="p-4 text-black cursor-pointer hover:text-blue-600"
// //                     onClick={() => updateStatus(index)}
// //                   >
// //                     {incident.status}
// //                   </td>
// //                   <td className="p-4">
// //                     <button className="text-red-500 hover:text-red-700" onClick={() => deleteIncident(index)}>
// //                       <Trash2 size={24} />
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import { Search, Trash2 } from 'lucide-react';

// const incidentsData = [
//   { name: 'Manuel Ortega', date: '01/06/2024', type: 'Queja', email: 'ortega10@gmail.com', status: 'Pendiente' },
//   { name: 'Josué Pérez', date: '25/05/2024', type: 'Reclamo', email: 'josueperez@gmail.com', status: 'En proceso' },
//   { name: 'Ricardo Peláez', date: '22/04/2024', type: 'Sugerencia', email: 'richard00@gmail.com', status: 'Pendiente' },
//   { name: 'Juan González', date: '29/02/2024', type: 'Sugerencia', email: 'gonza2004@gmail.com', status: 'Resuelto' },
//   { name: 'Erick Muñoz', date: '12/02/2024', type: 'Sugerencia', email: 'munozerick21@gmail.com', status: 'Resuelto' },
//   { name: 'Antonio Salazar', date: '07/02/2024', type: 'Reclamo', email: 'antonislz@gmail.com', status: 'Pendiente' },
//   { name: 'Camilo Guzman', date: '20/01/2024', type: 'Queja', email: 'crackmilo@gmail.com', status: 'En proceso' }
// ];

// export default function IncidentsPage() {
//   const [search, setSearch] = useState('');
//   const [incidents, setIncidents] = useState(incidentsData);

//   const filteredIncidents = incidents.filter(incident =>
//     incident.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const deleteIncident = (index) => {
//     setIncidents(incidents.filter((_, i) => i !== index));
//   };

//   const updateStatus = (index) => {
//     const newIncidents = [...incidents];
//     const statuses = ['Pendiente', 'En proceso', 'Resuelto'];
//     const currentIndex = statuses.indexOf(newIncidents[index].status);
//     newIncidents[index].status = statuses[(currentIndex + 1) % statuses.length];
//     setIncidents(newIncidents);
//   };

//   return (
//     <div className="h-screen w-screen flex justify-center items-center p-4">
//       <div className="w-full h-full bg-white p-12 rounded-lg shadow-xl overflow-x-auto">
//         <div className="flex items-center justify-between mb-6 w-full">
//           <Image src="/Fast_largo.png" alt="Fast Training" width={200} height={120} />
//           <div className="relative w-1/3">
//             <Search className="absolute left-3 top-3 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Buscar"
//               className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-700 focus:outline-none bg-blue-100 text-lg"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         <button className="mb-4 px-6 py-3 azul-principal text-white text-lg rounded-lg hover:bg-blue-700 transition w-75 max-w-md">
//           Registrar Nuevo Incidente
//         </button>

//         <div className="overflow-x-auto w-full h-[75vh]">
//           <table className="w-full border-collapse text-black text-lg h-full">
//             <thead className="azul-principal text-white">
//               <tr>
//                 <th className="p-4 text-left">Nombre</th>
//                 <th className="p-4 text-left">Fecha</th>
//                 <th className="p-4 text-left">Descripción</th>
//                 <th className="p-4 text-left">Correo</th>
//                 <th className="p-4 text-left">Estado</th>
//                 <th className="p-4 text-left">Eliminar</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredIncidents.map((incident, index) => (
//                 <tr key={index} className="border-b border-gray-300 h-16">
//                   <td className="p-4 text-black">{incident.name}</td>
//                   <td className="p-4 text-black">{incident.date}</td>
//                   <td className="p-4 text-black">{incident.type}</td>
//                   <td className="p-4 text-black">{incident.email}</td>
//                   <td
//                     className="p-4 text-black cursor-pointer hover:text-blue-600"
//                     onClick={() => updateStatus(index)}
//                   >
//                     {incident.status}
//                   </td>
//                   <td className="p-4">
//                     <button className="text-blue-900 hover:text-blue-700" onClick={() => deleteIncident(index)}>
//                       <Trash2 size={24} fill="#1E3A8A" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Trash2 } from 'lucide-react';

const incidentsData = [
  { name: 'Manuel Ortega', date: '01/06/2024', type: 'Queja', email: 'ortega10@gmail.com', status: 'Pendiente' },
  { name: 'Josué Pérez', date: '25/05/2024', type: 'Reclamo', email: 'josueperez@gmail.com', status: 'En proceso' },
  { name: 'Ricardo Peláez', date: '22/04/2024', type: 'Sugerencia', email: 'richard00@gmail.com', status: 'Pendiente' },
  { name: 'Juan González', date: '29/02/2024', type: 'Sugerencia', email: 'gonza2004@gmail.com', status: 'Resuelto' },
  { name: 'Erick Muñoz', date: '12/02/2024', type: 'Sugerencia', email: 'munozerick21@gmail.com', status: 'Resuelto' },
  { name: 'Antonio Salazar', date: '07/02/2024', type: 'Reclamo', email: 'antonislz@gmail.com', status: 'Pendiente' },
  { name: 'Camilo Guzman', date: '20/01/2024', type: 'Queja', email: 'crackmilo@gmail.com', status: 'En proceso' }
];

export default function IncidentsPage() {
  const [search, setSearch] = useState('');
  const [incidents, setIncidents] = useState(incidentsData);

  const filteredIncidents = incidents.filter(incident =>
    incident.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteIncident = (index) => {
    setIncidents(incidents.filter((_, i) => i !== index));
  };

  const updateStatus = (index) => {
    const newIncidents = [...incidents];
    const statuses = ['Pendiente', 'En proceso', 'Resuelto'];
    const currentIndex = statuses.indexOf(newIncidents[index].status);
    newIncidents[index].status = statuses[(currentIndex + 1) % statuses.length];
    setIncidents(newIncidents);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center p-4">
      <div className="w-full h-full bg-white p-12 rounded-lg shadow-xl overflow-x-auto">
        <div className="flex items-center space-x-4 mb-6 w-full">
          <Image src="/Fast_largo.png" alt="Fast Training" width={200} height={120} />
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar"
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-700 focus:outline-none bg-blue-100 text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <button className="mb-4 px-6 py-3 azul-principal text-white text-lg rounded-lg hover:bg-blue-700 transition w-75 max-w-md">
          Registrar Nuevo Incidente
        </button>

        <div className="overflow-x-auto w-full h-[75vh]">
          <table className="w-full border-collapse text-black text-lg h-full">
            <thead className="azul-principal text-white">
              <tr>
                <th className="p-4 text-left">Nombre</th>
                <th className="p-4 text-left">Fecha</th>
                <th className="p-4 text-left">Descripción</th>
                <th className="p-4 text-left">Correo</th>
                <th className="p-4 text-left">Estado</th>
                <th className="p-4 text-left">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map((incident, index) => (
                <tr key={index} className="border-b border-gray-300 h-16">
                  <td className="p-4 text-black">{incident.name}</td>
                  <td className="p-4 text-black">{incident.date}</td>
                  <td className="p-4 text-black">{incident.type}</td>
                  <td className="p-4 text-black">{incident.email}</td>
                  <td
                    className="p-4 text-black cursor-pointer hover:text-blue-600"
                    onClick={() => updateStatus(index)}
                  >
                    {incident.status}
                  </td>
                  <td className="p-4">
                    <button className="text-blue-900 hover:text-blue-700" onClick={() => deleteIncident(index)}>
                      <Trash2 size={24} fill="#1E3A8A" />
                    </button>
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
