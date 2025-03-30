'use client';

import React, { useState } from 'react';

export default function RecuperarForm() {
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);
        setError(null);

        try {
            const res = await fetch('http://localhost:5000/api/auth/solicitar-recuperacion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setMensaje('Correo enviado con instrucciones para restablecer tu contraseña.');
        } catch (err) {
            setError(err.message || 'Error al enviar solicitud.');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold text-blue-800 text-center mb-4">
                    Recuperar Contraseña
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Ingresa tu correo"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="w-full p-3 text-white bg-blue-800 rounded-lg hover:bg-blue-700 transition">
                        Enviar
                    </button>
                </form>
                {mensaje && <p className="text-green-600 mt-3">{mensaje}</p>}
                {error && <p className="text-red-600 mt-3">{error}</p>}
            </div>
        </div>
    );
}