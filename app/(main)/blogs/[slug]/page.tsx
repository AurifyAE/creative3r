import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { blogArticles, getBlogArticle } from "../blogData";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) return {};

  const socialImage =
    article.image && article.imageAlt
      ? [{ url: article.image, alt: article.imageAlt }]
      : undefined;

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      authors: [article.author],
      images: socialImage,
    },
    twitter: {
      card: article.image ? "summary_large_image" : "summary",
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();

  const articleUrl = `https://www.creative3r.com/blogs/${article.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    ...(article.image
      ? { image: `https://www.creative3r.com${article.image}` }
      : {}),
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Organization",
      name: "3R Creative",
      url: "https://www.creative3r.com",
    },
    publisher: {
      "@type": "Organization",
      name: "3R Creative",
      logo: {
        "@type": "ImageObject",
        url: "https://www.creative3r.com/assets/images/logo.svg",
      },
    },
  };

  return (
    <article className="min-h-screen bg-[#1F1E1E] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <header className="border-b border-white/5 px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/blogs"
            className="group mb-12 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#299D8F]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            All insights
          </Link>

          <div className="grid gap-9 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-9">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E9C46A]">
                {article.category}
              </p>
              <h1 className="max-w-6xl text-balance font-display text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl lg:text-[5.4rem]">
                {article.title}
              </h1>
            </div>
            <div className="flex items-end lg:col-span-3">
              <div className="w-full border-t border-white/15 pt-5 text-xs leading-6 text-white/50">
                <p className="font-medium text-white/80">{article.author}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <time dateTime={article.publishedAt}>{article.displayDate}</time>
                  <span aria-hidden="true">/</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {article.readingTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {article.image && article.imageAlt && (
        <div className="px-6 md:px-10 lg:px-12">
          <div className="relative mx-auto aspect-[3/2] max-w-7xl overflow-hidden bg-[#292825] md:aspect-[16/8]">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="relative px-6 py-16 md:px-10 md:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-3">
            <div className="border-t border-white/10 pt-5 lg:sticky lg:top-28">
              <p className="mb-5 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/35">
                In this article
              </p>
              <nav aria-label="Article contents">
                <ol className="space-y-3">
                  {article.sections.map((section, index) => (
                    <li key={section.id} className="group flex gap-3">
                      <span className="mt-0.5 font-mono text-[9px] tabular-nums text-[#299D8F]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${section.id}`}
                        className="text-xs leading-5 text-white/45 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#299D8F]"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            <div className="space-y-7 text-[1.02rem] leading-[1.9] text-white/68 md:text-[1.08rem]">
              {article.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {article.sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-t border-white/10 py-12 first:mt-16 md:py-16"
              >
                <div className="mb-7 flex items-start gap-5">
                  <span className="mt-2 font-mono text-[10px] tabular-nums text-[#299D8F]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="max-w-3xl text-balance font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] md:text-5xl">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-7 text-[1.02rem] leading-[1.9] text-white/68 md:text-[1.08rem]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {section.subsections?.map((subsection) => (
                  <div key={subsection.title} className="mt-11 md:mt-14">
                    <h3 className="mb-5 max-w-3xl font-display text-2xl font-medium leading-tight text-white/90 md:text-3xl">
                      {subsection.title}
                    </h3>
                    <div className="space-y-7 text-[1.02rem] leading-[1.9] text-white/68 md:text-[1.08rem]">
                      {subsection.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {subsection.bullets && (
                      <ul className="mt-8 space-y-6">
                        {subsection.bullets.map((bullet, bulletIndex) => (
                          <li
                            key={bullet}
                            className="grid grid-cols-[2.75rem_1fr] gap-3 border-t border-white/10 pt-5 text-[1.02rem] leading-[1.85] text-white/68 md:text-[1.08rem]"
                          >
                            <span className="font-mono text-xs tabular-nums text-[#E9C46A]">
                              {String(bulletIndex + 1).padStart(2, "0")}
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {subsection.closingParagraphs && (
                      <div className="mt-7 space-y-7 text-[1.02rem] leading-[1.9] text-white/68 md:text-[1.08rem]">
                        {subsection.closingParagraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {section.bullets && (
                  <ul className="mt-9 space-y-7">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bullet}
                        className="grid grid-cols-[2.75rem_1fr] gap-3 border-t border-white/10 pt-6 text-[1.02rem] leading-[1.85] text-white/68 md:text-[1.08rem]"
                      >
                        <span className="font-mono text-xs tabular-nums text-[#E9C46A]">
                          {String(bulletIndex + 1).padStart(2, "0")}
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.callout && (
                  <blockquote className="my-10 border-l-2 border-[#E9C46A] py-3 pl-6 font-display text-3xl italic leading-snug text-white/90 md:pl-9 md:text-4xl">
                    {section.callout}
                  </blockquote>
                )}

                {section.closingParagraphs && (
                  <div className="mt-9 space-y-7 text-[1.02rem] leading-[1.9] text-white/68 md:text-[1.08rem]">
                    {section.closingParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </section>
            ))}

            <footer className="mt-2 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/35">
                  Written by
                </p>
                <p className="mt-2 font-display text-2xl">{article.author}</p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex w-fit items-center gap-3 bg-[#299D8F] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#248579] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C46A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F1E1E]"
              >
                Build a credible brand story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
}
