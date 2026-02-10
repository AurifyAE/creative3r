import HeroSection from "./components/home/HeroSection";
import Navbar from "./components/layout/Navbar";
import WavyLine from "./components/ui/WavyLine";
import PortfolioSection from "./components/home/PortfolioSection";
import TeamSection from "./components/home/TeamSection";
import ContactSection from "./components/home/ContactSection";
import Footer from "./components/layout/Footer";
import SuperPowers from "./components/home/SuperPowers";
import StackingCards from "./components/home/Testimonials";
import CollaboratorsSection from "./components/home/Collaborators";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1F1E1E] text-white">
      {/* <Navbar /> */}
      <HeroSection />
      <PortfolioSection />
      <WavyLine />
      <TeamSection />
      <WavyLine />
      <CollaboratorsSection />
      <WavyLine />
      <SuperPowers />
      <WavyLine />
      <StackingCards />
      <ContactSection />
      {/* <Footer /> */}
    </div>
  );
}
