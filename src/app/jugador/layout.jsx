import NavbarJugador from "../../components/NavbarJugador";
import Header from "../../components/Header";
export default function EntrenadorLayout({ children }) {
  return (
    <div>
      <Header />
      <section className="flex w-full h-full">
        <NavbarJugador />
        <div className="flex flex-col items-center justify-center pt-20 w-full">
          {children}
        </div>
      </section>
    </div>
  );
}
