// import Image from 'next/image';

// export default function PlayerProfile() {
//   return (
//     <div className="w-screen h-screen flex items-center justify-center bg-white p-8 overflow-hidden">
//       <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-300">
//         {/* Player Image Section */}
//         <div className="relative w-full md:w-1/3 flex items-center justify-center p-6 bg-gray-100">
//           <Image 
//             src="/mnt/data/image.png" 
//             alt="Player Image" 
//             width={400} 
//             height={500} 
//             className="rounded-xl object-cover shadow-lg border-4 border-gray-200"
//           />
//         </div>
        
//         {/* Player Details Section */}
//         <div className="w-full md:w-2/3 p-10 flex flex-col justify-center bg-white">
//           <h2 className="text-5xl font-extrabold text-gray-900 mb-2">Juan Gonzales</h2>
//           <p className="text-gray-500 text-xl mb-6">18 años | Delantero</p>
          
//           <div className="grid grid-cols-2 gap-6 text-gray-800 text-lg">
//             <div className="p-4 bg-blue-100 rounded-lg shadow">
//               <p className="font-semibold text-blue-700">Altura</p>
//               <p className="text-gray-900 text-2xl">1.78 cm</p>
//             </div>
//             <div className="p-4 bg-green-100 rounded-lg shadow">
//               <p className="font-semibold text-green-700">Peso</p>
//               <p className="text-gray-900 text-2xl">78 Kg</p>
//             </div>
//             <div className="p-4 bg-red-100 rounded-lg shadow">
//               <p className="font-semibold text-red-700">Grasa Corporal</p>
//               <p className="text-gray-900 text-2xl">23%</p>
//             </div>
//             <div className="p-4 bg-yellow-100 rounded-lg shadow">
//               <p className="font-semibold text-yellow-700">Masa Muscular</p>
//               <p className="text-gray-900 text-2xl">50%</p>
//             </div>
//             <div className="p-4 bg-purple-100 rounded-lg shadow">
//               <p className="font-semibold text-purple-700">Fuerza</p>
//               <p className="text-gray-900 text-2xl">45N</p>
//             </div>
//             <div className="p-4 bg-indigo-100 rounded-lg shadow">
//               <p className="font-semibold text-indigo-700">Velocidad Máxima</p>
//               <p className="text-gray-900 text-2xl">45 m/s</p>
// //             </div>
// //             <div className="p-4 bg-teal-100 rounded-lg shadow">
// //               <p className="font-semibold text-teal-700">Resistencia Aeróbica</p>
// //               <p className="text-gray-900 text-2xl">26 min</p>
// //             </div>
// //             <div className="p-4 bg-pink-100 rounded-lg shadow">
// //               <p className="font-semibold text-pink-700">Resistencia Anaeróbica</p>
// //               <p className="text-gray-900 text-2xl">23 min</p>
// //             </div>
// //             <div className="p-4 bg-gray-100 rounded-lg shadow">
// //               <p className="font-semibold text-gray-700">Flexibilidad</p>
// //               <p className="text-gray-900 text-2xl">40 cm</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // import Image from 'next/image';

// // export default function PlayerProfile() {
// //   return (
// //     <div className="w-screen h-screen flex items-center justify-center bg-white p-8 overflow-hidden">
// //       <div className="w-full max-w-screen-xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-300">
// //         {/* Player Image Section */}
// //         <div className="relative w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
// //           <Image 
// //             src="/public/image.png" 
// //             alt="Player Image" 
// //             width={500} 
// //             height={600} 
// //             className="rounded-xl object-cover shadow-lg border-4 border-gray-200"
// //           />
// //         </div>
        
// //         {/* Player Details Section */}
// //         <div className="w-full md:w-1/2 p-14 flex flex-col justify-center bg-white">
// //           <h2 className="text-6xl font-extrabold text-azul-principal mb-4">Juan Gonzales</h2>
// //           <p className="text-black text-2xl mb-8">18 años | Delantero</p>
          
