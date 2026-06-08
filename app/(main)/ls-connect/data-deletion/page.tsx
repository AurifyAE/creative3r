import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Data Deletion | LS Connect — 3R Creative',
    description:
        'Request deletion of your personal data from LS Connect. Learn how to submit a data deletion request to 3R Creative (F.Z.E.).',
};

const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'how-to', label: 'How to request deletion' },
    { id: 'contact', label: 'Contact' },
];

const requiredDetails = [
    'Your full name',
    'Your WhatsApp number or email address used with LS Connect',
    'The business name or account name, if applicable',
    'A clear request to delete your data',
];

const steps = [
    {
        number: '1',
        title: 'Email us',
        description:
            'Send a deletion request to our privacy contact using the email below.',
    },
    {
        number: '2',
        title: 'Include the required details',
        description:
            'Please include the information below so we can identify your account and process your request safely:',
        list: requiredDetails,
    },
    {
        number: '3',
        title: 'Verification',
        description:
            'We may ask for limited information to verify your identity before deleting data, especially where required to protect account security and prevent unauthorized deletion.',
    },
    {
        number: '4',
        title: 'Processing time',
        description:
            'After verification, we will delete or anonymize applicable personal data within a reasonable period, unless we must retain certain records for legal, tax, security, or compliance purposes.',
        note: 'Some records may be retained where required by law or for legitimate business purposes such as dispute resolution, fraud prevention, billing, security, or compliance logging.',
    },
];

export default function LSConnectDataDeletionPage() {
    return (
        <main className="min-h-screen bg-[#111111] text-white pt-24">
            {/* Hero */}
            <div className="px-6 py-16 md:py-20 relative overflow-hidden">
                <div
                    className="pointer-events-none absolute inset-0 opacity-100"
                    style={{
                        background:
                            'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(37,211,102,0.09) 0%, transparent 70%)',
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
                    <Link
                        href="/ls-connect"
                        className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-[#25D366] transition-colors mb-8"
                    >
                        <span aria-hidden="true">←</span> Back to LS Connect
                    </Link>
                    <p className="text-xs tracking-[0.3em] uppercase text-[#25D366] mb-4">
                        LS Connect · Data Deletion
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-4">
                        Request deletion of
                        <br />
                        <span className="text-[#25D366]">your data</span>
                    </h1>
                    <p className="text-white/50 max-w-2xl leading-relaxed">
                        If you used LS Connect or communicated with 3R Creative via our website,
                        WhatsApp, email, or phone, you may request deletion of your personal data by
                        following the steps below.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 pb-20 flex flex-col lg:flex-row gap-16">
                {/* Sidebar TOC */}
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
                                    className="text-left text-sm py-1.5 px-3 rounded transition-all border-l-2 border-transparent text-white/60 hover:text-[#25D366] hover:border-[#25D366]"
                                >
                                    {s.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>

                <article className="flex-1 min-w-0 space-y-14 text-white/85">
                    <section id="overview" className="scroll-mt-28">
                        <Prose>
                            <p>
                                Under applicable data protection laws, you have the right to request
                                deletion of personal data we hold about you in connection with LS Connect
                                or your communications with 3R Creative. This page explains how to submit
                                that request and what to expect during processing.
                            </p>
                            <p>
                                For broader information on how we collect and use data, see our{' '}
                                <Link
                                    href="/ls-connect/privacy-policy"
                                    className="text-[#25D366] hover:underline underline-offset-4"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </Prose>
                    </section>

                    <Divider />

                    <section id="how-to" className="scroll-mt-28">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-8 leading-snug">
                            How to request deletion
                        </h2>
                        <ol className="space-y-8">
                            {steps.map((step) => (
                                <li
                                    key={step.number}
                                    className="border border-white/10 rounded-xl p-6 bg-[#1a1a1a]"
                                >
                                    <div className="flex gap-4">
                                        <span
                                            className="shrink-0 w-9 h-9 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-sm font-bold flex items-center justify-center"
                                            aria-hidden="true"
                                        >
                                            {step.number}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-lg font-semibold text-white mb-2">
                                                {step.title}
                                            </h3>
                                            <p className="text-white/60 leading-relaxed text-[0.97rem]">
                                                {step.description}
                                            </p>
                                            {step.list && (
                                                <ul className="mt-4 space-y-2">
                                                    {step.list.map((item) => (
                                                        <li
                                                            key={item}
                                                            className="flex gap-3 text-white/60 text-[0.97rem] leading-relaxed"
                                                        >
                                                            <span className="mt-[0.4rem] shrink-0 w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            {step.note && (
                                                <p className="mt-4 text-sm text-white/40 leading-relaxed border-t border-white/8 pt-4">
                                                    {step.note}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <Divider />

                    <section id="contact" className="scroll-mt-28">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-5 leading-snug">
                            Contact
                        </h2>
                        <Prose>
                            <p>Send your deletion request here:</p>
                        </Prose>
                        <div className="mt-6 border border-[#25D366]/25 rounded-xl p-6 md:p-8 bg-[#25D366]/8">
                            <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">
                                LS Connect Data Deletion Requests
                            </p>
                            <p className="text-xl font-semibold text-white mb-1">3R Creative</p>
                            <a
                                href="mailto:info@creative3r.com?subject=LS%20Connect%20Data%20Deletion%20Request"
                                className="inline-flex items-center gap-2 text-[#25D366] text-lg font-medium hover:underline underline-offset-4 mt-3"
                            >
                                info@creative3r.com
                            </a>
                            <p className="mt-6 text-sm text-white/45 leading-relaxed">
                                Use the subject line &ldquo;LS Connect Data Deletion Request&rdquo; and
                                include the required details listed in step 2 above.
                            </p>
                        </div>
                        <p className="mt-8 text-xs text-white/35 leading-relaxed">
                            © {new Date().getFullYear()} 3R Creative (F.Z.E.). All rights reserved.
                            <br />
                            C1 Building, 1-F, Ajman Free Zone, Ajman, UAE.
                        </p>
                    </section>

                    <div className="pt-6 border-t border-white/10">
                        <Link
                            href="/ls-connect"
                            className="text-sm text-[#25D366] hover:underline underline-offset-4"
                        >
                            ← Return to LS Connect
                        </Link>
                    </div>
                </article>
            </div>
        </main>
    );
}

function Prose({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-3 text-white/70 leading-relaxed text-[0.97rem]">{children}</div>
    );
}

function Divider() {
    return <hr className="border-white/10" />;
}
