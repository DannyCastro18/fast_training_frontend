import NavbarEntrenador from "../../components/NavbarEntrenador";
import Header from "../../components/Header";
export default function EntrenadorLayout({ children }) {
  return (
    <div>
      <Header />
      <section className="flex w-full h-full">
        <NavbarEntrenador />
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </section>
    </div>
  );
}
