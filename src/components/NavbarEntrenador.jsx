"use client";
import Link from "next/link";
import { FaHome, FaCalendarAlt, FaUserEdit } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { IoIosFolderOpen } from "react-icons/io";
import { BsGearWideConnected } from "react-icons/bs";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const NavbarEntrenador = () => {
  return (
    <nav className="bg-white w-20 h-screen m-4 max-h-[calc(100vh-2rem)] fixed top-0 left-0 border-2 border-blue-900 flex flex-col items-center shadow-[6px_0_18px_rgba(0,0,0,0.1)] dark:shadow-[8px_0_20px_rgba(0,0,0,0.5)] py-7 transition-all rounded-2xl overflow-y-auto">
      <div className="flex flex-col items-center space-y-9 mt-4 flex-1">
        <Link href="">
          <FaHome className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
        <Link href="">
          <RiTeamFill className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
        <Link href="">
          <IoIosFolderOpen className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
        <Link href="">
          <BsGearWideConnected className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
        <Link href="">
          <FaCalendarAlt className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
        <Link href="/secure/entrenador/ingresoDatos">
          <FaUserEdit className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
        <Link href="/secure/entrenador/ingresoDatos" className="mt-auto">
          <BsFillQuestionCircleFill className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
      </div>
    </nav>
  );
};

export default NavbarEntrenador;
