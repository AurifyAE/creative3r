import ServicesPage from '@/app/components/services/ServiceSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Your Agency',
  description: 'Explore our comprehensive range of digital services including branding, design, development, marketing, and more.',
  keywords: ['branding', 'web design', 'digital marketing', 'web development', 'creative solutions'],
};

export default function Services() {
  return <ServicesPage />;
}