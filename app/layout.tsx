import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LenisProvider from "./components/providers/LenisProvider";
import AnalyticsScripts from "./components/providers/AnalyticsScripts";
import CustomCursor from "./components/ui/CustomCursor";
import WhatsAppButton from "./components/ui/WhatsAppButton";


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
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N3ZV9456');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Analytics origins are contacted after load; warm the connections early. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${poppins.variable} ${ivyOraDisplay.variable} font-poppins antialiased bg-[#1F1E1E]`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N3ZV9456"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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
          <WhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  );
}
