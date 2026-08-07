'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { useHoverSound } from '@/app/hooks/useHoverSound';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber = '971585023411',
  message = 'Hello! I would like to inquire about your services.',
}: WhatsAppButtonProps) {
  const playHoverSound = useHoverSound();
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={playHoverSound}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1F1E1E]/90 hover:bg-[#252424] text-white p-3 sm:px-4 sm:py-3 rounded-full border border-[#299D8F]/40 hover:border-[#299D8F] backdrop-blur-md shadow-2xl shadow-black/60 hover:shadow-[#299D8F]/30 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
    >
      {/* Pulse ping indicator */}
      <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]/15 group-hover:bg-[#25D366]/25 transition-colors">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40"></span>
        <FaWhatsapp className="w-4 h-4 text-[#25D366] relative z-10 group-hover:rotate-12 transition-transform duration-300" />
      </span>

      {/* Brand Aligned Text Label */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs sm:max-w-xs text-xs font-medium tracking-wide text-neutral-200 group-hover:text-white transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 sm:opacity-100 pr-1">
        Chat with us
      </span>

      {/* Online indicator dot */}
      <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#299D8F] group-hover:bg-[#25D366] transition-colors" />
    </a>
  );
}
