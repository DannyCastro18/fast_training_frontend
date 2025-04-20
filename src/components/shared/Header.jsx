'use client';

import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const { data: session, status } = useSession();
  const { user, resetUser } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);
  const [profileImage, setProfileImage] = useState('/default-profile.png');
  const [userName, setUserName] = useState('Usuario');

  // Cargar datos del usuario
  useEffect(() => {
    if (user) {
      const nombre = user?.nombre || 'Usuario';
      const apellido = user?.apellido || '';
      setUserName(`${nombre} ${apellido}`.trim() || 'Usuario');
      
      let imageUrl = user?.foto_perfil || '/default-profile.png';
      if (imageUrl.includes('res.cloudinary.com')) {
        imageUrl = imageUrl.split('?')[0] + `?v=${Date.now()}`;
      } else if (imageUrl.startsWith('uploads') || imageUrl.startsWith('/uploads')) {
        imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || ''}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}?v=${Date.now()}`;
      }

      setProfileImage(imageUrl);
    }
  }, [user]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      resetUser();
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('provider');
      router.push('/auth/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleViewProfile = () => {
    setMenuOpen(false);
    const userRole = user?.rol || 'Invitado';
    const redirectPath = 
      userRole === 'Entrenador' ? '/entrenador/perfil' :
      userRole === 'Jugador' ? '/jugador/perfil' :
      userRole === 'Admin' ? '/admin/perfil' :
      '/perfil';
    router.push(redirectPath);
  };

  if (status === 'loading') {
    return (
      <header className="fixed w-full flex justify-end items-center px-6 py-3 bg-white z-50 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
      </header>
    );
  }

  return (
    <header className="fixed w-full flex justify-end items-center px-6 py-3 bg-white z-50 shadow-sm">
      <section className="flex items-center space-x-4">
        {/* Botón de tema (decorativo) */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-default"
          aria-label="Modo claro"
          disabled
        >
          <LightModeRoundedIcon className="text-gray-700" />
        </button>

        {/* Notificaciones (decorativo) */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-default"
          aria-label="Notificaciones"
          disabled
        >
          <NotificationsNoneRoundedIcon className="text-gray-700" />
        </button>

        {/* Menú de usuario */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center space-x-2 focus:outline-none"
            aria-label="Menú de usuario"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 relative">
              <Image
                src={profileImage}
                alt="Foto de perfil"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                onError={() => setProfileImage('/default-profile.png')}
              />
            </div>
          </button>

          {menuOpen && (
            <div className="fixed inset-0 bg-black/20 z-50">
              <div 
                className="bg-white w-72 rounded-lg shadow-xl absolute right-4 top-2 border border-gray-200"
                style={{ maxHeight: 'calc(100vh - 2rem)' }}
              >
                <div className="p-2 flex justify-end">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <CloseIcon className="text-gray-500" />
                  </button>
                </div>

                <div className="px-5 pb-5 pt-2 flex flex-col items-center">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-blue-100 mb-3">
                    <Image
                      src={profileImage}
                      alt="Foto de perfil"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                      onError={() => setProfileImage('/default-profile.png')}
                    />
                  </div>
                  
                  <p className="text-base font-semibold text-gray-800 mb-4">
                    {userName}
                  </p>

                  <div className="w-full space-y-2">
                    <button
                      onClick={handleViewProfile}
                      className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-blue-50 rounded-md flex items-center border border-gray-200 transition-all text-sm"
                    >
                      <SettingsIcon className="mr-3" style={{ fontSize: 18 }} />
                      Configuración
                    </button>
                    
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        router.push('/ayuda');
                      }}
                      className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-blue-50 rounded-md flex items-center border border-gray-200 transition-all text-sm"
                    >
                      <HelpCenterIcon className="mr-3" style={{ fontSize: 18 }} />
                      Centro de ayuda
                    </button>
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-md flex items-center border border-gray-200 hover:border-red-200 transition-all text-sm"
                    >
                      <ExitToAppIcon className="mr-3" style={{ fontSize: 18 }} />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;