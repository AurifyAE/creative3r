import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Poppins } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/providers/LenisProvider";
import AnalyticsScripts from "./components/providers/AnalyticsScripts";
import CustomCursor from "./components/ui/CustomCursor";


const ivyOraDisplay = localFont({
  src: [
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/IvyOraDisplay/IvyOraDisplay-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-ivyora-display',
  display: 'swap',
  // Ten declared faces would otherwise all be preloaded (~650 KB). Letting the
  // browser fetch only the weights a page actually matches costs one round trip
  // on first paint and saves the rest.
  preload: false,
});


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.creative3r.com"),
  alternates: {
    // Resolved against the current route, so every page gets its own canonical.
    canonical: "./",
  },
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
      <head>
        {/* Analytics origins are contacted after load; warm the connections early. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${poppins.variable} ${ivyOraDisplay.variable} font-poppins antialiased bg-[#1F1E1E]`}>
        <AnalyticsScripts />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1329244318974974&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <LenisProvider>
          <CustomCursor />       
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
