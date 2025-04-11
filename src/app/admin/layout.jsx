"use client";

import NavbarAdmin from "@/components/admin/NavbarAdmin";
import Header from "@/components/shared/Header";

import { useNavbar } from "@/context/NavbarContext";

export default function AdminLayout({ children }) {
  const { isExpanded, toggleNavbar } = useNavbar();

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 transition-[margin] duration-300">
        <NavbarAdmin isExpanded={isExpanded} toggleNavbar={toggleNavbar} />
        <main className={`flex-1 p-5 ${isExpanded ? "ml-64" : "ml-16"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
