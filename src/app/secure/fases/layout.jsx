import NavbarAdmin from "@/components/admin/NavbarAdmin";

export default function RootLayout({ children }) {
  return (
    <div className="w-full h-screen">
      <main className="flex h-[95%]">
        <NavbarAdmin />
        <div className="w-[90%]">{children}</div>
      </main>
    </div>
  );
}
