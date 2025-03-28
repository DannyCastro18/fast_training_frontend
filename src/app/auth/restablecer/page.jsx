"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Restablecer() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            setError("El token no es válido o ha expirado.");
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);
        setError(null);
        try {
            const res = await fetch("http://localhost:5000/api/auth/restablecer-contrasena", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, nuevaContrasena }),
            });            
    
            const data = await res.json();  // Obtener la respuesta como JSON
    
            if (!res.ok) throw new Error(data.message || "Error al restablecer la contraseña.");
    
            setMensaje("Contraseña restablecida con éxito. Redirigiendo...");
            setTimeout(() => router.push("/auth/login"), 3000);
        } catch (err) {
            setError(err.message || "Error al restablecer contraseña.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold text-blue-800 text-center mb-4">Restablecer Contraseña</h2>
                {!token ? (
                    <p className="text-red-600 text-center">El token no es válido o ha expirado.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 text-black">
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            className="w-full p-2 border rounded-lg"
                            value={nuevaContrasena}
                            onChange={(e) => setNuevaContrasena(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full p-2 text-white disabled:bg-gray-400 bg-blue-800 rounded-lg hover:bg-blue-700 transition"
                            disabled={loading}
                        >
                            {loading ? "Procesando..." : "Restablecer"}
                        </button>
                    </form>
                )}
                {mensaje && <p className="text-green-600 mt-3 text-center">{mensaje}</p>}
                {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
            </div>
        </div>
    );
}