'use client';
import { SessionProvider } from 'next-auth/react';
import { NavbarProvider } from '@/context/NavbarContext';
import { ThemeProvider } from '@/context/ThemeProvider';
import { UserProvider } from '@/context/UserContext';

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <NavbarProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </NavbarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}