// //           <div className="grid grid-cols-2 gap-8 text-gray-800 text-xl">
// //             <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
// //               <p className="font-semibold text-blue-700">Altura</p>
// //               <p className="text-gray-900 text-3xl">1.78 cm</p>
// //             </div>
// //             <div className="p-6 bg-green-100 rounded-lg shadow-lg">
// //               <p className="font-semibold text-green-700">Peso</p>
// //               <p className="text-gray-900 text-3xl">78 Kg</p>
// //             </div>
// //             <div className="p-6 bg-red-100 rounded-lg shadow-lg">
// //               <p className="font-semibold text-red-700">Grasa Corporal</p>
// //               <p className="text-gray-900 text-3xl">23%</p>
// //             </div>
// //             <div className="p-6 bg-yellow-100 rounded-lg shadow-lg">
// //               <p className="font-semibold text-yellow-700">Masa Muscular</p>
// //               <p className="text-gray-900 text-3xl">50%</p>
// //             </div>
// //             <div className="p-6 bg-purple-100 rounded-lg shadow-lg">
// //               <p className="font-semibold text-purple-700">Fuerza</p>
// //               <p className="text-gray-900 text-3xl">45N</p>
// //             </div>
// //             <div className="p-6 bg-indigo-100 rounded-lg shadow-lg">
// //               <p className="font-semibold text-indigo-700">Velocidad Máxima</p>
// //               <p className="text-gray-900 text-3xl">45 m/s</p>
// //             </div>
// //             <div className="p-6 bg-teal-100 rounded-lg shadow-lg">
// //               <p className="font-semibold text-teal-700">Resistencia Aeróbica</p>
// //               <p className="text-gray-900 text-3xl">26 min</p>
// //             </div>
// //             <div className="p-6 bg-pink-100 rounded-lg shadow-lg">
// //               <p className="font-semibold text-pink-700">Resistencia Anaeróbica</p>
// //               <p className="text-gray-900 text-3xl">23 min</p>
// //             </div>
// //             <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
// //               <p className="font-semibold text-gray-700">Flexibilidad</p>
// //               <p className="text-gray-900 text-3xl">40 cm</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// 'use client';
// import Image from 'next/image';

// export default function PlayerProfile() {
//   return (
//     <div className="w-full h-screen flex items-center justify-center bg-white p-4 overflow-hidden">
//       <div className="w-full max-w-screen-xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-300">
//         {/* Player Image Section */}
//         <div className="relative w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
//           <Image 
//             src="/image.png" 
//             alt="Player Image" 
//             width={500} 
//             height={600} 
//             className="rounded-xl object-cover shadow-lg border-4 border-gray-200 w-full h-auto"
//             priority
//           />
//         </div>
        
//         {/* Player Details Section */}
//         <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
//           <h2 className="text-4xl md:text-6xl font-extrabold text-azul-principal mb-4 text-center md:text-left">Juan Gonzales</h2>
//           <p className="text-black text-xl md:text-2xl mb-8 text-center md:text-left">18 años | Delantero</p>
          
