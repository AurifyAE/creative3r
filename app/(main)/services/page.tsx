import ServicesPage from '@/app/components/services/ServiceSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Digital Marketing | Web Development | Branding | Consultancy Agency in UAE",
  description: "We are the best option for Digital Marketing, Website design and development, Branding, Consultancy company in UAE for your Precious metals, Gold refinery, Luxury Watch business in UAE.",
  keywords: [
    "Brand strategy agency",
    "Brand identity design services",
    "Rebranding services",
    "Web design and development",
    "Digital experience design",
    "Performance marketing services",
    "Marketing analytics agency",
    "Digital growth strategy",
    "Strategic brand positioning",
    "Luxury brand identity design UAE",
    "Strategic storytelling for businesses",
    "Sustainable branding agency UAE",
  ],
};

export default function Services() {
  return <ServicesPage />;
}