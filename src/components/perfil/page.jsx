'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Image from 'next/image';

export default function PerfilPage() {
    const router = useRouter();
    const [userData, setUserData] = useState({
        id: '',
        email: '',
        nombre: '',
        apellido: '',
        telefono: '',
        foto: ''
    });
    const [passwordData, setPasswordData] = useState({
        contrasenaActual: '',
        nuevaContrasena: '',
        confirmacionContrasena: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
            router.push('/auth/login');
            return;
            }

            const { data } = await api.get('/api/usuarios/me');
            setUserData(data.data);
            setPreviewImage(data.data.foto || '/default-profile.png');
        } catch (error) {
            console.error('Error fetching user data:', error);
            if (error.response?.status === 401) {
            router.push('/auth/login');
            }
        } finally {
            setLoading(false);
        }
        };

        fetchUserData();
    }, [router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };

    const validateProfileForm = () => {
        const newErrors = {};
        if (!userData.nombre.trim()) newErrors.nombre = 'Nombre es requerido';
        if (!userData.apellido.trim()) newErrors.apellido = 'Apellido es requerido';
        
        if (userData.telefono && !/^[0-9]{10,15}$/.test(userData.telefono)) {
        newErrors.telefono = 'Teléfono debe tener 10-15 dígitos';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePasswordForm = () => {
        const newErrors = {};
        
        if (!passwordData.contrasenaActual) {
        newErrors.contrasenaActual = 'Contraseña actual es requerida';
        }
        
        if (!passwordData.nuevaContrasena) {
        newErrors.nuevaContrasena = 'Nueva contraseña es requerida';
        } else if (passwordData.nuevaContrasena.length < 8) {
        newErrors.nuevaContrasena = 'La contraseña debe tener al menos 8 caracteres';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(passwordData.nuevaContrasena)) {
        newErrors.nuevaContrasena = 'Debe incluir mayúsculas, números y símbolos';
        }
        
        if (!passwordData.confirmacionContrasena) {
        newErrors.confirmacionContrasena = 'Confirmación es requerida';
        } else if (passwordData.nuevaContrasena !== passwordData.confirmacionContrasena) {
        newErrors.confirmacionContrasena = 'Las contraseñas no coinciden';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        if (!validateProfileForm()) return;

        try {
        const formData = new FormData();
        formData.append('nombre', userData.nombre);
        formData.append('apellido', userData.apellido);
        formData.append('telefono', userData.telefono);
        if (file) formData.append('foto', file);

        const { data } = await api.put(`/api/usuarios/${userData.id}`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        });

        setSuccessMessage(data.message || 'Información actualizada correctamente');
        setIsEditing(false);
        } catch (error) {
        console.error('Error updating profile:', error);
        setErrors({
            general: error.response?.data?.message || 'Error al actualizar perfil'
        });
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        if (!validatePasswordForm()) return;

        try {
        const { data } = await api.put(`/api/usuarios/${userData.id}/password`, passwordData);
        setSuccessMessage(data.message || 'Contraseña actualizada correctamente');
        setPasswordData({
            contrasenaActual: '',
            nuevaContrasena: '',
            confirmacionContrasena: ''
        });
        } catch (error) {
        console.error('Error changing password:', error);
        const errorMessage = error.response?.data?.message || 'Error al cambiar contraseña';
        
        if (error.response?.data?.code === 'INVALID_CURRENT_PASSWORD') {
            setErrors({ contrasenaActual: 'Contraseña actual incorrecta' });
        } else {
            setErrors({ general: errorMessage });
        }
        }
    };

    if (loading) {
        return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mi Perfil</h1>
        
        {successMessage && (
            <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
            <p>{successMessage}</p>
            </div>
        )}
        
        {errors.general && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <p>{errors.general}</p>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sección de información */}
            <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Información Personal</h2>
                {!isEditing && (
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Editar
                </button>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
                    <input
                        type="text"
                        name="nombre"
                        value={userData.nombre}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido*</label>
                    <input
                        type="text"
                        name="apellido"
                        value={userData.apellido}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded ${errors.apellido ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                        type="tel"
                        name="telefono"
                        value={userData.telefono}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Ej: 3101234567"
                    />
                    {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                    <input
                        type="email"
                        value={userData.email}
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                        readOnly
                    />
                    <p className="text-xs text-gray-500 mt-1">El correo no puede ser modificado</p>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                    type="button"
                    onClick={() => {
                        setIsEditing(false);
                        setErrors({});
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                    Cancelar
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                    >
                    Guardar Cambios
                    </button>
                </div>
                </form>
            ) : (
                <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <p className="text-sm font-medium text-gray-500">Nombre</p>
                    <p className="text-gray-800">{userData.nombre}</p>
                    </div>
                    <div>
                    <p className="text-sm font-medium text-gray-500">Apellido</p>
                    <p className="text-gray-800">{userData.apellido}</p>
                    </div>
                    <div>
                    <p className="text-sm font-medium text-gray-500">Teléfono</p>
                    <p className="text-gray-800">{userData.telefono || 'No especificado'}</p>
                    </div>
                    <div>
                    <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
                    <p className="text-gray-800">{userData.email}</p>
                    </div>
                </div>
                </div>
            )}
            </div>

            {/* Sección de imagen y contraseña */}
            <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Foto de Perfil</h2>
                
                <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-4">
                    <Image
                    src={previewImage || '/default-profile.png'}
                    alt="Foto de perfil"
                    fill
                    className="object-cover"
                    />
                </div>
                
                {isEditing && (
                    <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cambiar foto</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                    </div>
                )}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Cambiar Contraseña</h2>
                
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual*</label>
                    <input
                    type="password"
                    name="contrasenaActual"
                    value={passwordData.contrasenaActual}
                    onChange={handlePasswordChange}
                    className={`w-full p-2 border rounded ${errors.contrasenaActual ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.contrasenaActual && <p className="text-red-500 text-xs mt-1">{errors.contrasenaActual}</p>}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña*</label>
                    <input
                    type="password"
                    name="nuevaContrasena"
                    value={passwordData.nuevaContrasena}
                    onChange={handlePasswordChange}
                    className={`w-full p-2 border rounded ${errors.nuevaContrasena ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.nuevaContrasena && <p className="text-red-500 text-xs mt-1">{errors.nuevaContrasena}</p>}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña*</label>
                    <input
                    type="password"
                    name="confirmacionContrasena"
                    value={passwordData.confirmacionContrasena}
                    onChange={handlePasswordChange}
                    className={`w-full p-2 border rounded ${errors.confirmacionContrasena ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.confirmacionContrasena && <p className="text-red-500 text-xs mt-1">{errors.confirmacionContrasena}</p>}
                </div>
                
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Actualizar Contraseña
                </button>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
}