import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blogArticles } from "./blogData";

export const metadata: Metadata = {
  title: "Insights on Jewelry, Gold & Luxury Branding | 3R Creative",
  description:
    "Ideas and practical guidance for jewelry houses, gold businesses and luxury brands navigating strategy, marketing, sustainability and digital growth.",
  keywords: [
    "jewelry branding insights",
    "gold marketing UAE",
    "luxury brand strategy",
    "sustainable jewelry branding",
    "ethical gold marketing",
  ],
  openGraph: {
    title: "Insights on Jewelry, Gold & Luxury Branding | 3R Creative",
    description:
      "Perspective and practical guidance for the precious metals and luxury jewelry industry.",
    type: "website",
  },
};

export default function BlogsPage() {
  const featured = blogArticles[0];
  const remainingArticles = blogArticles.slice(1);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "3R Creative Insights",
    url: "https://www.creative3r.com/blogs",
    description: metadata.description,
    hasPart: blogArticles.map((article) => ({
      "@type": "Article",
      headline: article.title,
      url: `https://www.creative3r.com/blogs/${article.slug}`,
      datePublished: article.publishedAt,
    })),
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#1F1E1E] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <header className="relative px-6 pb-14 pt-36 md:px-10 md:pb-20 md:pt-44 lg:px-12">
        <div className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-[#299D8F]/10 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#E9C46A]">
                3R Creative journal
              </p>
              <h1 className="max-w-4xl text-balance font-display text-6xl font-medium leading-[0.92] tracking-[-0.03em] md:text-8xl lg:text-9xl">
                Ideas with
                <span className="block italic text-[#299D8F]">weight.</span>
              </h1>
            </div>
            <p className="max-w-md text-pretty text-sm leading-7 text-white/55 md:text-base lg:col-span-4 lg:pb-2">
              Field notes on brand, culture and growth for businesses shaping the
              future of gold, jewelry and modern luxury.
            </p>
          </div>
        </div>
      </header>

      <main className="px-6 pb-28 md:px-10 lg:px-12 lg:pb-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex items-center justify-between border-t border-white/10 pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
              Latest thinking
            </p>
            <p className="font-mono text-[10px] tabular-nums text-white/30">
              01 / {String(blogArticles.length).padStart(2, "0")}
            </p>
          </div>

          <article>
            <Link
              href={`/blogs/${featured.slug}`}
              className="group grid gap-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#299D8F] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1F1E1E] lg:grid-cols-12 lg:gap-12"
            >
              {featured.image && featured.imageAlt && (
                <div className="relative aspect-[3/2] overflow-hidden bg-[#292825] lg:col-span-7">
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 bg-[#299D8F] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white md:left-7 md:top-7">
                    {featured.category}
                  </span>
                </div>
              )}

              <div
                className={`flex flex-col justify-between lg:py-3 ${
                  featured.image
                    ? "lg:col-span-5"
                    : "border-l border-white/10 pl-6 md:pl-10 lg:col-span-9 lg:col-start-2"
                }`}
              >
                <div>
                  {!featured.image && (
                    <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#299D8F]">
                      {featured.category}
                    </p>
                  )}
                  <div className="mb-7 flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-white/40">
                    <time dateTime={featured.publishedAt}>{featured.displayDate}</time>
                    <span className="h-px w-5 bg-white/20" />
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {featured.readingTime}
                    </span>
                  </div>
                  <h2 className="text-balance font-display text-4xl font-medium leading-[1.04] tracking-[-0.02em] md:text-5xl lg:text-[3.45rem]">
                    {featured.shortTitle}
                  </h2>
                  <p className="mt-6 max-w-lg text-pretty text-sm leading-7 text-white/55 md:text-base">
                    {featured.description}
                  </p>
                </div>
                <span className="mt-10 inline-flex w-fit items-center gap-3 border-b border-[#E9C46A]/60 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E9C46A] transition-colors group-hover:border-[#E9C46A] group-hover:text-white">
                  Read the article
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
            </Link>
          </article>

          {remainingArticles.length > 0 && (
            <section className="mt-24 md:mt-32" aria-labelledby="more-insights">
              <div className="mb-8 flex items-end justify-between border-t border-white/10 pt-5">
                <h2
                  id="more-insights"
                  className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40"
                >
                  More from the journal
                </h2>
                <p className="font-mono text-[10px] tabular-nums text-white/30">
                  {String(remainingArticles.length).padStart(2, "0")} articles
                </p>
              </div>

              <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
                {remainingArticles.map((article) => (
                  <article key={article.slug}>
                    <Link
                      href={`/blogs/${article.slug}`}
                      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#299D8F] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1F1E1E]"
                    >
                      {article.image && article.imageAlt && (
                        <div className="relative mb-6 aspect-[3/2] overflow-hidden bg-[#292825]">
                          <Image
                            src={article.image}
                            alt={article.imageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.22em]">
                        <span className="text-[#299D8F]">{article.category}</span>
                        <span className="h-px w-4 bg-white/15" />
                        <time className="text-white/35" dateTime={article.publishedAt}>
                          {article.displayDate}
                        </time>
                      </div>
                      <h3 className="mt-4 max-w-xl font-display text-3xl font-medium leading-[1.08] tracking-[-0.02em] md:text-4xl">
                        {article.shortTitle}
                      </h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
                        {article.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E9C46A]">
                        Read article
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
