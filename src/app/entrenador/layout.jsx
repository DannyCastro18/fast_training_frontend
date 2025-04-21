"use client";
import NavbarEntrenador from "@/components/NavbarEntrenador";
import Header from "@/components/shared/Header";
import { useNavbar } from "@/context/NavbarContext";
import { useUser } from '@/context/UserContext';
import { useEffect } from 'react';

export default function EntrenadorLayout({ children }) {
  const { isExpanded } = useNavbar();
  const { refetchUser } = useUser();

  // Sincronización al cargar el layout
  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <NavbarEntrenador />
        <main className={`flex-1 p-5 ${isExpanded ? "ml-64" : "ml-16"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}