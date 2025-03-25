import LandingPage from "@/app/page";
import Image from "next/image";
import { FaMoon, FaBell } from "react-icons/fa";
import Link from "next/link";

const LandingHeader = () => {
  return (
    <nav className="bg-[#205088] p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/icons/logo.jpg" alt="Fast Training Logo" className="h-10 mr-2" />
        <span className="text-white text-xl font-bold">FAST TRAINING</span>
      </div>
      <div className="flex space-x-6 text-white">
        <a href="#inicio" className="hover:underline">
          Inicio
        </a>
        <a href="#acerca" className="hover:underline">
          Acerca de
        </a>
      </div>
      <div className="flex space-x-4">
        <Link href="/auth/login">
          <button className="bg-white text-blue-700 px-4 py-2 rounded-md">
            Ingresar
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingHeader;
