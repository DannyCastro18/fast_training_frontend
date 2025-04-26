"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function LandingHeader({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-gradient-to-b from-slate-950 to-slate-950/0 p-4 flex items-center justify-around fixed top-0 left-0 right-0 w-full z-20 ${scrolled ? "shadow-md backdrop-blur-sm" : "bg-transparent "}`}
    >
      <div className="flex items-center">
        <Image
          src="/icons/logo.jpg"
          alt="Fast Training Logo"
          width={40}
          height={40}
          className="mr-2"
        />
        <span className="leading-none text-white font-black text-xl italic">
          FAST
          <br /> TRAINING
        </span>
      </div>
      <ul className="flex text-white">
        <li>
          <a
            href="#inicio"
            className="px-4 py-2 hover:scale-110 rounded-xl hover:bg-gradient-to-t from-cyan-500/30 to-cyan-500/0 hover:border-b-1"
          >
            Inicio
          </a>
        </li>
        <li>
          <a
            href="#beneficios"
            className="px-4 py-2 hover:scale-110 rounded-xl hover:bg-gradient-to-t from-cyan-500/30 to-cyan-500/0 hover:border-b-1"
          >
            Beneficios
          </a>
        </li>
        <li>
          <a
            href="#caracteristicas"
            className="px-4 py-2 hover:scale-110 rounded-xl hover:bg-gradient-to-t from-cyan-500/30 to-cyan-500/0 hover:border-b-1"
          >
            Caracteristicas
          </a>
        </li>
        <li>
          <a
            href="#descargar"
            className="px-4 py-2 hover:scale-110 rounded-xl hover:bg-gradient-to-t from-cyan-500/30 to-cyan-500/0 hover:border-b-1"
          >
            Descargar
          </a>
        </li>
        <li>
          <a
            href="#nosotros"
            className="px-4 py-2 hover:scale-110 rounded-xl hover:bg-gradient-to-t from-cyan-500/30 to-cyan-500/0 hover:border-b-1"
          >
            Nosotros
          </a>
        </li>
      </ul>
      <div className="flex space-x-4">
        <button
          onClick={onLoginClick}
          className="hover:scale-110 bg-black/0 font-bold border-2 hover:bg-cyan-500/50  hover:border-cyan-500/50 text-white px-4 py-2 rounded-4xl text-lg transition-colors"
        >
          Ingresa
        </button>
      </div>
    </nav>
  );
}
