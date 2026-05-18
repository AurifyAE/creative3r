'use client';

import React, { useState } from 'react';

const sections = [
  { id: 'intro', label: 'Introduction' },
  { id: 'info', label: '1. Information We Collect' },
  { id: 'whatsapp', label: '2. WhatsApp Business API' },
  { id: 'legal', label: '3. Legal Basis' },
  { id: 'cookies', label: '4. Cookies' },
  { id: 'sharing', label: '5. Data Sharing' },
  { id: 'retention', label: '6. Data Retention' },
  { id: 'security', label: '7. Data Security' },
  { id: 'rights', label: '8. Your Rights' },
  { id: 'children', label: '9. Children\'s Privacy' },
  { id: 'links', label: '10. External Links' },
  { id: 'changes', label: '11. Policy Changes' },
  { id: 'contact', label: '12. Contact' },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <main className="min-h-screen bg-[#1F1E1E] text-white">

      {/* Hero Header */}
      <div className="bg-[#1F1E1E] text-white px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #fff 40px, #fff 41px)',
          }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#E9C369] mb-4">
            3R Creative · Legal
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          >
            Privacy<br />
            <span className="text-[#E9C369]">Policy</span>
          </h1>
          <div className="flex flex-wrap gap-6 text-sm text-[#f9f7f4] mt-8">
            <span>
              <span className="text-[#E9C369] mr-1">Business:</span>
              3R Creative
            </span>
            <span>
              <span className="text-[#E9C369] mr-1">Last Updated:</span>
              January 10, 2026
            </span>
            <a
              href="https://www.creative3r.com"
              className="text-[#E9C369] hover:underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              creative3r.com ↗
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16">

        {/* Sticky Sidebar TOC */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-10">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#f9f7f4] mb-4">
              Contents
            </p>
            <nav className="flex flex-col gap-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleNavClick(s.id)}
                  className={`text-left text-sm py-1.5 px-3 rounded transition-all border-l-2 ${
                    activeSection === s.id
                      ? 'border-[#E9C369] text-white bg-[#1F1E1E]'
                      : 'border-transparent text-white hover:text-[#E9C369] hover:border-[#E9C369]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <article className="flex-1 min-w-0 space-y-14 text-white">

          {/* Introduction */}
          <section id="intro" className="scroll-mt-8">
            <SectionHeading>
              <span className="text-white">Introduction</span>
            </SectionHeading>
            <Prose>
              <p>
                <strong>3R Creative</strong> ("we," "us," or "our") operates the website{' '}
                <ExternalLink href="https://www.creative3r.com">https://www.creative3r.com</ExternalLink>{' '}
                and provides digital, branding, marketing, and creative services. We are committed
                to protecting your privacy and ensuring transparency regarding how we collect, use,
                and safeguard your personal information.
              </p>
              <p>
                This Privacy Policy explains how we collect, process, and protect personal data,
                including data used for communication via WhatsApp Business API, in compliance with
                Meta Platforms, Inc. policies and applicable data protection laws.
              </p>
              <p>
                By using our website or communicating with us, you agree to this Privacy Policy.
              </p>
            </Prose>
          </section>

          <Divider />

          {/* Information We Collect */}
          <section id="info" className="scroll-mt-8">
            <SectionNumber>1</SectionNumber>
            <SectionHeading>
              <span className="text-white">Information We Collect</span>
            </SectionHeading>

            <SubHeading>Personal Information</SubHeading>
            <Prose>
              <p>We may collect personal information when you:</p>
            </Prose>
            <List items={[
              'Submit contact or inquiry forms',
              'Request our services or quotations',
              'Communicate with us via WhatsApp, email, or phone',
              'Subscribe to updates or newsletters',
            ]} />

            <Prose><p className="mt-4">This information may include:</p></Prose>
            <List items={[
              'Name',
              'Email address',
              'Phone number (including WhatsApp number)',
              'Business information',
              'Any information you voluntarily provide',
            ]} />

            <SubHeading>Automatically Collected Information</SubHeading>
            <Prose><p>When you visit our website, we may automatically collect:</p></Prose>
            <List items={[
              'IP address',
              'Browser type and device information',
              'Pages visited and time spent',
              'Referring URLs',
            ]} />
          </section>

          <Divider />

          {/* WhatsApp Business API */}
          <section id="whatsapp" className="scroll-mt-8">
            <SectionNumber>2</SectionNumber>
            <SectionHeading>
              <span className="text-white">WhatsApp Business API Communication</span>
            </SectionHeading>
            <Prose>
              <p>
                We use the WhatsApp Business API, provided by Meta Platforms, Inc., to communicate
                with users who have explicitly opted in to receive messages from us.
              </p>
            </Prose>

            <SubHeading>How WhatsApp Data Is Used</SubHeading>
            <List items={[
              'To respond to inquiries and provide customer support',
              'To send service-related updates, notifications, and information',
              'To communicate regarding requested services',
            ]} />

            <SubHeading>User Consent</SubHeading>
            <List items={[
              'We only send WhatsApp messages to users who have voluntarily provided their phone number and explicitly consented to receive WhatsApp communications.',
              <>Users may opt out at any time by replying <strong>"STOP"</strong> or contacting us directly.</>,
            ]} />

            <SubHeading>Data Protection</SubHeading>
            <List items={[
              'We do not sell, rent, or share WhatsApp data or phone numbers with third parties for marketing purposes.',
              "WhatsApp communications are processed in accordance with Meta's WhatsApp Business policies.",
            ]} />

            {/* Highlighted opt-in block */}
            <div className="mt-8 bg-[#1a1a1a] text-[#f9f7f4] rounded-2xl p-8 space-y-5 text-sm leading-relaxed">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#E9C369] mb-2">
                WhatsApp Opt-In & Use
              </p>
              <DetailRow label="How to opt in">
                You may opt in by entering your phone number and checking the consent checkbox on our
                contact form, checkout page, or during direct phone/email conversations. Example
                opt-in wording: <em className="text-[#E9C369]">"Yes, I agree to receive service updates, booking
                confirmations and support messages from 3R Creative via WhatsApp. I understand I can
                opt out at any time."</em>
              </DetailRow>
              <DetailRow label="What we send &amp; frequency">
                Transactional messages (booking confirmations, invoices — usually 1–3 per
                transaction), appointment reminders (1–2 per event), and customer support messages
                (ad-hoc). We do not send unsolicited marketing to people who have not consented.
              </DetailRow>
              <DetailRow label="Recording opt-ins &amp; storage">
                We record opt-in details (phone number in E.164 format, consent timestamp, consent
                method, page URL and IP address) in our CRM. Opt-in records are retained for
                12 months or as required by law. Sample records available on request.
              </DetailRow>
              <DetailRow label="Opt-out">
                Reply <strong>"STOP"</strong> to any WhatsApp message or email{' '}
                <a href="mailto:info@creative3r.com" className="text-[#E9C369] underline underline-offset-2">
                  info@creative3r.com
                </a>
                . Opt-outs processed within 24–72 hours.
              </DetailRow>
              <DetailRow label="Third parties">
                We do not sell or share WhatsApp phone numbers for third-party marketing. Service
                providers (CRM, helpdesk) process data on our behalf under our instructions and
                applicable law.
              </DetailRow>
              <DetailRow label="Data Controller">
                3R Creative ·{' '}
                <a href="mailto:info@creative3r.com" className="text-[#E9C369] underline underline-offset-2">
                  info@creative3r.com
                </a>
              </DetailRow>
            </div>
          </section>

          <Divider />

          {/* Legal Basis */}
          <section id="legal" className="scroll-mt-8">
            <SectionNumber>3</SectionNumber>
            <SectionHeading>
              <span className="text-white">Legal Basis for Processing Data</span>
            </SectionHeading>
            <Prose><p>We process personal data based on one or more of the following:</p></Prose>
            <List items={[
              'Your explicit consent',
              'Contractual necessity to provide our services',
              'Legitimate business interests',
              'Compliance with legal obligations',
            ]} />
          </section>

          <Divider />

          {/* Cookies */}
          <section id="cookies" className="scroll-mt-8">
            <SectionNumber>4</SectionNumber>
            <SectionHeading>
              <span className="text-white">Cookies and Tracking Technologies</span>
            </SectionHeading>
            <Prose>
              <p>
                We use cookies and similar technologies to improve website functionality, analyze
                traffic and usage patterns, and enhance user experience.
              </p>
              <p>You can manage or disable cookies through your browser settings.</p>
            </Prose>
          </section>

          <Divider />

          {/* Data Sharing */}
          <section id="sharing" className="scroll-mt-8">
            <SectionNumber>5</SectionNumber>
            <SectionHeading>
              <span className="text-white">Data Sharing and Third-Party Services</span>
            </SectionHeading>
            <Prose><p>We may share personal data with:</p></Prose>
            <List items={[
              'Trusted service providers who assist in website operations',
              'Analytics providers (e.g., website performance analysis)',
              'Legal or regulatory authorities when required by law',
            ]} />
            <Prose>
              <p className="mt-4">
                We do not allow third parties to use your personal data for their own marketing purposes.
              </p>
            </Prose>
          </section>

          <Divider />

          {/* Retention */}
          <section id="retention" className="scroll-mt-8">
            <SectionNumber>6</SectionNumber>
            <SectionHeading>
              <span className="text-white">Data Retention</span>
            </SectionHeading>
            <Prose>
              <p>
                We retain personal data only for as long as necessary to fulfill the purposes
                described in this policy and comply with legal or regulatory requirements.
              </p>
              <p>
                WhatsApp conversation data is retained only as long as needed for customer
                communication and support.
              </p>
            </Prose>
          </section>

          <Divider />

          {/* Security */}
          <section id="security" className="scroll-mt-8">
            <SectionNumber>7</SectionNumber>
            <SectionHeading>
              <span className="text-white">Data Security</span>
            </SectionHeading>
            <Prose>
              <p>
                We implement reasonable technical and organizational safeguards to protect personal
                information against unauthorized access, misuse, or loss.
              </p>
            </Prose>
          </section>

          <Divider />

          {/* Rights */}
          <section id="rights" className="scroll-mt-8">
            <SectionNumber>8</SectionNumber>
            <SectionHeading>
              <span className="text-white">Your Privacy Rights</span>
            </SectionHeading>
            <Prose><p>Depending on your location, you may have the right to:</p></Prose>
            <List items={[
              'Access your personal data',
              'Request correction or deletion',
              'Withdraw consent at any time',
              'Object to certain data processing activities',
            ]} />
          </section>

          <Divider />

          {/* Children */}
          <section id="children" className="scroll-mt-8">
            <SectionNumber>9</SectionNumber>
            <SectionHeading>
              <span className="text-white">Children's Privacy</span>
            </SectionHeading>
            <Prose>
              <p>
                Our services are not directed to individuals under the age of 13 (or the minimum age
                required by law in your jurisdiction). We do not knowingly collect personal data
                from children.
              </p>
            </Prose>
          </section>

          <Divider />

          {/* External Links */}
          <section id="links" className="scroll-mt-8">
            <SectionNumber>10</SectionNumber>
            <SectionHeading>
              <span className="text-white">External Links</span>
            </SectionHeading>
            <Prose>
              <p>
                Our website may contain links to third-party websites. We are not responsible for
                their privacy practices or content.
              </p>
            </Prose>
          </section>

          <Divider />

          {/* Changes */}
          <section id="changes" className="scroll-mt-8">
            <SectionNumber>11</SectionNumber>
            <SectionHeading>
              <span className="text-white">Changes to This Privacy Policy</span>
            </SectionHeading>
            <Prose>
              <p>
                We may update this Privacy Policy periodically. Any changes will be posted on this
                page with a revised "Last Updated" date.
              </p>
            </Prose>
          </section>

          <Divider />

          {/* Contact */}
          <section id="contact" className="scroll-mt-8">
            <SectionNumber>12</SectionNumber>
            <SectionHeading>
              <span className="text-white">Contact Information</span>
            </SectionHeading>
            <div className="mt-4 grid sm:grid-cols-3 gap-4">
              <ContactCard label="Business">3R Creative</ContactCard>
              <ContactCard label="Website">
                <ExternalLink href="https://www.creative3r.com">creative3r.com</ExternalLink>
              </ContactCard>
              <ContactCard label="Email">
                <a href="mailto:info@creative3r.com" className="text-[#E9C369] hover:underline underline-offset-4">
                  info@creative3r.com
                </a>
              </ContactCard>
            </div>
          </section>

          {/* Footer note */}
          <div className="pt-10 border-t border-white">
            <p className="text-xs text-white">
              © {new Date().getFullYear()} 3R Creative. All rights reserved.
              This policy was last updated January 10, 2026.
            </p>
          </div>

        </article>
      </div>
    </main>
  );
}

/* ─── Reusable primitives ─────────────────────────────────── */

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
    <h3 className="text-base font-semibold text-white mt-7 mb-2 uppercase tracking-wide text-sm">
      {children}
    </h3>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-3 text-white leading-relaxed text-[0.97rem]">
      {children}
    </div>
  );
}

function List({ items }: { items: (React.ReactNode)[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-white text-[0.97rem] leading-relaxed">
          <span className="mt-[0.4rem] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#E9C369]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Divider() {
  return <hr className="border-white" />;
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-[#E9C369] hover:underline underline-offset-4 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[#2e2e2e] pt-4">
      <p className="text-[10px] tracking-[0.2em] uppercase text-white mb-1">{label}</p>
      <p className="text-[#ccc] leading-relaxed">{children}</p>
    </div>
  );
}

function ContactCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
        <div className="bg-[#E9C369]/10 border border-[#E9C369] rounded-xl p-5">
      <p className="text-[10px] tracking-[0.2em] uppercase text-[#f9f7f4] mb-2">{label}</p>
      <p className="text-[#E9C369] text-sm font-medium">{children}</p>
    </div>
  );
}