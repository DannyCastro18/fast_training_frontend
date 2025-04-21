"use client";

import NavbarEntrenador from "../../components/NavbarEntrenador";
import Header from "../../components/shared/Header";
import { useState } from "react";

import { useNavbar } from "@/context/NavbarContext";

export default function EntrenadorLayout({ children }) {
  const { isExpanded, toggleNavbar } = useNavbar();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 transition-[margin] duration-300">
        <NavbarEntrenador isExpanded={isExpanded} toggleNavbar={toggleNavbar} />
        <main className={`flex-1 p-5 mt-12 ${isExpanded ? "ml-64" : "ml-16"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
