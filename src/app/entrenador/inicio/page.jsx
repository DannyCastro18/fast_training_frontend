"use-client";

import Calendario from "../../../components/Calendario";
import Estadisticas from "@/components/Estadisticas";
import FeaturedPlayers from "@/components/Destacados";

export default function inicioEntrenador() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Calendario />
      <Estadisticas />
      <FeaturedPlayers />
    </div>
  );
}
