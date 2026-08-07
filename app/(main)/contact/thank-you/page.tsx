import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, Briefcase, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | 3R Creative",
  description: "Your enquiry has been received. Our team will be in touch shortly.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[85vh] bg-[#1F1E1E] text-white flex items-center justify-center px-4 sm:px-6 py-24 md:py-32">
      <div className="max-w-2xl w-full mx-auto text-center space-y-8 bg-[#2A2929]/80 border border-white/10 p-8 sm:p-12 md:p-16 rounded-3xl backdrop-blur-md shadow-2xl shadow-black/80 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#299D8F]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#E76F51]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Success Check Icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#299D8F]/20 animate-ping" />
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#299D8F] to-[#1F7267] flex items-center justify-center shadow-lg shadow-[#299D8F]/30 relative z-10">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[2.2]" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3 relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#E9C369] font-medium">
            Submission Confirmed
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-ivyora text-white tracking-wide">
            Thank You!
          </h1>
        </div>

        {/* Main Message requested by user */}
        <p className="text-base sm:text-lg text-neutral-300 max-w-lg mx-auto font-sans leading-relaxed relative z-10">
          Your enquiry has been received. Our team will be in touch shortly to understand your requirements and explore how we can assist you.
        </p>

        {/* Next Steps / Quick Links */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#299D8F] hover:bg-[#228478] text-white font-medium text-sm transition-all duration-300 shadow-md shadow-[#299D8F]/20 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/15 transition-all duration-300 hover:scale-105"
          >
            <Briefcase className="w-4 h-4 text-[#E9C369]" />
            Explore Portfolio
          </Link>
        </div>

        {/* Direct Call / Contact option */}
        <div className="pt-6 border-t border-white/10 text-xs text-neutral-400 flex items-center justify-center gap-2 relative z-10">
          <PhoneCall className="w-3.5 h-3.5 text-[#299D8F]" />
          <span>Need immediate assistance? Call us at <a href="tel:+971585023411" className="text-white underline hover:text-[#E9C369] transition-colors">+971 58 502 3411</a></span>
        </div>
      </div>
    </div>
  );
}
