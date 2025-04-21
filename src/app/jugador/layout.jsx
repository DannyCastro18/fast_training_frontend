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
      <div className="min-h-screen h-screen bg-background flex ">
        <NavbarJugador />
        <div className="flex m-2 rounded-xl overflow-hidden bg-other-bg flex-col flex-1">
          <Header />
          <main className={`flex-1 p-4 transition-all duration-200`}>
            {children}
          </main>
        </div>
      </div>
    </JugadorDataProvider>
  );
}
