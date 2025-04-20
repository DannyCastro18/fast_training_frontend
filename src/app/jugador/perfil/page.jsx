'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useUser } from '@/context/UserContext';
import PerfilPage from '@/components/perfilPage/page.jsx';

export default function Perfil() {
  const { data: session, status } = useSession();
  const { user, loadUserData } = useUser();

  useEffect(() => {
    if (status === 'authenticated') {
      loadUserData();
    }
  }, [status, loadUserData]);

  return <PerfilPage />;
}