import React from "react";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6"; // Importamos los íconos

export default function PiePagina() {
    return (
        <footer className="bg-gray-900 text-white py-6 px-10 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
            <img src="/icons/logo.jpg" alt="Fast Training Logo" className="h-14" />
            <h2 className="text-lg font-semibold">Fast Training</h2>
        </div>
        <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold">Contáctanos</h3>
            <p className="text-sm">📞 3128934934</p>
            <p className="text-sm">📧 fast-training@empresa.com</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-white text-2xl hover:text-gray-400">
            <FaXTwitter className="cursor-pointer hover:text-gray-300" />
            </a>
            <a href="#" className="text-white text-2xl hover:text-gray-400">
            <FaFacebook />
            </a>
            <a href="#" className="text-white text-2xl hover:text-gray-400">
            <FaInstagram />
            </a>
        </div>
        </footer>
    );
}