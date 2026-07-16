import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import { services, getServiceBySlug, getAdjacentServices, getServiceCtaTextColor } from '../servicesData';
import { portfolioItems, getPortfolioPoster } from '../../portfolio/portfolioData';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.meta.title,
    description: service.meta.description,
    keywords: service.meta.keywords,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const { prev, next } = getAdjacentServices(slug);
  const relatedWork = portfolioItems
    .filter((item) => service.portfolioCategories.includes(item.category))
    .slice(0, 3);
  const ctaTextColor = getServiceCtaTextColor(service.color);
  const enquireHref = `/contact?service=${encodeURIComponent(service.title)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.meta.description,
    serviceType: service.title,
    areaServed: 'AE',
    url: `https://creative3r.com/services/${service.slug}`,
    provider: {
      '@type': 'Organization',
      name: '3R Creative',
      url: 'https://creative3r.com',
    },
  };

  return (
    <div className="min-h-screen bg-[#2A2A2A] text-white overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#2A2A2A] via-[#2A2A2A]/40 to-black/30" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="container mx-auto px-6 lg:px-12 pb-10 md:pb-14">
            <Link href="/services" className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              All Services
            </Link>
            <div className="flex items-center gap-4 mb-5">
              <span
                className="px-4 py-1 rounded-full text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest"
                style={{ backgroundColor: service.color, color: ctaTextColor }}
              >
                {service.number} / Service
              </span>
            </div>
            <h1 className="font-ivyora text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl">
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 pb-24 md:pb-32">

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-12 md:py-16 border-b border-white/10">
          <div className="lg:col-span-8">
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">{service.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.chips.map((chip) => (
                <span key={chip} className="px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-wider text-gray-400">
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end items-start">
            <Link
              href={enquireHref}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ backgroundColor: service.color, color: ctaTextColor, boxShadow: `0 4px 24px ${service.color}40` }}
            >
              <Mail className="w-4 h-4" />
              Enquire Now
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* What we do */}
        <div className="py-12 md:py-16 border-b border-white/10">
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-8 md:mb-10">
            {service.offeringsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {service.offerings.map((offering) => {
              const Icon = offering.icon;
              return (
                <div key={offering.name} className="rounded-2xl bg-white/5 border border-white/5 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.07]">
                  <span
                    className="inline-flex w-11 h-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${service.color}1F`, color: service.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-4 text-base md:text-lg font-semibold text-gray-100">{offering.name}</h3>
                  <p className="mt-2 text-xs md:text-sm text-gray-400 leading-relaxed">{offering.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process */}
        <div className="py-12 md:py-16 border-b border-white/10">
          <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-8 md:mb-10">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
            {service.process.map((step, index) => (
              <div key={step.step} className="relative">
                <span className="block font-mono text-4xl md:text-5xl font-bold text-white/10 mb-3">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="h-px w-10 mb-4" style={{ backgroundColor: service.color }} />
                <h3 className="text-base md:text-lg font-semibold text-gray-100 mb-2">{step.step}</h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related work */}
        {relatedWork.length > 0 && (
          <div className="py-12 md:py-16 border-b border-white/10">
            <div className="flex items-end justify-between mb-8 md:mb-10">
              <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-500">Related Work</h2>
              <Link href="/portfolio" className="group inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                View all <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-45" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {relatedWork.map((item) => (
                <Link key={item.id} href={`/portfolio/${item.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#161616]" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={getPortfolioPoster(item)}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm md:text-base font-semibold text-gray-100 group-hover:text-white transition-colors">{item.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{item.category} · {item.year}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-white group-hover:rotate-45" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Prev / Next navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 py-12 md:py-16">
          {prev ? (
            <Link href={`/services/${prev.slug}`} className="group flex flex-col gap-3 p-5 md:p-8 bg-white/3 border border-white/5 rounded-2xl hover:bg-white/6 transition-all duration-300">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                Previous Service
              </span>
              <span className="text-base md:text-xl font-semibold text-gray-200 group-hover:text-white transition-colors">
                <span className="font-mono text-xs mr-3" style={{ color: prev.color }}>{prev.number}</span>
                {prev.title}
              </span>
            </Link>
          ) : <div className="hidden md:block" />}
          {next ? (
            <Link href={`/services/${next.slug}`} className="group flex flex-col gap-3 p-5 md:p-8 bg-white/3 border border-white/5 rounded-2xl hover:bg-white/6 transition-all duration-300 md:items-end md:text-right">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500">
                Next Service
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
              <span className="text-base md:text-xl font-semibold text-gray-200 group-hover:text-white transition-colors">
                <span className="font-mono text-xs mr-3" style={{ color: next.color }}>{next.number}</span>
                {next.title}
              </span>
            </Link>
          ) : <div className="hidden md:block" />}
        </div>

        {/* Closing CTA */}
        <div className="rounded-3xl border border-white/10 bg-[#232323] p-8 md:p-14 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Interested in this service?</p>
          <h3 className="font-ivyora text-2xl md:text-4xl font-bold mb-8">Let&apos;s build something great together.</h3>
          <Link
            href={enquireHref}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ backgroundColor: service.color, color: ctaTextColor, boxShadow: `0 4px 24px ${service.color}40` }}
          >
            <Mail className="w-4 h-4" />
            Enquire Now
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
