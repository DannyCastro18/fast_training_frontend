'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function RecuperarForm({ isOpen, onClose, onBackToLogin }) {
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);
        setError(null);
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/auth/solicitar-recuperacion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setMensaje('Hemos enviado un enlace de verificación a tu correo electrónico.');
        } catch (err) {
            setError(err.message || 'Error al enviar solicitud.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 flex items-center justify-center">
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
    
            <div className="h-120 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full p-4">
                <div className="flex flex-col md:flex-row h-full">
                    <div className="md:block md:w-1/2 bg-blue-900 relative rounded-xl overflow-hidden h-full">
                        <Image
                            src="/pantalla_login.png"
                            alt="Login background"
                            fill
                            className="object-cover object-center"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
    
                    <div className="w-full md:w-1/2 p-8 bg-white flex flex-col justify-center">
                        <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="absolute right-2 top-2 z-10 p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            </button>
                        </div>

                        <div className="text-left mb-8">
                            <h1 className="text-3xl font-bold text-[#205088] mb-2">Recuperación de Contraseña</h1>
                            <p className="text-gray-600">
                                Ingresa tu correo electrónico para recibir un enlace de recuperación.
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                                <p>{error}</p>
                            </div>
                        )}

                        {mensaje && (
                            <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                                <p>{mensaje}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 text-white bg-[#205088] focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="usuario@ejemplo.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>
    
                            <div className="pt-2 flex justify-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-1/2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#205088] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Enviando...' : 'Enviar Enlace'}
                                </button>
                            </div>
                        </form>

                        <div className="text-center mt-4">
                            <button
                                type="button"
                                onClick={onBackToLogin}
                                className="text-sm text-[#205088] hover:text-blue-500"
                            >
                                ← Volver al inicio de sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}