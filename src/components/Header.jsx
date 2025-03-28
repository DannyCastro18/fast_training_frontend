"use client";

import Image from "next/image";
import { FaMoon, FaBell } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
    const { data: session, status } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    if (status === "loading") return <p>Cargando...</p>;

    const userEmail = localStorage.getItem('userEmail');  // Obtener el correo del usuario desde localStorage
    const userImage = session?.user?.image?.startsWith("http")
        ? session.user.image
        : "/foto-perfil.png"; // Imagen por defecto

    const handleSignOut = async () => {
        await signOut({ redirect: false }); // Evita la redirección automática de NextAuth
        localStorage.removeItem('userEmail'); // Eliminar el correo del usuario al cerrar sesión
        router.push("/"); // Redirige a la landing page
    };

    return (
        <header className="bg-white fixed w-full flex justify-end items-center px-6 py-3 rounded-lg space-x-6 z-0">
            <div className="flex items-center space-x-6">
                <FaMoon className="text-[#205088] text-xl cursor-pointer" />
                <FaBell className="text-[#205088] text-xl cursor-pointer" />

                {userEmail ? (
                    <div className="relative">
                        <div
                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-900 shadow-md cursor-pointer"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <Image
                                src={userImage}
                                alt="Usuario"
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                                <p className="px-4 py-2 text-gray-700 text-sm font-medium break-all">{userEmail}</p>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="relative">
                        <div
                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-900 shadow-md cursor-pointer"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <Image
                                src="/foto-perfil.png" // Imagen por defecto
                                alt="Perfil general"
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                                <p className="px-4 py-2 text-gray-700 font-semibold">Usuario</p> {/* Nombre genérico si no hay autenticación */}
                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;