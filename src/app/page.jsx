import Image from "next/image";
import Link from "next/link";
import LandingHeader from "@/components/landingPage/LandingHeader";
import LandingFooter from "@/components/landingPage/LandingFooter";
import {
  FaRunning,
  FaChartBar,
  FaMobileAlt,
  FaHandPointer,
  FaBullseye,
  FaEye,
  FaUserCircle,
  FaXTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Navbar */}
      <LandingHeader />
      {/* Hero Section */}
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
      {/*beneficios*/}

      <div className="bg-[#205088] text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-6">Beneficios principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white text-[#205088] p-6 rounded-lg flex flex-col items-center">
            <Image
              src="/icons/Cleats.jpg"
              alt="Entrenamientos personalizados"
              width={60}
              height={60}
            />
            <p className="mt-4 text-sm font-semibold text-center">
              Entrenamientos personalizados
            </p>
          </div>
          <div className="bg-white text-[#205088] p-6 rounded-lg flex flex-col items-center">
            <Image
              src="/icons/ComboChart.jpg"
              alt="Estadísticas detalladas"
              width={60}
              height={60}
            />
            <p className="mt-4 text-sm font-semibold text-center">
              Estadísticas detalladas
            </p>
          </div>
          <div className="bg-white text-[#205088] p-6 rounded-lg flex flex-col items-center">
            <Image
              src="/icons/MultipleDevices.jpg"
              alt="Acceso desde cualquier lugar"
              width={60}
              height={60}
            />
            <p className="mt-4 text-sm font-semibold text-center">
              Acceso desde cualquier lugar
            </p>
          </div>
          <div className="bg-white text-[#205088] p-6 rounded-lg flex flex-col items-center">
            <Image src="/icons/uso.jpg" alt="Fácil de usar" width={60} height={60} />
            <p className="mt-4 text-sm font-semibold text-center">
              Fácil de usar
            </p>
          </div>
        </div>
      </div>

      {/* Descarga la aplicación */}
      <div className="bg-[#205088] text-white py-12 px-6 flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/movil.jpg"
            alt="Descargar la aplicación"
            width={400}
            height={400}
            className="shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
          <h2 className="text-2xl font-bold">
            Disponible para descargar la aplicación móvil
          </h2>
          <button className="mt-4 bg-white text-blue-800 px-6 py-3 rounded text-lg font-semibold">
            Descárgala aquí
          </button>
        </div>
      </div>

      {/* Misión y Visión */}
      <section className="py-16 bg-white text-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-center md:text-left">
            <div className="p-6 border-r-0 md:border-r border-gray-300">
              <h3 className="text-2xl font-bold text-[#205088] flex items-center justify-center md:justify-start gap-2">
                <FaBullseye size={30} /> Misión
              </h3>
              <p className="mt-4 text-gray-700">
                La aplicación realiza un seguimiento exhaustivo de la evolución
                individual de cada futbolista durante el proceso de
                entrenamiento. Impulsa el máximo rendimiento de los jugadores en
                el campo y propicia la mejora continua de los equipos.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#205088] flex items-center justify-center md:justify-start gap-2">
                <FaEye size={30} /> Visión
              </h3>
              <p className="mt-4 text-gray-700">
                Para 2030 la app deportiva será reconocida a nivel nacional como
                potencia en software de creación de mesociclos. Recopilando las
                estadísticas para transformarlas en mejoras tangibles en el
                rendimiento individual y colectivo de los equipos de fútbol
                colombiano. Se estima que para 2030 el aproximado de usuarios
                sea el 80% de escuelas de fútbol del país.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <LandingFooter />
    </div>
  );
}
