"use client"

import { createContext, useState, useContext } from "react";

// Crear el contexto
const NavbarContext = createContext({
  isExpanded: true,
  toggleNavbar: () => {},
});

// Hook personalizado para acceder al contexto
export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
}

// Proveedor del contexto
export function NavbarProvider({ children }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleNavbar = () => setIsExpanded(!isExpanded);

  return (
    <NavbarContext.Provider value={{ isExpanded, toggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
}
