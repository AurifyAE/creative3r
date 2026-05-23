import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'LS Connect | WhatsApp Business Platform — 3R Creative',
    description:
        'Manage WhatsApp conversations at scale. Connect numbers, unified inbox, templates, broadcasts, and analytics — powered by WhatsApp Business API.',
};

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
    {
        icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
        title: 'Contact Management',
        description:
            'Import and organize customer contacts effortlessly. Tag, segment, and manage your entire contact database in one place.',
        tags: ['Import', 'Segment', 'Tag'],
    },
    {
        icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
        title: 'Unified Inbox',
        description:
            'Manage all customer conversations from multiple WhatsApp numbers in a single, intuitive dashboard.',
        tags: ['Multi-number', 'Real-time'],
    },
    {
        icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
        title: 'Template Management',
        description:
            'Create, edit, and submit templates for Meta approval. Track approval status, rejections, and resubmissions in real-time.',
        tags: ['Approval tracking', 'Editing'],
    },
    {
        icon: 'M22 12h-4l-3 9L9 3l-3 9H2',
        title: 'Broadcast Campaigns',
        description:
            'Send personalized messages to customer segments using approved templates with dynamic variables. Track delivery and engagement.',
        tags: ['Segmentation', 'Personalization'],
    },
    {
        icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
        title: '24-Hour Window',
        description:
            'Send free-form messages within 24 hours of customer initiation. Reply naturally without template restrictions.',
        tags: ['Free-form', 'No templates'],
    },
    {
        icon: 'M18 20V10M12 20V4M6 20v-6',
        title: 'Analytics & Reporting',
        description:
            'Track message delivery, read rates, and engagement metrics. Understand your WhatsApp performance at a glance.',
        tags: ['Real-time', 'Detailed insights'],
    },
];

const steps = [
    {
        number: '01',
        title: 'Connect Your WhatsApp Number',
        description:
            "Use Meta's official embedded signup flow to securely connect your WhatsApp Business number. No developers needed — just authenticate and grant LS Connect access to manage your conversations.",
        tags: ['Meta Embedded Signup', 'Secure authentication', '~2 minutes'],
    },
    {
        number: '02',
        title: 'Import Contacts & Create Templates',
        description:
            'Upload your customer contact list and start creating message templates. Submit for Meta approval to unlock broadcast and proactive messaging. Track approval status in real-time.',
        tags: ['CSV import', 'Template builder', 'Approval tracking'],
    },
    {
        number: '03',
        title: 'Start Messaging & Broadcasting',
        description:
            'Manage customer conversations, send templated broadcasts to segments, and track engagement. Use the 24-hour window for free-form replies and approved templates for proactive outreach.',
        tags: ['Unified inbox', 'Broadcast campaigns', 'Real-time analytics'],
    },
];

const templates = [
    { name: 'order_update_v2', category: 'Transactional · Marketing', status: 'Approved' as const },
    { name: 'appointment_reminder', category: 'Utility · Reminder', status: 'Pending' as const },
    { name: 'promo_summer_sale', category: 'Marketing · Promotion', status: 'Rejected' as const },
    { name: 'welcome_onboard', category: 'Utility · Onboarding', status: 'Approved' as const },
];

const conversations = [
    { name: 'Sarah Rodriguez', meta: 'Active now', preview: 'Replied', active: true },
    { name: 'Ahmed Mohammed', meta: '2:45 PM', preview: 'Hi, I need help with my order...' },
    { name: 'Priya Kumar', meta: '1:20 PM', preview: 'Thanks for the update!' },
    { name: 'Liam Johnson', meta: '11:30 AM', preview: 'Can I reschedule my appointment?' },
];

const stats = [
    { value: '2B+', label: 'WhatsApp users worldwide' },
    { value: '24h', label: 'Free-form messaging window' },
    { value: '∞', label: 'Approved templates' },
    { value: '100%', label: 'Meta compliant' },
];

