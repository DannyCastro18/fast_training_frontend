import Image from "next/image";
import BenefitsCard from "./BenefitCard";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import PhonelinkOutlinedIcon from "@mui/icons-material/PhonelinkOutlined";

function BenefitsSection() {
  return (
    <section
      id="beneficios"
      className="text-white flex h-screen w-full bg-[#0b121a] "
    >
      <section className="flex justify-center items-center w-1/2 bg-[url(/images/polygon-bg.svg)] bg-cover">
        <figure
          width={100}
          height={100}
          className="aspect-square w-3/4 rounded-full overflow-hidden"
        >
          <img
            className="w-full h-full object-cover"
            src="/images/trainer-in-field.png"
            alt="Logo"
          />
        </figure>
      </section>
      <section className="flex flex-col py-24 px-9 w-1/2">
        <h2 className="text-3xl font-bold mb-8">Beneficios principales</h2>
        <div className="grid grid-cols-2 gap-4 gap-y-12">
          <BenefitsCard
            icon={<BoltOutlinedIcon />}
            title="Optimización del tiempo"
            description="Genera entrenamientos automáticos adaptados a
            tus objetivos en segundos"
          />
          <BenefitsCard
            icon={<ContentPasteSearchOutlinedIcon />}
            title="Control total"
            description="Seguimiento detallado del desarrollo de cada jugador"
          />
          <BenefitsCard
            icon={<InsightsOutlinedIcon />}
            title="Mejora el rendimiento"
            description="Genera estadísticas detalladas"
          />
          <BenefitsCard
            icon={<PhonelinkOutlinedIcon />}
            title="Accesibilidad"
            description="Accede en cualquier lugar y momento"
          />
        </div>
      </section>
    </section>
  );
}

export default BenefitsSection;
