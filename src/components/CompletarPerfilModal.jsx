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
    fecha_nacimiento: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const decoded = jwtDecode(token);
        const userId = decoded.id;
        
        // Obtener datos del usuario y persona
        const usuarioResponse = await api.get(`/api/usuarios/${userId}`);
        const personaResponse = await api.get(`/api/personas/${usuarioResponse.data.persona_id}`);
        
        // Obtener perfil específico según el rol
        let perfilData;
        if (role === 'jugador') {
          // Cambio en la ruta según jugadorRoutes.js
          perfilData = await api.get(`/api/jugador/usuario/${userId}`);
        } else if (role === 'entrenador') {
          // Cambio en la ruta según entrenadorRoutes.js
          perfilData = await api.get(`/api/entrenador/usuario/${userId}`);
        }

        // Combinar datos de persona con el perfil específico
        const perfilCompleto = {
          nombre: personaResponse.data.nombre,
          apellido: personaResponse.data.apellido,
          telefono: personaResponse.data.telefono || '',
          ...perfilData.data
        };

        // Verificar si el perfil está completo
        const camposRequeridos = ['nombre', 'apellido'];
        if (role === 'jugador') {
          camposRequeridos.push('fecha_nacimiento');
        }

        const perfilIncompleto = camposRequeridos.some(campo => !perfilCompleto[campo]);

        if (perfilIncompleto) {
          setFormData(prev => ({
            ...prev,
            ...perfilCompleto,
            fecha_nacimiento: perfilCompleto.fecha_nacimiento?.split('T')[0] || ''
          }));
          setShowModal(true);
        } else {
          setShowModal(false);
          onClose?.();
        }
      } catch (error) {
        console.error("Error checking profile:", error);
        if (error.message === 'No token found' || error.response?.status === 401) {
          router.push('/auth/login');
          return;
        }
        setErrors({ 
          general: error.response?.data?.message || 
                  "Error al verificar perfil. Intente recargar la página." 
        });
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [role, onClose, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = 'Nombre es requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'Apellido es requerido';
    
    if (role === 'jugador' && !formData.fecha_nacimiento) {
      newErrors.fecha_nacimiento = 'Fecha de nacimiento es requerida';
    } else if (role === 'jugador' && formData.fecha_nacimiento) {
      const birthDate = new Date(formData.fecha_nacimiento);
      const today = new Date();
      if (birthDate >= today) {
        newErrors.fecha_nacimiento = 'La fecha no puede ser futura';
      }
    }
    
    if (formData.telefono && !/^[0-9]{10,15}$/.test(formData.telefono)) {
      newErrors.telefono = 'Teléfono debe tener 10-15 dígitos';
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
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      // Actualizar datos de persona
      const personaData = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono
      };

      // Actualizar datos específicos según el rol
      if (role === 'jugador') {
        // Cambio en la ruta según jugadorRoutes.js
        await api.put(`/api/jugador-info/${userId}`, {
          fecha_nacimiento: formData.fecha_nacimiento,
          ...personaData
        });
      } else if (role === 'entrenador') {
        // Cambio en la ruta según entrenadorRoutes.js
        await api.put(`/api/entrenador/perfil`, personaData);
      }

      setShowModal(false);
      onClose?.();
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({
        general: error.response?.data?.message || 
                "Error al actualizar perfil. Intente nuevamente."
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">Completar Perfil</h2>
        
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
              className={`w-full p-2 border rounded ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
              disabled={submitting}
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
              className={`w-full p-2 border rounded ${errors.apellido ? 'border-red-500' : 'border-gray-300'}`}
              disabled={submitting}
            />
            {errors.apellido && (
              <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
              disabled={submitting}
              placeholder="Ej: 3101234567"
            />
            {errors.telefono && (
              <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
            )}
          </div>

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
                className={`w-full p-2 border rounded ${errors.fecha_nacimiento ? 'border-red-500' : 'border-gray-300'}`}
                disabled={submitting}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.fecha_nacimiento && (
                <p className="text-red-500 text-xs mt-1">{errors.fecha_nacimiento}</p>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
              disabled={submitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="inline-block animate-spin mr-2">↻</span>
                  Guardando...
                </>
              ) : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}