const broadcastBullets = [
    "Approved templates only — stay 100% compliant with Meta's broadcast policies",
    'Dynamic variable substitution — personalize name, order ID, date, and any custom field',
    'Target any segment — filter contacts by tag, import date, or custom group before sending',
    'Live delivery tracking — monitor sent, delivered, and read counts in real time',
];

const footerLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#getting-started' },
    { label: 'Pricing', href: '#get-started' },
    { label: 'Terms', href: '/ls-connect/terms' },
    { label: 'Privacy', href: '/ls-connect/privacy-policy' },
    { label: 'DPA', href: '/contact' },
    { label: 'Data Deletion', href: '/ls-connect/data-deletion' },
    { label: 'Contact', href: '/contact' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: 'Approved' | 'Pending' | 'Rejected' }) {
    const styles: Record<typeof status, string> = {
        Approved: 'bg-[#25D366]/15 text-[#25D366] border-[#25D366]/30',
        Pending: 'bg-[#E9C369]/15 text-[#E9C369] border-[#E9C369]/30',
        Rejected: 'bg-red-500/15 text-red-400 border-red-500/30',
    };
    return (
        <span
            className={`shrink-0 text-[10px] uppercase tracking-[0.08em] px-2.5 py-1 rounded-md border font-medium ${styles[status]}`}
        >
            {status}
        </span>
    );
}

