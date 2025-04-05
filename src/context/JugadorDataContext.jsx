'use client'

import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import api from '../lib/api';

const JugadorDataContext = createContext();

export function useJugadorData() {
  return useContext(JugadorDataContext);
}

export function JugadorDataProvider({ children }) {
  const [jugadorData, setJugadorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJugadorData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        // Primero obtener el jugador asociado al usuario
        const jugadorResponse = await api.get(`/api/jugador/usuario/${userId}`);
        const jugadorId = jugadorResponse.data.id;

        console.log('ID del jugador obtenido:', jugadorId);

        // Ahora usar el ID del jugador para las demás peticiones
        try {
          const perfil = await api.get(`/api/jugador/perfil/${jugadorId}`);
          console.log('Perfil obtenido:', perfil.data);
          
          const estadisticas = await api.get(`/api/jugador/estadisticas/${jugadorId}`);
          console.log('Estadísticas obtenidas:', estadisticas.data);
          
          const entrenamientos = await api.get(`/api/jugador/entrenamientos/${jugadorId}`);
          console.log('Entrenamientos obtenidos:', entrenamientos.data);

          setJugadorData({
            perfil: perfil.data,
            estadisticas: estadisticas.data,
            entrenamientos: entrenamientos.data
          });
        } catch (requestError) {
          console.error('Error específico en la petición:', {
            status: requestError.response?.status,
            url: requestError.config?.url,
            message: requestError.message
          });
          throw requestError;
        }

      } catch (error) {
        console.error('Error fetching jugador data:', error);
        if (error.response) {
          console.error('Response details:', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
          });
        }
        if (error.message === 'No token found' || error.response?.status === 401) {
          window.location.href = '/auth/login';
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJugadorData();
  }, []);

  return (
    <JugadorDataContext.Provider value={{ jugadorData, loading }}>
      {children}
    </JugadorDataContext.Provider>
  );
} 