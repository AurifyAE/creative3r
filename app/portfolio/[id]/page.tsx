'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { use, useState, useEffect, useCallback } from 'react';
import { portfolioItems, ContentSection, ContentItem } from '../portfolioData';

interface Props {
  params: Promise<{ id: string }>;
}

/* ── Section Renderers ───────────────────────────────────────────── */

/* Helper: paragraph body — supports both body string and paragraphs[] */
function BodyText({ section }: { section: ContentSection }) {
  if (section.paragraphs && section.paragraphs.length > 0) {
    return (
      <div className="space-y-4">
        {section.paragraphs.map((p, i) => (
          <p key={i} className="text-base md:text-lg text-gray-400 leading-relaxed font-light">{p}</p>
        ))}
      </div>
    );
  }
  if (section.body) {
    return <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light">{section.body}</p>;
  }
  return null;
}

function SectionTitle({ title }: { title?: string }) {
  if (!title) return null;
  return <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500">{title}</h2>;
}

function DefaultSection({ section }: { section: ContentSection }) {
  return (
    <div className="space-y-4">
      <SectionTitle title={section.title} />
      <BodyText section={section} />
      {/* inline images (e.g. Promise Refinery result) */}
      {section.images && section.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {section.images.map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl border border-white/5 bg-[#161616]" style={{ aspectRatio: '4/3' }}>
              <Image src={src} alt={`${section.title ?? 'Project'} image ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BulletsSection({ section }: { section: ContentSection }) {
  return (
    <div className="space-y-4">
      <SectionTitle title={section.title} />
      <BodyText section={section} />
      {section.items && section.items.length > 0 && (
        <ul className="space-y-3 mt-2">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base text-gray-400 font-light">
              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E9C46A] shrink-0" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ScopeCard({ item }: { item: ContentItem }) {
  return (
    <div className="p-5 bg-white/3 border border-white/5 rounded-xl space-y-3 hover:bg-white/5 transition-colors duration-200">
      {item.label && <p className="text-sm font-semibold text-white">{item.label}</p>}
      <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
      {item.subLabel && (
        <p className="text-[10px] uppercase tracking-widest text-gray-600 pt-1">{item.subLabel}</p>
      )}
      {item.subItems && item.subItems.length > 0 && (
        <ul className="space-y-1.5 mt-1">
          {item.subItems.map((sub, si) => (
            <li key={si} className="flex items-start gap-2 text-xs text-gray-500">
              <div className="mt-1.5 w-1 h-1 rounded-full bg-[#E9C46A]/60 shrink-0" />
              {sub}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ScopeSection({ section }: { section: ContentSection }) {
  return (
    <div className="space-y-5">
      <SectionTitle title={section.title} />
      <BodyText section={section} />
      {section.items && section.items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {section.items.map((item, i) => (
            <ScopeCard key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function ImpactSection({ section }: { section: ContentSection }) {
  return (
    <div className="space-y-4">
      <SectionTitle title={section.title} />
      <BodyText section={section} />
      {section.items && section.items.length > 0 && (
        <div className="flex flex-col gap-3">
          {section.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white/3 border border-white/5 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-[#E9C46A]/10 border border-[#E9C46A]/20 flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#E9C46A]" />
              </div>
              <p className="text-sm md:text-base text-gray-300 font-light">{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LogoSection({ section }: { section: ContentSection }) {
  return (
    <div className="space-y-6">
      <SectionTitle title={section.title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <BodyText section={section} />
        {section.images && section.images.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {section.images.map((src, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl border border-white/5 bg-[#161616]" style={{ aspectRatio: '4/3' }}>
                <Image src={src} alt={`${section.title ?? 'Logo'} image ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function renderSection(section: ContentSection, idx: number) {
  switch (section.type) {
    case 'logo':    return <LogoSection    key={idx} section={section} />;
    case 'scope':   return <ScopeSection   key={idx} section={section} />;
    case 'impact':  return <ImpactSection  key={idx} section={section} />;
    case 'bullets': return <BulletsSection key={idx} section={section} />;
    default:        return <DefaultSection key={idx} section={section} />;
  }
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function ProjectPage({ params }: Props) {
  const { id } = use(params);
  const item = portfolioItems.find((p) => p.id === parseInt(id, 10));
  if (!item) notFound();

  const allImages = item.images && item.images.length > 0 ? item.images : [item.image];

  const [activeIndex, setActiveIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const switchImage = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setFading(true);
      setTimeout(() => { setActiveIndex(index); setFading(false); }, 280);
    },
    [activeIndex],
  );

  const openLightbox = (index: number) => { setLightboxIndex(index); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const lightboxPrev = useCallback(() => setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length), [allImages.length]);
  const lightboxNext = useCallback(() => setLightboxIndex((i) => (i + 1) % allImages.length), [allImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, lightboxPrev, lightboxNext]);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  const currentIndex = portfolioItems.findIndex((p) => p.id === item.id);
  const prevItem = portfolioItems[(currentIndex - 1 + portfolioItems.length) % portfolioItems.length];
  const nextItem = portfolioItems[(currentIndex + 1) % portfolioItems.length];

  return (
    <main className="min-h-screen bg-[#1F1E1E] text-white">

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 pt-28 md:pt-32 pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200 mb-8 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Portfolio
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                  {item.category}
                </span>
                <span className="text-xs text-gray-600">·</span>
                <span className="text-xs text-gray-500">{item.year}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight italic">{item.title}</h1>
            </div>
            {item.client && (
              <p className="text-sm text-gray-500 shrink-0">
                <span className="text-gray-600 uppercase tracking-widest text-[10px]">Client </span>
                <span className="text-white/60 font-medium">{item.client}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── IMAGE GALLERY ──────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 pb-0">
        <div className="max-w-6xl mx-auto">

          {/* Main Viewer */}
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-white/5 bg-[#161616] cursor-zoom-in group"
            style={{ aspectRatio: '16/9' }}
            onClick={() => openLightbox(activeIndex)}
          >
            <Image
              key={activeIndex}
              src={allImages[activeIndex]}
              alt={`${item.title} — image ${activeIndex + 1}`}
              fill
              className="object-cover"
              priority
              style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.28s ease' }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

            {/* Expand icon */}
            <div className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>

            {allImages.length > 1 && (
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs text-white/70 border border-white/10">
                {activeIndex + 1} / {allImages.length}
              </div>
            )}

            {allImages.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                  onClick={(e) => { e.stopPropagation(); switchImage((activeIndex - 1 + allImages.length) % allImages.length); }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                  onClick={(e) => { e.stopPropagation(); switchImage((activeIndex + 1) % allImages.length); }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 mt-3">
              {allImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => switchImage(i)}
                  className={`relative overflow-hidden rounded-lg flex-shrink-0 transition-all duration-300 border-2 ${
                    i === activeIndex ? 'border-white/70 opacity-100 scale-[1.03]' : 'border-transparent opacity-40 hover:opacity-70 hover:border-white/20'
                  }`}
                  style={{ width: 90, height: 56 }}
                >
                  <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CONTENT + META ─────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

            {/* Left: Overview + Sections */}
            <div className="lg:col-span-2 space-y-12">

              {/* Overview */}
              <div>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">{item.description}</p>
              </div>

              {/* Dynamic Sections */}
              {item.sections && item.sections.map((section, idx) => (
                <div key={idx}>
                  <div className="h-px bg-white/5 mb-10" />
                  {renderSection(section, idx)}
                </div>
              ))}
            </div>

            {/* Right: Meta */}
            <div className="space-y-8">
              <div className="p-6 bg-white/3 border border-white/5 rounded-2xl space-y-6 sticky top-28">
                {item.client && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Client</p>
                    <p className="text-sm text-white font-medium">{item.client}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Year</p>
                  <p className="text-sm text-white font-medium">{item.year}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Category</p>
                  <p className="text-sm text-white font-medium">{item.category}</p>
                </div>
                {item.services && item.services.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Services</p>
                    <div className="flex flex-wrap gap-2">
                      {item.services.map((service) => (
                        <span key={service} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs text-gray-400">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform duration-300"
                  >
                    Start a Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PREV / NEXT ───────────────────────────────────────────── */}
      <section className="border-t border-white/5 px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-6">
          <Link href={`/portfolio/${prevItem.id}`} className="group flex flex-col gap-3 p-5 md:p-8 bg-white/3 border border-white/5 rounded-2xl hover:bg-white/6 transition-all duration-300">
            <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image src={prevItem.image} alt={prevItem.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <p className="text-sm md:text-base font-medium text-white group-hover:text-[#E9C46A] transition-colors">{prevItem.title}</p>
          </Link>

          <Link href={`/portfolio/${nextItem.id}`} className="group flex flex-col gap-3 p-5 md:p-8 bg-white/3 border border-white/5 rounded-2xl hover:bg-white/6 transition-all duration-300 items-end text-right">
            <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
              Next
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image src={nextItem.image} alt={nextItem.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <p className="text-sm md:text-base font-medium text-white group-hover:text-[#E9C46A] transition-colors">{nextItem.title}</p>
          </Link>
        </div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────────────────────── */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl" onClick={closeLightbox}>
          <button className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10" onClick={closeLightbox}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm text-white/60 border border-white/10">
            {lightboxIndex + 1} / {allImages.length}
          </div>
          <div className="relative w-full max-w-5xl mx-auto px-16 md:px-20" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full overflow-hidden rounded-xl shadow-2xl" style={{ aspectRatio: '16/9' }}>
              <Image key={lightboxIndex} src={allImages[lightboxIndex]} alt={`${item.title} — image ${lightboxIndex + 1}`} fill className="object-contain" priority />
            </div>
          </div>
          {allImages.length > 1 && (
            <>
              <button className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all" onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all" onClick={(e) => { e.stopPropagation(); lightboxNext(); }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}
          {allImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {allImages.map((src, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }} className={`relative overflow-hidden rounded-md flex-shrink-0 transition-all duration-300 border-2 ${i === lightboxIndex ? 'border-white/80 opacity-100' : 'border-transparent opacity-40 hover:opacity-70'}`} style={{ width: 64, height: 40 }}>
                  <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
