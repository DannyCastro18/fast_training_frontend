'use client';
import PerfilPage from '@/components/perfil/PerfilPage';
import Header from '@/components/shared/Header';

export default function Perfil() {
    return (
        <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20 pb-10">
            <PerfilPage />
        </main>
        </div>
    );
}