import LandingHeader from "../components/landingPage/LandingHeader";
import LandingFooter from "../components/landingPage/LandingFooter";
import HeroSection from "../components/landingPage/HeroSection";
import BeneficiosSection from "../components/landingPage/BeneficiosSection";
import AppDescargar from "../components/landingPage/AppDescargar";
import MisionVision from "../components/landingPage/MisionVision";

export default function LandingPage() {
  return (
    <div className="bg-gray-100 text-gray-900">
      <LandingHeader />
      <HeroSection />
      <BeneficiosSection />
      <AppDescargar />
      <MisionVision />
      <LandingFooter />
    </div>
  );
}