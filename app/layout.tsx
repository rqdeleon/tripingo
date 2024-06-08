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
  title: "TripinGo",
  description: "Shuttle and Tour Services | Laguna, Luzon, Philippines",
  openGraph:{
    title: "TripinGo | Turning your trip into tales",
    description: "Best Shuttle and Tours Service in Philippines",
    url: "tripingo.mybranches.net",
    images: [
      {
        url: "https://res.cloudinary.com/duwzronom/image/upload/v1717841640/random/r0mfahm7qof1df7utgnc.jpg",
        width: 1260,
        height:800,
      }
    ]
  }
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
