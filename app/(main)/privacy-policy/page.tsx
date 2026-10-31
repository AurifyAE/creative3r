import type { Metadata } from 'next';
import Link from 'next/link';
import {
    ContactCard,
    Divider,
    List,
    PolicySectionBlock,
    PolicyShell,
    Prose,
    SubHeading,
    type PolicySection,
} from '@/app/components/legal/PolicyPage';

export const metadata: Metadata = {
    title: 'Privacy Policy | 3R Creative',
    description:
        'How 3R Creative (F.Z.E.) collects, uses and protects personal data submitted through creative3r.com. Product policies are listed separately.',
};

const sections: PolicySection[] = [
    { id: 'intro', label: 'Introduction' },
    { id: 'collect', label: '1. What We Collect' },
    { id: 'use', label: '2. How We Use It' },
    { id: 'legal-basis', label: '3. Legal Basis' },
    { id: 'cookies', label: '4. Cookies & Analytics' },
    { id: 'sharing', label: '5. Sharing' },
    { id: 'retention', label: '6. Retention' },
    { id: 'security', label: '7. Security' },
    { id: 'rights', label: '8. Your Rights' },
    { id: 'products', label: '9. Product Policies' },
    { id: 'children', label: "10. Children's Privacy" },
    { id: 'changes', label: '11. Changes' },
    { id: 'contact', label: '12. Contact' },
];

const formData = [
    'Name.',
    'Email address.',
    'Phone number and country dialling code.',
    'Company name.',
    'How you heard about us.',
    'Project details you choose to share.',
];

const usageData = [
    'Pages visited and time spent on them.',
    'Referring website or campaign.',
    'Approximate location derived from IP address.',
    'Device, browser and operating system type.',
];

const purposes = [
    'To respond to your enquiry and prepare a proposal.',
    'To provide and improve the services you request.',
    'To measure which pages and campaigns bring useful enquiries.',
    'To detect and prevent spam and abuse of our contact forms.',
    'To meet our legal, accounting and regulatory obligations.',
];

const processors = [
    'Google Analytics 4, for website traffic measurement.',
    'Meta Pixel, for advertising measurement.',
    'Our email and hosting providers, to receive and store your enquiry.',
];

const rights = [
    'Request a copy of the personal data we hold about you.',
    'Ask us to correct information that is inaccurate or incomplete.',
    'Ask us to delete your personal data, where we have no obligation to keep it.',
    'Object to, or ask us to restrict, how we process your data.',
    'Withdraw consent for analytics and advertising cookies at any time.',
    'Lodge a complaint with a supervisory authority.',
];

const productPolicies = [
    {
        product: 'LS Connect',
        note: 'WhatsApp Business messaging platform.',
        links: [
            { href: '/ls-connect/privacy-policy', label: 'Privacy Policy' },
            { href: '/ls-connect/terms', label: 'Terms' },
            { href: '/ls-connect/data-deletion', label: 'Data Deletion' },
        ],
    },
    {
        product: 'LS (Luxury Shoppe)',
        note: 'Shopify-connected retail platform.',
        links: [
            {
                href: '/luxury-shoppe/security-incident-response',
                label: 'Security Incident Response',
            },
            { href: '/luxury-shoppe/data-access-logging', label: 'Data Access & Logging' },
        ],
    },
];

