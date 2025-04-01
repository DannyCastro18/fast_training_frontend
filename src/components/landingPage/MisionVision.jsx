import { FaBullseye, FaEye } from "react-icons/fa";

export default function MisionVision() {
    return (
        <section className="py-16 bg-white text-gray-900">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-center md:text-left">
            <MissionCard />
            <VisionCard />
            </div>
        </div>
        </section>
    );
}

function MissionCard() {
    return (
        <div className="p-6 border-r-0 md:border-r border-gray-300">
        <h3 className="text-2xl font-bold text-[#205088] flex items-center justify-center md:justify-start gap-2">
            <FaBullseye size={30} /> Misión
        </h3>
        <p className="mt-4 text-gray-700">
            La aplicación realiza un seguimiento exhaustivo de la evolución
            individual de cada futbolista durante el proceso de entrenamiento. 
            Impulsa el máximo rendimiento de los jugadores en el campo y propicia 
            la mejora continua de los equipos.
        </p>
        </div>
    );
}

function VisionCard() {
    return (
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
    );
}