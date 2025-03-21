import NavbarEntrenador from "../../components/NavbarEntrenador";
import Header from "../../components/Header";
export default function EntrenadorLayout({ children }) {
  return (
    <>
      <NavbarEntrenador />
      <Header />
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </>
  );
}
