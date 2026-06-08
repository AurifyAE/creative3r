import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms & Conditions | LS Connect - 3R Creative',
    description:
        'Master Subscription Agreement governing your use of LS Connect, the WhatsApp business messaging platform by 3R Creative (F.Z.E.).',
};

const sections = [
    { id: 'acceptance', label: '1. Acceptance of Terms' },
    { id: 'services', label: '2. LS Connect Services' },
    { id: 'subscription', label: '3. Subscription & Billing' },
    { id: 'whatsapp', label: '4. WhatsApp API Compliance' },
    { id: 'ip', label: '5. Intellectual Property' },
    { id: 'warranties', label: '6. Representations' },
    { id: 'liability', label: '7. Limitation of Liability' },
    { id: 'force-majeure', label: '8. Force Majeure' },
    { id: 'general', label: '9. General Provisions' },
    { id: 'contact', label: 'Contact' },
];

const serviceItems = [
    'Unified WhatsApp communication management',
    'Team inbox and conversation handling',
    'Broadcast and bulk messaging tools, where permitted',
    'Contact management and audience segmentation',
    'Template management and related workflow support',
    'Automated chatbot or reply assistance (plan-dependent)',
    'Performance, productivity, or usage reports',
];

const whatsappPolicies = [
    {
        label: 'WhatsApp Business Policy',
        href: 'https://www.whatsapp.com/legal/business-policy',
    },
    {
        label: 'WhatsApp Business Solution Terms',
        href: 'https://www.whatsapp.com/legal/business-solution-terms',
    },
    {
        label: 'WhatsApp Commerce Policy',
        href: 'https://www.whatsapp.com/legal/commerce-policy',
    },
];

