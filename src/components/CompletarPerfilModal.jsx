'use client';
import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export default function CompletarPerfilModal({ role, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    ...(role === 'jugador' && { fecha_nacimiento: '' })
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [initialError, setInitialError] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const router = useRouter();

  // Verificar y cargar datos del perfil
  useEffect(() => {
    const checkAndLoadProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No se encontró token de autenticación');
        }

        const decoded = jwtDecode(token);
        if (!decoded.id || !['jugador', 'entrenador'].includes(role)) {
          throw new Error('Rol de usuario no válido');
        }

        // Verificar estado del perfil
        const checkResponse = await api.get(`/api/${role}/verificar-perfil`);
        const isComplete = checkResponse.data?.profileComplete ?? false;
        setProfileComplete(isComplete);

        if (isComplete) {
          setShowModal(false);
          onClose?.();
          return;
        }

        // Cargar datos existentes del perfil
        const profileResponse = await api.get(`/api/${role}/perfil`);
        const profileData = profileResponse.data?.data || {};

        setFormData({
          nombre: profileData.nombre || '',
          apellido: profileData.apellido || '',
          telefono: profileData.telefono || '',
          ...(role === 'jugador' && { 
            fecha_nacimiento: profileData.fecha_nacimiento?.split('T')[0] || '' 
          })
        });

        setShowModal(true);
      } catch (error) {
        console.error("Error verificando perfil:", error);
        setInitialError(
          error.response?.data?.message || 
          "Debes completar tu información de perfil para continuar"
        );
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    };

    checkAndLoadProfile();
  }, [role, onClose, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error si existe cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = {
      nombre: 'Nombre es requerido',
      apellido: 'Apellido es requerido',
      telefono: 'Teléfono es requerido',
      ...(role === 'jugador' && { fecha_nacimiento: 'Fecha de nacimiento es requerida' })
    };

    // Validar campos obligatorios
    Object.keys(requiredFields).forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = requiredFields[field];
      }
    });

    // Validar formato del teléfono
    if (formData.telefono && !/^[0-9]{10,15}$/.test(formData.telefono)) {
      newErrors.telefono = 'Teléfono debe tener entre 10 y 15 dígitos';
    }

    // Validar fecha de nacimiento para jugadores
    if (role === 'jugador' && formData.fecha_nacimiento) {
      const birthDate = new Date(formData.fecha_nacimiento);
      const today = new Date();
      const minAgeDate = new Date();
      minAgeDate.setFullYear(today.getFullYear() - 12); // Mínimo 12 años

      if (birthDate >= today) {
        newErrors.fecha_nacimiento = 'La fecha no puede ser futura';
      } else if (birthDate > minAgeDate) {
        newErrors.fecha_nacimiento = 'Debes tener al menos 12 años';
      }
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
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        telefono: formData.telefono.trim(),
        ...(role === 'jugador' && { 
          fecha_nacimiento: formData.fecha_nacimiento 
        })
      };

      const response = await api.put(`/api/${role}/perfil`, payload);

      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Error al guardar los datos');
      }

      // Actualizar estado y cerrar modal
      setProfileComplete(true);
      setShowModal(false);
      onClose?.();
      
      // Forzar recarga si es necesario
      router.refresh();
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      setErrors({
        general: error.response?.data?.message || 
                "Error al actualizar perfil. Por favor intenta nuevamente."
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Mostrar spinner mientras carga
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

  // No mostrar si el perfil está completo o no debe mostrarse
  if (!showModal || profileComplete) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">Completar Perfil</h2>
        
        {/* Mensajes de estado */}
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
          {/* Campo Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre*
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.nombre ? 'border-red-500' : 'border-gray-300'
              } ${submitting ? 'bg-gray-100' : ''}`}
              disabled={submitting}
              placeholder="Tu nombre"
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
            )}
          </div>

          {/* Campo Apellido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellido*
            </label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.apellido ? 'border-red-500' : 'border-gray-300'
              } ${submitting ? 'bg-gray-100' : ''}`}
              disabled={submitting}
              placeholder="Tu apellido"
            />
            {errors.apellido && (
              <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>
            )}
          </div>

          {/* Campo Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono*
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.telefono ? 'border-red-500' : 'border-gray-300'
              } ${submitting ? 'bg-gray-100' : ''}`}
              disabled={submitting}
              placeholder="Ej: 3101234567"
            />
            {errors.telefono && (
              <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
            )}
          </div>

          {/* Campo Fecha de Nacimiento (solo para jugadores) */}
          {role === 'jugador' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Nacimiento*
              </label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.fecha_nacimiento ? 'border-red-500' : 'border-gray-300'
                } ${submitting ? 'bg-gray-100' : ''}`}
                disabled={submitting}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.fecha_nacimiento && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fecha_nacimiento}
                </p>
              )}
            </div>
          )}

          {/* Botones de acción */}
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
                'Guardar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}