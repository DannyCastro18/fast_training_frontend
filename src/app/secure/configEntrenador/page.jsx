"use client";
import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";

export default function ProfilePage() {
  const [entrenador, setEntrenador] = useState({
    id: null,
    email: "",
    persona_id: null,
    rol_id: null,
    persona: {
      nombre: "",
      apellido: ""
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // ID del entrenador - podría venir de un contexto o autenticación
  const entrenadorId = 1;

  // Función para obtener datos de un entrenador específico
  const obtenerEntrenador = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/entrenador/${entrenadorId}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener datos del entrenador');
      }
      
      const data = await response.json();
      setEntrenador(data);
    } catch (err) {
      console.error("Error al obtener entrenador:", err);
      setError("No se pudo cargar la información del entrenador");
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener lista de todos los entrenadores
  const obtenerTodosEntrenadores = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/entrenador/ver');
      
      if (!response.ok) {
        throw new Error('Error al obtener lista de entrenadores');
      }
      
      const data = await response.json();
      console.log("Lista de entrenadores:", data);
      // Aquí podrías mostrar esta lista en otro componente o sección
    } catch (err) {
      console.error("Error al obtener lista de entrenadores:", err);
    }
  };

  // Función para crear un nuevo entrenador
  const crearEntrenador = async (nuevoEntrenador) => {
    try {
      const response = await fetch('http://localhost:5000/api/entrenador/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEntrenador),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear entrenador');
      }
      
      const data = await response.json();
      setSuccessMessage("Entrenador creado exitosamente");
      setTimeout(() => setSuccessMessage(""), 3000);
      return data;
    } catch (err) {
      console.error("Error al crear entrenador:", err);
      setError("No se pudo crear el entrenador");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Función para actualizar datos de un entrenador
  const actualizarEntrenador = async (datosActualizados) => {
    try {
      const response = await fetch(`http://localhost:5000/api/entrenador/${entrenadorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosActualizados),
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar entrenador');
      }
      
      const data = await response.json();
      setSuccessMessage("Datos actualizados exitosamente");
      setTimeout(() => setSuccessMessage(""), 3000);
      
      // Actualizar el estado local con los nuevos datos
      obtenerEntrenador(); // Re-fetch para obtener los datos actualizados
      
      return data;
    } catch (err) {
      console.error("Error al actualizar entrenador:", err);
      setError("No se pudieron actualizar los datos");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Función para eliminar la cuenta del entrenador
  const eliminarCuenta = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      try {
        const response = await fetch(`http://localhost:5000/api/entrenador/${entrenadorId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Error al eliminar la cuenta');
        }
        
        // Redireccionar al login o página principal
        window.location.href = "/login";
      } catch (err) {
        console.error("Error al eliminar cuenta:", err);
        setError("No se pudo eliminar la cuenta");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  // Función para cambiar contraseña
  const cambiarContrasena = async (nuevaContrasena) => {
    try {
      const response = await fetch(`http://localhost:5000/api/entrenador/${entrenadorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: nuevaContrasena }),
      });
      
      if (!response.ok) {
        throw new Error('Error al cambiar contraseña');
      }
      
      setSuccessMessage("Contraseña cambiada exitosamente. Se cerrará la sesión en breve.");
      setTimeout(() => {
        setSuccessMessage("");
        // Redireccionar al login
        window.location.href = "/login";
      }, 3000);
    } catch (err) {
      console.error("Error al cambiar contraseña:", err);
      setError("No se pudo cambiar la contraseña");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Cargar datos del entrenador al montar el componente
  useEffect(() => {
    obtenerEntrenador();
  }, []);

  // Determinar el nombre del rol basado en rol_id
  const getRolName = (rolId) => {
    if (rolId === 3) return "Entrenador";
    if (rolId === 2) return "Usuario";
    if (rolId === 1) return "Administrador";
    return "Desconocido";
  };

  // Formatear el nombre completo
  const nombreCompleto = entrenador.persona ? 
    `${entrenador.persona.nombre || ""} ${entrenador.persona.apellido || ""}` : 
    "Usuario";

  return (
    <div className="flex flex-col min-h-screen bg-white w-[100%] pl-[95px]">
      {/* Encabezado */}
      <header className="w-[100%] bg-white py-4 px-6 flex items-center justify-between">
        <Image src="/Fast_largo.png" alt="Logo" width={150} height={120} />
        <input
          type="text"
          placeholder="Buscar..."
          className="border border-gray-300 bg-blue-100 mr-10 px-2 py-2 rounded-lg w-[800px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </header>

      {/* Mensajes de éxito o error */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mx-6 mt-4">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-6 mt-4">
          {error}
        </div>
      )}

      <div className="flex p-6">
        {/* Menú lateral */}
        <div className="w-[50%] flex flex-col items-center pt-14">
          <h2 className="text-2xl font-semibold mb-4 text-azul-principal">Mi Cuenta</h2>
          <div className="w-52 h-52 flex justify-center items-center">
            <Image
              src="/usuario.png"
              alt="Perfil"
              width={300}
              height={300}
              className="rounded-full border-4 border-blue-500 object-cover"
            />
          </div>
        </div>

        {/* Contenido principal */}
        <main className="w-[600px] p-6">
          {loading ? (
            <div className="text-center py-12">
              <p>Cargando datos...</p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-azul-principal text-2xl font-medium mb-4">Nombre</label>
                  <input
                    type="text"
                    value={nombreCompleto}
                    className="w-full h-[50px] bg-gray-300 text-gray-600 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-azul-principal font-medium text-2xl mb-4">Correo Electrónico</label>
                  <input
                    type="email"
                    value={entrenador.email || ""}
                    className="w-full h-[50px] bg-gray-300 text-gray-600 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-azul-principal font-medium text-2xl mb-4">Rol</label>
                  <input
                    type="text"
                    value={getRolName(entrenador.rol_id)}
                    className="w-full h-[50px] bg-gray-300 text-gray-600 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Línea separadora */}
      <hr className="border-t-2 border-gray-300 my-6" />

      {/* Sección de seguridad */}
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold text-azul-principal">Seguridad</h2>
        <p className="text-gray-700 mt-2">Al cambiar tu contraseña, se cerrará sesión en todos los dispositivos</p>
        <button 
          className="mt-4 px-6 py-2 bg-azul-principal text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => {
            const nuevaContrasena = prompt("Introduce tu nueva contraseña:");
            if (nuevaContrasena) {
              cambiarContrasena(nuevaContrasena);
            }
          }}
        >
          Cambiar Contraseña
        </button>
      </div>

      {/* Línea separadora */}
      <hr className="border-t-2 border-gray-300 my-6" />

      {/* Sección de eliminación de cuenta */}
      <div className="text-center p-6">
        <p className="text-gray-700 mt-2">Si eliminas tu cuenta no podrás tener acceso a ningún tipo de información que proporcione tu entrenador en Fast Training</p>
        <button 
          className="mt-4 px-6 py-2 bg-azul-principal text-white rounded-lg hover:bg-blue-700 transition"
          onClick={eliminarCuenta}
        >
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
}