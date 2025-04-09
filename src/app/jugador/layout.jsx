"use client"

import { useState, useEffect } from 'react';
import NavbarJugador from "@/components/jugador/NavbarJugador";
import Header from "@/components/shared/Header";
import { JugadorDataProvider } from '@/context/JugadorDataContext';
import { useNavbar } from '@/context/NavbarContext';

export default function JugadorLayout({ children }) {
  const { isExpanded, toggleNavbar } = useNavbar();

  return (
    <JugadorDataProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 pt-16"> {/* pt-16 para compensar el header fijo */}
          <NavbarJugador />
          <main className={`flex-1 p-4 transition-all duration-200 ${isExpanded ? "ml-64" : "ml-16"}`}>
            {children}
          </main>
        </div>
      </div>
    </JugadorDataProvider>
  );
}
