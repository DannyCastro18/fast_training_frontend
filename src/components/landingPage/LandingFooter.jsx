import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6"; // Importamos los íconos

export default function PiePagina() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-10 flex items-center justify-around">
      <div className="flex justify-center items-center space-x-2">
        <img src="/icons/logo.jpg" alt="Fast Training Logo" className="h-14" />
        <h2 className="text-xl italic font-semibold leading-none">
          Fast<br></br> Training
        </h2>
      </div>
      {/* Navegación */}
      <ul className="text-center md:text-left space-y-1">
        <li>
          <a href="#inicio" className="hover:text-blue-400 transition">
            Inicio
          </a>
        </li>
        <li>
          <a href="#beneficios" className="hover:text-blue-400 transition">
            Beneficios
          </a>
        </li>
        <li>
          <a href="#caracteristicas" className="hover:text-blue-400 transition">
            Características
          </a>
        </li>
        <li>
          <a href="#descargar" className="hover:text-blue-400 transition">
            Descargar
          </a>
        </li>
        <li>
          <a href="#nosotros" className="hover:text-blue-400 transition">
            Nosotros
          </a>
        </li>
      </ul>

      <div className="text-center md:text-right space-y-2">
        <h3 className="text-lg font-semibold">Contáctanos</h3>
        <p className="text-sm">321 766 8488</p>
        <p className="text-sm">fast-training@empresa.com</p>
        <div className="flex justify-center md:justify-end space-x-4 pt-2">
          <a
            href="#"
            className="text-white text-2xl hover:text-blue-400 transition"
          >
            <FaYoutube />
          </a>
          <a
            href="#"
            className="text-white text-2xl hover:text-blue-400 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="text-white text-2xl hover:text-blue-400 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="#"
            className="text-white text-2xl hover:text-blue-400 transition"
          >
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
}
