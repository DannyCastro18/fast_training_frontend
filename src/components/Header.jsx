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

  const userImage = session?.user?.image?.startsWith("http")
    ? session.user.image
    : "/foto-perfil.png"; // Imagen por defecto que puso Edu :v

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Evita la redirección automática de NextAuth
    router.push("/"); // Redirige a la landing page
  };

  return (
    <header className="bg-white fixed w-full flex justify-end items-center px-6 py-3  rounded-lg space-x-6 z-0">
      <div className="flex items-center space-x-6">
        <FaMoon className="text-[#205088] text-xl cursor-pointer" />
        <FaBell className="text-[#205088] text-xl cursor-pointer" />

        {session?.user ? (
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
                <p className="px-4 py-2 text-gray-700">{session.user.name}</p>
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
          <p className="text-gray-500">:b</p>
        )}
      </div>
    </header>
  );
};

export default Header;
