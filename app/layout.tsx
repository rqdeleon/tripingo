import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import "./globals.css";

import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Cookies from "@/components/cookies";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Landing Page 01",
  description: "B&B Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ cn(inter.className) }>
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
          <Header />
          {children}
          <Footer />
          <Cookies typeNo="1"/>
          <Toaster />
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
