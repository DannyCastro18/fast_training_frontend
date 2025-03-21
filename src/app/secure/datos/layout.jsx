import BarraAdmin from "@/components/BarraAdmin";
import RegistroDatos from "./page";

export default function Datos({ children }) {
  return (
    <div className="w-full h-screen">
      <main className="flex h-[95%]">
        <BarraAdmin />
        <RegistroDatos />
        <div className="w-[90%]">{children}</div>
      </main>
    </div>
  );
}
