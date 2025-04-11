'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import ProfileImage from '@/components/perfilPage/ProfileImage';

export default function PerfilPage() {
    const router = useRouter();
    const [userData, setUserData] = useState({
        id: '',
        email: '',
        nombre: '',
        apellido: '',
        telefono: '',
        foto_perfil: '/default-profile.png'
    });
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        telefono: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                setError('');
                
                const response = await api.get('/usuario/actual', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                if (!response.data.success) {
                    throw new Error(response.data.message || 'Error al obtener datos');
                }

                let fotoUrl = response.data.data.foto_perfil || '/default-profile.png';
                if (fotoUrl.startsWith('uploads')) {
                    fotoUrl = `/${fotoUrl}`;
                }

                setUserData({
                    id: response.data.data.id,
                    email: response.data.data.email,
                    nombre: response.data.data.nombre || 'No especificado',
                    apellido: response.data.data.apellido || 'No especificado',
                    telefono: response.data.data.telefono || 'No especificado',
                    foto_perfil: fotoUrl
                });

                setFormData({
                    nombre: response.data.data.nombre || '',
                    apellido: response.data.data.apellido || '',
                    telefono: response.data.data.telefono || ''
                });

            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
                setError(error.response?.data?.message || error.message || 'Error al cargar el perfil');
                
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);
    
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('nombre', formData.nombre);
            formDataToSend.append('apellido', formData.apellido);
            formDataToSend.append('telefono', formData.telefono);
            
            if (previewImage) {
                const response = await fetch(previewImage);
                const blob = await response.blob();
                const file = new File([blob], 'profile.jpg', { type: blob.type });
                formDataToSend.append('foto_perfil', file);
            }
    
            const response = await api.put(`/usuarios/${userData.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.data.success) {
                setSuccess('Información actualizada correctamente');
                const newProfileImage = response.data.data.foto_perfil || userData.foto_perfil;
                
                setUserData(prev => ({
                    ...prev,
                    ...formData,
                    foto_perfil: newProfileImage
                }));
                setEditMode(false);
                setPreviewImage('');
                
                // Actualizar localStorage
                const user = JSON.parse(localStorage.getItem('userData'));
                const updatedUser = {
                    ...user,
                    persona: {
                        ...user.persona,
                        nombre: formData.nombre,
                        apellido: formData.apellido,
                        telefono: formData.telefono,
                        foto_perfil: response.data.data.foto_perfil || user.persona.foto_perfil
                    }
                };
                localStorage.setItem('userData', JSON.stringify(updatedUser));
                
                window.dispatchEvent(new Event('profileImageUpdated'));
            }
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            setError(error.response?.data?.message || 'Error al actualizar el perfil');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setError('Formato de imagen no válido. Usa JPG, PNG o WEBP.');
            return;
        }
    
        if (file.size > 5 * 1024 * 1024) {
            setError('La imagen debe ser menor a 5MB');
            return;
        }
    
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-4">Cargando perfil...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <main className="pt-20 pb-10">
                    <div className="max-w-4xl mx-auto p-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                            <p className="text-gray-700">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="pb-10">
                <div className="max-w-4xl mx-auto p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Configuración de Perfil</h1>
                    
                    {success && (
                        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                            <p>{success}</p>
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                            <p>{error}</p>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-700">Información Personal</h2>
                                {!editMode ? (
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
                                    >
                                        Editar
                                    </button>
                                ) : (
                                    <div className="space-x-2">
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className={`px-4 py-2 ${isSubmitting ? 'bg-blue-600' : 'bg-blue-700'} text-white rounded-lg hover:bg-blue-800 transition`}
                                        >
                                            {isSubmitting ? 'Guardando...' : 'Guardar'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditMode(false);
                                                setPreviewImage('');
                                                setFormData({
                                                    nombre: userData.nombre,
                                                    apellido: userData.apellido,
                                                    telefono: userData.telefono
                                                });
                                            }}
                                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Nombre</p>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                required
                                            />
                                        ) : (
                                            <p className="text-gray-800">{userData.nombre}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Apellido</p>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="apellido"
                                                value={formData.apellido}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                required
                                            />
                                        ) : (
                                            <p className="text-gray-800">{userData.apellido}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Teléfono</p>
                                        {editMode ? (
                                            <input
                                                type="tel"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                pattern="[0-9]{10,15}"
                                            />
                                        ) : (
                                            <p className="text-gray-800">{userData.telefono}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
                                        <p className="text-gray-800">{userData.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Foto de Perfil</h2>
                            <div className="flex flex-col items-center">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-4">
                                    <ProfileImage 
                                        src={previewImage || userData.foto_perfil} 
                                        alt="Foto de perfil" 
                                    />
                                </div>
                                {editMode && (
                                    <label className="cursor-pointer">
                                        <span className={`px-4 py-2 ${isSubmitting ? 'bg-blue-600' : 'bg-blue-700'} text-white rounded-lg hover:bg-blue-800 transition`}>
                                            Cambiar foto
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            disabled={isSubmitting}
                                        />
                                    </label>
                                )}
                                <p className="text-xs text-gray-500 mt-2">Formatos: JPEG, JPG, PNG, WEBP (max 5MB)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}