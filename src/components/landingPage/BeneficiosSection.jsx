import Image from "next/image";

export default function BeneficiosSection() {
    return (
        <div className="bg-[#205088] text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-6">Beneficios principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <BeneficiosCard
            image="/icons/Cleats.jpg" 
            title="Entrenamientos personalizados" 
            />
            <BeneficiosCard 
            image="/icons/ComboChart.jpg" 
            title="Estadísticas detalladas" 
            />
            <BeneficiosCard 
            image="/icons/MultipleDevices.jpg" 
            title="Acceso desde cualquier lugar" 
            />
            <BeneficiosCard 
            image="/icons/uso.jpg" 
            title="Fácil de usar" 
            />
        </div>
        </div>
    );
}

function BeneficiosCard({ image, title }) {
    return (
        <div className="bg-white text-[#205088] p-6 rounded-lg flex flex-col items-center">
        <Image src={image} alt={title} width={60} height={60} />
        <p className="mt-4 text-sm font-semibold text-center">{title}</p>
        </div>
    );
}