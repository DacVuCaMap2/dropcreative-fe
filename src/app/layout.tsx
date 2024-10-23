import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import GoogleAnalytics from "@/components/GoogleAnalytics";
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
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';
export const metadata: Metadata = {
  title: "DropCreatetive.io",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {GA_MEASUREMENT_ID && <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />}
        {children}
      </body>
    </html>
  );
}
