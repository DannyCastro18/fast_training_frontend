"use client";
import { SessionProvider } from "next-auth/react";
import { NavbarProvider } from "@/context/NavbarContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NavbarProvider>{children}</NavbarProvider>
    </SessionProvider>
  );
}
