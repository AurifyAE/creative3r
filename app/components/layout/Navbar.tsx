'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
    const [selected, setSelected] = useState('home');
    const [hidden, setHidden] = useState(false);
    const [hasBg, setHasBg] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

    const handleSelect = (item: string) => {
        setSelected(item);
        setMobileMenuOpen(false); // Close mobile menu on selection
    };

    const playHoverSound = () => {
        if (!hoverSoundRef.current) {
            hoverSoundRef.current = new Audio('/assets/sounds/tick.mp3');
            hoverSoundRef.current.volume = 0.3;
        }

        const sound = hoverSoundRef.current.cloneNode() as HTMLAudioElement;
        sound.volume = 0.3;
        sound.play().catch(err => {
            console.log('Audio play failed:', err);
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setHasBg(currentScrollY > 20);

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setHidden(true);
                setMobileMenuOpen(false); // Close menu when hiding navbar
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
                    fixed top-0 left-0 right-0 z-50
                    flex items-center justify-between
                    px-4 sm:px-6 lg:px-12 py-4 sm:py-6 text-white font-sans
                    transition-all duration-300 ease-in-out
                    ${hidden ? "-translate-y-full" : "translate-y-0"}
                    ${hasBg || mobileMenuOpen ? "bg-[#1F1E1E]/95 backdrop-blur-md shadow-lg" : "bg-transparent"}
                `}
            >
                {/* Desktop Navigation Links - Hidden on mobile */}
                <div className="hidden lg:flex gap-2 text-sm">
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => handleSelect(item.id)}
                            onMouseEnter={playHoverSound}
                            className={`w-28 h-8 rounded-2xl relative overflow-hidden group cursor-pointer
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
                    ))}
                </div>

                {/* Mobile Menu Button - Visible only on mobile */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center z-50"
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* Logo - Centered */}
                <div className="flex-1 lg:flex-initial flex justify-center">
                    <Link href="/" className="flex items-start gap-2">
                        <Image src="/assets/images/logo.svg" alt="3R Creative" width={100} height={100} className="w-6 h-6 sm:w-8 sm:h-8" />
                        <Image src="/assets/images/logoName.svg" alt="3R Creative" width={100} height={100} className="w-24 h-8 sm:w-30 sm:h-10" />
                    </Link>
                </div>

                {/* Contact Button - Hidden on mobile, visible on desktop */}
                <div className="hidden lg:block">
                    <Link
                        href="/contact"
                        onMouseEnter={playHoverSound}
                        className="text-sm font-medium border border-gray-600 px-8 py-2 rounded-full hover:bg-[#299D8F] hover:border-[#299D8F] hover:text-white transition-all duration-300">
                        Let's Chat
                    </Link>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`
                    fixed inset-0 bg-[#1F1E1E]/98 backdrop-blur-lg z-40 lg:hidden
                    transition-all duration-300 ease-in-out
                    ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}
            >
                <div className={`
                    flex flex-col items-center justify-center h-full gap-6 px-6
                    transition-all duration-300 delay-100
                    ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                `}>
                    {navItems.map((item, index) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => handleSelect(item.id)}
                            style={{ transitionDelay: `${index * 50}ms` }}
                            className={`
                                text-2xl sm:text-3xl font-medium py-3 px-8 rounded-2xl
                                transition-all duration-300
                                ${selected === item.id ? 'bg-[#299D8F] text-white' : 'text-white hover:text-[#299D8F]'}
                                ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}
                            `}>
                            {item.name}
                        </Link>
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