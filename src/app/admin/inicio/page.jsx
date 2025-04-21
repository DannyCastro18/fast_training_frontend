"use client";
import { useState, useEffect } from 'react';
import { useAdministradorData } from '@/context/AdministradorDataContext';
import { useUser } from '@/context/UserContext';
import CompletarPerfilModal from "@/components/CompletarPerfilModal";
import Loading from '@/components/shared/Loading';

export default function InicioAdmin() {
  const { administradorData, loading: loadingAdminData } = useAdministradorData();
  const { user, loading: loadingUser, refetchUser } = useUser();
  const [showContent, setShowContent] = useState(false);

  // Sincronización automática
  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  useEffect(() => {
    if (!loadingAdminData && !loadingUser && administradorData?.perfilCompleto) {
      setShowContent(true);
    }
  }, [loadingAdminData, loadingUser, administradorData]);

  if (loadingAdminData || loadingUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {showContent ? (
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Panel de Administración
            {user?.nombre && ` - ${user.nombre}`}
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Bienvenido al sistema</h2>
            <p className="text-gray-700">
              Desde aquí podrás gestionar todos los aspectos de la aplicación.
              Utiliza el menú de navegación para acceder a las diferentes secciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-medium mb-2">Gestión de Usuarios</h3>
              <p className="text-sm text-gray-600">
                Administra los usuarios registrados en el sistema.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-medium mb-2">Configuración</h3>
              <p className="text-sm text-gray-600">
                Ajusta los parámetros del sistema.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Cargando tu perfil...</h1>
            <p className="text-gray-600">Por favor espera mientras verificamos tu información.</p>
          </div>
          
          <CompletarPerfilModal 
            role="admin"
            onComplete={() => {
              refetchUser();
              setShowContent(true);
            }}
          />
        </>
      )}
    </div>
  );
}