import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Appbar from "@/components/Appbar";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Providers } from "./providers";

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
  title: "Seo Validator",
  description:
    "A app for check the seo of your website - An SEO checker tool that helps you optimize your website for search engines.",
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
        <Appbar />
        <Providers>{children}</Providers>
      </body>
      <GoogleAnalytics gaId="G-ZWBNL0KTC0" />
    </html>
  );
}
