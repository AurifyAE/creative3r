import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best and Fastest Result in Branding, Marketing and Web Design in UAE",
  description: "We Provide Best and Fastest Result Branding, Marketing and Web Design For Your Business in UAE. Our main strength in Precious metals, Gold refinery, Luxury Watch.",
  keywords: [
    "Digital Marketing in UAE",
    "Web development in UAE",
    "Branding in UAE",
    "Consultancy Agency in UAE",
    "Branding company in UAE",
    "Best performance marketing company in UAE",
  ],
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
