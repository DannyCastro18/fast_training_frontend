"use client";
import { useState, useEffect } from 'react';
import CompletarPerfilModal from "@/components/CompletarPerfilModal";
import Calendario from "@/components/Calendario";
import Estadisticas from "@/components/Estadisticas";
import FeaturedPlayers from "@/components/Destacados";
import { useUser } from '@/context/UserContext';
import Loading from '@/components/shared/Loading';

export default function InicioEntrenador() {
  const [showContent, setShowContent] = useState(false);
  const { user, loading, refetchUser } = useUser();

  // Sincronización y verificación de perfil
  useEffect(() => {
    const checkProfile = async () => {
      await refetchUser();
      // Mostrar contenido si el usuario está cargado y no está en estado de loading
      if (!loading && user) {
        setShowContent(true);
      }
    };

    checkProfile();
  }, [loading, user, refetchUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  // Verificar si el modal de completar perfil debe mostrarse
  const shouldShowProfileModal = !loading && user && !showContent;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {showContent ? (
        <>
          <div className="w-full max-w-6xl space-y-8">
            <h1 className="text-3xl font-bold text-center">
              {user?.nombre ? `Bienvenido, ${user.nombre}` : 'Panel de Entrenador'}
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Calendario />
                <Estadisticas />
              </div>
              <div>
                <FeaturedPlayers />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Cargando tu perfil...</h1>
          <p className="text-gray-600">Por favor espera mientras verificamos tu información.</p>
        </div>
      )}
      
      {shouldShowProfileModal && (
        <CompletarPerfilModal 
          role="entrenador"
          onComplete={() => {
            refetchUser();
            setShowContent(true);
          }}
        />
      )}
    </div>
  );
}