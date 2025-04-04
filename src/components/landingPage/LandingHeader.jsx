'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingHeader({ onLoginClick }) {
    return (
        <nav className="bg-[#205088] p-4 flex items-center justify-between">
            <div className="flex items-center">
                <Image 
                src="/icons/logo.jpg" 
                alt="Fast Training Logo" 
                width={40} 
                height={40}
                className="mr-2"
                />
                <span className="text-white text-xl font-bold">FAST TRAINING</span>
            </div>
            <div className="flex space-x-6 text-white">
                <a href="#inicio" className="hover:underline">Inicio</a>
                <a href="#acerca" className="hover:underline">Acerca de</a>
            </div>
            <div className="flex space-x-4">
                <button 
                onClick={onLoginClick}
                className="bg-white text-blue-700 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                >
                Ingresar
                </button>
            </div>
        </nav>
    );
}