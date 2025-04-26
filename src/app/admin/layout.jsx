"use client";

import NavbarAdmin from "@/components/admin/NavbarAdmin";
import Header from "@/components/shared/Header";

import { useNavbar } from "@/context/NavbarContext";

export default function AdminLayout({ children }) {
  const { isExpanded, toggleNavbar } = useNavbar();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <NavbarAdmin/>
        <main className={`flex-1 p-4 transition-all duration-200 ${isExpanded ? "ml-64" : "ml-16"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
