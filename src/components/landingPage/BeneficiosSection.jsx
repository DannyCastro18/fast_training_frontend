import Image from "next/image";
import BeneficiosCard from "./BeneficiosCard";

function BeneficiosSection() {
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

export default BeneficiosSection;
