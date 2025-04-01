import Image from "next/image";

export default function AppDescargar() {
    return (
        <div className="bg-[#205088] text-white py-12 px-6 flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-1/2 flex justify-center">
            <Image
            src="/images/movil.png"
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
    );
}