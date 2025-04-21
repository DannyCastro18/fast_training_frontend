"use client";

import { useState, useEffect } from "react";
import NavbarJugador from "@/components/jugador/NavbarJugador";
import Header from "@/components/shared/Header";
import { JugadorDataProvider } from "@/context/JugadorDataContext";
import { useNavbar } from "@/context/NavbarContext";

export default function JugadorLayout({ children }) {
  const { isExpanded, toggleNavbar } = useNavbar();

  return (
    <JugadorDataProvider>
      <div className="min-h-screen flex w-auto bg-background">
        <NavbarJugador />
        <div className="flex flex-1 m-4 bg-other-bg flex-col p-2  h-screen overflow-scroll rounded-sm">
          {/* pt-16 para compensar el header fijo */}
          <Header />
          <main className={`flex-1 p-4 transition-all duration-200`}>
            {children}
          </main>
        </div>
      </div>
    </JugadorDataProvider>
  );
}
