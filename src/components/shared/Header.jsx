"use client";

import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsDropdown from "@/components/shared/Notifications";
import api from "@/lib/api";

const Header = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);
  const [profileImage, setProfileImage] = useState("/default-profile.png");
  const [userName, setUserName] = useState("Usuario");
  const { theme, toggleTheme } = useTheme();

  // Manejar clicks fuera del menú
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Obtener imagen de perfil desde API
  const fetchUserProfileImage = useCallback(async () => {
    try {
      const response = await api.get("/usuario/actual");
      if (response.data.success && response.data.data.foto_perfil) {
        let imageUrl = response.data.data.foto_perfil;
        
        // Cache busting para Cloudinary
        if (imageUrl.includes('res.cloudinary.com')) {
          imageUrl = `${imageUrl.split('?')[0]}?t=${Date.now()}`;
        } else if (imageUrl.startsWith('uploads') && !imageUrl.startsWith('http')) {
          imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || ''}${imageUrl}`;
        }
        
        setProfileImage(imageUrl);
        // Actualizar localStorage
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        if (userData.persona) {
          userData.persona.foto_perfil = imageUrl;
          localStorage.setItem("userData", JSON.stringify(userData));
        }
      }
    } catch (error) {
      console.error("Error fetching user profile image:", error);
    }
  }, []);

  // Cargar datos del usuario
  const loadUserData = useCallback(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || {});

      // Establecer nombre
      if (userData?.persona) {
        const nombre = userData.persona.nombre || "";
        const apellido = userData.persona.apellido || "";
        setUserName(`${nombre} ${apellido}`.trim());
      } else if (session?.user?.name) {
        setUserName(session.user.name);
      }

      // Establecer imagen (localStorage > session > API)
      if (userData?.persona?.foto_perfil) {
        let imageUrl = userData.persona.foto_perfil;
        if (imageUrl.startsWith("uploads")) {
          imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
        }
        setProfileImage(imageUrl);
      } else if (session?.user?.image) {
        setProfileImage(session.user.image);
      } else {
        fetchUserProfileImage();
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      setProfileImage("/default-profile.png");
    }
  }, [session, fetchUserProfileImage]);

  useEffect(() => {
    loadUserData();

    // Event listeners para actualizaciones
    const handleProfileImageUpdated = () => loadUserData();
    window.addEventListener("storage", loadUserData);
    window.addEventListener("profileImageUpdated", handleProfileImageUpdated);

    return () => {
      window.removeEventListener("storage", loadUserData);
      window.removeEventListener("profileImageUpdated", handleProfileImageUpdated);
    };
  }, [loadUserData]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    router.push("/");
  };

  const handleViewProfile = useCallback(() => {
    setMenuOpen(false);
    const userData = JSON.parse(localStorage.getItem("userData") || {});
    const userRole = userData?.roleName || session?.user?.roleName;

    const redirectPath = 
      userRole === "entrenador" ? "/entrenador/perfil" :
      userRole === "jugador" ? "/jugador/perfil" :
      userRole === "admin" ? "/admin/perfil" : "/perfil";

    router.push(redirectPath);
  }, [session, router]);

  if (status === "loading") {
    return (
      <header className="w-full flex justify-end items-center px-6 py-3 bg-background z-50">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      </header>
    );
  }

  return (
    <header className="w-full flex justify-end items-center px-6 py-3 z-50">
      <section className="flex items-center gap-3">
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Cambiar tema"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <LightModeRoundedIcon className="text-gray-700" />
          ) : (
            <DarkModeRoundedIcon className="text-gray-700" />
          )}
        </button>

        <NotificationsDropdown />

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center focus:outline-none"
            aria-label="Menú de usuario"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-500">
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
            <div className="absolute right-0 top-0 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
              <div className="relative px-4 py-5 border-b border-gray-200 text-center">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-primary-500 mb-2">
                    <Image
                      src={profileImage}
                      alt="Foto de perfil"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                      onError={() => setProfileImage("/default-profile.png")}
                    />
                  </div>
                  <p className="text-m font-medium text-gray-900">{userName}</p>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={handleViewProfile}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                >
                  <SettingsIcon className="mr-3 text-gray-500" style={{ fontSize: 20 }} />
                  Configuración
                </button>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/ayuda");
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                >
                  <HelpCenterIcon className="mr-3 text-gray-500" style={{ fontSize: 20 }} />
                  Centro de ayuda
                </button>

                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-50 flex items-center transition-colors"
                >
                  <ExitToAppIcon className="mr-3 text-red-500" style={{ fontSize: 20 }} />
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