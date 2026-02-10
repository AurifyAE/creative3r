import Image from "next/image";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 md:py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:flex-row md:items-start md:justify-between md:px-8 lg:px-0">
        {/* Left nav columns */}
        <div className="flex flex-1 gap-12 text-sm text-neutral-300">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Menu
            </p>
            <nav className="space-y-1">
              <Link href="/" className="block font-medium text-white">
                Home
              </Link>
              <Link href="about" className="block hover:text-white/80">
                About Us
              </Link>
              <Link href="/services" className="block hover:text-white/80">
                Services
              </Link>
              <Link href="/portfolio" className="block hover:text-white/80">
                Portfolio
              </Link>
              <Link href="#" className="block hover:text-white/80">
                Blogs
              </Link>
            </nav>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Work with us
            </p>
            <nav className="space-y-1">
              <Link href="#" className="block hover:text-white/80">
                Discuss Project
              </Link>
            </nav>
          </div>
        </div>

        {/* Center logo & tagline */}
        <div className="flex flex-col items-center gap-3 text-center md:flex-1">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/assets/images/logo.svg"
              alt="3R Creative logo"
              width={60}
              height={60}
            />
            <Image
              src="/assets/images/logoName.svg"
              alt="3R Creative"
              width={160}
              height={30}
            />
          </div>
          <p className="text-xs md:text-sm text-neutral-400">
            Reflect. Refine. Resonate.
          </p>
        </div>

        {/* Right social & contact */}
        <div className="flex flex-1 flex-col items-end gap-4 text-right text-sm text-neutral-300">
          <div className="flex gap-5 text-lg">
            <Link href="#" aria-label="Instagram" className="hover:text-white">
              {/* simple icon substitutes */}
              <Image src="/assets/icon/instagram.svg" alt="Instagram" className="w-5 h-5 hover:text-white" width={20} height={20} />
            </Link>
            <Link href="#" aria-label="Facebook" className="hover:text-white">
              <Image src="/assets/icon/facebook.svg" alt="Facebook" className="w-5 h-5 hover:text-white" width={20} height={20} />
            </Link>
            <Link href="#" aria-label="Linkedin" className="hover:text-white">
              <Image src="/assets/icon/linkedin.svg" alt="Linkedin" className="w-5 h-5 hover:text-white" width={20} height={20} />
            </Link>
          </div>

          <div className="space-y-1 text-xs md:text-sm">
            <p className="font-semibold text-white">
              Official: <Link href="tel:+971585023411" >+971 58 502 3411</Link><br />
              Support: <Link href="tel:+971508064894" >+971 50 806 4894</Link>
            </p>
            <p>info@creative3r.com · creative3r.com</p>
            <p>
              C1 Building, F-1, Ajman Free Zone, Ajman, UAE.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

