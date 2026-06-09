import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precious Metals, Gold Refinery Branding Consultancy Agency in UAE",
  description: "Best and Result-oriented branding, marketing consultancy agency in UAE. Luxury Watch, Precious metals, Gold refinery branding, marketing consultancy in UAE for your business.",
  keywords: [
    "Precious metals branding agency",
    "Gold refinery brand consultancy",
    "Jewelry industry creative experts",
    "Boutique creative agency for gold and jewelry",
    "Creative intelligence agency Dubai",
    "Result-oriented branding in UAE",
  ],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
