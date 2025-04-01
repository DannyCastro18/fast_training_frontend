"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";

export default function ComplaintPage() {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full h-full bg-white p-12 rounded-lg shadow-xl overflow-x-auto">
        <div className="flex items-center justify-between mb-6 w-full">
          <Image src="/Fast_largo.png" alt="Fast Training" width={200} height={120} />
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar"
              className="w-full pl-10 pr-4 py-3 rounded-lg text-black focus:outline-none bg-blue-100 text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg mb-4">
          <p className="text-black font-semibold">Se ha presentado una queja</p>
        </div>

        <div className="bg-gray-200 p-4 rounded-lg mb-4">
          <div className="flex items-center mb-2">
            <Image src="/profile.png" alt="User" width={40} height={40} className="rounded-full" />
            <div className="ml-2">
              <p className="text-black font-semibold">Manuel Ortega</p>
              <p className="text-sm text-gray-600">ortega@gmail.com</p>
            </div>
          </div>
          <p className="text-black mb-2">
            ¡Buenas tardes! El motivo por el que escribo es debido a que he tenido un problema para ver mis...
          </p>
          <div className="bg-white p-2 rounded-lg flex items-center">
            <Image src="/pdf-icon.png" alt="Archivo" width={50} height={50} />
            <p className="text-black ml-2">Archivo12.pdf</p>
          </div>
          <p className="text-right text-gray-600 text-sm">02/06/2024</p>
        </div>

        <textarea
          placeholder="Escribe aquí..."
          className="w-full p-4 rounded-lg bg-gray-200 text-black focus:outline-none mb-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Enviar</button>
        </div>
      </div>
    </div>
  );
}