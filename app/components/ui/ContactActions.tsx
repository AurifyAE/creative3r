'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Call02Icon,
  Cancel01Icon,
  Message02Icon,
  NoteEditIcon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons';
import { useHoverSound } from '@/app/hooks/useHoverSound';

const phoneNumber = '+971585023411';
const whatsappNumber = '+971509503916';
const whatsappMessage = 'Hello! I would like to inquire about your services.';
const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

const actionClassName =
  'group flex min-h-12 w-max items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-[#1F1E1E]/95 py-2 pl-2 pr-4 text-white shadow-xl shadow-black/35 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#299D8F]/70 hover:bg-[#252424] hover:shadow-[#299D8F]/15 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C46A]';

const iconClassName =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#299D8F]/15 text-[#5CC9BB] transition-colors duration-300 group-hover:bg-[#299D8F] group-hover:text-white';

export default function ContactActions() {
  const playHoverSound = useHoverSound();
  const [isOpen, setIsOpen] = useState(false);
  const contactMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!contactMenuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsidePress);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <div
      ref={contactMenuRef}
      className="group fixed bottom-5 right-4 z-50 sm:bottom-6 sm:right-6"
    >
      <div
        id="floating-contact-options"
        className={`absolute bottom-full right-0 flex flex-col items-end gap-2 pb-3 transition-all duration-300 ease-out lg:group-hover:pointer-events-auto lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:pointer-events-auto lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 ${
          isOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <a
          href={`tel:${phoneNumber}`}
          aria-label="Call 3R Creative"
          onClick={() => setIsOpen(false)}
          onMouseEnter={playHoverSound}
          className={actionClassName}
        >
          <span className={iconClassName}>
            <HugeiconsIcon icon={Call02Icon} size={17} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="whitespace-nowrap text-xs font-medium tracking-wide">Call</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with 3R Creative on WhatsApp"
          onClick={() => setIsOpen(false)}
          onMouseEnter={playHoverSound}
          className={actionClassName}
        >
          <span className={`${iconClassName} !bg-[#25D366]/15 !text-[#25D366] group-hover:!bg-[#25D366] group-hover:!text-white`}>
            <HugeiconsIcon icon={WhatsappIcon} size={17} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="whitespace-nowrap text-xs font-medium tracking-wide">WhatsApp</span>
        </a>

        <Link
          href="/contact"
          aria-label="Open the enquiry form"
          onClick={() => setIsOpen(false)}
          onMouseEnter={playHoverSound}
          className={actionClassName}
        >
          <span className={iconClassName}>
            <HugeiconsIcon icon={NoteEditIcon} size={17} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="whitespace-nowrap text-xs font-medium tracking-wide">Enquiry form</span>
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        onMouseEnter={playHoverSound}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-[#299D8F]/50 bg-[#1F1E1E]/95 text-white shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#299D8F] hover:bg-[#299D8F] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C46A]"
        aria-label={isOpen ? 'Close contact options' : 'Open contact options'}
        aria-expanded={isOpen}
        aria-controls="floating-contact-options"
      >
        <HugeiconsIcon
          icon={isOpen ? Cancel01Icon : Message02Icon}
          size={23}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
