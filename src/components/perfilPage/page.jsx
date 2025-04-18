'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import ProfileImage from '@/components/perfilPage/ProfileImage';
import CambiarContrasenaModal from '@/components/perfilPage/CambiarContrasenaModal';

export default function PerfilPage() {
    const router = useRouter();
    const [userData, setUserData] = useState({
        id: '',
        email: '',
        nombre: '',
        apellido: '',
        telefono: '',
        foto_perfil: '/default-profile.png',
        rol: 'Usuario'
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
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await api.get('/usuario/actual');

                if (!response.data.success) {
                    throw new Error(response.data.message || 'Error al obtener datos');
                }

                const user = response.data.data;
                let fotoUrl = user.foto_perfil || '/default-profile.png';
                if (fotoUrl.startsWith('uploads') && !fotoUrl.startsWith('http')) {
                    fotoUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || ''}${fotoUrl}`;
                }

                setUserData({
                    id: user.id,
                    email: user.email,
                    nombre: user.nombre || 'No especificado',
                    apellido: user.apellido || 'No especificado',
                    telefono: user.telefono || 'No especificado',
                    foto_perfil: fotoUrl,
                    rol: user.rol_id === 1 ? 'Admin' : user.rol_id === 2 ? 'Entrenador' : 'Jugador'
                });

                setFormData({
                    nombre: user.nombre || '',
                    apellido: user.apellido || '',
                    telefono: user.telefono || ''
                });

            } catch (error) {
                console.error('Error al obtener datos:', error);
                setError(error.response?.data?.message || error.message || 'Error al cargar el perfil');
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userData');
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
        if (name === 'telefono') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: digitsOnly }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
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
            setError('');
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('nombre', formData.nombre);
            formDataToSend.append('apellido', formData.apellido);
            formDataToSend.append('telefono', formData.telefono);

            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput?.files?.[0]) {
                formDataToSend.append('foto_perfil', fileInput.files[0]);
            }

            const response = await api.put('/perfil', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Error al actualizar perfil');
            }

            setUserData(prev => ({
                ...prev,
                nombre: response.data.data.nombre,
                apellido: response.data.data.apellido,
                telefono: response.data.data.telefono,
                foto_perfil: response.data.data.foto_perfil ?
                    `${response.data.data.foto_perfil}?t=${Date.now()}` :
                    '/default-profile.png'
            }));

            setSuccess('Perfil actualizado correctamente');
            setEditMode(false);
            setPreviewImage('');

        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            setError(error.response?.data?.message || error.message || 'Error al actualizar el perfil');
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                router.push('/auth/login');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-4">Cargando perfil...</p>
            </div>
        );
    }

    if (error && !editMode) {
        return (
            <div className="min-h-screen bg-gray-50">
                <main className="pt-20 pb-10">
                    <div className="mx-auto p-6">
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
        <div className="w-full bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1">Mi cuenta</h1>
                    </div>
                </div>

                {success && (
                    <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                        <p>{success}</p>
                    </div>
                )}
                {error && editMode && (
                    <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                        <p>{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Foto de Perfil */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex flex-col items-center">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-4 group">
                                <ProfileImage src={previewImage || userData.foto_perfil} alt="Foto de perfil" />
                                <label className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6 3.536 3.536L12.5 16.5H9v-3.5z" />
                                    </svg>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Formatos: JPEG, PNG, WEBP (max 5MB)</p>
                        </div>
                    </div>

                    {/* Información Personal */}
                    <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
                        {/* Rol alineado a la derecha */}
                        <div className="flex justify-end mb-4">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {userData.rol}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {/* Nombre y Apellido */}
                            <div className="md:col-span-2">
                                <div className="flex items-center justify-between mb-1">
                                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                    {!editMode && (
                                        <button 
                                            onClick={() => setEditMode(true)}
                                            className="text-gray-500 hover:text-gray-700"
                                            title="Editar nombre"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                {editMode ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                type="text"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                                placeholder="Nombre"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                name="apellido"
                                                value={formData.apellido}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                                placeholder="Apellido"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-gray-800">
                                        {userData.nombre} {userData.apellido}
                                    </p>
                                )}
                            </div>

                            {/* Correo Electrónico */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                                <p className="text-gray-800">{userData.email}</p>
                            </div>

                            {/* Teléfono */}
                            <div className="md:col-span-2">
                                <div className="flex items-center justify-between mb-1">
                                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                                    {!editMode && (
                                        <button 
                                            onClick={() => setEditMode(true)}
                                            className="text-gray-500 hover:text-gray-700"
                                            title="Editar teléfono"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                        maxLength={10}
                                    />
                                ) : (
                                    <p className="text-gray-800">{userData.telefono}</p>
                                )}
                            </div>

                            {editMode && (
                                <div className="flex justify-end space-x-2 mt-6">
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
                                            setError('');
                                        }}
                                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                                        disabled={isSubmitting}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Seguridad - Cambiar Contraseña */}
                <hr className="my-6 border-gray-300" />
                <div className='mt-6'>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Seguridad</h2>
                    <p className="text-sm text-gray-500 mb-4">Al cambiar tu contraseña, se cerrará sesión en todos los dispositivos.</p>
                    <button
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="px-4 py-2 border-2 border-blue-600 text-black rounded-lg hover:bg-blue-800 transition-colors"
                    >
                        Cambiar contraseña
                    </button>
                </div>
                <CambiarContrasenaModal
                    isOpen={isPasswordModalOpen}
                    onClose={() => setIsPasswordModalOpen(false)}
                />
            </div>
        </div>
    );
}