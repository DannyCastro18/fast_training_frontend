'use client'

import Link from "next/link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { FaUserEdit } from "react-icons/fa";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import ContentPasteSearchRoundedIcon from "@mui/icons-material/ContentPasteSearchRounded";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import { useNavbar } from "@/context/NavbarContext";

const NavbarJugador = () => {
  const { isExpanded, toggleNavbar } = useNavbar();
  return (
    <nav
      className={`bg-white w-16 h-screen fixed m-4 max-h-[calc(100vh-2rem)] flex flex-col items-center shadow-[6px_0_18px_rgba(0,0,0,0.1)] dark:shadow-[8px_0_20px_rgba(0,0,0,0.5)] transition-all rounded-2xl overflow-y-auto z-1 ${isExpanded ? "w-64" : "w-16"}`}
    >
      <div className="flex flex-col items-center space-y-9 mt-4">
        <Link href="/entrenador/inicio">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#205088"
              d="M6 19h3v-5q0-.425.288-.712T10 13h4q.425 0 .713.288T15 14v5h3v-9l-6-4.5L6 10zm-2 0v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-4q-.425 0-.712-.288T13 20v-5h-2v5q0 .425-.288.713T10 21H6q-.825 0-1.412-.587T4 19m8-6.75"
            />
          </svg>
        </Link>
        <Link href="/entrenador/creacion-plan">
          <TableChartOutlinedIcon className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
        <Link href="/entrenador/historial">
          <ContentPasteSearchRoundedIcon className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
        <Link href="/entrenador/equipo">
          <SportsSoccerOutlinedIcon className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
        <Link href="/jugador/quejas-reclamos" className="mt-auto">
          <ReportGmailerrorredRoundedIcon className="text-[#205088] dark:text-blue text-3xl transition-colors" />
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
