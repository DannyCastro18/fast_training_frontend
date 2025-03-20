"use client";

import { useState, useEffect } from 'react';

export default function RegistroDatos() {
  const [player, setPlayer] = useState('');
  const [formData, setFormData] = useState({
    Edad: '',
    Altura: '',
    Peso: '',
    Posición:'',
    FrecuenciaCardiaca: '', 
  });

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jugadores/ver'); 
        const data = await response.json();
        setPlayers(data); 
      } catch (error) {
        console.error('Error al obtener jugadores:', error);
      }
      };

    fetchPlayers();
  }, []);

  const handleSave = async () => {
    if (!player) {
      alert("Por favor selecciona un jugador.");
      return;
    }

    try {
      const response = await fetch(`/jugadores/${player}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          altura: formData.altura,
          peso: formData.peso,
          frecuencia_cardiaca: formData.frecuenciaCardiaca,
          velocidad: formData.velocidad,
          potencia: formData.potencia,
          fuerza: formData.fuerza,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Jugador actualizado con éxito');
        console.log('Respuesta del servidor:', result);
      } else {
        alert('Error al actualizar el jugador');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
      <div className="flex flex-col text-black ">
        <h2 className="text-4xl text-left mb-8">Ingreso de datos de jugador</h2>
        <select className="w-1/2 p-2 mb-4 border rounded text-2xl text-left" value={player} onChange={e => setPlayer(e.target.value)}>
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
          <button onClick={handleSave} className="bg-blue-600 text-white px-8 py-4 rounded text-2xl">Guardar</button>
        </div>
      </div>
  );
}


