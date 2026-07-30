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

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '3R Creative',
  alternateName: 'Creative3R',
  url: 'https://www.creative3r.com',
  logo: 'https://www.creative3r.com/assets/images/logo.svg',
  description:
    'Creative agency focusing on the precious metals and jewellery industry — branding, digital marketing and web experiences for jewelry brands, gold refineries and precious metal businesses in the UAE.',
  slogan: 'Reflect. Refine. Resonate.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C1 Building, F-1, Ajman Free Zone',
    addressLocality: 'Ajman',
    addressCountry: 'AE',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+971-58-502-3411',
      contactType: 'sales',
      email: 'info@creative3r.com',
      areaServed: 'AE',
      availableLanguage: ['en'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+971-50-806-4894',
      contactType: 'customer support',
      areaServed: 'AE',
      availableLanguage: ['en'],
    },
  ],
  sameAs: [
    'https://instagram.com/3r_creative',
    'https://facebook.com/3RCreativeF.Z.E/',
    'https://linkedin.com/company/3rcreative',
  ],
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1F1E1E] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
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
