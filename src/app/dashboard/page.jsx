'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
/* import { useSession } from 'next-auth/react'; */

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirige al login si no está autenticado
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <p className="text-center mt-10 text-xl">Cargando...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-blue-800 mb-4">Bienvenido al Dashboard</h1>

                {session?.user && (
                    <div className="mb-4">
                        <img
                            src={session.user.image}
                            alt="User Avatar"
                            className="w-20 h-20 rounded-full mx-auto mb-2"
                        />
                        <p className="text-lg font-semibold">{session.user.name}</p>
                        <p className="text-gray-600">{session.user.email}</p>
                    </div>
                )}

                <button
                    onClick={() => signOut()}
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}