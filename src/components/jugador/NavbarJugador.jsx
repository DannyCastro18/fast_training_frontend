'use client'

import Link from "next/link";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import { useNavbar } from "@/context/NavbarContext";

const NavbarJugador = () => {
  const { isExpanded, toggleNavbar } = useNavbar();
  return (
    <nav
      className={`bg-white w-16 h-screen fixed m-4 max-h-[calc(100vh-2rem)] flex flex-col items-center shadow-[6px_0_18px_rgba(0,0,0,0.1)] dark:shadow-[8px_0_20px_rgba(0,0,0,0.5)] transition-all rounded-2xl overflow-y-auto z-1 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      <div className="flex flex-col items-center space-y-9 mt-4">
        <img
          src="/fast-training-icon.png"
          alt="Fast Training Icon"
          width={24}
          height={24}
          className="object-contain"
        />
        <Link href="/jugador/inicio">
          <DashboardOutlinedIcon className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
        <Link href="/jugador/equipo">
          <SportsSoccerOutlinedIcon className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
        <Link href="/jugador/historial">
          <PlagiarismOutlinedIcon className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
        <button
          onClick={toggleNavbar}
          className="transition-transform hover:scale-110 focus:outline-none"
          aria-label={isExpanded ? "Colapsar menú" : "Expandir menú"}
        >
          {isExpanded ? (
            <KeyboardDoubleArrowLeftRoundedIcon className="text-[#205088]" />
          ) : (
            <KeyboardDoubleArrowRightRoundedIcon className="text-[#205088]" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default NavbarJugador;