export default function LSConnectTermsPage() {
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
                    <Link
                        href="/ls-connect"
                        className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-[#E9C369] transition-colors mb-8"
                    >
                        <span aria-hidden="true">←</span> Back to LS Connect
                    </Link>
                    <p className="text-xs tracking-[0.3em] uppercase text-[#E9C369] mb-4">
                        LS Connect · Legal
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-4">
                        Master Subscription
                        <br />
                        <span className="text-[#E9C369]">Agreement</span>
                    </h1>
                    <p className="text-white/50 max-w-2xl leading-relaxed mb-8">
                        Terms and conditions governing your purchase of subscriptions to, and use of,
                        LS Connect and related Services.
                    </p>
                    <div className="flex flex-wrap gap-6 text-sm text-white/60">
                        <span>
                            <span className="text-[#E9C369] mr-1">Platform:</span>
                            LS Connect
                        </span>
                        <span>
                            <span className="text-[#E9C369] mr-1">Company:</span>
                            3R Creative (F.Z.E.)
                        </span>
                        <span>
                            <span className="text-[#E9C369] mr-1">Last Updated:</span>
                            May 2026
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 pb-20 flex flex-col lg:flex-row gap-16">
                {/* Sidebar TOC */}
                <aside className="hidden lg:block w-56 flex-shrink-0">
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

                {/* Main content */}
                <article className="flex-1 min-w-0 space-y-14 text-white/85">
                    {/* Intro */}
                    <section className="scroll-mt-28">
                        <Prose>
                            <p>
                                This Master Subscription Agreement (this &ldquo;Agreement&rdquo;) contains
                                the terms and conditions that govern your purchase of subscriptions to,
                                and use of, the Services, and is a contract between{' '}
                                <strong className="text-white">3R Creative (F.Z.E.)</strong> (hereinafter
                                referred to as &ldquo;3R Creative,&rdquo; &ldquo;Company,&rdquo; &ldquo;we,&rdquo;
                                &ldquo;us,&rdquo; or &ldquo;our&rdquo;) and you or the entity or organization
                                that you represent.
                            </p>
                        </Prose>
                    </section>

                    <Divider />

                    {/* 1. Acceptance */}
                    <section id="acceptance" className="scroll-mt-28">
                        <SectionNumber>1</SectionNumber>
                        <SectionHeading>Acceptance of Terms</SectionHeading>
                        <Prose>
                            <p>
                                <strong className="text-white">LS Connect</strong> (hereinafter referred to
                                as the &ldquo;Platform,&rdquo; &ldquo;Website,&rdquo; &ldquo;Mobile
                                Application,&rdquo; or &ldquo;LS Connect&rdquo;) is a website- and
                                mobile-based client communication and business messaging platform owned
                                and operated by 3R Creative (F.Z.E.).
                            </p>
                            <p>
                                This document is a legally binding agreement between the registered or
                                unregistered user of the Platform (hereinafter referred to as
                                &ldquo;you,&rdquo; &ldquo;your,&rdquo; or &ldquo;User&rdquo;) and us in
                                relation to the use of the Platform and sets forth the terms and
                                conditions by which you may access and use the Platform and our related
                                websites, services, applications, products, features, and content,
                                collectively referred to as the &ldquo;Services.&rdquo;
                            </p>
                        </Prose>

                        <SubHeading>Eligibility and Authority</SubHeading>
                        <List
                            items={[
                                <>
                                    If you are an <strong className="text-white">individual</strong> using
                                    the Services for your own purposes: (1) all references to
                                    &ldquo;you,&rdquo; &ldquo;your,&rdquo; or &ldquo;User&rdquo; are to you;
                                    and (2) you represent and warrant that you are at least 18 years of age
                                    or have otherwise reached the age of majority in your jurisdiction.
                                </>,
                                <>
                                    If you are using the Services on behalf of an{' '}
                                    <strong className="text-white">entity or organization</strong>: (1) all
                                    references to &ldquo;you,&rdquo; &ldquo;your,&rdquo; or
                                    &ldquo;User&rdquo; are to that entity or organization; and (2) you
                                    represent and warrant that you have the right, power, and authority to
                                    enter into this Agreement on behalf of such entity or organization.
                                </>,
                            ]}
                        />

                        <Prose>
                            <p className="mt-4">
                                This Agreement becomes binding and effective on the User upon the earliest
                                of: (1) when you access or use the Services; or (2) when you click an
                                &ldquo;I Accept,&rdquo; &ldquo;Sign Up,&rdquo; or similar button or check
                                box referencing this Agreement.
                            </p>
                            <p>
                                By using the Services, you agree to the collection, use, storage, and
                                processing of information in accordance with our{' '}
                                <Link
                                    href="/ls-connect/privacy-policy"
                                    className="text-[#E9C369] hover:underline underline-offset-4"
                                >
                                    Privacy Policy
                                </Link>
                                . This document is an electronic record in terms of applicable laws,
                                including the Information Technology Act, 2000, the Digital Personal
                                Data Protection Act, 2023, and the General Data Protection Regulation
                                (GDPR), as applicable.
                            </p>
                        </Prose>
                    </section>

                    <Divider />

                    {/* 2. Services */}
                    <section id="services" className="scroll-mt-28">
                        <SectionNumber>2</SectionNumber>
                        <SectionHeading>LS Connect Services</SectionHeading>
                        <Prose>
                            <p>
                                The LS Connect platform provides access to a secure, cloud-hosted software
                                service that enables Users who subscribe to our plan to manage and unify
                                their client communications in one place. The Platform supports
                                integrations and workflows that facilitate communication through WhatsApp
                                and related business messaging tools, subject at all times to the
                                availability, functionality, and policies of third-party service
                                providers, including Meta and WhatsApp.
                            </p>
                            <p>The Services may include, without limitation:</p>
                        </Prose>
                        <List items={serviceItems} />

                        <div className="mt-6 border border-white/10 rounded-xl p-5 bg-[#1a1a1a]">
                            <p className="text-sm font-semibold text-white mb-2">Third-Party Dependency</p>
                            <p className="text-sm text-white/55 leading-relaxed">
                                You acknowledge and agree that the Platform depends in part on third-party
                                services, systems, and configurations that are not controlled by 3R Creative
                                (F.Z.E.). Any change, restriction, or policy modification by such
                                third-party providers may affect the availability or functionality of the
                                Services.
                            </p>
                        </div>
                    </section>

                    <Divider />

                    {/* 3. Subscription */}
                    <section id="subscription" className="scroll-mt-28">
                        <SectionNumber>3</SectionNumber>
                        <SectionHeading>Subscription, Billing &amp; Payments</SectionHeading>

                        <SubHeading>3.1 Subscription Plan</SubHeading>
                        <Prose>
                            <p>
                                To use the LS Connect Services, the User shall register, choose an
                                applicable subscription plan, and agree to pay the fees associated with
                                that plan (&ldquo;Subscription Fee&rdquo;). Subscription Fees are charged on
                                a monthly basis unless otherwise agreed in writing.
                            </p>
                        </Prose>

                        <SubHeading>3.2 Conversation and Meta Charges</SubHeading>
                        <Prose>
                            <p>
                                Any charges imposed by Meta, WhatsApp, or any other third-party provider,
                                including message, conversation, template, or usage-based charges, are
                                separate from the fees payable to the Company unless expressly stated
                                otherwise in writing. The Company does not control or assume responsibility
                                for Meta&apos;s pricing or billing structure.
                            </p>
                        </Prose>

                        <SubHeading>3.3 Billing and Cancellation</SubHeading>
                        <List
                            items={[
                                'Invoices must be paid within fifteen (15) days from the invoice date.',
                                'If any invoice remains unpaid after that period, the Company may suspend, limit, or cancel access to the Services.',
                                <>
                                    <strong className="text-white">No Refunds:</strong> Unless expressly
                                    stated otherwise, Subscription Fees are non-refundable. No refunds or
                                    credits for partial months or years of service will be provided upon
                                    cancellation.
                                </>,
                            ]}
                        />
                    </section>

                    <Divider />

                    {/* 4. WhatsApp */}
                    <section id="whatsapp" className="scroll-mt-28">
                        <SectionNumber>4</SectionNumber>
                        <SectionHeading>WhatsApp Business API Compliance</SectionHeading>
                        <Prose>
                            <p>
                                The User agrees and acknowledges that LS Connect is a third-party software
                                platform owned and operated by 3R Creative (F.Z.E.) and is not a Meta
                                Solution Partner, WhatsApp Solution Provider, or official technology partner
                                unless expressly stated in writing. Use of WhatsApp tools is subject at all
                                times to the then-current terms, policies, and technical limits imposed by
                                WhatsApp and Meta.
                            </p>
                            <p>You agree to adhere to the official terms set by WhatsApp:</p>
                        </Prose>
                        <ul className="mt-3 space-y-2">
                            {whatsappPolicies.map((policy) => (
                                <li key={policy.href} className="flex gap-3 text-sm leading-relaxed">
                                    <span className="mt-[0.4rem] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#E9C369]" />
                                    <a
                                        href={policy.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#E9C369] hover:underline underline-offset-4"
                                    >
                                        {policy.label} ↗
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 border border-white/10 rounded-xl p-5 bg-[#1a1a1a]">
                            <p className="text-sm font-semibold text-white mb-2">Account Responsibility</p>
                            <p className="text-sm text-white/55 leading-relaxed">
                                Any violation of WhatsApp policies may lead to the suspension of your
                                WhatsApp account. WhatsApp has absolute discretion to limit or remove your
                                access if you receive excessive negative feedback or cause harm to the
                                platform. 3R Creative shall take no responsibility in case of such
                                violations.
                            </p>
                        </div>
                    </section>

                    <Divider />

                    {/* 5. IP */}
                    <section id="ip" className="scroll-mt-28">
                        <SectionNumber>5</SectionNumber>
                        <SectionHeading>Intellectual Property Rights</SectionHeading>
                        <Prose>
                            <p>
                                The copyright, database rights, and all other intellectual property rights
                                in and to the Platform, the Services, and all materials (text, graphics,
                                logos, software, design) are owned by 3R Creative (F.Z.E.), its affiliates,
                                or its licensors.
                            </p>
                            <p>
                                The Company grants you a limited, non-exclusive, revocable,
                                non-transferable right to access and use the Platform for your internal
                                business purposes. You shall not reuse the Services, extract substantial
                                data, or use automated means (robots, spiders, scrapers) to copy or
                                repurpose the Platform.
                            </p>
                        </Prose>
                    </section>

                    <Divider />

                    {/* 6. Warranties */}
                    <section id="warranties" className="scroll-mt-28">
                        <SectionNumber>6</SectionNumber>
                        <SectionHeading>Representations and Warranties</SectionHeading>
                        <Prose>
                            <p>You represent and warrant that:</p>
                        </Prose>
                        <List
                            items={[
                                'You have the full right, power, and authority to enter into this Agreement.',
                                'You will not attempt to breach the security of the Services or the Platform.',
                                'You will not use the Services for any unlawful, fraudulent, or harmful purpose.',
                                'You will not create a copy, clone, or imitation of the Platform without prior written consent.',
                            ]}
                        />
                    </section>

                    <Divider />

                    {/* 7. Liability */}
                    <section id="liability" className="scroll-mt-28">
                        <SectionNumber>7</SectionNumber>
                        <SectionHeading>Limitation of Liability</SectionHeading>
                        <Prose>
                            <p>
                                To the maximum extent permitted by law, 3R Creative (F.Z.E.) and its
                                affiliates shall not be liable for any direct, indirect, incidental, or
                                consequential damages, including loss of profits, revenue, or data. The
                                Company shall not be responsible for any disruption caused by third-party
                                providers or your failure to maintain the confidentiality of your account
                                credentials.
                            </p>
                        </Prose>
                    </section>

                    <Divider />

                    {/* 8. Force Majeure */}
                    <section id="force-majeure" className="scroll-mt-28">
                        <SectionNumber>8</SectionNumber>
                        <SectionHeading>Force Majeure</SectionHeading>
                        <Prose>
                            <p>
                                The Company shall not be liable for any delay or failure in performance
                                caused by events beyond its reasonable control, including acts of God, war,
                                terrorism, power failures, internet failures, telecom disruptions, or
                                government actions.
                            </p>
                        </Prose>
                    </section>

                    <Divider />

                    {/* 9. General */}
                    <section id="general" className="scroll-mt-28">
                        <SectionNumber>9</SectionNumber>
                        <SectionHeading>General Provisions</SectionHeading>
                        <List
                            items={[
                                <>
                                    <strong className="text-white">Entire Agreement:</strong> These Terms
                                    constitute the entire agreement between you and the Company.
                                </>,
                                <>
                                    <strong className="text-white">Governing Law:</strong> These Terms shall
                                    be governed by the laws of the United Arab Emirates.
                                </>,
                            ]}
                        />
                    </section>

                    <Divider />

                    {/* Contact */}
                    <section id="contact" className="scroll-mt-28">
                        <SectionHeading>Contact</SectionHeading>
                        <Prose>
                            <p>
                                If you have any questions about this Agreement, please contact us at{' '}
                                <a
                                    href="mailto:info@creative3r.com"
                                    className="text-[#E9C369] hover:underline underline-offset-4"
                                >
                                    info@creative3r.com
                                </a>
                                .
                            </p>
                        </Prose>
                        <div className="mt-8 grid sm:grid-cols-2 gap-4">
                            <ContactCard label="Platform">LS Connect</ContactCard>
                            <ContactCard label="Company">3R Creative (F.Z.E.)</ContactCard>
                        </div>
                        <p className="mt-8 text-xs text-white/35 leading-relaxed">
                            © 2026 3R Creative (F.Z.E.). All rights reserved.
                            <br />
                            C1 Building, 1-F, Ajman Free Zone, Ajman, UAE.
                        </p>
                    </section>

                    <div className="pt-6 border-t border-white/10">
                        <Link
                            href="/ls-connect"
                            className="text-sm text-[#E9C369] hover:underline underline-offset-4"
                        >
                            ← Return to LS Connect
                        </Link>
                    </div>
                </article>
            </div>
        </main>
    );
}

function SectionNumber({ children }: { children: React.ReactNode }) {
    return (
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#E9C369] mb-1 block">
            Section {children}
        </span>
    );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-5 leading-snug">
            {children}
        </h2>
    );
}

function SubHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-sm font-semibold text-white mt-7 mb-2 uppercase tracking-wide">
            {children}
        </h3>
    );
}

function Prose({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-3 text-white/70 leading-relaxed text-[0.97rem]">{children}</div>
    );
}

function List({ items }: { items: React.ReactNode[] }) {
    return (
        <ul className="mt-3 space-y-2">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-white/70 text-[0.97rem] leading-relaxed">
                    <span className="mt-[0.4rem] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#E9C369]" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function Divider() {
    return <hr className="border-white/10" />;
}

function ContactCard({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="bg-[#E9C369]/8 border border-[#E9C369]/25 rounded-xl p-5">
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">{label}</p>
            <p className="text-[#E9C369] text-sm font-medium">{children}</p>
        </div>
    );
}
