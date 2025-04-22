'use client'

import { createContext, useState, useContext, useEffect } from "react";

const EntrenadorDataContext = createContext();

export function useEntrenadorData() {
  return useContext(EntrenadorDataContext);
}

export function EntrenadorDataProvider({ children }) {
  const [entrenadorData, setEntrenadorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntrenadorData = async () => {
      try {
        // Peticiones específicas para entrenador
        const [equipoResponse, planificacionesResponse] = await Promise.all([
          fetch('/api/entrenador/equipo'),
          fetch('/api/entrenador/planificaciones')
        ]);

        const equipo = await equipoResponse.json();
        const planificaciones = await planificacionesResponse.json();

        setEntrenadorData({
          equipo,
          planificaciones
        });
      } catch (error) {
        console.error('Error fetching entrenador data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntrenadorData();
  }, []);

  return (
    <EntrenadorDataContext.Provider value={{ entrenadorData, loading }}>
      {children}
    </EntrenadorDataContext.Provider>
  );
} 