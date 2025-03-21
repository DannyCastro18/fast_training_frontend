'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert('Registro exitoso, ahora puedes iniciar sesión');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sección de imagen */}
            <div className="w-[50%] bg-white flex items-center justify-center">
                <img
                    src="/pantalla_login.png"
                    alt="Login"
                    className="object-cover h-full w-full"
                />
            </div>

            {/* Sección de registro */}
            <div className="w-2/3 bg-white flex items-center justify-center p-8">
                <div className="w-full">
                    <h2 className="text-[50px] font-bold text-center mb-[70px] text-blue-800">Registrarse</h2>

                    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Nombre</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Escriba su nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Correo Electrónico</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="usuario@correo.com"
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
                        <div className="mb-4">
                            <label className="block text-gray-700">Confirmar Contraseña</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="********"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="mt-3 flex items-center gap-x-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <p className="text-gray-800 text-xs">Acepta los términos y condiciones de uso. Consulta nuestras políticas de privacidad</p>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-5"
                        >
                            Registrarse
                        </button>
                        <div className="mt-3 flex justify-between items-center">
                            <p className="text-gray-800">¿Ya tienes una cuenta?</p>
                            <Link href="/auth/login">
                                <h2 className="text-blue-800 cursor-pointer hover:underline font-semibold">Iniciar Sesión</h2>
                            </Link>
                        </div>
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
