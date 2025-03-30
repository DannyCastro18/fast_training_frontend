import Link from "next/link";

export default function HeroSection() {
  return (
    <header
      className="text-center py-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/futbol.jpg')" }}
    >
      <h2 className="text-4xl font-bold">
        Revoluciona tus entrenamientos de fútbol
      </h2>
      <p className="mt-4 text-lg">
        Planifica, administra y visualiza el progreso de tu equipo con
        estadísticas detalladas, todo desde una sola aplicación.
      </p>
      <Link href="/auth/login">
        <button className="mt-6 bg-[#205088] text-white px-6 py-3 rounded text-lg">
          Iniciar Sesión
        </button>
      </Link>
    </header>
  );
}