import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster";
import * as Sonner from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "Student Housing",
  description: "Student Housing Web Application",
  icons: {
    icon: "/assets/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        {children}
        <Toaster />
        <Sonner.Toaster />
      </body>
    </html>
  );
}
