"use client";

import Link from "next/link";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import PlagiarismOutlinedIcon from "@mui/icons-material/PlagiarismOutlined";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import { useNavbar } from "@/context/NavbarContext";

const NavbarJugador = () => {
  const { isExpanded, toggleNavbar } = useNavbar();

  return (
    <nav
      className={`w-16 h-full flex flex-col items-center  transition-all overflow-y-auto z-[60] ${
        isExpanded ? "w-60" : "w-16"
      }`}
    >
      <div className="flex flex-col items-center w-full h-full justify-between py-4">
        <div className="flex flex-col items-center space-y-4 w-full">
          {" "}
          {/* Cambiado de space-y-9 a space-y-4 */}
          {/* Logo - Contenedor modificado */}
          <div
            className={`flex justify-center items-center ${isExpanded ? "w-full px-4" : "w-16"}`}
          >
            {isExpanded ? (
              <img
                src="/fast_largo.png"
                alt="Fast Training Logo"
                className="w-auto h-10 object-contain"
              />
            ) : (
              <img
                src="/fast_corto.png"
                alt="Fast Training Icon"
                className="w-auto h-10 object-contain"
              />
            )}
          </div>
          {/* Inicio*/}
          <Link
            href="/jugador/inicio"
            className="flex items-center w-full m-4 px-4 group transition-all duration-200 hover:bg-[#a8c4d9] hover:bg-opacity-50 hover:rounded-lg py-2"
          >
            <DashboardOutlinedIcon className="text-[#205088] dark:text-blue text-3xl min-w-[24px] group-hover:scale-110 transition-transform" />
            {isExpanded && (
              <span className="ml-4 text-[#205088] dark:text-blue whitespace-nowrap group-hover:font-medium">
                Inicio
              </span>
            )}
          </Link>
          {/* Equipo con efecto hover */}
          <Link
            href="/jugador/equipo"
            className="flex items-center w-full px-4 group transition-all duration-200 hover:bg-[#a8c4d9] hover:bg-opacity-50 hover:rounded-lg py-2"
          >
            <SportsSoccerOutlinedIcon className="text-[#205088] dark:text-blue text-3xl min-w-[24px] group-hover:scale-110 transition-transform" />
            {isExpanded && (
              <span className="ml-4 text-[#205088] dark:text-blue whitespace-nowrap group-hover:font-medium">
                Mi Equipo
              </span>
            )}
          </Link>
          {/* Historial con efecto hover */}
          <Link
            href="/jugador/historial"
            className="flex items-center w-full px-4 group transition-all duration-200 hover:bg-[#a8c4d9] hover:bg-opacity-50 hover:rounded-lg py-2"
          >
            <PlagiarismOutlinedIcon className="text-[#205088] dark:text-blue text-3xl min-w-[24px] group-hover:scale-110 transition-transform" />
            {isExpanded && (
              <span className="ml-4 text-[#205088] dark:text-blue whitespace-nowrap group-hover:font-medium text-x">
                Historial
              </span>
            )}
          </Link>
        </div>

        {/* Botón de colapsar */}
        <button
          onClick={toggleNavbar}
          className="mt-4 flex items-center justify-center w-full py-2 hover:bg-[#a8c4d9] rounded-lg transition mb-8"
          aria-label={isExpanded ? "Colapsar menú" : "Expandir menú"}
        >
          {isExpanded ? (
            <>
              <KeyboardDoubleArrowLeftRoundedIcon className="text-[#205088]" />
              <span className="ml-2 text-[#205088] font-medium">Cerrar</span>
            </>
          ) : (
            <KeyboardDoubleArrowRightRoundedIcon className="text-[#205088]" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default NavbarJugador;
