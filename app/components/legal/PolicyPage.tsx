import Link from 'next/link';

export interface PolicySection {
    id: string;
    label: string;
}

interface PolicyShellProps {
    /** Where the "back" link points, e.g. "/luxury-shoppe". Omit to hide the link. */
    backHref?: string;
    backLabel?: string;
    /** Small uppercase line above the title, e.g. "Luxury Shoppe · Legal". */
    eyebrow: string;
    /** Title renders as two lines: plain, then accented. */
    titleTop: string;
    titleAccent: string;
    /** Key/value pairs under the title (Platform, Company, Last Updated). */
    meta: { label: string; value: string }[];
    sections: PolicySection[];
    children: React.ReactNode;
}

export function PolicyShell({
    backHref,
    backLabel,
    eyebrow,
    titleTop,
    titleAccent,
    meta,
    sections,
    children,
}: PolicyShellProps) {
    return (
        <main className="min-h-screen bg-[#111111] text-white pt-24">
            {/* Hero */}
            <div className="px-6 py-16 md:py-20 relative overflow-hidden">
                <div
                    className="pointer-events-none absolute inset-0 opacity-100"
                    style={{
                        background:
                            'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(233,195,105,0.09) 0%, transparent 70%)',
                    }}
                />
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(0deg,transparent,transparent 40px,#fff 40px,#fff 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,#fff 40px,#fff 41px)',
                    }}
                />
                <div className="max-w-5xl mx-auto relative z-10">
                    {backHref && (
                        <Link
                            href={backHref}
                            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-[#E9C369] transition-colors mb-8"
                        >
                            <span aria-hidden="true">←</span> {backLabel}
                        </Link>
                    )}
                    <p className="text-xs tracking-[0.3em] uppercase text-[#E9C369] mb-4">{eyebrow}</p>
                    <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-4">
                        {titleTop}
                        <br />
                        <span className="text-[#E9C369]">{titleAccent}</span>
                    </h1>
                    <div className="flex flex-wrap gap-6 text-sm text-white/60">
                        {meta.map((item) => (
                            <span key={item.label}>
                                <span className="text-[#E9C369] mr-1">{item.label}:</span>
                                {item.value}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 pb-20 flex flex-col lg:flex-row gap-16">
                <aside className="hidden lg:block w-56 shrink-0">
                    <div className="sticky top-28">
                        <p className="text-[10px] tracking-[0.25em] uppercase text-white/35 mb-4">
                            Contents
                        </p>
                        <nav className="flex flex-col gap-1" aria-label="Table of contents">
                            {sections.map((s) => (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className="text-left text-sm py-1.5 px-3 rounded transition-all border-l-2 border-transparent text-white/60 hover:text-[#E9C369] hover:border-[#E9C369]"
                                >
                                    {s.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>

                <article className="flex-1 min-w-0 space-y-14 text-white/85">{children}</article>
            </div>
        </main>
    );
}

export function SectionNumber({ children }: { children: React.ReactNode }) {
    return (
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#E9C369] mb-1 block">
            Section {children}
        </span>
    );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-5 leading-snug">
            {children}
        </h2>
    );
}

export function SubHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-sm font-semibold text-white mt-7 mb-2 uppercase tracking-wide">
            {children}
        </h3>
    );
}

export function Prose({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-3 text-white/70 leading-relaxed text-[0.97rem]">{children}</div>
    );
}

export function List({ items }: { items: React.ReactNode[] }) {
    return (
        <ul className="mt-3 space-y-2">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-white/70 text-[0.97rem] leading-relaxed">
                    <span className="mt-[0.4rem] shrink-0 w-1.5 h-1.5 rounded-full bg-[#E9C369]" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export function Divider() {
    return <hr className="border-white/10" />;
}

export function ContactCard({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="bg-[#E9C369]/8 border border-[#E9C369]/25 rounded-xl p-5">
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">{label}</p>
            <p className="text-[#E9C369] text-sm font-medium leading-relaxed">{children}</p>
        </div>
    );
}

/** One numbered policy section: eyebrow number, heading, then body. */
export function PolicySectionBlock({
    id,
    number,
    heading,
    children,
}: {
    id: string;
    number?: string;
    heading: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-28">
            {number && <SectionNumber>{number}</SectionNumber>}
            <SectionHeading>{heading}</SectionHeading>
            {children}
        </section>
    );
}
