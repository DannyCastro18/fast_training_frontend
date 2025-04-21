import Image from "next/image";

const FeatureCard = ({ title, description, image }) => {
  return (
    <article className="flex flex-col gap-4 w-80 rounded-2xl border border-[#1f2a38] p-4 bg-[#141c27] h-auto">
      <figure className="h-40 rounded-2xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </figure>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm">{description}</p>
    </article>
  );
};

export default FeatureCard;
