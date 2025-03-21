"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Image from "next/image";

export default function Dashboard() {
  const [players, setPlayers] = useState({
    forwards: [],
    midfielders: [],
    defenders: [],
    goalkeeper: null,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    axios.get("https://api.example.com/players") // Reemplazar con API real
      .then((response) => setPlayers(response.data))
      .catch((error) => console.error("Error fetching players:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 font-sans">
      <header className="flex justify-between items-center pb-4 border-b border-gray-300">
        <div className="flex items-center gap-6">
          <Image src="/Fast_largo.png" alt="Fast Training" width={150} height={80} />
        </div>
        <div className="flex items-center gap-6">
          <i className="fa-solid fa-moon text-5xl text-azul-principal cursor-pointer"></i>
          <i className="fa-solid fa-bell text-5xl text-azul-principal cursor-pointer"></i>
          <i className="fa-solid fa-user-circle text-5xl text-azul-principal  cursor-pointer"></i>
        </div>
      </header>
      <main className="mt-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Calendario</h2>
            <DayPicker 
              mode="single" 
              selected={selectedDate} 
              onSelect={setSelectedDate} 
              className="bg-white text-gray-900 rounded-lg p-3 border border-gray-300"
            />
            <p className="mt-3 text-gray-600 text-lg">Fecha seleccionada: {selectedDate ? format(selectedDate, "PPP") : "Seleccione una fecha"}</p>
          </div>
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
            <PlayerCard title="Delanteros Destacados" players={players.forwards} />
            <PlayerCard title="Mediocampistas Destacados" players={players.midfielders} />
            <PlayerCard title="Defensores Destacados" players={players.defenders} />
            <PlayerCard title="Arquero Destacado" players={players.goalkeeper ? [players.goalkeeper] : []} />
          </div>
        </section>
      </main>
    </div>
  );
}

function PlayerCard({ title, players }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 hover:shadow-xl transition-all">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">{title}</h2>
      <div className="flex gap-4 overflow-x-auto p-3">
        {players.length > 0 ? (
          players.map((player, index) => (
            <div key={index} className="w-16 h-16 bg-blue-500 rounded-full border-4 border-blue-700 shadow-md"></div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No hay datos disponibles</p>
        )}
      </div>
    </div>
  );
}
