import NavbarAdmin from "@/components/admin/NavbarAdmin";

export default function RootLayout({ children }) {
  return (
    <div className="w-full h-full bg-white  flex flex-col">
      {/* Contenido principal */}
      <main className="flex flex-grow">
        {/* BarraAdmin con altura del 75% */}
        <div className="h-[75vh]">
          <NavbarAdmin />
        </div>
        {/* Contenedor del contenido principal */}
        <div className="w-[85%]">{children}</div>
      </main>
    </div>
  );
}
