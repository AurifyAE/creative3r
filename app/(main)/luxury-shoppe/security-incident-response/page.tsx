import type { Metadata } from 'next';
import {
    ContactCard,
    Divider,
    List,
    PolicySectionBlock,
    PolicyShell,
    Prose,
    type PolicySection,
} from '@/app/components/legal/PolicyPage';

export const metadata: Metadata = {
    title: 'Security Incident Response Policy | LS (Luxury Shoppe) — 3R Creative',
    description:
        'How 3R Creative identifies, manages and responds to security incidents affecting personal information processed through LS (Luxury Shoppe).',
};

const sections: PolicySection[] = [
    { id: 'intro', label: 'Introduction' },
    { id: 'what-is-incident', label: '2. What Is an Incident' },
    { id: 'handling', label: '3. How We Handle Incidents' },
    { id: 'notifications', label: '4. Notifications' },
    { id: 'measures', label: '5. Security Measures' },
    { id: 'reporting', label: '6. Reporting a Concern' },
    { id: 'updates', label: '7. Policy Updates' },
];

const incidentExamples = [
    'Unauthorised access to customer information.',
    'Accidental exposure or sharing of personal data.',
    'Loss or theft of devices containing business information.',
    'Suspicious account activity or compromised login credentials.',
    'Attempts to disrupt or access our services without permission.',
    'Technical issues that may affect the security or availability of our platform.',
];

const responseSteps = [
    {
        step: 'Identification',
        detail: 'We review reported security concerns and investigate suspicious activities.',
    },
    {
        step: 'Assessment',
        detail: 'We evaluate the incident, identify the information and services affected, and determine the potential impact.',
    },
    {
        step: 'Containment',
        detail: 'We take appropriate steps to prevent further unauthorised access, exposure or damage.',
    },
    {
        step: 'Resolution',
        detail: 'We work to resolve the issue, restore affected services and strengthen our security measures.',
    },
    {
        step: 'Review',
        detail: 'After resolving an incident, we review what happened and identify improvements to help prevent similar incidents in the future.',
    },
];

const notificationParties = [
    'Affected customers and users.',
    'Relevant business partners.',
    'Shopify, where Shopify-related customer information is involved.',
    'Applicable regulatory authorities, where required by law.',
];

const securityMeasures = [
    'Restricted access to customer and business information.',
    'Secure user authentication and account management.',
    'Data encryption to protect sensitive information.',
    'Monitoring of important system activities.',
    'Secure handling of third-party integrations.',
    'Separation of development and production environments.',
    'Appropriate data retention and deletion practices.',
    'Regular reviews of our security practices.',
];

export default function LuxuryShoppeSecurityIncidentResponsePage() {
    return (
        <PolicyShell
            backHref="/luxury-shoppe"
            backLabel="Back to LS (Luxury Shoppe)"
            eyebrow="Luxury Shoppe · Legal"
            titleTop="Security Incident"
            titleAccent="Response Policy"
            meta={[
                { label: 'Platform', value: 'LS (Luxury Shoppe)' },
                { label: 'Company', value: '3R Creative (F.Z.E.)' },
                { label: 'Last Updated', value: '31 October 2026' },
            ]}
            sections={sections}
        >
            <section id="intro" className="scroll-mt-28">
                <Prose>
                    <p>
                        At <strong className="text-white">3R Creative</strong>, we take the security
                        and privacy of our customers&rsquo; information seriously.
                    </p>
                    <p>
                        This Security Incident Response Policy explains how we identify, manage and
                        respond to security incidents that may affect personal information processed
                        through <strong className="text-white">LS (Luxury Shoppe)</strong>.
                    </p>
                    <p>
                        Our goal is to protect customer information, minimise potential risks and
                        ensure that any security incidents are handled responsibly and promptly.
                    </p>
                </Prose>
            </section>

            <Divider />

            <PolicySectionBlock id="what-is-incident" number="2" heading="What Is a Security Incident?">
                <Prose>
                    <p>
                        A security incident is any event that may affect the safety, confidentiality
                        or availability of information. Examples include:
                    </p>
                </Prose>
                <List items={incidentExamples} />
                <Prose>
                    <p className="mt-4">
                        All reported incidents are reviewed and handled according to their severity
                        and potential impact.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="handling" number="3" heading="How We Handle Security Incidents">
                <Prose>
                    <p>
                        When a security incident is identified, we follow a structured response
                        process.
                    </p>
                </Prose>
                <dl className="mt-5 space-y-4">
                    {responseSteps.map((item) => (
                        <div
                            key={item.step}
                            className="border border-white/10 rounded-xl p-5 bg-[#1a1a1a]"
                        >
                            <dt className="text-sm font-semibold text-[#E9C369] mb-1">{item.step}</dt>
                            <dd className="text-white/60 text-[0.97rem] leading-relaxed">
                                {item.detail}
                            </dd>
                        </div>
                    ))}
                </dl>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="notifications" number="4" heading="Security Incident Notifications">
                <Prose>
                    <p>
                        If a security incident affects personal information, we will take appropriate
                        steps to inform the affected parties. Depending on the nature and severity of
                        the incident, notifications may be provided to:
                    </p>
                </Prose>
                <List items={notificationParties} />
                <Prose>
                    <p className="mt-4">
                        We aim to provide notifications without unnecessary delay and in accordance
                        with applicable legal requirements.
                    </p>
                    <p>
                        Where required under applicable GDPR rules, relevant supervisory authorities
                        will be notified within{' '}
                        <strong className="text-white">72 hours</strong> of becoming aware of a
                        reportable personal data breach.
                    </p>
                    <p>
                        Notifications will include relevant information about the incident, its
                        potential impact and the steps taken to address it.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="measures" number="5" heading="Security Measures">
                <Prose>
                    <p>
                        We implement appropriate security measures to protect information processed
                        through LS (Luxury Shoppe). These measures include:
                    </p>
                </Prose>
                <List items={securityMeasures} />
                <Prose>
                    <p className="mt-4">
                        We continuously work to improve our security measures as our platform and
                        services evolve.
                    </p>
                </Prose>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="reporting" number="6" heading="Reporting a Security Concern">
                <Prose>
                    <p>
                        We encourage customers and users to report any suspected security issues or
                        unauthorised access involving LS (Luxury Shoppe).
                    </p>
                    <p>
                        If you notice suspicious activity or believe your information may have been
                        compromised, please contact us. All reported concerns will be reviewed and
                        handled with appropriate attention.
                    </p>
                </Prose>
                <div className="mt-6">
                    <ContactCard label="Report a security concern">
                        info@creative3r.com
                    </ContactCard>
                </div>
            </PolicySectionBlock>

            <Divider />

            <PolicySectionBlock id="updates" number="7" heading="Policy Updates">
                <Prose>
                    <p>
                        We may update this policy periodically to reflect changes in our services,
                        security practices and applicable legal requirements. Any updates will be
                        published on this page.
                    </p>
                </Prose>
            </PolicySectionBlock>
        </PolicyShell>
    );
}
