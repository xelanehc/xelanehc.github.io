import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Alex Chen — Personal Website",
    template: "%s | Alex Chen",
  },
  description:
    "Personal website and CS portfolio for Alex Chen: projects, experience, and contact.",
  openGraph: {
    title: "Alex Chen — Personal Website",
    description:
      "Projects, work experience, and contact information for Alex Chen.",
    url: "/",
    siteName: "Alex Chen",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Chen — Personal Website",
    description:
      "Projects, work experience, and contact information for Alex Chen.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="mx-auto max-w-5xl px-6 py-8 flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
