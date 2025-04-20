"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useAdministradorData } from "@/context/AdministradorDataContext";
import { useEntrenadorData } from "@/context/EntrenadorDataContext";
import { useJugadorData } from "@/context/JugadorDataContext";

export default function VerificarPerfilModal({ role, onClose }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    ...(role === "jugador" && { fecha_nacimiento: "" }),
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [initialError, setInitialError] = useState(null);
  const router = useRouter();

  // Obtener datos del contexto según el rol
  const contextData = {
    admin: useAdministradorData(),
    entrenador: useEntrenadorData(),
    jugador: useJugadorData()
  }[role];

  // Verificar si el perfil está completo
  const isProfileComplete = (profileData) => {
    if (!profileData) return false;
    
    // Campos requeridos base para todos los roles
    const requiredFields = {
      nombre: profileData.nombre,
      apellido: profileData.apellido,
      telefono: profileData.telefono
    };

    // Para jugador agregamos fecha_nacimiento
    if (role === "jugador") {
      requiredFields.fecha_nacimiento = profileData.fecha_nacimiento;
    }

    // Verificar que todos los campos requeridos tengan valor
    return Object.values(requiredFields).every(
      value => value !== null && value !== undefined && value !== ""
    );
  };

  // Verificar y cargar datos del perfil
  useEffect(() => {
    const checkAndLoadProfile = async () => {
      try {
        setLoading(true);
        
        // Verificar si tenemos datos del contexto
        if (contextData && !contextData.loading) {
          const profileData = contextData[`${role}Data`]?.perfil || {};
          
          // Verificar si el perfil está completo según el contexto
          if (contextData[`${role}Data`]?.perfilCompleto || isProfileComplete(profileData)) {
            setShowModal(false);
            onClose?.();
            return;
          }

          // Cargar datos del contexto al formulario
          setFormData({
            nombre: profileData.nombre || "",
            apellido: profileData.apellido || "",
            telefono: profileData.telefono || "",
            ...(role === "jugador" && {
              fecha_nacimiento: profileData.fecha_nacimiento?.split("T")[0] || "",
            }),
          });
          setShowModal(true);
          return;
        }

        // Fallback: Obtener datos directamente de la API si el contexto no está disponible
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No se encontró token de autenticación");
        }

        const decoded = jwtDecode(token);
        if (!decoded.id || !["jugador", "entrenador", "admin"].includes(role)) {
          throw new Error("Rol de usuario no válido");
        }

        // Obtener datos existentes del perfil
        const response = await api.get(`/${role}/perfil/${decoded.id}`);
        
        if (!response.data?.success) {
          throw new Error(response.data?.message || "Error al obtener perfil");
        }

        const profileData = response.data.data || {};

        // Verificar si el perfil está completo
        if (isProfileComplete(profileData)) {
          setShowModal(false);
          onClose?.();
          return;
        }

        // Si no está completo, cargar datos en el formulario
        setFormData({
          nombre: profileData.nombre || "",
          apellido: profileData.apellido || "",
          telefono: profileData.telefono || "",
          ...(role === "jugador" && {
            fecha_nacimiento: profileData.fecha_nacimiento?.split("T")[0] || "",
          }),
        });

        setShowModal(true);
      } catch (error) {
        console.error("Error verificando perfil:", error);
        setInitialError(
          error.response?.data?.message || 
          error.message || 
          "Complete los datos requeridos"
        );
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    };

    checkAndLoadProfile();
  }, [role, onClose, contextData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "Nombre es requerido";
    if (!formData.apellido.trim()) newErrors.apellido = "Apellido es requerido";

    if (!formData.telefono) {
      newErrors.telefono = "Teléfono es requerido";
    } else if (!/^[0-9]{10}$/.test(formData.telefono)) {
      newErrors.telefono = "Teléfono debe tener 10 dígitos";
    }

    if (role === "jugador" && !formData.fecha_nacimiento) {
      newErrors.fecha_nacimiento = "Fecha de nacimiento es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
  
    if (!validateForm()) {
      setSubmitting(false);
      return;
    }
  
    try {
      const payload = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono,
        ...(role === "jugador" && {
          fecha_nacimiento: formData.fecha_nacimiento,
        }),
      };
  
      // Usar la función updateProfile del contexto si existe
      if (contextData?.updateProfile) {
        await contextData.updateProfile(payload);
      } else {
        // Fallback a la API directa
        await api.put(`/usuario/perfil`, payload);
        if (contextData?.refresh) {
          await contextData.refresh();
        }
      }

      // Verificar nuevamente si el perfil está completo
      let verification;
      if (contextData) {
        // Usar el contexto para verificar
        if (contextData.refresh) {
          await contextData.refresh();
        }
        verification = { data: { profileComplete: true } }; // Asumir éxito si no hay error
      } else {
        // Fallback a la API directa
        const verification = await api.get(`/${role}/verificar-perfil/${decoded.id}`);
      }

      if (!verification.data?.profileComplete) {
        throw new Error("Faltan campos por completar después de guardar");
      }
      
      setShowModal(false);
      onClose?.();
      router.refresh();
      
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      setErrors({
        general: error.message || "Error al actualizar perfil. Intente nuevamente."
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Cargando información del perfil...</p>
        </div>
      </div>
    );
  }

  // No mostrar si no es necesario (perfil completo o no hay que mostrar)
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">Completar Perfil</h2>
        {initialError && (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4 text-sm">
            {initialError}
          </div>
        )}

        {errors.general && (
          <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre*
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.nombre ? "border-red-500" : "border-gray-300"}`}
              disabled={submitting}
              placeholder="Tu nombre"
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellido*
            </label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.apellido ? "border-red-500" : "border-gray-300"}`}
              disabled={submitting}
              placeholder="Tu apellido"
            />
            {errors.apellido && (
              <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono*
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.telefono ? "border-red-500" : "border-gray-300"}`}
              disabled={submitting}
              placeholder="Ej: 3101234567"
            />
            {errors.telefono && (
              <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
            )}
          </div>

          {role === "jugador" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Nacimiento*
              </label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.fecha_nacimiento ? "border-red-500" : "border-gray-300"}`}
                disabled={submitting}
                max={new Date().toISOString().split("T")[0]}
              />
              {errors.fecha_nacimiento && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fecha_nacimiento}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                onClose?.();
              }}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
              disabled={submitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded transition ${
                submitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="inline-block animate-spin mr-2">↻</span>
                  Guardando...
                </>
              ) : (
                "Guardar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}