export default function PrivacyPolicyPage() {
    return (
        <PolicyShell
            eyebrow="3R Creative · Legal"
            titleTop="Privacy"
            titleAccent="Policy"
            meta={[
                { label: 'Scope', value: 'creative3r.com' },
                { label: 'Company', value: '3R Creative (F.Z.E.)' },
                { label: 'Last Updated', value: '31 October 2026' },
            ]}
            sections={sections}
        >
            <section id="intro" className="scroll-mt-28">
                <Prose>
                    <p>
                        This Privacy Policy explains how{' '}
                        <strong className="text-white">3R Creative (F.Z.E.)</strong> (&ldquo;we&rdquo;,
                        &ldquo;us&rdquo;, &ldquo;our&rdquo;) handles personal data collected through
                        our website at <strong className="text-white">creative3r.com</strong>.
                    </p>
                    <p>
                        It covers the website itself: the pages you browse and the enquiry forms you
                        submit. Each of our products has its own policy, because each processes
                        different data through different third parties. Those are listed in{' '}
                        <a href="#products" className="text-[#E9C369] hover:underline">
                            section 9
                        </a>
                        .
                    </p>
                    <p>
                        We are based in Sharjah, United Arab Emirates, and this Policy is published in
                        line with applicable UAE data protection law and, where it applies to you, the
                        GDPR.
                    </p>
                </Prose>
            </section>

            <Divider />

            <PolicySectionBlock id="collect" number="1" heading="What We Collect">
                <SubHeading>1.1 Information you give us</SubHeading>
                <Prose>
                    <p>When you submit an enquiry through our contact form, we collect:</p>
                </Prose>
                <List items={formData} />

                <SubHeading>1.2 Information collected automatically</SubHeading>
                <Prose>
                    <p>
                        When you browse the site, our analytics tools collect usage data, which may
                        include:
                    </p>
                </Prose>
                <List items={usageData} />
                <Prose>
                    <p className="mt-4">
                        We do not ask for, and do not want, payment card details, passwords or
                        government identification documents through this website.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="use" number="2" heading="How We Use It">
                <Prose>
                    <p>We use the data described above for the following purposes:</p>
                </Prose>
                <List items={purposes} />
                <Prose>
                    <p className="mt-4">
                        We do not sell your personal data, and we do not use enquiry details to build
                        advertising profiles.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="legal-basis" number="3" heading="Legal Basis for Processing">
                <Prose>
                    <p>
                        Where the GDPR applies, we rely on{' '}
                        <strong className="text-white">consent</strong> for analytics and advertising
                        cookies, on <strong className="text-white">legitimate interests</strong> to
                        respond to a business enquiry you have sent us, on{' '}
                        <strong className="text-white">performance of a contract</strong> where you
                        become a client, and on{' '}
                        <strong className="text-white">legal obligation</strong> where accounting or
                        regulatory rules require us to retain records.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="cookies" number="4" heading="Cookies and Analytics">
                <Prose>
                    <p>
                        This website uses Google Analytics 4 and the Meta Pixel. These are loaded only
                        after your first interaction with the page, or shortly afterwards, and they set
                        cookies that help us understand how the site is used and how our campaigns
                        perform.
                    </p>
                    <p>
                        You can block or delete these cookies in your browser settings at any time. The
                        site remains fully usable without them.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="sharing" number="5" heading="Sharing Your Information">
                <Prose>
                    <p>
                        We share personal data only with service providers that help us operate this
                        website, and only to the extent they need it:
                    </p>
                </Prose>
                <List items={processors} />
                <Prose>
                    <p className="mt-4">
                        We may also disclose information where we are required to do so by law, or to
                        protect our rights and the safety of others. Some of these providers process
                        data outside the UAE; where that happens we rely on the safeguards offered by
                        those providers.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="retention" number="6" heading="How Long We Keep It">
                <Prose>
                    <p>
                        We keep enquiry details for as long as needed to deal with your enquiry and any
                        resulting engagement, and afterwards only where a legal, tax or accounting
                        obligation requires it. Analytics data is retained according to the retention
                        period configured in Google Analytics.
                    </p>
                    <p>
                        You can ask us to delete your enquiry at any time, using the contact address
                        below.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="security" number="7" heading="Security">
                <Prose>
                    <p>
                        The site is served over HTTPS, enquiry submissions are rate limited and
                        validated to reduce abuse, and access to submitted enquiries is restricted to
                        the team members who need it.
                    </p>
                    <p>
                        No method of transmission or storage is completely secure. We take appropriate
                        measures to protect your data but cannot guarantee absolute security.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="rights" number="8" heading="Your Rights">
                <Prose>
                    <p>Subject to applicable law, you may:</p>
                </Prose>
                <List items={rights} />
                <Prose>
                    <p className="mt-4">
                        To exercise any of these rights, write to us at the address in section 12. We
                        will respond within the period required by applicable law.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="products" number="9" heading="Product Privacy Policies">
                <Prose>
                    <p>
                        Our products process data that this website does not, through platforms such as
                        WhatsApp and Shopify. Each product therefore publishes its own policies:
                    </p>
                </Prose>
                <div className="mt-5 space-y-4">
                    {productPolicies.map((item) => (
                        <div
                            key={item.product}
                            className="border border-white/10 rounded-xl p-5 bg-[#1a1a1a]"
                        >
                            <p className="text-sm font-semibold text-[#E9C369] mb-1">{item.product}</p>
                            <p className="text-white/60 text-[0.97rem] leading-relaxed mb-3">
                                {item.note}
                            </p>
                            <div className="flex flex-wrap gap-x-5 gap-y-2">
                                {item.links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-sm text-white/70 hover:text-[#E9C369] transition-colors underline decoration-white/20 hover:decoration-[#E9C369]"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <Prose>
                    <p className="mt-4">
                        Where a product policy and this Policy differ, the product policy governs that
                        product.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="children" number="10" heading="Children's Privacy">
                <Prose>
                    <p>
                        Our services are intended for businesses and are not directed at children under
                        18. We do not knowingly collect personal data from children. If you believe a
                        child has sent us personal data, contact us and we will delete it.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="changes" number="11" heading="Changes to This Policy">
                <Prose>
                    <p>
                        We may update this Policy to reflect changes in our services, our service
                        providers or applicable law. The revised version will be published on this page
                        with a new &ldquo;Last Updated&rdquo; date.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="contact" number="12" heading="Contact Us">
                <Prose>
                    <p>
                        For any question about this Policy, or to exercise your rights, contact us:
                    </p>
                </Prose>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <ContactCard label="Email">info@creative3r.com</ContactCard>
                    <ContactCard label="Phone">+971 50 806 4894</ContactCard>
                </div>
                <Prose>
                    <p className="mt-5">
                        3R Creative (F.Z.E.) — Head Office: Suite 1006, Al Rayyan Building, Block A, Al
                        Nahda, Sharjah, United Arab Emirates.
                    </p>
                </Prose>
            </PolicySectionBlock>
        </PolicyShell>
    );
}
