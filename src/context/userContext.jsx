'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { useSession } from 'next-auth/react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      
      // 1. Usuario de Google
      if (session?.user?.image) {
        const googleUser = {
          id: session.user.email,
          email: session.user.email,
          nombre: session.user.name?.split(' ')[0] || '',
          apellido: session.user.name?.split(' ')[1] || '',
          foto_perfil: session.user.image || '/default-profile.png',
          rol: 'Jugador' // rol por defecto para los que inicien sesión con Google
        };
        setUser(googleUser);
        return;
      }

      // 2. Usuario normal con token
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }

      const response = await api.get('/usuario/actual', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data?.success) {
        const userData = response.data.data;
        const formattedUser = {
          id: userData.id,
          email: userData.email,
          nombre: userData.nombre,
          apellido: userData.apellido,
          telefono: userData.telefono,
          foto_perfil: userData.foto_perfil || '/default-profile.png',
          rol: userData.rol_id === 1 ? 'Admin' : 
               userData.rol_id === 2 ? 'Entrenador' : 'Jugador'
        };
        setUser(formattedUser);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, [session]);

  // Sincronización automática
  useEffect(() => {
    const syncData = () => {
      if (status === 'authenticated') {
        fetchUserData();
      } else if (status === 'unauthenticated') {
        setUser(null);
      }
    };

    syncData();
    
    // Sincronizar cuando cambie la sesión
    const interval = setInterval(syncData, 30000); // Cada 30 segundos
    
    return () => clearInterval(interval);
  }, [status, fetchUserData]);

  return (
    <UserContext.Provider value={{ user, loading, refetchUser: fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);