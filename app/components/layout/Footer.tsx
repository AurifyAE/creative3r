import Image from "next/image";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 md:flex-row md:items-start md:justify-between md:px-8">
        {/* Left nav columns */}
        <div className="grid grid-cols-2 gap-10 sm:flex sm:flex-1 sm:gap-12 text-sm text-neutral-300 text-left">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
              Menu
            </p>
            <nav className="space-y-2">
              <Link href="/" className="block font-medium text-white transition-colors hover:text-white/70">
                Home
              </Link>
              <Link href="/about" className="block transition-colors hover:text-white/80">
                About Us
              </Link>
              <Link href="/services" className="block transition-colors hover:text-white/80">
                Services
              </Link>
              <Link href="/portfolio" className="block transition-colors hover:text-white/80">
                Portfolio
              </Link>
              <Link href="#" className="block transition-colors hover:text-white/80">
                Blogs
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
              Work with us
            </p>
            <nav className="space-y-2">
              <Link href="#" className="block transition-colors hover:text-white/80">
                Discuss Project
              </Link>
            </nav>
          </div>
        </div>

        {/* Center logo & tagline */}
        <div className="flex flex-col items-center gap-4 text-center md:flex-1 order-first md:order-0">
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/assets/images/logo.svg"
              alt="3R Creative logo"
              width={70}
              height={70}
              className="w-14 h-14 md:w-16 md:h-16"
            />
            <Image
              src="/assets/images/logoName.svg"
              alt="3R Creative"
              width={180}
              height={35}
              className="w-40 md:w-44"
            />
          </div>
          <p className="text-xs md:text-sm text-neutral-400 tracking-wider">
            Reflect. Refine. Resonate.
          </p>
        </div>

        {/* Right social & contact */}
        <div className="flex flex-1 flex-col items-center md:items-end gap-6 text-center md:text-right text-sm text-neutral-300">
          <div className="flex gap-6 text-lg justify-center md:justify-end">
            <Link href="#" aria-label="Instagram" className="transition-transform hover:scale-110">
              <Image src="/assets/icon/instagram.svg" alt="Instagram" className="w-5 h-5 opacity-70 hover:opacity-100" width={20} height={20} />
            </Link>
            <Link href="#" aria-label="Facebook" className="transition-transform hover:scale-110">
              <Image src="/assets/icon/facebook.svg" alt="Facebook" className="w-5 h-5 opacity-70 hover:opacity-100" width={20} height={20} />
            </Link>
            <Link href="#" aria-label="Linkedin" className="transition-transform hover:scale-110">
              <Image src="/assets/icon/linkedin.svg" alt="Linkedin" className="w-5 h-5 opacity-70 hover:opacity-100" width={20} height={20} />
            </Link>
          </div>

          <div className="space-y-2 text-xs md:text-sm">
            <p className="font-semibold text-white leading-relaxed">
              Official: <Link href="tel:+971585023411" className="hover:text-white/80">+971 58 502 3411</Link><br />
              Support: <Link href="tel:+971508064894" className="hover:text-white/80">+971 50 806 4894</Link>
            </p>
            <p className="text-neutral-400 tracking-wide">info@creative3r.com · creative3r.com</p>
            <p className="text-neutral-500 max-w-[250px] md:max-w-none">
              C1 Building, F-1, Ajman Free Zone, Ajman, UAE.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

