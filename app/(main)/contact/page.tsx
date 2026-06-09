import type { Metadata } from "next";
import ContactSection from '../../components/home/ContactSection'

export const metadata: Metadata = {
  title: "Contact 3R Creative | Luxury Branding & Digital Agency UAE",
  description: "Get in touch with 3R Creative — the leading branding and digital marketing agency in UAE for Precious metals, Gold refinery, and Luxury Watch businesses.",
  keywords: [
    "Digital Marketing in UAE",
    "Branding company in UAE",
    "Best performance marketing company in UAE",
    "Consultancy Agency in UAE",
    "Web development UAE",
  ],
};

export default function page() {
  return (
    <div>
        <ContactSection />
    </div>
  )
}
