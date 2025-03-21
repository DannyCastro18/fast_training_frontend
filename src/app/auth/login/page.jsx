'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            // Guardar token y rol en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role); // Suponiendo que el backend envía el rol

            /* alert('Inicio de sesión exitoso'); */

            // Redirigir según el rol
            switch (data.role) {
                case 'admin':
                    router.push('/admin/inicio');
                    break;
                case 'jugador':
                    router.push('/jugador/inicio');
                    break;
                case 'entrenador':
                    router.push('/entrenador/inicio');
                    break;
                default:
                    setError('Rol no reconocido');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-[50%] bg-white flex items-center justify-center">
                <img src="/pantalla_login.png" alt="Login" className="object-cover h-full w-full" />
            </div>
            <div className="w-2/3 bg-white flex items-center justify-center p-8">
                <div className="w-full">
                    <h2 className="text-[50px] font-bold text-center mb-[70px] text-blue-800">Iniciar Sesión</h2>
                    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Correo Electrónico</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="user@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <button type="submit" className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-5">
                            Iniciar Sesión
                        </button>
                    </form>

                    {/* Botón de Google con NextAuth */}
                    <div className="max-w-lg mx-auto mt-6 text-center">
                        <button
                            onClick={() => signIn('google')}
                            className="w-full text-gray-800 border rounded-lg py-2 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-400 gap-2 transition mt-9 hover:bg-gray-100"
                        >
                            <img src="/search.png" alt="Google Icon" className="w-6 h-6 mr-2" />
                            Continúa con Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}