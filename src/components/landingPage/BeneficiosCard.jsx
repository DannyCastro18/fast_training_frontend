import Image from "next/image";

function BeneficiosCard({ image, title }) {
    return (
        <div className="bg-white text-[#205088] p-6 rounded-lg flex flex-col items-center">
        <Image src={image} alt={title} width={60} height={60} />
        <p className="mt-4 text-sm font-semibold text-center">{title}</p>
        </div>
    );
}

export default BeneficiosCard;
