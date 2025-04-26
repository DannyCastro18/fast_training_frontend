import React from "react";

function BenefitsCard({ icon, title, description }) {
  return (
    <div className="flex flex-col text-start w-10/12">
      <figure className="aspect-square w-fit rounded-xl p-3 bg-[#1f2a38] text-cyan-500">
        {React.cloneElement(icon, {
          sx: { fontSize: "3rem" },
          className: "", // aquí puedes agregar las clases que necesites
        })}
      </figure>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <h4 className="text-sm">{description}</h4>
    </div>
  );
}

export default BenefitsCard;
