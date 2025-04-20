'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '',
    email: '',
    nombre: '',
    apellido: '',
    telefono: '',
    foto_perfil: '/default-profile.png',
    rol: 'Invitado'
  });

  // Función para resetear usuario (memoizada)
  const resetUser = useCallback(() => {
    console.log('Reseteando datos de usuario');
    setUser({
      id: '',
      email: '',
      nombre: '',
      apellido: '',
      telefono: '',
      foto_perfil: '/default-profile.png',
      rol: 'Invitado'
    });
    localStorage.removeItem('userData');
    window.dispatchEvent(new CustomEvent('userUpdated'));
  }, []);

  // Función para actualizar usuario (memoizada)
  const updateUser = useCallback((newData) => {
    console.log('Actualizando datos de usuario:', newData);
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    
    // Actualizar localStorage
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const updatedUserData = {
      ...userData,
      persona: {
        ...userData.persona,
        ...newData
      }
    };
    
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    
    // Disparar eventos personalizados
    window.dispatchEvent(new CustomEvent('userDataUpdated', {
      detail: updatedUserData
    }));
    window.dispatchEvent(new CustomEvent('userUpdated'));
    
    return updatedUser;
  }, [user]);

  // Función para cargar datos de usuario (memoizada)
  const loadUserData = useCallback(async () => {
    try {
      console.log('Iniciando carga de datos de usuario...');
      
      // 1. Primero verifica si es un usuario de Google
      if (localStorage.getItem('provider') === 'google') {
        console.log('Detectado usuario de Google');
        const googleUser = {
          id: localStorage.getItem('id'),
          email: localStorage.getItem('email'),
          nombre: localStorage.getItem('name')?.split(' ')[0] || '',
          apellido: localStorage.getItem('name')?.split(' ')[1] || '',
          foto_perfil: localStorage.getItem('image') || '/default-profile.png',
          rol: 'Jugador'
        };
        setUser(googleUser);
        return googleUser;
      }
  
      // 2. Verifica si hay token JWT válido
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No hay token, reseteando usuario');
        resetUser();
        return null;
      }
  
      // 3. Si hay token, hace la petición al backend
      const response = await api.get('/usuario/actual', {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (response.data?.success) {
        console.log('Datos de usuario recibidos:', response.data.data);
        const userData = response.data.data;
        const updatedUser = {
          id: userData.id,
          email: userData.email,
          nombre: userData.nombre,
          apellido: userData.apellido,
          telefono: userData.telefono,
          foto_perfil: userData.foto_perfil || '/default-profile.png',
          rol: userData.rol_id === 1 ? 'Admin' : 
               userData.rol_id === 2 ? 'Entrenador' : 'Jugador'
        };
        setUser(updatedUser);
        return updatedUser;
      }
    } catch (error) {
      console.error('Error loading user:', error);
      // Si el token es inválido, limpia todo
      if (error.response?.status === 401) {
        console.log('Token inválido, limpiando sesión');
        localStorage.removeItem('token');
        resetUser();
      }
      return null;
    }
  }, [resetUser]);

  // Efecto para cargar datos iniciales y escuchar eventos
  useEffect(() => {
    // Carga inicial
    loadUserData();
    
    // Event listeners
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'userData' || e.key === 'provider') {
        console.log('Cambio en almacenamiento detectado, recargando datos...');
        loadUserData();
      }
    };
    
    const handleAuthChange = () => {
      console.log('Evento authChange recibido, recargando datos...');
      loadUserData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('userUpdated', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('userUpdated', handleAuthChange);
    };
  }, [loadUserData]);

  return (
    <UserContext.Provider value={{ 
      user, 
      updateUser, 
      loadUserData,
      resetUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);