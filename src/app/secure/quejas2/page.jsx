


"use client";

import { useState } from "react";
import axios from "axios";

export default function SugerenciasPage() {
  let [mensaje, setMensaje] = useState("");
  let [tipo, setTipo] = useState("");

  let handleTipoClick = (valor) => {
    setTipo(valor);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (!mensaje || !tipo) {
      alert("Por favor completa el mensaje y selecciona una categoría.");
      return;
    }

    try {
      let res = await axios.post("http://localhost:3001/mensajes", {
        tipo,
        mensaje
      });

      console.log("Respuesta del servidor:", res.data);
      alert("Mensaje enviado correctamente");
      setMensaje("");
      setTipo("");
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Hubo un error al enviar el mensaje");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl bg-gray-50 border border-gray-300 rounded-2xl shadow-lg p-10 md:p-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 text-azul-principal">
          ¿Tienes sugerencias, quejas o reclamos?
        </h2>

        <textarea
  value={mensaje}
  onChange={(e) => setMensaje(e.target.value)}
  placeholder="Escribe tu mensaje aquí con detalle..."
  className="w-full h-56 md:h-72 text-xl p-6 mb-10 bg-white text-black border border-blue-400 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-gray-600"
/>


        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-4">
            {["Sugerencias", "Quejas", "Reclamos"].map((op) => (
              <button
                type="button"
                key={op}
                onClick={() => handleTipoClick(op)}
                className={`px-6 py-3 text-xl rounded-full font-medium border ${
                  tipo === op
                    ? "azul-principal text-white border-gray-700"
                    : "text-azul-principal border-blue-700 hover:bg-gray-700 hover:text-white"
                } transition duration-200`}
              >
                {op}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 lg:mt-0 self-end px-10 py-4 text-xl font-bold azul-principal text-white rounded-xl hover:bg-blue-950 transition"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

