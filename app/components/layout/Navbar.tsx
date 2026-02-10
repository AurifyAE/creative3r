'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
    const [selected, setSelected] = useState('home');
    const [hidden, setHidden] = useState(false);
    const [hasBg, setHasBg] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

    const handleSelect = (item: string) => {
        setSelected(item);
    };

    useEffect(() => {
        const unlockAudio = () => {
          if (!hoverSoundRef.current) {
            hoverSoundRef.current = new Audio('/assets/sounds/tick.mp3');
            hoverSoundRef.current.volume = 0.3;
      
            // Play & immediately pause to unlock
            hoverSoundRef.current.play().then(() => {
              hoverSoundRef.current.pause();
              hoverSoundRef.current.currentTime = 0;
            }).catch(() => {});
          }
      
          window.removeEventListener('pointerdown', unlockAudio);
        };
      
        window.addEventListener('pointerdown', unlockAudio);
      
        return () => {
          window.removeEventListener('pointerdown', unlockAudio);
        };
      }, []);
      

    const playHoverSound = () => {
        // Create audio on first hover if it doesn't exist
        if (!hoverSoundRef.current) {
            hoverSoundRef.current = new Audio('/assets/sounds/tick.mp3');
            hoverSoundRef.current.volume = 0.3;
        }
        
        // Clone and play to allow rapid repeated plays
        const sound = hoverSoundRef.current.cloneNode() as HTMLAudioElement;
        sound.volume = 0.3;
        sound.play().catch(err => {
            // Silently fail - this is expected on very first interaction sometimes
            console.log('Audio play failed:', err);
        });
    };

    useEffect(() => {
        const handleScroll = () => {
          const currentScrollY = window.scrollY;
    
          setHasBg(currentScrollY > 20);
    
          if (currentScrollY > lastScrollY && currentScrollY > 80) {
            setHidden(true);
          } else {
            setHidden(false);
          }
    
          setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`
                fixed top-0 left-0 right-0 z-50
                flex items-center justify-between
                px-6 lg:px-12 py-6 text-white font-sans
                transition-all duration-300 ease-in-out
                ${hidden ? "-translate-y-full" : "translate-y-0"}
                ${hasBg ? "bg-[#1F1E1E]/95 backdrop-blur-md shadow-lg" : "bg-transparent"}
            `}
        >
            <div className="flex gap-2 text-sm">
                <Link 
                    href="/" 
                    onClick={() => handleSelect('home')}
                    onMouseEnter={playHoverSound}
                    className={`w-28 h-8 rounded-2xl relative overflow-hidden group cursor-pointer
                        transition-colors duration-300
                        ${selected === 'home' ? 'bg-[#299D8F]' : 'bg-[#1F1E1E]'}
                        hover:border-2 hover:border-[#299D8F]`}>
                    <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-transform duration-500 ease-in-out will-change-transform group-hover:translate-y-full">
                        Home
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none -translate-y-full transition-transform duration-500 ease-in-out will-change-transform group-hover:translate-y-0">
                        Home
                    </span>
                </Link>

                <Link 
                    href="/about" 
                    onClick={() => handleSelect('about')}
                    onMouseEnter={playHoverSound}
                    className={`w-28 h-8 rounded-2xl relative overflow-hidden group cursor-pointer
                        transition-colors duration-300
                        ${selected === 'about' ? 'bg-[#299D8F]' : 'bg-[#1F1E1E]'}
                        hover:border-2 hover:border-[#299D8F]`}>
                    <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-transform duration-500 ease-in-out will-change-transform group-hover:translate-y-full">
                        About Us
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none -translate-y-full transition-transform duration-500 ease-in-out will-change-transform group-hover:translate-y-0">
                        About Us
                    </span>
                </Link>

                <Link 
                    href="/services" 
                    onClick={() => handleSelect('services')}
                    onMouseEnter={playHoverSound}
                    className={`w-28 h-8 rounded-2xl relative overflow-hidden group cursor-pointer
                        transition-colors duration-300
                        ${selected === 'services' ? 'bg-[#299D8F]' : 'bg-[#1F1E1E]'}
                        hover:border-2 hover:border-[#299D8F]`}>
                    <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-transform duration-500 ease-in-out will-change-transform group-hover:translate-y-full">
                        Services
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none -translate-y-full transition-transform duration-500 ease-in-out will-change-transform group-hover:translate-y-0">
                        Services
                    </span>
                </Link>

                <Link 
                    href="/portfolio" 
                    onClick={() => handleSelect('portfolio')}
                    onMouseEnter={playHoverSound}
                    className={`w-28 h-8 rounded-2xl relative overflow-hidden group cursor-pointer
                        transition-colors duration-300
                        ${selected === 'portfolio' ? 'bg-[#299D8F]' : 'bg-[#1F1E1E]'}
                        hover:border-2 hover:border-[#299D8F]`}>
                    <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-transform duration-500 ease-in-out will-change-transform group-hover:translate-y-full">
                        Portfolio
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none -translate-y-full transition-transform duration-500 ease-in-out will-change-transform group-hover:translate-y-0">
                        Portfolio
                    </span>
                </Link>
            </div>
            <div className="flex-1 flex justify-center">
                <div className="">
                    <Link href="/" className="flex items-start gap-2">
                    <Image src="/assets/images/logo.svg" alt="3R Creative" width={100} height={100} className="w-8 h-8" />
                    <Image src="/assets/images/logoName.svg" alt="3R Creative" width={100} height={100} className="w-30 h-10" />
                    </Link>
                </div>
            </div>
            <div>
                <Link 
                    href="/contact"
                    onMouseEnter={playHoverSound}
                    className="text-sm font-medium border border-gray-600 px-8 py-2 rounded-full hover:bg-[#299D8F] hover:border-[#299D8F] hover:text-white transition-all duration-300">
                    Let's Chat
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;