

'use client';

import { useState } from 'react';
import axios from 'axios';
import { Download, User, Search } from 'lucide-react'; // Ícono de lupa
import Image from 'next/image';

export default function ComplaintForm() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para el valor de la búsqueda

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      await axios.post('/api/submit-complaint', { message });
      setMessage('');
      alert('Queja enviada con éxito');
    } catch (error) {
      console.error('Error al enviar la queja', error);
      alert('Hubo un error, intenta nuevamente');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar cambios en la barra de búsqueda
  const handleSearchChange = (e) => {  // Eliminamos los tipos TypeScript
    setSearchQuery(e.target.value);
    // Aquí podrías agregar la lógica para filtrar o buscar datos según el texto ingresado
    console.log('Buscando:', e.target.value);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center p-6">
      <div className="w-full h-[90vh] bg-white p-6 rounded-2xl shadow-2xl flex flex-col justify-between  mx-auto ">
        {/* Encabezado con logo y barra de búsqueda */}
        <div className="flex items-center justify-between mb-6 ">
          <div className="flex items-center space-x-4">
            <Image src="/Fast_largo.png" alt="Fast Training" width={200} height={120} />
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={handleSearchChange} // Agregamos la función para manejar la búsqueda
                className="w-full p-3 text-black rounded-lg   focus:outline-none  pl-10  bg-blue-100" // Añadimos padding izquierdo para el ícono
              />
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> {/* Ícono de lupa */}
            </div>
          </div>
        </div>

        <div className="border border-gray-300 p-6 rounded-lg">
          <div className="border-b pb-3 font-semibold text-azul-principal  text-lg">Se ha presentado una queja</div>
          <div className="flex items-center gap-4 py-4">
            <div className="w-14 h-14 azul-principal rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-lg text-black">Manuel Ortega</p>
              <p className="text-gray-700 text-md">ortega10@gmail.com</p>
            </div>
          </div>
          <p className="text-black text-lg">
            <strong>¡Buenas tardes!</strong><br />
            El motivo por el que escribo es debido a que he tenido un problema para ver mis...
          </p>
          <div className="relative mt-6 border bg-blue-100 p-4 rounded-lg">
            
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-lg">
                <Download size={32} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-black">Archivo12.pdf</p>
              </div>
            </div>
            <p className="text-blue-950 text-md text-right mt-2">02/06/2024</p>
          </div>
        </div>

        <textarea
          className="w-full  p-4 mt-6 rounded-lg bg-blue-100 text-black text-lg focus:outline-none  "
          placeholder="Escribe aquí..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-40 azul-principal hover:bg-blue-700 text-white font-semibold text-lg py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  );
} 


