"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function RestablecerModal({ isOpen, onClose }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (!token) {
            setError("El token no es válido o ha expirado.");
        }
    }, [token]);

    const validatePassword = () => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&\-_])[A-Za-z\d@$!%*#?&\-_]{8,}$/;

        if (nuevaContrasena !== confirmarContrasena) {
            setPasswordError("Las contraseñas no coinciden");
            return false;
        }
        if (!regex.test(nuevaContrasena)) {
            setPasswordError("La contraseña debe tener al menos 8 caracteres, incluir letras, números y un símbolo especial.");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword()) return;

        setMensaje(null);
        setError(null);
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/restablecer-contrasena", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, nuevaContrasena }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error al restablecer la contraseña.");

            setMensaje("Contraseña restablecida con éxito. Redirigiendo...");
            setTimeout(() => router.push("/auth/login"), 3000);
        } catch (err) {
            setError(err.message || "Error al restablecer contraseña.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 flex items-center justify-center">
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="h-120 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full p-4">
                <div className="flex flex-col md:flex-row h-full">
                    <div className="md:block md:w-1/2 bg-blue-900 relative rounded-xl overflow-hidden h-full">
                        <Image
                            src="/pantalla_login.png"
                            alt="Login background"
                            fill
                            className="object-cover object-center"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    <div className="w-full md:w-1/2 p-8 bg-white flex flex-col justify-center">
                        <button
                            onClick={onClose}
                            className="absolute right-2 top-2 z-10 p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-left mb-8">
                            <h1 className="text-3xl font-bold text-[#205088] mb-2">Restablecer Contraseña</h1>
                            <p className="text-gray-600">
                                Ingresa tu nueva contraseña. Debe tener al menos 8 caracteres e incluir letras, números y símbolos especiales.
                            </p>
                        </div>

                        {!token ? (
                            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                                <p>El token no es válido o ha expirado.</p>
                            </div>
                        ) : (
                            <>
                                {error && (
                                    <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                                        <p>{error}</p>
                                    </div>
                                )}

                                {mensaje && (
                                    <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                                        <p>{mensaje}</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={nuevaContrasena}
                                            onChange={(e) => setNuevaContrasena(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 text-white bg-[#205088] focus:ring-blue-500 focus:border-blue-500 transition pr-10"
                                            required
                                            autoComplete="new-password"
                                            minLength={8}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute top-[36px] right-3 text-white"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                                        <input
                                            id="confirmPassword"
                                            type={showConfirm ? "text" : "password"}
                                            value={confirmarContrasena}
                                            onChange={(e) => setConfirmarContrasena(e.target.value)}
                                            onBlur={validatePassword}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 text-white bg-[#205088] focus:ring-blue-500 focus:border-blue-500 transition pr-10"
                                            required
                                            autoComplete="new-password"
                                            minLength={8}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute top-[36px] right-3 text-white"
                                        >
                                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                        {passwordError && (
                                            <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                                        )}
                                    </div>

                                    <div className="pt-4 flex justify-center">
                                        <button
                                            type="submit"
                                            disabled={loading || !token || passwordError}
                                            className={`py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#205088] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {loading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Procesando...
                                                </>
                                            ) : 'Restablecer Contraseña'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}