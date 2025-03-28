import NavbarEntrenador from "../../components/NavbarEntrenador";
import Header from "../../components/shared/Header";
export default function EntrenadorLayout({ children }) {
  return (
    <div>
      <Header />
      <section className="flex w-full h-full text-black">
        <NavbarEntrenador />
        <div className="flex flex-col items-center justify-center pt-20 w-full">
          {children}
        </div>
      </section>
    </div>
  );
}
