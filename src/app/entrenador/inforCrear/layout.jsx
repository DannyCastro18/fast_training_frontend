import BarraAdmin from "@/components/BarraAdmin";

export default function RootLayout({ children }) {
  return (
    <div className="w-full h-screen">
      <main className="flex h-[95%]">
        <BarraAdmin />
        <div className="w-[90%]">{children}</div>
      </main>
    </div>
  );
}
