import React from "react";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6"; // Importamos los íconos

export default function PiePagina() {
  return (
    <div className="bg-azul-principal w-full h-[200px] text-white flex items-center justify-between px-10">
      {/* Espacio vacío a la izquierda para mantener el centro alineado */}
      <div className="w-1/3"></div>

      {/* Sección de Contacto - Centrada */}
      <div className="text-center w-1/3">
        <h2 className="text-xl font-semibold">Contáctanos</h2>
        <p>📞 3128934934</p>
        <p>📧 fast-training@empresa.com</p>
      </div>

      {/* Sección de Iconos - A la derecha */}
      <div className="w-1/3 flex flex-col items-end">
        <div className="flex gap-4 text-3xl">
          <FaInstagram className="cursor-pointer hover:text-gray-300" />
          <FaFacebook className="cursor-pointer hover:text-gray-300" />
          <FaXTwitter className="cursor-pointer hover:text-gray-300" />
        </div>
        <p className="mt-2 text-lg">@fasttraining</p>
      </div>
    </div>
  );
}
