import NavbarEntrenador from "../../components/NavbarEntrenador";
// import Header from "../../components/Header";
export default function EntrenadorLayout({ children }) {
  return (
    <div>
      {/* <Header /> */}
      <section className="w-full h-auto">
        <NavbarEntrenador />
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </section>
    </div>
  );
}