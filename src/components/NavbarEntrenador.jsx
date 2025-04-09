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

const NavbarEntrenador = () => {
  const { isExpanded, toggleNavbar } = useNavbar();
  return (
    <nav
      className={`bg-white w-16 h-screen m-4 max-h-[calc(100vh-2rem)] flex flex-col items-center shadow-[6px_0_18px_rgba(0,0,0,0.1)] dark:shadow-[8px_0_20px_rgba(0,0,0,0.5)] py-7 transition-all rounded-2xl overflow-y-auto z-1 ${isExpanded ? "w-64" : "w-16"}`}
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
        <Link href="/entrenador/ingreso-datos">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#205088"
              d="M4 19v-1.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q.925 0 1.825.113t1.8.362l-1.675 1.7q-.5-.075-.975-.125T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8h6v2H5q-.425 0-.712-.288T4 19m10 1v-1.25q0-.4.163-.763t.437-.637l4.925-4.925q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-4.925 4.925q-.275.275-.637.425t-.763.15H15q-.425 0-.712-.288T14 20m7.5-5.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925zM12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m0-2q.825 0 1.413-.587T14 8t-.587-1.412T12 6t-1.412.588T10 8t.588 1.413T12 10m0-2"
            />
          </svg>
        </Link>
        <Link href="/entrenador/historial">
          <ContentPasteSearchRoundedIcon className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
        <Link href="/entrenador/equipo">
          <SportsSoccerOutlinedIcon className="text-[#205088] dark:text-blue text-3xl transition-colors" />
        </Link>
        <Link href="/entrenador/quejas-reclamos" className="mt-auto">
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

export default NavbarEntrenador;