function FeatureIcon({ path }: { path: string }) {
    return (
        <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center mb-4 flex-shrink-0">
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#25D366"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d={path} />
            </svg>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LSConnectPage() {
    return (
        <main className="min-h-screen bg-[#111111] text-white pt-24 overflow-x-hidden">

            {/* ── Hero ── */}
            <section className="relative px-6 py-20 md:py-28">
                {/* subtle radial glow */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-100"
                    style={{
                        background:
                            'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(37,211,102,0.09) 0%, transparent 70%)',
                    }}
                />
                {/* grid texture */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(0deg,transparent,transparent 40px,#fff 40px,#fff 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,#fff 40px,#fff 41px)',
                    }}
                />

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* chip */}
                    <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.08em] uppercase bg-[#25D366]/12 text-[#25D366] border border-[#25D366]/25 px-3.5 py-1.5 rounded-full mb-7">
                        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                        Powered by WhatsApp Business Platform
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.035em] leading-[1.04] mb-5">
                        LS Connect
                    </h1>
                    <p className="text-xl md:text-2xl text-white/70 max-w-xl mb-3 leading-snug">
                        Manage WhatsApp conversations at scale.
                    </p>
                    <p className="text-white/40 max-w-lg leading-relaxed text-[0.95rem] mb-10">
                        Connect your numbers, handle conversations, send broadcasts, and track
                        everything from one unified dashboard. Built for businesses, by 3R Creative.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-5">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#25D366] text-[#0d1f15] font-bold text-sm hover:opacity-88 transition-opacity"
                        >
                            Start free trial
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-white/15 text-white/80 font-medium text-sm hover:border-[#25D366]/60 hover:text-[#25D366] transition-colors"
                        >
                            Book a demo
                        </Link>
                    </div>
                    <p className="text-xs text-white/30">No credit card required · Powered by WhatsApp Business API</p>
                </div>
            </section>

            {/* ── Dashboard Preview ── */}
            <section className="px-6 pb-20">
                <div className="max-w-6xl mx-auto">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#E9C369] mb-4">Dashboard preview</p>
                    <div className="grid lg:grid-cols-[1fr_260px] gap-4">
                        {/* conversation list */}
                        <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-4 space-y-2">
                            {conversations.map((c) => (
                                <div
                                    key={c.name}
                                    className={`flex items-start justify-between gap-4 px-4 py-3.5 rounded-xl border transition-colors ${c.active
                                        ? 'bg-[#25D366]/10 border-[#25D366]/25'
                                        : 'bg-[#111111] border-white/6 hover:border-white/12'
                                        }`}
                                >
                                    <div className="min-w-0">
                                        <p className="font-medium text-sm truncate">
                                            {c.name}
                                            {c.active && (
                                                <span className="ml-2 text-[10px] text-[#25D366] uppercase tracking-wide">
                                                    — Active now
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-[11px] text-white/35 mt-0.5">{c.meta}</p>
                                    </div>
                                    <p className="text-[11px] text-white/40 text-right shrink-0 max-w-[48%] truncate mt-0.5">
                                        {c.preview}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* stat */}
                        <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-7 flex flex-col justify-center">
                            <p className="text-sm text-white/40 mb-3">Active conversations</p>
                            <p className="text-5xl font-bold text-[#25D366] leading-none">1,248</p>
                            <p className="text-sm text-[#25D366]/80 mt-3">↑ +34% this week</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section id="features" className="px-6 py-20 bg-[#181818] scroll-mt-24">
                <div className="max-w-6xl mx-auto">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#E9C369] mb-3">Core features</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 max-w-lg">
                        Everything you need to manage WhatsApp at scale.
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="group bg-[#111111] border border-white/8 rounded-2xl p-6 hover:border-[#25D366]/30 transition-colors duration-200"
                            >
                                <FeatureIcon path={f.icon} />
                                <h3 className="text-[1rem] font-semibold mb-2">{f.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed mb-4">{f.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {f.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] uppercase tracking-[0.08em] text-white/35 border border-white/10 px-2 py-1 rounded-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Getting Started ── */}
            <section id="getting-started" className="px-6 py-20 scroll-mt-24">
                <div className="max-w-6xl mx-auto">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#E9C369] mb-3">Getting started</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-14">
                        Three simple steps to get started.
                    </h2>
                    <div className="space-y-12">
                        {steps.map((step, i) => (
                            <div key={step.number} className="grid md:grid-cols-[90px_1fr] gap-6 md:gap-10 items-start">
                                <span className="text-6xl md:text-7xl font-bold text-[#25D366]/15 leading-none select-none tabular-nums">
                                    {step.number}
                                </span>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2.5">{step.title}</h3>
                                    <p className="text-white/50 leading-relaxed text-[0.9rem] mb-4">{step.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {step.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/25 px-3 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    {/* divider between steps */}
                                    {i < steps.length - 1 && (
                                        <div className="mt-12 h-px bg-white/5" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Messaging Capabilities ── */}
            <section id="messaging" className="px-6 py-20 bg-[#181818] scroll-mt-24">
                <div className="max-w-6xl mx-auto">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#E9C369] mb-3">Messaging capabilities</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
                        Compliant messaging for every scenario.
                    </h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        {/* Inside 24h */}
                        <div className="bg-[#111111] border border-[#25D366]/25 rounded-2xl p-7">
                            <p className="text-[11px] uppercase tracking-[0.1em] text-[#25D366] mb-2">Inside 24-hour window</p>
                            <h3 className="text-lg font-semibold mb-3">Free-form messaging</h3>
                            <p className="text-sm text-white/50 mb-6 leading-relaxed">
                                When a customer messages you first, you have a 24-hour window to reply freely — no
                                templates required. Send any text, media, or quick reply naturally.
                            </p>
                            <div className="space-y-2.5 text-sm">
                                <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/6">
                                    <p className="text-[10px] uppercase text-white/30 mb-1.5 tracking-wider">Customer</p>
                                    <p className="text-white/80">Hi, what time do you close today?</p>
                                </div>
                                <div className="bg-[#25D366]/10 rounded-xl p-4 border border-[#25D366]/20">
                                    <p className="text-[10px] uppercase text-[#25D366] mb-1.5 tracking-wider">Your reply</p>
                                    <p className="text-white/80">Hey! We close at 8 PM today. Anything else I can help with?</p>
                                </div>
                            </div>
                        </div>

                        {/* Outside 24h */}
                        <div className="bg-[#111111] border border-white/8 rounded-2xl p-7">
                            <p className="text-[11px] uppercase tracking-[0.1em] text-[#E9C369] mb-2">Outside 24-hour window</p>
                            <h3 className="text-lg font-semibold mb-3">Approved template messages</h3>
                            <p className="text-sm text-white/50 mb-6 leading-relaxed">
                                Reach customers proactively or re-engage lapsed conversations using your
                                Meta-approved templates. Use dynamic variables to personalize at scale.
                            </p>
                            <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/6 text-sm">
                                <p className="text-[10px] uppercase text-white/30 mb-2 tracking-wider">
                                    Template: order_update_v2
                                </p>
                                <p className="text-white/70 leading-relaxed font-mono text-xs">
                                    Hi {'{{name}}'}, your order {'{{order_id}}'} has been dispatched and arrives by{' '}
                                    {'{{delivery_date}}'}. Track it here: {'{{link}}'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Broadcast Engine ── */}
            <section id="broadcast" className="px-6 py-20 scroll-mt-24">
                <div className="max-w-6xl mx-auto">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#E9C369] mb-3">Broadcast engine</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Reach thousands. Feel personal.</h2>
                    <p className="text-white/50 max-w-2xl leading-relaxed mb-8 text-[0.95rem]">
                        Send bulk broadcast messages to segmented contact lists using approved templates with
                        dynamic variables — every recipient gets a message that feels written just for them.
                    </p>

                    <ul className="space-y-3 mb-12">
                        {broadcastBullets.map((item) => (
                            <li key={item} className="flex gap-3 text-sm text-white/60">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] mt-2 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    {/* campaign card */}
                    <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-7 max-w-md">
                        <div className="flex items-start justify-between gap-4 mb-5">
                            <div>
                                <p className="text-sm font-semibold">New broadcast campaign</p>
                                <p className="text-xs text-white/35 mt-0.5">Template: order_update_v2 · Approved</p>
                            </div>
                            <span className="text-xs text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/25 px-2.5 py-1 rounded-full shrink-0">
                                In progress
                            </span>
                        </div>

                        <p className="text-xs text-white/35 mb-1">1,248 recipients selected</p>
                        <p className="text-[10px] uppercase tracking-[0.1em] text-white/25 mb-2">Message preview</p>
                        <p className="text-sm text-white/60 mb-5 leading-relaxed font-mono text-xs">
                            Hi {'{{name}}'}, your order {'{{order_id}}'} has shipped! Expected delivery:{' '}
                            {'{{date}}'}. Track here: {'{{link}}'}
                        </p>

                        <div className="flex justify-between text-xs text-white/35 mb-1.5">
                            <span>Sending progress</span>
                            <span>902 / 1,248</span>
                        </div>
                        <div className="h-1.5 bg-white/6 rounded-full overflow-hidden mb-6">
                            <div className="h-full bg-[#25D366] rounded-full" style={{ width: '72%' }} />
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                                <p className="text-xl font-bold text-white">902</p>
                                <p className="text-[10px] uppercase text-white/30 mt-0.5 tracking-wider">Sent</p>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-[#25D366]">834</p>
                                <p className="text-[10px] uppercase text-white/30 mt-0.5 tracking-wider">Delivered</p>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-[#E9C369]">401</p>
                                <p className="text-[10px] uppercase text-white/30 mt-0.5 tracking-wider">Read</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Template Management ── */}
            <section id="templates" className="px-6 py-20 bg-[#181818] scroll-mt-24">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#E9C369] mb-3">Template management</p>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            Your templates. Always in control.
                        </h2>
                        <p className="text-white/50 leading-relaxed mb-8 text-[0.9rem]">
                            Submit templates for Meta approval, track their status in real time, and manage edits
                            or deletions — without leaving your dashboard. When a template gets rejected, you&apos;ll
                            know exactly why and can resubmit with corrections.
                        </p>

                        <ul className="space-y-3 text-sm">
                            <li>
                                <span className="text-[#25D366] font-semibold">Approved</span>
                                <span className="text-white/40"> — Ready to use in broadcasts &amp; template messages</span>
                            </li>
                            <li>
                                <span className="text-[#E9C369] font-semibold">Pending</span>
                                <span className="text-white/40"> — Submitted to Meta, awaiting review (usually &lt;24h)</span>
                            </li>
                            <li>
                                <span className="text-red-400 font-semibold">Rejected</span>
                                <span className="text-white/40"> — Edit and resubmit directly — no API access needed</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[#111111] border border-white/8 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/8">
                            <p className="text-sm font-semibold">Template manager</p>
                            <span className="text-xs text-[#25D366] border border-[#25D366]/30 px-3 py-1 rounded-full cursor-pointer hover:bg-[#25D366]/10 transition-colors">
                                + New template
                            </span>
                        </div>
                        <div className="space-y-2.5">
                            {templates.map((t) => (
                                <div
                                    key={t.name}
                                    className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#1a1a1a] rounded-xl border border-white/6 hover:border-white/12 transition-colors"
                                >
                                    <div>
                                        <p className="font-mono text-[0.8rem] text-white/80">{t.name}</p>
                                        <p className="text-[11px] text-white/35 mt-0.5">{t.category}</p>
                                    </div>
                                    <StatusBadge status={t.status} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats band ── */}
            <section className="px-6 py-16 border-y border-white/8">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <p className="text-3xl md:text-4xl font-bold text-[#25D366] mb-2 tabular-nums">
                                {s.value}
                            </p>
                            <p className="text-[10px] text-white/35 uppercase tracking-[0.12em]">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section id="get-started" className="px-6 py-28 scroll-mt-24">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#E9C369] mb-4">Get started today</p>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Start managing WhatsApp the right way.
                    </h2>
                    <p className="text-white/50 mb-10 leading-relaxed max-w-xl mx-auto">
                        Connect your first number in under five minutes using Meta&apos;s official signup flow. No
                        developers needed.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#25D366] text-[#0d1f15] font-bold text-sm hover:opacity-88 transition-opacity"
                        >
                            Get started free
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/15 font-medium text-sm hover:border-[#25D366]/50 hover:text-[#25D366] transition-colors"
                        >
                            Book a demo
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Compliance ── */}
            <section className="px-6 pb-12">
                <div className="max-w-6xl mx-auto">
                    <div className="text-xs text-white/30 leading-relaxed border border-white/8 rounded-xl p-5 bg-[#1a1a1a]">
                        <strong className="text-white/45">Compliance notice:</strong> LS Connect is powered by the
                        WhatsApp Business Platform and Meta&apos;s official APIs. This application is not affiliated with
                        Meta Platforms, Inc. and may be subject to Meta app review for certain features. All messaging
                        features are intended to operate in line with applicable WhatsApp Business Platform terms and
                        policies. Please review our{' '}
                        <Link
                            href="/ls-connect/privacy-policy"
                            className="text-[#E9C369] hover:underline underline-offset-2"
                        >
                            Privacy Policy
                        </Link>
                        ,{' '}
                        <Link href="/ls-connect/terms" className="text-[#E9C369] hover:underline underline-offset-2">
                            Terms
                        </Link>
                        ,{' '}
                        <Link
                            href="/ls-connect/data-deletion"
                            className="text-[#E9C369] hover:underline underline-offset-2"
                        >
                            Data Deletion
                        </Link>{' '}
                        page, and DPA for details on data handling.
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="border-t border-white/8 px-6 py-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer navigation">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm text-white/35 hover:text-[#25D366] transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <p className="text-sm text-white/25">By 3R Creative</p>
                </div>
            </footer>
        </main>
    );
}