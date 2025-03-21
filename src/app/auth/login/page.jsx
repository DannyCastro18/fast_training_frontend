'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
        // Redirigir o hacer otra acción aquí
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
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-5">
                Iniciar Sesión
                </button>
            </form>
            
            <div className="mt-3 flex justify-center items-center gap-2">
                <p className="text-gray-800">¿No tienes una cuenta?</p>
                <Link href="/auth/register">
                    <span className="text-blue-800 cursor-pointer hover:underline font-semibold">Regístrate</span>
                </Link>
                </div>
            </div>
        </div>
    </div>
    );
}
