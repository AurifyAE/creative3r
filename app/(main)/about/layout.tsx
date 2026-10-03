import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative agency for jewellery industry UAE",
  description: "Creative agency for the jewellery industry, delivering branding, creative design, digital marketing, content, and innovative solutions to grow your jewellery business.",
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
