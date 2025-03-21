import NavbarJugador from "../../components/NavbarJugador";
import Header from "../../components/Header";
export default function JugadorLayout({ children }) {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-full flex">
        <NavbarJugador />
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
