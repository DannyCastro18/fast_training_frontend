'use client';

import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../context/ThemeProvider';
// Iconos
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const [profileImage, setProfileImage] = useState('/foto-perfil.png');

  // Efecto para manejar clics fuera del menú
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Efecto para cargar la imagen de perfil
  useEffect(() => {
    const loadProfileImage = () => {
      try {
        // 1. Verificar si hay imagen en localStorage (de Cloudinary)
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData?.persona?.foto_perfil) {
          setProfileImage(userData.persona.foto_perfil);
          return;
        }

        // 2. Usar imagen de Google si existe
        if (session?.user?.image) {
          setProfileImage(session.user.image);
          return;
        }

        // 3. Usar imagen por defecto
        setProfileImage('/foto-perfil.png');
      } catch (error) {
        console.error('Error loading profile image:', error);
        setProfileImage('/foto-perfil.png');
      }
    };

    loadProfileImage();

    // Escuchar cambios en localStorage
    const handleStorageChange = () => loadProfileImage();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [session]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    router.push('/auth/login');
  };

  const handleViewProfile = () => {
    setMenuOpen(false);
    router.push('/perfil');
  };

  if (status === 'loading') {
    return (
      <header className="fixed w-full flex justify-end items-center px-6 py-3 bg-white dark:bg-gray-800 shadow-sm z-50">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse"></div>
      </header>
    );
  }

  return (
    <header className="fixed w-full flex justify-end items-center px-6 py-3 bg-white/0 dark:bg-gray-800/0 shadow-sm z-50">
      <section className="flex items-center space-x-4">
        {/* Botón de cambio de tema */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Cambiar tema"
        >
          {theme === 'light' ? (
            <DarkModeRoundedIcon className="text-gray-700 dark:text-gray-300" />
          ) : (
            <LightModeRoundedIcon className="text-gray-700 dark:text-gray-300" />
          )}
        </button>

        {/* Botón de notificaciones */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
          aria-label="Notificaciones"
        >
          <NotificationsNoneRoundedIcon className="text-gray-700 dark:text-gray-300" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar y menú desplegable */}
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
                onError={() => setProfileImage('/default-profile.png')}
              />
            </div>
          </button>

          {/* Menú desplegable */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 divide-y divide-gray-100 dark:divide-gray-600">
              {session?.user?.email && (
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-900 dark:text-white font-medium truncate">
                    {session.user.email}
                  </p>
                </div>
              )}

              <div className="py-1">
                <button
                  onClick={handleViewProfile}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                >
                  <AccountCircleIcon className="mr-2 text-gray-500 dark:text-gray-300" style={{ fontSize: 20 }} />
                  Ver perfil
                </button>
              </div>

              <div className="py-1">
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                >
                  <ExitToAppIcon className="mr-2 text-red-500 dark:text-red-400" style={{ fontSize: 20 }} />
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