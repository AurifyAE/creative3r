import type { Metadata } from "next";
import HeroSection from "../components/home/HeroSection";

export const metadata: Metadata = {
  title: "Luxury Branding & Digital Strategy for Precious Metals & Jewelry in UAE",
  description: "Best marketing agency empowering jewelry brands, gold refineries, and precious metal businesses in UAE, also Digital marketing Agency in UAE for your business.",
  keywords: [
    "Precious metals creative agency",
    "Jewelry brand strategy",
    "Gold refinery branding",
    "Luxury jewelry marketing",
    "Gold trading digital agency",
    "Luxury branding for jewelry",
    "Strategic brand design",
    "High-conversion digital marketing",
    "Jewelry industry brand identity",
    "Creative strategy for refineries",
    "Creative agency UAE",
    "Luxury branding Middle East",
    "Jewelry marketing Dubai",
  ],
};
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
