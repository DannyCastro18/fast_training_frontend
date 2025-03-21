// import LandingPage from './landing-page/page';
import Header from './components/header'
import Navbar from './components/entrenador/navbar';
import RegistroDatos from './secure/entrenador/IngresoDatos/page'

export default function Home() {
  return (
    <>
      {/* <LandingPage /> */}
      <Header/>
      <Navbar/>
      <RegistroDatos/>

    </>
  );
}
