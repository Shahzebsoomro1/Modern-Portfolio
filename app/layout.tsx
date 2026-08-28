import type { Metadata } from "next";
import "./globals.css";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/SmoothScroll";

export const metadata: Metadata = {
  title: {
    default: "Shahzeb Soomro — Full-Stack Developer",
    template: "%s — Shahzeb Soomro",
  },

  description:
    "Shahzeb Soomro is a fresh Computer Science graduate with practical MERN stack experience through internships and academic projects.",

  keywords: [
    "Shahzeb Soomro",
    "Full Stack Developer",
    "Computer Science Graduate",
    "React Developer",
    "MERN Stack Developer",
    "Front-End Developer",
  ],

  authors: [{ name: "Shahzeb Soomro" }],

  creator: "Shahzeb Soomro",

  openGraph: {
    title: "Shahzeb Soomro — Full-Stack Developer",
    description:
      "Fresh Computer Science graduate building modern full-stack web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#0a0a0a] text-white">
        <SmoothScroll>
          <Header />

          <main>{children}</main>

          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}