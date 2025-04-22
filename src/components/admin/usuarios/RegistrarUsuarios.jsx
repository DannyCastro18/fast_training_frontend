'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function RegistrarUsuarios() {
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('');

    const handleRegistro = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post("http://localhost:5000/api/usuarios/todos/ver")
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            

            const roleMap = {
                1: 'admin',
                2: 'entrenador',
                3: 'jugador',
            };
        
            const role = roleMap[data.role] || 'desconocido';
        
            if (role === 'desconocido') {
                setError('Rol no reconocido');
                return;
            }

            localStorage.setItem('id', data.id );
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', role);
            localStorage.setItem('userEmail', data.email);

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-2/3 bg-white flex items-center justify-center p-8">
                <div className="w-full">
                    <h2 className="text-[50px] font-bold text-center mb-[70px] text-blue-800">Ingresar el correo del nuevo usuario</h2>
                    <form className="max-w-lg mx-auto" onSubmit={handleRegistro}>
                        <section className="mb-4">
                            <label className="block text-gray-700">Correo Electrónico</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="user@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </section>
                        {error && <p className="text-red-500">{error}</p>}
                        <button type="submit" className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-5">
                            Iniciar Sesión
                        </button>
                    </form>

                    <div className="max-w-lg mx-auto mt-2 text-right">
                        <button
                            onClick={() => router.push('/auth/recuperar')}
                            className="text-blue-800 hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}