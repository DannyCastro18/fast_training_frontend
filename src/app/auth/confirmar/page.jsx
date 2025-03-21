import React from 'react'
import Image  from 'next/image'


export default function ConfirmacionContraseña() {
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
             Para proteger tu cuenta ingresa el codigo de 6 digitos que acabamos de enviar a tu correo
            </p>
          </div>
          
          <form className="max-w-lg mx-auto mt-10">
            <div className="mb-4">
              <label className="block text-blue-800 text-2xl font-semibold">Código</label>
              <div className="flex gap-2 mt-4">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-10 h-12 text-center border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ))}
              </div>
              <div className="w-full mt-8 px-4 py-2 border border-yellow-500 rounded-lg bg-yellow-100 text-yellow-800 flex items-center">
            <img src="/caution.png" alt="Icono" className="w-6 h-6 mr-2" />
            <p>Al continuar se cerrará sesión en todos los dispositivos</p>
          </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-4 rounded-lg hover:bg-blue-600 transition mt-5"
            >
              Enviar 
            </button>
            <div className="mt-5 flex items-center">
  <p className="text-gray-600">¿No recibiste el codigo?</p>
  <h2 className="text-blue-800 cursor-pointer ml-7">Reenviar Codigo</h2>
</div>
          </form>
        </div>
      </div>
    </div>
  );
}
