'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Phone, Mail, Globe, Share2, Download } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const PROFILE = {
    name: 'Akhil Arukandathil',
    title: 'Digital Marketing Strategist',
    phoneDisplay: '+971 50 829 3033',
    phoneHref: 'tel:+971508293033',
    whatsappHref: 'https://wa.me/971508293033',
    email: 'akhil@creative3r.com',
    avatar: '/assets/images/profiles/akhil.png',
    initial: 'A',
};

const LINKS: { label: string; href: string; icon: React.ComponentType<{ className?: string }> | string }[] = [
    { label: 'Call', href: PROFILE.phoneHref, icon: Phone },
    { label: 'WhatsApp', href: PROFILE.whatsappHref, icon: FaWhatsapp },
    { label: 'E-mail', href: `mailto:${PROFILE.email}`, icon: Mail },
    { label: 'Instagram', href: 'https://www.instagram.com/3r_creative/', icon: '/assets/icon/instagramWhiteFill.svg' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/3rcreative/', icon: '/assets/icon/linkedinWhiteFill.svg' },
    { label: 'Facebook', href: 'https://www.facebook.com/3RCreativeF.Z.E/', icon: '/assets/icon/facebookWhiteFill.svg' },
    { label: 'Website', href: 'https://www.creative3r.com', icon: Globe },
];

export default function AkhilProfilePage() {
    const [shareState, setShareState] = useState<'idle' | 'copied'>('idle');

    const handleShare = async () => {
        const shareData = {
            title: `${PROFILE.name} — 3R Creative`,
            text: `Get in touch with ${PROFILE.name}, ${PROFILE.title} at 3R Creative.`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch {
                // user dismissed the share sheet
            }
            return;
        }

        if (navigator.clipboard) {
            await navigator.clipboard.writeText(shareData.url);
            setShareState('copied');
            setTimeout(() => setShareState('idle'), 2000);
        }
    };

    const handleSaveContact = () => {
        const vcard = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${PROFILE.name}`,
            `TITLE:${PROFILE.title}`,
            `TEL;TYPE=CELL:${PROFILE.phoneDisplay.replace(/\s+/g, '')}`,
            `EMAIL:${PROFILE.email}`,
            'ORG:3R Creative',
            'END:VCARD',
        ].join('\n');

        const blob = new Blob([vcard], { type: 'text/vcard' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${PROFILE.name}.vcf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1F1E1E] px-4 py-10">
            <div className="pointer-events-none absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#F9844A] opacity-[0.05] rounded-full blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#9B5DE5] opacity-[0.04] rounded-full blur-[100px]" />

            <div className="relative w-full max-w-[420px] rounded-[30px] border border-white/5 bg-[#252424] shadow-[0_8px_60px_rgba(0,0,0,0.45)] overflow-hidden">
                <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-[#F9844A] to-[#F9C74F] opacity-10 blur-3xl" />

                <div className="relative px-6 sm:px-8 pt-10 pb-8">
                    <div className="flex flex-col items-center justify-center gap-1 mb-8">
                        <Image src="/assets/images/logo.svg" alt="3R Creative" width={46} height={40} className="h-9 w-auto opacity-90" />
                        <Image src="/assets/images/logoName.svg" alt="3R Creative" width={100} height={20} className="w-32 h-10 opacity-90" />
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-5">
                            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#F9844A] to-[#F9C74F] opacity-30 blur-lg" />
                            <div className="relative w-[140px] h-[140px] rounded-full bg-gradient-to-br from-[#F9844A] to-[#F9C74F] p-[3px]">
                                <div className="relative h-full w-full overflow-hidden rounded-full bg-[#1F1E1E]">
                                    <Image src={PROFILE.avatar} alt={PROFILE.name} fill sizes="140px" className="object-cover" />
                                </div>
                            </div>
                        </div>

                        <h1 className="text-[28px] sm:text-3xl font-semibold text-white">{PROFILE.name}</h1>
                        <p className="mt-2 text-xs tracking-[0.2em] text-[#F9844A]">{PROFILE.title}</p>
                    </div>

                    <div className="my-8 h-px w-full bg-white/10" />

                    <div className="mb-8 grid grid-cols-2 gap-3">
                        <button
                            onClick={handleSaveContact}
                            className="flex items-center justify-center gap-2 rounded-full border border-white/15 py-3 text-sm font-medium text-white transition-colors hover:border-[#F9844A] hover:text-[#F9844A]"
                        >
                            <Download className="h-4 w-4" />
                            Save Contact
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F9844A] to-[#F9C74F] py-3 text-sm font-medium text-[#1F1E1E] transition-transform hover:scale-[1.02]"
                        >
                            <Share2 className="h-4 w-4" />
                            {shareState === 'copied' ? 'Link Copied!' : 'Share'}
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-x-3 gap-y-6">
                        {LINKS.map(({ label, href, icon: Icon }, index) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className={`group flex flex-col items-center gap-2.5 ${index === LINKS.length - 1 ? 'col-start-2' : ''}`}
                            >
                                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-[#F9844A]/50 group-hover:bg-[#F9844A]/10">
                                    {typeof Icon === 'string' ? (
                                        <Image src={Icon} alt={label} width={20} height={20} className="h-5 w-5 opacity-80 transition-opacity group-hover:opacity-100" />
                                    ) : (
                                        <Icon className="h-5 w-5 text-white/80 transition-colors group-hover:text-[#F9844A]" />
                                    )}
                                </span>
                                <span className="text-[11px] text-white/50 transition-colors group-hover:text-white/80">{label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
