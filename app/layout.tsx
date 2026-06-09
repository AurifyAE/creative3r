import type { Metadata } from "next";
import Script from "next/script";
import localFont from 'next/font/local';
import { Poppins } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/providers/LenisProvider";
import SplashProvider from "./components/providers/SplashProvider";
import CustomCursor from "./components/ui/CustomCursor";


const ivyOraDisplay = localFont({
  src: [
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-RegularItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-ivyora-display',
  display: 'swap',
});


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Luxury Branding & Digital Strategy for Precious Metals & Jewelry in UAE",
  description: "Best marketing agency empowering jewelry brands, gold refineries, and precious metal businesses in UAE, also Digital marketing Agency in UAE for your business.",
  keywords: [
    "Precious metals creative agency",
    "Jewelry brand strategy",
    "Gold refinery branding",
    "Luxury jewelry marketing",
    "Gold trading digital agency",
    "Luxury branding for jewelry",
    "Strategic brand design",
    "High-conversion digital marketing",
    "Jewelry industry brand identity",
    "Creative strategy for refineries",
    "Creative agency UAE",
    "Luxury branding Middle East",
    "Jewelry marketing Dubai",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${ivyOraDisplay.variable} font-poppins antialiased bg-[#1F1E1E]`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LDBT899MEC"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LDBT899MEC');
          `}
        </Script>
        <LenisProvider>
          <SplashProvider>
            <CustomCursor />       
            {children}
          </SplashProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
