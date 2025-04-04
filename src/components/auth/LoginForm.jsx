'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Mapeo de roles
  const roleMap = {
    1: 'admin',
    2: 'entrenador',
    3: 'jugador'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      
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

    } catch (error) {
      console.error('Login error:', error);
      
      // Manejo detallado de errores
      let errorMessage = 'Error al iniciar sesión';
      
      if (error.response) {
        // Error del backend
        const backendError = error.response.data;
        errorMessage = backendError.message || 'Error en el servidor';
        
        // Mensajes específicos para códigos conocidos
        if (backendError.code === 'USER_NOT_FOUND') {
          errorMessage = 'Usuario no encontrado';
          document.getElementById('email')?.focus();
        } else if (backendError.code === 'INVALID_CREDENTIALS') {
          errorMessage = 'Credenciales incorrectas';
          document.getElementById('password')?.focus();
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sección de imagen */}
      <div className="hidden md:block md:w-1/2 bg-blue-900 relative">
        <Image
          src="/pantalla_login.png"
          alt="Login background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Sección de formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-800 mb-2">Bienvenido</h1>
            <p className="text-gray-600">Inicia sesión en tu cuenta</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="tu@email.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                minLength={8}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <Link 
                  href="/auth/recuperar" 
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : 'Iniciar Sesión'}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  O continúa con
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
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
                Google
              </button>
            </div>

            <div className="mt-8 text-center text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link href="/auth/registro" className="font-medium text-blue-600 hover:text-blue-500">
                Regístrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}