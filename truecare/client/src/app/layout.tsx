import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TrueCare — Healthcare Trust & Financial Lifeline",
  description:
    "From finding the right emergency hospital to exposing fraudulent medical bills — TrueCare protects your family, physically and financially.",
  keywords: [
    "healthcare",
    "emergency hospital finder",
    "medical bill scanner",
    "Ayushman Bharat",
    "CGHS",
    "insurance",
    "fraud detection",
    "TrueCare",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Navbar />
        <ParticleField />
        <main>{children}</main>
        <ScrollToTop />
      </body>
    </html>
  );
}
