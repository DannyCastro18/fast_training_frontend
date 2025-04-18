'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Eye, EyeOff } from 'lucide-react';

export default function CambiarContrasenaModal({ isOpen, onClose }) {
    const [form, setForm] = useState({
        actual: '',
        nueva: '',
        confirmar: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        actual: false,
        nueva: false,
        confirmar: false
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            // Resetear el formulario al cerrar
            setForm({ actual: '', nueva: '', confirmar: '' });
            setError('');
            setSuccess('');
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const validatePassword = () => {
        const { nueva, confirmar } = form;
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&\-_])[A-Za-z\d@$!%*#?&\-_]{8,}$/;

        if (nueva !== confirmar) {
            setError('Las contraseñas no coinciden.');
            return false;
        }

        if (!regex.test(nueva)) {
            setError('La contraseña debe tener al menos 8 caracteres, incluir letras, números y un símbolo especial (@$!%*#?&-_).');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.actual || !form.nueva || !form.confirmar) {
            setError('Completa todos los campos.');
            return;
        }
    
        if (!validatePassword()) return;
    
        setLoading(true);
        try {
            const response = await api.put('/auth/cambiar-contrasena', {
                contrasenaActual: form.actual,
                nuevaContrasena: form.nueva,
                confirmacionContrasena: form.confirmar
            });
    
            if (!response.data.success) throw new Error(response.data.message);
    
            setSuccess('Contraseña actualizada correctamente.');
            setForm({ actual: '', nueva: '', confirmar: '' });
            
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err) {
            console.error('Error al cambiar contraseña:', err);
            setError(err.response?.data?.message || err.message || 'Error al cambiar la contraseña');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Fondo con difuminado */}
            <div 
                className="fixed inset-0 bg-black/30 backdrop-blur-sm" 
                onClick={onClose}
            />
            
            {/* Contenedor del modal */}
            <div className="flex items-center justify-center min-h-screen px-4">
                <div 
                    className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative z-10"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold text-[#205088] mb-4">
                        Cambiar contraseña
                    </h2>
                    <p className="text-gray-600 mb-6">
                        La nueva contraseña debe tener al menos 8 caracteres e incluir letras, números y símbolos especiales.
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                            <p>{error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                            <p>{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Contraseña actual */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña actual
                            </label>
                            <input
                                type={showPassword.actual ? "text" : "password"}
                                name="actual"
                                value={form.actual}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 text-gray-800 bg-white focus:ring-blue-500 focus:border-blue-500 transition pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('actual')}
                                className="absolute top-[34px] right-3 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword.actual ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Nueva contraseña */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nueva contraseña
                            </label>
                            <input
                                type={showPassword.nueva ? "text" : "password"}
                                name="nueva"
                                value={form.nueva}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 text-gray-800 bg-white focus:ring-blue-500 focus:border-blue-500 transition pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('nueva')}
                                className="absolute top-[34px] right-3 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword.nueva ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Confirmar nueva contraseña */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmar nueva contraseña
                            </label>
                            <input
                                type={showPassword.confirmar ? "text" : "password"}
                                name="confirmar"
                                value={form.confirmar}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 text-gray-800 bg-white focus:ring-blue-500 focus:border-blue-500 transition pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirmar')}
                                className="absolute top-[34px] right-3 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword.confirmar ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div className="flex justify-end mt-6 space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#205088] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[120px]"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Procesando...
                                    </>
                                ) : 'Actualizar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}