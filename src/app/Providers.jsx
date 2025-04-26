'use client';
import { SessionProvider } from 'next-auth/react';
import { NavbarProvider } from '@/context/NavbarContext';
import { ThemeProvider } from '@/context/ThemeProvider';
import { UserProvider } from '@/context/UserContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function AuthSync({ children }) {
  const router = useRouter();
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        router.refresh();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    return () => window.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [router]);

  return children;
}

export function Providers({ children }) {
  return (
    <SessionProvider refetchOnWindowFocus={true}>
      <UserProvider>
        <ThemeProvider>
          <NavbarProvider>
            <AuthSync>
              {children}
            </AuthSync>
          </NavbarProvider>
        </ThemeProvider>
      </UserProvider>
    </SessionProvider>
  );
}
