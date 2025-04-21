"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../lib/api";

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
        if (typeof window === "undefined") return;

        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const decoded = jwtDecode(token);
        const userId = decoded?.id;

        if (!userId) throw new Error("ID de usuario no válido en el token");
        const jugadorResponse = await api.get(`/jugador/usuario/${userId}`);

        const jugadorId = jugadorResponse.data.id;
        console.log(jugadorId);

        const [perfil, estadisticas, entrenamientos, perfilCompleto] =
          await Promise.all([
            api.get(`/jugador/perfil/${jugadorId}`),
            api.get(`/jugador/estadisticas/${jugadorId}`),
            api.get(`/jugador/entrenamientos/${jugadorId}`),
            api.get(`/jugador/verificar-perfil/${userId}`),
          ]);

        console.log("Perfil:", perfil.data);

        setJugadorData({
          perfil: perfil.data,
          perfilCompleto: perfilCompleto.data,
          estadisticas: estadisticas.data,
          entrenamientos: entrenamientos.data,
        });
      } catch (error) {
        console.error("Error fetching jugador data:", error);
        if (error.response) {
          console.error("Response details:", {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
          });
        }
        if (
          error.message === "No token found" ||
          error.response?.status === 401
        ) {
          window.location.href = "/auth/login";
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
