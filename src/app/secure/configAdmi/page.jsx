"use client";
import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";

export default function ProfilePage() {
  const [persona, setPersona] = useState({
    nombre: "",
    correo: "",
    rol: ""
  });
  const [personas, setPersonas] = useState([]);
  const [mostrarListaPersonas, setMostrarListaPersonas] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  
  // ID de la persona - podría venir de un contexto o autenticación
  const personaId = 1;

  // Función para obtener todas las personas
  const obtenerPersonas = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/personas');
      
      if (!response.ok) {
        throw new Error('Error al obtener datos de personas');
      }
      
      const data = await response.json();
      console.log("Lista de personas:", data);
      setPersonas(data);
      setMostrarListaPersonas(true);
    } catch (err) {
      console.error("Error al obtener personas:", err);
      setError("No se pudo cargar la información de personas");
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener datos de una persona específica
  const obtenerPersona = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/personas/${personaId}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener datos de la persona');
      }
      
      const data = await response.json();
      setPersona({
        nombre: data.nombre || "Sin nombre",
        correo: data.correo || "Sin correo",
        rol: data.rol || "Sin rol"
      });
    } catch (err) {
      console.error("Error al obtener persona:", err);
      setError("No se pudo cargar la información de la persona");
    } finally {
      setLoading(false);
    }
  };

  // Función para crear una nueva persona
  const crearPersona = async (nuevaPersona) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/personas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaPersona),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear persona');
      }
      
      const data = await response.json();
      setSuccessMessage("Persona creada exitosamente");
      setTimeout(() => setSuccessMessage(""), 3000);
      
      // Refrescar la lista de personas si está visible
      if (mostrarListaPersonas) {
        obtenerPersonas();
      }
      
      return data;
    } catch (err) {
      console.error("Error al crear persona:", err);
      setError("No se pudo crear la persona");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar datos de una persona
  const actualizarPersona = async (datosActualizados) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/personas/${personaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosActualizados),
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar persona');
      }
      
      const data = await response.json();
      setSuccessMessage("Datos actualizados exitosamente");
      setTimeout(() => setSuccessMessage(""), 3000);
      
      // Actualizar el estado local con los nuevos datos
      setPersona(prevState => ({
        ...prevState,
        ...datosActualizados
      }));
      
      return data;
    } catch (err) {
      console.error("Error al actualizar persona:", err);
      setError("No se pudieron actualizar los datos");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar una persona
  const eliminarPersona = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta cuenta? Esta acción no se puede deshacer.")) {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/personas/${personaId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Error al eliminar la cuenta');
        }
        
        setSuccessMessage("Cuenta eliminada exitosamente");
        setTimeout(() => {
          // Redireccionar al login o página principal
          window.location.href = "/login";
        }, 3000);
      } catch (err) {
        console.error("Error al eliminar cuenta:", err);
        setError("No se pudo eliminar la cuenta");
        setTimeout(() => setError(""), 3000);
      } finally {
        setLoading(false);
      }
    }
  };

  // Función para cambiar contraseña
  const cambiarContrasena = async (nuevaContrasena) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/personas/${personaId}/contrasena`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contrasena: nuevaContrasena }),
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
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos de la persona al montar el componente
  useEffect(() => {
    obtenerPersona();
  }, []);

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
              className="rounded-full border-4 border-azul-principal object-cover"
            />
          </div>
          {/* Botón para listar todas las personas */}
          <button
            onClick={obtenerPersonas}
            className="mt-4 px-4 py-2 bg-azul-principal text-white rounded-lg hover:bg-azul-principal transition"
          >
            {mostrarListaPersonas ? "Ocultar personas" : "Ver todas las personas"}
          </button>
          
          {/* Lista de personas */}
          {mostrarListaPersonas && (
            <div className="mt-6 w-full px-4">
              <h3 className="text-xl font-semibold mb-2">Lista de Personas</h3>
              {loading ? (
                <p>Cargando...</p>
              ) : (
                <ul className="bg-white border rounded-lg divide-y">
                  {personas.map((p) => (
                    <li key={p.id} className="p-3 hover:bg-gray-50">
                      <div className="font-medium">{p.nombre}</div>
                      <div className="text-sm text-gray-600">{p.correo}</div>
                      <div className="text-xs text-gray-500">Rol: {p.rol}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Contenido principal */}
        <main className="w-[600px] p-6">
          {loading && !mostrarListaPersonas ? (
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
                    value={persona.nombre}
                    className="w-full h-[50px] bg-gray-300 text-gray-600 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-azul-principal font-medium text-2xl mb-4">Correo Electrónico</label>
                  <input
                    type="email"
                    value={persona.correo}
                    className="w-full h-[50px] bg-gray-300 text-gray-600 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-azul-principal font-medium text-2xl mb-4">Rol</label>
                  <input
                    type="text"
                    value={persona.rol}
                    className="w-full h-[50px] bg-gray-300 text-gray-600 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>
                {/* Botón para actualizar */}
                <button
                  onClick={() => {
                    // Aquí podrías abrir un modal o formulario para editar
                    const nuevoNombre = prompt("Introduce el nuevo nombre:", persona.nombre);
                    const nuevoCorreo = prompt("Introduce el nuevo correo:", persona.correo);
                    
                    if (nuevoNombre && nuevoCorreo) {
                      actualizarPersona({
                        nombre: nuevoNombre,
                        correo: nuevoCorreo
                      });
                    }
                  }}
                  className="mt-4 w-full px-4 py-2 bg-azul-principal text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Editar información
                </button>
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
          onClick={eliminarPersona}
        >
          Eliminar Cuenta
        </button>
      </div>

      {/* Sección para crear nueva persona */}
      <div className="text-center p-6 border-t-2 border-gray-300">
        <h2 className="text-2xl font-bold text-azul-principal">Crear Nueva Persona</h2>
        <p className="text-gray-700 mt-2">Añade un nuevo usuario al sistema</p>
        <button 
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          onClick={() => {
            const nombre = prompt("Introduce el nombre:");
            const correo = prompt("Introduce el correo electrónico:");
            const rol = prompt("Introduce el rol (Administrador, Usuario, etc.):");
            const password = prompt("Introduce la contraseña:");
            
            if (nombre && correo && rol) {
              crearPersona({
                nombre: nombre,
                correo: correo,
                rol: rol,
                password: password || 'default123'
              });
            }
          }}
        >
          Crear Persona
        </button>
      </div>
    </div>
  );
}