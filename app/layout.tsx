import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Poppins } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/providers/LenisProvider";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";


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
  title: "3R Creative",
  description: "3R Creative is a creative agency that helps businesses grow their online presence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${ivyOraDisplay.variable} font-poppins antialiased`}>
        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
