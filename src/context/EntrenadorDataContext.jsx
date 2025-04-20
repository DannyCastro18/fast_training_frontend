'use client'

import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../lib/api";

const EntrenadorDataContext = createContext();

export function useEntrenadorData() {
  return useContext(EntrenadorDataContext);
}

export function EntrenadorDataProvider({ children }) {
  const [entrenadorData, setEntrenadorData] = useState({
    perfil: null,
    perfilCompleto: false,
    entrenadorId: null,
    equipo: [],
    planificaciones: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEntrenadorData = async (userId) => {
    try {
      // 1. Obtener ID de entrenador
      const entrenadorResponse = await api.get(`/entrenador/usuario/${userId}`);
      const entrenadorId = entrenadorResponse.data.id;

      // 2. Obtener datos en paralelo
      const [perfil, verificacion, equipo, planificaciones] = await Promise.all([
        api.get(`/entrenador/perfil/${entrenadorId}`),
        api.get(`/entrenador/verificar-perfil/${userId}`),
        api.get('/entrenador/equipo'),
        api.get('/entrenador/planificaciones')
      ]);

      return {
        perfil: perfil.data,
        perfilCompleto: verificacion.data?.profileComplete || false,
        entrenadorId,
        equipo: equipo.data,
        planificaciones: planificaciones.data
      };
    } catch (err) {
      console.error('Error fetching entrenador data:', err);
      throw err;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No autenticado");

        const decoded = jwtDecode(token);
        const userId = decoded?.id;
        if (!userId) throw new Error("ID de usuario inválido");

        const data = await fetchEntrenadorData(userId);
        setEntrenadorData(data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        if (err.response?.status === 401) {
          window.location.href = "/auth/login";
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const updateProfile = async (updatedData) => {
    try {
      setLoading(true);
      const response = await api.put('/usuario/perfil', updatedData);
      
      // Actualizar datos locales
      const token = localStorage.getItem("token");
      const userId = jwtDecode(token).id;
      const data = await fetchEntrenadorData(userId);
      
      setEntrenadorData(data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    entrenadorData,
    loading,
    error,
    updateProfile,
    refresh: () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userId = jwtDecode(token).id;
      fetchEntrenadorData(userId)
        .then(data => setEntrenadorData(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  };

  return (
    <EntrenadorDataContext.Provider value={value}>
      {children}
    </EntrenadorDataContext.Provider>
  );
}