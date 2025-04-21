import Image from "next/image";

export default function DownloadSection() {
  return (
    <section
      id="descargar"
      className="relative h-screen bg-[url(/images/team-in-field.jpg)] bg-cover bg-fixed bg-center bg-no-repeat flex items-center justify-center px-6 md:px-20"
    >
      {/* Overlay azul oscuro */}
      <div className="absolute inset-0 bg-blue-900/70 backdrop-blur-sm z-0"></div>

      {/* Contenido */}
      <div className="relative z-1 flex flex-col md:flex-row items-center gap-10 w-full max-w-6xl">
        {/* Imagen del móvil */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/images/movil.png"
            alt="Descargar la aplicación"
            width={300}
            height={600}
            className="drop-shadow-lg"
          />
        </div>

        {/* Texto y botón */}
        <div className="w-full md:w-1/2 text-center md:text-left text-white">
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            Lleva el fútbol contigo
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Descarga nuestra app móvil y entrena donde quieras. Seguimiento,
            estadísticas y entrenamientos personalizados en la palma de tu mano.
          </p>
          <a
            href="#"
            className="inline-block bg-white text-blue-800 font-semibold px-8 py-3 rounded-lg text-lg shadow-md hover:bg-blue-100 transition"
          >
            Descargar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
