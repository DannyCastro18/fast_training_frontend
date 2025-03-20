import BarraFases from "@/components/Barrafases";

export default function RootLayout({ children }) {
  return (
    <div className="w-full h-screen">
      <main className="flex h-[95%]">
        <BarraFases />
        <div className="w-[90%]">{children}</div>
      </main>
    </div>
  );
}
