"use client";

import { useState } from 'react';

export default function RegistroDatos() {
  const [player, setPlayer] = useState('');
  const [formData, setFormData] = useState({
    altura: '',
    peso: '',
    frecuenciaCardiaca: '',
    velocidad: '',
    potencia: '',
    fuerza: ''
  });

  return (
    <div className="flex flex-col h-screen w-screen bg-white text-black relative text-3xl">
      <div className="flex flex-col items-start justify-start h-full w-full p-12 text-3xl">
        <h2 className="text-4xl text-left mb-8">Ingreso de datos de jugador</h2>
        <select className="w-1/2 p-4 mb-8 border rounded text-2xl text-left" value={player} onChange={e => setPlayer(e.target.value)}>
          <option>Seleccionar Jugador</option>
        </select>
        <div className="grid grid-cols-2 gap-8 w-3/4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-2xl font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</label>
              <input className="p-4 border rounded text-2xl" type="text" value={formData[key]} onChange={e => setFormData({...formData, [key]: e.target.value})} />
            </div>
          ))}
        </div>
        <div className="flex justify-start mt-8 w-3/4 space-x-8">
          <button className="bg-gray-300 text-gray-600 px-8 py-4 rounded cursor-not-allowed text-2xl">Cancelar</button>
          <button className="bg-blue-600 text-white px-8 py-4 rounded text-2xl">Guardar</button>
        </div>
      </div>
    </div>
  );
}


