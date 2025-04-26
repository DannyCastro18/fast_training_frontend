"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../lib/api";

const AdministradorDataContext = createContext();

export function useAdministradorData() {
  return useContext(AdministradorDataContext);
}

export function AdministradorDataProvider({ children }) {
  const [administradorData, setAdministradorData] = useState({
    perfil: null,
    perfilCompleto: false,
    adminId: null,
    usuarios: [],
    administradores: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdminData = async (userId) => {
    try {
      // 1. Obtener ID de administrador
      const idResponse = await api.get(`/admin/usuario/${userId}`);
      const adminId = idResponse.data.id;

      // 2. Obtener datos en paralelo
      const [perfil, verificacion, usuarios, administradores] = await Promise.all([
        api.get('/admin/perfil'),
        api.get(`/admin/verificar-perfil/${userId}`),
        api.get('/admin/usuarios'),    // Asumiendo que existe
        api.get('/administradores/ver') // Ruta pública que definiste
      ]);

      return {
        perfil: perfil.data,
        perfilCompleto: verificacion.data.profileComplete,
        adminId,
        usuarios: usuarios?.data || [],
        administradores: administradores.data
      };
    } catch (err) {
      console.error("Error fetching admin data:", err);
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

        const data = await fetchAdminData(userId);
        setAdministradorData(data);
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
      const response = await api.put('/admin/perfil', updatedData);
      setAdministradorData(prev => ({
        ...prev,
        perfil: { ...prev.perfil, ...updatedData }
      }));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    administradorData,
    loading,
    error,
    updateProfile,
    refresh: () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userId = jwtDecode(token).id;
      fetchAdminData(userId)
        .then(data => setAdministradorData(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  };

  return (
    <AdministradorDataContext.Provider value={value}>
      {children}
    </AdministradorDataContext.Provider>
  );
}