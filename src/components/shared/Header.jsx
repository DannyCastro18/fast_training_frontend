"use client";

import Image from "next/image";
// Iconos
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../../context/ThemeProvider";

const Header = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const handleViewProfile = () => {
    setMenuOpen(false);
    router.push("/perfil");
  };

  if (status === "loading") return <p>Cargando...</p>;

  const userEmail = session?.user?.email;
  const userImage = session?.user?.image || "/images/chino.jpg";

  return (
    <header className="fixed w-full flex justify-end items-center px-6 py-3 rounded-lg bg-[#F5F9FF]">
      <section className="flex items-center space-x-6">
        <button onClick={toggleTheme} className="px-4 py-2 border rounded">
          {theme === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </button>
        <button className="px-4 py-2 border rounded">
          <NotificationsNoneRoundedIcon />
        </button>

        <div className="relative" ref={menuRef}>
          <div
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-900 shadow-md cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Image
              src={userImage}
              alt="Usuario"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {userEmail && (
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700 truncate">{userEmail}</p>
                </div>
              )}
              
              {/* Opción Ver Perfil */}
              <button
                onClick={handleViewProfile}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 text-sm flex items-center"
              >
                <AccountCircleIcon className="mr-2 text-gray-500" style={{ fontSize: 20 }} />
                Ver perfil
              </button>
              
              {/* Opción Cerrar Sesión */}
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-50 text-sm flex items-center"
              >
                <ExitToAppIcon className="mr-2 text-red-500" style={{ fontSize: 20 }} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;