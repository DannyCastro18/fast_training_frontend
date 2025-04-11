import Link from "next/link";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import { useNavbar } from "@/context/NavbarContext";

const NavbarAdmin = () => {
  const { isExpanded, toggleNavbar } = useNavbar();

  const navItems = [
    { href: "/admin/inicio", icon: <DashboardOutlinedIcon className="text-[#205088] text-3xl" />, label: "Inicio" },
    { href: "/admin/usuarios", icon: <PeopleAltOutlinedIcon className="text-[#205088] text-3xl" />, label: "Usuarios" },
    { href: "/admin/equipo", icon: <SportsSoccerOutlinedIcon className="text-[#205088] text-3xl" />, label: "Equipo" },
  ];

  return (
    <nav
      className={`bg-white h-screen m-4 max-h-[calc(100vh-2rem)] flex flex-col shadow-[6px_0_18px_rgba(0,0,0,0.1)] dark:shadow-[8px_0_20px_rgba(0,0,0,0.5)] py-7 transition-all rounded-2xl overflow-y-auto z-1 ${isExpanded ? "w-64" : "w-16"}`}
    >
      <div className="flex flex-col items-center space-y-9 mt-4">
        <img
          src="/fast-training-icon.png"
          alt="Fast Training Icon"
          width={24}
          height={24}
          className="object-contain"
        />
        {navItems.map((item, index) => (
          <Link href={item.href} key={index} className="w-full px-4">
            <div className="flex items-center space-x-4 text-[#205088] hover:bg-blue-50 dark:hover:bg-blue-900 py-2 px-2 rounded-lg transition-colors">
              {item.icon}
              {isExpanded && <span className="text-md font-medium">{item.label}</span>}
            </div>
          </Link>
        ))}
        <button
          onClick={toggleNavbar}
          className="transition-transform hover:scale-110 focus:outline-none mt-4"
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

export default NavbarAdmin;