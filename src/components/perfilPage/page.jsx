'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Image from 'next/image';
import Header from '@/components/shared/Header';

export default function PerfilPage() {
    const router = useRouter();
    const [userData, setUserData] = useState({
        id: '',
        email: '',
        nombre: '',
        apellido: '',
        telefono: '',
        foto_perfil: ''
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
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        contrasenaActual: '',
        nuevaContrasena: '',
        confirmacionContrasena: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [hasChanges, setHasChanges] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/auth/login');
                    return;
                }

                const user = JSON.parse(localStorage.getItem('userData'));
                const { data } = await api.get(`/api/usuarios/${user.id}`);
                
                setUserData({
                    id: data.data.id,
                    email: data.data.email,
                    nombre: data.data.nombre,
                    apellido: data.data.apellido,
                    telefono: data.data.telefono,
                    foto_perfil: data.data.foto_perfil || '/default-profile.png'
                });

                setFormData({
                    nombre: data.data.nombre,
                    apellido: data.data.apellido,
                    telefono: data.data.telefono || ''
                });
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

    // Efecto para detectar cambios en el formulario
    useEffect(() => {
        const initialData = {
            nombre: userData.nombre,
            apellido: userData.apellido,
            telefono: userData.telefono || ''
        };
        
        const hasFormChanges = JSON.stringify(formData) !== JSON.stringify(initialData);
        setHasChanges(hasFormChanges);
    }, [formData, userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
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
            const response = await api.put(`/api/usuarios/${userData.id}`, formData);
            
            if (response.data.success) {
                setSuccess('Información actualizada correctamente');
                setUserData(prev => ({
                    ...prev,
                    ...formData
                }));
                setEditMode(false);
                setHasChanges(false);
                
                // Actualizar datos en localStorage
                const user = JSON.parse(localStorage.getItem('userData'));
                localStorage.setItem('userData', JSON.stringify({
                    ...user,
                    persona: {
                        ...user.persona,
                        nombre: formData.nombre,
                        apellido: formData.apellido,
                        telefono: formData.telefono
                    }
                }));
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.response?.data?.message || 'Error al actualizar el perfil');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');
        setIsSubmitting(true);

        try {
            const response = await api.put(`/api/usuarios/${userData.id}/password`, passwordData);
            
            if (response.data.success) {
                setPasswordSuccess('Contraseña actualizada correctamente');
                setPasswordData({
                    contrasenaActual: '',
                    nuevaContrasena: '',
                    confirmacionContrasena: ''
                });
                setTimeout(() => {
                    setShowPasswordModal(false);
                    setIsSubmitting(false);
                }, 2000);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setPasswordError(error.response?.data?.message || 'Error al cambiar la contraseña');
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Crear previsualización
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);

        // Preparar para enviar
        const formData = new FormData();
        formData.append('foto_perfil', file);
        formData.append('nombre', userData.nombre);
        formData.append('apellido', userData.apellido);
        formData.append('telefono', userData.telefono || '');

        uploadImage(formData);
    };

    const uploadImage = async (formData) => {
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        try {
            const response = await api.put(`/api/usuarios/${userData.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                setSuccess('Foto de perfil actualizada correctamente');
                setUserData(prev => ({
                    ...prev,
                    foto_perfil: response.data.data.foto_perfil
                }));
                setPreviewImage(''); // Limpiar previsualización
                
                // Actualizar localStorage
                const user = JSON.parse(localStorage.getItem('userData'));
                localStorage.setItem('userData', JSON.stringify({
                    ...user,
                    persona: {
                        ...user.persona,
                        foto_perfil: response.data.data.foto_perfil
                    }
                }));
            }
        } catch (error) {
            console.error('Error updating profile image:', error);
            setError(error.response?.data?.message || 'Error al actualizar la foto de perfil');
        } finally {
            setIsSubmitting(false);
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
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pt-20 pb-10">
                <div className="max-w-4xl mx-auto p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Mi Perfil</h1>
                    
                    {/* Mensajes de éxito/error */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                            <p>{error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                            <p>{success}</p>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Sección de información */}
                        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-700">Información Personal</h2>
                                {!editMode ? (
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Editar
                                    </button>
                                ) : (
                                    <div className="space-x-2">
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!hasChanges || isSubmitting}
                                            className={`px-4 py-2 ${!hasChanges || isSubmitting ? 'bg-green-400' : 'bg-green-600'} text-white rounded-lg hover:bg-green-700 transition`}
                                        >
                                            {isSubmitting ? 'Guardando...' : 'Guardar'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditMode(false);
                                                setFormData({
                                                    nombre: userData.nombre,
                                                    apellido: userData.apellido,
                                                    telefono: userData.telefono || ''
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
                                            <p className="text-gray-800">{userData.telefono || 'No especificado'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
                                        <p className="text-gray-800">{userData.email}</p>
                                    </div>
                                </div>
                                
                                <div className="pt-4">
                                    <button
                                        onClick={() => setShowPasswordModal(true)}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Cambiar contraseña
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sección de imagen */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Foto de Perfil</h2>
                            <div className="flex flex-col items-center">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-4">
                                    <Image
                                        src={previewImage || userData.foto_perfil}
                                        alt="Foto de perfil"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                
                                <label className="cursor-pointer">
                                    <span className={`px-4 py-2 ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 transition`}>
                                        {isSubmitting ? 'Subiendo...' : 'Cambiar foto'}
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        disabled={isSubmitting}
                                    />
                                </label>
                                <p className="text-xs text-gray-500 mt-2">Formatos: JPEG, JPG, PNG, WEBP (max 5MB)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal para cambiar contraseña */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Cambiar Contraseña</h3>
                            <button
                                onClick={() => {
                                    setShowPasswordModal(false);
                                    setPasswordError('');
                                    setPasswordSuccess('');
                                }}
                                className="text-gray-400 hover:text-gray-500"
                                disabled={isSubmitting}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        {passwordError && (
                            <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                                <p>{passwordError}</p>
                            </div>
                        )}
                        {passwordSuccess && (
                            <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                                <p>{passwordSuccess}</p>
                            </div>
                        )}
                        
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
                                <input
                                    type="password"
                                    name="contrasenaActual"
                                    value={passwordData.contrasenaActual}
                                    onChange={handlePasswordChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    name="nuevaContrasena"
                                    value={passwordData.nuevaContrasena}
                                    onChange={handlePasswordChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    required
                                    minLength="8"
                                    disabled={isSubmitting}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Mínimo 8 caracteres, incluyendo mayúscula, número y símbolo
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
                                <input
                                    type="password"
                                    name="confirmacionContrasena"
                                    value={passwordData.confirmacionContrasena}
                                    onChange={handlePasswordChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    required
                                    minLength="8"
                                    disabled={isSubmitting}
                                />
                            </div>
                            
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        setPasswordError('');
                                        setPasswordSuccess('');
                                    }}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                                    disabled={isSubmitting}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className={`px-4 py-2 ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 transition`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Procesando...' : 'Cambiar Contraseña'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}