//           <div className="grid grid-cols-2 gap-4 md:gap-8 text-gray-800 text-lg md:text-xl">
//             <div className="p-4 md:p-6 bg-blue-100 rounded-lg shadow-lg">
//               <p className="font-semibold text-blue-700">Altura</p>
//               <p className="text-gray-900 text-2xl md:text-3xl">1.78 cm</p>
//             </div>
//             <div className="p-4 md:p-6 bg-green-100 rounded-lg shadow-lg">
//               <p className="font-semibold text-green-700">Peso</p>
//               <p className="text-gray-900 text-2xl md:text-3xl">78 Kg</p>
//             </div>
//             <div className="p-4 md:p-6 bg-red-100 rounded-lg shadow-lg">
//               <p className="font-semibold text-red-700">Grasa Corporal</p>
//               <p className="text-gray-900 text-2xl md:text-3xl">23%</p>
//             </div>
//             <div className="p-4 md:p-6 bg-yellow-100 rounded-lg shadow-lg">
//               <p className="font-semibold text-yellow-700">Masa Muscular</p>
//               <p className="text-gray-900 text-2xl md:text-3xl">50%</p>
//             </div>
//             <div className="p-4 md:p-6 bg-purple-100 rounded-lg shadow-lg">
//               <p className="font-semibold text-purple-700">Fuerza</p>
//               <p className="text-gray-900 text-2xl md:text-3xl">45N</p>
//             </div>
//             <div className="p-4 md:p-6 bg-indigo-100 rounded-lg shadow-lg">
//               <p className="font-semibold text-indigo-700">Velocidad Máxima</p>
//               <p className="text-gray-900 text-2xl md:text-3xl">45 m/s</p>
//             </div>
//             <div className="p-4 md:p-6 bg-teal-100 rounded-lg shadow-lg">
//               <p className="font-semibold text-teal-700">Resistencia Aeróbica</p>
//               <p className="text-gray-900 text-2xl md:text-3xl">26 min</p>
//             </div>
//             <div className="p-4 md:p-6 bg-pink-100 rounded-lg shadow-lg">
//               <p className="font-semibold text-pink-700">Resistencia Anaeróbica</p>
//               <p className="text-gray-900 text-2xl md:text-3xl">23 min</p>
//             </div>
//             <div className="p-4 md:p-6 bg-gray-100 rounded-lg shadow-lg col-span-2">
//               <p className="font-semibold text-gray-700">Flexibilidad</p>
//               <p className="text-gray-900 text-2xl md:text-3xl">40 cm</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function PlayerProfile() {
  const [stats, setStats] = useState([
    { id: 1, label: 'Altura', value: '1.78 cm', color: 'blue-100' },
    { id: 2, label: 'Peso', value: '78 Kg', color: 'blue-100' },
    { id: 3, label: 'Grasa Corporal', value: '23%', color: 'blue-100' },
    { id: 4, label: 'Masa Muscular', value: '50%', color: 'blue-100' },
    { id: 5, label: 'Fuerza', value: '45N', color: 'blue-100' },
    { id: 6, label: 'Velocidad Máxima', value: '45 m/s', color: 'blue-100' },
    { id: 7, label: 'Resistencia Aeróbica', value: '26 min', color: 'blue-100' },
    { id: 8, label: 'Resistencia Anaeróbica', value: '23 min', color: 'blue-100' },
    { id: 9, label: 'Flexibilidad', value: '40 cm', color: 'blue-100' },
  ]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white p-4 overflow-hidden">
      <div className="w-full max-w-screen-xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-300">
        {/* Player Image Section */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
          <Image 
            src="/image.png" 
            alt="Player Image" 
            width={500} 
            height={600} 
            className="rounded-xl object-cover shadow-lg border-4 border-gray-200 w-full h-auto"
            priority
          />
        </div>
        
        {/* Player Details Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
          <h2 className="text-4xl md:text-6xl font-extrabold text-azul-principal mb-4 text-center md:text-left">Juan Gonzales</h2>
          <p className="text-black text-xl md:text-2xl mb-8 text-center md:text-left">18 años | Delantero</p>
          
          <div className="grid grid-cols-2 gap-4 md:gap-8 text-gray-800 text-lg md:text-xl">
            {stats.map(stat => (
              <div key={stat.id} className={`p-4 md:p-6 bg-${stat.color} rounded-lg shadow-lg`}>
                <p className={`font-semibold text-${stat.color.replace('-100', '-700')}`}>{stat.label}</p>
                <p className="text-gray-900 text-2xl md:text-3xl">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button 
              className="px-6 py-3 azul-principal text-white font-semibold text-lg rounded-lg shadow-md transition duration-300"
              onClick={() => {
                const label = prompt('Ingrese el nombre de la nueva estadística:');
                const value = prompt('Ingrese el valor de la nueva estadística:');
                if (label && value) {
                  setStats([...stats, { id: stats.length + 1, label, value, color: 'blue-600' }]);
                }
              }}
            >
              Ingresar Nuevos Datos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
