"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import api from "@/lib/api";
import Image from "next/image";
import { TextField, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#e3f2fd",
    },
    "&:hover fieldset": {
      borderColor: "#00e0ff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00e0ff",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#e3f2fd",
    "&.Mui-focused": {
      color: "#00e0ff",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#e3f2fd",
  },
});
export default function LoginForm({ isOpen, onClose, onRecuperarClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", { email, password });

      if (!data.success || !data.token) {
        throw new Error(data.message || "Error en la autenticación");
      }

      localStorage.setItem("id", data.user.id);
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          roleName: data.user.roleName,
          persona: data.user.persona,
        }),
      );

      const redirectPath =
        {
          admin: "/admin/inicio",
          entrenador: "/entrenador/inicio",
          jugador: "/jugador/inicio",
        }[data.user.roleName] || "/";

      router.push(redirectPath);
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Error al iniciar sesión";

      if (error.response) {
        const backendError = error.response.data;
        errorMessage = backendError.message || "Error en el servidor";

        if (backendError.code === "USER_NOT_FOUND") {
          errorMessage = "Usuario no encontrado";
        } else if (backendError.code === "INVALID_CREDENTIALS") {
          errorMessage = "Credenciales incorrectas";
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signIn("google", { callbackUrl: "/jugador/inicio" });
    } catch (error) {
      console.error("Google sign in error:", error);
      setError("Error al iniciar sesión con Google");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 text-[#e3f2fd] overflow-y-auto bg-black/50 flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity" onClick={onClose}>
        <div className="absolute inset-0 z-0"></div>
      </div>

      <div className="h-11/12 bg-[#0b121a] rounded-lg text-left overflow-hidden  transform transition-all m-auto sm:max-w-4xl sm:w-full p-4 z-50">
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:block md:w-1/2 bg-[url('/images/player-in-jogo.png')] bg-bottom bg-cover rounded-xl overflow-hidden h-full"></div>

          <div className="w-full md:w-1/2 p-8 flex flex-col">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="right-2 top-2 z-10 p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Cerrar</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="text-left mb-8">
              <h1 className="text-3xl font-bold mb-2">Iniciar Sesión</h1>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div>
                <CustomTextField
                  fullWidth
                  label="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  required
                />
              </div>

              <div>
                <CustomTextField
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  label="Contraseña"
                  required
                  autoComplete="current-password"
                  fullWidth
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h2 className="text-sm text-gray-600">
                    Olvidé mi contraseña
                  </h2>
                </div>

                <div className="text-sm">
                  <button
                    type="button"
                    onClick={onRecuperarClick}
                    className="font-medium text-[#00e0ff] hover:text-blue-500"
                  >
                    Recuperar contraseña
                  </button>
                </div>
              </div>
              <div className="my-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-gray-300"></div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                  >
                    <Image
                      src="/icons/search.png"
                      alt="Google"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Continuar con Google
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-1/2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#205088] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Cargando...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
