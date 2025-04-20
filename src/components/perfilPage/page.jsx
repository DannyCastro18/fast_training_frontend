'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import api from '@/lib/api';
import ProfileImage from '@/components/perfilPage/ProfileImage';
import CambiarContrasenaModal from '@/components/perfilPage/CambiarContrasenaModal';
import EditIcon from '@mui/icons-material/Edit';

export default function PerfilPage() {
    const router = useRouter();
    const { user, updateUser } = useUser();
    const fileInputRef = useRef(null);
    const [editMode, setEditMode] = useState(false);
    const [editImageMode, setEditImageMode] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        telefono: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [imageError, setImageError] = useState('');
    const [success, setSuccess] = useState('');
    const [imageSuccess, setImageSuccess] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isImageSubmitting, setIsImageSubmitting] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // Inicializar formData con los datos del usuario
    useEffect(() => {
        if (user) {
            setFormData({
                nombre: user.nombre || '',
                apellido: user.apellido || '',
                telefono: user.telefono || ''
            });
            setLoading(false);
        }
    }, [user]);

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
            setImageError('Formato de imagen no válido. Usa JPG, PNG o WEBP.');
            return;
        }
    
        if (file.size > 5 * 1024 * 1024) {
            setImageError('La imagen debe ser menor a 5MB');
            return;
        }
    
        setSelectedFile(file);
        setImageError('');
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUpdateImage = async () => {
        if (!selectedFile) {
            setImageError('Por favor selecciona una imagen');
            return;
        }

        setIsImageSubmitting(true);
        setImageError('');
        setImageSuccess('');

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('foto_perfil', selectedFile);

            const response = await api.put('/usuario/perfil/imagen', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Error al actualizar imagen');
            }

            let fotoUrl = response.data.data.foto_perfil || '/default-profile.png';
            if (fotoUrl.includes('res.cloudinary.com')) {
                fotoUrl = `${fotoUrl.split('?')[0]}?t=${Date.now()}`;
            }

            // Actualizar el contexto del usuario
            updateUser({ foto_perfil: fotoUrl });

            setImageSuccess('Imagen de perfil actualizada correctamente');
            setEditImageMode(false);
            setPreviewImage('');
            setSelectedFile(null);

            // Disparar evento para actualizar otros componentes
            window.dispatchEvent(new Event('profileImageUpdated'));

        } catch (error) {
            console.error('Error al actualizar imagen:', error);
            setImageError(error.response?.data?.message || error.message || 'Error al actualizar la imagen');
        } finally {
            setIsImageSubmitting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.put('/usuario/perfil', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Error al actualizar perfil');
            }

            // Actualizar el contexto del usuario
            updateUser({
                nombre: response.data.data.nombre,
                apellido: response.data.data.apellido,
                telefono: response.data.data.telefono
            });

            setSuccess('Perfil actualizado correctamente');
            setEditMode(false);

        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            setError(error.response?.data?.message || error.message || 'Error al actualizar el perfil');
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
                {imageSuccess && (
                    <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                        <p>{imageSuccess}</p>
                    </div>
                )}
                {error && editMode && (
                    <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                        <p>{error}</p>
                    </div>
                )}
                {imageError && (
                    <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                        <p>{imageError}</p>
                    </div>
                )}
    
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Foto de Perfil*/}
                    <div className="md:col-span-1 bg-white rounded-lg shadow p-6">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-4">
                            <ProfileImage 
                                src={previewImage || user.foto_perfil} 
                                alt="Foto de perfil"
                            />
                            <div 
                                className="absolute inset-0 flex items-end justify-end p-2 bg-black/30 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                                onClick={() => setEditImageMode(true)}
                            >
                                <div className="bg-white rounded-full p-1.5 shadow-md">
                                    <EditIcon className="text-gray-700" style={{ fontSize: 16 }} />
                                </div>
                            </div>
                        </div>
                        
                        {editImageMode && (
                            <div className="w-full space-y-2">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Seleccionar imagen
                                </button>
                                {previewImage && (
                                    <button
                                        onClick={() => {
                                            setPreviewImage('');
                                            setSelectedFile(null);
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = '';
                                            }
                                        }}
                                        className="w-full px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                    >
                                        Eliminar selección
                                    </button>
                                )}
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleUpdateImage}
                                        disabled={!selectedFile || isImageSubmitting}
                                        className={`flex-1 px-4 py-2 ${(!selectedFile || isImageSubmitting) ? 'bg-blue-400' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 transition`}
                                    >
                                        {isImageSubmitting ? 'Guardando...' : 'Guardar'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditImageMode(false);
                                            setPreviewImage('');
                                            setSelectedFile(null);
                                            setImageError('');
                                        }}
                                        className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">Formatos: JPEG, PNG, WEBP (max 5MB)</p>
                    </div>
    
                    {/* Información Personal */}
                    <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
                        <div className="flex justify-end mb-4">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {user.rol}
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
                                        {user.nombre} {user.apellido}
                                    </p>
                                )}
                            </div>
    
                            {/* Correo Electrónico */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                                <p className="text-gray-800">{user.email}</p>
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
                                    <p className="text-gray-800">{user.telefono}</p>
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
                                            setFormData({
                                                nombre: user.nombre,
                                                apellido: user.apellido,
                                                telefono: user.telefono
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