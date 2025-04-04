'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginForm({ isOpen, onClose, onRecuperarClick }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data } = await api.post('/auth/login', { email, password });
            
            if (!data.success || !data.token) {
                throw new Error(data.message || 'Error en la autenticación');
            }

            // Guardar datos de autenticación
            localStorage.setItem('token', data.token);
            localStorage.setItem('userData', JSON.stringify({
                id: data.user.id,
                email: data.user.email,
                role: data.user.role,
                roleName: data.user.roleName,
                persona: data.user.persona
            }));

            // Redirección basada en rol
            const redirectPath = {
                admin: '/admin/inicio',
                entrenador: '/entrenador/inicio',
                jugador: '/jugador/inicio'
            }[data.user.roleName] || '/';

            router.push(redirectPath);
            onClose();

        } catch (error) {
            console.error('Login error:', error);
            
            // Manejo detallado de errores
            let errorMessage = 'Error al iniciar sesión';
            
            if (error.response) {
                // Error del backend
                const backendError = error.response.data;
                errorMessage = backendError.message || 'Error en el servidor';
                
                if (backendError.code === 'USER_NOT_FOUND') {
                    errorMessage = 'Usuario no encontrado';
                } else if (backendError.code === 'INVALID_CREDENTIALS') {
                    errorMessage = 'Credenciales incorrectas';
                }
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 flex items-center justify-center">
            {/* Fondo oscuro */}
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Contenido del modal */}
            <div className="h-120 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full p-4">
                <div className="flex flex-col md:flex-row h-full">
                    {/* Sección de imagen */}
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

                    {/* Sección de formulario */}
                    <div className="w-full md:w-1/2 p-8 bg-white flex flex-col justify-center">
                        <div className="flex justify-end">
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <span className="sr-only">Cerrar</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="text-left mb-8">
                            <h1 className="text-3xl font-bold text-[#205088] mb-2">Iniciar Sesión</h1>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                                <p>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 bg-[#205088] focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Correo electrónico"
                                    required
                                    autoComplete="email"
                                />
                            </div>

                            <div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 bg-[#205088] focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="Contraseña"
                                    required
                                    autoComplete="current-password"
                                    minLength={8}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <h2 className="text-sm text-gray-600">Olvidé mi contraseña</h2>
                                </div>

                                <div className="text-sm">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onClose();
                                            onRecuperarClick();
                                        }}
                                        className="font-medium text-[#205088] hover:text-blue-500"
                                    >
                                        Recuperar contraseña
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => signIn('google')}
                                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                                    >
                                        <Image 
                                            src="/icons/search.png" 
                                            alt="Google" 
                                            width={20} 
                                            height={20} 
                                            className="mr-2" 
                                        />
                                        Continuar con Google
                                    </button>
                                </div>
                            </div>

                            <div className="pt-2 flex justify-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-1/2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#205088] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Procesando...
                                        </>
                                    ) : 'Iniciar Sesión'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}