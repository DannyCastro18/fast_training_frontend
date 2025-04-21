"use client";
import { SessionProvider } from "next-auth/react";
import { NavbarProvider } from "@/context/NavbarContext";
import { ThemeProvider } from "@/context/ThemeProvider";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <NavbarProvider>{children}</NavbarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
