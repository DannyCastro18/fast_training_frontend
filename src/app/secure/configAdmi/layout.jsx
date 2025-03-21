import BarraAdmin from "@/components/BarraAdmin";
import PiePagina from "@/components/PiePagina";

export default function RootLayout({ children }) {
  return (
    <div className="w-full bg-white h-full flex flex-col">
      {/* Contenido principal */}
      <main className="flex flex-grow">
        {/* BarraAdmin con altura del 75% */}
        <div className="h-[75vh]">
          <BarraAdmin />
        </div>
        {/* Contenedor del contenido principal */}
        <div className="w-[85%]">{children}</div>
      </main>

      {/* Pie de página */}
      <footer className="w-full">
        <PiePagina />
      </footer>
    </div>
  );
}