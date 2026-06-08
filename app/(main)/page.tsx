import HeroSection from "../components/home/HeroSection";
import WavyLine from "../components/ui/WavyLine";
import PortfolioSection from "../components/home/PortfolioSection";
import TeamSection from "../components/home/TeamSection";
import ContactSection from "../components/home/ContactSection";
import SuperPowers from "../components/home/SuperPowers";
// import Testimonials from "../components/home/Testimonials";
import CollaboratorsSection from "../components/home/Collaborators";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1F1E1E] text-white">
      <HeroSection />
      <PortfolioSection />
      <WavyLine />
      <TeamSection />
      <WavyLine />
      <CollaboratorsSection />
      <WavyLine />
      <SuperPowers />
      <WavyLine />
      {/* <Testimonials /> */}
      <ContactSection />
    </div>
  );
}
