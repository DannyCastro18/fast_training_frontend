import React from 'react'
import Image  from 'next/image'


export default function RecuperacionContraseña() {
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
    {/* Sección de inicio de sesión */}
    <div className="w-2/3 bg-white flex items-top justify-center p-8">
    <div className="w-full">
        <h2 className="text-[50px] font-bold text-center mb-[30px] mt-[90px] text-blue-800">Recuperar Contraseña</h2>
    <div className='max-w-lg mx-auto'>
        <p className='text-gray-800 text-2xl'>
            Ingresa el correo electronico con el que estas registrado, te enviaremos un codigo para verificar que eres tu.
        </p>
    </div>
    <form className="max-w-lg mx-auto mt-10">
        <div className="mb-4">
            <label className="block text-blue-800 text-2xl font-semibold">Correo Electrónico</label>
            <input
                type="email"
                className="w-full mt-4 px-4 py-2 border rounded-lg
                text-gray-700  focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="usuario@correo.com"
            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-800 text-white py-4 rounded-lg hover:bg-blue-600 transition mt-5"
        >
            Enviar Codigo
        </button>
            </form>
        </div>
        </div>
    </div>
    );
}
