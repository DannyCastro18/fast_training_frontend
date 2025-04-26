"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      // Intentar obtener el tema del localStorage
      const storedTheme = localStorage.getItem("theme") || "light";
      console.log("Tema inicial:", storedTheme);

      setTheme(storedTheme);

      // Aplicar el tema
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      setIsLoaded(true);
    } catch (error) {
      console.error("Error al inicializar el tema:", error);
      setIsLoaded(true);
    }
  }, []);

  const toggleTheme = () => {
    try {
      const newTheme = theme === "light" ? "dark" : "light";
      console.log("Cambiando tema a:", newTheme);

      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);

      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      console.error("Error al cambiar el tema:", error);
    }
  };

  if (!isLoaded) {
    return null; // O un componente de carga
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useTheme };
