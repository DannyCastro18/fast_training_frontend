"use client";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

const Header = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);
  const [profileImage, setProfileImage] = useState("/default-profile.png");
  const [userName, setUserName] = useState("Usuario");
  const { theme, toggleTheme } = useTheme();

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

  useEffect(() => {
    const loadUserData = () => {
      try {
        // Obtener datos del usuario desde localStorage
        const userData = JSON.parse(localStorage.getItem("userData"));

        // Construir nombre completo
        if (userData?.persona) {
          const nombre = userData.persona.nombre || "";
          const apellido = userData.persona.apellido || "";
          setUserName(`${nombre} ${apellido}`.trim());
        } else if (session?.user?.name) {
          setUserName(session.user.name);
        }

        // Establecer imagen de perfil
        if (userData?.persona?.foto_perfil) {
          let imageUrl = userData.persona.foto_perfil;
          if (imageUrl.startsWith("uploads")) {
            imageUrl = `http://localhost:5000/${imageUrl}`;
          }
          setProfileImage(imageUrl);
        } else if (session?.user?.image) {
          setProfileImage(session.user.image);
        } else {
          setProfileImage("/default-profile.png");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setProfileImage("/default-profile.png");
      }
    };

    loadUserData();

    const handleStorageChange = () => loadUserData();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("profileImageUpdated", loadUserData);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("profileImageUpdated", loadUserData);
    };
  }, [session]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    router.push("/");
  };

  const handleViewProfile = () => {
    setMenuOpen(false);

    // Obtener el rol del usuario
    let userRole = null;
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      userRole = userData?.roleName;
    } catch (error) {
      console.error("Error parsing userData:", error);
    }

    if (!userRole && session?.user?.roleName) {
      userRole = session.user.roleName;
    }

    // Redirección basada en rol
    const redirectPath =
      userRole === "entrenador"
        ? "/entrenador/perfil"
        : userRole === "jugador"
          ? "/jugador/perfil"
          : userRole === "admin"
            ? "/admin/perfil"
            : "/perfil";

    router.push(redirectPath);
  };

  if (status === "loading") {
    return (
      <header className="w-full flex justify-end items-center px-6 py-3 bg-background z-50">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      </header>
    );
  }

  return (
    <header className="w-full flex justify-end items-center px-6 py-3 z-50">
      <section className="flex items-center space-x-2">
        {/* Botón de tema (solo visual, sin funcionalidad) */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Tema"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <LightModeRoundedIcon />
          ) : (
            <DarkModeRoundedIcon />
          )}
        </button>

        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
          aria-label="Notificaciones"
        >
          <NotificationsNoneRoundedIcon className="text-gray-700" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center space-x-2 focus:outline-none"
            aria-label="Menú de usuario"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
              <Image
                src={profileImage}
                alt="Foto de perfil"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
                onError={() => setProfileImage("/default-profile.png")}
              />
            </div>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 divide-y divide-gray-100">
              <div className="px-4 py-3">
                <p className="text-sm text-gray-900 font-medium">{userName}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={handleViewProfile}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <SettingsIcon
                    className="mr-2 text-gray-500"
                    style={{ fontSize: 20 }}
                  />
                  Configuración
                </button>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/ayuda");
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <HelpCenterIcon
                    className="mr-2 text-gray-500"
                    style={{ fontSize: 20 }}
                  />
                  Centro de ayuda
                </button>
              </div>

              <div className="py-1">
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                >
                  <ExitToAppIcon
                    className="mr-2 text-red-500"
                    style={{ fontSize: 20 }}
                  />
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
