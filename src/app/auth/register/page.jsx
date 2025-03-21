import React from 'react'
import Image  from 'next/image'



export default function RegisterPage() {
  return (
    <div className="flex h-screen">
      {/* Sección de imagen */}
      <div className="w-[50%] bg-white flex items-center justify-center">
  <img
    src="/pantalla_login.png"  // Usa el nombre correcto del archivo
    alt="Login"
    className="object-cover h-full w-full"
  />
</div>

      
      {/* Sección de inicio de sesión */}
      <div className="w-2/3 bg-white flex items-center justify-center p-8">
        <div className="w-full">
          <h2 className="text-[50px] font-bold text-center mb-[70px] text-blue-800">Registrarse</h2>
          
          <form className="max-w-lg mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700">Nombre</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg
                text-gray-700  focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Escriba su nombre"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg
                text-gray-700  focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="usuario@correo.com"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="********"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirmar Contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="********"
              />
            </div>
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
  <h2 className="text-blue-800 cursor-pointer">Iniciar Sesion</h2>
</div>


          </form>
          <div className="max-w-lg mx-auto mt-6 text-center">
            
            <button
  className="w-full  text-gray-800 border rounded-lg py-2 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-400 gap-2 transition mt-9"
>
<img src="/search.png" alt="Icono" className="w-6 h-6 mr-4" />
  Iniciar sesión con Google
</button>
          </div>
        </div>
      </div>
    </div>
  );
}
