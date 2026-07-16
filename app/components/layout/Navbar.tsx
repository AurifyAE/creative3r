'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useHoverSound } from "@/app/hooks/useHoverSound";
import { services } from "@/app/(main)/services/servicesData";

const navItems = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'About Us', href: '/about', id: 'about' },
    { name: 'Services', href: '/services', id: 'services' },
    { name: 'Portfolio', href: '/portfolio', id: 'portfolio' },
] as const;

type NavId = (typeof navItems)[number]['id'];

function getActiveNavId(pathname: string): NavId | null {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/about')) return 'about';
    if (pathname.startsWith('/services')) return 'services';
    if (pathname.startsWith('/portfolio')) return 'portfolio';
    return null;
}

const Navbar = () => {
    const pathname = usePathname();
    const [selected, setSelected] = useState<NavId | null>('home');
    const [hidden, setHidden] = useState(false);
    const [hasBg, setHasBg] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const playHoverSound = useHoverSound();

    const openServices = () => {
        if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
        setServicesOpen(true);
    };
    const closeServices = () => {
        if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
        // Small delay so the dropdown survives brief hover gaps
        servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 120);
    };

    useEffect(() => {
        setSelected(getActiveNavId(pathname));
        setServicesOpen(false);
    }, [pathname]);

    const handleNavClick = (id: string) => {
        const match = navItems.find((item) => item.id === id);
        if (match) setSelected(match.id as NavId);
        setMobileMenuOpen(false);
    };

    const handleLogoClick = () => {
        setSelected('home');
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setHasBg(currentScrollY > 20);

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setHidden(true);
                setMobileMenuOpen(false); // Close menu when hiding navbar
                setServicesOpen(false);
            } else {
                setHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setMobileServicesOpen(false);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const navItems = [
        { name: 'Home', href: '/', id: 'home' },
        { name: 'About Us', href: '/about', id: 'about' },
        { name: 'Services', href: '/services', id: 'services' },
        { name: 'Portfolio', href: '/portfolio', id: 'portfolio' },
    ];

    return (
        <>
            <nav
                className={`
                    fixed top-0 left-0 right-0 z-70
                    flex items-center justify-between
                    px-4 sm:px-6 lg:px-12 py-4 sm:py-6 text-white font-sans
                    transition-all duration-300 ease-in-out
                    ${hidden ? "-translate-y-full" : "translate-y-0"}
                    ${hasBg || mobileMenuOpen ? "bg-[#1F1E1E]/95 backdrop-blur-md shadow-lg" : "bg-transparent"}
                `}
            >
                {/* Desktop Navigation Links - Hidden on mobile */}
                <div className="hidden lg:flex gap-2 text-sm">
                    {navItems.map((item) => {
                        const pill = (
                            <Link
                                href={item.href}
                                onClick={() => { handleNavClick(item.id); setServicesOpen(false); }}
                                onMouseEnter={playHoverSound}
                                className={`block w-28 h-8 rounded-2xl relative overflow-hidden group cursor-pointer
                                    transition-colors duration-300
                                    ${selected === item.id ? 'bg-[#299D8F]' : 'bg-[#1F1E1E]'}
                                    hover:border-2 hover:border-[#299D8F]`}>
                                <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-transform duration-500 ease-in-out will-change-transform group-hover:translate-y-full">
                                    {item.name}
                                </span>
                                <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none -translate-y-full transition-transform duration-500 ease-in-out will-change-transform group-hover:translate-y-0">
                                    {item.name}
                                </span>
                            </Link>
                        );

                        if (item.id !== 'services') return <div key={item.id}>{pill}</div>;

                        return (
                            <div
                                key={item.id}
                                className="relative"
                                onMouseEnter={openServices}
                                onMouseLeave={closeServices}
                            >
                                {pill}

                                {/* Services mega dropdown */}
                                <div
                                    className={`absolute left-0 top-full pt-3 transition-all duration-300 ease-out
                                        ${servicesOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}
                                >
                                    <div className="w-180 rounded-2xl bg-[#1F1E1E]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                                        {/* Header */}
                                        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/5">
                                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500">
                                                What we do
                                            </span>
                                            <Link
                                                href="/services"
                                                onClick={() => { handleNavClick('services'); setServicesOpen(false); }}
                                                onMouseEnter={playHoverSound}
                                                className="group/all flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors"
                                            >
                                                View all
                                                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/all:rotate-45" />
                                            </Link>
                                        </div>
                                        {/* Services grid */}
                                        <div className="grid grid-cols-2 gap-1 p-3">
                                            {services.map((service) => (
                                                <Link
                                                    key={service.slug}
                                                    href={`/services/${service.slug}`}
                                                    onClick={() => { handleNavClick('services'); setServicesOpen(false); }}
                                                    onMouseEnter={playHoverSound}
                                                    className="group/item flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors duration-200"
                                                >
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: service.color }} />
                                                    <span className="flex-1 min-w-0">
                                                        <span className="block text-sm font-medium text-gray-200 group-hover/item:text-white transition-colors">
                                                            {service.title}
                                                        </span>
                                                        <span className="mt-0.5 block text-[11px] text-gray-500 truncate">
                                                            {service.teaser}
                                                        </span>
                                                    </span>
                                                    <ArrowUpRight
                                                        className="w-3.5 h-3.5 mt-1 shrink-0 opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                                                        style={{ color: service.color }}
                                                    />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile Menu Button - Visible only on mobile */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center z-50"
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-0.5 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-0.5 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-0.5 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* Logo - Centered */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center">
                    <Link
                        href="/"
                        onClick={handleLogoClick}
                        onMouseEnter={playHoverSound}
                        className="flex items-start gap-2"
                        aria-label="3R Creative home"
                    >
                        <Image src="/assets/images/logo.svg" alt="3R Creative" width={100} height={100} className="w-6 h-6 sm:w-8 sm:h-8" />
                        <Image src="/assets/images/logoName.svg" alt="3R Creative" width={100} height={100} className="w-24 h-8 sm:w-30 sm:h-10" />
                    </Link>
                </div>

                {/* Contact Button */}
                <div className="flex items-center gap-3">
                    {/* Mobile compact button - visible only on mobile */}
                    <Link
                        href="/contact"
                        onMouseEnter={playHoverSound}
                        className="lg:hidden text-xs font-medium border border-gray-600 px-4 py-1.5 rounded-full hover:bg-[#299D8F] hover:border-[#299D8F] hover:text-white transition-all duration-300 whitespace-nowrap">
                        Let's Chat
                    </Link>
                    {/* Desktop button - hidden on mobile */}
                    <Link
                        href="/contact"
                        onMouseEnter={playHoverSound}
                        className="hidden lg:block text-sm font-medium border border-gray-600 px-8 py-2 rounded-full hover:bg-[#299D8F] hover:border-[#299D8F] hover:text-white transition-all duration-300">
                        Let's Chat
                    </Link>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`
                    fixed inset-0 bg-[#1F1E1E]/98 backdrop-blur-lg z-60 lg:hidden
                    transition-all duration-300 ease-in-out
                    ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}
            >
                <div className={`
                    flex flex-col items-start justify-center h-full gap-6 px-6
                    transition-all duration-300 delay-100
                    ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                `}>
                    {navItems.map((item, index) => (
                        item.id === 'services' ? (
                            <div
                                key={item.id}
                                style={{ transitionDelay: `${index * 50}ms` }}
                                className={`
                                    flex flex-col items-start w-full
                                    transition-all duration-300
                                    ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}
                                `}
                            >
                                {/* Services toggle — expands the list; "View All Services" below links to the hub */}
                                <button
                                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                    aria-expanded={mobileServicesOpen}
                                    className={`flex items-center gap-2 rounded-2xl text-2xl sm:text-3xl font-medium py-3 pl-8 pr-6 text-white transition-colors duration-300 ${selected === item.id ? 'bg-[#299D8F]' : 'hover:text-[#299D8F]'}`}
                                >
                                    {item.name}
                                    <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Expandable services sub-list */}
                                <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${mobileServicesOpen ? 'max-h-72 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                    <div className="max-h-52 overflow-y-auto flex flex-col items-start gap-0.5 pl-8 pr-4 py-1">
                                        {services.map((service) => (
                                            <Link
                                                key={service.slug}
                                                href={`/services/${service.slug}`}
                                                onClick={() => handleNavClick('services')}
                                                className="flex items-center gap-2.5 py-1.5 text-base text-gray-300 hover:text-white text-left leading-snug transition-colors"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: service.color }} />
                                                {service.title}
                                            </Link>
                                        ))}
                                    </div>
                                    <Link
                                        href="/services"
                                        onClick={() => handleNavClick('services')}
                                        className="ml-8 mt-2 inline-flex items-center gap-1.5 py-1.5 text-sm font-medium text-[#299D8F]"
                                    >
                                        View All Services
                                        <ArrowUpRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={() => handleNavClick(item.id)}
                                style={{ transitionDelay: `${index * 50}ms` }}
                                className={`
                                    text-2xl sm:text-3xl font-medium py-3 px-8 rounded-2xl
                                    transition-all duration-300
                                    ${selected === item.id ? 'bg-[#299D8F] text-white' : 'text-white hover:text-[#299D8F]'}
                                    ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}
                                `}>
                                {item.name}
                            </Link>
                        )
                    ))}

                    {/* Mobile Contact Button */}
                    <Link
                        href="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ transitionDelay: `${navItems.length * 50}ms` }}
                        className={`
                            text-xl sm:text-2xl font-medium border-2 border-gray-600 px-10 py-3 rounded-full
                            hover:bg-[#299D8F] hover:border-[#299D8F] text-white
                            transition-all duration-300 mt-4
                            ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}
                        `}>
                        Let's Chat
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;