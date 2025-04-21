"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import api from "@/lib/api"
import Image from "next/image";
import { Search } from "lucide-react";

export default function EquipoPage() {
  const [search, setSearch] = useState("");
  const [equipo, setEquipo] = useState(null);
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchEquipoData = async () => {
      try {
        const response = await api.get("/equipos/1");

        setEquipo(response.data);

        if (response.data.jugadores) {
          console.log("Jugadores en equipo:", response.data.jugadores); // 👈 Verifica aquí
          setJugadores(response.data.jugadores);
        } else {
          const jugadoresResponse = await axios.get(
            "http://localhost:5000/api/jugadores?equipoId=2",
          );
          console.log("Jugadores obtenidos de API:", jugadoresResponse.data); // 👈 Verifica aquí
          setJugadores(jugadoresResponse.data);
        }
      } catch (error) {
        console.error("Error obteniendo datos:", error);
      }
    };

    fetchEquipoData();
  }, []);

  return (
    <div className="mt-6 flex gap-4">
      {/* Contenedor azul con información del equipo */}
      <aside className="bg-blue-600 text-white p-6 rounded-lg shadow-lg w-1/3 flex flex-col items-center">
        {/* Icono del equipo */}
        {equipo?.icono ? (
          <Image
            src={equipo.icono}
            alt={`Logo de ${equipo.nombre}`}
            width={100}
            height={100}
            className="rounded-full mb-4"
          />
        ) : (
          <Image
            src="/default-team.png"
            alt="Equipo sin logo"
            width={100}
            height={100}
            className="rounded-full mb-4"
          />
        )}

        <h2 className="text-2xl font-semibold">
          {equipo ? equipo.nombre : "Cargando..."}
        </h2>
        <p className="text-lg">{equipo ? equipo.descripcion : "..."}</p>

        {/* Imagen de la formación debajo */}
        <div className="mt-4">
          {equipo?.formacion ? (
            <Image
              src={equipo.formacion}
              alt={`Formación de ${equipo.nombre}`}
              width={250}
              height={150}
              className="rounded-lg"
            />
          ) : (
            <p className="text-sm text-gray-300">No hay formación disponible</p>
          )}
        </div>
      </aside>

      {/* Lista de jugadores */}
      <main className="flex-1 bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-3 gap-4">
          {jugadores.length > 0 ? (
            jugadores.map((player, index) => (
              <div
                key={player.id}
                className="bg-gray-100 p-4 rounded-lg text-center shadow-md"
              >
                <Image
                  src="/jugador.png" // Imagen fija para todos
                  alt={`${player.nombre} ${player.apellido}`}
                  width={100}
                  height={100}
                  className="mx-auto rounded-full"
                />
                <p className="mt-2 text-gray-600 font-semibold text-lg">
                  {index + 1} {player.usuarios?.persona?.nombre}{" "}
                  {player.usuarios?.persona?.apellido}
                </p>

                <p className="text-gray-600">{player.posicion}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">
              No hay jugadores disponibles
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
